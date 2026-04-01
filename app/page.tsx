import Link from 'next/link'
import { articles } from '@/lib/articles'
const tools = [
  {href:'/tools/price-calculator',icon:'¥',title:'適正価格計算AI',desc:'材料費・制作時間を入力するだけ。AIが市場相場と照らし合わせて適正価格を提案します',tag:'最も使われています'},
  {href:'/tools/title-generator',icon:'T',title:'タイトル生成AI',desc:'作品の特徴を入力するだけ。検索で上位表示されやすいタイトル候補を5つ生成します',tag:''},
  {href:'/tools/description-writer',icon:'✍',title:'説明文ライターAI',desc:'売れる説明文の型をAIが自動適用。作品の魅力を最大限に引き出す文章を生成します',tag:''},
]
const faqs = [
  {q:'ハンドメイド作品が売れない理由は何ですか？',a:'主な理由は①価格設定が適切でない②商品タイトルにSEOキーワードが含まれていない③写真のクオリティが低い④ターゲット設定が曖昧、の4つです。まず価格設定と商品タイトルを見直すことで売上が改善するケースが最も多いです。'},
  {q:'minneとCreemaどちらで販売すべきですか？',a:'最初はminneで販売を開始し、軌道に乗ったらCreemaにも展開する2プラットフォーム戦略が最も効果的です。minneは集客力が高く初心者向け、Creemaは高単価商品に強い特徴があります。'},
  {q:'ハンドメイド作品の適正価格はどうやって決めますか？',a:'適正価格は材料費×3〜5倍が基本です。具体的には材料費＋制作時間×時給（最低1,000円）＋販売手数料＋利益を合計します。当サイトの無料AI価格計算ツールで自動算出できます。'},
]
export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-green-light to-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="section-label mb-4">ハンドメイド作家1,000名以上の指導実績</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            minneとCreemaで<span className="text-brand-green">本当に売れる</span>方法を<br/>すべて公開します
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            価格設定・商品タイトル・説明文・集客・SNS戦略まで。無料のAIツールと実績に基づいた記事で、あなたの売上を変えます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tools/price-calculator" className="btn-primary text-base px-8 py-4">無料AIツールを試す →</Link>
            <Link href="/articles" className="btn-secondary text-base px-8 py-4">記事を読む</Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">登録不要・完全無料</p>
        </div>
      </section>
      <section className="bg-gray-900 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[{num:'1,000名+',label:'指導したハンドメイド作家'},{num:'3つ',label:'無料AIツール搭載'},{num:'毎週更新',label:'SEO・AIEO最適化記事'}].map(s=>(
            <div key={s.label}><p className="text-brand-green font-black text-2xl sm:text-3xl">{s.num}</p><p className="text-gray-400 text-xs sm:text-sm mt-1">{s.label}</p></div>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <p className="section-label text-center mb-2">無料AIツール</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">売上に直結する3つのAIツール</h2>
        <p className="text-gray-500 text-center text-sm mb-10">登録不要・すべて無料。今すぐ使えます。</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map(t=>(
            <Link key={t.href} href={t.href} className="card group hover:border-brand-green relative">
              {t.tag&&<span className="absolute -top-3 left-4 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">{t.tag}</span>}
              <div className="w-12 h-12 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green font-black text-xl mb-4">{t.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">{t.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
              <p className="text-brand-green text-sm font-bold mt-4">使ってみる →</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <p className="section-label mb-2">最新記事</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-10">売上が上がるノウハウ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0,6).map(a=>(
            <Link key={a.slug} href={`/articles/${a.slug}`} className="card group flex gap-4">
              <div className="w-14 h-14 bg-brand-green-light rounded-xl flex-shrink-0 flex items-center justify-center text-2xl">{a.emoji}</div>
              <div>
                <span className="text-xs font-bold text-brand-green bg-brand-green-light px-2 py-0.5 rounded">{a.category}</span>
                <h3 className="font-bold text-gray-900 mt-1 text-sm leading-snug group-hover:text-brand-green transition-colors line-clamp-2">{a.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10"><Link href="/articles" className="btn-secondary">記事をすべて見る →</Link></div>
      </section>
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="section-label text-center mb-2">よくある質問</p>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">ハンドメイド販売のよくある疑問</h2>
          <div className="space-y-4">
            {faqs.map((f,i)=>(
              <details key={i} className="bg-white border border-gray-100 rounded-xl p-6 group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  <span>{f.q}</span><span className="text-brand-green text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
