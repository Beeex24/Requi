<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Icon name="lucide:sparkles" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold">Requi レキ</span>
          </div>
          <p class="text-gray-400 text-sm mb-4">
            シンプルで楽しい創作依頼プラットフォーム
          </p>
          <div class="text-sm text-gray-400">
            © 2025 Requi. All rights reserved.
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-4">サービス</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <NuxtLink to="/works" class="hover:text-white transition-colors">
                作品を探す
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/creators" class="hover:text-white transition-colors">
                絵師を探す
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories" class="hover:text-white transition-colors">
                カテゴリー
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tags" class="hover:text-white transition-colors">
                人気タグ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-4">ヘルプ</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <NuxtLink to="/privacy" class="hover:text-white transition-colors">
                プライバシーポリシー
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="hover:text-white transition-colors">
                利用規約
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="hover:text-white transition-colors">
                よくある質問
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-white transition-colors">
                お問い合わせ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-4">絵師向け</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <NuxtLink to="/creator-register" class="hover:text-white transition-colors">
                絵師登録
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/monetization" class="hover:text-white transition-colors">
                収益化方法
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/guidelines" class="hover:text-white transition-colors">
                ガイドライン
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/creator-support" class="hover:text-white transition-colors">
                サポート
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// フッターに特別なロジックは不要
</script>