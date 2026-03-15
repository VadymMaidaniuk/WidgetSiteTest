'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { getAdminPost, updatePost, createPost, uploadImage, getCategories, getTags } from '@/lib/api'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  const isEdit = postId !== 'new'

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    seo_title: '',
    seo_description: '',
    category_id: null as number | null,
    tag_ids: [] as number[],
    status: 'draft' as 'draft' | 'published',
  })

  const token = localStorage.getItem('admin_token')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }))
    },
  })

  useEffect(() => {
    if (!token) {
      router.push('/admin/login')
      return
    }

    Promise.all([
      getCategories(),
      getTags(),
    ])
      .then(([cats, tagsData]) => {
        setCategories(cats)
        setTags(tagsData)
      })
      .catch(console.error)

    if (isEdit) {
      getAdminPost(token!, parseInt(postId))
        .then(post => {
          setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || '',
            content: post.content,
            cover_image: post.cover_image || '',
            seo_title: post.seo_title || '',
            seo_description: post.seo_description || '',
            category_id: post.category_id || null,
            tag_ids: post.tags.map(t => t.id),
            status: post.status,
          })
          editor?.commands.setContent(post.content)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token, router, isEdit, postId, editor])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadImage(token!, file)
      setFormData(prev => ({ ...prev, cover_image: result.url }))
    } catch (error) {
      alert('Ошибка загрузки изображения')
      console.error(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (isEdit) {
        await updatePost(token!, parseInt(postId), formData)
      } else {
        await createPost(token!, formData)
      }
      router.push('/admin/posts')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ошибка сохранения')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const addImage = () => {
    const url = window.prompt('Введите URL изображения')
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Введите URL ссылки')
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  if (loading) {
    return <div className="admin-loading">Загрузка...</div>
  }

  return (
    <div className="edit-post-page">
      <div className="admin-header">
        <h1>{isEdit ? 'Редактировать статью' : 'Новая статья'}</h1>
        <button 
          onClick={handleSubmit} 
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? 'Сохранение...' : '💾 Сохранить'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-post-form">
        {/* Main Content */}
        <div className="edit-post-main">
          <div className="form-group">
            <label htmlFor="title">Заголовок *</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Введите заголовок статьи"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug (URL) *</label>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              placeholder="my-article-slug"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Краткое описание</label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              placeholder="Краткое описание для превью"
            />
          </div>

          <div className="form-group">
            <label>Контент *</label>
            <div className="menu-bar">
              <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>
                <b>B</b>
              </button>
              <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>
                <i>I</i>
              </button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                H2
              </button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
                H3
              </button>
              <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                • Список
              </button>
              <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
                1. Нумерованный
              </button>
              <button type="button" onClick={addImage}>
                🖼️ Изображение
              </button>
              <button type="button" onClick={addLink}>
                🔗 Ссылка
              </button>
            </div>
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="edit-post-sidebar">
          {/* Cover Image */}
          <div className="form-group">
            <label>Обложка</label>
            {formData.cover_image && (
              <div className="cover-preview">
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${formData.cover_image}`} alt="Cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, cover_image: '' })}
                  className="remove-cover"
                >
                  ✕
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              value={formData.category_id || ''}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value ? Number(e.target.value) : null })}
            >
              <option value="">Без категории</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>Теги</label>
            <div className="tags-selector">
              {tags.map(tag => (
                <label key={tag.id} className="tag-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.tag_ids.includes(tag.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, tag_ids: [...formData.tag_ids, tag.id] })
                      } else {
                        setFormData({ ...formData, tag_ids: formData.tag_ids.filter(id => id !== tag.id) })
                      }
                    }}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
            >
              <option value="draft">⏳ Черновик</option>
              <option value="published">✅ Опубликован</option>
            </select>
          </div>

          {/* SEO */}
          <div className="form-group">
            <label htmlFor="seo_title">SEO Title</label>
            <input
              id="seo_title"
              type="text"
              value={formData.seo_title}
              onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
              placeholder={formData.title}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seo_description">SEO Description</label>
            <textarea
              id="seo_description"
              value={formData.seo_description}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              rows={3}
              placeholder={formData.excerpt}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
