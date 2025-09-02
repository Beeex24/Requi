<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
    <!-- SEO -->
    <BaseHead 
      title="ログイン - Requi レキ"
      description="Requi レキにログインして、素敵な作品の依頼や制作を始めましょう。"
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
            <span class="text-sm text-gray-600">アカウントをお持ちでない方</span>
            <NuxtLink 
              to="/signup"
              class="text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              アカウント登録
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Login Form -->
    <div class="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <!-- Welcome Back Message -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:log-in" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            おかえりなさい
          </h1>
          <p class="text-gray-600">
            アカウントにログインしてください
          </p>
        </div>

        <!-- Login Form Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email or Username -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス または ユーザー名
              </label>
              <div class="relative">
                <Icon name="lucide:user" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  v-model="formData.email"
                  type="text"
                  required
                  placeholder="you@example.com または username"
                  class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  @keydown.enter="handleLogin"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700">
                  パスワード
                </label>
                <NuxtLink 
                  to="/forgot-password"
                  class="text-sm text-pink-600 hover:text-pink-700"
                >
                  パスワードを忘れた方
                </NuxtLink>
              </div>
              <div class="relative">
                <Icon name="lucide:lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="パスワードを入力"
                  class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  @keydown.enter="handleLogin"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  v-model="formData.rememberMe"
                  type="checkbox"
                  class="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span class="ml-2 text-sm text-gray-600">ログイン状態を保持</span>
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
            <div>
              <button
                type="submit"
                :disabled="isSubmitting || !formData.email || !formData.password"
                class="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubmitting">ログイン</span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="lucide:loader-2" class="w-5 h-5 mr-2 animate-spin" />
                  ログイン中...
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
                @click="handleGoogleLogin"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
              >
                <Icon name="flat-color-icons:google" class="w-5 h-5 mr-2" />
                <span class="text-gray-700">Googleでログイン</span>
              </button>
              
              <button
                type="button"
                @click="handleTwitterLogin"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
              >
                <Icon name="lucide:twitter" class="w-5 h-5 mr-2 text-blue-400" />
                <span class="text-gray-700">Twitterでログイン</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Additional Options -->
        <div class="mt-8 bg-white/70 backdrop-blur-sm rounded-lg p-4">
          <div class="flex items-center justify-center space-x-2 text-sm">
            <Icon name="lucide:shield-check" class="w-4 h-4 text-green-500" />
            <span class="text-gray-600">
              ログイン情報は安全に暗号化されています
            </span>
          </div>
        </div>

        <!-- Footer Links -->
        <div class="text-center mt-8">
          <div class="flex justify-center space-x-4 text-sm">
            <NuxtLink to="/help" class="text-gray-600 hover:text-pink-600">
              ヘルプ
            </NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/contact" class="text-gray-600 hover:text-pink-600">
              お問い合わせ
            </NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/terms" class="text-gray-600 hover:text-pink-600">
              利用規約
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Two-Factor Authentication Modal -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showTwoFactorModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="closeTwoFactorModal"></div>
        <div class="relative bg-white rounded-2xl p-8 max-w-md w-full">
          <button
            @click="closeTwoFactorModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>

          <div class="text-center mb-6">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:smartphone" class="w-6 h-6 text-blue-500" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              2段階認証
            </h3>
            <p class="text-sm text-gray-600">
              登録されたデバイスに送信された6桁のコードを入力してください
            </p>
          </div>

          <form @submit.prevent="handleTwoFactorSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                認証コード
              </label>
              <div class="flex justify-center space-x-2">
                <input
                  v-for="(digit, index) in twoFactorCode"
                  :key="index"
                  v-model="twoFactorCode[index]"
                  type="text"
                  maxlength="1"
                  class="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-lg font-medium focus:border-pink-500 focus:outline-none"
                  @input="handleTwoFactorInput(index)"
                  @keydown="handleTwoFactorKeydown($event, index)"
                  :ref="`codeInput${index}`"
                />
              </div>
            </div>

            <div class="text-center">
              <button
                type="button"
                @click="resendTwoFactorCode"
                class="text-sm text-pink-600 hover:text-pink-700"
                :disabled="resendCooldown > 0"
              >
                <span v-if="resendCooldown === 0">コードを再送信</span>
                <span v-else>再送信まで {{ resendCooldown }}秒</span>
              </button>
            </div>

            <button
              type="submit"
              :disabled="!isTwoFactorCodeComplete || isVerifying"
              class="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isVerifying">確認</span>
              <span v-else class="flex items-center justify-center">
                <Icon name="lucide:loader-2" class="w-5 h-5 mr-2 animate-spin" />
                確認中...
              </span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

