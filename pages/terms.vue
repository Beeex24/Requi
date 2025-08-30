<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="利用規約 - Requi レキ"
      description="Requi レキの利用規約です。サービスをご利用いただく前に必ずご確認ください。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          利用規約
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキサービス利用規約
        </p>
        
        <div class="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full">
          <Icon name="lucide:file-text" class="w-4 h-4 text-pink-500 mr-2" />
          <span class="text-sm font-medium text-pink-600">最終更新日：2025年1月1日</span>
        </div>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Table of Contents -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <nav class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <a
            v-for="(section, index) in tableOfContents"
            :key="index"
            :href="`#section-${index + 1}`"
            class="block text-pink-600 hover:text-pink-700 text-sm py-1 border-l-2 border-transparent hover:border-pink-300 pl-3 transition-colors"
            @click.prevent="scrollToSection(index + 1)"
          >
            第{{ index + 1 }}条　{{ section }}
          </a>
        </nav>
      </div>

      <!-- Content Sections -->
      <div class="bg-white rounded-2xl p-8 border border-gray-200">
        <!-- Introduction -->
        <div class="mb-8">
          <p class="text-gray-700 leading-relaxed">
            この利用規約（以下「本規約」）は、MIDグループ（以下「当社」）が提供するクリエイター依頼プラットフォーム「Requi レキ」（以下「本サービス」）の利用に関する条件を定めるものです。本サービスをご利用になる方（以下「ユーザー」）は、本規約に同意した上でサービスをご利用ください。
          </p>
        </div>

        <!-- Section 1 -->
        <section :id="`section-1`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
            定義
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              本規約において使用する用語の定義は、以下のとおりとします。
            </p>
            <div class="space-y-3">
              <div class="border-l-4 border-pink-200 pl-4">
                <strong class="text-gray-900">「本サービス」</strong>
                <p class="text-gray-700 text-sm">当社が運営するクリエイター依頼プラットフォーム「Requi レキ」</p>
              </div>
              <div class="border-l-4 border-pink-200 pl-4">
                <strong class="text-gray-900">「ユーザー」</strong>
                <p class="text-gray-700 text-sm">本サービスを利用する全ての個人・法人</p>
              </div>
              <div class="border-l-4 border-pink-200 pl-4">
                <strong class="text-gray-900">「クライアント」</strong>
                <p class="text-gray-700 text-sm">作品制作を依頼するユーザー</p>
              </div>
              <div class="border-l-4 border-pink-200 pl-4">
                <strong class="text-gray-900">「クリエイター」</strong>
                <p class="text-gray-700 text-sm">作品制作を受注するユーザー</p>
              </div>
              <div class="border-l-4 border-pink-200 pl-4">
                <strong class="text-gray-900">「リクエスト」</strong>
                <p class="text-gray-700 text-sm">クライアントがクリエイターに対して行う作品制作の依頼</p>
              </div>
              <div class="border-l-4 border-pink-200 pl-4">
                <strong class="text-gray-900">「作品」</strong>
                <p class="text-gray-700 text-sm">リクエストに基づいてクリエイターが制作する成果物</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section :id="`section-2`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
            本規約への同意
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>ユーザーは、本規約に同意した上で本サービスを利用するものとします。</li>
              <li>本規約に同意しない場合、本サービスを利用することはできません。</li>
              <li>ユーザーが未成年者の場合は、親権者等の法定代理人の同意を得た上でご利用ください。</li>
              <li>本サービスの利用開始をもって、本規約に同意したものとみなします。</li>
            </ol>
          </div>
        </section>

        <!-- Section 3 -->
        <section :id="`section-3`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
            アカウント登録
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>本サービスを利用するには、当社の定める方法によりアカウント登録を行う必要があります。</li>
              <li>登録申請者は、登録情報について真実かつ正確な情報を提供する必要があります。</li>
              <li>当社は、以下に該当する場合、登録を拒否または削除することができます：
                <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>登録情報に虚偽、誤記または記載漏れがある場合</li>
                  <li>反社会的勢力に該当する場合</li>
                  <li>過去に本規約違反により利用停止処分を受けた場合</li>
                  <li>その他当社が不適切と判断した場合</li>
                </ul>
              </li>
              <li>ユーザーは登録情報に変更があった場合、速やかに変更手続きを行う必要があります。</li>
            </ol>
          </div>
        </section>

        <!-- Section 4 -->
        <section :id="`section-4`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
            アカウント管理
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>ユーザーは、アカウントのユーザーIDおよびパスワードを適切に管理する責任を負います。</li>
              <li>ユーザーIDおよびパスワードを第三者に譲渡、貸与、売買することはできません。</li>
              <li>アカウントの不正利用の疑いがある場合は、速やかに当社にご連絡ください。</li>
              <li>アカウントから発生した一切の行為に関する責任は、当該ユーザーが負うものとします。</li>
            </ol>
          </div>
        </section>

        <!-- Section 5 -->
        <section :id="`section-5`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
            サービス内容
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>本サービスは、クライアントとクリエイターをマッチングし、作品制作の取引を仲介するプラットフォームです。</li>
              <li>本サービスの主な機能は以下のとおりです：
                <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>クリエイターのプロフィール・作品の閲覧</li>
                  <li>リクエストの送信・受諾</li>
                  <li>メッセージ機能</li>
                  <li>決済・エスクロー機能</li>
                  <li>評価・レビュー機能</li>
                  <li>その他当社が提供する機能</li>
                </ul>
              </li>
              <li>当社は、本サービスの内容を予告なく変更または終了することができます。</li>
            </ol>
          </div>
        </section>

        <!-- Section 6 -->
        <section :id="`section-6`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
            リクエストと取引
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>クライアントは、クリエイターに対してリクエストを送信することができます。</li>
              <li>クリエイターがリクエストを承諾した時点で、契約が成立します。</li>
              <li>契約成立後、クライアントは指定された期限内に料金を支払う必要があります。</li>
              <li>クリエイターは、合意された内容・期限に従って作品を制作し納品します。</li>
              <li>作品の修正は、事前に合意された範囲内でのみ可能です。</li>
              <li>取引の詳細は、個別の契約内容に従います。</li>
            </ol>
          </div>
        </section>

        <!-- Section 7 -->
        <section :id="`section-7`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
            料金と決済
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>本サービスの利用料金は以下のとおりです：
                <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>クライアント：作品料金 + システム手数料（6%〜）</li>
                  <li>クリエイター：売上からプラットフォーム手数料（6%〜9.8%）を差し引いた金額</li>
                </ul>
              </li>
              <li>料金は、クレジットカード、銀行振込、その他当社が指定する方法で支払うものとします。</li>
              <li>エスクローサービスにより、作品納品確認まで料金を当社が預かります。</li>
              <li>クリエイターへの支払いは、月末締めの翌月15日払いとします。</li>
              <li>返金については、当社の返金ポリシーに従います。</li>
            </ol>
          </div>
        </section>

        <!-- Section 8 -->
        <section :id="`section-8`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
            知的財産権
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>作品の著作権は、原則としてクリエイターに帰属します。</li>
              <li>クライアントは、合意された利用範囲内で作品を利用する権利を取得します。</li>
              <li>商用利用については、事前にクリエイターとの間で明確に合意する必要があります。</li>
              <li>二次創作作品については、原作者の権利を侵害しない範囲で制作・利用してください。</li>
              <li>本サービスのシステム、デザイン、コンテンツ等の知的財産権は当社に帰属します。</li>
              <li>ユーザーは、第三者の知的財産権を侵害しない責任を負います。</li>
            </ol>
          </div>
        </section>

        <!-- Section 9 -->
        <section :id="`section-9`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
            禁止行為
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              ユーザーは、以下の行為を行ってはなりません。
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>法令、本規約、公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為または犯罪を助長する行為</li>
              <li>第三者の知的財産権、肖像権、プライバシー権その他の権利を侵害する行為</li>
              <li>第三者を差別し、誹謗中傷し、または名誉を毀損する行為</li>
              <li>わいせつ、児童ポルノ、児童虐待にあたるコンテンツを投稿する行為</li>
              <li>宗教的、政治的な内容を含む作品の制作・依頼（一般的な歴史・文化的題材は除く）</li>
              <li>虚偽の情報を登録・投稿する行為</li>
              <li>営業、宣伝、勧誘、その他営利を目的とする行為（本サービス利用目的以外）</li>
              <li>他のユーザーに迷惑をかける行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>コンピュータウィルス等の送信または有害なプログラムの使用</li>
              <li>本サービスの情報を無断で商用利用する行為</li>
              <li>アカウントの複数保有、売買、譲渡</li>
              <li>本サービスを介さない直接取引の実施または勧誘</li>
              <li>その他当社が不適切と判断する行為</li>
            </ul>
          </div>
        </section>

        <!-- Section 10 -->
        <section :id="`section-10`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">10</span>
            利用停止・アカウント削除
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>当社は、ユーザーが以下に該当する場合、事前通知なくサービス利用を停止またはアカウントを削除できます。
                <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>本規約に違反した場合</li>
                  <li>登録情報に虚偽があることが判明した場合</li>
                  <li>料金の支払いを滞納した場合</li>
                  <li>反社会的勢力に該当することが判明した場合</li>
                  <li>長期間サービスを利用していない場合</li>
                  <li>その他当社がサービス利用を適当でないと判断した場合</li>
                </ul>
              </li>
              <li>利用停止により生じた損害について、当社は一切の責任を負いません。</li>
              <li>ユーザーは、いつでもアカウントを削除することができます。</li>
            </ol>
          </div>
        </section>

        <!-- Section 11 -->
        <section :id="`section-11`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">11</span>
            免責事項
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>本サービスは現状有姿で提供され、当社は本サービスの完全性、正確性、有用性等について保証しません。</li>
              <li>本サービスの利用により発生したトラブルについて、当社は原則として関与しません。</li>
              <li>当社は、以下について責任を負いません：
                <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>ユーザー間の取引に関するトラブル</li>
                  <li>作品の品質、納期、内容等</li>
                  <li>決済システムの障害による損失</li>
                  <li>第三者による不正アクセス</li>
                  <li>システム障害、通信エラー等</li>
                </ul>
              </li>
              <li>当社に責任が生じる場合も、損害額は当該取引金額を上限とします。</li>
            </ol>
          </div>
        </section>

        <!-- Section 12 -->
        <section :id="`section-12`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">12</span>
            個人情報の取り扱い
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>個人情報の取り扱いについては、別途定める<NuxtLink to="/privacy" class="text-pink-600 hover:text-pink-700 underline">プライバシーポリシー</NuxtLink>に従います。</li>
              <li>ユーザーは、プライバシーポリシーに同意した上で本サービスを利用するものとします。</li>
            </ol>
          </div>
        </section>

        <!-- Section 13 -->
        <section :id="`section-13`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">13</span>
            利用規約の変更
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>当社は、必要に応じて本規約を変更することができます。</li>
              <li>規約変更は、本サービス内での告知により効力を生じます。</li>
              <li>重要な変更については、事前に通知期間を設けることがあります。</li>
              <li>変更後も本サービスを継続利用する場合、変更に同意したものとみなします。</li>
            </ol>
          </div>
        </section>

        <!-- Section 14 -->
        <section :id="`section-14`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">14</span>
            準拠法・管轄裁判所
          </h2>
          <div class="prose prose-gray max-w-none">
            <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>本規約の準拠法は日本法とします。</li>
              <li>本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ol>
          </div>
        </section>

        <!-- Section 15 -->
        <section :id="`section-15`" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">15</span>
            お問い合わせ
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-700 leading-relaxed mb-4">
              本規約に関するお問い合わせは、以下の方法でご連絡ください。
            </p>
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-2">MIDグループ</h3>
              <p class="text-gray-700 text-sm mb-1">カスタマーサポート</p>
              <p class="text-gray-700 text-sm mb-1">メール：support@requi.com</p>
              <p class="text-gray-700 text-sm mb-1">お問い合わせフォーム：<NuxtLink to="/contact" class="text-pink-600 hover:text-pink-700 underline">こちら</NuxtLink></p>
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

      <!-- Related Links -->
      <div class="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4 text-center">関連文書</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink 
            to="/privacy"
            class="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="lucide:shield" class="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">プライバシーポリシー</h4>
                <p class="text-gray-600 text-sm">個人情報の取り扱いについて</p>
              </div>
            </div>
          </NuxtLink>
          
          <NuxtLink 
            to="/faq"
            class="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="lucide:help-circle" class="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">よくある質問</h4>
                <p class="text-gray-600 text-sm">ご利用に関するQ&A</p>
              </div>
            </div>
          </NuxtLink>
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
  { name: '利用規約' }
])

// 目次
const tableOfContents = ref([
  '定義',
  '本規約への同意',
  'アカウント登録',
  'アカウント管理',
  'サービス内容',
  'リクエストと取引',
  '料金と決済',
  '知的財産権',
  '禁止行為',
  '利用停止・アカウント削除',
  '免責事項',
  '個人情報の取り扱い',
  '利用規約の変更',
  '準拠法・管轄裁判所',
  'お問い合わせ'
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