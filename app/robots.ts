import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules:[
      {userAgent:'*',allow:'/'},
      {userAgent:'GPTBot',allow:'/'},
      {userAgent:'ChatGPT-User',allow:'/'},
      {userAgent:'anthropic-ai',allow:'/'},
      {userAgent:'ClaudeBot',allow:'/'},
      {userAgent:'PerplexityBot',allow:'/'},
      {userAgent:'Google-Extended',allow:'/'},
    ],
    sitemap:'https://urikata.jp/sitemap.xml',
  }
}
