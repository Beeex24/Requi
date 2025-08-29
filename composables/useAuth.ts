import type { User } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  user_id: string
  username: string
  display_name: string
  avatar_url: string
  bio: string
  account_type: 'client' | 'creator'
  created_at: string
  updated_at: string
}

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<User | null>('auth.user', () => null)
  const userProfile = useState<UserProfile | null>('auth.profile', () => null)
  const loading = useState('auth.loading', () => false)

  // ユーザー情報の取得
  const fetchUser = async () => {
    try {
      const { data: { user: currentUser } } = await $supabase.auth.getUser()
      user.value = currentUser
      
      if (currentUser) {
        // プロフィール情報を取得
        const { data: profile } = await $supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', currentUser.id)
          .single()
        
        userProfile.value = profile
      }
      
      return currentUser
    } catch (error) {
      console.error('ユーザー取得エラー:', error)
      return null
    }
  }

  // サインアップ
  const signUp = async (credentials: {
    email: string
    password: string
    username: string
    accountType: 'client' | 'creator'
  }) => {
    loading.value = true
    
    try {
      // 1. Supabase Authでユーザー作成
      const { data: authData, error: authError } = await $supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            username: credentials.username,
            account_type: credentials.accountType
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // 2. プロフィールテーブルにデータ作成
        const { error: profileError } = await $supabase
          .from('user_profiles')
          .insert({
            user_id: authData.user.id,
            username: credentials.username,
            display_name: credentials.username,
            account_type: credentials.accountType
          })

        if (profileError) throw profileError

        // 3. 通知設定を作成
        const { error: notificationError } = await $supabase
          .from('notification_settings')
          .insert({
            user_id: authData.user.id
          })

        if (notificationError) console.error('通知設定作成エラー:', notificationError)

        // 4. プライバシー設定を作成
        const { error: privacyError } = await $supabase
          .from('privacy_settings')
          .insert({
            user_id: authData.user.id
          })

        if (privacyError) console.error('プライバシー設定作成エラー:', privacyError)

        // 5. クリエイターの場合、クリエイタープロフィールも作成
        if (credentials.accountType === 'creator') {
          const { error: creatorError } = await $supabase
            .from('creator_profiles')
            .insert({
              user_id: authData.user.id
            })

          if (creatorError) console.error('クリエイタープロフィール作成エラー:', creatorError)
        }

        user.value = authData.user
        await fetchUser() // プロフィール情報を取得
      }

      return { success: true, user: authData.user }
    } catch (error: any) {
      console.error('サインアップエラー:', error)
      return { 
        success: false, 
        error: error.message || 'サインアップに失敗しました' 
      }
    } finally {
      loading.value = false
    }
  }

  // ログイン
  const signIn = async (credentials: {
    email: string
    password: string
  }) => {
    loading.value = true

    try {
      const { data, error } = await $supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })

      if (error) throw error

      user.value = data.user
      await fetchUser() // プロフィール情報を取得

      return { success: true, user: data.user }
    } catch (error: any) {
      console.error('ログインエラー:', error)
      return { 
        success: false, 
        error: error.message || 'ログインに失敗しました' 
      }
    } finally {
      loading.value = false
    }
  }

  // ソーシャルログイン
  const signInWithProvider = async (provider: 'google' | 'github' | 'twitter') => {
    loading.value = true

    try {
      const { data, error } = await $supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      console.error('ソーシャルログインエラー:', error)
      return { 
        success: false, 
        error: error.message || 'ログインに失敗しました' 
      }
    } finally {
      loading.value = false
    }
  }

  // ログアウト
  const signOut = async () => {
    loading.value = true

    try {
      const { error } = await $supabase.auth.signOut()
      if (error) throw error

      user.value = null
      userProfile.value = null
      
      await navigateTo('/login')
      
      return { success: true }
    } catch (error: any) {
      console.error('ログアウトエラー:', error)
      return { 
        success: false, 
        error: error.message || 'ログアウトに失敗しました' 
      }
    } finally {
      loading.value = false
    }
  }

  // パスワードリセット
  const resetPassword = async (email: string) => {
    loading.value = true

    try {
      const { error } = await $supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      console.error('パスワードリセットエラー:', error)
      return { 
        success: false, 
        error: error.message || 'パスワードリセットに失敗しました' 
      }
    } finally {
      loading.value = false
    }
  }

  // パスワード更新
  const updatePassword = async (newPassword: string) => {
    loading.value = true

    try {
      const { error } = await $supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      console.error('パスワード更新エラー:', error)
      return { 
        success: false, 
        error: error.message || 'パスワード更新に失敗しました' 
      }
    } finally {
      loading.value = false
    }
  }

  // メールアドレス更新
  const updateEmail = async (newEmail: string) => {
    loading.value = true

    try {
      const { error } = await $supabase.auth.updateUser({
        email: newEmail
      })

      if (error) throw error

      return { success: true }
    } catch (error: any) {
      console.error('メールアドレス更新エラー:', error)
      return { 
        success: false, 
        error: error.message || 'メールアドレス更新に失敗しました' 
      }
    } finally {
      loading.value = false
    }
  }

  // セッション確認
  const checkSession = async () => {
    try {
      const { data: { session } } = await $supabase.auth.getSession()
      
      if (session?.user) {
        user.value = session.user
        await fetchUser()
        return true
      }
      
      return false
    } catch (error) {
      console.error('セッション確認エラー:', error)
      return false
    }
  }

  // 認証状態の監視
  const watchAuth = () => {
    $supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)
      
      if (session?.user) {
        user.value = session.user
        await fetchUser()
      } else {
        user.value = null
        userProfile.value = null
      }
    })
  }

  return {
    user: readonly(user),
    userProfile: readonly(userProfile),
    loading: readonly(loading),
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
    fetchUser,
    checkSession,
    watchAuth
  }
}