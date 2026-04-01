import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-black text-brand-green mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">ページが見つかりませんでした</h1>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary">トップページへ →</Link>
        <Link href="/articles" className="btn-secondary">記事一覧を見る</Link>
      </div>
    </div>
  )
}
