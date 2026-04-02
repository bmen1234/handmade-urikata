import Link from 'next/link'
import { articles, getArticlesByCategory } from '@/lib/articles'
import ArticleSearch from '@/components/ArticleSearch'

export const metadata = { title: '記事一覧 | 売り方ラボ' }

const cats = [
  { slug: 'all', label: 'すべて' },
  { slug: 'minne攻略', label: 'minne攻略' },
  { slug: 'Creema攻略', label: 'Creema攻略' },
  { slug: '価格設定', label: '価格設定' },
  { slug: 'SNS集客', label: 'SNS集客' },
  { slug: 'ブランディング', label: 'ブランディング' },
  { slug: '収入・税金', label: '収入・税金' },
]

export default function ArticlesPage({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = searchParams.cat || 'all'
  const list = cat === 'all' ? articles : getArticlesByCategory(cat)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="section-label mb-2">記事一覧</p>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          {cat !== 'all' ? `${cat}の記事` : 'ハンドメイド販売ノウハウ'}
        </h1>
        <p className="text-gray-500 mt-2 text-[15px]">{list.length}本の記事</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-100">
        {cats.map(c => (
          <Link key={c.slug}
            href={c.slug === 'all' ? '/articles' : `/articles?cat=${encodeURIComponent(c.slug)}`}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              cat === c.slug
                ? 'bg-brand-green text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-brand-green-light hover:text-brand-green'
            }`}>
            {c.label}
          </Link>
        ))}
      </div>

      <ArticleSearch articles={list} currentCat={cat} perPage={12} />
    </div>
  )
}
