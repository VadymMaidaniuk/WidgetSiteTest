const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export type PostStatus = 'draft' | 'published'

export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  seo_title: string | null
  seo_description: string | null
  category_id: number | null
  tag_ids?: number[] | null
  status: PostStatus
  published_at: string | null
  created_at: string
  updated_at: string
  category: Category | null
  tags: Tag[]
}

export interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface PostListResponse {
  posts: Post[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

// ===== Public API =====

export async function getPosts(
  page = 1,
  pageSize = 10,
  search?: string,
  category?: string,
  tag?: string
): Promise<PostListResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  })
  
  if (search) params.append('search', search)
  if (category) params.append('category', category)
  if (tag) params.append('tag', tag)
  
  const res = await fetch(`${API_URL}/api/posts?${params}`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Не удалось загрузить статьи')
  }
  
  return res.json()
}

export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${API_URL}/api/posts/${slug}`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Не удалось загрузить статью')
  }
  
  return res.json()
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Не удалось загрузить категории')
  }
  
  return res.json()
}

export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${API_URL}/api/tags`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Не удалось загрузить теги')
  }
  
  return res.json()
}

// ===== Admin API =====

export async function login(email: string, password: string): Promise<{ access_token: string }> {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Не удалось выполнить вход')
  }
  
  return res.json()
}

export async function getCurrentUser(token: string) {
  const res = await fetch(`${API_URL}/api/admin/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!res.ok) {
    throw new Error('Требуется авторизация')
  }
  
  return res.json()
}

export async function getAdminPosts(token: string, page = 1, pageSize = 10, status?: PostStatus): Promise<PostListResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  })
  
  if (status) params.append('status', status)
  
  const res = await fetch(`${API_URL}/api/admin/posts?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!res.ok) {
    throw new Error('Не удалось загрузить статьи')
  }
  
  return res.json()
}

export async function getAdminPost(token: string, postId: number): Promise<Post> {
  const res = await fetch(`${API_URL}/api/admin/posts/${postId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!res.ok) {
    throw new Error('Не удалось загрузить статью')
  }
  
  return res.json()
}

export async function createPost(token: string, post: Partial<Post>): Promise<Post> {
  const res = await fetch(`${API_URL}/api/admin/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Не удалось создать статью')
  }
  
  return res.json()
}

export async function updatePost(token: string, postId: number, post: Partial<Post>): Promise<Post> {
  const res = await fetch(`${API_URL}/api/admin/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Не удалось обновить статью')
  }
  
  return res.json()
}

export async function deletePost(token: string, postId: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!res.ok) {
    throw new Error('Не удалось удалить статью')
  }
}

export async function uploadImage(token: string, file: File): Promise<{ filename: string; url: string }> {
  const formData = new FormData()
  formData.append('file', file)
  
  const res = await fetch(`${API_URL}/api/admin/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })
  
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Не удалось загрузить изображение')
  }
  
  return res.json()
}

export async function createCategory(token: string, category: { name: string; slug: string }): Promise<Category> {
  const res = await fetch(`${API_URL}/api/admin/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
  
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Не удалось создать категорию')
  }
  
  return res.json()
}

export async function deleteCategory(token: string, categoryId: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!res.ok) {
    throw new Error('Не удалось удалить категорию')
  }
}

export async function createTag(token: string, tag: { name: string; slug: string }): Promise<Tag> {
  const res = await fetch(`${API_URL}/api/admin/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
  
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || 'Не удалось создать тег')
  }
  
  return res.json()
}

export async function deleteTag(token: string, tagId: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/tags/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!res.ok) {
    throw new Error('Не удалось удалить тег')
  }
}
