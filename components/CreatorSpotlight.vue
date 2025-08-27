<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div 
      v-for="(creator, index) in creators" 
      :key="index" 
      class="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all group cursor-pointer"
    >
      <div class="relative inline-block mb-4">
        <img 
          :src="creator.avatar"
          :alt="creator.name"
          class="w-16 h-16 rounded-full object-cover mx-auto"
        />
        <div class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      
      <div class="mb-2">
        <span :class="`inline-block px-2 py-1 text-xs rounded-full font-medium ${getBadgeClass(creator.badge)}`">
          {{ creator.badge }}
        </span>
      </div>
      
      <h3 class="font-bold text-gray-900 mb-1">{{ creator.name }}</h3>
      <p class="text-sm text-gray-600 mb-3">{{ creator.specialty }}</p>
      
      <div class="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
        <div class="flex items-center">
          <Icon name="lucide:users" class="w-3 h-3 mr-1" />
          {{ creator.followers }}
        </div>
        <div class="flex items-center">
          <Icon name="lucide:star" class="w-3 h-3 mr-1 text-yellow-400 fill-current" />
          {{ creator.rating }}
        </div>
      </div>
      
      <div class="text-lg font-bold text-pink-600 mb-4">
        ¥{{ creator.minPrice.toLocaleString() }}〜
      </div>
      
      <button class="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 rounded-lg hover:shadow-lg transition-all font-medium group-hover:scale-105">
        プロフィールを見る
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  creators: {
    type: Array,
    required: true
  }
})

const getBadgeClass = (badge) => {
  const badgeClasses = {
    '人気急上昇': 'bg-pink-100 text-pink-600',
    '満足度No.1': 'bg-yellow-100 text-yellow-600',
    'プロ認定': 'bg-blue-100 text-blue-600',
    '新人': 'bg-green-100 text-green-600'
  }
  return badgeClasses[badge] || 'bg-gray-100 text-gray-600'
}
</script>