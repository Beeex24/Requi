export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, checkSession } = useAuth()
  
  // 認証が必要なページのリスト
  const protectedRoutes = [
    '/account',
    '/dashboard',
    '/settings',
    '/messages',
    '/requests'
  ]
  
  // 現在のパスが保護されたルートかチェック
  const isProtectedRoute = protectedRoutes.some(route => 
    to.path.startsWith(route)
  )
  
  if (isProtectedRoute) {
    // セッションチェック
    const hasSession = await checkSession()
    
    if (!hasSession) {
      // ログインページにリダイレクト
      return navigateTo('/login?redirect=' + to.path)
    }
  }
  
  // ログイン済みユーザーがアクセスすべきでないページ
  const guestOnlyRoutes = ['/login', '/signup']
  const isGuestOnlyRoute = guestOnlyRoutes.includes(to.path)
  
  if (isGuestOnlyRoute && user.value) {
    // ダッシュボードにリダイレクト
    return navigateTo('/dashboard')
  }
})