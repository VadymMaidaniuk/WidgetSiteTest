import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/api'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface PostCardProps {
  post: Post
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="course-card">
      {post.cover_image && (
        <div className="course-image" style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
          overflow: 'hidden'
        }}>
          <Image
            src={`${API_URL}${post.cover_image}`}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      {!post.cover_image && (
        <div className="course-image" style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)'
        }}>
          📝
        </div>
      )}
      <div className="course-content">
        {post.category && (
          <span className="course-badge">{post.category.name}</span>
        )}
        <h3>
          <Link href={`/blog/${post.slug}`}>
            {post.seo_title || post.title}
          </Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="course-meta">
          <span className="course-duration">
            📅 {post.published_at 
              ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: ru })
              : format(new Date(post.created_at), 'd MMMM yyyy', { locale: ru })
            }
          </span>
          {post.tags.length > 0 && (
            <span className="course-duration">
              🏷️ {post.tags.length}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
