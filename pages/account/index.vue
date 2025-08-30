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
                  <span 
                    v-if="item.badge"
                    class="ml-auto px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full"
                  >
                    {{ item.badge }}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="lg:col-span-9">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Profile Tab -->
            <ProfileSettings 
              v-show="activeTab === 'profile'"
              :profile-data="profileData"
              @update="handleProfileUpdate"
              @avatar-change="handleAvatarChange"
            />

            <!-- Account Tab -->
            <AccountSettings
              v-show="activeTab === 'account'"
              :user="user"
              @password-change="handlePasswordChange"
              @email-change="handleEmailChange"
              @delete-account="handleAccountDelete"
            />

            <!-- Creator Settings Tab -->
            <CreatorSettings
              v-if="profileData?.account_type === 'creator'"
              v-show="activeTab === 'creator'"
              :creator-data="creatorData"
              @update="handleCreatorSettingsUpdate"
            />

            <!-- Notifications Tab -->
            <NotificationSettings
              v-show="activeTab === 'notifications'"
              :settings="notificationSettings"
              @update="handleNotificationSettingsUpdate"
            />

            <!-- Privacy Tab -->
            <PrivacySettings
              v-show="activeTab === 'privacy'"
              :settings="privacySettings"
              @update="handlePrivacySettingsUpdate"
            />

            <!-- Billing Tab -->
            <BillingSettings
              v-show="activeTab === 'billing'"
              :billing-data="billingData"
              @update="handleBillingUpdate"
            />
          </div>
        </main>
      </div>
    </div>

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
const { $supabase } = useNuxtApp()

// State
const loading = ref(true)
const activeTab = ref('profile')
const profileData = ref(null)
const creatorData = ref(null)
const notificationSettings = ref(null)
const privacySettings = ref(null)
const billingData = ref(null)

// Navigation items
const navigationItems = ref([
  { id: 'profile', label: 'プロフィール', icon: 'lucide:user' },
  { id: 'account', label: 'アカウント', icon: 'lucide:settings' },
  { id: 'notifications', label: '通知', icon: 'lucide:bell' },
  { id: 'privacy', label: 'プライバシー', icon: 'lucide:shield' },
  { id: 'billing', label: '請求と支払い', icon: 'lucide:credit-card' },
])

// Notification
const notification = ref({
  show: false,
  type: 'info',
  title: '',
  message: ''
})

// Load user data
const loadUserData = async () => {
  try {
    loading.value = true
    
    if (!user.value) return
    
    // プロフィールデータ取得
    const { data: profile } = await $supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.value.id)
      .single()
    
    profileData.value = profile
    
    // クリエイターの場合、追加データを取得
    if (profile?.account_type === 'creator') {
      // クリエイター設定タブを追加
      if (!navigationItems.value.find(item => item.id === 'creator')) {
        navigationItems.value.splice(2, 0, {
          id: 'creator',
          label: 'クリエイター設定',
          icon: 'lucide:palette'
        })
      }
      
      const { data: creator } = await $supabase
        .from('creator_profiles')
        .select('*')
        .eq('user_id', user.value.id)
        .single()
      
      creatorData.value = creator
    }
    
    // 通知設定取得
    const { data: notifications } = await $supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', user.value.id)
      .single()
    
    notificationSettings.value = notifications
    
    // プライバシー設定取得
    const { data: privacy } = await $supabase
      .from('privacy_settings')
      .select('*')
      .eq('user_id', user.value.id)
      .single()
    
    privacySettings.value = privacy
    
    // 請求情報取得
    const { data: billing } = await $supabase
      .from('billing_info')
      .select('*')
      .eq('user_id', user.value.id)
      .single()
    
    billingData.value = billing
    
  } catch (error) {
    console.error('データ取得エラー:', error)
    showNotification('error', 'エラー', 'データの取得に失敗しました')
  } finally {
    loading.value = false
  }
}

// Handlers
const handleProfileUpdate = async (data) => {
  try {
    const { error } = await $supabase
      .from('user_profiles')
      .update(data)
      .eq('user_id', user.value.id)
    
    if (error) throw error
    
    showNotification('success', '保存完了', 'プロフィールを更新しました')
    await loadUserData()
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handleAvatarChange = async (file) => {
  try {
    // アバター画像をアップロード
    const fileName = `${user.value.id}-${Date.now()}.${file.name.split('.').pop()}`
    const { error: uploadError } = await $supabase.storage
      .from('avatars')
      .upload(fileName, file)
    
    if (uploadError) throw uploadError
    
    // 公開URLを取得
    const { data: urlData } = $supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)
    
    // プロフィールを更新
    await handleProfileUpdate({ avatar_url: urlData.publicUrl })
    
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handlePasswordChange = async (newPassword) => {
  try {
    const { error } = await $supabase.auth.updateUser({
      password: newPassword
    })
    
    if (error) throw error
    
    showNotification('success', '成功', 'パスワードを変更しました')
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handleEmailChange = async (newEmail) => {
  try {
    const { error } = await $supabase.auth.updateUser({
      email: newEmail
    })
    
    if (error) throw error
    
    showNotification('success', '成功', '確認メールを送信しました')
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handleAccountDelete = async () => {
  try {
    // アカウント削除処理
    const { error } = await $supabase.rpc('delete_user_account', {
      user_id: user.value.id
    })
    
    if (error) throw error
    
    await $supabase.auth.signOut()
    await navigateTo('/')
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handleCreatorSettingsUpdate = async (data) => {
  try {
    const { error } = await $supabase
      .from('creator_profiles')
      .upsert({
        user_id: user.value.id,
        ...data
      })
    
    if (error) throw error
    
    showNotification('success', '保存完了', 'クリエイター設定を更新しました')
    await loadUserData()
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handleNotificationSettingsUpdate = async (data) => {
  try {
    const { error } = await $supabase
      .from('notification_settings')
      .upsert({
        user_id: user.value.id,
        ...data
      })
    
    if (error) throw error
    
    showNotification('success', '保存完了', '通知設定を更新しました')
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handlePrivacySettingsUpdate = async (data) => {
  try {
    const { error } = await $supabase
      .from('privacy_settings')
      .upsert({
        user_id: user.value.id,
        ...data
      })
    
    if (error) throw error
    
    showNotification('success', '保存完了', 'プライバシー設定を更新しました')
  } catch (error) {
    showNotification('error', 'エラー', error.message)
  }
}

const handleBillingUpdate = async (data) => {
  try {
    const { error } = await $supabase
      .from('billing_info')
      .upsert({
        user_id: user.value.id,
        ...data
      })
    
    if (error) throw error
    
    showNotification('success', '保存完了', '請求情報を更新しました')
  } catch (error) {
    showNotification('error', 'エラー', error.message)
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