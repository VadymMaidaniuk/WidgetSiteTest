import type { Metadata } from 'next'
import { IBM_Plex_Mono, Manrope } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Atlas Widget Docs',
    template: '%s | Atlas Widget Docs',
  },
  description:
    'A simple multi-page knowledge base site for testing RAG parsers and content extraction quality.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${ibmPlexMono.variable}`}>
        <div className="site-backdrop" aria-hidden="true" />
        <div className="site-shell">
          <Header />
          <main className="main-shell">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
