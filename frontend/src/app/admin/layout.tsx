'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './admin.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Verify token
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
        } else {
          setLoading(false)
        }
      })
      .catch(() => {
        localStorage.removeItem('admin_token')
        router.push('/admin/login')
      })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <Link href="/admin/dashboard">
            <span className="logo-icon">₿</span> CryptoMaster
          </Link>
        </div>
        <nav className="admin-nav">
          <Link href="/admin/dashboard" className="admin-nav-item">
            📊 Дашборд
          </Link>
          <Link href="/admin/posts" className="admin-nav-item">
            📝 Статьи
          </Link>
          <Link href="/admin/posts/new" className="admin-nav-item">
            ➕ Новая статья
          </Link>
          <Link href="/admin/categories" className="admin-nav-item">
            📁 Категории
          </Link>
          <Link href="/" className="admin-nav-item" target="_blank">
            🌐 Сайт
          </Link>
        </nav>
        <button onClick={handleLogout} className="admin-logout">
          🚪 Выйти
        </button>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}
