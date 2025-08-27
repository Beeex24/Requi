<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="description" />
    <Meta property="og:image" :content="ogImage" />
    <Meta property="og:type" content="website" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="title" />
    <Meta name="twitter:description" :content="description" />
    <Meta name="twitter:image" :content="ogImage" />
    <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </Head>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Requi レキ - 好きな絵師にリクエスト'
  },
  description: {
    type: String,
    default: '見積もり・打ち合わせ・修正なし。シンプルで気軽な創作依頼プラットフォーム'
  },
  ogImage: {
    type: String,
    default: '/og-image.png'
  }
})
</script>