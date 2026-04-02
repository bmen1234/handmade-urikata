import Link from 'next/link'

const categories = [
  { href: '/articles?cat=minne攻略', label: 'minne攻略' },
  { href: '/articles?cat=Creema攻略', label: 'Creema攻略' },
  { href: '/articles?cat=価格設定', label: '価格設定' },
  { href: '/articles?cat=SNS集客', label: 'SNS集客' },
  { href: '/articles?cat=ブランディング', label: 'ブランディング' },
  { href: '/articles?cat=収入・税金', label: '収入・税金' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="inline-block w-2 h-5 bg-brand-green rounded-sm" />
              <span className="font-black text-lg text-gray-900">売り方ラボ</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              minneとCreemaで本当に売れるためのノウハウを発信するメディアです。価格設定・写真・SNS集客・ブランディングまで実践的な情報をお届けします。
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">カテゴリ</p>
            <ul className="space-y-2.5">
              {categories.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-gray-600 hover:text-brand-green transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">このサイトについて</p>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              ハンドメイド販売を10年以上研究し、実際に効果のあったノウハウだけを厳選してお届けします。
            </p>
            <Link href="/articles" className="inline-flex items-center text-sm font-bold text-brand-green hover:text-brand-green-dark transition-colors">
              記事をすべて読む →
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p>© 2026 売り方ラボ. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  )
}
