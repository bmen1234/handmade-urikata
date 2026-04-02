import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles, articles } from "@/lib/articles"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

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
    alternates: { canonical: `https://urikata.jp/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://urikata.jp/articles/${article.slug}`,
    },
  }
}

function getContent(slug: string): string {
  const filePath = path.join(process.cwd(), "content", "articles", `${slug}.md`)
  if (!fs.existsSync(filePath)) return ""
  const raw = fs.readFileSync(filePath, "utf-8")
  const { content } = matter(raw)
  return content.trim()
}

function buildHtml(md: string): string {
  // Convert internal slug-only links to /articles/slug
  const withLinks = md.replace(
    /\[([^\]]+)\]\((?!https?:\/\/)(?!\/)([\w-]+)\)/g,
    (_m, text, href) => `[${text}](/articles/${href})`
  )
  marked.setOptions({ gfm: true, breaks: true })
  return marked.parse(withLinks) as string
}

function extractToc(html: string): { text: string; id: string; level: number }[] {
  const items: { text: string; id: string; level: number }[] = []
  const regex = /<h([23])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[23]>/g
  let m: RegExpExecArray | null
  while ((m = regex.exec(html)) !== null) {
    const text = m[3].replace(/<[^>]+>/g, '')
    const id = m[2] || text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')
    items.push({ level: parseInt(m[1]), id, text })
  }
  return items
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
    author: { "@type": "Organization", name: "売り方ラボ編集部", url: "https://urikata.jp" },
    publisher: { "@type": "Organization", name: "売り方ラボ", url: "https://urikata.jp" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://urikata.jp/articles/${article.slug}` },
    keywords: article.keywords.join(", "),
  }

  const related = getRelatedArticles(article, 3)
  const sidebarRecent = articles.filter(a => a.slug !== article.slug).slice(0, 6)

  const mdContent = getContent(article.slug)
  const htmlContent = buildHtml(mdContent)
  const toc = extractToc(htmlContent)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-xs text-gray-400 mb-8 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-green transition-colors">トップ</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-brand-green transition-colors">記事一覧</Link>
          <span>/</span>
          <Link href={`/articles?cat=${encodeURIComponent(article.category)}`} className="hover:text-brand-green transition-colors">{article.category}</Link>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          <article className="flex-1 min-w-0 max-w-[740px]">
            <span className="tag">{article.category}</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-5 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100 text-sm text-gray-400">
              <span className="font-medium text-gray-600">売り方ラボ編集部</span>
              <span>·</span>
              <time>{article.date}</time>
            </div>

            <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-brand-green-light rounded-2xl flex items-center justify-center mb-10">
              <span className="text-8xl">{article.emoji}</span>
            </div>

            {toc.length > 2 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                <p className="text-xs font-bold tracking-widest uppercase text-brand-green mb-4">目次</p>
                <ol className="space-y-2">
                  {toc.map((item, i) => (
                    <li key={i} className={item.level === 3 ? "ml-5" : ""}>
                      <a href={`#${item.id}`} className="text-sm text-gray-600 hover:text-brand-green transition-colors leading-relaxed">
                        {item.level === 3 ? `└ ${item.text}` : `${i + 1}. ${item.text}`}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="prose-article" dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {related.length > 0 && (
              <div className="mt-14 pt-10 border-t border-gray-100">
                <p className="text-xs font-bold tracking-widest uppercase text-brand-green mb-5">おすすめ記事</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map(a => (
                    <Link key={a.slug} href={`/articles/${a.slug}`} className="group block border border-gray-100 rounded-xl p-4 hover:border-brand-green transition-colors">
                      <div className="aspect-[16/9] bg-brand-green-light rounded-lg flex items-center justify-center text-3xl mb-3">{a.emoji}</div>
                      <span className="tag">{a.category}</span>
                      <p className="text-xs font-bold text-gray-800 mt-2 line-clamp-2 group-hover:text-brand-green transition-colors leading-snug">{a.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-14 bg-brand-green-light border border-brand-green/20 rounded-2xl p-7 text-center">
              <p className="text-xs font-bold tracking-widest uppercase text-brand-green mb-2">もっと売り方を学ぶ</p>
              <p className="font-serif text-xl font-bold text-gray-900 mb-4">180本以上の記事を無料で読めます</p>
              <Link href="/articles" className="btn-primary inline-flex">記事一覧を見る →</Link>
            </div>
          </article>

          <aside className="lg:w-[300px] flex-shrink-0">
            <div className="sticky top-20 space-y-8">
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">売</div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">売り方ラボ編集部</p>
                    <p className="text-xs text-gray-400">ハンドメイド販売研究チーム</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  minneとCreemaで本当に売れるためのノウハウを10年以上研究。実際に効果のあった方法だけを発信しています。
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
                <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">お知らせ</p>
                <p className="text-sm font-bold text-gray-700 mb-3">売り方ラボ<br />コミュニティ準備中</p>
                <p className="text-xs text-gray-400 leading-relaxed">作家仲間と学べる場を<br />近日オープン予定です</p>
              </div>

              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">新着記事</p>
                <div className="space-y-4">
                  {sidebarRecent.map(a => (
                    <Link key={a.slug} href={`/articles/${a.slug}`} className="flex gap-3 group">
                      <div className="w-14 h-14 bg-brand-green-light rounded-lg flex-shrink-0 flex items-center justify-center text-xl">{a.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-brand-green">{a.category}</p>
                        <p className="text-xs font-medium text-gray-700 group-hover:text-brand-green transition-colors line-clamp-2 mt-0.5 leading-relaxed">{a.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">カテゴリ</p>
                <div className="flex flex-wrap gap-2">
                  {['minne攻略', 'Creema攻略', '価格設定', 'SNS集客', 'ブランディング', '収入・税金'].map(cat => (
                    <Link key={cat} href={`/articles?cat=${encodeURIComponent(cat)}`}
                      className="text-xs font-bold text-gray-600 bg-gray-100 hover:bg-brand-green-light hover:text-brand-green px-3 py-1.5 rounded-full transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
