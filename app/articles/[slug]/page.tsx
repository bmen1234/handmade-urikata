import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles, articles, type Article } from "@/lib/articles"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import ConsultingCTA from "@/components/ConsultingCTA"

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

// ── 内部リンク自動挿入 ──────────────────────────────────────────
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function autoInternalLink(html: string, allArticles: Article[], currentSlug: string): string {
  // タイトルが長い順（長いほど精度が高い）にソート、短すぎる(6文字未満)は除外
  const targets = allArticles
    .filter(a => a.slug !== currentSlug && a.title.length >= 6)
    .sort((a, b) => b.title.length - a.title.length)

  let result = html
  const linked = new Set<string>() // 1記事につき1リンクのみ

  for (const target of targets) {
    if (linked.has(target.slug)) continue

    const pattern = escapeRegex(target.title)
    // テキストノード内のみマッチ（タグ属性・既存リンク内は除外）
    const regex = new RegExp(`(?<=>|^|[^a-zA-Z])(${pattern})(?=[^a-zA-Z]|<|$)`, 'g')

    let matched = false
    result = result.replace(regex, (full, captured) => {
      if (matched) return full
      // <a タグの中ではリンクしない（beforeに "<a" があってまだ閉じていない場合はスキップ）
      matched = true
      linked.add(target.slug)
      return full.replace(
        captured,
        `<a href="/articles/${target.slug}" class="internal-link">${captured}</a>`
      )
    })
  }

  return result
}

// ── Markdownコンテンツ取得 ─────────────────────────────────────
function getContent(slug: string): string {
  const filePath = path.join(process.cwd(), "content", "articles", `${slug}.md`)
  if (!fs.existsSync(filePath)) return ""
  const raw = fs.readFileSync(filePath, "utf-8")
  const { content } = matter(raw)
  return content.trim()
}

function buildHtml(md: string): string {
  // [テキスト](slug) → /articles/slug
  const withLinks = md.replace(
    /\[([^\]]+)\]\((?!https?:\/\/)(?!\/)([\w-]+)\)/g,
    (_m, text, href) => `[${text}](/articles/${href})`
  )
  marked.setOptions({ gfm: true, breaks: true })
  return marked.parse(withLinks) as string
}

// ── 目次抽出 ──────────────────────────────────────────────────
function extractToc(html: string) {
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

// ── FAQ JSON-LD 自動検出 ──────────────────────────────────────
// h3見出しが「？」で終わる場合、次の<p>を回答として拾う
function extractFaqSchema(html: string): object | null {
  const pairs: { q: string; a: string }[] = []
  // Split on h3 boundaries and check each section
  const sections = html.split(/<h3[^>]*>/)
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i]
    const h3End = section.indexOf('</h3>')
    if (h3End < 0) continue
    const q = section.slice(0, h3End).replace(/<[^>]+>/g, '').trim()
    if (!q.endsWith('？') && !q.endsWith('?')) continue
    // Find first <p> after </h3>
    const afterH3 = section.slice(h3End + 5)
    const pStart = afterH3.indexOf('<p>')
    const pEnd = afterH3.indexOf('</p>')
    if (pStart < 0 || pEnd < 0) continue
    const a = afterH3.slice(pStart + 3, pEnd).replace(/<[^>]+>/g, '').trim()
    if (a) pairs.push({ q, a })
  }
  if (pairs.length === 0) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}

