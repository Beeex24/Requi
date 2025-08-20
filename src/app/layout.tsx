import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Requi - レキ クリエイターと繋がる創作プラットフォーム',
  description: 'イラスト、デザイン、音楽、動画など、5000人以上のクリエイターがあなたの依頼を待っています。',
  keywords: 'イラスト依頼, クリエイター, コミッション, デザイン, 創作',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}