// UI state
const showPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const showTwoFactorModal = ref(false)
const isVerifying = ref(false)

// Two-factor authentication
const twoFactorCode = ref(['', '', '', '', '', ''])
const resendCooldown = ref(0)
let resendTimer = null

// Computed
const isTwoFactorCodeComplete = computed(() => {
  return twoFactorCode.value.every(digit => digit !== '')
})

// Methods
const handleLogin = async () => {
  if (!formData.value.email || !formData.value.password) return
  
  errorMessage.value = ''
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Check if user has two-factor authentication enabled (mock)
    const hasTwoFactor = Math.random() > 0.7 // 30% chance for demo
    
    if (hasTwoFactor) {
      showTwoFactorModal.value = true
      startResendCooldown()
    } else {
      // Successful login without 2FA
      await completeLogin()
    }
  } catch (error) {
    errorMessage.value = 'メールアドレスまたはパスワードが正しくありません'
  } finally {
    isSubmitting.value = false
  }
}

const completeLogin = async () => {
  // Here you would handle the actual login logic
  console.log('Login successful:', formData.value)
  
  // Store auth token, redirect to dashboard, etc.
  if (formData.value.rememberMe) {
    // Set persistent session
    console.log('Remember me enabled')
  }
  
  // Redirect to dashboard or previous page
  router.push('/dashboard')
}

const handleGoogleLogin = () => {
  console.log('Google login')
  // Implement Google OAuth
}

const handleTwitterLogin = () => {
  console.log('Twitter login')
  // Implement Twitter OAuth
}

const handleLineLogin = () => {
  console.log('LINE login')
  // Implement LINE OAuth
}

// Two-factor authentication methods
const handleTwoFactorInput = (index) => {
  const value = twoFactorCode.value[index]
  
  // Move to next input if value entered
  if (value && index < 5) {
    const nextInput = `codeInput${index + 1}`
    setTimeout(() => {
      const element = document.querySelector(`input[ref="${nextInput}"]`)
      if (element) element.focus()
    }, 10)
  }
}

const handleTwoFactorKeydown = (event, index) => {
  // Handle backspace
  if (event.key === 'Backspace' && !twoFactorCode.value[index] && index > 0) {
    const prevInput = `codeInput${index - 1}`
    setTimeout(() => {
      const element = document.querySelector(`input[ref="${prevInput}"]`)
      if (element) {
        element.focus()
        twoFactorCode.value[index - 1] = ''
      }
    }, 10)
  }
}

const handleTwoFactorSubmit = async () => {
  if (!isTwoFactorCodeComplete.value) return
  
  isVerifying.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const code = twoFactorCode.value.join('')
    console.log('Verifying code:', code)
    
    // Mock verification - in real app, verify with backend
    if (code === '123456') { // Mock correct code
      showTwoFactorModal.value = false
      await completeLogin()
    } else {
      throw new Error('Invalid code')
    }
  } catch (error) {
    errorMessage.value = '認証コードが正しくありません'
    // Reset code inputs
    twoFactorCode.value = ['', '', '', '', '', '']
    const firstInput = document.querySelector('input[ref="codeInput0"]')
    if (firstInput) firstInput.focus()
  } finally {
    isVerifying.value = false
  }
}

const closeTwoFactorModal = () => {
  showTwoFactorModal.value = false
  twoFactorCode.value = ['', '', '', '', '', '']
  if (resendTimer) {
    clearInterval(resendTimer)
    resendTimer = null
  }
  resendCooldown.value = 0
}

const startResendCooldown = () => {
  resendCooldown.value = 30
  resendTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value === 0) {
      clearInterval(resendTimer)
      resendTimer = null
    }
  }, 1000)
}

const resendTwoFactorCode = () => {
  if (resendCooldown.value > 0) return
  
  console.log('Resending two-factor code')
  // Implement resend logic
  startResendCooldown()
}

// Cleanup
onUnmounted(() => {
  if (resendTimer) {
    clearInterval(resendTimer)
  }
})
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>