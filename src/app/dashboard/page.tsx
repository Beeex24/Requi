// ========================================
// src/app/dashboard/page.tsx
// ダッシュボードメインページ
// ========================================
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Star,
  Clock,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  Heart,
  MessageSquare,
  Bell,
  ChevronRight,
  MoreVertical,
  Download,
  Upload,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  Sparkles,
  Zap,
  Target,
  Activity,
  PlusCircle,
  Filter,
  BarChart3,
  FileText,
  Settings
} from 'lucide-react'

// ========================================
// 型定義
// ========================================
interface StatCard {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  icon: React.ElementType
  color: string
  bgColor: string
}

interface RecentActivity {
  id: string
  type: 'order' | 'review' | 'payment' | 'message' | 'achievement'
  title: string
  description: string
  time: string
  icon: React.ElementType
  iconColor: string
  read: boolean
}

interface RecentWork {
  id: string
  title: string
  image: string
  views: number
  likes: number
  status: 'active' | 'pending' | 'completed'
  price: number
  createdAt: string
}

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  time: string
  read: boolean
}

// ========================================
// メインコンポーネント
// ========================================
export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')
  const [showAllActivities, setShowAllActivities] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 初期ロードのシミュレーション
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  // 統計データ
  const statsData: StatCard[] = [
    {
      title: '今月の収益',
      value: '¥485,230',
      change: 12.5,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: '総作品数',
      value: 42,
      change: 3,
      changeType: 'increase',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: '完了した依頼',
      value: 128,
      change: 8,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: '平均評価',
      value: 4.9,
      change: 0.2,
      changeType: 'increase',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  // 最近のアクティビティ
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'order',
      title: '新しい依頼が届きました',
      description: 'VTuberアバターのイラスト制作',
      time: '5分前',
      icon: FileText,
      iconColor: 'text-blue-500',
      read: false
    },
    {
      id: '2',
      type: 'review',
      title: '新しいレビューが投稿されました',
      description: '★★★★★ とても素敵な作品でした！',
      time: '2時間前',
      icon: Star,
      iconColor: 'text-yellow-500',
      read: false
    },
    {
      id: '3',
      type: 'payment',
      title: '支払いが完了しました',
      description: '¥35,000 が入金されました',
      time: '5時間前',
      icon: DollarSign,
      iconColor: 'text-green-500',
      read: true
    },
    {
      id: '4',
      type: 'achievement',
      title: 'アチーブメント達成！',
      description: '100件の依頼を完了しました',
      time: '1日前',
      icon: Award,
      iconColor: 'text-purple-500',
      read: true
    },
    {
      id: '5',
      type: 'message',
      title: '新しいメッセージ',
      description: 'クライアントからメッセージが届いています',
      time: '2日前',
      icon: MessageSquare,
      iconColor: 'text-pink-500',
      read: true
    }
  ]

  // 最近の作品
  const recentWorks: RecentWork[] = [
    {
      id: '1',
      title: 'オリジナルキャラクター',
      image: '/api/placeholder/200/200',
      views: 1234,
      likes: 89,
      status: 'active',
      price: 15000,
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'VTuberアバター',
      image: '/api/placeholder/200/200',
      views: 856,
      likes: 67,
      status: 'active',
      price: 25000,
      createdAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'ロゴデザイン',
      image: '/api/placeholder/200/200',
      views: 432,
      likes: 34,
      status: 'pending',
      price: 8000,
      createdAt: '2024-01-15'
    },
    {
      id: '4',
      title: 'イラスト背景',
      image: '/api/placeholder/200/200',
      views: 678,
      likes: 45,
      status: 'completed',
      price: 12000,
      createdAt: '2024-01-12'
    }
  ]

  // 通知
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'info',
      title: 'システムメンテナンス',
      message: '1月25日 AM2:00-4:00にメンテナンスを実施します',
      time: '1時間前',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: '手数料率が下がりました',
      message: '実績に応じて手数料が8%から6%に下がりました！',
      time: '3日前',
      read: true
    }
  ]

  // チャートデータ（仮）
  const chartData = [
    { month: '1月', revenue: 320000 },
    { month: '2月', revenue: 380000 },
    { month: '3月', revenue: 420000 },
    { month: '4月', revenue: 485230 },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="spinner-kawaii mb-4"></div>
          <p className="text-gray-600">ダッシュボードを読み込んでいます...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ダッシュボード
          </h1>
          <p className="mt-1 text-gray-600">
            こんにちは、さくらアートさん 👋
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{selectedPeriod === 'week' ? '今週' : selectedPeriod === 'month' ? '今月' : '今年'}</span>
          </button>
          <Link
            href="/dashboard/works/new"
            className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="text-sm font-medium">新規作品</span>
          </Link>
        </div>
      </div>

      {/* 通知バナー */}
      {notifications.filter(n => !n.read).length > 0 && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Bell className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {notifications.find(n => !n.read)?.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {notifications.find(n => !n.read)?.message}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">前月比</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* メインコンテンツグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側：グラフとアクティビティ */}
        <div className="lg:col-span-2 space-y-6">
          {/* 収益グラフ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">収益推移</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedPeriod('week')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedPeriod === 'week'
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  週
                </button>
                <button
                  onClick={() => setSelectedPeriod('month')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedPeriod === 'month'
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  月
                </button>
                <button
                  onClick={() => setSelectedPeriod('year')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedPeriod === 'year'
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  年
                </button>
              </div>
            </div>
            
            {/* 簡易グラフ（実際の実装ではChart.jsやRechartsを使用） */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gradient-to-t from-pink-400 to-purple-400 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${(data.revenue / 500000) * 100}%` }}
                  />
                  <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">今月の収益</p>
                  <p className="text-2xl font-bold text-gray-900">¥485,230</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">前月比</p>
                  <p className="text-lg font-semibold text-green-600">+12.5%</p>
                </div>
              </div>
            </div>
          </div>

          {/* 最近のアクティビティ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">最近のアクティビティ</h2>
              <Link href="/dashboard/activities" className="text-sm text-pink-500 hover:text-pink-600">
                すべて見る
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.slice(0, showAllActivities ? undefined : 4).map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className={`flex items-start space-x-3 ${!activity.read ? 'bg-pink-50 -mx-2 px-2 py-2 rounded-lg' : ''}`}>
                    <div className={`p-2 bg-gray-100 rounded-lg flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    {!activity.read && (
                      <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {recentActivities.length > 4 && !showAllActivities && (
              <button
                onClick={() => setShowAllActivities(true)}
                className="mt-4 w-full text-center text-sm text-pink-500 hover:text-pink-600"
              >
                もっと見る
              </button>
            )}
          </div>
        </div>

        {/* 右側：作品とクイックアクション */}
        <div className="space-y-6">
          {/* クイックアクション */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h2>
            <div className="space-y-3">
              <Link href="/dashboard/works/new" className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:from-pink-100 hover:to-purple-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium text-gray-900">新規作品を登録</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              
              <Link href="/dashboard/requests" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">依頼を確認</span>
                  <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">3</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              
              <Link href="/dashboard/messages" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-900">メッセージ</span>
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">5</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              
              <Link href="/dashboard/earnings" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">収益管理</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* 最近の作品 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">最近の作品</h2>
              <Link href="/dashboard/works" className="text-sm text-pink-500 hover:text-pink-600">
                すべて見る
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentWorks.slice(0, 3).map((work) => (
                <Link key={work.id} href={`/dashboard/works/${work.id}`} className="block">
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{work.title}</p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {work.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {work.likes}
                        </span>
                        <span>¥{work.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      work.status === 'active' ? 'bg-green-100 text-green-600' :
                      work.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {work.status === 'active' ? '公開中' :
                       work.status === 'pending' ? '審査中' : '完了'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 目標達成状況 */}
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">今月の目標</h3>
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>収益目標</span>
                  <span>¥485,230 / ¥500,000</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '97%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>依頼完了</span>
                  <span>8 / 10件</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                あと少しで目標達成です！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}