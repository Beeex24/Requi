<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">クリエイター設定</h2>
      <p class="text-sm text-gray-600">
        作品の受注に関する設定を管理します
      </p>
    </div>

    <form @submit.prevent="saveCreatorSettings" class="space-y-6">
      <!-- Commission Status -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">受注ステータス</h3>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="status in commissionStatuses"
            :key="status.value"
            type="button"
            @click="creatorSettings.commissionStatus = status.value"
            :class="`relative rounded-lg border-2 p-4 text-center hover:shadow-md transition-all ${
              creatorSettings.commissionStatus === status.value
                ? `border-${status.color}-500 bg-${status.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`"
          >
            <Icon :name="status.icon" :class="`w-6 h-6 mx-auto mb-2 text-${status.color}-500`" />
            <div class="text-sm font-medium text-gray-900">{{ status.label }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ status.description }}</div>
            <div 
              v-if="creatorSettings.commissionStatus === status.value"
              :class="`absolute top-2 right-2 w-5 h-5 bg-${status.color}-500 rounded-full flex items-center justify-center`"
            >
              <Icon name="lucide:check" class="w-3 h-3 text-white" />
            </div>
          </button>
        </div>
      </div>

      <!-- Specialty and Skills -->
      <div>
        <label for="specialty" class="block text-sm font-medium text-gray-700 mb-1">
          専門分野
        </label>
        <input
          id="specialty"
          v-model="creatorSettings.specialty"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="例: VTuberアバター制作、ロゴデザイン"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          スキル・タグ
        </label>
        <div class="flex flex-wrap gap-2 mb-2">
          <span 
            v-for="(skill, index) in creatorSettings.skills"
            :key="index"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700"
          >
            {{ skill }}
            <button
              type="button"
              @click="removeSkill(index)"
              class="ml-2 hover:text-pink-900"
            >
              <Icon name="lucide:x" class="w-3 h-3" />
            </button>
          </span>
        </div>
        <div class="flex space-x-2">
          <input
            v-model="newSkill"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="スキルを追加"
            @keydown.enter.prevent="addSkill"
          />
          <button
            type="button"
            @click="addSkill"
            class="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            追加
          </button>
        </div>
      </div>

      <!-- Pricing -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">料金設定</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="minPrice" class="block text-sm text-gray-600 mb-1">
              最低価格
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <input
                id="minPrice"
                v-model.number="creatorSettings.minimumPrice"
                type="number"
                min="1000"
                step="1000"
                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="5,000"
              />
            </div>
          </div>
          <div>
            <label for="maxPrice" class="block text-sm text-gray-600 mb-1">
              最高価格
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <input
                id="maxPrice"
                v-model.number="creatorSettings.maximumPrice"
                type="number"
                min="1000"
                step="1000"
                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="50,000"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Delivery Time -->
      <div>
        <label for="deliveryDays" class="block text-sm font-medium text-gray-700 mb-1">
          平均納期（日数）
        </label>
        <select
          id="deliveryDays"
          v-model.number="creatorSettings.averageDeliveryDays"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option :value="1">1日</option>
          <option :value="3">3日</option>
          <option :value="7">1週間</option>
          <option :value="14">2週間</option>
          <option :value="30">1ヶ月</option>
          <option :value="60">2ヶ月</option>
        </select>
      </div>

      <!-- Content Preferences -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">コンテンツ設定</h3>
        <div class="space-y-3">
          <label class="flex items-center">
            <input
              v-model="creatorSettings.acceptCommercial"
              type="checkbox"
              class="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <span class="ml-2 text-sm text-gray-700">商用利用可能な作品を受け付ける</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="creatorSettings.acceptNsfw"
              type="checkbox"
              class="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <span class="ml-2 text-sm text-gray-700">R18コンテンツを受け付ける</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="creatorSettings.acceptRevisions"
              type="checkbox"
              class="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <span class="ml-2 text-sm text-gray-700">リテイク（1回まで）を受け付ける</span>
          </label>
        </div>
      </div>

      <!-- Portfolio -->
      <div>
        <label for="portfolio" class="block text-sm font-medium text-gray-700 mb-1">
          ポートフォリオURL
        </label>
        <input
          id="portfolio"
          v-model="creatorSettings.portfolioUrl"
          type="url"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="https://your-portfolio.com"
        />
      </div>

      <!-- Sample Works -->
      <div>
        <h3 class="text-base font-medium text-gray-900 mb-4">サンプル作品</h3>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div 
            v-for="(work, index) in creatorSettings.sampleWorks"
            :key="index"
            class="relative group"
          >
            <img 
              :src="work"
              alt="Sample work"
              class="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              @click="removeSampleWork(index)"
              class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>
          <button
            v-if="creatorSettings.sampleWorks.length < 6"
            type="button"
            @click="$refs.sampleWorkInput.click()"
            class="h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-400 transition-colors flex flex-col items-center justify-center"
          >
            <Icon name="lucide:plus" class="w-8 h-8 text-gray-400 mb-2" />
            <span class="text-sm text-gray-500">作品を追加</span>
          </button>
          <input 
            ref="sampleWorkInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            @change="handleSampleWorkUpload"
          />
        </div>
        <p class="text-xs text-gray-500">
          最大6枚まで。JPG、PNG形式（各5MB以下）
        </p>
      </div>

      <!-- Bank Account (Sensitive) -->
      <div class="pt-6 border-t border-gray-200">
        <h3 class="text-base font-medium text-gray-900 mb-4">振込先情報</h3>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div class="flex">
            <Icon name="lucide:lock" class="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
            <div class="text-sm text-yellow-800">
              振込先情報は暗号化されて安全に保管されます。運営以外には公開されません。
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label for="bankName" class="block text-sm text-gray-600 mb-1">
              銀行名
            </label>
            <input
              id="bankName"
              v-model="creatorSettings.bankAccount.bankName"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="〇〇銀行"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="branchName" class="block text-sm text-gray-600 mb-1">
                支店名
              </label>
              <input
                id="branchName"
                v-model="creatorSettings.bankAccount.branchName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="〇〇支店"
              />
            </div>
            <div>
              <label for="accountType" class="block text-sm text-gray-600 mb-1">
                口座種別
              </label>
              <select
                id="accountType"
                v-model="creatorSettings.bankAccount.accountType"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="普通">普通</option>
                <option value="当座">当座</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="accountNumber" class="block text-sm text-gray-600 mb-1">
                口座番号
              </label>
              <input
                id="accountNumber"
                v-model="creatorSettings.bankAccount.accountNumber"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="1234567"
              />
            </div>
            <div>
              <label for="accountHolder" class="block text-sm text-gray-600 mb-1">
                口座名義（カナ）
              </label>
              <input
                id="accountHolder"
                v-model="creatorSettings.bankAccount.accountHolder"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="ヤマダ タロウ"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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
  showNotification: {
    type: Function,
    required: true
  }
})

