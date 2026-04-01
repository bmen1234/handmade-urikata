import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export const metadata: Metadata = {
  metadataBase: new URL('https://urikata.jp'),
  title: { default:'ハンドメイド売り方ラボ | minne・Creemaで売れるノウハウ', template:'%s | ハンドメイド売り方ラボ' },
  description:'ハンドメイド作家1,000名以上を指導した実績をもとに、minne・Creemaでの売り方・集客・価格設定を徹底解説。無料AIツールも使えます。',
  robots:{ index:true, follow:true, googleBot:{index:true,follow:true} },
}
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
