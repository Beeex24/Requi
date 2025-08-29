<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="アカウント設定 - Requi レキ"
      description="プロフィール情報の編集、セキュリティ設定、通知設定などアカウントの管理ができます。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <AppLoader message="読み込み中..." />
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <!-- Sidebar Navigation -->
        <aside class="lg:col-span-3 mb-6 lg:mb-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
            <div class="p-6">
              <!-- User Info Summary -->
              <div class="flex items-center space-x-3 mb-6">
                <div class="relative">
                  <img 
                    :src="profileData?.avatar_url || `https://ui-avatars.com/api/?name=${profileData?.display_name}`"
                    :alt="profileData?.display_name"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                  <div 
                    v-if="profileData?.account_type === 'creator'"
                    class="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="lucide:check" class="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ profileData?.display_name }}</div>
                  <div class="text-xs text-gray-500">@{{ profileData?.username }}</div>
                </div>
              </div>

              <!-- Navigation Menu -->
              <nav class="space-y-1">
                <button
                  v-for="item in navigationItems"
                  :key="item.id"
                  @click="activeTab = item.id"
                  :class="`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`"
                >
                  <Icon :name="item.icon" class="w-5 h-5" />
                  <span class="text-sm font-medium">{{ item.label }}</span>
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="lg:col-span-9">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Profile Tab -->
            <div v-show="activeTab === 'profile'" class="p-6">
              <div class="mb-6">
                <h2 class="text-xl font-bold text-gray-900 mb-2">プロフィール設定</h2>
                <p class="text-sm text-gray-600">
                  公開されるプロフィール情報を編集できます
                </p>
              </div>

              <form @submit.prevent="handleProfileUpdate" class="space-y-6">
                <!-- Avatar Upload -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    プロフィール画像
                  </label>
                  <div class="flex items-center space-x-4">
                    <div class="relative">
                      <img 
                        :src="profileForm.avatar_url || `https://ui-avatars.com/api/?name=${profileForm.display_name}`"
                        alt="Avatar"
                        class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        @click="$refs.avatarInput.click()"
                        class="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Icon name="lucide:camera" class="w-4 h-4 text-gray-600" />
                      </button>
                      <input 
                        ref="avatarInput"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="handleAvatarChange"
                      />
                    </div>
                    <div class="text-sm text-gray-600">
                      <p>JPG、PNG、GIF、WebP形式</p>
                      <p>最大5MB</p>
                    </div>
                  </div>
                </div>

                <!-- Display Name -->
                <div>
                  <label for="displayName" class="block text-sm font-medium text-gray-700 mb-1">
                    表示名
                  </label>
                  <input
                    id="displayName"
                    v-model="profileForm.display_name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>

                <!-- Username -->
                <div>
                  <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                    ユーザー名
                  </label>
                  <div class="flex">
                    <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      requi.com/@
                    </span>
                    <input
                      id="username"
                      v-model="profileForm.username"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="username"
                    />
                  </div>
                </div>

                <!-- Bio -->
                <div>
                  <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">
                    自己紹介
                  </label>
                  <textarea
                    id="bio"
                    v-model="profileForm.bio"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="あなたについて教えてください"
                  ></textarea>
                </div>

                <!-- Social Links -->
                <div class="space-y-4">
                  <h3 class="text-sm font-medium text-gray-700">ソーシャルメディア</h3>
                  
                  <div>
                    <label for="website" class="block text-sm text-gray-600 mb-1">
                      ウェブサイト
                    </label>
                    <input
                      id="website"
                      v-model="profileForm.website"
                      type="url"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label for="twitter" class="block text-sm text-gray-600 mb-1">
                      Twitter
                    </label>
                    <input
                      id="twitter"
                      v-model="profileForm.twitter"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <label for="instagram" class="block text-sm text-gray-600 mb-1">
                      Instagram
                    </label>
                    <input
                      id="instagram"
                      v-model="profileForm.instagram"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="@username"
                    />
                  </div>
                </div>

                <!-- Save Button -->
                <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    @click="resetProfileForm"
                    class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    :disabled="isSaving"
                    class="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="!isSaving">保存する</span>
                    <span v-else class="flex items-center">
                      <Icon name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
                      保存中...
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Account Tab -->
            <div v-show="activeTab === 'account'" class="p-6">
              <div class="mb-6">
                <h2 class="text-xl font-bold text-gray-900 mb-2">アカウント設定</h2>
                <p class="text-sm text-gray-600">
                  メールアドレスやパスワードなどの基本情報を管理します
                </p>
              </div>

              <div class="space-y-6">
                <!-- Email -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-sm font-medium text-gray-700">メールアドレス</h3>
                      <p class="mt-1 text-sm text-gray-900">{{ user?.email }}</p>
                    </div>
                    <button
                      @click="showEmailModal = true"
                      class="text-sm text-pink-600 hover:text-pink-700"
                    >
                      変更
                    </button>
                  </div>
                </div>

                <!-- Password -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-sm font-medium text-gray-700">パスワード</h3>
                      <p class="mt-1 text-sm text-gray-500">
                        セキュリティのため定期的に変更することをお勧めします
                      </p>
                    </div>
                    <button
                      @click="showPasswordModal = true"
                      class="text-sm text-pink-600 hover:text-pink-700"
                    >
                      変更
                    </button>
                  </div>
                </div>

                <!-- Delete Account -->
                <div class="pt-6 border-t border-gray-200">
                  <h3 class="text-sm font-medium text-red-600 mb-2">アカウントの削除</h3>
                  <p class="text-sm text-gray-600 mb-4">
                    アカウントを削除すると、すべてのデータが完全に削除され、復元することはできません。
                  </p>
                  <button
                    @click="showDeleteModal = true"
                    class="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    アカウントを削除
                  </button>
                </div>
              </div>
            </div>

            <!-- Creator Settings Tab (クリエイターのみ) -->
            <div v-if="profileData?.account_type === 'creator'" v-show="activeTab === 'creator'" class="p-6">
              <CreatorSettings @save="handleCreatorSettingsSave" />
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Modals -->
    <PasswordChangeModal 
      v-if="showPasswordModal"
      @close="showPasswordModal = false"
      @save="handlePasswordChange"
    />

    <EmailChangeModal 
      v-if="showEmailModal"
      @close="showEmailModal = false"
      @save="handleEmailChange"
    />

    <DeleteAccountModal 
      v-if="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="handleAccountDelete"
    />

    <!-- Notifications -->
    <AppNotification
      v-if="notification.show"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      @close="hideNotification"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// ミドルウェア適用
