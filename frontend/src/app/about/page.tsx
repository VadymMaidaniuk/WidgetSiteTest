import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" style={{ minHeight: '50vh', paddingTop: '10rem' }}>
          <div className="hero-content">
            <h1>О <span className="gradient-text">CryptoMaster</span></h1>
            <p className="hero-description">
              Познакомься с командой, которая обучает криптовалютам и трейдингу
            </p>
          </div>
        </section>

        <section className="section">
          <div className="mentor-section">
            <div className="mentor-image">
              <div className="image-placeholder">👨‍💼</div>
            </div>
            <div className="mentor-content">
              <p className="subtitle">Основатель & Главный ментор</p>
              <h2>Лавриненко Святослав</h2>
              <p>
                Приветствую! Я криптоинвестор и трейдер с 2017 года. За это время я прошёл путь от
                новичка, потерявшего первые деньги на хайпах, до профессионала, управляющего портфелем.
              </p>
              <p>
                CryptoMaster Academy был основан с одной целью — помочь людям избежать моих ошибок
                и научить зарабатывать на криптовалютах системно и безопасно.
              </p>

              <div className="mentor-achievements">
                <div className="achievement">
                  <div className="achievement-number">7+</div>
                  <div className="achievement-label">Лет в крипте</div>
                </div>
                <div className="achievement">
                  <div className="achievement-number">$2M+</div>
                  <div className="achievement-label">Личный портфель</div>
                </div>
                <div className="achievement">
                  <div className="achievement-number">12,500+</div>
                  <div className="achievement-label">Студентов</div>
                </div>
                <div className="achievement">
                  <div className="achievement-number">94%</div>
                  <div className="achievement-label">Позитивных отзывов</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
          <div className="section-header">
            <h2 className="section-title">Наши <span className="gradient-text">принципы</span></h2>
            <p className="section-subtitle">То, во что мы верим и чему учим</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Практика важнее теории</h3>
              <p>Никакой воды. Только реальные стратегии, которые работают на живом рынке.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Безопасность прежде всего</h3>
              <p>Сначала учим защищать капитал, потом — зарабатывать. Риск-менеджмент в основе всего.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Честность</h3>
              <p>Мы не обещаем миллионы за неделю. Мы учим зарабатывать стабильно и системно.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Сообщество</h3>
              <p>Один в поле не воин. Наши студенты поддерживают друг друга и растут вместе.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Готов <span className="gradient-text">присоединиться</span>?</h2>
            <p>Начни свой путь в мире криптовалют с надёжной командой экспертов</p>
            <a href="/blog" className="btn btn-gold">📚 Читать блог</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
