<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">プロフィール設定</h2>
      <p class="text-sm text-gray-600">
        公開されるプロフィール情報を編集できます
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Avatar Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          プロフィール画像
        </label>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <img 
              :src="form.avatar_url || `https://ui-avatars.com/api/?name=${form.display_name}`"
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
          表示名 <span class="text-red-500">*</span>
        </label>
        <input
          id="displayName"
          v-model="form.display_name"
          type="text"
          required
          maxlength="100"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="山田太郎"
        />
      </div>

      <!-- Username -->
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
          ユーザー名 <span class="text-red-500">*</span>
        </label>
        <div class="flex">
          <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            requi.com/@
          </span>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            pattern="[a-zA-Z0-9_]+"
            minlength="3"
            maxlength="20"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="username"
            @input="checkUsername"
          />
        </div>
        <p v-if="usernameError" class="mt-1 text-sm text-red-600">
          {{ usernameError }}
        </p>
        <p v-else-if="usernameAvailable" class="mt-1 text-sm text-green-600">
          このユーザー名は利用可能です
        </p>
      </div>

      <!-- Bio -->
      <div>
        <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">
          自己紹介
        </label>
        <textarea
          id="bio"
          v-model="form.bio"
          rows="4"
          maxlength="500"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="あなたについて教えてください"
        ></textarea>
        <p class="mt-1 text-xs text-gray-500">
          {{ form.bio?.length || 0 }}/500文字
        </p>
      </div>

      <!-- Location -->
      <div>
        <label for="location" class="block text-sm font-medium text-gray-700 mb-1">
          活動地域
        </label>
        <input
          id="location"
          v-model="form.location"
          type="text"
          maxlength="100"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="東京都"
        />
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
            v-model="form.website"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label for="twitter" class="block text-sm text-gray-600 mb-1">
            Twitter / X
          </label>
          <div class="flex">
            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              @
            </span>
            <input
              id="twitter"
              v-model="form.twitter"
              type="text"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="username"
            />
          </div>
        </div>

        <div>
          <label for="instagram" class="block text-sm text-gray-600 mb-1">
            Instagram
          </label>
          <div class="flex">
            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              @
            </span>
            <input
              id="instagram"
              v-model="form.instagram"
              type="text"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="username"
            />
          </div>
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
          :disabled="isSaving || !!usernameError"
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
  profileData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'avatar-change'])

const { $supabase } = useNuxtApp()

// Form state
const form = reactive({
  display_name: props.profileData?.display_name || '',
  username: props.profileData?.username || '',
  bio: props.profileData?.bio || '',
  location: props.profileData?.location || '',
  website: props.profileData?.website || '',
  twitter: props.profileData?.twitter || '',
  instagram: props.profileData?.instagram || '',
  avatar_url: props.profileData?.avatar_url || ''
})

const isSaving = ref(false)
const usernameError = ref('')
const usernameAvailable = ref(false)
let usernameCheckTimeout = null

// Watch for prop changes
watch(() => props.profileData, (newData) => {
  if (newData) {
    Object.assign(form, {
      display_name: newData.display_name || '',
      username: newData.username || '',
      bio: newData.bio || '',
      location: newData.location || '',
      website: newData.website || '',
      twitter: newData.twitter || '',
      instagram: newData.instagram || '',
      avatar_url: newData.avatar_url || ''
    })
  }
}, { immediate: true })

// Username validation
const checkUsername = async () => {
  clearTimeout(usernameCheckTimeout)
  usernameError.value = ''
  usernameAvailable.value = false
  
  if (!form.username) return
  
  if (form.username.length < 3) {
    usernameError.value = 'ユーザー名は3文字以上必要です'
    return
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
    usernameError.value = '英数字とアンダースコアのみ使用できます'
    return
  }
  
  // 既存のユーザー名と同じ場合はチェックしない
  if (form.username === props.profileData?.username) {
    return
  }
  
  // デバウンス処理
  usernameCheckTimeout = setTimeout(async () => {
    const { data, error } = await $supabase
      .from('user_profiles')
      .select('id')
      .eq('username', form.username)
      .single()
    
    if (data) {
      usernameError.value = 'このユーザー名は既に使用されています'
    } else {
      usernameAvailable.value = true
    }
  }, 500)
}

// Handle avatar change
const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // ファイルサイズチェック
  if (file.size > 5 * 1024 * 1024) {
    alert('ファイルサイズは5MB以下にしてください')
    return
  }
  
  // ファイルタイプチェック
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    alert('対応している形式はJPEG、PNG、GIF、WebPのみです')
    return
  }
  
  emit('avatar-change', file)
  
  // プレビュー表示
  const reader = new FileReader()
  reader.onload = (e) => {
    form.avatar_url = e.target.result
  }
  reader.readAsDataURL(file)
}

// Form submit
const handleSubmit = async () => {
  if (usernameError.value) return
  
  isSaving.value = true
  
  try {
    const updateData = {
      display_name: form.display_name,
      username: form.username,
      bio: form.bio,
      location: form.location,
      website: form.website || null,
      twitter: form.twitter || null,
      instagram: form.instagram || null
    }
    
    emit('update', updateData)
  } finally {
    isSaving.value = false
  }
}

// Reset form
const resetForm = () => {
  Object.assign(form, {
    display_name: props.profileData?.display_name || '',
    username: props.profileData?.username || '',
    bio: props.profileData?.bio || '',
    location: props.profileData?.location || '',
    website: props.profileData?.website || '',
    twitter: props.profileData?.twitter || '',
    instagram: props.profileData?.instagram || '',
    avatar_url: props.profileData?.avatar_url || ''
  })
  usernameError.value = ''
  usernameAvailable.value = false
}
</script>