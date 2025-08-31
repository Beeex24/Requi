<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="決済・支払い情報 - Requi レキ"
      description="Requi レキの決済システム、支払い方法、手数料、エスクロー保護について詳しく解説。安全で透明な取引システムをご紹介します。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          決済・支払い<br>
          <span class="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            情報
          </span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Requi レキの安全で透明な決済システムについて<br>
          詳しくご説明します。
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            @click="scrollToSection('client')"
            class="inline-flex items-center bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            <Icon name="lucide:shopping-bag" class="w-5 h-5 mr-2" />
            クライアント向け情報
          </button>
          <button
            @click="scrollToSection('creator')"
            class="inline-flex items-center bg-gradient-to-r from-green-400 to-teal-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            <Icon name="lucide:palette" class="w-5 h-5 mr-2" />
            クリエイター向け情報
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-green-600">エスクロー</div>
            <div class="text-gray-900">安全保護</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-green-600">手数料</div>
            <div class="text-gray-900">6%〜9.8%</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-green-600">決済</div>
            <div class="text-gray-900">即座に実行</div>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-lg p-3">
            <div class="font-bold text-green-600">振込</div>
            <div class="text-gray-900">月末締翌月払</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview -->
    <section class="bg-white py-12 border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">安全な決済システム</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:shield-check" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">エスクロー保護</h3>
            <p class="text-gray-600">作品完成まで代金を安全に保管し、取引の安全性を保証します</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:credit-card" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">多様な決済方法</h3>
            <p class="text-gray-600">クレジットカード、電子マネー、銀行振込など幅広い決済に対応</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:trending-up" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">透明な手数料</h3>
            <p class="text-gray-600">明確で分かりやすい手数料体系で、隠れた費用は一切ありません</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Payment Info -->
    <section id="client-payment" class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:shopping-bag" class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">クライアント向け決済情報</h2>
            <p class="text-gray-600">作品を依頼する際の支払い方法と料金体系</p>
          </div>

          <div class="space-y-12">
            <!-- Payment Methods for Clients -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">利用可能な決済方法</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  v-for="method in clientPaymentMethods"
                  :key="method.name"
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center mb-3">
                    <div :class="`w-10 h-10 ${method.bgColor} rounded-lg flex items-center justify-center mr-3`">
                      <Icon :name="method.icon" :class="`w-5 h-5 ${method.iconColor}`" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ method.name }}</h4>
                      <p class="text-sm text-gray-500">{{ method.processing }}</p>
                    </div>
                  </div>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li v-for="detail in method.details" :key="detail">• {{ detail }}</li>
                  </ul>
                  <div v-if="method.fee" class="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    {{ method.fee }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Fee Structure for Clients -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">手数料体系</h3>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">9.8%</div>
                    <div class="text-sm text-blue-800">〜¥10,000の依頼</div>
                    <div class="text-xs text-gray-600 mt-1">少額案件向け</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-indigo-600 mb-2">7.8%</div>
                    <div class="text-sm text-indigo-800">¥10,001〜¥50,000</div>
                    <div class="text-xs text-gray-600 mt-1">標準的な案件</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">6.0%</div>
                    <div class="text-sm text-purple-800">¥50,001以上</div>
                    <div class="text-xs text-gray-600 mt-1">大型案件向け</div>
                  </div>
                </div>
                
                <div class="border-t border-blue-200 pt-4">
                  <h4 class="font-semibold text-blue-900 mb-3">料金計算例</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white p-3 rounded border">
                      <div class="font-medium text-gray-900">¥5,000の作品</div>
                      <div class="text-sm text-gray-600">作品代 + 手数料(¥490) = <strong>¥5,490</strong></div>
                    </div>
                    <div class="bg-white p-3 rounded border">
                      <div class="font-medium text-gray-900">¥20,000の作品</div>
                      <div class="text-sm text-gray-600">作品代 + 手数料(¥1,560) = <strong>¥21,560</strong></div>
                    </div>
                    <div class="bg-white p-3 rounded border">
                      <div class="font-medium text-gray-900">¥80,000の作品</div>
                      <div class="text-sm text-gray-600">作品代 + 手数料(¥4,800) = <strong>¥84,800</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Escrow System -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">エスクローシステム</h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 class="font-medium text-gray-900 mb-4">仕組みと流れ</h4>
                  <div class="space-y-4">
                    <div 
                      v-for="(step, index) in escrowSteps"
                      :key="index"
                      class="flex items-start space-x-3"
                    >
                      <div :class="`w-8 h-8 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`">
                        {{ index + 1 }}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900">{{ step.title }}</div>
                        <div class="text-sm text-gray-600">{{ step.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-4">安全性の保証</h4>
                  <div class="space-y-3">
                    <div class="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Icon name="lucide:shield" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-green-900">資金の保護</div>
                        <div class="text-sm text-green-700">作品完成まで代金を安全に保管</div>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Icon name="lucide:check-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-blue-900">品質保証</div>
                        <div class="text-sm text-blue-700">納品後の確認期間を設定</div>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Icon name="lucide:rotate-ccw" class="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-purple-900">返金保証</div>
                        <div class="text-sm text-purple-700">未納品時は全額返金対応</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Billing & Receipts -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">請求書・領収書</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-6">
                  <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                    <Icon name="lucide:receipt" class="w-5 h-5 mr-2 text-green-500" />
                    個人利用
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li>• マイページから領収書ダウンロード可能</li>
                    <li>• PDF形式での自動発行</li>
                    <li>• 取引履歴の詳細表示</li>
                    <li>• 年度別の支出サマリー</li>
                  </ul>
                </div>
                <div class="border border-gray-200 rounded-lg p-6">
                  <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                    <Icon name="lucide:building" class="w-5 h-5 mr-2 text-blue-500" />
                    法人利用
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li>• 請求書・見積書の発行対応</li>
                    <li>• 月末締めの請求書送付</li>
                    <li>• 銀行振込での支払い対応</li>
                    <li>• 経理システム連携API提供</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Creator Payment Info -->
    <section id="creator-payment" class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:palette" class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">クリエイター向け収益情報</h2>
            <p class="text-gray-600">作品制作による収益と振込に関する詳細</p>
          </div>

          <div class="space-y-12">
            <!-- Revenue Structure -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">収益構造</h3>
              <div class="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">9.8%</div>
                    <div class="text-sm text-red-800">新人クリエイター</div>
                    <div class="text-xs text-gray-600 mt-1">実績0〜10件</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">7.8%</div>
                    <div class="text-sm text-orange-800">レギュラークリエイター</div>
                    <div class="text-xs text-gray-600 mt-1">実績11〜50件</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">6.0%</div>
                    <div class="text-sm text-green-800">プロクリエイター</div>
                    <div class="text-xs text-gray-600 mt-1">実績51件以上</div>
                  </div>
                </div>

                <div class="border-t border-green-200 pt-4">
                  <h4 class="font-semibold text-green-900 mb-3">収益計算例</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white p-3 rounded border">
                      <div class="font-medium text-gray-900">¥10,000の作品</div>
                      <div class="text-sm text-gray-600">作品代 - 手数料(¥980) = <strong>¥9,020</strong></div>
                    </div>
                    <div class="bg-white p-3 rounded border">
                      <div class="font-medium text-gray-900">¥30,000の作品</div>
                      <div class="text-sm text-gray-600">作品代 - 手数料(¥2,340) = <strong>¥27,660</strong></div>
                    </div>
                    <div class="bg-white p-3 rounded border">
                      <div class="font-medium text-gray-900">¥100,000の作品</div>
                      <div class="text-sm text-gray-600">作品代 - 手数料(¥6,000) = <strong>¥94,000</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Commission Reduction -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">手数料優遇制度</h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 class="font-medium text-gray-900 mb-4">基本条件</h4>
                  <div class="space-y-3">
                    <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Icon name="lucide:trending-up" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-blue-900">実績数による優遇</div>
                        <div class="text-sm text-blue-700">完了案件数に応じて手数料が段階的に減額</div>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Icon name="lucide:star" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-green-900">評価による優遇</div>
                        <div class="text-sm text-green-700">平均評価4.8以上で追加割引</div>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Icon name="lucide:calendar" class="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-purple-900">継続活動による優遇</div>
                        <div class="text-sm text-purple-700">3ヶ月連続活動で特別料金</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-4">特別優遇制度</h4>
                  <div class="space-y-3">
                    <div class="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Icon name="lucide:crown" class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-yellow-900">トップクリエイター</div>
                        <div class="text-sm text-yellow-700">月間売上上位10%で手数料4.5%</div>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                      <Icon name="lucide:users" class="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-pink-900">コミュニティ貢献</div>
                        <div class="text-sm text-pink-700">メンター活動・イベント参加で優遇</div>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                      <Icon name="lucide:zap" class="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div class="font-medium text-indigo-900">早期採用者特典</div>
                        <div class="text-sm text-indigo-700">β版からの利用者に永続割引</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payout Information -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">振込・出金情報</h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 class="font-medium text-gray-900 mb-4">振込スケジュール</h4>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="space-y-3">
                      <div class="flex justify-between items-center">
                        <span class="font-medium text-gray-900">締め日</span>
                        <span class="text-blue-600">毎月末日</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="font-medium text-gray-900">振込日</span>
                        <span class="text-blue-600">翌月15日</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="font-medium text-gray-900">最低振込額</span>
                        <span class="text-blue-600">¥1,000</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="font-medium text-gray-900">振込手数料</span>
                        <span class="text-green-600">無料（当社負担）</span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 text-sm text-gray-600">
                    <Icon name="lucide:info" class="w-4 h-4 inline mr-1" />
                    15日が土日祝の場合は翌営業日に振込
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-4">対応金融機関</h4>
                  <div class="space-y-3">
                    <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Icon name="lucide:building-2" class="w-5 h-5 text-green-600" />
                      <span class="text-green-900">全国の都市銀行・地方銀行</span>
                    </div>
                    <div class="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Icon name="lucide:landmark" class="w-5 h-5 text-blue-600" />
                      <span class="text-blue-900">信用金庫・信用組合</span>
                    </div>
                    <div class="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Icon name="lucide:smartphone" class="w-5 h-5 text-purple-600" />
                      <span class="text-purple-900">ネット銀行（楽天・PayPay等）</span>
                    </div>
                    <div class="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <Icon name="lucide:building" class="w-5 h-5 text-orange-600" />
                      <span class="text-orange-900">ゆうちょ銀行</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tax Information -->
            <div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">税務・確定申告サポート</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-6">
                  <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                    <Icon name="lucide:calculator" class="w-5 h-5 mr-2 text-blue-500" />
                    確定申告サポート
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li>• 年間売上・手数料の詳細レポート</li>
                    <li>• 支払調書の自動発行</li>
                    <li>• 確定申告に必要な書類一式</li>
                    <li>• 税理士紹介サービス</li>
                    <li>• e-Taxデータ出力機能</li>
                  </ul>
                </div>
                <div class="border border-gray-200 rounded-lg p-6">
                  <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                    <Icon name="lucide:receipt" class="w-5 h-5 mr-2 text-green-500" />
                    インボイス制度対応
                  </h4>
                  <ul class="text-gray-600 text-sm space-y-2">
                    <li>• 適格請求書発行事業者登録サポート</li>
                    <li>• インボイス対応の請求書発行</li>
                    <li>• 消費税計算の自動処理</li>
                    <li>• 免税事業者への配慮システム</li>
                    <li>• 制度変更時の自動アップデート</li>
                  </ul>
                </div>
              </div>
              
              <div class="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div class="flex items-start space-x-3">
                  <Icon name="lucide:alert-triangle" class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div class="font-medium text-yellow-900">確定申告の目安</div>
                    <div class="text-sm text-yellow-800 mt-1">
                      年間収益が20万円を超える場合は確定申告が必要です。詳細は税務署または税理士にご相談ください。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Security & Safety -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">セキュリティ・安全性</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="security in securityFeatures"
              :key="security.title"
              class="text-center"
            >
              <div :class="`w-16 h-16 ${security.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`">
                <Icon :name="security.icon" :class="`w-8 h-8 ${security.iconColor}`" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-3">{{ security.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ security.description }}</p>
              <ul class="text-gray-500 text-xs space-y-1">
                <li v-for="feature in security.features" :key="feature">• {{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">よくある質問</h2>
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="space-y-1">
            <div 
              v-for="(faq, index) in paymentFAQs" 
              :key="index"
              class="border-b border-gray-100 last:border-b-0"
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
      </div>
    </section>

    <!-- Support Contact -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">決済に関するお問い合わせ</h2>
          <p class="text-gray-600 mb-6">
            決済・振込・税務に関するご質問がございましたら、<br>
            専門スタッフがサポートいたします。
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-lg">
              <Icon name="lucide:phone" class="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div class="font-medium text-gray-900">電話サポート</div>
              <div class="text-sm text-gray-600">03-1234-5678</div>
              <div class="text-xs text-gray-500">平日 10:00-17:00</div>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <Icon name="lucide:mail" class="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div class="font-medium text-gray-900">メールサポート</div>
              <div class="text-sm text-gray-600">payment@requi.com</div>
              <div class="text-xs text-gray-500">24時間以内返信</div>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <Icon name="lucide:message-circle" class="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div class="font-medium text-gray-900">チャットサポート</div>
              <div class="text-sm text-gray-600">リアルタイム対応</div>
              <div class="text-xs text-gray-500">平日 10:00-18:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// パンくずナビゲーション
const breadcrumbs = ref([
  { name: '決済・支払い情報' }
])

// リアクティブ状態
const openFaq = ref(null)

// クライアント向け決済方法
const clientPaymentMethods = ref([
  {
    name: 'クレジットカード',
    processing: '即座に決済完了',
    icon: 'lucide:credit-card',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    details: [
      'VISA, MasterCard, JCB, AMEX',
      '3Dセキュア対応で安全',
      '分割払い・リボ払い対応',
      'ポイント還元対象'
    ],
    fee: '手数料無料（カード会社規定に従う）'
  },
  {
    name: 'PayPay・LINE Pay',
    processing: 'QRコード決済',
    icon: 'lucide:smartphone',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    details: [
      'PayPay残高から支払い',
      'LINE Pay残高から支払い',
      'スマホで簡単決済',
      'キャンペーン対象'
    ],
    fee: '手数料無料'
  },
  {
    name: '銀行振込',
    processing: '1営業日で確認',
    icon: 'lucide:building-2',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    details: [
      '全国の金融機関対応',
      'ネットバンキング対応',
      '法人・個人問わず利用可',
      '領収書自動発行'
    ],
    fee: '振込手数料はお客様負担'
  },
  {
    name: 'コンビニ決済',
    processing: '30分以内で確認',
    icon: 'lucide:store',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    details: [
      'セブン・ローソン・ファミマ対応',
      '現金での支払い可能',
      '24時間いつでも決済',
      '手数料込みの表示'
    ],
    fee: '決済手数料 ¥220'
  },
  {
    name: 'PayPal',
    processing: '即座に決済完了',
    icon: 'lucide:globe',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    details: [
      '世界標準の決済システム',
      '買い手保護制度',
      'クレカ・銀行口座連携',
      '海外からの支払い対応'
    ],
    fee: '手数料無料'
  },
  {
    name: '後払い決済',
    processing: '審査後利用可能',
    icon: 'lucide:calendar',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600',
    details: [
      '商品・サービス確認後支払い',
      '2週間後の支払い',
      '与信審査あり',
      '未払い時は督促あり'
    ],
    fee: '手数料 ¥250'
  }
])

// エスクローの流れ
const escrowSteps = ref([
  {
    title: 'リクエスト承諾時に決済',
    description: 'クリエイターがリクエストを承諾した時点で決済が実行されます',
    color: 'bg-blue-500'
  },
  {
    title: '代金を安全に保管',
    description: '決済された代金は当社が責任を持ってお預かりします',
    color: 'bg-green-500'
  },
  {
    title: '作品制作・進行管理',
    description: 'クリエイターが作品制作を進め、進捗を随時確認できます',
    color: 'bg-yellow-500'
  },
  {
    title: '作品納品・内容確認',
    description: '完成した作品が納品され、内容に問題がないか確認します',
    color: 'bg-orange-500'
  },
  {
    title: 'クリエイターに支払い',
    description: '内容確認後、自動的にクリエイターに代金が支払われます',
    color: 'bg-purple-500'
  }
])

// セキュリティ機能
const securityFeatures = ref([
  {
    title: 'SSL暗号化通信',
    description: '全ての通信を256bit SSLで暗号化し、情報漏洩を防止',
    icon: 'lucide:shield',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    features: [
      '銀行レベルの暗号化',
      'PCI DSS準拠',
      '24時間監視システム',
      '定期的なセキュリティ監査'
    ]
  },
  {
    title: '不正検知システム',
    description: 'AI による不正取引の検知・防止システムを導入',
    icon: 'lucide:eye',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    features: [
      'リアルタイム不正検知',
      '機械学習による精度向上',
      '異常なアクセスパターン検出',
      '自動ブロック機能'
    ]
  },
  {
    title: '3Dセキュア対応',
    description: 'クレジットカード決済時の本人認証を強化',
    icon: 'lucide:key',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    features: [
      '二段階認証システム',
      'ワンタイムパスワード',
      'SMS認証対応',
      'バイオメトリクス認証'
    ]
  },
  {
    title: 'データ保護',
    description: '個人情報・決済情報の厳重な管理・保護',
    icon: 'lucide:database',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    features: [
      '暗号化データベース',
      'アクセス権限管理',
      '定期的なバックアップ',
      'GDPR・個人情報保護法準拠'
    ]
  },
  {
    title: '監査・コンプライアンス',
    description: '第三者機関による定期的な監査とコンプライアンス遵守',
    icon: 'lucide:clipboard-check',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    features: [
      '年次セキュリティ監査',
      'ペネトレーションテスト',
      '脆弱性スキャン',
      'インシデント対応計画'
    ]
  },
  {
    title: '24時間監視',
    description: 'システム稼働状況とセキュリティの24時間監視体制',
    icon: 'lucide:activity',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    features: [
      'SOC（Security Operation Center）',
      'アラート通知システム',
      '障害時の迅速対応',
      '冗長化システム構成'
    ]
  }
])

// 決済関連FAQ
const paymentFAQs = ref([
  {
    question: 'エスクローシステムとは何ですか？',
    answer: '作品が完成・納品されるまで、お支払いいただいた代金を当社が安全にお預かりするシステムです。作品に問題がないことを確認後、クリエイターにお支払いします。万が一作品が納品されない場合は、全額返金いたします。'
  },
  {
    question: '決済のタイミングはいつですか？',
    answer: 'クリエイターがリクエストを承諾した時点で決済が実行されます。ただし、実際にクリエイターに代金が支払われるのは、作品が納品され内容確認が完了した後です。'
  },
  {
    question: '手数料はなぜ発生するのですか？',
    answer: 'プラットフォームの運営・維持、エスクローシステム、決済処理、カスタマーサポート、セキュリティ対策などの費用として手数料をいただいております。透明性を保つため、手数料率は事前に明示しています。'
  },
  {
    question: 'クレジットカードの分割払いはできますか？',
    answer: 'はい、VISA・MasterCard・JCBの分割払い・リボ払いに対応しています。分割回数や手数料はご利用のカード会社の規定に従います。'
  },
  {
    question: '海外からの支払いは可能ですか？',
    answer: 'PayPalを通じて海外からのお支払いが可能です。また、海外発行のクレジットカードもご利用いただけます（一部制限があります）。'
  },
  {
    question: 'キャンセル・返金はできますか？',
    answer: '制作開始前であれば全額返金可能です。制作開始後は作品の進捗状況に応じて個別に対応いたします。返金は元の決済方法に対して行われ、通常3-7営業日で処理されます。'
  },
  {
    question: '領収書・請求書は発行してもらえますか？',
    answer: 'はい、マイページから領収書のダウンロードが可能です。法人のお客様には請求書発行も対応しております。適格請求書（インボイス）にも対応しています。'
  },
  {
    question: 'クリエイターの振込はいつ行われますか？',
    answer: '月末締め、翌月15日払いで振込を行います。最低振込金額は1,000円で、振込手数料は当社が負担いたします。15日が土日祝の場合は翌営業日の振込となります。'
  },
  {
    question: '税務処理のサポートはありますか？',
    answer: 'はい、年間の売上・手数料の詳細レポート、支払調書の発行、確定申告に必要な書類の提供を行っています。インボイス制度にも対応しております。'
  },
  {
    question: 'セキュリティは大丈夫ですか？',
    answer: '256bit SSL暗号化、PCI DSS準拠、3Dセキュア対応など、銀行レベルのセキュリティを実装しています。24時間監視体制とAI不正検知システムで安全性を確保しています。'
  }
])

// メソッド
const scrollToSection = (section) => {
  const element = document.getElementById(`${section}-payment`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>