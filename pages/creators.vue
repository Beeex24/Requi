<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="クリエイター一覧 - Requi レキ"
      description="才能豊かなクリエイターたちをご紹介。イラスト、デザイン、ボイス、動画など様々な分野のプロフェッショナルが在籍しています。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          クリエイター一覧
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          才能豊かなクリエイターたちがあなたの理想の作品を制作します
        </p>
        
        <div class="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full">
          <Icon name="lucide:users" class="w-4 h-4 text-pink-500 mr-2" />
          <span class="text-sm font-medium text-pink-600">{{ totalCreators }}名のクリエイターが活動中</span>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="bg-white py-8 border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Search Bar -->
          <div class="flex-1">
            <div class="relative">
              <Icon name="lucide:search" class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="クリエイター名や得意分野で検索..."
                class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                @input="handleSearch"
              />
            </div>
          </div>

          <!-- Sort Options -->
          <div class="flex items-center gap-3">
            <div class="relative" ref="sortDropdownRef">
              <button 
                @click="showSortDropdown = !showSortDropdown"
                class="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon name="lucide:arrow-up-down" class="w-4 h-4" />
                <span>{{ sortOptions.find(option => option.value === currentSort)?.label }}</span>
                <Icon name="lucide:chevron-down" class="w-4 h-4" />
              </button>
              
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-show="showSortDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  <div class="py-2">
                    <button
                      v-for="option in sortOptions"
                      :key="option.value"
                      @click="selectSort(option.value)"
                      :class="`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        currentSort === option.value ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                      }`"
                    >
                      {{ option.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="bg-white py-4 sticky top-16 z-40 border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 overflow-x-auto">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeCategory = category.id"
              :class="`flex items-center space-x-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-pink-50 text-pink-600 border border-pink-200'
                  : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
              }`"
            >
              <Icon :name="category.iconName" :class="`w-4 h-4 ${activeCategory === category.id ? category.color : 'text-gray-400'}`" />
              <span class="font-medium">{{ category.name }}</span>
              <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {{ category.count }}
              </span>
            </button>
          </div>

          <!-- Filter Toggle -->
          <button 
            @click="showAdvancedFilter = !showAdvancedFilter"
            class="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Icon name="lucide:filter" class="w-4 h-4" />
            <span>詳細フィルター</span>
            <Icon 
              name="lucide:chevron-down" 
              :class="`w-4 h-4 transform transition-transform ${showAdvancedFilter ? 'rotate-180' : ''}`" 
            />
          </button>
        </div>
      </div>
    </section>

    <!-- Advanced Filter Panel -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <section v-show="showAdvancedFilter" class="bg-white border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Price Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">価格帯</label>
              <div class="flex space-x-2">
                <input
                  v-model.number="priceRange.min"
                  type="number"
                  placeholder="最小"
                  class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <span class="flex items-center text-gray-500">〜</span>
                <input
                  v-model.number="priceRange.max"
                  type="number"
                  placeholder="最大"
                  class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <!-- Rating -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">評価</label>
              <select 
                v-model="ratingFilter"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="">すべて</option>
                <option value="5">5.0</option>
                <option value="4.5">4.5以上</option>
                <option value="4.0">4.0以上</option>
                <option value="3.5">3.5以上</option>
              </select>
            </div>

            <!-- Response Time -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">レスポンス</label>
              <select 
                v-model="responseTimeFilter"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="">すべて</option>
                <option value="fast">1時間以内</option>
                <option value="medium">24時間以内</option>
                <option value="slow">3日以内</option>
              </select>
            </div>

            <!-- Availability -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">募集状況</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="onlyAvailable"
                    type="checkbox"
                    class="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">募集中のみ表示</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
            <button 
              @click="clearFilters"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              フィルターをクリア
            </button>
            <button 
              @click="applyFilters"
              class="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
            >
              フィルターを適用
            </button>
          </div>
        </div>
      </section>
    </Transition>

    <!-- Creators Grid -->
    <section class="py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900">
              {{ activeCategory === 'all' ? 'すべてのクリエイター' : `${categories.find(c => c.id === activeCategory)?.name}のクリエイター` }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              {{ filteredCreators.length }}名のクリエイターが見つかりました
              <span v-if="searchQuery">「{{ searchQuery }}」の検索結果</span>
            </p>
          </div>
        </div>

        <!-- Loading State -->
        <AppLoader v-if="isLoading" message="クリエイターを読み込み中..." />

        <!-- No Results -->
        <div v-else-if="filteredCreators.length === 0" class="text-center py-12">
          <Icon name="lucide:users-x" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">クリエイターが見つかりませんでした</h3>
          <p class="text-gray-600 mb-4">
            検索条件を変更するか、フィルターをクリアしてお試しください
          </p>
          <button 
            @click="clearAllFilters"
            class="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            すべてのフィルターをクリア
          </button>
        </div>

        <!-- Creators Grid -->
        <div 
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div 
            v-for="creator in paginatedCreators" 
            :key="creator.id" 
            class="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all group cursor-pointer"
          >
            <!-- Avatar and Status -->
            <div class="relative inline-block mb-4">
              <img 
                :src="creator.avatar"
                :alt="creator.name"
                class="w-20 h-20 rounded-full object-cover mx-auto"
              />
              <div :class="`absolute -bottom-1 -right-1 w-6 h-6 border-2 border-white rounded-full ${
                creator.isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`"></div>
            </div>
            
            <!-- Badge -->
            <div class="mb-2">
              <span :class="`inline-block px-2 py-1 text-xs rounded-full font-medium ${getBadgeClass(creator.badge)}`">
                {{ creator.badge }}
              </span>
            </div>
            
            <!-- Name and Specialty -->
            <h3 class="font-bold text-gray-900 mb-1">{{ creator.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ creator.specialty }}</p>
            
            <!-- Stats -->
            <div class="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-3">
              <div class="flex items-center">
                <Icon name="lucide:users" class="w-3 h-3 mr-1" />
                {{ creator.followers }}
              </div>
              <div class="flex items-center">
                <Icon name="lucide:star" class="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                {{ creator.rating }}
              </div>
              <div class="flex items-center">
                <Icon name="lucide:check-circle" class="w-3 h-3 mr-1" />
                {{ creator.completedWorks }}
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap justify-center gap-1 mb-4">
              <span 
                v-for="(tag, index) in creator.tags.slice(0, 3)" 
                :key="index" 
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{{ tag }}
              </span>
            </div>
            
            <!-- Price and Response Time -->
            <div class="mb-4">
              <div class="text-lg font-bold text-pink-600 mb-1">
                ¥{{ creator.minPrice.toLocaleString() }}〜
              </div>
              <div class="text-xs text-gray-500 flex items-center justify-center">
                <Icon name="lucide:clock" class="w-3 h-3 mr-1" />
                レスポンス: {{ creator.responseTime }}
              </div>
            </div>

            <!-- Availability -->
            <div class="mb-4">
              <span :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                creator.isAvailable 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`">
                <div :class="`w-2 h-2 rounded-full mr-1 ${
                  creator.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`"></div>
                {{ creator.isAvailable ? '募集中' : '多忙' }}
              </span>
            </div>
            
            <!-- Actions -->
            <div class="flex space-x-2">
              <button 
                @click.stop="toggleBookmark(creator.id)"
                :class="`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                  bookmarkedCreators.has(creator.id)
                    ? 'border-pink-200 bg-pink-50 text-pink-600'
                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50 text-gray-700'
                }`"
              >
                <Icon 
                  name="lucide:bookmark" 
                  :class="`w-4 h-4 mx-auto ${bookmarkedCreators.has(creator.id) ? 'fill-current' : ''}`" 
                />
              </button>
              <button class="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 px-3 rounded-lg hover:shadow-lg transition-all font-medium group-hover:scale-105">
                プロフィール
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>

          <div class="flex space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="`px-3 py-2 rounded transition-colors ${
                page === currentPage
                  ? 'bg-pink-500 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />

    <!-- Notifications -->
    <AppNotification
      v-if="notification.show"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      @close="hideNotification"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// パンくずナビゲーション
const breadcrumbs = ref([
  { name: 'クリエイター' }
])

// データの状態管理
const activeCategory = ref('all')
const bookmarkedCreators = ref(new Set())
const searchQuery = ref('')
const isLoading = ref(false)
const showSortDropdown = ref(false)
const showAdvancedFilter = ref(false)
const currentSort = ref('popular')
const currentPage = ref(1)
const itemsPerPage = ref(12)

// ドロップダウンの参照
const sortDropdownRef = ref(null)

// フィルター状態
const priceRange = ref({ min: null, max: null })
const ratingFilter = ref('')
const responseTimeFilter = ref('')
const onlyAvailable = ref(false)

// 通知システム
const notification = ref({
  show: false,
  type: 'info',
  title: '',
  message: ''
})

// ソートオプション
const sortOptions = ref([
  { value: 'popular', label: '人気順' },
  { value: 'rating', label: '評価の高い順' },
  { value: 'price-low', label: '価格の安い順' },
  { value: 'price-high', label: '価格の高い順' },
  { value: 'newest', label: '新着順' },
  { value: 'response-fast', label: 'レスポンスの早い順' }
])

// カテゴリー
const categories = ref([
  { id: 'all', name: 'すべて', iconName: 'lucide:sparkles', count: 847, color: 'text-purple-500' },
  { id: 'illustration', name: 'イラスト', iconName: 'lucide:brush', count: 324, color: 'text-pink-500' },
  { id: 'design', name: 'デザイン', iconName: 'lucide:camera', count: 156, color: 'text-blue-500' },
  { id: 'voice', name: 'ボイス', iconName: 'lucide:mic', count: 89, color: 'text-green-500' },
  { id: 'video', name: '動画', iconName: 'lucide:video', count: 67, color: 'text-orange-500' },
])

// クリエイターデータ
const allCreators = ref([
  {
    id: 1,
    name: "みお🎨",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c830645f?w=150&h=150&fit=crop&crop=face",
    specialty: "VTuberアバター・キャラクターデザイン",
    followers: 1234,
    rating: 4.9,
    completedWorks: 156,
    minPrice: 5000,
    maxPrice: 50000,
    tags: ["VTuber", "Live2D", "キャラクター", "アニメ風"],
    badge: "人気急上昇",
    category: "illustration",
    isOnline: true,
    isAvailable: true,
    responseTime: "1時間以内",
    joinDate: new Date('2023-06-15')
  },
  {
    id: 2,
    name: "デザイン工房K",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "ロゴ・ブランディングデザイン",
    followers: 892,
    rating: 4.8,
    completedWorks: 243,
    minPrice: 8000,
    maxPrice: 80000,
    tags: ["ロゴ", "ブランディング", "シンプル", "企業"],
    badge: "プロ認定",
    category: "design",
    isOnline: false,
    isAvailable: true,
    responseTime: "3時間以内",
    joinDate: new Date('2023-03-10')
  },
  {
    id: 3,
    name: "声優ひなた",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    specialty: "ナレーション・ボイスアクト",
    followers: 567,
    rating: 5.0,
    completedWorks: 89,
    minPrice: 2500,
    maxPrice: 25000,
    tags: ["ナレーション", "癒し", "女性", "アニメ"],
    badge: "満足度No.1",
    category: "voice",
    isOnline: true,
    isAvailable: false,
    responseTime: "30分以内",
    joinDate: new Date('2023-08-20')
  },
  {
    id: 4,
    name: "アニメスタジオ零",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialty: "アニメーション・モーショングラフィックス",
    followers: 445,
    rating: 4.7,
    completedWorks: 67,
    minPrice: 15000,
    maxPrice: 200000,
    tags: ["アニメ", "モーション", "動画", "2D"],
    badge: "プロ認定",
    category: "video",
    isOnline: true,
    isAvailable: true,
    responseTime: "2時間以内",
    joinDate: new Date('2023-05-05')
  }
  // 他のクリエイターデータも同様に追加...
])

// 計算プロパティ
const totalCreators = computed(() => allCreators.value.length)

const filteredCreators = computed(() => {
  let creators = [...allCreators.value]

  // カテゴリーフィルター
  if (activeCategory.value !== 'all') {
    creators = creators.filter(creator => creator.category === activeCategory.value)
  }

  // 検索フィルター
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    creators = creators.filter(creator => 
      creator.name.toLowerCase().includes(query) ||
      creator.specialty.toLowerCase().includes(query) ||
      creator.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 価格フィルター
  if (priceRange.value.min !== null) {
    creators = creators.filter(creator => creator.minPrice >= priceRange.value.min)
  }
  if (priceRange.value.max !== null) {
    creators = creators.filter(creator => creator.minPrice <= priceRange.value.max)
  }

  // 評価フィルター
  if (ratingFilter.value) {
    creators = creators.filter(creator => creator.rating >= parseFloat(ratingFilter.value))
  }

  // 募集中フィルター
  if (onlyAvailable.value) {
    creators = creators.filter(creator => creator.isAvailable)
  }

  // ソート
  creators.sort((a, b) => {
    switch (currentSort.value) {
      case 'popular':
        return b.followers - a.followers
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.minPrice - b.minPrice
      case 'price-high':
        return b.minPrice - a.minPrice
      case 'newest':
        return new Date(b.joinDate) - new Date(a.joinDate)
      case 'response-fast':
        return a.responseTime.localeCompare(b.responseTime)
      default:
        return 0
    }
  })

  return creators
})

const totalPages = computed(() => Math.ceil(filteredCreators.value.length / itemsPerPage.value))

const paginatedCreators = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCreators.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2

  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    pages.push(i)
  }

  return pages
})

