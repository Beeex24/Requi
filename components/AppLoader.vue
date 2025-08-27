<template>
  <div 
    :class="[
      'flex items-center justify-center',
      { 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50': overlay },
      { 'py-8': !overlay }
    ]"
  >
    <div class="text-center">
      <!-- スピナー -->
      <div class="relative mb-4">
        <div 
          class="w-10 h-10 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin mx-auto"
          :class="sizeClasses"
        ></div>
      </div>
      
      <!-- メッセージ -->
      <p v-if="message" class="text-gray-600 text-sm animate-pulse">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  message: {
    type: String,
    default: '読み込み中...'
  },
  overlay: {
    type: Boolean,
    default: false
  }
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4'
  }
  return sizes[props.size]
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>