<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3">
          <div class="flex items-center space-x-3">
            <NuxtLink to="/" class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Icon name="lucide:sparkles" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Skeb風
              </span>
            </NuxtLink>
          </div>
          
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/works" class="text-gray-600 hover:text-pink-500 transition-colors font-medium">作品を見る</NuxtLink>
            <NuxtLink to="/creators" class="text-gray-600 hover:text-pink-500 transition-colors font-medium">クリエイター</NuxtLink>
            <NuxtLink to="/guide" class="text-gray-600 hover:text-pink-500 transition-colors font-medium">依頼方法</NuxtLink>
            <NuxtLink to="/faq" class="text-pink-600 font-medium">よくある質問</NuxtLink>
          </nav>

          <div class="flex items-center space-x-3">
            <button class="text-gray-600 hover:text-pink-500 transition-colors font-medium">
              ログイン
            </button>
            <button class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all font-medium">
              クリエイター登録
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav class="flex items-center space-x-2 text-sm text-gray-500">
          <NuxtLink to="/" class="hover:text-pink-500 transition-colors">ホーム</NuxtLink>
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
          <span class="text-gray-900">よくある質問</span>
        </nav>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          よくある質問
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Skeb風の利用に関するよくある質問とその回答をまとめました
        </p>
        
        <!-- Search Box -->
        <div class="max-w-md mx-auto">
          <div class="relative">
            <Icon name="lucide:search" class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="質問を検索..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:border-pink-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Category Filter -->
      <div class="mb-8">
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-500 border border-gray-200'
            }`"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- FAQ List -->
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
              <span class="font-medium text-gray-900 text-left">{{ faq.question }}</span>
            </div>
            <Icon
              name="lucide:chevron-down"
              :class="`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
                openFaq === index ? 'rotate-180' : ''
              }`"
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
                <p class="text-gray-600 leading-relaxed" v-html="faq.answer"></p>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredFaqs.length === 0" class="text-center py-12">
        <Icon name="lucide:search-x" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">該当する質問が見つかりません</h3>
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

      <!-- Contact Section -->
      <div class="mt-16 text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
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
            to="/guide"
            class="inline-block border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all font-medium"
          >
            利用ガイドを見る
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 mt-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Icon name="lucide:sparkles" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold">Skeb風</span>
            </div>
            <p class="text-gray-400 text-sm mb-4">
              シンプルで楽しい創作依頼プラットフォーム
            </p>
            <div class="text-sm text-gray-400">
              © 2024 Skeb風. All rights reserved.
            </div>
          </div>

          <div>
            <h4 class="font-bold mb-4">サービス</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/works" class="hover:text-white transition-colors">作品を探す</NuxtLink></li>
              <li><NuxtLink to="/creators" class="hover:text-white transition-colors">絵師を探す</NuxtLink></li>
              <li><NuxtLink to="/categories" class="hover:text-white transition-colors">カテゴリー</NuxtLink></li>
              <li><NuxtLink to="/tags" class="hover:text-white transition-colors">人気タグ</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">ヘルプ</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/guide" class="hover:text-white transition-colors">使い方</NuxtLink></li>
              <li><NuxtLink to="/faq" class="hover:text-white transition-colors">よくある質問</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white transition-colors">お問い合わせ</NuxtLink></li>
              <li><NuxtLink to="/community" class="hover:text-white transition-colors">コミュニティ</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">絵師向け</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/creator-register" class="hover:text-white transition-colors">絵師登録</NuxtLink></li>
              <li><NuxtLink to="/monetization" class="hover:text-white transition-colors">収益化方法</NuxtLink></li>
              <li><NuxtLink to="/guidelines" class="hover:text-white transition-colors">ガイドライン</NuxtLink></li>
              <li><NuxtLink to="/creator-support" class="hover:text-white transition-colors">サポート</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// SEO設定
useSeoMeta({
  title: 'よくある質問 - Skeb風',
  ogTitle: 'よくある質問 - Skeb風',
  description: 'Skeb風の利用に関するよくある質問とその回答をまとめました。リクエスト方法、支払い、クリエイター登録など。',
  ogDescription: 'Skeb風の利用に関するよくある質問とその回答をまとめました。リクエスト方法、支払い、クリエイター登録など。',
  ogImage: '/faq-og-image.png',
  twitterCard: 'summary_large_image',
})

// リアクティブデータ
const searchQuery = ref('')
const selectedCategory = ref('all')
const openFaq = ref(null)

// カテゴリー
const categories = ref([
  { id: 'all', name: 'すべて' },
  { id: 'general', name: '一般' },
  { id: 'request', name: 'リクエスト' },
  { id: 'payment', name: '支払い' },
  { id: 'creator', name: 'クリエイター' },
  { id: 'technical', name: '技術・トラブル' }
])

// FAQ データ
const faqs = ref([
  // 一般
  {
    category: 'general',
    question: 'Skeb風とは何ですか？',
    answer: 'Skeb風は、クリエイターに簡単に作品を依頼できるプラットフォームです。見積もりや打ち合わせなしで、シンプルにリクエストを送信できます。'
  },
  {
    category: 'general',
    question: '利用料金はかかりますか？',
    answer: 'サービスの利用は無料です。作品のリクエスト時にのみ、クリエイターが設定した価格をお支払いいただきます。'
  },
  {
    category: 'general',
    question: 'アカウント登録は必要ですか？',
    answer: 'はい、リクエストを送信するにはアカウント登録が必要です。メールアドレスまたはSNSアカウントで簡単に登録できます。'
  },

  // リクエスト
  {
    category: 'request',
    question: 'リクエストが承諾されない場合はありますか？',
    answer: 'はい、クリエイターのスケジュールや内容によっては承諾されない場合があります。その場合、別のクリエイターにリクエストを送ることができます。'
  },
  {
    category: 'request',
    question: 'リクエスト後に内容の変更はできますか？',
    answer: 'リクエスト送信後の大幅な変更は基本的にできません。詳細な要望は最初のリクエスト時に明確にお伝えください。軽微な修正については、クリエイターと相談してください。'
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

  // 支払い
  {
    category: 'payment',
    question: '支払い方法は何がありますか？',
    answer: 'クレジットカード（Visa、Mastercard、JCB、American Express）、PayPal、銀行振込に対応しています。'
  },
  {
    category: 'payment',
    question: '支払いのタイミングはいつですか？',
    answer: '作品が納品され、内容に問題がないことを確認後、自動的にクリエイターにお支払いされます。作品完成まで代金は安全に保管されます。'
  },
  {
    category: 'payment',
    question: '返金は可能ですか？',
    answer: '作品が納品されない場合や、明らかにリクエスト内容と異なる場合は返金対応いたします。詳しくはサポートまでお問い合わせください。'
  },
  {
    category: 'payment',
    question: '領収書は発行してもらえますか？',
    answer: 'はい、取引完了後にマイページから領収書をダウンロードできます。企業でのご利用の場合は、請求書発行も可能です。'
  },

  // クリエイター
  {
    category: 'creator',
    question: 'クリエイターとして登録するには？',
    answer: 'クリエイター登録ページから、プロフィール情報と作品サンプルを提出してください。審査通過後、リクエストを受け付けることができます。'
  },
  {
    category: 'creator',
    question: 'クリエイターの手数料はどのくらいですか？',
    answer: 'プラットフォーム手数料として、売上の8%を頂戴しています。売上が一定額を超えると手数料が下がる優遇制度もあります。'
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

  // 技術・トラブル
  {
    category: 'technical',
    question: '画像がアップロードできません',
    answer: 'ファイルサイズが10MB以下、形式がJPEG、PNG、GIFであることを確認してください。それでも解決しない場合は、ブラウザのキャッシュをクリアしてお試しください。'
  },
  {
    category: 'technical',
    question: 'パスワードを忘れました',
    answer: 'ログイン画面の「パスワードを忘れた方」をクリックし、登録メールアドレスを入力してください。パスワード再設定用のメールが送信されます。'
  },
  {
    category: 'technical',
    question: 'メールが届きません',
    answer: '迷惑メールフォルダをご確認ください。@skeb-fu.comからのメールを受信できるよう設定してください。それでも届かない場合はサポートまでご連絡ください。'
  },
  {
    category: 'technical',
    question: 'アカウントを削除したい',
    answer: 'マイページの設定から「アカウント削除」を選択してください。削除前に未完了の取引がないことをご確認ください。削除後のデータ復旧はできません。'
  }
])

// 計算プロパティ
const filteredFaqs = computed(() => {
  let filtered = faqs.value

  // カテゴリーフィルター
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
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
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const getCategoryColor = (category) => {
  const colors = {
    general: 'bg-gray-500',
    request: 'bg-pink-500',
    payment: 'bg-green-500',
    creator: 'bg-purple-500',
    technical: 'bg-orange-500'
  }
  return colors[category] || 'bg-gray-500'
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  openFaq.value = null
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>