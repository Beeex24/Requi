<template>
  <section class="py-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">
          新しいクリエイティブな体験を
        </h2>
        <p class="text-pink-100 text-lg">
          創作者とクリエイターを繋ぐ新しいプラットフォーム
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div 
          v-for="(stat, index) in stats"
          :key="index"
          class="transform hover:scale-105 transition-transform duration-200"
        >
          <div class="text-4xl font-bold mb-2">{{ stat.value }}</div>
          <div class="text-pink-100">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = ref([
  {
    value: "準備中",
    label: "登録クリエイター"
  },
  {
    value: "近日開始",
    label: "作品リクエスト"
  },
  {
    value: "シンプル",
    label: "依頼プロセス"
  },
  {
    value: "安心",
    label: "取引システム"
  }
])
</script>