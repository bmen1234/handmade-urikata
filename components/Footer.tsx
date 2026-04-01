import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-24">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-white font-black text-lg mb-2">売り方ラボ</p>
            <p className="text-sm leading-relaxed">ハンドメイド作家1,000名以上の指導実績をもとに、minneやCreemaで本当に売れるノウハウを発信します。</p>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-3">AIツール</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/price-calculator" className="hover:text-white transition-colors">適正価格計算AI</Link></li>
              <li><Link href="/tools/title-generator" className="hover:text-white transition-colors">タイトル生成AI</Link></li>
              <li><Link href="/tools/description-writer" className="hover:text-white transition-colors">説明文ライターAI</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-3">カテゴリ</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles?cat=pricing" className="hover:text-white transition-colors">価格設定</Link></li>
              <li><Link href="/articles?cat=minne" className="hover:text-white transition-colors">minne攻略</Link></li>
              <li><Link href="/articles?cat=sns" className="hover:text-white transition-colors">SNS集客</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 ハンドメイド売り方ラボ. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  )
}
