<template>
  <div class="min-h-screen bg-gray-50">
    <!-- SEO -->
    <BaseHead 
      title="お問い合わせ - Requi レキ"
      description="Requi レキに関するご質問、ご要望、不具合報告などお気軽にお問い合わせください。24時間以内にご返信いたします。"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Breadcrumb -->
    <AppBreadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          お問い合わせ
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          ご質問、ご要望、不具合報告などお気軽にお問い合わせください
        </p>
        
        <div class="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full">
          <Icon name="lucide:clock" class="w-4 h-4 text-pink-500 mr-2" />
          <span class="text-sm font-medium text-pink-600">通常24時間以内にご返信いたします</span>
        </div>
      </div>
    </section>

    <!-- Contact Methods (Top Section) -->
    <section class="py-8 bg-white border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">お問い合わせ方法</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Email -->
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:mail" class="w-6 h-6 text-blue-500" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">メールサポート</h3>
            <p class="text-gray-600 text-sm mb-4">24時間以内にご返信いたします</p>
            <a 
              href="mailto:support@requi.com"
              class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              support@requi.com
              <Icon name="lucide:external-link" class="w-4 h-4 ml-1" />
            </a>
          </div>

          <!-- Chat -->
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:message-circle" class="w-6 h-6 text-green-500" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">チャットサポート</h3>
            <p class="text-gray-600 text-sm mb-4">平日 10:00-18:00</p>
            <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              チャットを開始
            </button>
          </div>

          <!-- Phone -->
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:phone" class="w-6 h-6 text-orange-500" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">電話サポート</h3>
            <p class="text-gray-600 text-sm mb-4">平日 10:00-17:00</p>
            <p class="text-orange-600 font-medium">03-1234-5678</p>
          </div>
        </div>

        <!-- FAQ Link -->
        <div class="text-center mt-8">
          <p class="text-gray-600 mb-4">お問い合わせ前にFAQもご確認ください</p>
          <NuxtLink 
            to="/faq"
            class="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            よくある質問を見る
            <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">お問い合わせフォーム</h2>
            <p class="text-gray-600 mb-8">
              下記フォームにご記入の上、送信してください。内容を確認次第、担当者よりご連絡いたします。
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Contact Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  お問い合わせ種類 <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button
                    v-for="type in contactTypes"
                    :key="type.id"
                    type="button"
                    @click="formData.type = type.id"
                    :class="`relative rounded-lg border-2 p-3 text-center hover:shadow-md transition-all ${
                      formData.type === type.id 
                        ? `border-${type.color}-500 bg-${type.color}-50` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`"
                  >
                    <Icon :name="type.icon" :class="`w-5 h-5 mx-auto mb-1 text-${type.color}-500`" />
                    <div class="text-sm font-medium text-gray-900">{{ type.label }}</div>
                    <div 
                      v-if="formData.type === type.id"
                      :class="`absolute top-2 right-2 w-4 h-4 bg-${type.color}-500 rounded-full flex items-center justify-center`"
                    >
                      <Icon name="lucide:check" class="w-2.5 h-2.5 text-white" />
                    </div>
                  </button>
                </div>
              </div>

              <!-- User Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    お名前 <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    placeholder="山田 太郎"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                  件名 <span class="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  v-model="formData.subject"
                  type="text"
                  required
                  placeholder="お問い合わせの件名を入力してください"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <!-- Priority -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  緊急度
                </label>
                <div class="flex space-x-4">
                  <label
                    v-for="priority in priorities"
                    :key="priority.value"
                    class="flex items-center"
                  >
                    <input
                      v-model="formData.priority"
                      type="radio"
                      :value="priority.value"
                      class="text-pink-600 focus:ring-pink-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">{{ priority.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                  お問い合わせ内容 <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="6"
                  required
                  placeholder="お問い合わせ内容を詳しくお聞かせください&#13;&#10;&#13;&#10;【不具合報告の場合】&#13;&#10;・発生した日時&#13;&#10;・使用していたブラウザ・デバイス&#13;&#10;・エラーメッセージ&#13;&#10;・操作手順&#13;&#10;&#13;&#10;などもご記載いただけると、より迅速に対応できます。"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                ></textarea>
                <p class="mt-1 text-xs text-gray-500">
                  {{ formData.message.length }}/1000文字
                </p>
              </div>

              <!-- File Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  添付ファイル（任意）
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    class="hidden"
                    @change="handleFileUpload"
                  />
                  <Icon name="lucide:upload" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p class="text-gray-600">
                    <button
                      type="button"
                      @click="$refs.fileInput.click()"
                      class="text-pink-600 hover:text-pink-700 font-medium"
                    >
                      ファイルを選択
                    </button>
                    またはドラッグ&ドロップ
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    画像、PDF、Word文書（最大5MB、5ファイルまで）
                  </p>
                </div>

                <!-- Uploaded Files -->
                <div v-if="uploadedFiles.length > 0" class="mt-3 space-y-2">
                  <div
                    v-for="(file, index) in uploadedFiles"
                    :key="index"
                    class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                  >
                    <div class="flex items-center space-x-2">
                      <Icon name="lucide:file" class="w-4 h-4 text-gray-500" />
                      <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                      <span class="text-xs text-gray-500">({{ formatFileSize(file.size) }})</span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile(index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <Icon name="lucide:x" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Agreement -->
              <div class="flex items-start space-x-3">
                <input
                  v-model="formData.agreeToPrivacy"
                  type="checkbox"
                  required
                  class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <label class="text-sm text-gray-600">
                  <NuxtLink to="/privacy" class="text-pink-600 hover:text-pink-700 underline">プライバシーポリシー</NuxtLink>
                  に同意の上、送信します <span class="text-red-500">*</span>
                </label>
              </div>

              <!-- Error Message -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  <div class="flex items-center">
                    <Icon name="lucide:alert-circle" class="w-4 h-4 mr-2" />
                    {{ errorMessage }}
                  </div>
                </div>
              </Transition>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="isSubmitting || !isFormValid"
                  class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isSubmitting" class="flex items-center">
                    <Icon name="lucide:send" class="w-4 h-4 mr-2" />
                    送信する
                  </span>
                  <span v-else class="flex items-center">
                    <Icon name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
                    送信中...
                  </span>
                </button>
              </div>
            </form>
          </div>

      <!-- Additional Info -->
      <section class="mt-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Business Hours -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Icon name="lucide:clock" class="w-5 h-5 text-blue-500" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">サポート時間</h3>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">メールサポート</span>
                <span class="font-medium text-gray-900">24時間受付</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">チャット・電話</span>
                <span class="font-medium text-gray-900">平日 10:00-18:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">返信目安</span>
                <span class="font-medium text-gray-900">24時間以内</span>
              </div>
            </div>
          </div>

          <!-- Response Time -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Icon name="lucide:headphones" class="w-5 h-5 text-green-500" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">対応言語・方法</h3>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500" />
                <span class="text-gray-700">日本語対応</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500" />
                <span class="text-gray-700">メール・チャット・電話</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500" />
                <span class="text-gray-700">画面共有サポート対応</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <AppFooter />

    <!-- Success Modal -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="showSuccessModal = false"></div>
        <div class="relative bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:check-circle" class="w-8 h-8 text-green-500" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            送信完了
          </h3>
          <p class="text-gray-600 mb-6">
            お問い合わせありがとうございます。<br>
            24時間以内にご返信いたします。
          </p>
          <button
            @click="resetForm"
            class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            閉じる
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// パンくずナビゲーション
const breadcrumbs = ref([
  { name: 'お問い合わせ' }
])

// フォームデータ
const formData = ref({
  type: 'general',
  name: '',
  email: '',
  subject: '',
  message: '',
  priority: 'normal',
  agreeToPrivacy: false
})

// UI状態
const isSubmitting = ref(false)
const errorMessage = ref('')
const showSuccessModal = ref(false)
const uploadedFiles = ref([])

// お問い合わせ種類
const contactTypes = ref([
  { id: 'general', label: '一般的な質問', icon: 'lucide:help-circle', color: 'blue' },
  { id: 'bug', label: '不具合報告', icon: 'lucide:bug', color: 'red' },
  { id: 'feature', label: '機能要望', icon: 'lucide:lightbulb', color: 'yellow' },
  { id: 'account', label: 'アカウント', icon: 'lucide:user', color: 'green' },
  { id: 'payment', label: 'お支払い', icon: 'lucide:credit-card', color: 'purple' },
  { id: 'other', label: 'その他', icon: 'lucide:message-square', color: 'gray' }
])

// 緊急度
const priorities = ref([
  { value: 'low', label: '低' },
  { value: 'normal', label: '普通' },
  { value: 'high', label: '高' },
  { value: 'urgent', label: '緊急' }
])

// 計算プロパティ
const isFormValid = computed(() => {
  return (
    formData.value.type &&
    formData.value.name.trim() &&
    formData.value.email.trim() &&
    formData.value.subject.trim() &&
    formData.value.message.trim() &&
    formData.value.agreeToPrivacy
  )
})

// メソッド
const handleSubmit = async () => {
  if (!isFormValid.value) return

  errorMessage.value = ''
  isSubmitting.value = true

  try {
    // APIコール（モック）
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', {
      ...formData.value,
      files: uploadedFiles.value
    })

    showSuccessModal.value = true
  } catch (error) {
    errorMessage.value = '送信に失敗しました。しばらく時間をおいて再度お試しください。'
  } finally {
    isSubmitting.value = false
  }
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    if (uploadedFiles.value.length >= 5) {
      alert('ファイルは最大5個までアップロードできます')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズは5MB以下にしてください')
      return
    }
    
    uploadedFiles.value.push(file)
  })
  
  // Clear input
  event.target.value = ''
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const resetForm = () => {
  showSuccessModal.value = false
  formData.value = {
    type: 'general',
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal',
    agreeToPrivacy: false
  }
  uploadedFiles.value = []
  errorMessage.value = ''
}
</script>