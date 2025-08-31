<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="クリエイターサポート - Requi レキ"
      description="Requi レキクリエイター向けサポートページ。よくある質問、トラブル解決、収益向上のヒント、各種サポート窓口をご案内します。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          クリエイター<br>
          <span class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            サポートセンター
          </span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキで活動するクリエイター様を全力でサポートします。<br>
          お困りごとやご質問がございましたら、お気軽にご相談ください。
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            @click="openChatSupport"
            class="inline-flex items-center bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            <Icon name="lucide:message-circle" class="w-5 h-5 mr-2" />
            チャットサポート
          </button>
          <NuxtLink
            to="/creatorguidelines"
            class="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-purple-400 hover:text-purple-500 transition-all font-bold text-lg"
          >
            <Icon name="lucide:book-open" class="w-5 h-5 mr-2" />
            ガイドラインを見る
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-purple-600">対応時間</div>
            <div class="text-gray-900">平日10:00-18:00</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-purple-600">返信目安</div>
            <div class="text-gray-900">1時間以内</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-purple-600">専用チャット</div>
            <div class="text-gray-900">24時間受付</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-purple-600">電話サポート</div>
            <div class="text-gray-900">緊急時対応</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Support -->
    <section class="bg-white py-12 border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">サポート窓口</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="support in supportChannels"
            :key="support.type"
            class="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all cursor-pointer"
            @click="handleSupportClick(support.action)"
          >
            <div :class="`w-16 h-16 ${support.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`">
              <Icon :name="support.icon" :class="`w-8 h-8 ${support.iconColor}`" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ support.title }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ support.description }}</p>
            <div class="text-xs text-gray-500">{{ support.availability }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- FAQ Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">よくある質問</h2>
        
        <!-- FAQ Categories -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <button
            v-for="category in faqCategories"
            :key="category.id"
            @click="activeFaqCategory = category.id"
            :class="`px-4 py-2 rounded-full transition-all ${
              activeFaqCategory === category.id
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50'
            }`"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- FAQ Items -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="space-y-1">
            <div 
              v-for="(faq, index) in filteredFAQs" 
              :key="index"
              class="border-b border-gray-100 last:border-b-0"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <div :class="`w-2 h-2 rounded-full ${getCategoryColor(faq.category)}`"></div>
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                </div>
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
                  <div class="pl-5 border-l-2 border-purple-100">
                    <div class="text-gray-600 leading-relaxed" v-html="faq.answer"></div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredFAQs.length === 0" class="text-center py-8">
          <Icon name="lucide:search-x" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">該当する質問が見つかりませんでした</h3>
          <p class="text-gray-600">他のカテゴリーをご確認いただくか、直接サポートまでお問い合わせください</p>
        </div>
      </section>

      <!-- Troubleshooting Guide -->
      <section class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">トラブル解決ガイド</h2>
          
          <div class="space-y-8">
            <div 
              v-for="trouble in troubleGuides"
              :key="trouble.title"
              class="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <Icon :name="trouble.icon" :class="`w-5 h-5 mr-3 ${trouble.iconColor}`" />
                  {{ trouble.title }}
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3">よくある原因</h4>
                    <ul class="text-gray-600 text-sm space-y-2">
                      <li v-for="cause in trouble.causes" :key="cause" class="flex items-start space-x-2">
                        <Icon name="lucide:circle" class="w-2 h-2 mt-2 text-gray-400 flex-shrink-0" />
                        <span>{{ cause }}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3">解決方法</h4>
                    <ol class="text-gray-600 text-sm space-y-2">
                      <li v-for="(solution, index) in trouble.solutions" :key="index" class="flex items-start space-x-2">
                        <span class="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center font-medium mt-0.5">{{ index + 1 }}</span>
                        <span>{{ solution }}</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Success Tips -->
      <section class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">収益向上のヒント</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="tip in successTips"
              :key="tip.title"
              class="text-center"
            >
              <div :class="`w-16 h-16 ${tip.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`">
                <Icon :name="tip.icon" :class="`w-8 h-8 ${tip.iconColor}`" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-3">{{ tip.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ tip.description }}</p>
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-xs font-medium text-gray-500 mb-1">具体的なアクション</div>
                <div class="text-sm text-gray-700">{{ tip.action }}</div>
              </div>
            </div>
          </div>

          <div class="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 class="text-xl font-bold text-gray-900 mb-4 text-center">🎯 今月の重点サポート</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-purple-900 mb-2">新人クリエイター向け</h4>
                <ul class="text-purple-800 text-sm space-y-1">
                  <li>• プロフィール最適化サポート</li>
                  <li>• 初回リクエスト対応アドバイス</li>
                  <li>• 料金設定相談</li>
                  <li>• メンター制度のご紹介</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-pink-900 mb-2">売上向上支援</h4>
                <ul class="text-pink-800 text-sm space-y-1">
                  <li>• ポートフォリオ改善アドバイス</li>
                  <li>• SNS活用戦略相談</li>
                  <li>• リピーター獲得のコツ</li>
                  <li>• 新規ジャンル開拓支援</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Resources -->
      <section class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">学習リソース</h2>
          
          <div class="space-y-8">
            <!-- Webinars -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">📚 定期ウェビナー・セミナー</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="webinar in upcomingWebinars"
                  :key="webinar.title"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {{ webinar.category }}
                    </span>
                    <span class="text-xs text-gray-500">{{ webinar.date }}</span>
                  </div>
                  <h4 class="font-semibold text-gray-900 mb-2">{{ webinar.title }}</h4>
                  <p class="text-gray-600 text-sm mb-3">{{ webinar.description }}</p>
                  <div class="flex items-center justify-between">
                    <div class="text-xs text-gray-500">
                      <Icon name="lucide:users" class="w-3 h-3 inline mr-1" />
                      定員{{ webinar.capacity }}名
                    </div>
                    <button class="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      詳細・申込み
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Community -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">👥 コミュニティ・交流</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center p-4 bg-discord rounded-lg text-white">
                  <Icon name="lucide:message-square" class="w-8 h-8 mx-auto mb-3" />
                  <h4 class="font-semibold mb-2">Discord サーバー</h4>
                  <p class="text-sm opacity-90 mb-3">24時間いつでもクリエイター同士で交流</p>
                  <button class="bg-white text-discord px-4 py-2 rounded text-sm font-medium">
                    参加する
                  </button>
                </div>
                <div class="text-center p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white">
                  <Icon name="lucide:calendar" class="w-8 h-8 mx-auto mb-3" />
                  <h4 class="font-semibold mb-2">月次ミートアップ</h4>
                  <p class="text-sm opacity-90 mb-3">オフラインでの情報交換・交流会</p>
                  <button class="bg-white text-purple-500 px-4 py-2 rounded text-sm font-medium">
                    予定を見る
                  </button>
                </div>
                <div class="text-center p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                  <Icon name="lucide:users" class="w-8 h-8 mx-auto mb-3" />
                  <h4 class="font-semibold mb-2">メンター制度</h4>
                  <p class="text-sm opacity-90 mb-3">先輩クリエイターからの個別指導</p>
                  <button class="bg-white text-blue-500 px-4 py-2 rounded text-sm font-medium">
                    申し込む
                  </button>
                </div>
              </div>
            </div>

            <!-- Tools & Templates -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">🛠️ ツール・テンプレート</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  v-for="tool in creatorTools"
                  :key="tool.name"
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center mb-2">
                    <Icon :name="tool.icon" class="w-5 h-5 text-purple-500 mr-2" />
                    <h4 class="font-semibold text-gray-900 text-sm">{{ tool.name }}</h4>
                  </div>
                  <p class="text-gray-600 text-xs mb-3">{{ tool.description }}</p>
                  <button class="w-full bg-purple-100 text-purple-700 py-2 px-3 rounded text-xs font-medium hover:bg-purple-200 transition-colors">
                    ダウンロード
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Emergency Contact -->
      <section class="mb-16">
        <div class="bg-red-50 rounded-2xl p-8 border border-red-200">
          <h2 class="text-2xl font-bold text-red-900 mb-4 text-center">緊急時・重要なお問い合わせ</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-red-900 mb-3">📞 緊急サポート</h3>
              <ul class="text-red-800 text-sm space-y-2">
                <li>• アカウント不正アクセスの疑い</li>
                <li>• 決済・振込に関する重大な問題</li>
                <li>• 悪質なクライアントからの被害</li>
                <li>• プラットフォーム障害による損失</li>
              </ul>
              <div class="mt-4 p-3 bg-white rounded-lg">
                <div class="text-red-900 font-medium">緊急電話: 03-1234-5678</div>
                <div class="text-red-700 text-sm">平日 9:00-20:00 / 土日祝 10:00-17:00</div>
              </div>
            </div>
            <div>
              <h3 class="font-semibold text-red-900 mb-3">📧 重要事項専用</h3>
              <ul class="text-red-800 text-sm space-y-2">
                <li>• 法的トラブル・権利侵害の相談</li>
                <li>• 規約違反・不適切行為の報告</li>
                <li>• プライバシー・個人情報に関する問題</li>
                <li>• その他緊急性の高い案件</li>
              </ul>
              <div class="mt-4 p-3 bg-white rounded-lg">
                <div class="text-red-900 font-medium">priority@requi.com</div>
                <div class="text-red-700 text-sm">優先対応・24時間以内返信保証</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <AppFooter />

    <!-- Chat Support Modal -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showChatModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="showChatModal = false"></div>
        <div class="relative bg-white rounded-2xl w-full max-w-md">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900">チャットサポート</h3>
              <button @click="showChatModal = false" class="text-gray-400 hover:text-gray-600">
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">お困りの内容をお選びください</label>
              <select v-model="chatCategory" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">カテゴリーを選択</option>
                <option value="account">アカウント・ログイン</option>
                <option value="request">リクエスト対応</option>
                <option value="payment">決済・振込</option>
                <option value="technical">技術的な問題</option>
                <option value="guideline">ガイドライン・規約</option>
                <option value="other">その他</option>
              </select>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">詳細をお聞かせください</label>
              <textarea 
                v-model="chatMessage"
                rows="3" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="具体的な状況やお困りの内容をご記入ください"
              ></textarea>
            </div>
            <button 
              @click="startChat"
              :disabled="!chatCategory || !chatMessage.trim()"
              class="w-full bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              チャットを開始
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// パンくずナビゲーション
const breadcrumbs = ref([
  { name: 'クリエイターサポート' }
])

// リアクティブ状態
const activeFaqCategory = ref('all')
const openFaq = ref(null)
const showChatModal = ref(false)
const chatCategory = ref('')
const chatMessage = ref('')

// サポートチャンネル
const supportChannels = ref([
  {
    type: 'chat',
    title: 'チャットサポート',
    description: 'リアルタイムでの質問・相談',
    availability: '平日 10:00-18:00',
    icon: 'lucide:message-circle',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    action: 'openChat'
  },
  {
    type: 'email',
    title: 'メールサポート',
    description: '詳細な質問や資料添付',
    availability: '24時間受付・1時間以内返信',
    icon: 'lucide:mail',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    action: 'openEmail'
  },
  {
    type: 'phone',
    title: '電話サポート',
    description: '緊急時・複雑な問題',
    availability: '平日 10:00-17:00',
    icon: 'lucide:phone',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    action: 'openPhone'
  },
  {
    type: 'faq',
    title: 'FAQ・ヘルプ',
    description: 'よくある質問と解決方法',
    availability: 'いつでも利用可能',
    icon: 'lucide:book-open',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    action: 'scrollToFAQ'
  }
])

// FAQカテゴリー
const faqCategories = ref([
  { id: 'all', name: 'すべて' },
  { id: 'account', name: 'アカウント' },
  { id: 'request', name: 'リクエスト対応' },
  { id: 'payment', name: '決済・収益' },
  { id: 'technical', name: '技術的問題' },
  { id: 'guideline', name: 'ガイドライン' },
  { id: 'community', name: 'コミュニティ' }
])

// FAQ データ
const faqs = ref([
  // アカウント関連
  {
    category: 'account',
    question: 'プロフィールを効果的に設定するコツは？',
    answer: '<strong>魅力的なプロフィール作成のポイント：</strong><br>• 親しみやすいプロフィール画像を使用<br>• 得意分野を明確に記載<br>• 過去の実績や経歴を簡潔に紹介<br>• レスポンス時間を明記<br>• SNSリンクでファンを増やす'
  },
  {
    category: 'account',
    question: 'アカウントのセキュリティを強化したい',
    answer: '2段階認証の設定、強固なパスワードの使用、定期的なパスワード変更をお勧めします。不正アクセスの疑いがある場合は即座にサポートまでご連絡ください。'
  },

  // リクエスト対応
  {
    category: 'request',
    question: 'クライアントとのコミュニケーションで気をつけることは？',
    answer: '<strong>良好な関係を築くコツ：</strong><br>• 24時間以内の返信を心がける<br>• 丁寧で分かりやすい言葉遣い<br>• 進捗の定期的な報告<br>• 疑問点は積極的に質問する<br>• 完成時には感謝の気持ちを伝える'
  },
  {
    category: 'request',
    question: '難しいリクエストを受けた時の対処法は？',
    answer: '技術的に困難、納期が厳しい、内容が不明確な場合は、まずクライアントと相談しましょう。必要に応じて納期延長や仕様調整を提案し、無理な約束は避けることが大切です。'
  },

  // 決済・収益関連
  {
    category: 'payment',
    question: '振込が遅れているようですが...',
    answer: '振込は月末締めの翌月15日払いです。15日を過ぎても振込されない場合は、登録口座情報の確認や金融機関の営業日をご確認の上、サポートまでお問い合わせください。'
  },
  {
    category: 'payment',
    question: '手数料を下げる方法はありますか？',
    answer: '<strong>手数料優遇の条件：</strong><br>• 月間取引件数の増加<br>• 高い顧客満足度（レビュー4.8以上）<br>• 継続的な活動実績<br>• コミュニティへの貢献<br>詳細な条件はメールにてお問い合わせください。'
  },
  {
    category: 'payment',
    question: '税務処理について教えてください',
    answer: '年間20万円以上の収益は確定申告が必要です。支払調書の発行、インボイス制度にも対応しております。詳細は税務署または税理士にご相談いただくか、サポートまでお問い合わせください。'
  },

  // 技術的問題
  {
    category: 'technical',
    question: '画像がアップロードできません',
    answer: '<strong>確認事項：</strong><br>• ファイルサイズが10MB以下か<br>• 形式がJPEG, PNG, GIFか<br>• 安定したネット接続か<br>• ブラウザのキャッシュをクリア<br>問題が続く場合は別のブラウザもお試しください。'
  },
  {
    category: 'technical',
    question: 'スマートフォンで作業できますか？',
    answer: '基本的な操作（メッセージ返信、進捗確認など）はスマートフォンでも可能ですが、作品アップロードや詳細設定にはPC環境を推奨いたします。'
  },

  // ガイドライン
  {
    category: 'guideline',
    question: '二次創作の依頼を受けても大丈夫ですか？',
    answer: '<strong>二次創作のガイドライン：</strong><br>• 著作者が二次創作を明確に許可している作品<br>• パブリックドメインの作品<br>• オマージュ・インスパイア系（直接的な模倣でない）<br>企業キャラクターや商標登録済みキャラクターは要注意です。'
  },
  {
    category: 'guideline',
    question: '商用利用の作品制作時の注意点は？',
    answer: 'クライアントが商用利用を明記している場合は追加料金を設定可能です。著作権の扱い、利用範囲を明確にし、必要に応じて利用規約を取り決めましょう。'
  },

  // コミュニティ
  {
    category: 'community',
    question: 'メンター制度について教えてください',
    answer: '経験豊富なクリエイターが新人をサポートする制度です。月1回のオンライン面談、作品添削、営業戦略のアドバイスなどを受けられます。応募はサポートまでお問い合わせください。'
  },
  {
    category: 'community',
    question: 'Discordサーバーの参加方法は？',
    answer: 'クリエイター認証後、マイページに招待リンクが表示されます。24時間いつでも他のクリエイターと情報交換、相談、雑談が可能です。'
  }
])

// トラブル解決ガイド
const troubleGuides = ref([
  {
    title: 'リクエストが来ない・少ない',
    icon: 'lucide:trending-down',
    iconColor: 'text-red-500',
    causes: [
      'プロフィール情報が不十分',
      'ポートフォリオの魅力不足',
      '価格設定が相場と合わない',
      '得意分野が不明確',
      'レスポンスの遅れ'
    ],
    solutions: [
      'プロフィールを詳しく記入し、魅力的な自己紹介を作成',
      'ポートフォリオを定期的に更新し、多様な作品を掲載',
      '他のクリエイターの価格を参考に適正価格を設定',
      '得意ジャンルやタグを明確に設定',
      'SNSでの宣伝活動を行う'
    ]
  },
  {
    title: 'クライアントとのやり取りトラブル',
    icon: 'lucide:message-circle-x',
    iconColor: 'text-orange-500',
    causes: [
      '要求の相違・認識のずれ',
      'コミュニケーション不足',
      '一方的な仕様変更要求',
      '支払い関連のトラブル',
      '納期に関する問題'
    ],
    solutions: [
      '最初の段階で詳細な確認を行い、認識を合わせる',
      '定期的な進捗報告と積極的なコミュニケーション',
      '大幅な変更は追加料金として別途相談',
      'トラブル時は即座にサポートに相談',
      '余裕を持ったスケジュール調整'
    ]
  },
  {
    title: 'アカウント・決済の問題',
    icon: 'lucide:credit-card',
    iconColor: 'text-blue-500',
    causes: [
      '振込口座情報の誤り',
      'パスワード忘れ・ログイン不可',
      '決済システムの不具合',
      '税務処理の不明点',
      '手数料の計算ミス'
    ],
    solutions: [
      '口座情報を再確認し、必要に応じて更新',
      'パスワードリセット機能を利用',
      'サポートに状況を詳しく報告',
      '税務の専門家または専用サポートに相談',
      '明細を確認し、不明点はサポートに問い合わせ'
    ]
  },
  {
    title: '技術的・操作上の問題',
    icon: 'lucide:settings',
    iconColor: 'text-purple-500',
    causes: [
      'ブラウザの互換性問題',
      'ファイルアップロードエラー',
      '画面表示の不具合',
      'ネットワーク接続の不安定',
      'デバイスの性能不足'
    ],
    solutions: [
      '推奨ブラウザ（Chrome, Firefox）を使用',
      'ファイルサイズ・形式を確認し、必要に応じて圧縮',
      'ブラウザキャッシュをクリア、再読み込み',
      '安定したネットワーク環境で再試行',
      'PC環境での作業を推奨、サポートに相談'
    ]
  }
])

// 成功のヒント
const successTips = ref([
  {
    title: 'プロフィール最適化',
    description: '第一印象を左右する重要な要素です',
    action: '魅力的なアバター設定、詳細な自己紹介、実績の定期更新',
    icon: 'lucide:user-circle',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'ポートフォリオ充実',
    description: '多様な作品で技術力をアピール',
    action: '月2-3作品の新規投稿、ジャンル別の分類、制作プロセス公開',
    icon: 'lucide:image',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'コミュニケーション力',
    description: 'リピーター獲得の鍵となります',
    action: '迅速な返信、丁寧な対応、積極的な提案・相談',
    icon: 'lucide:message-heart',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600'
  },
  {
    title: '適正価格設定',
    description: '技術力と市場価値のバランス',
    action: '競合調査、段階的な価格上昇、付加価値の提供',
    icon: 'lucide:trending-up',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    title: 'SNS連携活用',
    description: '認知度向上と集客につながります',
    action: 'Twitter/Instagram連携、作品公開、ファンとの交流',
    icon: 'lucide:share-2',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: '継続的な学習',
    description: '技術向上とトレンド把握',
    action: 'ウェビナー参加、新技法習得、他クリエイターとの情報交換',
    icon: 'lucide:graduation-cap',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  }
])

// 今後のウェビナー
const upcomingWebinars = ref([
  {
    title: '売上アップの料金戦略セミナー',
    description: '適正価格の設定方法と値上げのタイミング',
    category: '収益向上',
    date: '2月15日 19:00-20:30',
    capacity: 50
  },
  {
    title: 'SNS活用でファン獲得術',
    description: 'Twitter・Instagramでの効果的な作品発信',
    category: 'マーケティング',
    date: '2月22日 20:00-21:00',
    capacity: 100
  },
  {
    title: '新人クリエイター向け基礎講座',
    description: 'プロフィール作成からリクエスト対応まで',
    category: '初心者向け',
    date: '3月1日 19:00-20:30',
    capacity: 30
  },
  {
    title: 'Live2D制作ワークショップ',
    description: '実際の制作工程をライブデモで解説',
    category: '技術向上',
    date: '3月8日 14:00-16:00',
    capacity: 25
  }
])

// ツール・テンプレート
const creatorTools = ref([
  {
    name: '契約書テンプレート',
    description: '商用案件用の基本契約書',
    icon: 'lucide:file-text'
  },
  {
    name: '価格計算ツール',
    description: '作業時間から適正価格を算出',
    icon: 'lucide:calculator'
  },
  {
    name: 'リクエスト管理表',
    description: '案件の進捗管理用スプレッドシート',
    icon: 'lucide:table'
  },
  {
    name: '納品チェックリスト',
    description: '納品前の確認項目リスト',
    icon: 'lucide:check-square'
  },
  {
    name: 'SNS投稿テンプレート',
    description: '作品宣伝用のSNS文例集',
    icon: 'lucide:megaphone'
  },
  {
    name: 'ポートフォリオ構成ガイド',
    description: '魅力的なポートフォリオの作り方',
    icon: 'lucide:layout'
  },
  {
    name: '確定申告サポート資料',
    description: 'クリエイター向け税務ガイド',
    icon: 'lucide:receipt'
  },
  {
    name: 'トラブル対応マニュアル',
    description: '困った時の対処法集',
    icon: 'lucide:life-buoy'
  }
])

// 計算プロパティ
const filteredFAQs = computed(() => {
  if (activeFaqCategory.value === 'all') {
    return faqs.value
  }
  return faqs.value.filter(faq => faq.category === activeFaqCategory.value)
})

// メソッド
const handleSupportClick = (action) => {
  switch (action) {
    case 'openChat':
      openChatSupport()
      break
    case 'openEmail':
      window.location.href = 'mailto:creator-support@requi.com'
      break
    case 'openPhone':
      window.location.href = 'tel:03-1234-5678'
      break
    case 'scrollToFAQ':
      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })
      break
  }
}

const openChatSupport = () => {
  showChatModal.value = true
}

const startChat = () => {
  // チャットサポート開始の処理
  console.log('Starting chat with:', { category: chatCategory.value, message: chatMessage.value })
  showChatModal.value = false
  // 実際の実装では、チャットサービスに接続
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const getCategoryColor = (category) => {
  const colors = {
    account: 'bg-blue-500',
    request: 'bg-green-500',
    payment: 'bg-purple-500',
    technical: 'bg-orange-500',
    guideline: 'bg-pink-500',
    community: 'bg-indigo-500'
  }
  return colors[category] || 'bg-gray-500'
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

.bg-discord {
  background-color: #5865F2;
}

.text-discord {
  color: #5865F2;
}
</style>