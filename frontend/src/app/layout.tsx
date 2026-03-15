import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter'
})

const poppins = Poppins({ 
  weight: ['600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'CryptoMaster Academy — Блог о криптовалютах и трейдинге',
  description: 'Практические курсы и статьи о криптовалютах, трейдинге и DeFi от экспертов рынка',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
