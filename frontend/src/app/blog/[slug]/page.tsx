import { Fragment } from 'react'
import { getPost, getPosts } from '@/lib/api'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface PostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const post = await getPost(params.slug)
    return {
      title: post.seo_title || `${post.title} - CryptoMaster Блог`,
      description: post.seo_description || post.excerpt,
    }
  } catch {
    return {
      title: 'Статья не найдена - CryptoMaster Блог',
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug).catch(() => notFound())

  const relatedPosts = post.category
    ? (await getPosts(1, 4, undefined, post.category.slug)).posts
        .filter(relatedPost => relatedPost.id !== post.id)
        .slice(0, 3)
    : []

  return (
    <>
      <Header />
      <main>
        <article className="post-article">
          <section className="post-hero">
            <div className="hero-content">
              {post.category && (
                <span className="hero-badge">{post.category.name}</span>
              )}
              <h1>{post.seo_title || post.title}</h1>
              <p className="hero-description">{post.excerpt}</p>
              <div className="post-meta">
                <span>
                  Опубликовано {post.published_at
                    ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: ru })
                    : format(new Date(post.created_at), 'd MMMM yyyy', { locale: ru })
                  }
                </span>
                {post.tags.length > 0 && (
                  <span className="post-tags">
                    Теги: {post.tags.map((tag, index) => (
                      <Fragment key={tag.id}>
                        {index > 0 && ', '}
                        <Link href={`/blog?tag=${tag.slug}`} className="tag-link">
                          {tag.name}
                        </Link>
                      </Fragment>
                    ))}
                  </span>
                )}
              </div>
            </div>
          </section>

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

          <section className="section">
            <div className="post-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </section>

          {post.seo_description && (
            <section className="section" style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
              <div className="section-header">
                <h2>О статье</h2>
                <p>{post.seo_description}</p>
              </div>
            </section>
          )}

          {post.category && relatedPosts.length > 0 && (
            <section className="section">
              <div className="section-header">
                <h2>{`Еще в категории "${post.category.name}"`}</h2>
              </div>
              <div className="courses-grid">
                {relatedPosts.map(relatedPost => (
                  <div key={relatedPost.id} className="course-card">
                    <div className="course-content">
                      <h3>
                        <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </h3>
                      <p>{relatedPost.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