// メソッド
const handleSearch = () => {
  currentPage.value = 1
}

const selectSort = (sortValue) => {
  currentSort.value = sortValue
  showSortDropdown.value = false
  currentPage.value = 1
}

const applyFilters = () => {
  showAdvancedFilter.value = false
  currentPage.value = 1
  showNotification('info', 'フィルター適用', 'フィルターが適用されました')
}

const clearFilters = () => {
  priceRange.value = { min: null, max: null }
  ratingFilter.value = ''
  responseTimeFilter.value = ''
  onlyAvailable.value = false
}

const clearAllFilters = () => {
  clearFilters()
  searchQuery.value = ''
  activeCategory.value = 'all'
  currentSort.value = 'popular'
  currentPage.value = 1
  showNotification('success', 'フィルタークリア', 'すべてのフィルターがクリアされました')
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const toggleBookmark = (creatorId) => {
  const newBookmarked = new Set(bookmarkedCreators.value)
  if (newBookmarked.has(creatorId)) {
    newBookmarked.delete(creatorId)
  } else {
    newBookmarked.add(creatorId)
    showNotification('success', 'ブックマーク', 'クリエイターをブックマークしました')
  }
  bookmarkedCreators.value = newBookmarked
}

const getBadgeClass = (badge) => {
  const badgeClasses = {
    '人気急上昇': 'bg-pink-100 text-pink-600',
    '満足度No.1': 'bg-yellow-100 text-yellow-600',
    'プロ認定': 'bg-blue-100 text-blue-600',
    '新人': 'bg-green-100 text-green-600',
    'ベテラン': 'bg-purple-100 text-purple-600'
  }
  return badgeClasses[badge] || 'bg-gray-100 text-gray-600'
}

const showNotification = (type, title, message) => {
  notification.value = {
    show: true,
    type,
    title,
    message
  }
}

const hideNotification = () => {
  notification.value.show = false
}

// 外部クリック処理
const handleClickOutside = (event) => {
  if (sortDropdownRef.value && !sortDropdownRef.value.contains(event.target)) {
    showSortDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>