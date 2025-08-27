<template>
  <div class="bg-white border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <nav class="flex items-center space-x-2 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-pink-500 transition-colors">
          ホーム
        </NuxtLink>
        <Icon 
          v-for="(item, index) in breadcrumbs" 
          :key="`chevron-${index}`"
          name="lucide:chevron-right" 
          class="w-4 h-4" 
        />
        <template v-for="(item, index) in breadcrumbs" :key="index">
          <NuxtLink 
            v-if="item.to && index < breadcrumbs.length - 1"
            :to="item.to"
            class="hover:text-pink-500 transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
          <span 
            v-else
            :class="index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'"
          >
            {{ item.name }}
          </span>
          <Icon 
            v-if="index < breadcrumbs.length - 1"
            name="lucide:chevron-right" 
            class="w-4 h-4"
          />
        </template>
      </nav>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})

// 使用例:
// <AppBreadcrumb :breadcrumbs="[
//   { name: 'サービス', to: '/services' },
//   { name: '依頼方法' }
// ]" />
</script>