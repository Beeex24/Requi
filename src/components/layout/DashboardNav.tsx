// ========================================
// src/components/layout/DashboardNav.tsx
// ========================================
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  DollarSign,
  BarChart3,
  Settings,
  User,
  Bell,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Heart,
  TrendingUp,
  Calendar,
  FileText,
  Upload,
  Users,
  Shield,
  HelpCircle,
  Star,
  Award,
  Zap,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Clock
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: number | string
  children?: NavItem[]
}

interface DashboardNavProps {
  userRole?: 'creator' | 'client' | 'admin'
  userName?: string
  userAvatar?: string
  userEmail?: string
}

export default function DashboardNav({ 
  userRole = 'creator',
  userName = 'ユーザー名',
  userAvatar,
  userEmail = 'user@example.com'
}: DashboardNavProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  // ロールに応じたナビゲーション項目
  const getNavigationItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      {
        name: 'ダッシュボード',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        name: 'メッセージ',
        href: '/dashboard/messages',
        icon: MessageSquare,
        badge: 3
      },
    ]

    if (userRole === 'creator') {
      return [
        ...baseItems,
        {
          name: '作品管理',
          href: '/dashboard/works',
          icon: Package,
          children: [
            { name: '作品一覧', href: '/dashboard/works', icon: Eye },
            { name: '新規作品登録', href: '/dashboard/works/new', icon: PlusCircle },
            { name: '下書き', href: '/dashboard/works/drafts', icon: Edit },
          ]
        },
        {
          name: '依頼管理',
          href: '/dashboard/requests',
          icon: FileText,
          badge: 5,
          children: [
            { name: '受注一覧', href: '/dashboard/requests', icon: FileText },
            { name: '進行中', href: '/dashboard/requests/ongoing', icon: Clock },
            { name: '完了済み', href: '/dashboard/requests/completed', icon: Award },
          ]
        },
        {
          name: '収益管理',
          href: '/dashboard/earnings',
          icon: DollarSign,
          children: [
            { name: '収益概要', href: '/dashboard/earnings', icon: TrendingUp },
            { name: '出金申請', href: '/dashboard/earnings/withdraw', icon: Download },
            { name: '取引履歴', href: '/dashboard/earnings/history', icon: Calendar },
          ]
        },
        {
          name: 'アナリティクス',
          href: '/dashboard/analytics',
          icon: BarChart3,
        },
      ]
    } else if (userRole === 'client') {
      return [
        ...baseItems,
        {
          name: '依頼管理',
          href: '/dashboard/requests',
          icon: FileText,
          children: [
            { name: '発注一覧', href: '/dashboard/requests', icon: FileText },
            { name: '進行中', href: '/dashboard/requests/ongoing', icon: Clock },
            { name: '完了済み', href: '/dashboard/requests/completed', icon: Award },
          ]
        },
        {
          name: 'お気に入り',
          href: '/dashboard/favorites',
          icon: Heart,
        },
        {
          name: '支払い履歴',
          href: '/dashboard/payments',
          icon: CreditCard,
        },
      ]
    } else {
      // Admin role
      return [
        ...baseItems,
        {
          name: 'ユーザー管理',
          href: '/dashboard/users',
          icon: Users,
        },
        {
          name: '作品管理',
          href: '/dashboard/works',
          icon: Package,
        },
        {
          name: '取引管理',
          href: '/dashboard/transactions',
          icon: DollarSign,
        },
        {
          name: 'レポート',
          href: '/dashboard/reports',
          icon: BarChart3,
        },
        {
          name: 'サポート',
          href: '/dashboard/support',
          icon: HelpCircle,
          badge: 12
        },
      ]
    }
  }

  const navigationItems = getNavigationItems()

  const settingsItems: NavItem[] = [
    {
      name: '設定',
      href: '/dashboard/settings',
      icon: Settings,
      children: [
        { name: 'プロフィール', href: '/dashboard/settings/profile', icon: User },
        { name: '支払い設定', href: '/dashboard/settings/payment', icon: CreditCard },
        { name: '通知設定', href: '/dashboard/settings/notifications', icon: Bell },
        { name: 'セキュリティ', href: '/dashboard/settings/security', icon: Shield },
      ]
    },
    {
      name: 'ヘルプ',
      href: '/help',
      icon: HelpCircle,
    },
  ]

  // パスがアクティブかチェック
  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // 子要素の展開/折りたたみ
  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  // モバイルでのサイドバーを閉じる
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ルート変更時にモバイルサイドバーを閉じる
  useEffect(() => {
    setIsMobileSidebarOpen(false)
  }, [pathname])

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.name)
    const isActive = isActiveLink(item.href)
    const Icon = item.icon

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
              isActive
                ? 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } ${depth > 0 ? 'ml-4' : ''}`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              {isSidebarOpen && (
                <>
                  <span className="text-sm">{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </div>
            {isSidebarOpen && (
              <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            )}
          </button>
          {isExpanded && isSidebarOpen && (
            <div className="mt-1 space-y-1">
              {item.children.map(child => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
          isActive
            ? 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 font-medium'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } ${depth > 0 ? 'ml-8' : ''}`}
      >
        <Icon className="w-5 h-5" />
        {isSidebarOpen && (
          <>
            <span className="text-sm">{item.name}</span>
            {item.badge && (
              <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full ml-auto">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    )
  }

  return (
    <>
      {/* モバイルヘッダー */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Requi
          </span>
        </Link>
        <div className="w-10"></div>
      </div>

      {/* オーバーレイ */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* サイドバー */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* サイドバーヘッダー */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {isSidebarOpen ? (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Requi
              </span>
            </Link>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:block p-1.5 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* ユーザー情報 */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">
                {userRole === 'creator' ? 'クリエイター' : userRole === 'client' ? 'クライアント' : '管理者'}
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                4.9
              </span>
            </div>
          )}
        </div>

        {/* クイックアクション */}
        {isSidebarOpen && userRole === 'creator' && (
          <div className="px-4 py-3 border-b border-gray-200">
            <Link
              href="/dashboard/works/new"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="text-sm font-medium">新規作品を登録</span>
            </Link>
          </div>
        )}

        {/* ナビゲーション */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navigationItems.map(item => renderNavItem(item))}
          </div>

          {/* 設定とヘルプ */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-1">
            {settingsItems.map(item => renderNavItem(item))}
          </div>
        </nav>

        {/* サイドバーフッター */}
        <div className="border-t border-gray-200 p-4">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm">ログアウト</span>}
          </button>
        </div>
      </aside>

      {/* メインコンテンツのスペーサー */}
      <div className={`hidden md:block ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`} />
    </>
  )
}

