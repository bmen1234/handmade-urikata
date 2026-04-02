import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

export type Article = {
  slug: string
  title: string
  description: string
  category: string
  date: string
  emoji: string
  keywords: string[]
}

function loadArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) return []

  const files = fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .sort()

  const result: Article[] = []

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8')
    const { data } = matter(raw)

    result.push({
      slug: (data.slug as string) || slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || '',
      category: (data.category as string) || 'minne攻略',
      date: (data.date as string) || '2026年4月1日',
      emoji: (data.emoji as string) || '📝',
      keywords: (data.keywords as string[]) || [],
    })
  }

  // Sort by date desc
  result.sort((a, b) => {
    const parseDate = (s: string) => {
      const m = s.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
      return m ? new Date(+m[1], +m[2] - 1, +m[3]).getTime() : 0
    }
    return parseDate(b.date) - parseDate(a.date)
  })

  return result
}

export const articles = loadArticles()

export const getArticleBySlug = (slug: string) =>
  articles.find(a => a.slug === slug)

export const getArticlesByCategory = (cat: string) =>
  articles.filter(a => a.category === cat)

export const getRelatedArticles = (current: Article, limit = 3): Article[] => {
  const scored = articles
    .filter(a => a.slug !== current.slug)
    .map(a => {
      const overlap = a.keywords.filter(k => current.keywords.includes(k)).length
      const sameCategory = a.category === current.category ? 2 : 0
      return { article: a, score: overlap + sameCategory }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(({ article }) => article)
}
