<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
    <!-- SEO -->
    <BaseHead 
      title="アカウント登録 - Requi レキ"
      description="Requi レキに登録して、素敵なクリエイターに作品制作を依頼しましょう。登録は無料で簡単です。"
    />

    <!-- Simple Header -->
    <header class="bg-white/70 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Icon name="lucide:sparkles" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Requi レキ
            </span>
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">すでにアカウントをお持ちですか？</span>
            <NuxtLink 
              to="/login"
              class="text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              ログイン
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Registration Form -->
    <div class="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <!-- Welcome Message -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:user-plus" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            アカウント登録
          </h1>
          <p class="text-gray-600">
            無料で簡単に始められます
          </p>
        </div>

        <!-- Registration Form Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form @submit.prevent="handleSignup" class="space-y-6">
            <!-- Account Type Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                アカウントタイプ
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="accountType = 'client'"
                  :class="`relative rounded-lg border-2 p-4 text-center hover:shadow-md transition-all ${
                    accountType === 'client' 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 hover:border-pink-300'
                  }`"
                >
                  <Icon name="lucide:shopping-bag" class="w-6 h-6 mx-auto mb-2 text-pink-500" />
                  <div class="text-sm font-medium text-gray-900">依頼者</div>
                  <div class="text-xs text-gray-500 mt-1">作品を依頼する</div>
                  <div 
                    v-if="accountType === 'client'"
                    class="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="lucide:check" class="w-3 h-3 text-white" />
                  </div>
                </button>
                
                <button
                  type="button"
                  @click="accountType = 'creator'"
                  :class="`relative rounded-lg border-2 p-4 text-center hover:shadow-md transition-all ${
                    accountType === 'creator' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`"
                >
                  <Icon name="lucide:palette" class="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div class="text-sm font-medium text-gray-900">クリエイター</div>
                  <div class="text-xs text-gray-500 mt-1">作品を制作する</div>
                  <div 
                    v-if="accountType === 'creator'"
                    class="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="lucide:check" class="w-3 h-3 text-white" />
                  </div>
                </button>
              </div>
            </div>

            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                ユーザー名
              </label>
              <div class="relative">
                <Icon name="lucide:user" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  v-model="formData.username"
                  type="text"
                  required
                  placeholder="requi_user"
                  class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  @input="checkUsername"
                />
              </div>
              <p v-if="usernameError" class="mt-1 text-sm text-red-600">
                {{ usernameError }}
              </p>
              <p v-else class="mt-1 text-xs text-gray-500">
                半角英数字とアンダースコア(_)が使用できます
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <div class="relative">
                <Icon name="lucide:mail" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <div class="relative">
                <Icon name="lucide:lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="8文字以上"
                  class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                </button>
              </div>
              <div class="mt-2">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      :class="`h-2 rounded-full transition-all ${passwordStrengthClass}`"
                      :style="{ width: `${passwordStrength}%` }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500">{{ passwordStrengthText }}</span>
                </div>
              </div>
            </div>

            <!-- Password Confirmation -->
            <div>
              <label for="password-confirm" class="block text-sm font-medium text-gray-700 mb-1">
                パスワード（確認）
              </label>
              <div class="relative">
                <Icon name="lucide:lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password-confirm"
                  v-model="formData.passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  required
                  placeholder="もう一度入力"
                  class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  type="button"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon :name="showPasswordConfirm ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                </button>
              </div>
              <p v-if="passwordMatchError" class="mt-1 text-sm text-red-600">
                パスワードが一致しません
              </p>
            </div>

            <!-- Terms and Conditions -->
            <div>
              <label class="flex items-start">
                <input
                  v-model="formData.agreeToTerms"
                  type="checkbox"
                  required
                  class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span class="ml-2 text-sm text-gray-600">
                  <NuxtLink to="/terms" class="text-pink-600 hover:text-pink-700 underline">利用規約</NuxtLink>
                  と
                  <NuxtLink to="/privacy" class="text-pink-600 hover:text-pink-700 underline">プライバシーポリシー</NuxtLink>
                  に同意します
                </span>
              </label>
            </div>

            <!-- Email Newsletter -->
            <div>
              <label class="flex items-start">
                <input
                  v-model="formData.newsletter"
                  type="checkbox"
                  class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span class="ml-2 text-sm text-gray-600">
                  新機能やお得な情報をメールで受け取る
                </span>
              </label>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="isSubmitting || !isFormValid"
                class="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubmitting">アカウントを作成</span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="lucide:loader-2" class="w-5 h-5 mr-2 animate-spin" />
                  作成中...
                </span>
              </button>
            </div>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>

            <!-- Social Login -->
            <div class="space-y-3">
              <button
                type="button"
                @click="handleGoogleSignup"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
              >
                <Icon name="flat-color-icons:google" class="w-5 h-5 mr-2" />
                <span class="text-gray-700">Googleで登録</span>
              </button>
              
              <button
                type="button"
                @click="handleTwitterSignup"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
              >
                <Icon name="lucide:twitter" class="w-5 h-5 mr-2 text-blue-400" />
                <span class="text-gray-700">Twitterで登録</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Footer Links -->
        <div class="text-center mt-8">
          <p class="text-sm text-gray-600">
            登録することで、あなたは18歳以上であることを確認します
          </p>
          <div class="mt-4 flex justify-center space-x-4 text-sm">
            <NuxtLink to="/help" class="text-gray-600 hover:text-pink-600">
              ヘルプ
            </NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/contact" class="text-gray-600 hover:text-pink-600">
              お問い合わせ
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

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
            登録完了！
          </h3>
          <p class="text-gray-600 mb-6">
            {{ formData.email }} に確認メールを送信しました。<br>
            メール内のリンクをクリックして登録を完了してください。
          </p>
          <button
            @click="redirectToLogin"
            class="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            ログインページへ
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const formData = ref({
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  agreeToTerms: false,
  newsletter: false
})

// UI state
const accountType = ref('client')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

// Validation state
const usernameError = ref('')
const passwordMatchError = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  const password = formData.value.password
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 8) strength += 25
  if (password.length >= 12) strength += 25
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 12.5
  if (/[^A-Za-z0-9]/.test(password)) strength += 12.5
  
  return Math.min(100, strength)
})

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  if (strength < 33) return 'bg-red-500'
  if (strength < 67) return 'bg-yellow-500'
  return 'bg-green-500'
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength < 33) return '弱い'
  if (strength < 67) return '普通'
  return '強い'
})

// Form validation
const isFormValid = computed(() => {
  return (
    formData.value.username.length >= 3 &&
    !usernameError.value &&
    formData.value.email &&
    formData.value.password.length >= 8 &&
    formData.value.password === formData.value.passwordConfirm &&
    formData.value.agreeToTerms
  )
})

// Watch for password confirmation
watch(() => formData.value.passwordConfirm, (newVal) => {
  if (newVal && formData.value.password !== newVal) {
    passwordMatchError.value = true
  } else {
    passwordMatchError.value = false
  }
})

// Methods
const checkUsername = () => {
  const username = formData.value.username
  if (username.length < 3) {
    usernameError.value = 'ユーザー名は3文字以上必要です'
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    usernameError.value = '半角英数字とアンダースコアのみ使用できます'
  } else {
    usernameError.value = ''
    // Here you would typically check if username is available via API
  }
}

const handleSignup = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Here you would make actual API call to create account
  console.log('Creating account:', {
    accountType: accountType.value,
    ...formData.value
  })
  
  isSubmitting.value = false
  showSuccessModal.value = true
}

const handleGoogleSignup = () => {
  // Implement Google OAuth signup
  console.log('Google signup')
}

const handleTwitterSignup = () => {
  // Implement Twitter OAuth signup
  console.log('Twitter signup')
}

const redirectToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>