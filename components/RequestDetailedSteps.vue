<template>
  <div class="space-y-12">
    <!-- Step 1 -->
    <section class="mb-12">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-4">
            <span class="text-white font-bold">1</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">クリエイターを探す</h3>
        </div>

        <div class="space-y-6">
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3">カテゴリーから探す</h4>
            <p class="text-gray-600 mb-4">
              イラスト、デザイン、ボイス、動画など、カテゴリーから希望のジャンルを選択してください。
            </p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="category in categories"
                :key="category.name"
                :class="`px-3 py-1 ${category.bgColor} ${category.textColor} text-sm rounded-full`"
              >
                {{ category.name }}
              </span>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3">作品から選ぶ</h4>
            <p class="text-gray-600">
              過去の作品を見て、あなたの求める作風やクオリティのクリエイターを見つけましょう。
            </p>
          </div>

          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <Icon name="lucide:info" class="w-5 h-5 text-blue-500 mr-2" />
              <span class="font-semibold text-blue-900">ポイント</span>
            </div>
            <p class="text-blue-800">
              クリエイターのプロフィールで、得意分野や納期、価格帯を事前に確認できます。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Step 2 -->
    <section class="mb-12">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
            <span class="text-white font-bold">2</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">リクエストを送信</h3>
        </div>

        <div class="space-y-6">
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3">必要な情報</h4>
            <div class="space-y-4">
              <div 
                v-for="(requirement, index) in requirements"
                :key="index"
                class="flex items-start space-x-3"
              >
                <Icon name="lucide:check-circle" class="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <span class="font-medium text-gray-900">{{ requirement.title }}</span>
                  <p class="text-gray-600 text-sm">{{ requirement.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <Icon name="lucide:alert-circle" class="w-5 h-5 text-yellow-500 mr-2" />
              <span class="font-semibold text-yellow-900">注意事項</span>
            </div>
            <ul class="text-yellow-800 text-sm space-y-1">
              <li v-for="(note, index) in cautionNotes" :key="index">• {{ note }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Step 3 -->
    <section class="mb-12">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
            <span class="text-white font-bold">3</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">作品を受け取る</h3>
        </div>

        <div class="space-y-6">
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3">制作から納品まで</h4>
            <div class="space-y-4">
              <div 
                v-for="(process, index) in processSteps"
                :key="index"
                class="flex items-center space-x-4"
              >
                <div :class="`w-2 h-2 ${process.color} rounded-full`"></div>
                <span class="text-gray-900">{{ process.text }}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3">お支払いについて</h4>
            <p class="text-gray-600 mb-4">
              作品が完成し、納品されるまで代金は安全にお預かりいたします。<br>
              納品後、内容に問題がなければ自動的にクリエイターにお支払いされます。
            </p>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <Icon name="lucide:shield-check" class="w-5 h-5 text-green-500 mr-2" />
              <span class="font-semibold text-green-900">安心保証</span>
            </div>
            <p class="text-green-800">
              エスクローシステムにより、作品が完成するまで代金を安全に管理します。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const categories = ref([
  { name: 'イラスト', bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
  { name: 'デザイン', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
  { name: 'ボイス', bgColor: 'bg-green-100', textColor: 'text-green-600' },
  { name: '動画', bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
])

const requirements = ref([
  {
    title: '作品の種類',
    description: 'イラスト、ロゴ、キャラクターデザインなど'
  },
  {
    title: '詳細な説明',
    description: 'サイズ、用途、希望するイメージなど'
  },
  {
    title: '参考資料',
    description: 'イメージ画像、色の希望など（任意）'
  },
  {
    title: '納期の希望',
    description: '急ぎの場合は事前にお伝えください'
  }
])

const cautionNotes = ref([
  '著作権のある画像やキャラクターは使用できません',
  '公序良俗に反する内容はお断りします',
  '商用利用の場合は事前にお知らせください'
])

const processSteps = ref([
  { text: 'クリエイターがリクエストを確認・承諾', color: 'bg-pink-500' },
  { text: '制作開始のお知らせ', color: 'bg-purple-500' },
  { text: '作品完成・納品', color: 'bg-blue-500' },
  { text: 'お支払い・取引完了', color: 'bg-green-500' }
])
</script>