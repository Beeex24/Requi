// ========================================
// ローディング状態（オプション）
// src/app/dashboard/loading.tsx として別ファイルに配置も可能
// ========================================
export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="spinner-kawaii mb-4"></div>
        <p className="text-gray-600">読み込み中...</p>
      </div>
    </div>
  )
}