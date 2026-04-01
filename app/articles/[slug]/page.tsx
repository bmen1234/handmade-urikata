import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, articles } from '@/lib/articles'
export async function generateStaticParams() { return articles.map(a=>({slug:a.slug})) }
export async function generateMetadata({params}:{params:{slug:string}}) {
  const a = getArticleBySlug(params.slug)
  if(!a) return {}
  return {title:a.title, description:a.description, keywords:a.keywords}
}
function mdToHtml(md:string) {
  return md
    .replace(/^## (.+)$/gm,'<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b-2 border-green-100">$1</h2>')
    .replace(/^### (.+)$/gm,'<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g,'<strong class="font-bold text-gray-900">$1</strong>')
    .replace(/^(?!<[h])(.+)$/gm,'<p class="text-gray-700 leading-relaxed mb-4">$1</p>')
    .replace(/<p class="text-gray-700 leading-relaxed mb-4"><\/p>/g,'')
}
export default function ArticlePage({params}:{params:{slug:string}}) {
  const a = getArticleBySlug(params.slug)
  if(!a) notFound()
  const related = articles.filter(x=>x.slug!==a.slug&&x.category===a.category).slice(0,3)
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-brand-green">トップ</Link><span>/</span>
        <Link href="/articles" className="hover:text-brand-green">記事一覧</Link><span>/</span>
        <span className="text-gray-600">{a.category}</span>
      </nav>
      <span className="text-xs font-bold text-brand-green bg-brand-green-light px-3 py-1 rounded">{a.category}</span>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-4 leading-tight">{a.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{a.date}</p>
      <div dangerouslySetInnerHTML={{__html:mdToHtml(a.content)}}/>
      <div className="mt-12 bg-brand-green-light border border-green-200 rounded-2xl p-6">
        <p className="font-bold text-brand-green mb-1">この記事と一緒に使えるAIツール</p>
        <p className="text-sm text-gray-600 mb-4">登録不要・無料で今すぐ使えます</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/tools/price-calculator" className="btn-primary text-sm py-2.5 px-5">価格計算AIを使う →</Link>
          <Link href="/tools/title-generator" className="btn-secondary text-sm py-2.5 px-5">タイトル生成AIを使う →</Link>
        </div>
      </div>
      {related.length>0&&(
        <div className="mt-12">
          <h2 className="font-bold text-gray-900 mb-4">関連記事</h2>
          <div className="space-y-3">
            {related.map(r=>(
              <Link key={r.slug} href={`/articles/${r.slug}`} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-brand-green transition-colors group">
                <span className="text-xl">{r.emoji}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-brand-green transition-colors line-clamp-1">{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
