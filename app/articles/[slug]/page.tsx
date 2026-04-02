import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, articles } from "@/lib/articles"

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "売り方ラボ編集部",
      url: "https://urikata.jp",
    },
    publisher: {
      "@type": "Organization",
      name: "売り方ラボ",
      url: "https://urikata.jp",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://urikata.jp/articles/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  }

  const relatedArticles = articles.filter(a => a.slug !== article.slug && a.category === article.category).slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-brand-green">トップ</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-brand-green">記事一覧</Link>
          <span>/</span>
          <span className="text-gray-600">{article.category}</span>
        </nav>

        <span className="text-xs font-bold text-brand-green bg-brand-green-light px-3 py-1 rounded">
          {article.category}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-xs text-gray-400 mb-1">売り方ラボ編集部</p>
        <p className="text-sm text-gray-400 mb-8">{article.date}</p>

        <div className="prose-custom" dangerouslySetInnerHTML={{ __html: mdToHtml(article.content) }} />

        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="font-bold text-gray-900 mb-4">関連記事</h2>
            <div className="space-y-3">
              {relatedArticles.map(a => (
                <Link key={a.slug} href={`/articles/${a.slug}`}
                  className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-brand-green transition-colors group">
                  <span className="text-xl">{a.emoji}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-brand-green transition-colors line-clamp-1">
                    {a.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function mdToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/^(?!<[htul|])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "")
}
