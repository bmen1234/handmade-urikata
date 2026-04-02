'use client'
import Link from 'next/link'
import { useState } from 'react'

const nav = [
  { href: '/articles', label: '記事一覧' },
  { href: '/articles?cat=minne攻略', label: 'minne攻略' },
  { href: '/articles?cat=価格設定', label: '価格設定' },
  { href: '/articles?cat=SNS集客', label: 'SNS集客' },
  { href: '/articles?cat=ブランディング', label: 'ブランディング' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="inline-block w-2 h-5 bg-brand-green rounded-sm" />
          <span className="font-black text-lg tracking-tight text-gray-900 group-hover:text-brand-green transition-colors">
            売り方ラボ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-gray-600 hover:text-brand-green font-medium transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="メニュー">
          <span className={`block w-5 h-0.5 bg-gray-700 transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          {nav.map(l => (
            <Link key={l.href} href={l.href}
              className="flex items-center px-5 py-3.5 text-sm font-medium text-gray-700 hover:text-brand-green hover:bg-gray-50 border-b border-gray-50 transition-colors"
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
