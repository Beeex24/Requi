// Footer.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'サービス',
      links: [
        { name: '作品を探す', href: '#' },
        { name: '絵師を探す', href: '#' },
        { name: 'カテゴリー', href: '#' },
        { name: '人気タグ', href: '#' }
      ]
    },
    {
      title: 'ヘルプ',
      links: [
        { name: '使い方', href: '#' },
        { name: 'よくある質問', href: '#' },
        { name: 'お問い合わせ', href: '#' },
        { name: 'コミュニティ', href: '#' }
      ]
    },
    {
      title: '絵師向け',
      links: [
        { name: '絵師登録', href: '#' },
        { name: '収益化方法', href: '#' },
        { name: 'ガイドライン', href: '#' },
        { name: 'サポート', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Skeb風</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              シンプルで楽しい創作依頼プラットフォーム
            </p>
            <div className="text-sm text-gray-400">
              © 2024 Skeb風. All rights reserved.
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;