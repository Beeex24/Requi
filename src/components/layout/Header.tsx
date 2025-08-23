// ========================================
// src/components/layout/Header.tsx
// ========================================
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  User,
  LogIn,
  Heart,
  Search,
  Globe,
  ChevronDown,
  MessageCircle
} from 'lucide-react'

interface Notification {
  id: number
  type: 'like' | 'order' | 'message'
  message: string
  time: string
  unread: boolean
}

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const notificationRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const notifications: Notification[] = [
    { id: 1, type: 'like', message: 'あなたの作品に❤️がつきました', time: '2分前', unread: true },
    { id: 2, type: 'order', message: '新しい依頼が届きました', time: '5分前', unread: true },
    { id: 3, type: 'message', message: 'メッセージが届いています', time: '10分前', unread: false },
  ]

  const navigationLinks = [
    { name: '作品を見る', href: '/works' },
    { name: 'クリエイター', href: '/creators' },
    { name: '依頼方法', href: '/how-it-works' },
    { name: 'ヘルプ', href: '/help' },
  ]

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Requi
            </span>
            <span className="hidden sm:inline-block px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium">
              β版
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-gray-600 hover:text-pink-500 transition-colors font-medium ${
                  pathname === link.href ? 'text-pink-500' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Icon (Mobile) */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Language Selector */}
            <button className="hidden md:flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">JP</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isLoggedIn ? (
              <>
                {/* Notification */}
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-600 hover:text-pink-500 transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
                    )}
                  </button>
                  
                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">通知</h3>
                        <button className="text-xs text-pink-500 hover:text-pink-600">
                          すべて既読にする
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${notif.unread ? 'bg-pink-500' : 'bg-gray-300'}`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">{notif.message}</p>
                                <p className="text-xs text-gray-500">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link href="/notifications" className="text-sm text-pink-500 hover:text-pink-600">
                          すべての通知を見る
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                      <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        ダッシュボード
                      </Link>
                      <Link href="/dashboard/works" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        作品管理
                      </Link>
                      <Link href="/dashboard/earnings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        収益
                      </Link>
                      <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        設定
                      </Link>
                      <hr className="my-2" />
                      <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        ログアウト
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  ログイン
                </Link>
                <Link 
                  href="/register" 
                  className="hidden md:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:shadow-lg transition-all font-medium"
                >
                  <Heart className="w-4 h-4" />
                  始める
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-2 space-y-2">
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block py-2 text-gray-600 font-medium hover:text-pink-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <hr className="my-2" />
                <Link href="/login" className="block py-2 text-gray-600 font-medium">
                  ログイン
                </Link>
                <Link href="/register" className="block py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg text-center font-medium">
                  無料で始める
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
