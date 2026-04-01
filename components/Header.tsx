'use client'
import Link from 'next/link'
import { useState } from 'react'
const nav = [
  {href:'/articles',label:'記事一覧'},
  {href:'/articles?cat=minne',label:'minne攻略'},
  {href:'/articles?cat=pricing',label:'価格設定'},
  {href:'/articles?cat=sns',label:'SNS集客'},
]
export default function Header() {
  const [open,setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-brand-green font-black text-xl tracking-tight">売り方ラボ</span>
          <span className="hidden sm:inline text-xs text-gray-400">ハンドメイド作家の売上を上げる</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(l=><Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-brand-green font-medium transition-colors">{l.label}</Link>)}
        </nav>
        <Link href="/articles" className="hidden sm:inline-flex btn-primary text-sm py-2 px-4">記事を読む</Link>
        <button className="md:hidden p-2" onClick={()=>setOpen(!open)}>
          <span className="block w-5 h-0.5 bg-gray-600 mb-1"/><span className="block w-5 h-0.5 bg-gray-600 mb-1"/><span className="block w-5 h-0.5 bg-gray-600"/>
        </button>
      </div>
      {open&&<div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
        {nav.map(l=><Link key={l.href} href={l.href} className="block text-sm text-gray-700 py-2 font-medium" onClick={()=>setOpen(false)}>{l.label}</Link>)}
      </div>}
    </header>
  )
}
