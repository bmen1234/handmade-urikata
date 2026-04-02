import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/lib/articles'
import ConsultingCTA from '@/components/ConsultingCTA'

export const metadata: Metadata = {
  title: '売り方ラボ | minne・Creemaで売れるハンドメイド戦略メディア',
  description: 'ハンドメイド作家の売上を最大化するための戦略メディア。価格設定・SEO・SNS集客・ブランディングを実践データで徹底解説。無料コンサルティング相談受付中。',
  alternates: { canonical: 'https://urikata.jp' },
}

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "売り方ラボ",
  url: "https://urikata.jp",
  description: "ハンドメイド作家のための販売戦略コンサルメディア",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://urikata.jp/articles?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const categories = [
  { slug: "価格設定", label: "価格設定戦略", emoji: "💴", desc: "原価・時給・手数料から逆算する正しい値付け" },
  { slug: "minne攻略", label: "minne SEO", emoji: "🔍", desc: "タイトル・タグ・検索順位を制する方法" },
  { slug: "Creema攻略", label: "Creema高単価化", emoji: "💎", desc: "5,000円以上の作品を売るための7条件" },
  { slug: "SNS集客", label: "SNS集客設計", emoji: "📊", desc: "フォロワーを売上に直結させる投稿設計" },
  { slug: "ブランディング", label: "ブランド戦略", emoji: "⭐", desc: "ファン・リピーターを生む世界観の作り方" },
  { slug: "収入・税金", label: "収益化・税務", emoji: "📋", desc: "月10万・専業への道と確定申告完全対応" },
]

const stats = [
  { num: `${articles.length}本+`, label: "実践ノウハウ記事" },
  { num: "10年+", label: "販売戦略の研究" },
  { num: "6カテゴリ", label: "体系的な知識体系" },
]

export default function HomePage() {
  const featured = articles[0]
  const latest = articles.slice(1, 7)
  const picks = articles.slice(7, 13)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-brand-green text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-4">
                ハンドメイド販売戦略メディア
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-6 text-white">
                「作れるけど売れない」を<br />
                <span className="text-brand-gold">データと戦略</span>で突破する
              </h1>
              <p className="text-blue-100 leading-relaxed mb-8 text-[16px]">
                価格設定・SEO・SNS集客・ブランディングを体系化。minne・Creemaで実際に売上が上がったノウハウだけを発信します。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/articles" className="btn-gold text-[15px] px-6 py-3">戦略記事を読む →</Link>
                <a href="mailto:contact@urikata.jp?subject=無料相談希望"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-colors text-[15px]">
                  無料相談を申し込む
                </a>
              </div>
            </div>

            {featured && (
              <Link href={`/articles/${featured.slug}`} className="group block">
                <div className="aspect-[16/9] bg-white/5 border border-white/20 rounded flex items-center justify-center mb-4 overflow-hidden relative">
                  <span className="text-7xl">{featured.emoji}</span>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-green-dark/80 to-transparent p-4">
                    <span className="tag text-xs">{featured.category}</span>
                    <p className="text-white font-bold text-sm mt-1 line-clamp-2 group-hover:text-brand-gold transition-colors leading-snug">
                      {featured.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-brand-green-dark py-4 px-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 sm:gap-16">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-brand-gold font-black text-2xl font-serif">{s.num}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="section-label mb-1">最新記事</p>
            <h2 className="font-serif text-2xl font-bold text-brand-green">新着戦略ノウハウ</h2>
          </div>
          <Link href="/articles" className="text-sm text-brand-gold font-bold hover:text-brand-gold-dark transition-colors">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map(a => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="group block">
              <div className="aspect-[16/9] bg-brand-green-light rounded flex items-center justify-center mb-3 border border-gray-100 group-hover:border-brand-gold transition-colors overflow-hidden">
                <span className="text-5xl">{a.emoji}</span>
              </div>
              <span className="tag">{a.category}</span>
              <h3 className="font-bold text-gray-900 mt-2 text-[15px] leading-snug group-hover:text-brand-green transition-colors line-clamp-2">
                {a.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1.5">{a.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-brand-green-light border-y border-gray-200 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-2">カテゴリ別戦略</p>
            <h2 className="font-serif text-2xl font-bold text-brand-green">課題から逆引きする</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(c => (
              <Link key={c.slug} href={`/articles?cat=${encodeURIComponent(c.slug)}`}
                className="bg-white border border-gray-200 rounded p-5 hover:border-brand-gold hover:shadow-md transition-all group">
                <p className="text-2xl mb-3">{c.emoji}</p>
                <p className="font-bold text-brand-green group-hover:text-brand-gold transition-colors text-[15px]">{c.label}</p>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Picks ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8">
          <p className="section-label mb-1">注目記事</p>
          <h2 className="font-serif text-2xl font-bold text-brand-green">実績のある戦略ノウハウ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {picks.map(a => (
            <Link key={a.slug} href={`/articles/${a.slug}`}
              className="group flex gap-4 items-start border border-gray-200 rounded p-5 hover:border-brand-gold transition-all">
              <div className="w-14 h-14 bg-brand-green-light rounded flex-shrink-0 flex items-center justify-center text-2xl border border-gray-100">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <span className="tag">{a.category}</span>
                <h3 className="font-bold text-gray-900 mt-1.5 text-sm leading-snug group-hover:text-brand-green transition-colors line-clamp-2">{a.title}</h3>
                <p className="text-xs text-gray-400 mt-1.5">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Consulting CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <ConsultingCTA variant="footer" />
      </section>
    </>
  )
}
