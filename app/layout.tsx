import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const notoSans = Noto_Sans_JP({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
})
const notoSerif = Noto_Serif_JP({
  variable: '--font-noto-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://urikata.jp'),
  title: { default: 'ハンドメイド売り方ラボ | minne・Creemaで売れるノウハウ', template: '%s | 売り方ラボ' },
  description: 'ハンドメイド作家のための実践的な販売ノウハウメディア。minne・Creemaでの価格設定・写真撮影・SNS集客・ブランディングを徹底解説。',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: 'EKj2bQ1Mq4DCcWu5PHiTnYdIy5S_MJDDFb5Gv9mAAR8' },
  alternates: { canonical: 'https://urikata.jp' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="antialiased font-sans bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
