<template>
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        今すぐ始めてみませんか？
      </h2>
      <p class="text-lg text-gray-600 mb-8">
        あなたの理想の作品を作ってくれる絵師さんが見つかります
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          to="/works"
          class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg inline-block"
        >
          作品を探す
        </NuxtLink>
        <NuxtLink 
          to="/creator-register"
          class="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all font-bold text-lg inline-block"
        >
          絵師として登録
        </NuxtLink>
      </div>
      
      <div class="mt-6 text-sm text-gray-500">
        ✨ 登録無料 • 手数料5％！！ • 24時間サポート
      </div>
    </div>
  </section>
</template>

<script setup>
// CTAセクションには特別なロジックは不要
</script>