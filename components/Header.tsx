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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="inline-block w-1 h-6 bg-brand-gold" />
          <span className="font-serif font-bold text-lg tracking-tight text-brand-green group-hover:text-brand-gold transition-colors">
            売り方ラボ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 flex-1">
          {nav.map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-gray-600 hover:text-brand-green font-medium transition-colors whitespace-nowrap">
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:contact@urikata.jp?subject=無料相談希望"
          className="hidden sm:inline-flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors tracking-wide whitespace-nowrap flex-shrink-0"
        >
          無料相談
        </a>

        <button className="md:hidden flex flex-col gap-1.5 p-2 flex-shrink-0" onClick={() => setOpen(!open)} aria-label="メニュー">
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
          <a
            href="mailto:contact@urikata.jp?subject=無料相談希望"
            className="flex items-center justify-center mx-4 my-3 bg-brand-gold text-white font-bold text-sm py-3 rounded-sm">
            無料相談を申し込む
          </a>
        </div>
      )}
    </header>
  )
}
