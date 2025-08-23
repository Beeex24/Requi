// ========================================
// src/components/layout/MobileNav.tsx
// モバイル専用ナビゲーションコンポーネント
// ========================================
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Search,
  PlusCircle,
  MessageSquare,
  User,
  Menu,
  X,
  ChevronRight,
  Bell,
  Heart,
  Bookmark,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  Package,
  DollarSign,
  FileText,
  TrendingUp,
  Star,
  Shield,
  Globe,
  Moon,
  Sun,
  Sparkles,
  Camera,
  Brush,
  Mic,
  Video,
  Grid3x3,
  Users,
  Award,
  Clock,
  Calendar,
  MapPin,
  CreditCard,
  ChevronLeft,
  ArrowLeft
} from 'lucide-react'

// ========================================
// 型定義
// ========================================
interface MobileNavProps {
  isLoggedIn?: boolean
  userRole?: 'creator' | 'client' | 'admin'
  userName?: string
  userAvatar?: string
  onClose?: () => void
}

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number | string
  requireAuth?: boolean
  roles?: Array<'creator' | 'client' | 'admin'>
}

interface BottomNavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}

// ========================================
// メインコンポーネント
// ========================================
export default function MobileNav({
  isLoggedIn = false,
  userRole = 'client',
  userName = 'ゲスト',
  userAvatar,
  onClose
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)

  // メインナビゲーション項目
  const mainNavItems: NavItem[] = [
    {
      label: 'ホーム',
      href: '/',
      icon: Home
    },
    {
      label: '作品を探す',
      href: '/works',
      icon: Grid3x3
    },
    {
      label: 'クリエイターを探す',
      href: '/creators',
      icon: Users
    },
    {
      label: 'カテゴリー',
      href: '/categories',
      icon: Package
    }
  ]

  // ユーザーメニュー項目
  const userMenuItems: NavItem[] = isLoggedIn ? [
    {
      label: 'ダッシュボード',
      href: '/dashboard',
      icon: TrendingUp,
      requireAuth: true
    },
    {
      label: 'マイ作品',
      href: '/dashboard/works',
      icon: Package,
      requireAuth: true,
      roles: ['creator']
    },
    {
      label: '依頼管理',
      href: '/dashboard/requests',
      icon: FileText,
      badge: 3,
      requireAuth: true
    },
    {
      label: 'メッセージ',
      href: '/dashboard/messages',
      icon: MessageSquare,
      badge: 5,
      requireAuth: true
    },
    {
      label: '収益管理',
      href: '/dashboard/earnings',
      icon: DollarSign,
      requireAuth: true,
      roles: ['creator']
    },
    {
      label: 'お気に入り',
      href: '/favorites',
      icon: Heart,
      requireAuth: true
    },
    {
      label: 'ブックマーク',
      href: '/bookmarks',
      icon: Bookmark,
      requireAuth: true
    }
  ] : []

  // サポートメニュー項目
  const supportMenuItems: NavItem[] = [
    {
      label: '使い方',
      href: '/how-it-works',
      icon: HelpCircle
    },
    {
      label: 'よくある質問',
      href: '/faq',
      icon: MessageSquare
    },
    {
      label: '料金プラン',
      href: '/pricing',
      icon: CreditCard
    },
    {
      label: 'お問い合わせ',
      href: '/contact',
      icon: MessageSquare
    }
  ]

  // 設定メニュー項目
  const settingsMenuItems: NavItem[] = [
    {
      label: 'プロフィール設定',
      href: '/dashboard/settings/profile',
      icon: User,
      requireAuth: true
    },
    {
      label: '通知設定',
      href: '/dashboard/settings/notifications',
      icon: Bell,
      requireAuth: true
    },
    {
      label: 'プライバシー設定',
      href: '/dashboard/settings/privacy',
      icon: Shield,
      requireAuth: true
    },
    {
      label: '言語設定',
      href: '/settings/language',
      icon: Globe
    }
  ]

  // ボトムナビゲーション項目
  const bottomNavItems: BottomNavItem[] = [
    {
      label: 'ホーム',
      href: '/',
      icon: Home
    },
    {
      label: '探す',
      href: '/search',
      icon: Search
    },
    {
      label: '投稿',
      href: isLoggedIn ? '/dashboard/works/new' : '/login',
      icon: PlusCircle
    },
    {
      label: 'メッセージ',
      href: isLoggedIn ? '/dashboard/messages' : '/login',
      icon: MessageSquare,
      badge: isLoggedIn ? 5 : 0
    },
    {
      label: 'マイページ',
      href: isLoggedIn ? '/dashboard' : '/login',
      icon: User
    }
  ]

  // スワイプ処理
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
      isDragging.current = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !drawerRef.current) return
      
      currentX.current = e.touches[0].clientX
      const diff = currentX.current - startX.current
      
      if (diff < 0) {
        drawerRef.current.style.transform = `translateX(${diff}px)`
      }
    }

    const handleTouchEnd = () => {
      if (!isDragging.current || !drawerRef.current) return
      
      const diff = currentX.current - startX.current
      
      if (diff < -100) {
        setIsOpen(false)
      }
      
      drawerRef.current.style.transform = ''
      isDragging.current = false
    }

    const drawer = drawerRef.current
    if (drawer && isOpen) {
      drawer.addEventListener('touchstart', handleTouchStart)
      drawer.addEventListener('touchmove', handleTouchMove)
      drawer.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (drawer) {
        drawer.removeEventListener('touchstart', handleTouchStart)
        drawer.removeEventListener('touchmove', handleTouchMove)
        drawer.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isOpen])

  // パス変更時にドロワーを閉じる
  useEffect(() => {
    setIsOpen(false)
    setShowSubMenu(null)
  }, [pathname])

  // メニューアイテムのレンダリング
  const renderMenuItem = (item: NavItem) => {
    // ロール制限チェック
    if (item.roles && !item.roles.includes(userRole)) {
      return null
    }

    // 認証制限チェック
    if (item.requireAuth && !isLoggedIn) {
      return null
    }

    const isActive = pathname === item.href
    const Icon = item.icon

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
          isActive
            ? 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {item.badge && (
            <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
              {item.badge}
            </span>
          )}
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </Link>
    )
  }

  return (
    <>
      {/* ドロワーメニュー（サイドバー） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ドロワーヘッダー */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Requi</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* ユーザー情報 */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold">{userName}</p>
                <p className="text-sm text-white/80">
                  {userRole === 'creator' ? 'クリエイター' : 'クライアント'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="block w-full px-4 py-2 bg-white text-pink-500 rounded-lg text-center font-medium hover:bg-white/90 transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="block w-full px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg text-center font-medium hover:bg-white/30 transition-colors"
              >
                新規登録
              </Link>
            </div>
          )}
        </div>

        {/* ドロワーコンテンツ */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* メインナビゲーション */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
              メニュー
            </h3>
            <div className="space-y-1">
              {mainNavItems.map(renderMenuItem)}
            </div>
          </div>

          {/* ユーザーメニュー */}
          {isLoggedIn && userMenuItems.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                マイメニュー
              </h3>
              <div className="space-y-1">
                {userMenuItems.map(renderMenuItem)}
              </div>
            </div>
          )}

          {/* サポート */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
              サポート
            </h3>
            <div className="space-y-1">
              {supportMenuItems.map(renderMenuItem)}
            </div>
          </div>

          {/* 設定 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
              設定
            </h3>
            <div className="space-y-1">
              {settingsMenuItems.map(renderMenuItem)}
              
              {/* ダークモード切り替え */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span className="font-medium">
                    {isDarkMode ? 'ダークモード' : 'ライトモード'}
                  </span>
                </div>
                <div className={`w-12 h-6 bg-gray-300 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-pink-500' : ''}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* ログアウト */}
          {isLoggedIn && (
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">ログアウト</span>
              </button>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500">
            <p>© 2024 Requi</p>
            <div className="flex justify-center space-x-3 mt-2">
              <Link href="/terms" className="hover:text-gray-700">利用規約</Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-gray-700">プライバシー</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ボトムナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="flex items-center justify-around h-16">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                  isActive ? 'text-pink-500' : 'text-gray-500'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-pink-500" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ハンバーガーメニューボタン（ヘッダー用） */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
    </>
  )
}

// ========================================
// 使用例
// ========================================
/*
// 親コンポーネントでの使用例
import MobileNav from '@/components/layout/MobileNav'

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <>
      <MobileNav 
        isLoggedIn={isLoggedIn}
        userRole="creator"
        userName="さくらアート"
      />
      <main className="pb-16 md:pb-0">
        {children}
      </main>
    </>
  )
}
*/