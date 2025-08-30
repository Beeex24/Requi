<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">通知設定</h2>
      <p class="text-sm text-gray-600">
        メールやプッシュ通知の設定を管理します
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email Notifications -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">メール通知</h3>
        <div class="space-y-3">
          <label class="flex items-start">
            <input
              v-model="form.new_request_email"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">新規リクエスト</span>
              <p class="text-xs text-gray-500">新しいリクエストが届いたときに通知</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.request_update_email"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">リクエスト更新</span>
              <p class="text-xs text-gray-500">リクエストのステータスが変更されたときに通知</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.message_email"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">メッセージ</span>
              <p class="text-xs text-gray-500">新しいメッセージを受信したときに通知</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.promotional_email"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">お知らせ・キャンペーン</span>
              <p class="text-xs text-gray-500">新機能やキャンペーン情報を受け取る</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.weekly_summary_email"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">週次レポート</span>
              <p class="text-xs text-gray-500">週間の活動サマリーを受け取る</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Push Notifications -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">プッシュ通知</h3>
        <div class="space-y-3">
          <label class="flex items-start">
            <input
              v-model="form.browser_notifications"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">ブラウザ通知</span>
              <p class="text-xs text-gray-500">ブラウザでプッシュ通知を受け取る</p>
            </div>
          </label>

          <label class="flex items-start">
            <input
              v-model="form.mobile_notifications"
              type="checkbox"
              class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <div class="ml-3">
              <span class="text-sm font-medium text-gray-700">モバイル通知</span>
              <p class="text-xs text-gray-500">モバイルアプリでプッシュ通知を受け取る</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Notification Frequency -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">通知頻度</h3>
        <select
          v-model="form.notification_frequency"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="realtime">リアルタイム</option>
          <option value="hourly">1時間ごと</option>
          <option value="daily">1日1回</option>
          <option value="weekly">週1回</option>
        </select>
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
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  settings: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update'])

const form = reactive({
  new_request_email: props.settings?.new_request_email ?? true,
  request_update_email: props.settings?.request_update_email ?? true,
  message_email: props.settings?.message_email ?? true,
  promotional_email: props.settings?.promotional_email ?? false,
  weekly_summary_email: props.settings?.weekly_summary_email ?? false,
  browser_notifications: props.settings?.browser_notifications ?? true,
  mobile_notifications: props.settings?.mobile_notifications ?? false,
  notification_frequency: props.settings?.notification_frequency ?? 'realtime'
})

const isSaving = ref(false)

watch(() => props.settings, (newSettings) => {
  if (newSettings) {
    Object.assign(form, newSettings)
  }
}, { deep: true })

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
</script>