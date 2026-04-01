import { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://urikata.jp'
  const now = new Date()
  return [
    {url:base,lastModified:now,changeFrequency:'weekly',priority:1.0},
    {url:`${base}/articles`,lastModified:now,changeFrequency:'daily',priority:0.9},
    {url:`${base}/tools/price-calculator`,lastModified:now,changeFrequency:'monthly',priority:0.9},
    {url:`${base}/tools/title-generator`,lastModified:now,changeFrequency:'monthly',priority:0.9},
    {url:`${base}/tools/description-writer`,lastModified:now,changeFrequency:'monthly',priority:0.9},
    ...articles.map(a=>({url:`${base}/articles/${a.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:0.8}))
  ]
}
