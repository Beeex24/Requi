<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="リクエスト方法ガイド - Requi レキ"
      description="Requi レキでのリクエスト方法を3つのステップで分かりやすく解説。シンプルで安全な依頼システムの使い方をご紹介します。"
      og-image="/guide-og-image.png"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          リクエスト方法ガイド
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          シンプルで分かりやすい3ステップで、あなたの理想の作品をリクエストしましょう
        </p>
        
        <div class="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full">
          <Icon name="lucide:clock" class="w-4 h-4 text-pink-500 mr-2" />
          <span class="text-sm font-medium text-pink-600">平均3分でリクエスト完了</span>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Overview Steps -->
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

      <!-- Detailed Steps -->
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

      <!-- FAQ Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">よくある質問</h2>
        
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <Icon 
                name="lucide:chevron-down" 
                :class="`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`" 
              />
            </button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div v-show="openFaq === index" class="px-6 pb-4">
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">
          今すぐリクエストを始めましょう
        </h3>
        <p class="text-gray-600 mb-6">
          あなたの理想の作品を作ってくれるクリエイターが見つかります
        </p>
        <NuxtLink 
          to="/"
          class="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all font-medium"
        >
          クリエイターを探す
        </NuxtLink>
      </section>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// パンくずナビゲーション
const breadcrumbs = ref([
  { name: '依頼方法' }
])

// FAQ の開閉状態
const openFaq = ref(null)

// 概要ステップ
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

// カテゴリー
const categories = ref([
  { name: 'イラスト', bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
  { name: 'デザイン', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
  { name: 'ボイス', bgColor: 'bg-green-100', textColor: 'text-green-600' },
  { name: '動画', bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
])

// 必要な情報
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

// 注意事項
const cautionNotes = ref([
  '著作権のある画像やキャラクターは使用できません(二次創作などは各社ガイドラインのもと可)',
  '公序良俗に反する内容はお断りします',
  '商用利用の場合はクリエイターに事前にお知らせください'
])

// プロセスステップ
const processSteps = ref([
  { text: 'クリエイターがリクエストを確認・承諾', color: 'bg-pink-500' },
  { text: '制作開始のお知らせ', color: 'bg-purple-500' },
  { text: '作品完成・納品', color: 'bg-blue-500' },
  { text: 'お支払い・取引完了', color: 'bg-green-500' }
])

// FAQ データ
const faqs = ref([
  {
    question: 'リクエストが承諾されない場合はありますか？',
    answer: 'はい、クリエイターのスケジュールや内容によっては承諾されない場合があります。その場合、別のクリエイターにリクエストを送ることができます。'
  },
  {
    question: '支払いはいつ行われますか？',
    answer: '作品が納品され、内容に問題がないことを確認後、自動的にクリエイターにお支払いされます。作品完成まで代金は安全に保管されます。'
  },
  {
    question: 'リクエスト後に変更はできますか？',
    answer: '基本的に、リクエスト送信後の大幅な変更はできません。詳細な要望は最初のリクエスト時に明確にお伝えください。'
  },
  {
    question: '商用利用は可能ですか？',
    answer: '商用利用については、リクエスト時に必ずお伝えください。クリエイターによって対応が異なる場合があります。'
  },
  {
    question: 'キャンセルは可能ですか？',
    answer: '制作開始前であればキャンセル可能です。制作開始後のキャンセルについては、個別に対応いたします。'
  },
  {
    question: '作品のデータ形式は指定できますか？',
    answer: 'はい、PNG、JPEG、PSD、AIなど希望のデータ形式をリクエスト時に指定してください。'
  }
])

// FAQ 開閉の制御
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>