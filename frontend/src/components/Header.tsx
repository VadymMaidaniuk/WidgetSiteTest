import Link from 'next/link'
import { navigation } from '@/lib/site-data'

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Atlas Widget Docs home">
          <span className="brand-mark">AW</span>
          <span className="brand-copy">
            <span className="brand-title">Atlas Widget Docs</span>
            <span className="brand-subtitle">Тестовый сайт для RAG и parser checks</span>
          </span>
        </Link>
        <nav aria-label="Основная навигация">
          <ul className="nav-list">
            {navigation.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
