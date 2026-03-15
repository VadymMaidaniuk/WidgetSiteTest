from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# ===== User Schemas =====
class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ===== Token Schemas =====
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    email: Optional[str] = None


# ===== Login Schema =====
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ===== Category Schemas =====
class CategoryBase(BaseModel):
    name: str
    slug: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ===== Tag Schemas =====
class TagBase(BaseModel):
    name: str
    slug: str


class TagCreate(TagBase):
    pass


class Tag(TagBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ===== Post Schemas =====
class PostBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    cover_image: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    category_id: Optional[int] = None
    tag_ids: Optional[List[int]] = None


class PostCreate(PostBase):
    status: str = "draft"


class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    category_id: Optional[int] = None
    tag_ids: Optional[List[int]] = None
    status: Optional[str] = None
    published_at: Optional[datetime] = None


class Post(PostBase):
    id: int
    status: str
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    category: Optional[Category] = None
    tags: List[Tag] = []

    class Config:
        from_attributes = True


# ===== Response Schemas =====
class PostListResponse(BaseModel):
    posts: List[Post]
    total: int
    page: int
    page_size: int
    total_pages: int
