import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/lib/articles'

export const metadata: Metadata = {
  title: '売り方ラボ | minne・Creemaで売れるハンドメイド販売ノウハウ',
  description: 'minne・Creemaで売れるためのノウハウを徹底解説。価格設定・写真撮影・SNS集客・ブランディングまで、ハンドメイド作家のための実践的な情報を発信します。',
  alternates: { canonical: 'https://urikata.jp' },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ハンドメイド作品が売れない理由は何ですか？",
      acceptedAnswer: { "@type": "Answer", text: "ハンドメイド作品が売れない主な理由は、価格設定が適切でない、商品タイトルにキーワードが入っていない、写真のクオリティが低い、プロフィールが薄いの4つです。まずタイトルと写真を見直すことで改善するケースが多いです。" },
    },
    {
      "@type": "Question",
      name: "minneとCreemaどちらで販売すべきですか？",
      acceptedAnswer: { "@type": "Answer", text: "minneは登録作家数・ユーザー数ともに日本最大で、初心者の集客がしやすい特徴があります。Creemaは客単価が高く、こだわりのクリエイター向けです。最初はminneで販売を開始し、軌道に乗ったらCreemaにも展開する戦略が効果的です。" },
    },
    {
      "@type": "Question",
      name: "ハンドメイド作品の適正価格はどうやって決めますか？",
      acceptedAnswer: { "@type": "Answer", text: "適正価格は材料費だけでなく、制作時間×時給、梱包費、プラットフォーム手数料を含めて計算します。多くの作家が価格を安く設定しすぎており、値上げしても売上が下がらないケースが大半です。" },
    },
  ],
}

const categories = [
  { slug: "価格設定", label: "価格設定", emoji: "💴", desc: "売れる値付けの方法論" },
  { slug: "minne攻略", label: "minne攻略", emoji: "🛍️", desc: "タイトル・写真・SEO対策" },
  { slug: "Creema攻略", label: "Creema攻略", emoji: "🎨", desc: "高単価で売るための戦略" },
  { slug: "SNS集客", label: "SNS集客", emoji: "📱", desc: "Instagram・X・Threads活用法" },
  { slug: "ブランディング", label: "ブランディング", emoji: "⭐", desc: "世界観・ファンの作り方" },
  { slug: "収入・税金", label: "収入・税金", emoji: "📊", desc: "稼ぐ仕組みと確定申告" },
]

export default function HomePage() {
  const featured = articles[0]
  const latest = articles.slice(1, 7)
  const picks = articles.slice(7, 13)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="border-b border-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="section-label mb-3">ハンドメイド販売の売り方メディア</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
                minneとCreemaで<br />
                <span className="text-brand-green">本当に売れる</span>方法を<br />
                すべて公開します
              </h1>
              <p className="text-gray-500 leading-relaxed mb-7 text-[16px]">
                価格設定・商品タイトル・写真撮影・SNS集客・ブランディングまで。実際に効果のあったノウハウを徹底解説します。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/articles" className="btn-primary text-[15px] px-6 py-3">記事を読む →</Link>
                <Link href="/articles?cat=minne攻略" className="btn-secondary text-[15px] px-6 py-3">minne攻略を見る</Link>
              </div>
            </div>
            {featured && (
              <Link href={`/articles/${featured.slug}`} className="group block">
                <div className="aspect-[16/9] bg-gradient-to-br from-brand-green-light to-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
                  <span className="text-7xl">{featured.emoji}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 tag">{featured.category}</span>
                </div>
                <h2 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-brand-green transition-colors line-clamp-2">{featured.title}</h2>
                <p className="text-sm text-gray-400 mt-1.5">{featured.date}</p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 sm:gap-16">
          {[
            { num: `${articles.length}本+`, label: "実践的なノウハウ記事" },
            { num: "10年+", label: "ハンドメイド販売の研究" },
            { num: "毎週更新", label: "実践ベースの記事" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-brand-green font-black text-2xl sm:text-3xl">{s.num}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="section-label mb-1">最新記事</p>
            <h2 className="font-serif text-2xl font-bold text-gray-900">新着ノウハウ</h2>
          </div>
          <Link href="/articles" className="text-sm text-brand-green font-bold hover:text-brand-green-dark transition-colors">すべて見る →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map(a => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="group block">
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-brand-green-light rounded-xl flex items-center justify-center mb-3">
                <span className="text-5xl">{a.emoji}</span>
              </div>
              <span className="tag">{a.category}</span>
              <h3 className="font-bold text-gray-900 mt-2 text-[15px] leading-snug group-hover:text-brand-green transition-colors line-clamp-2">{a.title}</h3>
              <p className="text-xs text-gray-400 mt-1.5">{a.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-2">カテゴリから探す</p>
            <h2 className="font-serif text-2xl font-bold text-gray-900">あなたの悩みを解決する</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(c => (
              <Link key={c.slug} href={`/articles?cat=${encodeURIComponent(c.slug)}`}
                className="bg-white border border-gray-100 rounded-xl p-5 hover:border-brand-green hover:shadow-md transition-all group">
                <p className="text-3xl mb-3">{c.emoji}</p>
                <p className="font-bold text-gray-900 group-hover:text-brand-green transition-colors text-[15px]">{c.label}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Picks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8">
          <p className="section-label mb-1">注目記事</p>
          <h2 className="font-serif text-2xl font-bold text-gray-900">売上が上がるノウハウ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {picks.map(a => (
            <Link key={a.slug} href={`/articles/${a.slug}`}
              className="group flex gap-4 items-start border border-gray-100 rounded-xl p-5 hover:border-brand-green hover:shadow-sm transition-all">
              <div className="w-16 h-16 bg-brand-green-light rounded-xl flex-shrink-0 flex items-center justify-center text-2xl">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <span className="tag">{a.category}</span>
                <h3 className="font-bold text-gray-900 mt-1.5 text-sm leading-snug group-hover:text-brand-green transition-colors line-clamp-2">{a.title}</h3>
                <p className="text-xs text-gray-400 mt-1.5">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-2">よくある質問</p>
            <h2 className="font-serif text-2xl font-bold text-gray-900">ハンドメイド販売のよくある疑問</h2>
          </div>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-white border border-gray-100 rounded-xl px-6 py-5 group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4 text-[15px]">
                  <span>{faq.name}</span>
                  <span className="text-brand-green text-xl flex-shrink-0 group-open:rotate-45 transition-transform origin-center">+</span>
                </summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
