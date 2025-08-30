<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="よくある質問 - Requi レキ"
      description="Requi レキの利用に関するよくある質問とその回答をまとめました。リクエスト方法、支払い、クリエイター登録など。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          よくある質問
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキの利用に関するよくある質問とその回答をまとめました
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
            @click="activeFaqCategory = category.id"
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
            class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start space-x-3 flex-1">
                <div class="flex-shrink-0 mt-0.5">
                  <span :class="`inline-block w-2 h-2 rounded-full ${getCategoryColor(faq.category)}`"></span>
                </div>
                <span class="font-medium text-gray-900 text-left pr-4">{{ faq.question }}</span>
              </div>
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
                <div class="pl-5 border-l-2 border-pink-100">
                  <div class="text-gray-600 leading-relaxed" v-html="faq.answer"></div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredFaqs.length === 0" class="text-center py-12">
          <Icon name="lucide:search-x" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">該当する質問が見つかりませんでした</h3>
          <p class="text-gray-600 mb-4">
            検索キーワードやカテゴリーを変更してお試しください
          </p>
          <button
            @click="clearFilters"
            class="text-pink-500 hover:text-pink-600 font-medium"
          >
            フィルターをクリア
          </button>
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

      <!-- Additional Help Section -->
      <section>
        <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            解決しない問題はありませんか？
          </h3>
          <p class="text-gray-600 mb-6">
            上記で解決しない場合は、お気軽にお問い合わせください
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-medium"
            >
              お問い合わせ
            </NuxtLink>
            <NuxtLink
              to="/requestmethod"
              class="inline-block border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all font-medium"
            >
              利用ガイドを見る
            </NuxtLink>
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
  { name: 'よくある質問' }
])

// 検索・フィルター状態
const searchQuery = ref('')
const activeFaqCategory = ref('all')
const openFaq = ref(null)

// ヘルプカテゴリー
const helpCategories = ref([
  {
    id: 'general',
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
  { id: 'account', name: 'アカウント' },
  { id: 'technical', name: '技術的な問題' }
])

// FAQ データ
const faqs = ref([
  // 基本的な質問
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
    category: 'general',
    question: 'アカウント登録は必要ですか？',
    answer: 'はい、リクエストを送信するにはアカウント登録が必要です。メールアドレスまたはSNSアカウントで簡単に登録できます。'
  },

  // リクエスト関連
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
    category: 'request',
    question: 'どのような内容はリクエストできませんか？',
    answer: '著作権侵害、公序良俗に反する内容、政治・宗教的な内容、差別的な表現を含む作品はリクエストできません。詳しくは<a href="/guidelines" class="text-pink-500 hover:underline">ガイドライン</a>をご確認ください。'
  },
  {
    category: 'request',
    question: '商用利用は可能ですか？',
    answer: '商用利用については、リクエスト時に必ずお伝えください。クリエイターによって対応が異なる場合があります。追加料金が発生する場合もあります。'
  },
  {
    category: 'request',
    question: 'リクエストのキャンセルは可能ですか？',
    answer: '制作開始前であればキャンセル可能です。制作開始後のキャンセルについては、進行状況に応じて個別に対応いたします。'
  },

  // お支払い関連
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
    question: '支払いのタイミングはいつですか？',
    answer: '作品が納品され、内容に問題がないことを確認後、自動的にクリエイターにお支払いされます。作品完成まで代金は安全に保管されます。'
  },
  {
    category: 'payment',
    question: '返金は可能ですか？',
    answer: '制作開始前のキャンセルは全額返金いたします。制作開始後は個別に対応いたします。詳しくは<a href="/terms" class="text-blue-600 hover:underline">利用規約</a>をご確認ください。'
  },
  {
    category: 'payment',
    question: '領収書は発行してもらえますか？',
    answer: 'はい、取引完了後にマイページから領収書をダウンロードできます。企業でのご利用の場合は、請求書発行も可能です。'
  },

  // クリエイター関連
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
    category: 'creator',
    question: '売上の受け取り方法は？',
    answer: '銀行振込にて月末締め、翌月15日払いでお支払いします。最低振込金額は1,000円からです。'
  },
  {
    category: 'creator',
    question: 'リクエストを断ることはできますか？',
    answer: 'はい、スケジュールや内容に応じて自由に承諾・辞退を選択できます。辞退理由をお伝えいただく必要はありません。'
  },

  // アカウント関連
  {
    category: 'account',
    question: 'プロフィール情報を変更したい',
    answer: 'マイページの「プロフィール設定」から、表示名、プロフィール画像、自己紹介文などを変更できます。'
  },
  {
    category: 'account',
    question: 'パスワードを変更したい',
    answer: 'マイページの「アカウント設定」→「パスワード変更」から新しいパスワードに変更できます。'
  },
  {
    category: 'account',
    question: '通知設定を変更したい',
    answer: 'マイページの「通知設定」から、メールやプッシュ通知の受信設定をカスタマイズできます。'
  },

  // 技術的な問題
  {
    category: 'technical',
    question: 'ログインできません',
    answer: 'パスワードをお忘れの場合は「パスワードを忘れた方」からリセットしてください。それでも解決しない場合は<a href="mailto:support@requi.com" class="text-blue-600 hover:underline">サポート</a>までご連絡ください。'
  },
  {
    category: 'technical',
    question: '画像がアップロードできません',
    answer: '以下をご確認ください：<br>• ファイルサイズが10MB以下<br>• 形式がJPEG, PNG, GIF<br>• 安定したネット接続<br>問題が続く場合はブラウザを変えてお試しください。'
  },
  {
    category: 'technical',
    question: 'メールが届きません',
    answer: '迷惑メールフォルダをご確認ください。@requi.comからのメールを受信できるよう設定してください。それでも届かない場合はサポートまでご連絡ください。'
  },
  {
    category: 'technical',
    question: 'アカウントを削除したい',
    answer: 'マイページの設定から「アカウント削除」を選択してください。削除前に未完了の取引がないことをご確認ください。削除後のデータ復旧はできません。'
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

const getCategoryColor = (category) => {
  const colors = {
    general: 'bg-green-500',
    request: 'bg-blue-500',
    payment: 'bg-purple-500',
    creator: 'bg-pink-500',
    account: 'bg-gray-500',
    technical: 'bg-orange-500'
  }
  return colors[category] || 'bg-gray-500'
}

const clearFilters = () => {
  searchQuery.value = ''
  activeFaqCategory.value = 'all'
  openFaq.value = null
}
</script>