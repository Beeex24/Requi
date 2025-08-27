<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="ヘルプセンター - Requi レキ"
      description="Requi レキの使い方、よくある質問、お問い合わせ方法について詳しくご案内いたします。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          ヘルプセンター
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキの使い方でお困りのことはありませんか？よくある質問や詳しいガイドをご用意しています
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-lg mx-auto">
          <div class="relative">
            <Icon name="lucide:search" class="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="お困りのことを検索..."
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:border-pink-400 focus:outline-none shadow-sm"
              @input="handleSearch"
            />
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Quick Help Categories -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">お困りのことから探す</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(category, index) in helpCategories"
            :key="index"
            @click="selectedCategory = category.id"
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div :class="`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`">
              <Icon :name="category.icon" :class="`w-6 h-6 ${category.iconColor}`" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ category.title }}</h3>
            <p class="text-gray-600 text-sm mb-3">{{ category.description }}</p>
            <div class="flex items-center text-pink-600 text-sm font-medium">
              <span>詳しく見る</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">よくある質問</h2>
        
        <!-- FAQ Category Filter -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <button
            v-for="category in faqCategories"
            :key="category.id"
            @click="activeFaqCategory = category.id"
            :class="`px-4 py-2 rounded-full transition-all ${
              activeFaqCategory === category.id
                ? 'bg-pink-50 text-pink-600 border border-pink-200'
                : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
            }`"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- FAQ Items -->
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in filteredFaqs" 
            :key="index"
            class="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-900 pr-4">{{ faq.question }}</span>
              <Icon 
                name="lucide:chevron-down" 
                :class="`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`" 
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
                <div class="text-gray-600 leading-relaxed" v-html="faq.answer"></div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredFaqs.length === 0" class="text-center py-8">
          <Icon name="lucide:search-x" class="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p class="text-gray-600">該当する質問が見つかりませんでした</p>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="mb-16">
        <div class="bg-white rounded-2xl p-8 border border-gray-200">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
            <p class="text-gray-600">
              上記で解決しない場合は、お気軽にお問い合わせください
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Email Support -->
            <div class="text-center p-6 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:mail" class="w-6 h-6 text-blue-500" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">メールサポート</h3>
              <p class="text-gray-600 text-sm mb-4">24時間以内に返信いたします</p>
              <a 
                href="mailto:support@requi.com"
                class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                support@requi.com
                <Icon name="lucide:external-link" class="w-4 h-4 ml-1" />
              </a>
            </div>

            <!-- Chat Support -->
            <div class="text-center p-6 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:message-circle" class="w-6 h-6 text-green-500" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">チャットサポート</h3>
              <p class="text-gray-600 text-sm mb-4">平日 10:00-18:00</p>
              <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                チャットを開始
              </button>
            </div>

            <!-- FAQ -->
            <div class="text-center p-6 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:book-open" class="w-6 h-6 text-orange-500" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">ガイド・マニュアル</h3>
              <p class="text-gray-600 text-sm mb-4">詳細な使い方をご案内</p>
              <NuxtLink 
                to="/requestmethod"
                class="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                ガイドを見る
                <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Status & Updates -->
      <section class="mb-16">
        <div class="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">サービス状況・お知らせ</h3>
          <div class="space-y-3">
            <div 
              v-for="(status, index) in serviceStatus"
              :key="index"
              class="flex items-center justify-between py-2"
            >
              <div class="flex items-center space-x-3">
                <div :class="`w-3 h-3 rounded-full ${status.color}`"></div>
                <span class="font-medium text-gray-900">{{ status.service }}</span>
              </div>
              <span :class="`text-sm font-medium ${
                status.status === '正常' ? 'text-green-600' : 
                status.status === '注意' ? 'text-yellow-600' : 'text-red-600'
              }`">
                {{ status.status }}
              </span>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700">
              詳細なサービス状況を見る →
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// パンくずナビゲーション
const breadcrumbs = ref([
  { name: 'ヘルプ' }
])

// 検索・フィルター状態
const searchQuery = ref('')
const selectedCategory = ref(null)
const activeFaqCategory = ref('all')
const openFaq = ref(null)

// ヘルプカテゴリー
const helpCategories = ref([
  {
    id: 'getting-started',
    title: '初めての方へ',
    description: 'アカウント作成からリクエストまでの基本的な流れ',
    icon: 'lucide:play-circle',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500'
  },
  {
    id: 'request',
    title: 'リクエストについて',
    description: 'リクエスト方法、やり取り、キャンセルについて',
    icon: 'lucide:send',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500'
  },
  {
    id: 'payment',
    title: 'お支払い・返金',
    description: '決済方法、エスクロー、返金ポリシーについて',
    icon: 'lucide:credit-card',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-500'
  },
  {
    id: 'creator',
    title: 'クリエイター向け',
    description: '登録方法、作品掲載、収益化について',
    icon: 'lucide:palette',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-500'
  },
  {
    id: 'account',
    title: 'アカウント設定',
    description: 'プロフィール設定、セキュリティ、通知設定',
    icon: 'lucide:settings',
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-500'
  },
  {
    id: 'technical',
    title: '技術的な問題',
    description: 'ログインできない、エラーが発生する場合',
    icon: 'lucide:alert-triangle',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-500'
  }
])

// FAQカテゴリー
const faqCategories = ref([
  { id: 'all', name: 'すべて' },
  { id: 'general', name: '基本的な質問' },
  { id: 'request', name: 'リクエスト' },
  { id: 'payment', name: 'お支払い' },
  { id: 'creator', name: 'クリエイター' },
  { id: 'technical', name: '技術的な問題' }
])

// FAQ データ
const faqs = ref([
  {
    category: 'general',
    question: 'Requi レキとはどのようなサービスですか？',
    answer: 'Requi レキは、クリエイターに作品制作を依頼できるプラットフォームです。見積もりや打ち合わせを省略し、シンプルで気軽にリクエストできることが特徴です。'
  },
  {
    category: 'general',
    question: '利用料金はかかりますか？',
    answer: 'アカウント登録や作品閲覧は無料です。リクエストが成立した場合のみ、作品代金と手数料（6%〜）をお支払いいただきます。'
  },
  {
    category: 'request',
    question: 'リクエストはどのように送りますか？',
    answer: '気に入ったクリエイターのプロフィールから「リクエスト」ボタンをクリックし、<br>• 作品の種類<br>• 詳細な説明<br>• 参考資料（任意）<br>• 納期の希望<br>これらを入力して送信してください。'
  },
  {
    category: 'request',
    question: 'リクエストが承諾されない場合はありますか？',
    answer: 'はい。クリエイターのスケジュールや制作内容によっては承諾されない場合があります。その場合は別のクリエイターにリクエストを送ることができます。'
  },
  {
    category: 'request',
    question: 'リクエスト後に内容を変更できますか？',
    answer: '制作開始前であれば軽微な変更は可能ですが、大幅な変更は原則としてお受けできません。詳細な要望は最初のリクエスト時に明確にお伝えください。'
  },
  {
    category: 'payment',
    question: 'どのような決済方法がありますか？',
    answer: 'クレジットカード（VISA, MasterCard, JCB, AMEX）、PayPal、銀行振込に対応しています。すべてSSL暗号化により安全に処理されます。'
  },
  {
    category: 'payment',
    question: 'エスクローシステムとは何ですか？',
    answer: '作品完成まで代金を当サービスが安全にお預かりするシステムです。作品納品後、内容に問題がなければ自動的にクリエイターにお支払いされます。'
  },
  {
    category: 'payment',
    question: '返金は可能ですか？',
    answer: '制作開始前のキャンセルは全額返金いたします。制作開始後は個別に対応いたします。詳しくは<a href="#" class="text-blue-600 hover:underline">利用規約</a>をご確認ください。'
  },
  {
    category: 'creator',
    question: 'クリエイターとして登録するには？',
    answer: 'トップページの「クリエイター登録」ボタンから、<br>• 基本情報<br>• ポートフォリオ<br>• 制作可能な分野<br>• 料金設定<br>これらを入力して審査をお申し込みください。'
  },
  {
    category: 'creator',
    question: 'クリエイターの収益はどのくらいですか？',
    answer: '作品代金から手数料（6%〜9.8%）を差し引いた金額が収益となります。人気クリエイターほど手数料率が優遇される仕組みです。'
  },
  {
    category: 'technical',
    question: 'ログインできません',
    answer: 'パスワードをお忘れの場合は「パスワードを忘れた方」からリセットしてください。それでも解決しない場合は<a href="mailto:support@requi.com" class="text-blue-600 hover:underline">サポート</a>までご連絡ください。'
  },
  {
    category: 'technical',
    question: '画像がアップロードできません',
    answer: '以下をご確認ください：<br>• ファイルサイズが10MB以下<br>• 形式がJPEG, PNG, GIF<br>• 安定したネット接続<br>問題が続く場合はブラウザを変えてお試しください。'
  }
])

// サービス状況
const serviceStatus = ref([
  { service: 'ウェブサイト', status: '正常', color: 'bg-green-500' },
  { service: '決済システム', status: '正常', color: 'bg-green-500' },
  { service: 'メール通知', status: '正常', color: 'bg-green-500' },
  { service: 'ファイルアップロード', status: '正常', color: 'bg-green-500' }
])

// 計算プロパティ
const filteredFaqs = computed(() => {
  let filtered = faqs.value

  // カテゴリーフィルター
  if (activeFaqCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === activeFaqCategory.value)
  }

  // 検索フィルター
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

// メソッド
const handleSearch = () => {
  activeFaqCategory.value = 'all'
  openFaq.value = null
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>