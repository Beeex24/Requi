// ========================================
// エラーハンドリング（オプション）
// src/app/dashboard/error.tsx として別ファイルに配置も可能
// ========================================
'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        エラーが発生しました
      </h2>
      <p className="text-gray-600 mb-6">
        申し訳ございません。予期しないエラーが発生しました。
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all"
      >
        もう一度試す
      </button>
    </div>
  )
}