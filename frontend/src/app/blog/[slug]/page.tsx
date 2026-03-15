import { getPost, getCategories } from '@/lib/api'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params
  try {
    const post = await getPost(resolvedParams.slug)
    return {
      title: post.seo_title || `${post.title} — CryptoMaster Blog`,
      description: post.seo_description || post.excerpt,
    }
  } catch {
    return {
      title: 'Статья не найдена — CryptoMaster Blog',
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  let post
  
  try {
    post = await getPost(resolvedParams.slug)
  } catch {
    notFound()
  }

  const categories = await getCategories()

  return (
    <>
      <Header />
      <main>
        <article className="post-article">
          {/* Hero with cover image */}
          <section className="post-hero">
            <div className="hero-content">
              {post.category && (
                <span className="hero-badge">{post.category.name}</span>
              )}
              <h1>{post.seo_title || post.title}</h1>
              <p className="hero-description">{post.excerpt}</p>
              <div className="post-meta">
                <span>
                  📅 {post.published_at 
                    ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: ru })
                    : format(new Date(post.created_at), 'd MMMM yyyy', { locale: ru })
                  }
                </span>
                {post.tags.length > 0 && (
                  <span className="post-tags">
                    🏷️ {post.tags.map(tag => (
                      <Link key={tag.id} href={`/blog?tag=${tag.slug}`} className="tag-link">
                        {tag.name}
                      </Link>
                    )).reduce((prev, curr) => [prev, ', ', curr])}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="post-cover">
              <Image
                src={`${API_URL}${post.cover_image}`}
                alt={post.title}
                width={1200}
                height={600}
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <section className="section">
            <div className="post-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </section>

          {/* SEO Section */}
          {post.seo_description && (
            <section className="section" style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
              <div className="section-header">
                <h2>О статье</h2>
                <p>{post.seo_description}</p>
              </div>
            </section>
          )}

          {/* Related Posts by Category */}
          {post.category && (
            <section className="section">
              <div className="section-header">
                <h2>Другие статьи в категории "{post.category.name}"</h2>
              </div>
              <div className="courses-grid">
                <RelatedPosts categorySlug={post.category.slug} currentPostId={post.id} />
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}

async function RelatedPosts({ categorySlug, currentPostId }: { categorySlug: string, currentPostId: number }) {
  try {
    const { posts } = await getPosts(1, 3, undefined, categorySlug)
    const relatedPosts = posts.filter(p => p.id !== currentPostId).slice(0, 3)
    
    if (relatedPosts.length === 0) {
      return null
    }
    
    return (
      <>
        {relatedPosts.map(post => (
          <div key={post.id} className="course-card">
            <div className="course-content">
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </>
    )
  } catch {
    return null
  }
}
