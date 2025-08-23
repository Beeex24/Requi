import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skeb風 - クリエイターと繋がる創作プラットフォーム',
  description: 'イラスト、デザイン、音楽、動画など、800人以上のクリエイターがあなたの依頼を待っています。',
  keywords: 'イラスト依頼, クリエイター, コミッション, デザイン, 創作, skeb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}