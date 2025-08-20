"use client"

import React, { useState } from 'react';
import { Bell, Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'like', message: 'あなたの作品に❤️がつきました', time: '2分前', unread: true },
    { id: 2, type: 'order', message: '新しい依頼が届きました', time: '5分前', unread: true },
    { id: 3, type: 'message', message: 'メッセージが届いています', time: '10分前', unread: false },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Skeb風
            </span>
            <span className="hidden sm:inline-block px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium">
              β版
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">作品を見る</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">クリエイター</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">依頼方法</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">ヘルプ</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Notification */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-pink-500 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">通知</h3>
                  </div>
                  {notifications.map((notif) => (
                    <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
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
              )}
            </div>

            <button className="text-gray-600 hover:text-pink-500 transition-colors font-medium">
              ログイン
            </button>
            <button className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all font-medium">
              クリエイター登録
            </button>
            
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
            <a href="#" className="block py-2 text-gray-600 font-medium">作品を見る</a>
            <a href="#" className="block py-2 text-gray-600 font-medium">クリエイター</a>
            <a href="#" className="block py-2 text-gray-600 font-medium">依頼方法</a>
            <a href="#" className="block py-2 text-gray-600 font-medium">ヘルプ</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;