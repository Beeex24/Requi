<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">プライバシー設定</h2>
      <p class="text-sm text-gray-600">
        プロフィールの公開範囲やプライバシーに関する設定を管理します
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Profile Visibility -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">プロフィールの公開設定</h3>
        <div class="space-y-3">
          <label class="flex items-start">
            <input
              v-model="form.profile_visible"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">プロフィールを公開</span>
              <p class="text-xs text-gray-500">他のユーザーがあなたのプロフィールを閲覧できます</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.searchable"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">検索結果に表示</span>
              <p class="text-xs text-gray-500">ユーザー検索の結果に表示されます</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.show_works"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">作品を公開</span>
              <p class="text-xs text-gray-500">プロフィールページで作品一覧を表示</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.show_followers"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">フォロワー数を表示</span>
              <p class="text-xs text-gray-500">フォロワー数を他のユーザーに公開</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Communication Settings -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">コミュニケーション設定</h3>
        <div class="space-y-3">
          <label class="flex items-start">
            <input
              v-model="form.allow_messages"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">メッセージを受信</span>
              <p class="text-xs text-gray-500">他のユーザーからメッセージを受け取る</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.allow_requests"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">リクエストを受信</span>
              <p class="text-xs text-gray-500">作品制作のリクエストを受け付ける</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Blocked Users -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">ブロックリスト</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div v-if="blockedUsers.length === 0" class="text-center text-gray-500 text-sm">
            ブロックしているユーザーはいません
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="user in blockedUsers"
              :key="user.id"
              class="flex items-center justify-between bg-white p-3 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <img
                  :src="user.avatar_url || `https://ui-avatars.com/api/?name=${user.display_name}`"
                  :alt="user.display_name"
                  class="w-8 h-8 rounded-full"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ user.display_name }}</p>
                  <p class="text-xs text-gray-500">@{{ user.username }}</p>
                </div>
              </div>
              <button
                type="button"
                @click="unblockUser(user.id)"
                class="text-sm text-red-600 hover:text-red-700"
              >
                ブロック解除
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Export -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">データ管理</h3>
        <div class="space-y-3">
          <button
            type="button"
            @click="exportData"
            class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <Icon name="lucide:download" class="w-4 h-4 inline-block mr-2" />
            データをエクスポート
          </button>
          <button
            type="button"
            @click="showDeleteModal = true"
            class="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <Icon name="lucide:trash-2" class="w-4 h-4 inline-block mr-2" />
            アカウントを削除
          </button>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="resetForm"
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
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  settings: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update'])

const { $supabase } = useNuxtApp()
const { user } = useAuth()

const form = reactive({
  profile_visible: props.settings?.profile_visible ?? true,
  searchable: props.settings?.searchable ?? true,
  show_works: props.settings?.show_works ?? true,
  show_followers: props.settings?.show_followers ?? true,
  allow_messages: props.settings?.allow_messages ?? true,
  allow_requests: props.settings?.allow_requests ?? true
})

const blockedUsers = ref([])
const isSaving = ref(false)
const showDeleteModal = ref(false)

// Load blocked users
const loadBlockedUsers = async () => {
  const { data } = await $supabase
    .from('blocked_users')
    .select(`
      blocked_user_id,
      blocked_user:user_profiles!blocked_user_id (
        id,
        display_name,
        username,
        avatar_url
      )
    `)
    .eq('user_id', user.value?.id)
  
  if (data) {
    blockedUsers.value = data.map(item => item.blocked_user)
  }
}

const unblockUser = async (userId) => {
  await $supabase
    .from('blocked_users')
    .delete()
    .eq('user_id', user.value?.id)
    .eq('blocked_user_id', userId)
  
  await loadBlockedUsers()
}

const exportData = async () => {
  // データエクスポート処理
  alert('データエクスポート機能は準備中です')
}

const handleSubmit = () => {
  isSaving.value = true
  emit('update', form)
  setTimeout(() => {
    isSaving.value = false
  }, 1000)
}

const resetForm = () => {
  Object.assign(form, props.settings || {})
}

onMounted(() => {
  loadBlockedUsers()
})
</script>