export default defineNuxtPlugin((nuxtApp) => {
  const { $supabase } = nuxtApp

  // グローバルエラーハンドラー
  nuxtApp.vueApp.config.errorHandler = async (error, instance, info) => {
    console.error('Vue Error:', error, info)
    
    // エラーをSupabaseに記録
    try {
      const { user } = useAuth()
      
      await $supabase
        .from('error_logs')
        .insert({
          user_id: user.value?.id,
          error_message: error.message,
          error_stack: error.stack,
          component_info: info,
          url: window.location.href,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString()
        })
    } catch (logError) {
      console.error('Error logging failed:', logError)
    }
    
    // ユーザーに通知
    if (process.client) {
      const notification = useNotification()
      notification.show({
        type: 'error',
        title: 'エラーが発生しました',
        message: 'しばらく時間をおいてから再度お試しください'
      })
    }
  }

  // Promise rejection ハンドラー
  if (process.client) {
    window.addEventListener('unhandledrejection', async (event) => {
      console.error('Unhandled Promise Rejection:', event.reason)
      
      // 重要なエラーのみログ送信
      if (shouldLogError(event.reason)) {
        try {
          await $supabase
            .from('error_logs')
            .insert({
              error_message: event.reason?.message || 'Unhandled Promise Rejection',
              error_type: 'unhandled_rejection',
              url: window.location.href,
              created_at: new Date().toISOString()
            })
        } catch (logError) {
          console.error('Error logging failed:', logError)
        }
      }
    })
  }
})

// エラーログを送信すべきか判定
function shouldLogError(error: any): boolean {
  // ネットワークエラーやユーザーのキャンセルは除外
  const ignoredMessages = [
    'Network Error',
    'Failed to fetch',
    'Load failed',
    'AbortError',
    'Cancelled'
  ]
  
  const errorMessage = error?.message || ''
  return !ignoredMessages.some(msg => errorMessage.includes(msg))
}

// カスタムエラークラス
export class AppError extends Error {
  code: string
  statusCode: number
  
  constructor(message: string, code: string = 'UNKNOWN_ERROR', statusCode: number = 500) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
  }
}

// エラーレポート用のComposable
export const useErrorReporter = () => {
  const { $supabase } = useNuxtApp()
  
  const reportError = async (error: Error | AppError, context?: any) => {
    try {
      const { user } = useAuth()
      
      await $supabase
        .from('error_logs')
        .insert({
          user_id: user.value?.id,
          error_message: error.message,
          error_stack: error.stack,
          error_code: (error as AppError).code,
          context: context,
          url: window.location.href,
          created_at: new Date().toISOString()
        })
    } catch (logError) {
      console.error('Error reporting failed:', logError)
    }
  }
  
  return { reportError }
}