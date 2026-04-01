import Link from 'next/link'
import { articles, getArticlesByCategory } from '@/lib/articles'
export const metadata = { title:'記事一覧 | ハンドメイド売り方ラボ' }
const cats = [{slug:'all',label:'すべて'},{slug:'pricing',label:'価格設定'},{slug:'minne',label:'minne攻略'},{slug:'creema',label:'Creema攻略'},{slug:'sns',label:'SNS集客'},{slug:'income',label:'収入・税金'}]
export default function ArticlesPage({searchParams}:{searchParams:{cat?:string}}) {
  const cat = searchParams.cat||'all'
  const list = cat==='all'?articles:getArticlesByCategory(cat)
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <p className="section-label mb-2">記事一覧</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">ハンドメイド販売のノウハウ</h1>
      <div className="flex flex-wrap gap-2 mb-10">
        {cats.map(c=><Link key={c.slug} href={c.slug==='all'?'/articles':`/articles?cat=${c.slug}`} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${cat===c.slug?'bg-brand-green text-white':'bg-gray-100 text-gray-600 hover:bg-brand-green-light hover:text-brand-green'}`}>{c.label}</Link>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map(a=>(
          <Link key={a.slug} href={`/articles/${a.slug}`} className="card group">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-green-light rounded-xl flex-shrink-0 flex items-center justify-center text-2xl">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-brand-green bg-brand-green-light px-2 py-0.5 rounded">{a.category}</span>
                <h2 className="font-bold text-gray-900 mt-1 text-sm leading-snug group-hover:text-brand-green transition-colors line-clamp-2">{a.title}</h2>
                <p className="text-xs text-gray-400 mt-2">{a.date}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">{a.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
