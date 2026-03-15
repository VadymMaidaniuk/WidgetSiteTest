'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAdminPosts, getCurrentUser } from '@/lib/api'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) return

    Promise.all([
      getCurrentUser(token),
      getAdminPosts(token, 1, 100),
    ])
      .then(([userData, postsData]) => {
        setUser(userData)
        setPosts(postsData.posts.slice(0, 5))
        setStats({
          total: postsData.total,
          published: postsData.posts.filter((p: any) => p.status === 'published').length,
          drafts: postsData.posts.filter((p: any) => p.status === 'draft').length,
        })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="admin-loading">Загрузка...</div>
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Дашборд</h1>
        {user && <p>Добро пожаловать, {user.email}</p>}
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Всего статей</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#10b981' }}>{stats.published}</div>
          <div className="stat-label">Опубликовано</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#f59e0b' }}>{stats.drafts}</div>
          <div className="stat-label">Черновиков</div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2>Последние статьи</h2>
          <Link href="/admin/posts" className="btn btn-secondary">Все статьи →</Link>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <Link href={`/admin/posts/${post.id}`} className="post-link">
                      {post.title}
                    </Link>
                  </td>
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
                      <Link href={`/admin/posts/${post.id}`} className="btn-sm">✏️</Link>
                      <Link href={`/blog/${post.slug}`} target="_blank" className="btn-sm">👁️</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-section">
        <h2>Быстрые действия</h2>
        <div className="quick-actions">
          <Link href="/admin/posts/new" className="quick-action-card">
            <span className="quick-action-icon">📝</span>
            <span>Новая статья</span>
          </Link>
          <Link href="/admin/categories" className="quick-action-card">
            <span className="quick-action-icon">📁</span>
            <span>Категории</span>
          </Link>
          <Link href="/" target="_blank" className="quick-action-card">
            <span className="quick-action-icon">🌐</span>
            <span>Открыть сайт</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
