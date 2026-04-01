import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/lib/articles'

export const metadata: Metadata = {
  title: '売り方ラボ | minne・Creemaで売れるハンドメイド販売ノウハウ',
  description: 'minne・Creemaで売れるためのノウハウを徹底解説。価格設定・写真撮影・SNS集客・ブランディングまで、ハンドメイド作家のための実践的な情報を発信します。',
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ハンドメイド作品が売れない理由は何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ハンドメイド作品が売れない主な理由は、価格設定が適切でない、商品タイトルにキーワードが入っていない、写真のクオリティが低い、プロフィールが薄いの4つです。まずタイトルと写真を見直すことで改善するケースが多いです。",
      },
    },
    {
      "@type": "Question",
      name: "minneとCreemaどちらで販売すべきですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "minneは登録作家数・ユーザー数ともに日本最大で、初心者の集客がしやすい特徴があります。Creemaは客単価が高く、こだわりのクリエイター向けです。最初はminneで販売を開始し、軌道に乗ったらCreemaにも展開する戦略が効果的です。",
      },
    },
    {
      "@type": "Question",
      name: "ハンドメイド作品の適正価格はどうやって決めますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "適正価格は材料費だけでなく、制作時間×時給、梱包費、プラットフォーム手数料を含めて計算します。多くの作家が価格を安く設定しすぎており、値上げしても売上が下がらないケースが大半です。",
      },
    },
  ],
}

const categories = [
  { slug: "pricing", label: "価格設定", emoji: "💴", desc: "売れる値付けの方法論" },
  { slug: "minne", label: "minne攻略", emoji: "🛍️", desc: "タイトル・写真・SEO対策" },
  { slug: "creema", label: "Creema攻略", emoji: "🎨", desc: "高単価で売るための戦略" },
  { slug: "sns", label: "SNS集客", emoji: "📱", desc: "Instagram・X・Threads活用法" },
  { slug: "branding", label: "ブランディング", emoji: "⭐", desc: "世界観・ファンの作り方" },
  { slug: "income", label: "収入・税金", emoji: "📊", desc: "稼ぐ仕組みと確定申告" },
]

export default function HomePage() {
  const latestArticles = articles.slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-b from-brand-green-light to-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="section-label mb-4">ハンドメイド販売の売り方メディア</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            minneとCreemaで
            <span className="text-brand-green">本当に売れる</span>方法を
            すべて公開します
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            価格設定・商品タイトル・写真撮影・SNS集客・ブランディングまで。
            実際に効果のあったノウハウを徹底解説します。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/articles" className="btn-primary text-base px-8 py-4">記事を読む →</Link>
            <Link href="/articles?cat=minne" className="btn-secondary text-base px-8 py-4">minne攻略を見る</Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { num: "60記事+", label: "実践的なノウハウ記事" },
            { num: "10年+", label: "ハンドメイド販売の研究" },
            { num: "毎週更新", label: "実践ベースの記事" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-brand-green font-black text-2xl sm:text-3xl">{s.num}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-center mb-2">カテゴリから探す</p>
          <h2 className="font-serif text-2xl font-bold text-center text-gray-900 mb-10">あなたの悩みを選んでください</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(c => (
              <Link key={c.slug} href={`/articles?cat=${c.slug}`}
                className="bg-white border border-gray-100 rounded-xl p-5 hover:border-brand-green hover:shadow-md transition-all group">
                <p className="text-2xl mb-2">{c.emoji}</p>
                <p className="font-bold text-gray-900 group-hover:text-brand-green transition-colors">{c.label}</p>
                <p className="text-xs text-gray-400 mt-1">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <p className="section-label mb-2">最新記事</p>
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-10">売上が上がるノウハウ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestArticles.map(a => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="card group flex gap-4">
              <div className="w-16 h-16 bg-brand-green-light rounded-xl flex-shrink-0 flex items-center justify-center text-2xl">{a.emoji}</div>
              <div>
                <span className="text-xs font-bold text-brand-green bg-brand-green-light px-2 py-0.5 rounded">{a.category}</span>
                <h3 className="font-bold text-gray-900 mt-1 text-sm leading-snug group-hover:text-brand-green transition-colors line-clamp-2">{a.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/articles" className="btn-secondary">記事をすべて見る →</Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="section-label text-center mb-2">よくある質問</p>
          <h2 className="font-serif text-2xl font-bold text-center text-gray-900 mb-10">ハンドメイド販売のよくある疑問</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-white border border-gray-100 rounded-xl p-6 group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  <span>{faq.name}</span>
                  <span className="text-brand-green text-xl group-open:rotate-45 transition-transform">+</span>
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