// Commission statuses
const commissionStatuses = ref([
  {
    value: 'open',
    label: '受付中',
    description: '新規依頼OK',
    icon: 'lucide:check-circle',
    color: 'green'
  },
  {
    value: 'limited',
    label: '条件付き受付',
    description: '要相談',
    icon: 'lucide:alert-circle',
    color: 'yellow'
  },
  {
    value: 'closed',
    label: '受付停止',
    description: '新規受付なし',
    icon: 'lucide:x-circle',
    color: 'red'
  }
])

// Creator settings
const creatorSettings = reactive({
  commissionStatus: 'open',
  specialty: 'VTuberアバター制作、キャラクターデザイン',
  skills: ['イラスト', 'Live2D', 'キャラクターデザイン', 'アニメ風'],
  minimumPrice: 5000,
  maximumPrice: 50000,
  averageDeliveryDays: 7,
  acceptCommercial: true,
  acceptNsfw: false,
  acceptRevisions: true,
  portfolioUrl: 'https://portfolio.example.com',
  sampleWorks: [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop',
  ],
  bankAccount: {
    bankName: '',
    branchName: '',
    accountType: '普通',
    accountNumber: '',
    accountHolder: ''
  }
})

// UI state
const isSaving = ref(false)
const newSkill = ref('')

// Methods
const addSkill = () => {
  if (newSkill.value && !creatorSettings.skills.includes(newSkill.value)) {
    creatorSettings.skills.push(newSkill.value)
    newSkill.value = ''
  }
}

const removeSkill = (index) => {
  creatorSettings.skills.splice(index, 1)
}

const removeSampleWork = (index) => {
  creatorSettings.sampleWorks.splice(index, 1)
}

const handleSampleWorkUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    if (creatorSettings.sampleWorks.length >= 6) return
    
    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      props.showNotification('error', 'エラー', 'ファイルサイズは5MB以下にしてください')
      return
    }
    
    // Create temporary URL for demo
    const url = URL.createObjectURL(file)
    creatorSettings.sampleWorks.push(url)
  })
}

const saveCreatorSettings = async () => {
  isSaving.value = true
  
  try {
    // API call to save settings
    await new Promise(resolve => setTimeout(resolve, 1500))
    props.showNotification('success', '保存完了', 'クリエイター設定を更新しました')
  } catch (error) {
    props.showNotification('error', 'エラー', '設定の保存に失敗しました')
  } finally {
    isSaving.value = false
  }
}
</script>