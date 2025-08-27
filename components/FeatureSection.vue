<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          安心・安全のサービス
        </h2>
        <p class="text-lg text-gray-600">
          初めての方でも安心してご利用いただけます
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all"
        >
          <div :class="`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`">
            <Icon :name="feature.icon" :class="`w-6 h-6 ${feature.iconColor}`" />
          </div>
          <h3 class="font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600 text-sm">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = ref([
  {
    title: "安全な決済",
    description: "作品完成まで代金をお預かりするエスクローシステム",
    icon: "lucide:shield",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-500"
  },
  {
    title: "品質保証",
    description: "万が一トラブルがあった場合も運営がしっかりサポート",
    icon: "lucide:award",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    title: "スピード納品",
    description: "シンプルなフローで平均3日での作品完成",
    icon: "lucide:clock",
    bgColor: "bg-green-100",
    iconColor: "text-green-500"
  }
])
</script>