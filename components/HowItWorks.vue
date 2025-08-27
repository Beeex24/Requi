<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div 
      v-for="(step, index) in steps"
      :key="index"
      class="text-center"
    >
      <div :class="`w-20 h-20 ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6`">
        <Icon :name="step.icon" class="w-10 h-10 text-white" />
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
      <p class="text-gray-600">{{ step.description }}</p>
    </div>
  </div>
</template>

<script setup>
const steps = ref([
  {
    title: "1. 気に入った作品を探す",
    description: "カテゴリーやタグから、あなたの好みにぴったりの絵師さんを見つけよう",
    icon: "lucide:search",
    gradient: "bg-gradient-to-r from-pink-400 to-pink-500"
  },
  {
    title: "2. リクエストを送る",
    description: "シンプルなフォームで要望を送信。絵師さんが承諾したら制作開始！",
    icon: "lucide:send",
    gradient: "bg-gradient-to-r from-purple-400 to-purple-500"
  },
  {
    title: "3. 作品を受け取る",
    description: "完成した素敵な作品を受け取って、SNSでシェアしよう！",
    icon: "lucide:gift",
    gradient: "bg-gradient-to-r from-blue-400 to-blue-500"
  }
])
</script>