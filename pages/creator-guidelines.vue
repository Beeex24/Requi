<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="クリエイターガイドライン - Requi レキ"
      description="Requi レキでクリエイターとして活動するためのガイドライン。登録方法、作品制作のルール、収益化について詳しく解説します。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          クリエイター<br>
          <span class="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            ガイドライン
          </span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキで安全で楽しい創作活動を始めましょう。<br>
          シンプルなシステムで、あなたの才能を収益化できます。
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <NuxtLink
            to="/creator-register"
            class="inline-flex items-center bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            <Icon name="lucide:sparkles" class="w-5 h-5 mr-2" />
            今すぐクリエイター登録
          </NuxtLink>
          <NuxtLink
            to="/monetization"
            class="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all font-bold text-lg"
          >
            <Icon name="lucide:trending-up" class="w-5 h-5 mr-2" />
            収益化について
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-pink-600">手数料</div>
            <div class="text-gray-900">6%〜9.8%</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-pink-600">支払い</div>
            <div class="text-gray-900">月末締め翌月払い</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-pink-600">審査</div>
            <div class="text-gray-900">最短1営業日</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-pink-600">登録</div>
            <div class="text-gray-900">完全無料</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Table of Contents -->
    <section class="bg-white py-8 border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">ガイドライン目次</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            v-for="(section, index) in tableOfContents"
            :key="index"
            :href="`#section-${index + 1}`"
            @click.prevent="scrollToSection(index + 1)"
            class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors group"
          >
            <div :class="`w-8 h-8 ${section.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`">
              <Icon :name="section.icon" :class="`w-4 h-4 ${section.iconColor}`" />
            </div>
            <div>
              <div class="font-medium text-gray-900 group-hover:text-pink-600">{{ section.title }}</div>
              <div class="text-sm text-gray-500">{{ section.description }}</div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Section 1: Getting Started -->
      <section :id="`section-1`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:play-circle" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">はじめに</h2>
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Requi レキとは</h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                Requi レキは、クリエイターとクライアントを繋ぐシンプルな創作依頼プラットフォームです。複雑な見積もりや打ち合わせを省略し、「気軽に」「簡単に」作品制作の依頼を受けることができます。
              </p>
              <div class="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 class="font-semibold text-pink-900 mb-2">Requi レキの特徴</h4>
                <ul class="text-pink-800 text-sm space-y-1">
                  <li>• シンプルなリクエストシステム</li>
                  <li>• エスクローによる安全な決済</li>
                  <li>• 明確な料金設定</li>
                  <li>• リテイク1回まで対応</li>
                  <li>• 著作権はクリエイターに帰属</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">こんな方におすすめ</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">初心者クリエイター</h4>
                  <p class="text-gray-600 text-sm">複雑な営業や価格交渉が不要。作品制作に集中できます</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">副業として</h4>
                  <p class="text-gray-600 text-sm">空いた時間で創作活動。本業に支障のない範囲で収益化</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">学生・主婦(主夫)</h4>
                  <p class="text-gray-600 text-sm">在宅で好きな時間に作業。スキルアップにも最適</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">プロクリエイター</h4>
                  <p class="text-gray-600 text-sm">新しい収益源として。ファンとの交流にも活用</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Registration Process -->
      <section :id="`section-2`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:user-plus" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">登録・審査プロセス</h2>
          </div>

          <div class="space-y-8">
            <!-- Registration Steps -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">登録の流れ</h3>
              <div class="space-y-4">
                <div 
                  v-for="(step, index) in registrationSteps"
                  :key="index"
                  class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {{ index + 1 }}
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ step.title }}</h4>
                    <p class="text-gray-600 text-sm mt-1">{{ step.description }}</p>
                    <div v-if="step.details" class="mt-2">
                      <ul class="text-gray-500 text-xs space-y-1">
                        <li v-for="detail in step.details" :key="detail">• {{ detail }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Required Information -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">登録に必要な情報</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">基本情報</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 活動名（ハンドルネーム可）</li>
                    <li>• メールアドレス</li>
                    <li>• プロフィール画像</li>
                    <li>• 自己紹介文</li>
                    <li>• SNSアカウント（任意）</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">作品・料金情報</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• ポートフォリオ（3〜10点）</li>
                    <li>• 得意分野・カテゴリー</li>
                    <li>• 料金設定（最低・最高価格）</li>
                    <li>• 平均納期</li>
                    <li>• 制作可能な内容・サイズ</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Review Criteria -->
            <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 class="text-xl font-semibold text-yellow-900 mb-4">審査基準</h3>
              <div class="space-y-3 text-yellow-800">
                <div class="flex items-start space-x-2">
                  <Icon name="lucide:check-circle" class="w-5 h-5 mt-0.5 text-yellow-600" />
                  <div>
                    <strong>作品のクオリティ：</strong>
                    <span class="text-sm">一定水準以上の技術力・表現力があること</span>
                  </div>
                </div>
                <div class="flex items-start space-x-2">
                  <Icon name="lucide:check-circle" class="w-5 h-5 mt-0.5 text-yellow-600" />
                  <div>
                    <strong>オリジナリティ：</strong>
                    <span class="text-sm">他者の作品をそのまま模倣していないこと</span>
                  </div>
                </div>
                <div class="flex items-start space-x-2">
                  <Icon name="lucide:check-circle" class="w-5 h-5 mt-0.5 text-yellow-600" />
                  <div>
                    <strong>ガイドライン遵守：</strong>
                    <span class="text-sm">コミュニティガイドラインを理解・遵守できること</span>
                  </div>
                </div>
                <div class="flex items-start space-x-2">
                  <Icon name="lucide:check-circle" class="w-5 h-5 mt-0.5 text-yellow-600" />
                  <div>
                    <strong>継続性：</strong>
                    <span class="text-sm">継続して活動する意思があること</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Content Guidelines -->
      <section :id="`section-3`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:shield-check" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">コンテンツガイドライン</h2>
          </div>

          <div class="space-y-8">
            <!-- Acceptable Content -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">制作可能なコンテンツ</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                  v-for="category in acceptableContent"
                  :key="category.name"
                  class="p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div class="flex items-center mb-2">
                    <Icon :name="category.icon" class="w-5 h-5 text-green-600 mr-2" />
                    <h4 class="font-semibold text-green-900">{{ category.name }}</h4>
                  </div>
                  <ul class="text-green-800 text-sm space-y-1">
                    <li v-for="item in category.items" :key="item">• {{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Prohibited Content -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">制作禁止コンテンツ</h3>
              <div class="bg-red-50 p-6 rounded-lg border border-red-200">
                <div class="space-y-4">
                  <div 
                    v-for="prohibition in prohibitedContent"
                    :key="prohibition.category"
                  >
                    <h4 class="font-semibold text-red-900 mb-2">{{ prohibition.category }}</h4>
                    <ul class="text-red-800 text-sm space-y-1">
                      <li v-for="item in prohibition.items" :key="item">• {{ item }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Secondary Creation Guidelines -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">二次創作について</h3>
              <div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 class="font-semibold text-blue-900 mb-2">許可されている二次創作</h4>
                  <ul class="text-blue-800 text-sm space-y-1">
                    <li>• 著作者が二次創作を明確に許可している作品</li>
                    <li>• パブリックドメインの作品</li>
                    <li>• オマージュ・インスパイア系（直接的な模倣ではない）</li>
                    <li>• 歴史上の人物・出来事（創作性がある場合）</li>
                  </ul>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 class="font-semibold text-orange-900 mb-2">注意が必要な二次創作</h4>
                  <ul class="text-orange-800 text-sm space-y-1">
                    <li>• 企業キャラクター・マスコット</li>
                    <li>• 商標登録されているキャラクター</li>
                    <li>• 実在の人物（著名人・アイドル等）</li>
                    <li>• ゲーム・アニメキャラクター（要ガイドライン確認）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Pricing & Revenue -->
      <section :id="`section-4`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:trending-up" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">料金設定と収益化</h2>
          </div>

          <div class="space-y-8">
            <!-- Pricing Strategy -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">料金設定のコツ</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">初心者向け価格帯</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>アイコン・簡単イラスト</span>
                      <span class="font-medium">¥1,000〜3,000</span>
                    </div>
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>キャラクター1体</span>
                      <span class="font-medium">¥3,000〜8,000</span>
                    </div>
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>ロゴデザイン</span>
                      <span class="font-medium">¥5,000〜15,000</span>
                    </div>
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>背景・風景</span>
                      <span class="font-medium">¥8,000〜20,000</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">中級者向け価格帯</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Live2Dアバター</span>
                      <span class="font-medium">¥20,000〜50,000</span>
                    </div>
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>複数キャラ・複雑な構図</span>
                      <span class="font-medium">¥15,000〜35,000</span>
                    </div>
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>ブランディング一式</span>
                      <span class="font-medium">¥30,000〜80,000</span>
                    </div>
                    <div class="flex justify-between p-2 bg-gray-50 rounded">
                      <span>動画・アニメーション</span>
                      <span class="font-medium">¥25,000〜100,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Commission Structure -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">手数料体系</h3>
              <div class="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-pink-600 mb-2">9.8%</div>
                    <div class="text-sm text-gray-600">新人クリエイター</div>
                    <div class="text-xs text-gray-500">実績0〜10件</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">7.8%</div>
                    <div class="text-sm text-gray-600">レギュラークリエイター</div>
                    <div class="text-xs text-gray-500">実績11〜50件</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">6.0%</div>
                    <div class="text-sm text-gray-600">プロクリエイター</div>
                    <div class="text-xs text-gray-500">実績51件以上</div>
                  </div>
                </div>
                <div class="text-center mt-4 text-sm text-gray-600">
                  ※ 月間売上やレビュー評価により追加優遇あり
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">報酬の支払いについて</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">支払いサイクル</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 月末締め、翌月15日払い</li>
                    <li>• 最低振込金額：1,000円</li>
                    <li>• 振込手数料：当社負担</li>
                    <li>• 対応金融機関：全国の銀行・信用金庫</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">税務について</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 年間20万円以上は確定申告が必要</li>
                    <li>• 支払調書の発行対応</li>
                    <li>• インボイス制度対応</li>
                    <li>• 詳細は税務署または税理士にご相談</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Work Process -->
      <section :id="`section-5`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:workflow" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">制作フローとマナー</h2>
          </div>

          <div class="space-y-8">
            <!-- Work Flow -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">基本的な制作フロー</h3>
              <div class="space-y-4">
                <div 
                  v-for="(flow, index) in workFlow"
                  :key="index"
                  class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div :class="`w-8 h-8 ${flow.color} text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-900">{{ flow.title }}</h4>
                      <span class="text-xs text-gray-500 bg-white px-2 py-1 rounded">{{ flow.duration }}</span>
                    </div>
                    <p class="text-gray-600 text-sm">{{ flow.description }}</p>
                    <div v-if="flow.tips" class="mt-2">
                      <div class="text-xs text-blue-600 font-medium mb-1">💡 ポイント</div>
                      <p class="text-xs text-blue-700 bg-blue-50 p-2 rounded">{{ flow.tips }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Communication Guidelines -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">コミュニケーションのマナー</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-green-900 mb-3 flex items-center">
                    <Icon name="lucide:check-circle" class="w-5 h-5 mr-2 text-green-600" />
                    良いコミュニケーション
                  </h4>
                  <ul class="text-green-800 text-sm space-y-2">
                    <li>• 24時間以内の返信を心がける</li>
                    <li>• 丁寧で分かりやすい言葉遣い</li>
                    <li>• 進捗の定期的な報告</li>
                    <li>• 疑問点は積極的に質問する</li>
                    <li>• 感謝の気持ちを忘れずに</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-red-900 mb-3 flex items-center">
                    <Icon name="lucide:x-circle" class="w-5 h-5 mr-2 text-red-600" />
                    避けるべき行動
                  </h4>
                  <ul class="text-red-800 text-sm space-y-2">
                    <li>• 長期間の無連絡・音信不通</li>
                    <li>• 一方的な仕様変更の要求</li>
                    <li>• 感情的な発言や態度</li>
                    <li>• 個人情報の不適切な取り扱い</li>
                    <li>• プラットフォーム外での直接取引</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Quality Standards -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">品質基準とガイドライン</h3>
              <div class="space-y-4">
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-2">📐 技術的品質</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 適切な解像度・ファイル形式での納品</li>
                    <li>• レイヤー分けされたPSDファイル（イラストの場合）</li>
                    <li>• 背景透過PNG、JPEG等の用途別ファイル</li>
                    <li>• 印刷対応の場合はCMYK・高解像度対応</li>
                  </ul>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-2">🎨 表現的品質</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• クライアントの要望を適切に理解・反映</li>
                    <li>• 統一感のあるタッチ・色使い</li>
                    <li>• 商用利用に耐える完成度</li>
                    <li>• オリジナリティと創作性の両立</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 6: Copyright & Legal -->
      <section :id="`section-6`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:copyright" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">著作権と法的事項</h2>
          </div>

          <div class="space-y-8">
            <!-- Copyright Ownership -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">著作権の帰属</h3>
              <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div class="flex items-start space-x-3 mb-4">
                  <Icon name="lucide:info" class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 class="font-semibold text-blue-900 mb-2">基本原則</h4>
                    <p class="text-blue-800 text-sm leading-relaxed">
                      Requi レキで制作された作品の著作権は、原則として<strong>クリエイター</strong>に帰属します。
                      クライアントは、合意された範囲での<strong>利用権</strong>を取得することになります。
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-medium text-blue-900 mb-2">クリエイターの権利</h5>
                    <ul class="text-blue-800 text-sm space-y-1">
                      <li>• 作品の著作権保持</li>
                      <li>• ポートフォリオでの使用</li>
                      <li>• SNSでの公開・宣伝</li>
                      <li>• 同人誌・グッズ等での二次利用</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-medium text-blue-900 mb-2">クライアントの権利</h5>
                    <ul class="text-blue-800 text-sm space-y-1">
                      <li>• 依頼目的での使用権</li>
                      <li>• SNSでの投稿・シェア</li>
                      <li>• 個人利用範囲での複製・配布</li>
                      <li>• 商用利用（事前合意が必要）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Commercial Use -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">商用利用について</h3>
              <div class="space-y-4">
                <div class="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                  <h4 class="font-semibold text-orange-900 mb-2">⚠️ 重要な注意事項</h4>
                  <p class="text-orange-800 text-sm leading-relaxed">
                    商用利用を希望する場合は、<strong>必ずリクエスト時に明記</strong>してください。
                    後からの商用利用申請は、追加料金や再交渉が必要になる場合があります。
                  </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-green-900 mb-2">商用利用の例</h4>
                    <ul class="text-green-800 text-sm space-y-1">
                      <li>• 企業ロゴ・キャラクター</li>
                      <li>• 商品パッケージ・広告</li>
                      <li>• 書籍・雑誌の挿絵</li>
                      <li>• ウェブサイト・アプリのUI</li>
                      <li>• グッズ・商品への印刷</li>
                    </ul>
                  </div>
                  <div class="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-900 mb-2">個人利用の例</h4>
                    <ul class="text-blue-800 text-sm space-y-1">
                      <li>• SNSアイコン・ヘッダー</li>
                      <li>• 個人ブログの装飾</li>
                      <li>• 趣味の創作活動</li>
                      <li>• 家族・友人への贈り物</li>
                      <li>• 壁紙・待ち受け画像</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Legal Compliance -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">法的コンプライアンス</h3>
              <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-2">🛡️ 知的財産権の尊重</h4>
                  <ul class="text-gray-700 text-sm space-y-1">
                    <li>• 他者の著作物の無断使用は厳禁</li>
                    <li>• トレース・模倣は適切な範囲内に留める</li>
                    <li>• 商標権・意匠権にも注意する</li>
                    <li>• AI生成素材の使用は事前申告</li>
                  </ul>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-2">📋 契約・取引の透明性</h4>
                  <ul class="text-gray-700 text-sm space-y-1">
                    <li>• 制作条件は明文化して共有</li>
                    <li>• 追加料金は事前に相談・合意</li>
                    <li>• 納期変更は早めに連絡</li>
                    <li>• トラブル時は運営に相談</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 7: Success Tips -->
      <section :id="`section-7`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:star" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">成功のためのTips</h2>
          </div>

          <div class="space-y-8">
            <!-- Profile Optimization -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">プロフィール最適化</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">✨ 魅力的なプロフィール</h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li>• 親しみやすいプロフィール画像</li>
                    <li>• 得意分野を明確に記載</li>
                    <li>• 制作への想いやこだわり</li>
                    <li>• 過去の実績・経歴の紹介</li>
                    <li>• レスポンス時間の明記</li>
                    <li>• SNSリンクでファンを増やす</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">🎨 ポートフォリオのコツ</h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li>• 多様なジャンル・タッチを含める</li>
                    <li>• 最新作品を定期的に追加</li>
                    <li>• 制作プロセスも公開する</li>
                    <li>• before/after比較を含める</li>
                    <li>• キャッチーなタイトル付け</li>
                    <li>• 高解像度での美しい表示</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Customer Service -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">リピーター獲得戦略</h3>
              <div class="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:heart" class="w-6 h-6 text-white" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">感動体験の提供</h4>
                    <p class="text-gray-600 text-sm">期待を上回る品質とサービスでファンを作る</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:users" class="w-6 h-6 text-white" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">コミュニティ形成</h4>
                    <p class="text-gray-600 text-sm">SNSでファンとの交流を深めて関係性を構築</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:repeat" class="w-6 h-6 text-white" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">継続的な成長</h4>
                    <p class="text-gray-600 text-sm">技術向上とトレンド把握でブランド価値を高める</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Common Mistakes -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">よくある失敗と対策</h3>
              <div class="space-y-4">
                <div 
                  v-for="mistake in commonMistakes"
                  :key="mistake.problem"
                  class="border border-red-200 bg-red-50 p-4 rounded-lg"
                >
                  <div class="flex items-start space-x-3">
                    <Icon name="lucide:alert-triangle" class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div class="flex-1">
                      <h4 class="font-semibold text-red-900 mb-1">{{ mistake.problem }}</h4>
                      <p class="text-red-800 text-sm mb-2">{{ mistake.description }}</p>
                      <div class="bg-green-50 border border-green-200 p-3 rounded">
                        <h5 class="font-medium text-green-900 text-sm mb-1">💡 解決策</h5>
                        <p class="text-green-800 text-sm">{{ mistake.solution }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 8: Support & Resources -->
      <section :id="`section-8`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:help-circle" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">サポート・リソース</h2>
          </div>

          <div class="space-y-8">
            <!-- Support Channels -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">サポート窓口</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="lucide:message-circle" class="w-6 h-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-blue-900 mb-2">チャットサポート</h4>
                  <p class="text-blue-800 text-sm mb-4">平日 10:00-18:00<br>リアルタイムでお答えします</p>
                  <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                    チャットを開始
                  </button>
                </div>
                <div class="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="lucide:mail" class="w-6 h-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-green-900 mb-2">メールサポート</h4>
                  <p class="text-green-800 text-sm mb-4">24時間受付<br>24時間以内に返信</p>
                  <a 
                    href="mailto:creator-support@requi.com"
                    class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    メールを送信
                  </a>
                </div>
                <div class="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="lucide:book-open" class="w-6 h-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-purple-900 mb-2">FAQ・ヘルプ</h4>
                  <p class="text-purple-800 text-sm mb-4">よくある質問と<br>詳しい使い方ガイド</p>
                  <NuxtLink 
                    to="/faq"
                    class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    FAQを見る
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Educational Resources -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">学習リソース</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-6">
                  <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                    <Icon name="lucide:graduation-cap" class="w-5 h-5 mr-2 text-pink-500" />
                    クリエイター向けウェビナー
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-1 mb-4">
                    <li>• 料金設定戦略セミナー（月1回）</li>
                    <li>• 最新トレンド解説（隔週）</li>
                    <li>• 成功クリエイター対談（月1回）</li>
                    <li>• 技術向上ワークショップ</li>
                  </ul>
                  <a href="#" class="text-pink-600 hover:text-pink-700 text-sm font-medium">
                    開催予定を見る →
                  </a>
                </div>
                <div class="border border-gray-200 rounded-lg p-6">
                  <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                    <Icon name="lucide:users" class="w-5 h-5 mr-2 text-purple-500" />
                    コミュニティ・交流
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-1 mb-4">
                    <li>• Discord クリエイターサーバー</li>
                    <li>• 定期オフラインミートアップ</li>
                    <li>• スキル共有・相互添削</li>
                    <li>• 新人クリエイター交流会</li>
                  </ul>
                  <a href="#" class="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    コミュニティに参加 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-8">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">
          あなたも今日から<br>
          <span class="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Requi レキ クリエイター
          </span>
        </h3>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          シンプルなシステムで、あなたの才能を多くの人に届けませんか？<br>
          登録は無料、審査も最短1営業日で完了します。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/creator-register"
            class="inline-flex items-center bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            <Icon name="lucide:sparkles" class="w-5 h-5 mr-2" />
            無料でクリエイター登録
          </NuxtLink>
          <NuxtLink 
            to="/creators"
            class="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all font-bold text-lg"
          >
            <Icon name="lucide:eye" class="w-5 h-5 mr-2" />
            活躍中のクリエイターを見る
          </NuxtLink>
        </div>
      </section>
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
  { name: 'クリエイターガイドライン' }
])

// スクロール関連
const showScrollTop = ref(false)

// 目次データ
const tableOfContents = ref([
  {
    title: 'はじめに',
    description: 'Requi レキの特徴と対象者',
    icon: 'lucide:play-circle',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-500'
  },
  {
    title: '登録・審査プロセス',
    description: '申請から承認までの流れ',
    icon: 'lucide:user-plus',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500'
  },
  {
    title: 'コンテンツガイドライン',
    description: '制作可能・禁止コンテンツ',
    icon: 'lucide:shield-check',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500'
  },
  {
    title: '料金設定と収益化',
    description: '価格戦略と手数料体系',
    icon: 'lucide:trending-up',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-500'
  },
  {
    title: '制作フローとマナー',
    description: '作業の進め方とコミュニケーション',
    icon: 'lucide:workflow',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-500'
  },
  {
    title: '著作権と法的事項',
    description: '知的財産権と契約について',
    icon: 'lucide:copyright',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-500'
  },
  {
    title: '成功のためのTips',
    description: 'プロフィール最適化と戦略',
    icon: 'lucide:star',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500'
  },
  {
    title: 'サポート・リソース',
    description: 'サポート窓口と学習資料',
    icon: 'lucide:help-circle',
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-500'
  }
])

// 登録ステップ
const registrationSteps = ref([
  {
    title: 'アカウント作成',
    description: 'メールアドレスとパスワードでアカウントを作成',
    details: ['Google・Twitter認証も利用可能', 'メール認証が必要']
  },
  {
    title: 'プロフィール設定',
    description: '活動名、自己紹介、プロフィール画像を設定',
    details: ['親しみやすい名前とプロフィール', 'SNSリンクも追加可能']
  },
  {
    title: 'ポートフォリオ投稿',
    description: '代表作品を3〜10点アップロード',
    details: ['多様なジャンル・タッチを含める', '高解像度での投稿を推奨']
  },
  {
    title: '料金・条件設定',
    description: '価格帯、納期、制作可能内容を設定',
    details: ['市場相場を参考に適切な価格設定', '得意分野を明確に記載']
  },
  {
    title: '審査・承認',
    description: '運営による審査（最短1営業日）',
    details: ['作品クオリティとガイドライン遵守を確認', '必要に応じて修正依頼']
  },
  {
    title: '活動開始',
    description: 'クリエイターとして活動スタート',
    details: ['リクエストの受注開始', 'プロフィールの継続的な改善']
  }
])

// 制作可能コンテンツ
const acceptableContent = ref([
  {
    name: 'イラスト・絵画',
    icon: 'lucide:brush',
    items: ['キャラクターイラスト', 'ポートレート', '風景画', 'アイコン・ヘッダー', '挿絵・カットイラスト']
  },
  {
    name: 'デザイン',
    icon: 'lucide:layout',
    items: ['ロゴデザイン', 'バナー・フライヤー', 'パッケージデザイン', 'UI/UXデザイン', 'ブランディング']
  },
  {
    name: 'Live2D・3D',
    icon: 'lucide:box',
    items: ['Live2Dアバター', 'VRMモデル', '3Dキャラクター', 'モーション制作', 'VTuber向け素材']
  },
  {
    name: 'ボイス・音響',
    icon: 'lucide:mic',
    items: ['ナレーション', 'ボイスドラマ', 'ASMR', 'BGM・効果音', '歌・ボーカル']
  },
  {
    name: '動画・映像',
    icon: 'lucide:video',
    items: ['アニメーション', 'MV・PV制作', '実写動画編集', 'モーショングラフィックス', 'CM・広告動画']
  },
  {
    name: 'その他クリエイティブ',
    icon: 'lucide:sparkles',
    items: ['小説・脚本', 'ゲーム企画', 'UI素材', 'LINEスタンプ', 'NFTアート']
  }
])

// 制作禁止コンテンツ
const prohibitedContent = ref([
  {
    category: '🔞 成人向け・不適切コンテンツ',
    items: [
      '未成年を対象とした性的コンテンツ',
      '極度に暴力的・グロテスクな表現',
      '実在の人物の性的・中傷的描写',
      '違法行為を助長・美化する内容'
    ]
  },
  {
    category: '⚖️ 法的問題のあるコンテンツ',
    items: [
      '著作権・商標権を明確に侵害する作品',
      '特定個人・団体への誹謗中傷',
      '違法薬物・危険物の製造方法',
      'ヘイトスピーチ・差別的表現'
    ]
  },
  {
    category: '🏛️ 政治・宗教・社会問題',
    items: [
      '特定政党・政治家の支援・批判',
      '特定宗教の布教・批判活動',
      '社会問題における極端な主張',
      '選挙活動・政治的プロパガンダ'
    ]
  },
  {
    category: '💰 商業的制限',
    items: [
      '他社商品・サービスの模倣品',
      'MLM・ネズミ講の勧誘材料',
      '金融商品・投資の勧誘',
      '医療効果を謳う商品広告'
    ]
  }
])

// 制作フロー
const workFlow = ref([
  {
    title: 'リクエスト受信・検討',
    duration: '12時間以内',
    color: 'bg-blue-500',
    description: 'クライアントからのリクエストを確認し、制作可能かを判断します。',
    tips: '不明な点は遠慮なく質問しましょう。後のトラブルを避けられます。'
  },
  {
    title: '承諾・制作開始連絡',
    duration: '24時間以内',
    color: 'bg-green-500',
    description: 'リクエストを承諾し、制作開始とスケジュールをお知らせします。',
    tips: '納期に余裕を持ったスケジュールを組み、品質重視で取り組みましょう。'
  },
  {
    title: 'ラフ・プロット作成',
    duration: '制作期間の30%',
    color: 'bg-yellow-500',
    description: '作品の構図や方向性を決めるラフを作成し、確認を取ります。',
    tips: 'この段階での認識すり合わせが最も重要です。丁寧に確認しましょう。'
  },
  {
    title: '本制作・進捗共有',
    duration: '制作期間の60%',
    color: 'bg-orange-500',
    description: '本格的な制作に入ります。必要に応じて進捗を共有します。',
    tips: '大きな変更が必要な場合は早めに相談。クライアントとの信頼関係が大切です。'
  },
  {
    title: '完成・納品',
    duration: '制作期間の10%',
    color: 'bg-purple-500',
    description: '作品を完成させ、指定の形式で納品します。',
    tips: '仕上げの確認を怠らず、最高のクオリティでお渡ししましょう。'
  },
  {
    title: 'フィードバック・評価',
    duration: '納品後',
    color: 'bg-pink-500',
    description: 'クライアントから評価・レビューをいただき、取引完了です。',
    tips: '感謝の気持ちを込めたメッセージで、良好な関係を築きましょう。'
  }
])

// よくある失敗と対策
const commonMistakes = ref([
  {
    problem: '価格設定が安すぎる',
    description: '技術力に見合わない低価格設定により、労働対価が見合わなくなってしまう',
    solution: '市場相場を調査し、制作時間と技術力を考慮した適正価格を設定する。安売りは業界全体にも悪影響。'
  },
  {
    problem: 'コミュニケーション不足',
    description: '連絡頻度が少なく、クライアントが不安に感じて関係が悪化してしまう',
    solution: '定期的な進捗報告と、24時間以内の返信を心がける。透明性のあるコミュニケーションを維持。'
  },
  {
    problem: '著作権への認識不足',
    description: '二次創作の範囲や商用利用の条件を曖昧にしたまま制作を進めてしまう',
    solution: 'リクエスト受諾前に利用範囲を明確化。商用利用は必ず事前確認し、適切な料金設定を行う。'
  },
  {
    problem: 'スケジュール管理の甘さ',
    description: '複数案件を同時進行し、納期遅れやクオリティ低下を招いてしまう',
    solution: '自分のキャパシティを正確に把握し、余裕を持ったスケジュールを組む。品質第一で取り組む。'
  }
])

// メソッド
const scrollToSection = (sectionNumber) => {
  const element = document.getElementById(`section-${sectionNumber}`)
  if (element) {
    const offset = 100
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

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>