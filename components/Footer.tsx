import Link from 'next/link'
import ConsultingCTA from './ConsultingCTA'

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
    <footer className="mt-24">
      {/* Consulting CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-0">
        <ConsultingCTA variant="footer" />
      </div>

      {/* Main footer */}
      <div className="bg-brand-green mt-10 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-1 h-5 bg-brand-gold" />
                <span className="font-serif font-bold text-lg text-white tracking-tight">売り方ラボ</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                ハンドメイド作家が「趣味」から「ビジネス」へ。minne・Creemaで本当に売れるための戦略を発信するコンサルメディアです。
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-4">カテゴリ</p>
              <ul className="space-y-2.5">
                {categories.map(c => (
                  <li key={c.href}>
                    <Link href={c.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-4">コンサルティング</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                売上・出品・SNS・価格設定に関するご相談を承ります。初回は完全無料です。
              </p>
              <a
                href="mailto:contact@urikata.jp?subject=無料相談希望"
                className="inline-flex items-center text-sm font-bold text-brand-gold hover:text-white transition-colors"
              >
                無料相談を申し込む →
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>© 2026 売り方ラボ. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
