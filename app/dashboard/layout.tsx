// ========================================
// src/app/dashboard/layout.tsx
// ダッシュボード専用レイアウトコンポーネント
// ========================================
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import DashboardNav from '@/components/layout/DashboardNav'

// ========================================
// メタデータ設定
// ========================================
export const metadata: Metadata = {
  title: {
    template: '%s | ダッシュボード - Requi',
    default: 'ダッシュボード - Requi',
  },
  description: 'クリエイター向けダッシュボード - 作品管理、依頼管理、収益管理でクリエイティブ活動を効率化',
  keywords: 'ダッシュボード, クリエイター, 作品管理, 収益管理, 依頼管理',
  robots: {
    index: false, // ダッシュボードは検索エンジンにインデックスさせない
    follow: false,
  },
}

// ========================================
// ユーザー情報の型定義
// ========================================
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'creator' | 'client' | 'admin'
  isVerified: boolean
  createdAt: Date
  stats?: {
    totalWorks?: number
    totalEarnings?: number
    rating?: number
    completedRequests?: number
  }
}

// ========================================
// 認証チェック関数（実際の実装では認証ライブラリを使用）
// ========================================
async function getAuthenticatedUser(): Promise<User | null> {
  // 実際の実装例：
  // import { getServerSession } from 'next-auth/next'
  // import { authOptions } from '@/lib/auth'
  // const session = await getServerSession(authOptions)
  // if (!session?.user) return null
  // return getUserFromDatabase(session.user.id)

  // 開発用のモックデータ
  // 本番環境では実際の認証システムと連携
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  if (isDevelopment) {
    // 開発環境用のダミーユーザー
    return {
      id: '1',
      name: 'さくらアート',
      email: 'sakura@example.com',
      avatar: undefined, // プレースホルダー画像を使用
      role: 'creator',
      isVerified: true,
      createdAt: new Date('2024-01-01'),
      stats: {
        totalWorks: 42,
        totalEarnings: 580000,
        rating: 4.9,
        completedRequests: 128
      }
    }
  }

  // 本番環境では認証チェック
  // ここで実際の認証ロジックを実装
  return null
}

// ========================================
// 権限チェック関数
// ========================================
function hasAccessToDashboard(user: User | null): boolean {
  if (!user) return false
  
  // 未認証ユーザーはアクセス不可
  if (!user.isVerified) return false
  
  // ロールに基づくアクセス制御
  const allowedRoles = ['creator', 'client', 'admin']
  return allowedRoles.includes(user.role)
}

// ========================================
// メインレイアウトコンポーネント
// ========================================
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 認証チェック
  const user = await getAuthenticatedUser()
  
  // 未認証またはアクセス権限がない場合はログインページへリダイレクト
  if (!hasAccessToDashboard(user)) {
    redirect('/login?callbackUrl=/dashboard')
  }

  // ユーザー情報が存在することを保証（TypeScript用）
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* サイドバーナビゲーション */}
      <DashboardNav 
        userRole={user.role}
        userName={user.name}
        userEmail={user.email}
        userAvatar={user.avatar}
      />
      
      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col md:pl-20 lg:pl-64 transition-all duration-300">
        {/* モバイル用の上部スペーサー */}
        <div className="h-16 md:hidden" aria-hidden="true" />
        
        {/* ページヘッダー（オプション） */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30 md:relative">
          <div className="px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* パンくずリストやページタイトルをここに配置可能 */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center text-sm text-gray-500">
                  <span>ダッシュボード</span>
                  {/* 動的にパンくずを生成する場合はここに実装 */}
                </div>
              </div>
              
              {/* クイックアクション */}
              <div className="flex items-center space-x-3">
                {/* 統計情報の表示 */}
                {user.role === 'creator' && user.stats && (
                  <div className="hidden lg:flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">作品数:</span>
                      <span className="font-semibold text-gray-900">{user.stats.totalWorks}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">今月の収益:</span>
                      <span className="font-semibold text-green-600">
                        ¥{user.stats.totalEarnings?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">評価:</span>
                      <div className="flex items-center">
                        <span className="font-semibold text-yellow-500">★ {user.stats.rating}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* メインコンテンツ */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* エラーバウンダリーをここに配置することも可能 */}
            {children}
          </div>
        </main>
        
        {/* フッター（オプション） */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
              <div className="mb-2 sm:mb-0">
                © 2024 Requi. All rights reserved.
              </div>
              <div className="flex items-center space-x-4">
                <a href="/help" className="hover:text-gray-700 transition-colors">
                  ヘルプ
                </a>
                <a href="/terms" className="hover:text-gray-700 transition-colors">
                  利用規約
                </a>
                <a href="/privacy" className="hover:text-gray-700 transition-colors">
                  プライバシー
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
