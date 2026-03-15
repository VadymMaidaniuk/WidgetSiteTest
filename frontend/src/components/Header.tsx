import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <Link href="/" className="site-logo">
          <span className="logo-icon">₿</span> CryptoMaster
        </Link>
        <nav>
          <ul className="nav-menu">
            <li><Link href="/">Главная</Link></li>
            <li><Link href="/blog">Блог</Link></li>
            <li><Link href="/about">О нас</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
