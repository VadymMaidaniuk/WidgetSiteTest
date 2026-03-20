import Link from 'next/link'
import { footerLinks } from '@/lib/site-data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div>
          <p className="brand-title">Atlas Widget Docs</p>
          <p className="footer-note">
            Полностью статический сайт для деплоя на Vercel. Контент подготовлен так, чтобы
            проверять crawl depth, chunking, таблицы и точные ответы по фактам.
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
