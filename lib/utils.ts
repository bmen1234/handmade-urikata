import type { Article } from './articles'

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * HTML本文中で他記事タイトルを検出し、内部リンクに自動変換する。
 *
 * 除外ルール:
 *  - <a>〜</a> 内に既に含まれているテキストはスキップ
 *  - タグ属性値（alt="..." title="..." 等）はスキップ
 *  - 1タイトルにつき本文全体で1回のみ置換
 *  - 6文字未満の短いタイトルは除外（誤マッチ防止）
 *  - 現在の記事自身はリンク対象外
 */
export function autoInternalLink(
  html: string,
  allArticles: Article[],
  currentSlug: string
): string {
  // 1. 対象記事を長いタイトル順に並べる
  const targets = allArticles
    .filter(a => a.slug !== currentSlug && a.title.length >= 6)
    .sort((a, b) => b.title.length - a.title.length)

  // 2. HTMLを「<a>内」と「それ以外」に分解
  //    セグメント配列: { text, insideAnchor }[]
  type Seg = { text: string; insideAnchor: boolean }
  const segments: Seg[] = []

  let cursor = 0
  // <a ...>...</a> を検出
  const anchorRe = /<a[\s\S]*?<\/a>/gi
  let am: RegExpExecArray | null
  while ((am = anchorRe.exec(html)) !== null) {
    if (am.index > cursor) {
      segments.push({ text: html.slice(cursor, am.index), insideAnchor: false })
    }
    segments.push({ text: am[0], insideAnchor: true })
    cursor = am.index + am[0].length
  }
  if (cursor < html.length) {
    segments.push({ text: html.slice(cursor), insideAnchor: false })
  }

  // 3. <a>外セグメントのみ置換、1タイトル1回制約はグローバルで管理
  const linked = new Set<string>()

  const processedSegments = segments.map(seg => {
    if (seg.insideAnchor) return seg.text

    let text = seg.text

    for (const target of targets) {
      if (linked.has(target.slug)) continue

      // タグ属性値を避けるため: テキストノード（>と<の間）のみを対象にする
      // ただしタグの中身は触らない → タグを保持しながらテキスト部分のみ置換
      const pat = escapeRegex(target.title)
      // 「タグ外のテキスト」を特定: >TEXTHERE< または ^TEXTHERE<
      const textNodeRe = new RegExp(
        `(>|^)([^<]*)\\b(${pat})\\b([^<]*)(<|$)`,
        'g'
      )

      let matched = false
      text = text.replace(textNodeRe, (full, pre, before, keyword, after, post) => {
        if (matched) return full
        matched = true
        linked.add(target.slug)
        return `${pre}${before}<a href="/articles/${target.slug}" class="internal-link">${keyword}</a>${after}${post}`
      })
    }

    return text
  })

  return processedSegments.join('')
}
