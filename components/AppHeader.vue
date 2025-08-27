<template>
  <header class="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-3">
        <div class="flex items-center space-x-3">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Icon name="lucide:sparkles" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Requi レキ
            </span>
            <span class="hidden sm:inline-block px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium">
              β版
            </span>
          </NuxtLink>
        </div>
        
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            to="/works" 
            :class="['text-gray-600 hover:text-pink-500 transition-colors font-medium', 
                    { 'text-pink-600': $route.path === '/works' }]"
          >
            作品を見る
          </NuxtLink>
          <NuxtLink 
            to="/creators" 
            :class="['text-gray-600 hover:text-pink-500 transition-colors font-medium',
                    { 'text-pink-600': $route.path === '/creators' }]"
          >
            クリエイター
          </NuxtLink>
          <NuxtLink 
            to="/requestmethod" 
            :class="['text-gray-600 hover:text-pink-500 transition-colors font-medium',
                    { 'text-pink-600': $route.path === '/requestmethod' }]"
          >
            依頼方法
          </NuxtLink>
          <NuxtLink 
            to="/help" 
            :class="['text-gray-600 hover:text-pink-500 transition-colors font-medium',
                    { 'text-pink-600': $route.path === '/help' }]"
          >
            ヘルプ
          </NuxtLink>
        </nav>

        <div class="flex items-center space-x-3">
          <!-- Notification -->
          <div class="relative" ref="notificationContainer">
            <button 
              @click="showNotifications = !showNotifications"
              class="p-2 text-gray-600 hover:text-pink-500 transition-colors relative"
            >
              <Icon name="lucide:bell" class="w-5 h-5" />
              <span v-if="hasUnreadNotifications" class="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
            </button>
            
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div v-show="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                <div class="px-4 py-2 border-b border-gray-100">
                  <h3 class="font-semibold text-gray-900">通知</h3>
                </div>
                <div v-for="notif in notifications" :key="notif.id" class="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <div class="flex items-center space-x-3">
                    <div :class="`w-2 h-2 rounded-full ${notif.unread ? 'bg-pink-500' : 'bg-gray-300'}`"></div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">{{ notif.message }}</p>
                      <p class="text-xs text-gray-500">{{ notif.time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <button class="text-gray-600 hover:text-pink-500 transition-colors font-medium">
            ログイン
          </button>
          <button class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all font-medium">
            アカウント登録
          </button>
          
          <!-- Mobile menu -->
          <button 
            class="md:hidden p-2"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Icon v-if="mobileMenuOpen" name="lucide:x" class="w-5 h-5" />
            <Icon v-else name="lucide:menu" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-show="mobileMenuOpen" class="md:hidden border-t border-gray-100 bg-white">
        <div class="px-4 py-2 space-y-2">
          <NuxtLink 
            to="/works" 
            class="block py-2 text-gray-600 font-medium hover:text-pink-500"
            @click="mobileMenuOpen = false"
          >
            作品を見る
          </NuxtLink>
          <NuxtLink 
            to="/creators" 
            class="block py-2 text-gray-600 font-medium hover:text-pink-500"
            @click="mobileMenuOpen = false"
          >
            クリエイター
          </NuxtLink>
          <NuxtLink 
            to="/requestmethod" 
            class="block py-2 text-gray-600 font-medium hover:text-pink-500"
            @click="mobileMenuOpen = false"
          >
            依頼方法
          </NuxtLink>
          <NuxtLink 
            to="/help" 
            class="block py-2 text-gray-600 font-medium hover:text-pink-500"
            @click="mobileMenuOpen = false"
          >
            ヘルプ
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// リアクティブデータ
const showNotifications = ref(false)
const mobileMenuOpen = ref(false)
const notificationContainer = ref(null)

// 通知データ
const notifications = ref([
  { id: 1, type: 'like', message: 'あなたの作品に❤️がつきました', time: '2分前', unread: true },
  { id: 2, type: 'order', message: '新しい依頼が届きました', time: '5分前', unread: true },
  { id: 3, type: 'message', message: 'メッセージが届いています', time: '10分前', unread: false },
])

// 未読通知があるかどうか
const hasUnreadNotifications = computed(() => {
  return notifications.value.some(notif => notif.unread)
})

// 外部クリックで通知を閉じる
onMounted(() => {
  const handleClickOutside = (event) => {
    if (notificationContainer.value && !notificationContainer.value.contains(event.target)) {
      showNotifications.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>