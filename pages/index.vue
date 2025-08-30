<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Simple Header -->
    <header
      class="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center"
            >
              <Icon name="lucide:sparkles" class="w-5 h-5 text-white" />
            </div>
            <span
              class="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
            >
              Requi レキ
            </span>
            <span
              class="hidden sm:inline-block px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium"
            >
              β版
            </span>
          </div>

          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink
              to="/works"
              class="text-gray-600 hover:text-pink-500 transition-colors font-medium"
              >作品を見る</NuxtLink
            >
            <NuxtLink
              to="/creators"
              class="text-gray-600 hover:text-pink-500 transition-colors font-medium"
              >クリエイター</NuxtLink
            >
            <NuxtLink
              to="/requestmethod"
              class="text-gray-600 hover:text-pink-500 transition-colors font-medium"
              >依頼方法</NuxtLink
            >
            <NuxtLink
              to="/help"
              class="text-gray-600 hover:text-pink-500 transition-colors font-medium"
              >ヘルプ</NuxtLink
            >
          </nav>

          <div class="flex items-center space-x-3">
            <!-- Notification -->
            <div class="relative">
              <button
                @click="showNotifications = !showNotifications"
                class="p-2 text-gray-600 hover:text-pink-500 transition-colors relative"
              >
                <Icon name="lucide:bell" class="w-5 h-5" />
                <span
                  class="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"
                ></span>
              </button>

              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div
                  v-show="showNotifications"
                  class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                >
                  <div class="px-4 py-2 border-b border-gray-100">
                    <h3 class="font-semibold text-gray-900">通知</h3>
                  </div>
                  <div
                    v-for="notif in notifications"
                    :key="notif.id"
                    class="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <div class="flex items-center space-x-3">
                      <div
                        :class="`w-2 h-2 rounded-full ${
                          notif.unread ? 'bg-pink-500' : 'bg-gray-300'
                        }`"
                      ></div>
                      <div class="flex-1">
                        <p class="text-sm text-gray-900">{{ notif.message }}</p>
                        <p class="text-xs text-gray-500">{{ notif.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <NuxtLink
              to="/login"
              class="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              ログイン
            </NuxtLink>
            <NuxtLink
              to="/signup"
              class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all font-medium inline-block"
            >
              アカウント登録
            </NuxtLink>

            <!-- Mobile menu -->
            <button
              class="md:hidden p-2"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <Icon v-if="mobileMenuOpen" name="lucide:x" class="w-5 h-5" />
              <Icon v-else name="lucide:menu" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-show="mobileMenuOpen"
          class="md:hidden border-t border-gray-100 bg-white"
        >
          <div class="px-4 py-2 space-y-2">
            <NuxtLink to="/works" class="block py-2 text-gray-600 font-medium"
              >作品を見る</NuxtLink
            >
            <NuxtLink
              to="/creators"
              class="block py-2 text-gray-600 font-medium"
              >クリエイター</NuxtLink
            >
            <NuxtLink to="/guide" class="block py-2 text-gray-600 font-medium"
              >依頼方法</NuxtLink
            >
            <NuxtLink to="/help" class="block py-2 text-gray-600 font-medium"
              >ヘルプ</NuxtLink
            >
          </div>
        </div>
      </Transition>
    </header>

    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          class="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-6"
        >
          <Icon name="lucide:trending-up" class="w-4 h-4 text-pink-500 mr-2" />
          <span class="text-sm font-medium text-pink-600"
            >今月1,500件のリクエスト完了✨</span
          >
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span
            class="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
          >
            好きな絵師に
          </span>
          <br />
          リクエスト
        </h1>

        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          見積もり・打ち合わせ・修正なし。
          <br />
          シンプルで気軽な創作依頼プラットフォーム
        </p>

        <!-- Search -->
        <div class="max-w-lg mx-auto mb-8">
          <div class="relative">
            <Icon
              name="lucide:search"
              class="absolute left-4 top-3 w-5 h-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="絵師さんや作品を検索..."
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:border-pink-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <!-- Popular Tags -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <span class="text-sm text-gray-500 mr-2">人気タグ:</span>
          <button
            v-for="(tag, index) in popularTags.slice(0, 6)"
            :key="index"
            class="px-3 py-1 bg-white/70 text-gray-600 text-sm rounded-full hover:bg-white hover:text-pink-500 transition-colors border border-gray-200"
            @click="searchByTag(tag)"
          >
            #{{ tag }}
          </button>
        </div>

        <!-- Quick Stats -->
        <div
          class="flex justify-center items-center space-x-6 text-sm text-gray-500"
        >
          <div class="flex items-center">
            <Icon name="lucide:users" class="w-4 h-4 mr-1" />
            800+ 絵師
          </div>
          <div class="flex items-center">
            <Icon
              name="lucide:star"
              class="w-4 h-4 mr-1 text-yellow-400 fill-current"
            />
            平均4.8点
          </div>
          <div class="flex items-center">
            <Icon name="lucide:clock" class="w-4 h-4 mr-1" />
            平均7日納品
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="bg-white py-6 sticky top-16 z-40 border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 overflow-x-auto">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeCategory = category.id"
              :class="`flex items-center space-x-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-pink-50 text-pink-600 border border-pink-200'
                  : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
              }`"
            >
              <Icon
                :name="category.iconName"
                :class="`w-4 h-4 ${
                  activeCategory === category.id
                    ? category.color
                    : 'text-gray-400'
                }`"
              />
              <span class="font-medium">{{ category.name }}</span>
              <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {{ category.count }}
              </span>
            </button>
          </div>

          <div class="hidden md:flex items-center space-x-3">
            <div class="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                @click="viewMode = 'grid'"
                :class="`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                }`"
              >
                <Icon name="lucide:grid" class="w-4 h-4" />
              </button>
              <button
                @click="viewMode = 'list'"
                :class="`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : ''
                }`"
              >
                <Icon name="lucide:list" class="w-4 h-4" />
              </button>
            </div>

            <button
              class="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Icon name="lucide:filter" class="w-4 h-4" />
              <span>絞り込み</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Works Grid -->
    <section class="py-8 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-900">
            {{
              activeCategory === "all"
                ? "新着・人気作品"
                : `${
                    categories.find((c) => c.id === activeCategory)?.name
                  }の作品`
            }}
          </h2>
          <span class="text-sm text-gray-500"
            >{{ filteredWorks.length }}件の作品</span
          >
        </div>

        <div
          :class="`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`"
        >
          <div
            v-for="work in filteredWorks"
            :key="work.id"
            :class="`group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
              viewMode === 'list' ? 'flex' : ''
            }`"
          >
            <!-- Grid View -->
            <template v-if="viewMode === 'grid'">
              <!-- Image -->
              <div class="relative aspect-[4/5] overflow-hidden">
                <img
                  :src="work.image"
                  :alt="work.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <!-- Badges -->
                <div class="absolute top-3 left-3">
                  <span
                    v-if="work.isNew"
                    class="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                  >
                    NEW
                  </span>
                </div>

                <div
                  v-if="work.originalPrice"
                  class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                >
                  -{{
                    Math.round((1 - work.price / work.originalPrice) * 100)
                  }}%
                </div>

                <!-- Hover Actions -->
                <div
                  class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="flex space-x-2">
                    <button
                      @click.stop="toggleLike(work.id)"
                      :class="`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedWorks.has(work.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/80 text-gray-600 hover:text-pink-500'
                      }`"
                    >
                      <Icon
                        name="lucide:heart"
                        :class="`w-4 h-4 ${
                          likedWorks.has(work.id) ? 'fill-current' : ''
                        }`"
                      />
                    </button>
                    <button
                      class="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <Icon name="lucide:share" class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Stats Overlay -->
                <div
                  class="absolute bottom-3 left-3 flex items-center space-x-3 text-white text-sm"
                >
                  <div
                    class="flex items-center bg-black/50 rounded-full px-2 py-1"
                  >
                    <Icon name="lucide:heart" class="w-3 h-3 mr-1" />
                    {{ work.likes }}
                  </div>
                  <div
                    class="flex items-center bg-black/50 rounded-full px-2 py-1"
                  >
                    <Icon name="lucide:eye" class="w-3 h-3 mr-1" />
                    {{ work.views }}
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-2">
                    <img
                      :src="work.creatorAvatar"
                      :alt="work.creator"
                      class="w-6 h-6 rounded-full object-cover"
                    />
                    <span class="text-sm font-medium text-gray-900">{{
                      work.creator
                    }}</span>
                  </div>
                  <button
                    @click.stop="toggleBookmark(work.creator)"
                    :class="`p-1 rounded transition-colors ${
                      bookmarkedCreators.has(work.creator)
                        ? 'text-yellow-500'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`"
                  >
                    <Icon
                      name="lucide:bookmark"
                      :class="`w-4 h-4 ${
                        bookmarkedCreators.has(work.creator)
                          ? 'fill-current'
                          : ''
                      }`"
                    />
                  </button>
                </div>

                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {{ work.title }}
                </h3>

                <div class="flex flex-wrap gap-1 mb-3">
                  <span
                    v-for="(tag, index) in work.tags.slice(0, 3)"
                    :key="index"
                    class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <div class="flex items-center space-x-2">
                      <span class="text-lg font-bold text-pink-600">
                        ¥{{ work.price.toLocaleString() }}
                      </span>
                      <span
                        v-if="work.originalPrice"
                        class="text-sm text-gray-400 line-through"
                      >
                        ¥{{ work.originalPrice.toLocaleString() }}
                      </span>
                    </div>
                    <div class="text-xs text-gray-500 flex items-center">
                      <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
                      {{ work.deliveryDays }}日納品
                    </div>
                  </div>
                  <button
                    class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                  >
                    リクエスト
                  </button>
                </div>
              </div>
            </template>

            <!-- List View -->
            <template v-else>
              <div class="flex items-center p-4 space-x-4 w-full">
                <img
                  :src="work.image"
                  :alt="work.title"
                  class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />

                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-1">
                    <h3 class="font-semibold text-gray-900 truncate">
                      {{ work.title }}
                    </h3>
                    <span
                      v-if="work.isNew"
                      class="bg-pink-100 text-pink-600 px-2 py-0.5 rounded text-xs font-medium"
                      >NEW</span
                    >
                  </div>
                  <div class="flex items-center space-x-2 mb-2">
                    <img
                      :src="work.creatorAvatar"
                      :alt="work.creator"
                      class="w-4 h-4 rounded-full object-cover"
                    />
                    <span class="text-sm text-gray-600">{{
                      work.creator
                    }}</span>
                  </div>
                  <div
                    class="flex items-center space-x-4 text-sm text-gray-500"
                  >
                    <div class="flex items-center">
                      <Icon name="lucide:heart" class="w-3 h-3 mr-1" />
                      {{ work.likes }}
                    </div>
                    <div class="flex items-center">
                      <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
                      {{ work.deliveryDays }}日
                    </div>
                  </div>
                </div>

                <div class="text-right flex-shrink-0">
                  <div class="text-lg font-bold text-pink-600 mb-1">
                    ¥{{ work.price.toLocaleString() }}
                  </div>
                  <button
                    class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                  >
                    リクエスト
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center mt-8">
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full transition-colors font-medium"
          >
            もっと見る
          </button>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            とってもシンプル
          </h2>
          <p class="text-lg text-gray-600">
            見積もり・打ち合わせなし、リテイクは一回までのシンプルな依頼システム
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-20 h-20 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="lucide:search" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              1. 気に入った作品を探す
            </h3>
            <p class="text-gray-600">
              カテゴリーやタグから、あなたの好みにぴったりの絵師さんを見つけよう
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="lucide:send" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              2. リクエストを送る
            </h3>
            <p class="text-gray-600">
              シンプルなフォームで要望を送信。絵師さんが承諾したら制作開始！
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="lucide:gift" class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              3. 作品を受け取る
            </h3>
            <p class="text-gray-600">
              完成した素敵な作品を受け取って、SNSでシェアしよう！
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <div
            class="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm"
          >
            <Icon name="lucide:zap" class="w-4 h-4 text-yellow-500 mr-2" />
            <span class="text-sm font-medium text-gray-700"
              >平均3日で完成！</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Creator Spotlight -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">注目の絵師さん</h2>
          <p class="text-lg text-gray-600">
            今週特に人気の絵師さんをピックアップ
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(creator, index) in featuredCreators"
            :key="index"
            class="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all group"
          >
            <div class="relative inline-block mb-4">
              <img
                :src="creator.avatar"
                :alt="creator.name"
                class="w-16 h-16 rounded-full object-cover mx-auto"
              />
              <div
                class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"
              ></div>
            </div>

            <div class="mb-2">
              <span
                :class="`inline-block px-2 py-1 text-xs rounded-full font-medium ${getBadgeClass(
                  creator.badge
                )}`"
              >
                {{ creator.badge }}
              </span>
            </div>

            <h3 class="font-bold text-gray-900 mb-1">{{ creator.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ creator.specialty }}</p>

            <div
              class="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4"
            >
              <div class="flex items-center">
                <Icon name="lucide:users" class="w-3 h-3 mr-1" />
                {{ creator.followers }}
              </div>
              <div class="flex items-center">
                <Icon
                  name="lucide:star"
                  class="w-3 h-3 mr-1 text-yellow-400 fill-current"
                />
                {{ creator.rating }}
              </div>
            </div>

            <div class="text-lg font-bold text-pink-600 mb-4">
              ¥{{ creator.minPrice.toLocaleString() }}〜
            </div>

            <button
              class="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 rounded-lg hover:shadow-lg transition-all font-medium group-hover:scale-105"
            >
              プロフィールを見る
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            安心・安全のサービス
          </h2>
          <p class="text-lg text-gray-600">
            初めての方でも安心してご利用いただけます
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all"
          >
            <div
              class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="lucide:shield" class="w-6 h-6 text-pink-500" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">安全な決済</h3>
            <p class="text-gray-600 text-sm">
              作品完成まで代金をお預かりする エスクローシステム
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all"
          >
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="lucide:award" class="w-6 h-6 text-blue-500" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">品質保証</h3>
            <p class="text-gray-600 text-sm">
              万が一トラブルがあった場合も 運営がしっかりサポート
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all"
          >
            <div
              class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="lucide:clock" class="w-6 h-6 text-green-500" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">スピード納品</h3>
            <p class="text-gray-600 text-sm">
              シンプルなフローで 平均3日での作品完成
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section
      class="py-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">新しいクリエイティブな体験を</h2>
          <p class="text-pink-100 text-lg">
            創作者とクリエイターを繋ぐ新しいプラットフォーム
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold mb-2">準備中</div>
            <div class="text-pink-100">登録クリエイター</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">近日開始</div>
            <div class="text-pink-100">作品リクエスト</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">シンプル</div>
            <div class="text-pink-100">依頼プロセス</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">安心</div>
            <div class="text-pink-100">取引システム</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          今すぐ始めてみませんか？
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          あなたの理想の作品を作ってくれる絵師さんが見つかります
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-bold text-lg"
          >
            作品を探す
          </button>
          <button
            class="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all font-bold text-lg"
          >
            絵師として登録
          </button>
        </div>

        <div class="mt-6 text-sm text-gray-500">
          ✨ 登録無料 • 手数料8%〜 • 24時間サポート
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div
                class="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center"
              >
                <Icon name="lucide:sparkles" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold">Requi レキ</span>
            </div>
            <p class="text-gray-400 text-sm mb-4">
              シンプルで楽しい創作依頼プラットフォーム
            </p>
            <div class="text-sm text-gray-400">
              © 2025 Requi. All rights reserved.
            </div>
          </div>

          <div>
            <h4 class="font-bold mb-4">サービス</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink to="/works" class="hover:text-white transition-colors"
                  >作品を探す</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/creators"
                  class="hover:text-white transition-colors"
                  >絵師を探す</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/categories"
                  class="hover:text-white transition-colors"
                  >カテゴリー</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/tags" class="hover:text-white transition-colors"
                  >人気タグ</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">ヘルプ</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink
                  to="/privacy"
                  class="hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/terms"
                  class="hover:text-white transition-colors"
                >
                  利用規約
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/faq" class="hover:text-white transition-colors">
                  よくある質問
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="hover:text-white transition-colors"
                >
                  お問い合わせ
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">絵師向け</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink
                  to="/creator-register"
                  class="hover:text-white transition-colors"
                  >絵師登録</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/monetization"
                  class="hover:text-white transition-colors"
                  >収益化方法</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/guidelines"
                  class="hover:text-white transition-colors"
                  >ガイドライン</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/creator-support"
                  class="hover:text-white transition-colors"
                  >サポート</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// SEO設定
useSeoMeta({
  title: "Skeb風 - 好きな絵師にリクエスト",
  ogTitle: "Skeb風 - 好きな絵師にリクエスト",
  description:
    "見積もり・打ち合わせ・修正なし。シンプルで気軽な創作依頼プラットフォーム",
  ogDescription:
    "見積もり・打ち合わせ・修正なし。シンプルで気軽な創作依頼プラットフォーム",
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image",
});

// リアクティブデータ
const activeCategory = ref("all");
const likedWorks = ref(new Set());
const bookmarkedCreators = ref(new Set());
const showNotifications = ref(false);
const viewMode = ref("grid");
const mobileMenuOpen = ref(false);
const searchQuery = ref("");

// データ定義
const featuredWorks = ref([
  {
    id: 1,
    title: "オリジナルVTuberアバター",
    creator: "みお🎨",
    creatorAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616c830645f?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    price: 8000,
    originalPrice: 12000,
    likes: 234,
    views: 1420,
    isNew: true,
    tags: ["VTuber", "アバター", "Live2D"],
    deliveryDays: 7,
    category: "illustration",
  },
  {
    id: 2,
    title: "シンプルロゴデザイン",
    creator: "デザイン工房K",
    creatorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop",
    price: 5000,
    originalPrice: null,
    likes: 156,
    views: 890,
    isNew: false,
    tags: ["ロゴ", "シンプル", "ブランディング"],
    deliveryDays: 3,
    category: "design",
  },
  {
    id: 3,
    title: "癒し系ナレーション",
    creator: "声優ひなた",
    creatorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
    price: 3000,
    originalPrice: null,
    likes: 89,
    views: 456,
    isNew: true,
    tags: ["ナレーション", "癒し", "女性"],
    deliveryDays: 2,
    category: "voice",
  },
  {
    id: 4,
    title: "アニメ風ショート動画",
    creator: "アニメスタジオ零",
    creatorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1596122924046-f9e32e5b4f25?w=400&h=500&fit=crop",
    price: 15000,
    originalPrice: 20000,
    likes: 312,
    views: 2130,
    isNew: false,
    tags: ["アニメ", "動画", "ショート"],
    deliveryDays: 14,
    category: "video",
  },
  {
    id: 5,
    title: "かわいいキャラクター",
    creator: "ちびまる🌸",
    creatorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
    price: 4500,
    originalPrice: null,
    likes: 445,
    views: 1890,
    isNew: true,
    tags: ["キャラクター", "かわいい", "デフォルメ"],
    deliveryDays: 5,
    category: "illustration",
  },
  {
    id: 6,
    title: "手描き風イラスト",
    creator: "アートスタジオ月",
    creatorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=500&fit=crop",
    price: 6000,
    originalPrice: null,
    likes: 178,
    views: 756,
    isNew: false,
    tags: ["手描き", "アナログ", "温かみ"],
    deliveryDays: 7,
    category: "illustration",
  },
]);

const categories = ref([
  {
    id: "all",
    name: "すべて",
    iconName: "lucide:sparkles",
    count: 2543,
    color: "text-purple-500",
  },
  {
    id: "illustration",
    name: "イラスト",
    iconName: "lucide:brush",
    count: 1234,
    color: "text-pink-500",
  },
  {
    id: "design",
    name: "デザイン",
    iconName: "lucide:camera",
    count: 567,
    color: "text-blue-500",
  },
  {
    id: "voice",
    name: "ボイス",
    iconName: "lucide:mic",
    count: 234,
    color: "text-green-500",
  },
  {
    id: "video",
    name: "動画",
    iconName: "lucide:video",
    count: 156,
    color: "text-orange-500",
  },
]);

const popularTags = ref([
  "VTuber",
  "アニメ風",
  "ロゴ",
  "キャラクター",
  "ナレーション",
  "Live2D",
  "背景",
  "アイコン",
  "イラスト",
  "デザイン",
]);

const notifications = ref([
  {
    id: 1,
    type: "like",
    message: "あなたの作品に❤️がつきました",
    time: "2分前",
    unread: true,
  },
  {
    id: 2,
    type: "order",
    message: "新しい依頼が届きました",
    time: "5分前",
    unread: true,
  },
  {
    id: 3,
    type: "message",
    message: "メッセージが届いています",
    time: "10分前",
    unread: false,
  },
]);

const featuredCreators = ref([
  {
    name: "みお🎨",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616c830645f?w=150&h=150&fit=crop&crop=face",
    specialty: "VTuberアバター",
    followers: 234,
    rating: 4.9,
    minPrice: 5000,
    badge: "人気急上昇",
  },
  {
    name: "ちびまる🌸",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    specialty: "かわいいキャラ",
    followers: 456,
    rating: 5.0,
    minPrice: 3000,
    badge: "満足度No.1",
  },
  {
    name: "デザイン工房K",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "ロゴデザイン",
    followers: 189,
    rating: 4.8,
    minPrice: 8000,
    badge: "プロ認定",
  },
  {
    name: "声優ひなた",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    specialty: "ナレーション",
    followers: 123,
    rating: 4.9,
    minPrice: 2500,
    badge: "新人",
  },
]);

// 計算プロパティ
const filteredWorks = computed(() => {
  return activeCategory.value === "all"
    ? featuredWorks.value
    : featuredWorks.value.filter(
        (work) => work.category === activeCategory.value
      );
});

// メソッド
const toggleLike = (workId) => {
  const newLiked = new Set(likedWorks.value);
  if (newLiked.has(workId)) {
    newLiked.delete(workId);
  } else {
    newLiked.add(workId);
  }
  likedWorks.value = newLiked;
};

const toggleBookmark = (creatorId) => {
  const newBookmarked = new Set(bookmarkedCreators.value);
  if (newBookmarked.has(creatorId)) {
    newBookmarked.delete(creatorId);
  } else {
    newBookmarked.add(creatorId);
  }
  bookmarkedCreators.value = newBookmarked;
};

const searchByTag = (tag) => {
  searchQuery.value = tag;
  // 検索ロジックをここに実装
};

const getBadgeClass = (badge) => {
  const badgeClasses = {
    人気急上昇: "bg-pink-100 text-pink-600",
    "満足度No.1": "bg-yellow-100 text-yellow-600",
    プロ認定: "bg-blue-100 text-blue-600",
    新人: "bg-green-100 text-green-600",
  };
  return badgeClasses[badge] || "bg-gray-100 text-gray-600";
};

// 外部クリックで通知を閉じる
onMounted(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest(".notification-container")) {
      showNotifications.value = false;
    }
  };
  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.notification-container {
  /* クリック外でのクローズ処理用 */
}
</style>
