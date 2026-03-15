import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { getPosts, getCategories } from '@/lib/api'

interface BlogPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

function buildBlogUrl(params: {
  page?: number
  search?: string
  category?: string
  tag?: string
}) {
  const searchParams = new URLSearchParams()

  if (params.search) searchParams.set('search', params.search)
  if (params.category) searchParams.set('category', params.category)
  if (params.tag) searchParams.set('tag', params.tag)
  if (params.page && params.page > 1) searchParams.set('page', params.page.toString())

  const query = searchParams.toString()
  return query ? `/blog?${query}` : '/blog'
}

export default async function BlogPage({ searchParams = {} }: BlogPageProps) {
  const searchQuery = typeof searchParams.search === 'string'
    ? searchParams.search
    : ''

  const page = typeof searchParams.page === 'string'
    ? parseInt(searchParams.page, 10)
    : 1

  const category = typeof searchParams.category === 'string'
    ? searchParams.category
    : undefined

  const tag = typeof searchParams.tag === 'string'
    ? searchParams.tag
    : undefined

  const [{ posts, total_pages }, categories] = await Promise.all([
    getPosts(page, 10, searchQuery || undefined, category, tag).catch(() => ({
      posts: [],
      total: 0,
      page,
      page_size: 10,
      total_pages: 0,
    })),
    getCategories().catch(() => []),
  ])

  return (
    <>
      <Header />
      <main>
        <section className="hero" style={{ minHeight: '40vh', paddingTop: '10rem' }}>
          <div className="hero-content">
            <h1>CryptoMaster <span className="gradient-text">Блог</span></h1>
            <p className="hero-description">
              Статьи о криптовалютах, трейдинге и DeFi.
            </p>

            <form action="/blog" method="get" className="search-form">
              {category && <input type="hidden" name="category" value={category} />}
              {tag && <input type="hidden" name="tag" value={tag} />}
              <input
                name="search"
                type="text"
                placeholder="Поиск статей..."
                defaultValue={searchQuery}
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">Найти</button>
            </form>
          </div>
        </section>

        <section className="section">
          <div className="blog-layout">
            <aside className="blog-sidebar">
              <div className="filter-section">
                <h3>Категории</h3>
                <ul className="filter-list">
                  <li>
                    <Link
                      href={buildBlogUrl({ search: searchQuery || undefined, tag })}
                      className={!category ? 'active' : ''}
                    >
                      Все категории
                    </Link>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link
                        href={buildBlogUrl({
                          search: searchQuery || undefined,
                          category: cat.slug,
                          tag,
                        })}
                        className={category === cat.slug ? 'active' : ''}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="blog-content">
              {posts.length === 0 ? (
                <div className="no-posts">
                  <p>Статьи не найдены.</p>
                </div>
              ) : (
                <>
                  <div className="courses-grid">
                    {posts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>

                  {total_pages > 1 && (
                    <div className="pagination">
                      <Link
                        href={buildBlogUrl({
                          page: page - 1,
                          search: searchQuery || undefined,
                          category,
                          tag,
                        })}
                        className="btn btn-secondary"
                        aria-disabled={page <= 1}
                        style={page <= 1 ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
                      >
                        ← Назад
                      </Link>
                      <span className="page-info">
                        Страница {page} из {total_pages}
                      </span>
                      <Link
                        href={buildBlogUrl({
                          page: page + 1,
                          search: searchQuery || undefined,
                          category,
                          tag,
                        })}
                        className="btn btn-secondary"
                        aria-disabled={page >= total_pages}
                        style={page >= total_pages ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
                      >
                        Вперед →
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
