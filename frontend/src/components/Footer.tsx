export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="site-logo">
            <span className="logo-icon">₿</span> CryptoMaster
          </div>
          <p>Лучшие курсы по криптовалютам и блокчейн-бизнесу. Учим зарабатывать на крипте с 2019 года.</p>
        </div>
        <div className="footer-links">
          <h4>Курсы</h4>
          <ul>
            <li><a href="/blog">Все статьи</a></li>
            <li><a href="/blog?category=for-beginners">Для новичков</a></li>
            <li><a href="/blog?category=trading">Трейдинг</a></li>
            <li><a href="/blog?category=defi">DeFi</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Компания</h4>
          <ul>
            <li><a href="/about">О нас</a></li>
            <li><a href="/admin">Админ-панель</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Контакты</h4>
          <ul>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 CryptoMaster Academy. Все права защищены.</p>
      </div>
    </footer>
  )
}
