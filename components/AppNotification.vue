<template>
  <Teleport to="body">
    <div 
      v-if="visible" 
      class="fixed top-4 right-4 z-[9999] max-w-sm bg-white border rounded-lg shadow-lg overflow-hidden"
      :class="typeClasses"
    >
      <div class="p-4">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <Icon 
              :name="iconName" 
              :class="`w-5 h-5 ${iconColorClass}`"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h4 v-if="title" class="text-sm font-medium text-gray-900 mb-1">
              {{ title }}
            </h4>
            <p class="text-sm text-gray-700">
              {{ message }}
            </p>
          </div>
          <button 
            @click="close"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>
      </div>
      <!-- プログレスバー（自動閉じる場合） -->
      <div 
        v-if="autoClose && duration > 0"
        class="h-1 bg-gray-200"
      >
        <div 
          class="h-full transition-all ease-linear"
          :class="progressBarClass"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info', // 'success', 'error', 'warning', 'info'
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  autoClose: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 5000 // 5秒
  }
})

const emit = defineEmits(['close'])

const visible = ref(true)
const progress = ref(100)
let timer = null
let progressTimer = null

// タイプに応じたスタイルとアイコン
const typeClasses = computed(() => {
  const classes = {
    success: 'border-green-200',
    error: 'border-red-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200'
  }
  return classes[props.type]
})

const iconName = computed(() => {
  const icons = {
    success: 'lucide:check-circle',
    error: 'lucide:alert-circle',
    warning: 'lucide:alert-triangle',
    info: 'lucide:info'
  }
  return icons[props.type]
})

const iconColorClass = computed(() => {
  const colors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }
  return colors[props.type]
})

const progressBarClass = computed(() => {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }
  return colors[props.type]
})

const close = () => {
  visible.value = false
  emit('close')
  
  if (timer) {
    clearTimeout(timer)
  }
  if (progressTimer) {
    clearInterval(progressTimer)
  }
}

onMounted(() => {
  if (props.autoClose && props.duration > 0) {
    // 自動閉じるタイマー
    timer = setTimeout(() => {
      close()
    }, props.duration)
    
    // プログレスバーのアニメーション
    const interval = 50 // 50msごとに更新
    const decrement = (100 / props.duration) * interval
    
    progressTimer = setInterval(() => {
      progress.value = Math.max(0, progress.value - decrement)
    }, interval)
  }
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
  if (progressTimer) {
    clearInterval(progressTimer)
  }
})
</script>