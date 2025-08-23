import React from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

interface FooterLink {
  name: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: 'サービス',
      links: [
        { name: '作品を探す', href: '/works' },
        { name: 'クリエイターを探す', href: '/creators' },
        { name: 'カテゴリー', href: '/categories' },
        { name: '人気タグ', href: '/tags' }
      ]
    },
    {
      title: 'サポート',
      links: [
        { name: '使い方', href: '/how-it-works' },
        { name: 'よくある質問', href: '/faq' },
        { name: 'お問い合わせ', href: '/contact' },
        { name: 'コミュニティ', href: '/community' }
      ]
    },
    {
      title: 'クリエイター向け',
      links: [
        { name: 'クリエイター登録', href: '/register' },
        { name: '収益化方法', href: '/monetize' },
        { name: 'ガイドライン', href: '/guidelines' },
        { name: 'クリエイターサポート', href: '/creator-support' }
      ]
    },
    {
      title: '会社情報',
      links: [
        { name: '運営会社', href: '/about' },
        { name: '利用規約', href: '/terms' },
        { name: 'プライバシーポリシー', href: '/privacy' },
        { name: '特定商取引法', href: '/law' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              最新情報をお届けします
            </h3>
            <p className="text-gray-400 mb-6">
              新機能やキャンペーン情報をメールでお知らせします
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                登録
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Requi</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              クリエイターと繋がる
              <br />
              新しい創作プラットフォーム
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-pink-400" />
              <span className="text-gray-400 text-sm">support@requi.jp</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-pink-400" />
              <span className="text-gray-400 text-sm">03-1234-5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-pink-400" />
              <span className="text-gray-400 text-sm">東京都渋谷区</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Requi. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" /> in Japan
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}