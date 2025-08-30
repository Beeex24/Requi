<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="プライバシーポリシー - Requi レキ"
      description="Requi レキにおける個人情報の取り扱いについて定めたプライバシーポリシーです。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          プライバシーポリシー
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          個人情報の取り扱いについて
        </p>
        
        <div class="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full">
          <Icon name="lucide:shield-check" class="w-4 h-4 text-pink-500 mr-2" />
          <span class="text-sm font-medium text-pink-600">最終更新日：2025年1月1日</span>
        </div>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Table of Contents -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <nav class="space-y-2">
          <a
            v-for="(section, index) in tableOfContents"
            :key="index"
            :href="`#section-${index + 1}`"
            class="block text-pink-600 hover:text-pink-700 text-sm py-1 border-l-2 border-transparent hover:border-pink-300 pl-3 transition-colors"
            @click.prevent="scrollToSection(index + 1)"
          >
            {{ index + 1 }}. {{ section }}
          </a>
        </nav>
      </div>

      <!-- Content Sections -->
      <div class="bg-white rounded-2xl p-8 border border-gray-200">
        <!-- Introduction -->
        <div class="mb-8">
          <p class="text-gray-700 leading-relaxed">
            Requi レキ（以下「当サービス」）を運営するMIDグループ（以下「当社」）は、当サービスをご利用いただくお客様（以下「利用者」）の個人情報の保護について、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定め、個人情報保護法その他の関連法令を遵守し、利用者の個人情報を適切に取り扱います。
          </p>
        </div>

        <!-- Section 1 -->
        <section :id="`section-1`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
            個人情報の定義
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              本ポリシーにおいて「個人情報」とは、個人情報保護法第2条第1項に定める個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）を指します。
            </p>
          </div>
        </section>

        <!-- Section 2 -->
        <section :id="`section-2`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
            個人情報の取得方法
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、以下の方法により利用者の個人情報を取得します。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>当サービスへのアカウント登録時</li>
              <li>お問い合わせフォームからのご連絡時</li>
              <li>作品のリクエスト・制作時</li>
              <li>決済処理時</li>
              <li>アンケート・キャンペーンへの参加時</li>
              <li>SNS連携による認証時</li>
              <li>当サービスのご利用時（Cookieやアクセスログ等）</li>
            </ul>
          </div>
        </section>

        <!-- Section 3 -->
        <section :id="`section-3`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
            取得する個人情報の種類
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、当サービスの提供にあたり、以下の個人情報を取得する場合があります。
            </p>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-3">3.1 登録情報</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>氏名（ハンドルネーム含む）</li>
              <li>メールアドレス</li>
              <li>パスワード（暗号化して保存）</li>
              <li>生年月日</li>
              <li>プロフィール画像</li>
              <li>自己紹介文</li>
              <li>SNSアカウント情報</li>
            </ul>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">3.2 決済情報</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>クレジットカード情報（決済代行会社経由）</li>
              <li>銀行口座情報（クリエイター向け）</li>
              <li>取引履歴</li>
              <li>請求・領収書情報</li>
            </ul>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">3.3 利用情報</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>IPアドレス</li>
              <li>ブラウザ情報</li>
              <li>デバイス情報</li>
              <li>アクセスログ</li>
              <li>Cookie情報</li>
              <li>サービス利用状況</li>
            </ul>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">3.4 作品・コミュニケーション情報</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>作品データ・画像</li>
              <li>リクエスト内容</li>
              <li>メッセージのやり取り</li>
              <li>レビュー・評価</li>
            </ul>
          </div>
        </section>

        <!-- Section 4 -->
        <section :id="`section-4`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
            個人情報の利用目的
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、取得した個人情報を以下の目的で利用します。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>当サービスの提供・運営</li>
              <li>アカウント管理・認証</li>
              <li>作品の制作・納品に関する連絡</li>
              <li>決済処理・請求</li>
              <li>カスタマーサポート</li>
              <li>利用規約違反の対応</li>
              <li>サービス改善・新機能開発</li>
              <li>マーケティング・広告配信</li>
              <li>統計データの作成（個人を特定できない形式）</li>
              <li>法令に基づく対応</li>
              <li>その他、利用者に明示した目的</li>
            </ul>
          </div>
        </section>

        <!-- Section 5 -->
        <section :id="`section-5`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
            個人情報の第三者提供
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、以下の場合を除き、利用者の同意なく個人情報を第三者に提供しません。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>法令に基づく場合</li>
              <li>人の生命、身体又は財産の保護のために必要がある場合</li>
              <li>公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合</li>
              <li>国の機関等が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              <li>合併、会社分割、営業譲渡その他の事由により事業の承継が行われる場合</li>
            </ul>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">5.1 業務委託先への提供</h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、サービス提供に必要な範囲で、以下の業務委託先に個人情報を提供する場合があります。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>決済代行会社</li>
              <li>メール配信サービス</li>
              <li>クラウドサービス提供会社</li>
              <li>システム開発・保守会社</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mb-4">
              これらの委託先には、適切な個人情報の取り扱いを求め、秘密保持契約を締結しています。
            </p>
          </div>
        </section>

        <!-- Section 6 -->
        <section :id="`section-6`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
            個人情報の保存期間
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、個人情報を以下の期間保存します。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>アカウント情報：アカウント削除から3年間</li>
              <li>取引情報：取引完了から7年間（法令に基づく）</li>
              <li>お問い合わせ情報：対応完了から2年間</li>
              <li>アクセスログ：取得から1年間</li>
              <li>その他：利用目的達成に必要な期間</li>
            </ul>
            <p class="text-gray-700 leading-relaxed">
              ただし、法令により保存期間が定められている場合は、その期間に従います。
            </p>
          </div>
        </section>

        <!-- Section 7 -->
        <section :id="`section-7`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
            Cookieの使用
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当サービスでは、サービスの利便性向上のためCookieを使用しています。
            </p>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-3">7.1 使用目的</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>ログイン状態の維持</li>
              <li>利用者の設定情報の保存</li>
              <li>サービス利用状況の分析</li>
              <li>広告の最適化</li>
            </ul>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">7.2 第三者Cookie</h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              当サービスでは、以下のサービスを利用しており、これらのサービスがCookieを使用する場合があります。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Google Analytics</li>
              <li>Google AdSense</li>
              <li>Facebook Pixel</li>
              <li>Twitter Analytics</li>
            </ul>
            <p class="text-gray-700 leading-relaxed">
              Cookieの使用を拒否する場合は、ブラウザの設定で無効にできますが、サービスの一部機能が利用できなくなる場合があります。
            </p>
          </div>
        </section>

        <!-- Section 8 -->
        <section :id="`section-8`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
            個人情報の開示・訂正・削除
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              利用者は、当社に対して以下の請求を行うことができます。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>個人情報の開示</li>
              <li>個人情報の訂正・追加・削除</li>
              <li>個人情報の利用停止・消去</li>
              <li>個人情報の第三者提供停止</li>
            </ul>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-3">8.1 請求方法</h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              上記の請求を行う場合は、マイページの設定画面から手続きを行うか、お問い合わせフォームよりご連絡ください。本人確認を行った上で、合理的な期間内に対応いたします。
            </p>

            <h3 class="text-lg font-semibold text-gray-900 mb-3">8.2 対応できない場合</h3>
            <p class="text-gray-700 leading-relaxed mb-4">
              以下の場合は、請求にお応えできない場合があります。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>本人確認ができない場合</li>
              <li>法令に基づき保存が義務付けられている場合</li>
              <li>他の利用者の権利を侵害するおそれがある場合</li>
              <li>当社の正当な利益を著しく損なうおそれがある場合</li>
            </ul>
          </div>
        </section>

        <!-- Section 9 -->
        <section :id="`section-9`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
            個人情報の安全管理
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、個人情報の安全管理のため、以下の措置を講じています。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>SSL暗号化通信の使用</li>
              <li>アクセス権限の制限</li>
              <li>パスワードの暗号化保存</li>
              <li>定期的なセキュリティ監査</li>
              <li>従業員への教育・研修</li>
              <li>物理的セキュリティの確保</li>
              <li>システムの脆弱性対策</li>
            </ul>
          </div>
        </section>

        <!-- Section 10 -->
        <section :id="`section-10`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">10</span>
            未成年者の個人情報
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、18歳未満の方からの個人情報取得にあたり、保護者の同意を得るよう努めています。18歳未満の方が当サービスを利用する場合は、保護者の方の同意の上でご利用ください。
            </p>
            <p class="text-gray-700 leading-relaxed">
              保護者の方で、お子様の個人情報について削除等のご要望がある場合は、お問い合わせください。
            </p>
          </div>
        </section>

        <!-- Section 11 -->
        <section :id="`section-11`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">11</span>
            プライバシーポリシーの変更
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              当社は、法令の改正やサービス内容の変更等に伴い、本ポリシーを変更する場合があります。変更する場合は、当サービス内での告知またはメールによる通知により、利用者にお知らせします。
            </p>
            <p class="text-gray-700 leading-relaxed">
              重要な変更については、変更前に利用者の同意を得る場合があります。変更後も当サービスを継続してご利用いただく場合は、変更後のプライバシーポリシーに同意いただいたものとみなします。
            </p>
          </div>
        </section>

        <!-- Section 12 -->
        <section :id="`section-12`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">12</span>
            お問い合わせ窓口
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              本ポリシーに関するお問い合わせは、以下の窓口までご連絡ください。
            </p>
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-2">MIDグループ</h3>
              <p class="text-gray-700 text-sm mb-1">個人情報保護担当者</p>
              <p class="text-gray-700 text-sm mb-1">メール：privacy@requi.com</p>
              <p class="text-gray-700 text-sm mb-1">電話：03-1234-5678</p>
              <p class="text-gray-700 text-sm">受付時間：平日 10:00-18:00</p>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <div class="mt-12 pt-8 border-t border-gray-200 text-center">
          <p class="text-gray-600 text-sm mb-4">
            制定日：2025年1月1日<br>
            最終更新日：2025年1月1日
          </p>
          <p class="text-gray-600 text-sm">
            MIDグループ
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />

    <!-- Scroll to Top Button -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 w-12 h-12 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-colors z-50"
      >
        <Icon name="lucide:arrow-up" class="w-5 h-5 mx-auto" />
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// パンくずナビゲーション
const breadcrumbs = ref([
  { name: 'プライバシーポリシー' }
])

// 目次
const tableOfContents = ref([
  '個人情報の定義',
  '個人情報の取得方法',
  '取得する個人情報の種類',
  '個人情報の利用目的',
  '個人情報の第三者提供',
  '個人情報の保存期間',
  'Cookieの使用',
  '個人情報の開示・訂正・削除',
  '個人情報の安全管理',
  '未成年者の個人情報',
  'プライバシーポリシーの変更',
  'お問い合わせ窓口'
])

// スクロール関連
const showScrollTop = ref(false)

// メソッド
const scrollToSection = (sectionNumber) => {
  const element = document.getElementById(`section-${sectionNumber}`)
  if (element) {
    const offset = 100 // ピクセル単位でオフセットを設定
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

// ライフサイクル
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>