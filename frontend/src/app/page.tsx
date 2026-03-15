import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { getPosts, getCategories } from '@/lib/api'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(1, 3).catch(() => ({
      posts: [],
      total: 0,
      page: 1,
      page_size: 3,
      total_pages: 0,
    })),
    getCategories().catch(() => []),
  ])

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">
              <span className="pulse"></span>
              🔥 Новые статьи каждую неделю
            </span>
            <h1>CryptoMaster <span className="gradient-text">Блог</span></h1>
            <p className="hero-description">
              Практические статьи о криптовалютах, трейдинге и DeFi от экспертов рынка
            </p>
            <div className="hero-buttons">
              <a href="/blog" className="btn btn-primary">
                📚 Читать блог
              </a>
              <a href="/admin" className="btn btn-secondary">
                🔐 Админ-панель
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="stat-card">
            <div className="stat-number">{posts.total}+</div>
            <div className="stat-label">Статей</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{categories.length}</div>
            <div className="stat-label">Категорий</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">200+</div>
            <div className="stat-label">Часов контента</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">94%</div>
            <div className="stat-label">Довольных читателей</div>
          </div>
        </section>

        {/* Latest Posts */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Последние <span className="gradient-text">статьи</span></h2>
            <p className="section-subtitle">Свежие материалы о криптовалютах и трейдинге</p>
          </div>
          <div className="courses-grid">
            {posts.posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/blog" className="btn btn-primary">Все статьи →</a>
          </div>
        </section>

        {/* Categories */}
        <section className="section" style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
          <div className="section-header">
            <h2 className="section-title">Категории</h2>
            <p className="section-subtitle">Выберите интересующую вас тему</p>
          </div>
          <div className="features-grid">
            {categories.map(category => (
              <a 
                key={category.id} 
                href={`/blog?category=${category.slug}`}
                className="feature-card"
                style={{ textAlign: 'center', textDecoration: 'none' }}
              >
                <div className="feature-icon">📁</div>
                <h3>{category.name}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Готов начать <span className="gradient-text">обучение</span>?</h2>
            <p>Присоединяйся к 12,500+ успешных студентов и начни свой путь к финансовой свободе</p>
            <a href="/blog" className="btn btn-gold">🚀 Читать блог</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
