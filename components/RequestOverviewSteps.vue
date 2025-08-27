<template>
  <section class="mb-16">
    <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">リクエストの流れ</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div 
        v-for="(step, index) in overviewSteps"
        :key="index"
        class="text-center"
      >
        <div :class="`w-16 h-16 ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4`">
          <Icon :name="step.icon" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ step.title }}</h3>
        <p class="text-gray-600">{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const overviewSteps = ref([
  {
    title: "1. クリエイターを探す",
    description: "気に入った作品のクリエイターを見つけましょう",
    icon: "lucide:search",
    gradient: "bg-gradient-to-r from-pink-400 to-pink-500"
  },
  {
    title: "2. リクエストを送信",
    description: "詳細を記入してリクエストを送信します",
    icon: "lucide:edit-3",
    gradient: "bg-gradient-to-r from-purple-400 to-purple-500"
  },
  {
    title: "3. 作品を受け取る",
    description: "完成した作品を受け取って楽しみましょう",
    icon: "lucide:gift",
    gradient: "bg-gradient-to-r from-blue-400 to-blue-500"
  }
])
</script>