// ── Person (著者) 構造化データ ────────────────────────────────
const authorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "売り方ラボ コンサルタント",
  jobTitle: "ハンドメイド販売コンサルタント",
  description: "minne・Creemaでのハンドメイド販売を10年以上研究。価格設定・SNS集客・ブランディング戦略を専門とするコンサルタント。",
  url: "https://urikata.jp",
  knowsAbout: [
    "ハンドメイド販売", "minne", "Creema", "価格設定", "SNS集客",
    "ブランディング", "Etsy", "ハンドメイド作家",
  ],
  sameAs: ["https://urikata.jp"],
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  // 記事 JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: "売り方ラボ コンサルタント",
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

  const related = getRelatedArticles(article, 3)
  const sidebarRecent = articles.filter(a => a.slug !== article.slug).slice(0, 5)

  // Markdownビルド → 内部リンク自動挿入
  const mdContent = getContent(article.slug)
  const rawHtml = buildHtml(mdContent)
  const htmlContent = autoInternalLink(rawHtml, articles, article.slug)

  const toc = extractToc(htmlContent)
  const faqSchema = extractFaqSchema(htmlContent)

  return (
    <>
      {/* Article JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Author (Person) JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      {/* FAQ JSON-LD（自動検出） */}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-8 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand-green transition-colors">トップ</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-brand-green transition-colors">記事一覧</Link>
          <span>/</span>
          <Link href={`/articles?cat=${encodeURIComponent(article.category)}`} className="hover:text-brand-green transition-colors">{article.category}</Link>
        </nav>

        <div className="flex flex-col lg:flex-row gap-14">
          {/* ── Main ── */}
          <article className="flex-1 min-w-0 max-w-[740px]">
            <span className="tag">{article.category}</span>
            <h1 className="font-serif text-2xl sm:text-[1.75rem] font-bold text-brand-green mt-3 mb-5 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-green rounded-full flex items-center justify-center text-white text-xs font-bold">売</div>
                <span className="font-medium text-gray-600">売り方ラボ コンサルタント</span>
              </div>
              <span>·</span>
              <time>{article.date}</time>
            </div>

            {/* Hero */}
            <div className="aspect-[16/9] bg-gradient-to-br from-brand-green-light via-white to-brand-gold-light rounded flex items-center justify-center mb-10 border border-gray-100">
              <span className="text-8xl">{article.emoji}</span>
            </div>

            {/* TOC */}
            {toc.length > 2 && (
              <div className="bg-brand-green-light border-l-4 border-brand-green rounded p-6 mb-10">
                <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-4">目次</p>
                <ol className="space-y-2">
                  {toc.map((item, i) => (
                    <li key={i} className={item.level === 3 ? "ml-5" : ""}>
                      <a href={`#${item.id}`} className="text-sm text-brand-green hover:text-brand-gold transition-colors leading-relaxed font-medium">
                        {item.level === 3 ? `└ ${item.text}` : `${i + 1}. ${item.text}`}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Body */}
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* Consulting CTA */}
            <ConsultingCTA variant="inline" />

            {/* Recommended (keyword-matched) */}
            {related.length > 0 && (
              <div className="mt-14 pt-10 border-t border-gray-100">
                <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-5">おすすめ記事</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map(a => (
                    <Link key={a.slug} href={`/articles/${a.slug}`} className="group block border border-gray-200 rounded p-4 hover:border-brand-gold transition-colors">
                      <div className="aspect-[16/9] bg-brand-green-light rounded flex items-center justify-center text-3xl mb-3">{a.emoji}</div>
                      <span className="tag">{a.category}</span>
                      <p className="text-xs font-bold text-gray-800 mt-2 line-clamp-2 group-hover:text-brand-green transition-colors leading-snug">{a.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="sticky top-20 space-y-7">
              {/* Consulting CTA (sidebar) */}
              <ConsultingCTA variant="sidebar" />

              {/* Author */}
              <div className="border border-gray-200 rounded p-5">
                <p className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-3">著者</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">売</div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">売り方ラボ コンサルタント</p>
                    <p className="text-xs text-brand-gold">ハンドメイド販売コンサルタント</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  minne・Creemaでの販売戦略を10年以上研究。価格設定・SEO・SNS集客を専門とし、作家の売上向上を支援。
                </p>
              </div>

              {/* Recent */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">新着記事</p>
                <div className="space-y-4">
                  {sidebarRecent.map(a => (
                    <Link key={a.slug} href={`/articles/${a.slug}`} className="flex gap-3 group">
                      <div className="w-12 h-12 bg-brand-green-light rounded flex-shrink-0 flex items-center justify-center text-lg border border-gray-100">{a.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-brand-gold">{a.category}</p>
                        <p className="text-xs font-medium text-gray-700 group-hover:text-brand-green transition-colors line-clamp-2 mt-0.5 leading-relaxed">{a.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">カテゴリ</p>
                <div className="flex flex-wrap gap-2">
                  {['minne攻略', 'Creema攻略', '価格設定', 'SNS集客', 'ブランディング', '収入・税金'].map(cat => (
                    <Link key={cat} href={`/articles?cat=${encodeURIComponent(cat)}`}
                      className="text-xs font-bold text-gray-600 bg-gray-100 hover:bg-brand-green hover:text-white px-3 py-1.5 rounded-sm transition-colors">
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
