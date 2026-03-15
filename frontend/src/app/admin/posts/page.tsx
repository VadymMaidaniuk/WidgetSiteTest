'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAdminPosts, deletePost } from '@/lib/api'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const token = typeof window === 'undefined' ? null : window.localStorage.getItem('admin_token')

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    getAdminPosts(token, 1, 100)
      .then(data => {
        setPosts(data.posts)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  const handleDelete = async (postId: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) return

    try {
      await deletePost(token!, postId)
      setPosts(posts.filter(p => p.id !== postId))
    } catch (error) {
      alert('Ошибка при удалении')
      console.error(error)
    }
  }

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.status === 'published'
    if (filter === 'draft') return post.status === 'draft'
    return true
  })

  if (loading) {
    return <div className="admin-loading">Загрузка...</div>
  }

  return (
    <div className="admin-posts-page">
      <div className="admin-header">
        <h1>Статьи</h1>
        <Link href="/admin/posts/new" className="btn btn-primary">➕ Новая статья</Link>
      </div>

      {/* Filter Tabs */}
      <div className="admin-filter-tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Все ({posts.length})
        </button>
        <button
          className={filter === 'published' ? 'active' : ''}
          onClick={() => setFilter('published')}
        >
          Опубликованные ({posts.filter(p => p.status === 'published').length})
        </button>
        <button
          className={filter === 'draft' ? 'active' : ''}
          onClick={() => setFilter('draft')}
        >
          Черновики ({posts.filter(p => p.status === 'draft').length})
        </button>
      </div>

      {/* Posts Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Категория</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td>
                  <Link href={`/admin/posts/${post.id}`} className="post-link">
                    {post.title}
                  </Link>
                </td>
                <td>{post.category?.name || '—'}</td>
                <td>
                  <span className={`status-badge ${post.status}`}>
                    {post.status === 'published' ? '✅ Опубликован' : '⏳ Черновик'}
                  </span>
                </td>
                <td>
                  {post.published_at 
                    ? format(new Date(post.published_at), 'dd.MM.yyyy', { locale: ru })
                    : format(new Date(post.created_at), 'dd.MM.yyyy', { locale: ru })
                  }
                </td>
                <td>
                  <div className="action-buttons">
                    <Link href={`/admin/posts/${post.id}`} className="btn-sm" title="Редактировать">✏️</Link>
                    <Link href={`/blog/${post.slug}`} target="_blank" className="btn-sm" title="Просмотр">👁️</Link>
                    <button 
                      onClick={() => handleDelete(post.id)} 
                      className="btn-sm btn-danger"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
