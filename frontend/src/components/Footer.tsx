import Link from 'next/link'
import { footerLinks } from '@/lib/site-data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div>
          <p className="brand-title">Atlas Widget Docs</p>
          <p className="footer-note">
            A fully static site for Vercel deployment. The content is designed to test crawl depth,
            chunking, tables, and exact fact retrieval.
          </p>
        </div>
        <div className="footer-links">
          {footerLinks.map(link => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
