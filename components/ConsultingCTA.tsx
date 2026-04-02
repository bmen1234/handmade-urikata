import Link from 'next/link'

type Props = {
  variant?: 'sidebar' | 'inline' | 'footer'
}

export default function ConsultingCTA({ variant = 'inline' }: Props) {
  if (variant === 'sidebar') {
    return (
      <div className="bg-brand-green rounded p-5 text-white">
        <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-3">無料相談</p>
        <p className="font-serif text-base font-bold leading-snug mb-4">
          売上が伸び悩んでいる方へ<br />現状を無料で診断します
        </p>
        <ul className="space-y-2 mb-5 text-xs text-blue-100">
          <li className="flex items-start gap-2">
            <span className="text-brand-gold font-bold mt-0.5 flex-shrink-0">✓</span>
            出品・写真・価格の改善点を特定
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-gold font-bold mt-0.5 flex-shrink-0">✓</span>
            あなたに合ったSEO戦略を提案
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-gold font-bold mt-0.5 flex-shrink-0">✓</span>
            月収目標までのロードマップを作成
          </li>
        </ul>
        <a
          href="mailto:contact@urikata.jp?subject=無料相談希望"
          className="block text-center bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-sm py-2.5 px-4 rounded-sm transition-colors tracking-wide"
        >
          無料相談を申し込む →
        </a>
        <p className="text-xs text-blue-200 mt-2 text-center">返信まで1〜2営業日</p>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="border border-brand-gold bg-brand-gold-light rounded p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="section-label mb-1">無料コンサルティング相談</p>
            <p className="font-serif text-lg font-bold text-gray-900">
              売上の壁を突破したい方、まず話しましょう
            </p>
            <p className="text-sm text-gray-500 mt-1">
              現状の出品・価格・SNS戦略を分析し、具体的な改善案を提示します
            </p>
          </div>
          <a
            href="mailto:contact@urikata.jp?subject=無料相談希望"
            className="btn-gold whitespace-nowrap flex-shrink-0"
          >
            無料相談を申し込む →
          </a>
        </div>
      </div>
    )
  }

  // inline (default) — article末尾
  return (
    <div className="mt-14 border-t-2 border-brand-gold pt-10">
      <div className="bg-brand-green rounded p-8 text-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-3">
            プロのコンサルタントに相談する
          </p>
          <p className="font-serif text-2xl font-bold mb-4 leading-tight">
            「読んだけど、どこから手をつければ？」<br />
            <span className="text-brand-gold">現状診断</span>で最短ルートを見つけます
          </p>
          <ul className="text-sm text-blue-100 space-y-2 mb-7 text-left inline-block">
            <li className="flex items-center gap-2"><span className="text-brand-gold font-bold">✓</span> minne・Creema出品の弱点を具体的に指摘</li>
            <li className="flex items-center gap-2"><span className="text-brand-gold font-bold">✓</span> あなたのジャンルに特化したSEO戦略を提案</li>
            <li className="flex items-center gap-2"><span className="text-brand-gold font-bold">✓</span> 月収目標から逆算した販売計画を策定</li>
            <li className="flex items-center gap-2"><span className="text-brand-gold font-bold">✓</span> 初回相談は完全無料・返信1〜2営業日</li>
          </ul>
          <a
            href="mailto:contact@urikata.jp?subject=無料相談希望"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white font-bold px-8 py-3.5 rounded-sm transition-colors tracking-wide text-base"
          >
            無料相談を申し込む →
          </a>
        </div>
      </div>
    </div>
  )
}
