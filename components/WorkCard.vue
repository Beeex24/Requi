<template>
  <div 
    :class="`group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
      viewMode === 'list' ? 'flex' : ''
    }`"
  >
    <!-- Grid View -->
    <template v-if="viewMode === 'grid'">
      <!-- Image -->
      <div class="relative aspect-[4/5] overflow-hidden">
        <img 
          :src="work.image" 
          :alt="work.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <!-- Badges -->
        <div class="absolute top-3 left-3">
          <span v-if="work.isNew" class="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            NEW
          </span>
        </div>
        
        <div v-if="work.originalPrice" class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          -{{ Math.round((1 - work.price / work.originalPrice) * 100) }}%
        </div>
        
        <!-- Hover Actions -->
        <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="flex space-x-2">
            <button 
              @click.stop="$emit('like', work.id)"
              :class="`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isLiked 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:text-pink-500'
              }`"
            >
              <Icon name="lucide:heart" :class="`w-4 h-4 ${isLiked ? 'fill-current' : ''}`" />
            </button>
            <button class="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-blue-500 transition-colors">
              <Icon name="lucide:share" class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <!-- Stats Overlay -->
        <div class="absolute bottom-3 left-3 flex items-center space-x-3 text-white text-sm">
          <div class="flex items-center bg-black/50 rounded-full px-2 py-1">
            <Icon name="lucide:heart" class="w-3 h-3 mr-1" />
            {{ work.likes }}
          </div>
          <div class="flex items-center bg-black/50 rounded-full px-2 py-1">
            <Icon name="lucide:eye" class="w-3 h-3 mr-1" />
            {{ work.views }}
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <img 
              :src="work.creatorAvatar" 
              :alt="work.creator"
              class="w-6 h-6 rounded-full object-cover"
            />
            <span class="text-sm font-medium text-gray-900">{{ work.creator }}</span>
          </div>
          <button 
            @click.stop="$emit('bookmark', work.creator)"
            :class="`p-1 rounded transition-colors ${
              isBookmarked 
                ? 'text-yellow-500' 
                : 'text-gray-400 hover:text-yellow-500'
            }`"
          >
            <Icon name="lucide:bookmark" :class="`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`" />
          </button>
        </div>
        
        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-1">{{ work.title }}</h3>
        
        <div class="flex flex-wrap gap-1 mb-3">
          <span 
            v-for="(tag, index) in work.tags.slice(0, 3)" 
            :key="index" 
            class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
          >
            #{{ tag }}
          </span>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-lg font-bold text-pink-600">
                ¥{{ work.price.toLocaleString() }}
              </span>
              <span v-if="work.originalPrice" class="text-sm text-gray-400 line-through">
                ¥{{ work.originalPrice.toLocaleString() }}
              </span>
            </div>
            <div class="text-xs text-gray-500 flex items-center">
              <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
              {{ work.deliveryDays }}日納品
            </div>
          </div>
          <button class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium">
            リクエスト
          </button>
        </div>
      </div>
    </template>

    <!-- List View -->
    <template v-else>
      <div class="flex items-center p-4 space-x-4 w-full">
        <img 
          :src="work.image" 
          :alt="work.title"
          class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <h3 class="font-semibold text-gray-900 truncate">{{ work.title }}</h3>
            <span v-if="work.isNew" class="bg-pink-100 text-pink-600 px-2 py-0.5 rounded text-xs font-medium">NEW</span>
          </div>
          <div class="flex items-center space-x-2 mb-2">
            <img 
              :src="work.creatorAvatar" 
              :alt="work.creator"
              class="w-4 h-4 rounded-full object-cover"
            />
            <span class="text-sm text-gray-600">{{ work.creator }}</span>
          </div>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <div class="flex items-center">
              <Icon name="lucide:heart" class="w-3 h-3 mr-1" />
              {{ work.likes }}
            </div>
            <div class="flex items-center">
              <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
              {{ work.deliveryDays }}日
            </div>
          </div>
        </div>
        
        <div class="text-right flex-shrink-0">
          <div class="text-lg font-bold text-pink-600 mb-1">
            ¥{{ work.price.toLocaleString() }}
          </div>
          <button class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium">
            リクエスト
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  work: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid'
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  isBookmarked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['like', 'bookmark'])
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>