definePageMeta({
  middleware: 'auth'
})

// Composables
const { user, userProfile } = useAuth()
const { 
  updateProfile, 
  uploadAvatar, 
  updateCreatorSettings,
  deleteAccount 
} = useProfile()

// State
const loading = ref(true)
const activeTab = ref('profile')
const isSaving = ref(false)
const profileData = ref(null)
const creatorData = ref(null)

// Forms
const profileForm = reactive({
  display_name: '',
  username: '',
  bio: '',
  website: '',
  twitter: '',
  instagram: '',
  location: '',
  avatar_url: ''
})

// Modals
const showPasswordModal = ref(false)
const showEmailModal = ref(false)
const showDeleteModal = ref(false)

// Notification
const notification = ref({
  show: false,
  type: 'info',
  title: '',
  message: ''
})

// Navigation items
const navigationItems = ref([
  { id: 'profile', label: 'プロフィール', icon: 'lucide:user' },
  { id: 'account', label: 'アカウント', icon: 'lucide:settings' },
  { id: 'notifications', label: '通知', icon: 'lucide:bell' },
  { id: 'privacy', label: 'プライバシー', icon: 'lucide:shield' },
])

// Add creator tab if user is creator
if (userProfile.value?.account_type === 'creator') {
  navigationItems.value.push({
    id: 'creator',
    label: 'クリエイター設定',
    icon: 'lucide:palette'
  })
}

// Methods
const loadUserData = async () => {
  try {
    loading.value = true
    const { $supabase } = useNuxtApp()
    
    if (!user.value) return
    
    // プロフィールデータ取得
    const { data: profile } = await $supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.value.id)
      .single()
    
    profileData.value = profile
    
    // フォームに現在の値をセット
    if (profile) {
      Object.keys(profileForm).forEach(key => {
        if (profile[key] !== undefined) {
          profileForm[key] = profile[key]
        }
      })
    }
    
    // クリエイターの場合、追加データを取得
    if (profile?.account_type === 'creator') {
      const { data: creator } = await $supabase
        .from('creator_profiles')
        .select('*')
        .eq('user_id', user.value.id)
        .single()
      
      creatorData.value = creator
    }
  } catch (error) {
    console.error('データ取得エラー:', error)
    showNotification('error', 'エラー', 'データの取得に失敗しました')
  } finally {
    loading.value = false
  }
}

const handleProfileUpdate = async () => {
  isSaving.value = true
  
  const result = await updateProfile(profileForm)
  
  if (result.success) {
    showNotification('success', '保存完了', 'プロフィールを更新しました')
    await loadUserData()
  } else {
    showNotification('error', 'エラー', result.error)
  }
  
  isSaving.value = false
}

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const result = await uploadAvatar(file)
  
  if (result.success) {
    profileForm.avatar_url = result.url
    showNotification('success', '成功', 'プロフィール画像をアップロードしました')
  } else {
    showNotification('error', 'エラー', result.error)
  }
}

const handlePasswordChange = async (newPassword) => {
  const { updatePassword } = useAuth()
  const result = await updatePassword(newPassword)
  
  if (result.success) {
    showNotification('success', '成功', 'パスワードを変更しました')
    showPasswordModal.value = false
  } else {
    showNotification('error', 'エラー', result.error)
  }
}

const handleEmailChange = async (newEmail) => {
  const { updateEmail } = useAuth()
  const result = await updateEmail(newEmail)
  
  if (result.success) {
    showNotification('success', '成功', '確認メールを送信しました')
    showEmailModal.value = false
  } else {
    showNotification('error', 'エラー', result.error)
  }
}

const handleAccountDelete = async () => {
  const result = await deleteAccount()
  
  if (result.success) {
    await navigateTo('/')
  } else {
    showNotification('error', 'エラー', result.error)
  }
}

const handleCreatorSettingsSave = async (settings) => {
  const result = await updateCreatorSettings(settings)
  
  if (result.success) {
    showNotification('success', '保存完了', 'クリエイター設定を更新しました')
  } else {
    showNotification('error', 'エラー', result.error)
  }
}

const resetProfileForm = () => {
  if (profileData.value) {
    Object.keys(profileForm).forEach(key => {
      if (profileData.value[key] !== undefined) {
        profileForm[key] = profileData.value[key]
      }
    })
  }
}

const showNotification = (type, title, message) => {
  notification.value = {
    show: true,
    type,
    title,
    message
  }
}

const hideNotification = () => {
  notification.value.show = false
}

// Lifecycle
onMounted(() => {
  loadUserData()
})
</script>