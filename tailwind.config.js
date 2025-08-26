export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          25: '#fef7f7',
          50: '#fdf2f8',
          // 他のカラー設定
        }
      }
    },
  },
  plugins: [],
}