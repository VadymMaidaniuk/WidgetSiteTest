'use client'

import { useEffect, useState } from 'react'
import { getCategories, createCategory, deleteCategory } from '@/lib/api'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' })
  const [saving, setSaving] = useState(false)

  const token = typeof window === 'undefined' ? null : window.localStorage.getItem('admin_token')

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    getCategories()
      .then(data => {
        setCategories(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.name || !newCategory.slug) return

    setSaving(true)
    try {
      const category = await createCategory(token!, newCategory)
      setCategories([...categories, category])
      setNewCategory({ name: '', slug: '' })
    } catch (error) {
      alert('Ошибка создания категории')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены? Это действие нельзя отменить.')) return

    try {
      await deleteCategory(token!, id)
      setCategories(categories.filter(c => c.id !== id))
    } catch (error) {
      alert('Ошибка удаления (возможно, категория используется в статьях)')
      console.error(error)
    }
  }

  if (loading) {
    return <div className="admin-loading">Загрузка...</div>
  }

  return (
    <div className="admin-categories-page">
      <div className="admin-header">
        <h1>Категории</h1>
      </div>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="admin-form-card">
        <h2>Новая категория</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Название"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Слаг (URL)"
            value={newCategory.slug}
            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? '...' : '➕ Создать'}
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Slug</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td><code>{cat.slug}</code></td>
                <td>{new Date(cat.created_at).toLocaleDateString('ru-RU')}</td>
                <td>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="btn-sm btn-danger"
                  >
                    🗑️ Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
