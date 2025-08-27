<template>
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">よくある質問</h2>
    
    <div class="space-y-4">
      <div 
        v-for="(faq, index) in faqs" 
        :key="index"
        class="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <button 
          @click="$emit('toggleFaq', index)"
          class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span class="font-medium text-gray-900">{{ faq.question }}</span>
          <Icon 
            name="lucide:chevron-down" 
            :class="`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`" 
          />
        </button>
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div v-show="openFaq === index" class="px-6 pb-4">
            <p class="text-gray-600">{{ faq.answer }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  faqs: {
    type: Array,
    required: true
  },
  openFaq: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['toggleFaq'])
</script>