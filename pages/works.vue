<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="作品一覧 - Requi レキ"
      description="クリエイターが制作した素敵な作品をご覧ください。イラスト、デザイン、ボイス、動画など様々なジャンルの作品を掲載しています。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          作品一覧
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          才能豊かなクリエイターたちが制作した素敵な作品をご覧ください
        </p>
        
        <div class="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full">
          <Icon name="lucide:palette" class="w-4 h-4 text-pink-500 mr-2" />
          <span class="text-sm font-medium text-pink-600">{{ totalWorks }}点の作品を掲載中</span>
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
                placeholder="作品やクリエイターを検索..."
                class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                @input="handleSearch"
              />
            </div>
          </div>

          <!-- Sort and View Options -->
          <div class="flex items-center gap-3">
            <!-- Sort Dropdown -->
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

            <!-- View Mode Toggle -->
            <div class="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                @click="viewMode = 'grid'"
                :class="`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`"
              >
                <Icon name="lucide:grid" class="w-4 h-4" />
              </button>
              <button
                @click="viewMode = 'list'"
                :class="`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`"
              >
                <Icon name="lucide:list" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="bg-white py-4 sticky top-16 z-40 border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>

    <!-- Works Grid -->
    <section class="py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900">
              {{ activeCategory === 'all' ? 'すべての作品' : `${categories.find(c => c.id === activeCategory)?.name}の作品` }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              {{ filteredWorks.length }}件の作品が見つかりました
              <span v-if="searchQuery">「{{ searchQuery }}」の検索結果</span>
            </p>
          </div>

          <!-- Advanced Filter Toggle -->
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

        <!-- Advanced Filter Panel -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div v-show="showAdvancedFilter" class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Price Range -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">価格帯</label>
                <div class="space-y-2">
                  <div class="flex space-x-2">
                    <input
                      v-model.number="priceRange.min"
                      type="number"
                      placeholder="最小価格"
                      class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <span class="flex items-center text-gray-500">〜</span>
                    <input
                      v-model.number="priceRange.max"
                      type="number"
                      placeholder="最大価格"
                      class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              <!-- Delivery Days -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">納期</label>
                <select 
                  v-model="deliveryDaysFilter"
                  class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                >
                  <option value="">すべて</option>
                  <option value="1-3">1-3日</option>
                  <option value="4-7">4-7日</option>
                  <option value="8-14">8-14日</option>
                  <option value="15+">15日以上</option>
                </select>
              </div>

              <!-- Tags -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">人気タグ</label>
                <div class="flex flex-wrap gap-1">
                  <button
                    v-for="tag in popularTags.slice(0, 8)"
                    :key="tag"
                    @click="toggleTag(tag)"
                    :class="`px-2 py-1 text-xs rounded border transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-pink-50 border-pink-200 text-pink-600'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-pink-50'
                    }`"
                  >
                    #{{ tag }}
                  </button>
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
        </Transition>

        <!-- Loading State -->
        <AppLoader v-if="isLoading" message="作品を読み込み中..." />

        <!-- No Results -->
        <div v-else-if="filteredWorks.length === 0" class="text-center py-12">
          <Icon name="lucide:search-x" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">作品が見つかりませんでした</h3>
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

        <!-- Works Grid -->
        <div 
          v-else
          :class="`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`"
        >
          <WorkCard
            v-for="work in paginatedWorks"
            :key="work.id"
            :work="work"
            :view-mode="viewMode"
            :is-liked="likedWorks.has(work.id)"
            :is-bookmarked="bookmarkedCreators.has(work.creator)"
            @like="toggleLike"
            @bookmark="toggleBookmark"
          />
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
  { name: '作品一覧' }
])

// データの状態管理
const activeCategory = ref('all')
const likedWorks = ref(new Set())
const bookmarkedCreators = ref(new Set())
const viewMode = ref('grid')
const searchQuery = ref('')
const isLoading = ref(false)
const showSortDropdown = ref(false)
const showAdvancedFilter = ref(false)
const currentSort = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(12)

// ドロップダウンの参照
const sortDropdownRef = ref(null)

// フィルター状態
const priceRange = ref({ min: null, max: null })
const deliveryDaysFilter = ref('')
const selectedTags = ref([])

// 通知システム
const notification = ref({
  show: false,
  type: 'info',
  title: '',
  message: ''
})

// ソートオプション
const sortOptions = ref([
  { value: 'newest', label: '新着順' },
  { value: 'oldest', label: '古い順' },
  { value: 'popular', label: '人気順' },
  { value: 'price-low', label: '価格の安い順' },
  { value: 'price-high', label: '価格の高い順' },
  { value: 'delivery-fast', label: '納期の短い順' }
])

// カテゴリー
const categories = ref([
  { id: 'all', name: 'すべて', iconName: 'lucide:sparkles', count: 2543, color: 'text-purple-500' },
  { id: 'illustration', name: 'イラスト', iconName: 'lucide:brush', count: 1234, color: 'text-pink-500' },
  { id: 'design', name: 'デザイン', iconName: 'lucide:camera', count: 567, color: 'text-blue-500' },
  { id: 'voice', name: 'ボイス', iconName: 'lucide:mic', count: 234, color: 'text-green-500' },
  { id: 'video', name: '動画', iconName: 'lucide:video', count: 156, color: 'text-orange-500' },
])

// 人気タグ
const popularTags = ref([
  "VTuber", "アニメ風", "ロゴ", "キャラクター", "ナレーション", 
  "Live2D", "背景", "アイコン", "ポートレート", "ゲーム", "漫画", "リアル"
])

// 作品データ（実際のAPIから取得する想定）
const allWorks = ref([
  {
    id: 1,
    title: "オリジナルVTuberアバター",
    creator: "みお🎨",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616c830645f?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    price: 8000,
    originalPrice: 12000,
    likes: 234,
    views: 1420,
    isNew: true,
    tags: ["VTuber", "アバター", "Live2D"],
    deliveryDays: 7,
    category: "illustration",
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: "シンプルロゴデザイン",
    creator: "デザイン工房K",
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop",
    price: 5000,
    originalPrice: null,
    likes: 156,
    views: 890,
    isNew: false,
    tags: ["ロゴ", "シンプル", "ブランディング"],
    deliveryDays: 3,
    category: "design",
    createdAt: new Date('2024-01-10')
  },
  {
    id: 3,
    title: "癒し系ナレーション",
    creator: "声優ひなた",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
    price: 3000,
    originalPrice: null,
    likes: 89,
    views: 456,
    isNew: true,
    tags: ["ナレーション", "癒し", "女性"],
    deliveryDays: 2,
    category: "voice",
    createdAt: new Date('2024-01-20')
  },
  // ... 他の作品データ
])

// 計算プロパティ
const totalWorks = computed(() => allWorks.value.length)

const filteredWorks = computed(() => {
  let works = [...allWorks.value]

  // カテゴリーフィルター
  if (activeCategory.value !== 'all') {
    works = works.filter(work => work.category === activeCategory.value)
  }

  // 検索フィルター
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    works = works.filter(work => 
      work.title.toLowerCase().includes(query) ||
      work.creator.toLowerCase().includes(query) ||
      work.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 価格フィルター
  if (priceRange.value.min !== null) {
    works = works.filter(work => work.price >= priceRange.value.min)
  }
  if (priceRange.value.max !== null) {
    works = works.filter(work => work.price <= priceRange.value.max)
  }

  // 納期フィルター
  if (deliveryDaysFilter.value) {
    const [min, max] = deliveryDaysFilter.value.includes('+') 
      ? [15, Infinity]
      : deliveryDaysFilter.value.split('-').map(Number)
    works = works.filter(work => work.deliveryDays >= min && work.deliveryDays <= (max || min))
  }

  // タグフィルター
  if (selectedTags.value.length > 0) {
    works = works.filter(work => 
      selectedTags.value.some(tag => work.tags.includes(tag))
    )
  }

  // ソート
  works.sort((a, b) => {
    switch (currentSort.value) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'popular':
        return b.likes - a.likes
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'delivery-fast':
        return a.deliveryDays - b.deliveryDays
      default:
        return 0
    }
  })

  return works
})

const totalPages = computed(() => Math.ceil(filteredWorks.value.length / itemsPerPage.value))

const paginatedWorks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredWorks.value.slice(start, end)
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

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const applyFilters = () => {
  showAdvancedFilter.value = false
  currentPage.value = 1
  showNotification('info', 'フィルター適用', 'フィルターが適用されました')
}

const clearFilters = () => {
  priceRange.value = { min: null, max: null }
  deliveryDaysFilter.value = ''
  selectedTags.value = []
}

const clearAllFilters = () => {
  clearFilters()
  searchQuery.value = ''
  activeCategory.value = 'all'
  currentSort.value = 'newest'
  currentPage.value = 1
  showNotification('success', 'フィルタークリア', 'すべてのフィルターがクリアされました')
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const toggleLike = (workId) => {
  const newLiked = new Set(likedWorks.value)
  if (newLiked.has(workId)) {
    newLiked.delete(workId)
  } else {
    newLiked.add(workId)
    showNotification('success', 'いいね！', '作品をお気に入りに追加しました')
  }
  likedWorks.value = newLiked
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

// ページ読み込み時の処理
onMounted(() => {
  // URLパラメーターからの初期化なども可能
})
</script>