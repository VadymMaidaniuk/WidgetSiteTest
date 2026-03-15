const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  seo_title: string | null
  seo_description: string | null
  status: string
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
    throw new Error('Failed to fetch posts')
  }
  
  return res.json()
}

export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${API_URL}/api/posts/${slug}`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  
  return res.json()
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  
  return res.json()
}

export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${API_URL}/api/tags`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch tags')
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
    throw new Error(error.detail || 'Login failed')
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
    throw new Error('Not authenticated')
  }
  
  return res.json()
}

export async function getAdminPosts(token: string, page = 1, pageSize = 10, status?: string): Promise<PostListResponse> {
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
    throw new Error('Failed to fetch posts')
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
    throw new Error('Failed to fetch post')
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
    throw new Error(error.detail || 'Failed to create post')
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
    throw new Error(error.detail || 'Failed to update post')
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
    throw new Error('Failed to delete post')
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
    throw new Error(error.detail || 'Failed to upload image')
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
    throw new Error(error.detail || 'Failed to create category')
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
    throw new Error('Failed to delete category')
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
    throw new Error(error.detail || 'Failed to create tag')
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
    throw new Error('Failed to delete tag')
  }
}
