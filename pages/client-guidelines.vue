<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="クライアントガイドライン - Requi レキ"
      description="Requi レキで作品を依頼する方法とガイドライン。リクエストの流れから料金体系、注意事項まで詳しく解説します。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          クライアント<br>
          <span class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            ガイドライン
          </span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキで理想の作品を依頼しましょう。<br>
          シンプルなシステムで、素敵なクリエイターに出会えます。
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <NuxtLink
            to="/creators"
            class="inline-flex items-center bg-gradient-to-r from-blue-400 to-purple-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            <Icon name="lucide:search" class="w-5 h-5 mr-2" />
            クリエイターを探す
          </NuxtLink>
          <NuxtLink
            to="/requestmethod"
            class="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-400 hover:text-blue-500 transition-all font-bold text-lg"
          >
            <Icon name="lucide:book-open" class="w-5 h-5 mr-2" />
            依頼方法を学ぶ
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-blue-600">手数料</div>
            <div class="text-gray-900">6%〜</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-blue-600">決済</div>
            <div class="text-gray-900">エスクロー保護</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-blue-600">納期</div>
            <div class="text-gray-900">平均7日</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-blue-600">修正</div>
            <div class="text-gray-900">1回まで対応</div>
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
            class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
          >
            <div :class="`w-8 h-8 ${section.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`">
              <Icon :name="section.icon" :class="`w-4 h-4 ${section.iconColor}`" />
            </div>
            <div>
              <div class="font-medium text-gray-900 group-hover:text-blue-600">{{ section.title }}</div>
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
            <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:play-circle" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">はじめに</h2>
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Requi レキでの依頼とは</h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                Requi レキは「気軽に」「簡単に」クリエイターに作品制作を依頼できるプラットフォームです。複雑な見積もり交渉や長時間の打ち合わせは不要。明確な料金とシンプルなやり取りで、理想の作品を手に入れることができます。
              </p>
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 class="font-semibold text-blue-900 mb-2">Requi レキの3つの特徴</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="text-center">
                    <Icon name="lucide:zap" class="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div class="font-medium text-blue-900">シンプル</div>
                    <div class="text-xs text-blue-700">複雑な交渉なし</div>
                  </div>
                  <div class="text-center">
                    <Icon name="lucide:shield-check" class="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div class="font-medium text-blue-900">安全</div>
                    <div class="text-xs text-blue-700">エスクロー決済</div>
                  </div>
                  <div class="text-center">
                    <Icon name="lucide:heart" class="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div class="font-medium text-blue-900">楽しい</div>
                    <div class="text-xs text-blue-700">クリエイターとの交流</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">どんな方におすすめ？</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
                    <Icon name="lucide:user" class="w-5 h-5 mr-2 text-blue-500" />
                    個人の方
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• SNSアイコン・ヘッダーが欲しい</li>
                    <li>• オリジナルキャラクターを描いてもらいたい</li>
                    <li>• 趣味の創作活動に使いたい</li>
                    <li>• プレゼント用の作品を依頼したい</li>
                  </ul>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
                    <Icon name="lucide:briefcase" class="w-5 h-5 mr-2 text-purple-500" />
                    事業者の方
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 企業ロゴ・ブランディング素材</li>
                    <li>• ウェブサイト用イラスト・素材</li>
                    <li>• 商品パッケージデザイン</li>
                    <li>• 動画・広告用コンテンツ</li>
                  </ul>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
                    <Icon name="lucide:gamepad-2" class="w-5 h-5 mr-2 text-green-500" />
                    クリエイターの方
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 同人活動用イラスト・素材</li>
                    <li>• ゲーム・アプリのアセット</li>
                    <li>• 配信用オーバーレイ・素材</li>
                    <li>• VTuber用アバター・グッズ</li>
                  </ul>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
                    <Icon name="lucide:heart" class="w-5 h-5 mr-2 text-pink-500" />
                    初めての方
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 依頼の仕方がわからない</li>
                    <li>• 予算感を知りたい</li>
                    <li>• 気軽に試してみたい</li>
                    <li>• どんな作品ができるか見たい</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: How to Request -->
      <section :id="`section-2`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:send" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">リクエストの流れ</h2>
          </div>

          <div class="space-y-8">
            <!-- Request Steps -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">3ステップで完了</h3>
              <div class="space-y-6">
                <div 
                  v-for="(step, index) in requestSteps"
                  :key="index"
                  class="flex items-start space-x-4"
                >
                  <div :class="`w-12 h-12 ${step.gradient} rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0`">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ step.title }}</h4>
                    <p class="text-gray-600 mb-3">{{ step.description }}</p>
                    <div v-if="step.tips" class="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <div class="flex items-start space-x-2">
                        <Icon name="lucide:lightbulb" class="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div class="text-yellow-800 text-sm">
                          <strong>コツ：</strong> {{ step.tips }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- What to Include in Request -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">リクエストに含めるべき情報</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-green-900 mb-3 flex items-center">
                    <Icon name="lucide:check-circle" class="w-5 h-5 mr-2 text-green-600" />
                    必須情報
                  </h4>
                  <ul class="text-green-800 text-sm space-y-2 bg-green-50 p-4 rounded-lg">
                    <li>• <strong>作品の種類</strong>（イラスト、ロゴ、動画など）</li>
                    <li>• <strong>サイズ・仕様</strong>（解像度、ファイル形式など）</li>
                    <li>• <strong>用途</strong>（SNS用、商用、個人利用など）</li>
                    <li>• <strong>キャラクター・内容</strong>の詳細説明</li>
                    <li>• <strong>希望納期</strong>（余裕を持って設定）</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-blue-900 mb-3 flex items-center">
                    <Icon name="lucide:plus-circle" class="w-5 h-5 mr-2 text-blue-600" />
                    あると良い情報
                  </h4>
                  <ul class="text-blue-800 text-sm space-y-2 bg-blue-50 p-4 rounded-lg">
                    <li>• <strong>参考画像</strong>（イメージに近い作品）</li>
                    <li>• <strong>色の希望</strong>（好みの色合い・雰囲気）</li>
                    <li>• <strong>NG要素</strong>（避けてほしい表現）</li>
                    <li>• <strong>特別なこだわり</strong>があれば</li>
                    <li>• <strong>追加オプション</strong>の希望</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Good Request Examples -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">良いリクエスト例</h3>
              <div class="space-y-4">
                <div 
                  v-for="example in goodRequestExamples"
                  :key="example.type"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <h4 class="font-semibold text-gray-900 mb-2">{{ example.type }}</h4>
                  <div class="bg-gray-50 p-3 rounded text-sm text-gray-700 leading-relaxed">
                    "{{ example.text }}"
                  </div>
                  <div class="mt-2 text-xs text-green-600">
                    <Icon name="lucide:check" class="w-3 h-3 inline mr-1" />
                    {{ example.reason }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Pricing & Payment -->
      <section :id="`section-3`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:credit-card" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">料金と決済</h2>
          </div>

          <div class="space-y-8">
            <!-- Price Examples -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">料金の目安</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">個人向け作品</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">SNSアイコン</span>
                      <span class="font-medium text-purple-600">¥1,000〜5,000</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">キャラクターイラスト</span>
                      <span class="font-medium text-purple-600">¥3,000〜15,000</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">VTuberアバター</span>
                      <span class="font-medium text-purple-600">¥10,000〜50,000</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">動画制作</span>
                      <span class="font-medium text-purple-600">¥15,000〜100,000</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">商用・事業向け作品</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">ロゴデザイン</span>
                      <span class="font-medium text-purple-600">¥10,000〜80,000</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">ウェブデザイン</span>
                      <span class="font-medium text-purple-600">¥20,000〜150,000</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">パッケージデザイン</span>
                      <span class="font-medium text-purple-600">¥25,000〜200,000</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="text-sm text-gray-700">広告動画制作</span>
                      <span class="font-medium text-purple-600">¥50,000〜500,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 text-sm text-gray-500 text-center">
                ※ 価格は作品の複雑さ、クリエイターのレベルにより変動します
              </div>
            </div>

            <!-- Fee Structure -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">手数料について</h3>
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <div class="text-center mb-4">
                  <div class="text-3xl font-bold text-blue-600 mb-2">6%〜9.8%</div>
                  <div class="text-gray-700">作品代金に手数料が加算されます</div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div class="font-semibold text-blue-900">〜¥10,000</div>
                    <div class="text-sm text-blue-700">手数料 9.8%</div>
                  </div>
                  <div>
                    <div class="font-semibold text-blue-900">¥10,001〜¥50,000</div>
                    <div class="text-sm text-blue-700">手数料 7.8%</div>
                  </div>
                  <div>
                    <div class="font-semibold text-blue-900">¥50,001〜</div>
                    <div class="text-sm text-blue-700">手数料 6.0%</div>
                  </div>
                </div>
                <div class="text-center mt-4 text-sm text-blue-600">
                  例：¥10,000の作品の場合、お支払い総額は¥10,980
                </div>
              </div>
            </div>

            <!-- Payment Methods -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">決済方法</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">利用可能な決済方法</h4>
                  <ul class="space-y-2">
                    <li class="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                      <Icon name="lucide:credit-card" class="w-5 h-5 text-blue-500" />
                      <span class="text-gray-700">クレジットカード</span>
                    </li>
                    <li class="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                      <Icon name="lucide:smartphone" class="w-5 h-5 text-green-500" />
                      <span class="text-gray-700">PayPay・LINE Pay</span>
                    </li>
                    <li class="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                      <Icon name="lucide:building-2" class="w-5 h-5 text-purple-500" />
                      <span class="text-gray-700">銀行振込</span>
                    </li>
                    <li class="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                      <Icon name="lucide:store" class="w-5 h-5 text-orange-500" />
                      <span class="text-gray-700">コンビニ決済</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">安全なエスクロー決済</h4>
                  <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div class="space-y-3">
                      <div class="flex items-start space-x-3">
                        <Icon name="lucide:shield" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div class="font-medium text-green-900">作品完成まで代金を保護</div>
                          <div class="text-sm text-green-700">作品が納品されるまで、代金は安全に保管されます</div>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <Icon name="lucide:check-circle" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div class="font-medium text-green-900">納品確認後に自動決済</div>
                          <div class="text-sm text-green-700">作品に問題がないことを確認後、クリエイターにお支払い</div>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <Icon name="lucide:rotate-ccw" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div class="font-medium text-green-900">万が一の場合は全額返金</div>
                          <div class="text-sm text-green-700">作品が納品されない場合は返金保証</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Rules & Guidelines -->
      <section :id="`section-4`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:book" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">ルールとマナー</h2>
          </div>

          <div class="space-y-8">
            <!-- What You Can Request -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">依頼可能なコンテンツ</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                  v-for="category in allowedContent"
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

            <!-- What You Cannot Request -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">依頼禁止コンテンツ</h3>
              <div class="bg-red-50 p-6 rounded-lg border border-red-200">
                <div class="space-y-4">
                  <div 
                    v-for="prohibition in prohibitedContent"
                    :key="prohibition.category"
                  >
                    <h4 class="font-semibold text-red-900 mb-2 flex items-center">
                      <Icon name="lucide:x-circle" class="w-4 h-4 mr-2" />
                      {{ prohibition.category }}
                    </h4>
                    <ul class="text-red-800 text-sm space-y-1 ml-6">
                      <li v-for="item in prohibition.items" :key="item">• {{ item }}</li>
                    </ul>
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
                    <Icon name="lucide:thumbs-up" class="w-5 h-5 mr-2 text-green-600" />
                    良いコミュニケーション
                  </h4>
                  <ul class="text-green-800 text-sm space-y-2 bg-green-50 p-4 rounded-lg">
                    <li>• 丁寧で分かりやすい言葉遣い</li>
                    <li>• 具体的で詳細な依頼内容の説明</li>
                    <li>• クリエイターの質問に対する迅速な返答</li>
                    <li>• 感謝の気持ちを忘れずに</li>
                    <li>• 完成した作品への建設的なフィードバック</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-red-900 mb-3 flex items-center">
                    <Icon name="lucide:thumbs-down" class="w-5 h-5 mr-2 text-red-600" />
                    避けるべき行動
                  </h4>
                  <ul class="text-red-800 text-sm space-y-2 bg-red-50 p-4 rounded-lg">
                    <li>• 横柄・失礼な態度や言葉遣い</li>
                    <li>• 曖昧で不明確な依頼内容</li>
                    <li>• 一方的な仕様変更や追加要求</li>
                    <li>• 不当に安い価格での依頼</li>
                    <li>• 完成後の理不尽なクレーム</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Copyright and Usage Rights -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">著作権と利用範囲</h3>
              <div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 class="font-semibold text-blue-900 mb-2">基本原則</h4>
                  <p class="text-blue-800 text-sm leading-relaxed">
                    作品の著作権はクリエイターに帰属します。あなたが取得するのは「利用権」です。
                    商用利用を希望する場合は、必ずリクエスト時にその旨をお伝えください。
                  </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium text-gray-900 mb-2">✅ 基本的な利用範囲</h4>
                    <ul class="text-gray-600 text-sm space-y-1">
                      <li>• 個人のSNSでの使用</li>
                      <li>• 趣味・創作活動での利用</li>
                      <li>• 家族・友人との共有</li>
                      <li>• 壁紙・待ち受けとしての利用</li>
                    </ul>
                  </div>
                  <div class="border border-orange-200 bg-orange-50 rounded-lg p-4">
                    <h4 class="font-medium text-orange-900 mb-2">⚠️ 事前相談が必要</h4>
                    <ul class="text-orange-800 text-sm space-y-1">
                      <li>• 商用利用・販売目的での使用</li>
                      <li>• グッズ・商品への印刷</li>
                      <li>• 企業・団体での利用</li>
                      <li>• 二次配布・再販売</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Tips for Success -->
      <section :id="`section-5`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:star" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">成功する依頼のコツ</h2>
          </div>

          <div class="space-y-8">
            <!-- Finding the Right Creator -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">理想のクリエイターを見つける方法</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">🔍 クリエイター選びのポイント</h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:palette" class="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span><strong>作風の一致：</strong>過去作品を確認し、理想に近いタッチか</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:star" class="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span><strong>評価・レビュー：</strong>過去の依頼者からの評価をチェック</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:clock" class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span><strong>レスポンス速度：</strong>返信の早さと丁寧さを確認</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:calendar" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>納期：</strong>希望納期に対応可能かチェック</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">💡 効果的な検索方法</h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:search" class="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span><strong>キーワード検索：</strong>「VTuber」「ロゴ」などで絞り込み</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:filter" class="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span><strong>カテゴリー分け：</strong>イラスト・デザイン等で分類</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:trending-up" class="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span><strong>人気順・新着順：</strong>ソート機能を活用</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="lucide:heart" class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>お気に入り機能：</strong>気になるクリエイターを保存</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Budget Planning -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">予算の考え方</h3>
              <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:coins" class="w-6 h-6 text-white" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">適正価格での依頼</h4>
                    <p class="text-gray-600 text-sm">クリエイターの技術力に見合った適正価格での依頼が、良い作品につながります</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:target" class="w-6 h-6 text-white" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">品質重視の選択</h4>
                    <p class="text-gray-600 text-sm">価格だけでなく、ポートフォリオや実績を総合的に判断しましょう</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="lucide:repeat" class="w-6 h-6 text-white" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">長期的な関係</h4>
                    <p class="text-gray-600 text-sm">お気に入りのクリエイターと継続的な関係を築くことで、より良い作品を</p>
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
                  class="border border-orange-200 bg-orange-50 p-4 rounded-lg"
                >
                  <div class="flex items-start space-x-3">
                    <Icon name="lucide:alert-triangle" class="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div class="flex-1">
                      <h4 class="font-semibold text-orange-900 mb-1">{{ mistake.problem }}</h4>
                      <p class="text-orange-800 text-sm mb-2">{{ mistake.description }}</p>
                      <div class="bg-blue-50 border border-blue-200 p-3 rounded">
                        <h5 class="font-medium text-blue-900 text-sm mb-1">💡 対策</h5>
                        <p class="text-blue-800 text-sm">{{ mistake.solution }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 6: Support & FAQ -->
      <section :id="`section-6`" class="mb-16">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center mr-4">
              <Icon name="lucide:help-circle" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">よくある質問とサポート</h2>
          </div>

          <div class="space-y-8">
            <!-- FAQ -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">よくある質問</h3>
              <div class="space-y-4">
                <div 
                  v-for="(faq, index) in clientFAQ"
                  :key="index"
                  class="border border-gray-200 rounded-lg overflow-hidden"
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
            </div>

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
                    href="mailto:support@requi.com"
                    class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    メールを送信
                  </a>
                </div>
                <div class="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="lucide:phone" class="w-6 h-6 text-white" />
                  </div>
                  <h4 class="font-semibold text-purple-900 mb-2">電話サポート</h4>
                  <p class="text-purple-800 text-sm mb-4">平日 10:00-17:00<br>緊急時のお困りごと</p>
                  <a 
                    href="tel:03-1234-5678"
                    class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    03-1234-5678
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">
          理想の作品を<br>
          <span class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            依頼してみませんか？
          </span>
        </h3>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキなら、シンプルで安全に素敵なクリエイターに作品制作を依頼できます。<br>
          まずは気になるクリエイターを探してみましょう。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/creators"
            class="inline-flex items-center bg-gradient-to-r from-blue-400 to-purple-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            <Icon name="lucide:search" class="w-5 h-5 mr-2" />
            クリエイターを探す
          </NuxtLink>
          <NuxtLink 
            to="/works"
            class="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-400 hover:text-blue-500 transition-all font-bold text-lg"
          >
            <Icon name="lucide:eye" class="w-5 h-5 mr-2" />
            作品一覧を見る
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
        class="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
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
  { name: 'クライアントガイドライン' }
])

// スクロール関連
const showScrollTop = ref(false)
const openFaq = ref(null)

// 目次データ
const tableOfContents = ref([
  {
    title: 'はじめに',
    description: 'Requi レキでの依頼について',
    icon: 'lucide:play-circle',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500'
  },
  {
    title: 'リクエストの流れ',
    description: '3ステップでの依頼方法',
    icon: 'lucide:send',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500'
  },
  {
    title: '料金と決済',
    description: '価格目安と決済システム',
    icon: 'lucide:credit-card',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-500'
  },
  {
    title: 'ルールとマナー',
    description: '依頼時の注意事項',
    icon: 'lucide:book',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-500'
  },
  {
    title: '成功する依頼のコツ',
    description: 'より良い作品を得るために',
    icon: 'lucide:star',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500'
  },
  {
    title: 'よくある質問とサポート',
    description: 'FAQ・お問い合わせ',
    icon: 'lucide:help-circle',
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-500'
  }
])

// リクエストステップ
const requestSteps = ref([
  {
    title: 'クリエイターを選ぶ',
    description: '作品一覧やクリエイター一覧から、あなたの理想に近い作風のクリエイターを見つけましょう。',
    gradient: 'bg-gradient-to-r from-blue-400 to-blue-500',
    tips: 'ポートフォリオをしっかり確認し、過去の評価やレビューも参考にしましょう。'
  },
  {
    title: 'リクエストを送信',
    description: '作品の詳細、用途、希望納期などを明確に記入してリクエストを送信します。',
    gradient: 'bg-gradient-to-r from-green-400 to-green-500',
    tips: '具体的で詳細な情報を提供するほど、理想に近い作品ができあがります。'
  },
  {
    title: '作品を受け取る',
    description: 'クリエイターが制作した作品を確認し、問題なければ取引完了です。',
    gradient: 'bg-gradient-to-r from-purple-400 to-purple-500',
    tips: '完成した作品への感謝の気持ちとレビューで、クリエイターとの良い関係を築きましょう。'
  }
])

// 良いリクエスト例
const goodRequestExamples = ref([
  {
    type: 'SNSアイコン依頼の例',
    text: 'Twitter用のアイコンをお願いします。猫の女の子のキャラクターで、明るく元気な印象にしたいです。色は暖色系（オレンジやピンク）を希望します。サイズは1024x1024px、PNG形式でお願いします。用途は個人のSNS利用のみです。',
    reason: '用途、サイズ、キャラクターの詳細、色の希望が具体的に記載されている'
  },
  {
    type: 'ロゴデザイン依頼の例',
    text: 'カフェのロゴデザインをお願いします。店名は「Cozy Corner」で、温かみのあるアットホームな雰囲気を表現したいです。色は茶色やベージュ系で、手書き風のフォントが希望です。商用利用予定で、看板やメニュー、ウェブサイトで使用します。',
    reason: '商用利用の明記、ブランドイメージ、使用用途が明確に伝わる'
  },
  {
    type: 'イラスト依頼の例',
    text: 'オリジナルキャラクターの全身イラストをお願いします。20代女性、ロングの黒髪、青い瞳、白いワンピース着用。背景は春の桜並木で、優しく微笑んでいる表情でお願いします。サイズはA4印刷対応、個人利用のみです。',
    reason: 'キャラクターの詳細設定、背景、表情、利用範囲が具体的'
  }
])

// 依頼可能コンテンツ
const allowedContent = ref([
  {
    name: 'イラスト・アート',
    icon: 'lucide:brush',
    items: ['キャラクターイラスト', 'ポートレート', 'ファンアート', '風景画', 'アイコン・ヘッダー']
  },
  {
    name: 'デザイン',
    icon: 'lucide:layout',
    items: ['ロゴデザイン', 'バナー・広告', 'パッケージデザイン', 'フライヤー・チラシ', 'ウェブデザイン']
  },
  {
    name: '3D・映像',
    icon: 'lucide:box',
    items: ['3Dモデル', 'VTuberアバター', 'アニメーション', '動画編集', 'モーショングラフィック']
  },
  {
    name: '音声・音楽',
    icon: 'lucide:mic',
    items: ['ナレーション', 'ボイスドラマ', 'BGM・効果音', '歌唱・ボーカル', 'ASMR']
  },
  {
    name: 'その他',
    icon: 'lucide:sparkles',
    items: ['小説・脚本', 'ゲーム企画', 'LINEスタンプ', 'UI素材', 'NFTアート']
  }
])

// 依頼禁止コンテンツ
const prohibitedContent = ref([
  {
    category: '🔞 成人向け・不適切コンテンツ',
    items: [
      '未成年を対象とした性的コンテンツ',
      '過度に暴力的・グロテスクな表現',
      '実在の人物の性的・中傷的描写',
      '公序良俗に反する内容'
    ]
  },
  {
    category: '⚖️ 法的問題のあるコンテンツ',
    items: [
      '他者の著作物の無断複製・模倣',
      '特定個人・団体への誹謗中傷',
      '商標権・肖像権を侵害する内容',
      'ヘイトスピーチや差別的表現'
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
      '他社の商品・サービスの模倣',
      'MLM・投資詐欺の勧誘素材',
      '医療効果を謳う誇大広告',
      '法律で規制されている商品の宣伝'
    ]
  }
])

// よくある失敗と対策
const commonMistakes = ref([
  {
    problem: '依頼内容が曖昧すぎる',
    description: '「可愛い女の子を描いて」など抽象的すぎる依頼で、イメージと違う作品になってしまう',
    solution: '髪型、服装、表情、色合いなど具体的な要素を詳しく説明する。参考画像があれば添付する。'
  },
  {
    problem: '予算が相場より低すぎる',
    description: '市場相場を大幅に下回る価格での依頼で、クリエイターに断られてしまう',
    solution: '他の作品の価格帯を参考にし、クリエイターの技術力に見合った適正価格を提示する。'
  },
  {
    problem: '商用利用を後出しで相談',
    description: '個人利用として依頼したのに、後から商用利用したいと相談してトラブルに',
    solution: '商用利用の可能性がある場合は、必ずリクエスト時に明記し、適切な料金で依頼する。'
  },
  {
    problem: 'コミュニケーション不足',
    description: 'クリエイターからの質問に答えず、制作が進まない・完成度が下がってしまう',
    solution: 'クリエイターからの質問には迅速かつ詳細に回答し、積極的にコミュニケーションを取る。'
  }
])

// クライアント向けFAQ
const clientFAQ = ref([
  {
    question: 'リクエストが承諾されない場合があるのはなぜですか？',
    answer: 'クリエイターのスケジュール、得意分野、制作内容などにより承諾されない場合があります。その場合は他のクリエイターに依頼するか、内容を調整してみてください。'
  },
  {
    question: '支払いはいつ行われますか？',
    answer: 'エスクローシステムにより、リクエスト承諾時に決済が実行されますが、作品が納品され内容確認後にクリエイターに支払われます。納品前に代金が失われることはありません。'
  },
  {
    question: '作品に修正をお願いできますか？',
    answer: 'リテイクは1回まで対応可能です。ただし、大幅な仕様変更は受け付けられません。最初のリクエスト時に詳細な要望をお伝えください。'
  },
  {
    question: '商用利用したい場合はどうすればいいですか？',
    answer: 'リクエスト送信時に必ず商用利用の旨をお伝えください。個人利用よりも料金が高くなる場合がありますが、事後の商用利用は原則として対応できません。'
  },
  {
    question: 'クリエイターと直接やり取りしたいのですが...',
    answer: 'プラットフォーム外での直接取引は規約違反となります。安全な取引のため、必ずRequi レキ内でのやり取りをお願いします。'
  },
  {
    question: '作品が納品されない場合はどうなりますか？',
    answer: 'エスクローシステムにより、作品が納品されない場合は全額返金いたします。また、運営がトラブル解決をサポートします。'
  },
  {
    question: '作品のデータ形式は指定できますか？',
    answer: 'はい、リクエスト時にPNG、JPEG、PSDなど希望のデータ形式を指定してください。印刷用途の場合は高解像度での納品も可能です。'
  },
  {
    question: '複数のクリエイターに同じ内容で依頼してもいいですか？',
    answer: '可能ですが、複数のクリエイターが承諾した場合は複数の作品代金をお支払いいただくことになります。コンペ形式での依頼は禁止しています。'
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

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
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