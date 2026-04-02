'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

type Article = {
  slug: string
  title: string
  description: string
  category: string
  date: string
  emoji: string
}

type Props = {
  articles: Article[]
  currentCat: string
  perPage?: number
}

export default function ArticleSearch({ articles, currentCat, perPage = 12 }: Props) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!query.trim()) return articles
    const q = query.toLowerCase()
    return articles.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    )
  }, [articles, query])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-8">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="記事を検索..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-green transition-colors bg-white"
        />
        {query && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {filtered.length}件
          </span>
        )}
      </div>

      {/* Article grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-bold">「{query}」に一致する記事が見つかりませんでした</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {paginated.map(a => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="group block">
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-brand-green-light rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <span className="text-5xl">{a.emoji}</span>
              </div>
              <span className="tag">{a.category}</span>
              <h2 className="font-bold text-gray-900 mt-2 text-[15px] leading-snug group-hover:text-brand-green transition-colors line-clamp-2">
                {a.title}
              </h2>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{a.description}</p>
              <p className="text-xs text-gray-400 mt-2">{a.date}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-14">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:border-brand-green hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← 前へ
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && arr[i - 1] !== p - 1) acc.push('...')
                acc.push(p)
                return acc
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-gray-400">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                      page === p
                        ? 'bg-brand-green text-white'
                        : 'border border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:border-brand-green hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            次へ →
          </button>
        </div>
      )}
    </>
  )
}
