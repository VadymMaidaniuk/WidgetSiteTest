'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { use } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { getPosts, getCategories } from '@/lib/api'

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = use(searchParams)
  const router = useRouter()
  
  const [searchQuery, setSearchQuery] = useState(
    typeof resolvedSearchParams.search === 'string' 
      ? resolvedSearchParams.search 
      : ''
  )
  
  const page = typeof resolvedSearchParams.page === 'string' 
    ? parseInt(resolvedSearchParams.page) 
    : 1
  
  const category = typeof resolvedSearchParams.category === 'string'
    ? resolvedSearchParams.category
    : undefined
  
  const tag = typeof resolvedSearchParams.tag === 'string'
    ? resolvedSearchParams.tag
    : undefined

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (category) params.set('category', category)
    if (tag) params.set('tag', tag)
    params.set('page', '1')
    router.push(`/blog?${params.toString()}`)
  }

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(resolvedSearchParams as Record<string, string>)
    if (newCategory) {
      params.set('category', newCategory)
    } else {
      params.delete('category')
    }
    params.set('page', '1')
    router.push(`/blog?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(resolvedSearchParams as Record<string, string>)
    params.set('page', newPage.toString())
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero" style={{ minHeight: '40vh', paddingTop: '10rem' }}>
          <div className="hero-content">
            <h1>Блог <span className="gradient-text">CryptoMaster</span></h1>
            <p className="hero-description">
              Статьи о криптовалютах, трейдинге и DeFi
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">🔍 Найти</button>
            </form>
          </div>
        </section>

        <section className="section">
          <div className="blog-layout">
            {/* Sidebar with filters */}
            <aside className="blog-sidebar">
              <div className="filter-section">
                <h3>Категории</h3>
                <ul className="filter-list">
                  <li>
                    <button
                      onClick={() => handleCategoryChange('')}
                      className={!category ? 'active' : ''}
                    >
                      Все категории
                    </button>
                  </li>
                  <CategoryList 
                    currentCategory={category} 
                    onCategoryChange={handleCategoryChange} 
                  />
                </ul>
              </div>
            </aside>

            {/* Posts grid */}
            <div className="blog-content">
              <BlogPostsList 
                page={page} 
                category={category} 
                tag={tag} 
                search={searchQuery}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

async function CategoryList({ 
  currentCategory, 
  onCategoryChange 
}: { 
  currentCategory?: string
  onCategoryChange: (slug: string) => void
}) {
  const categories = await getCategories()
  
  return (
    <>
      {categories.map(cat => (
        <li key={cat.id}>
          <button
            onClick={() => onCategoryChange(cat.slug)}
            className={currentCategory === cat.slug ? 'active' : ''}
          >
            {cat.name}
          </button>
        </li>
      ))}
    </>
  )
}

async function BlogPostsList({ 
  page, 
  category, 
  tag, 
  search 
}: { 
  page: number
  category?: string
  tag?: string
  search?: string
}) {
  const { posts, total, total_pages } = await getPosts(page, 10, search, category, tag)
  
  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <p>Статьи не найдены</p>
      </div>
    )
  }
  
  return (
    <>
      <div className="courses-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Pagination */}
      {total_pages > 1 && (
        <div className="pagination">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('page-change', { detail: page - 1 }))}
            disabled={page <= 1}
            className="btn btn-secondary"
          >
            ← Назад
          </button>
          <span className="page-info">
            Страница {page} из {total_pages}
          </span>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('page-change', { detail: page + 1 }))}
            disabled={page >= total_pages}
            className="btn btn-secondary"
          >
            Вперед →
          </button>
        </div>
      )}
    </>
  )
}
