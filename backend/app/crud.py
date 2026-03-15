from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, or_
from typing import Optional, List
from datetime import datetime

from .models import Post, Category, Tag, User, PostStatus
from .schemas import PostCreate, PostUpdate, CategoryCreate, TagCreate
from .auth import get_password_hash


# ===== User CRUD =====
def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def create_admin_user(db: Session, email: str, password: str) -> User:
    hashed_password = get_password_hash(password)
    user = User(email=email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# ===== Category CRUD =====
def get_categories(db: Session) -> List[Category]:
    return db.query(Category).order_by(Category.name).all()


def get_category_by_id(db: Session, category_id: int) -> Optional[Category]:
    return db.query(Category).filter(Category.id == category_id).first()


def get_category_by_slug(db: Session, slug: str) -> Optional[Category]:
    return db.query(Category).filter(Category.slug == slug).first()


def create_category(db: Session, category: CategoryCreate) -> Category:
    db_category = Category(name=category.name, slug=category.slug)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: int) -> bool:
    category = db.query(Category).filter(Category.id == category_id).first()
    if category:
        db.delete(category)
        db.commit()
        return True
    return False


# ===== Tag CRUD =====
def get_tags(db: Session) -> List[Tag]:
    return db.query(Tag).order_by(Tag.name).all()


def get_tag_by_id(db: Session, tag_id: int) -> Optional[Tag]:
    return db.query(Tag).filter(Tag.id == tag_id).first()


def get_tag_by_slug(db: Session, slug: str) -> Optional[Tag]:
    return db.query(Tag).filter(Tag.slug == slug).first()


def create_tag(db: Session, tag: TagCreate) -> Tag:
    db_tag = Tag(name=tag.name, slug=tag.slug)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag


def delete_tag(db: Session, tag_id: int) -> bool:
    tag = db.query(Tag).filter(Tag.id == tag_id).first()
    if tag:
        db.delete(tag)
        db.commit()
        return True
    return False


# ===== Post CRUD =====
def get_posts(
    db: Session,
    page: int = 1,
    page_size: int = 10,
    search: Optional[str] = None,
    category_slug: Optional[str] = None,
    tag_slug: Optional[str] = None,
    status: Optional[PostStatus] = None
) -> tuple[List[Post], int]:
    """Получить список постов с пагинацией, поиском и фильтрами"""
    
    query = db.query(Post)
    
    # Фильтр по статусу (по умолчанию только опубликованные)
    if status:
        query = query.filter(Post.status == status)
    else:
        query = query.filter(Post.status == PostStatus.PUBLISHED)
    
    # Поиск по заголовку и контенту
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            or_(
                Post.title.ilike(search_filter),
                Post.content.ilike(search_filter),
                Post.excerpt.ilike(search_filter)
            )
        )
    
    # Фильтр по категории
    if category_slug:
        category = get_category_by_slug(db, category_slug)
        if category:
            query = query.filter(Post.category_id == category.id)
    
    # Фильтр по тегу
    if tag_slug:
        tag = get_tag_by_slug(db, tag_slug)
        if tag:
            query = query.join(Post.tags).filter(Tag.id == tag.id)
    
    # Получаем общее количество
    total = query.count()
    
    # Получаем посты с связями
    posts = (
        query
        .options(joinedload(Post.category), joinedload(Post.tags))
        .order_by(Post.published_at.desc(), Post.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    
    return posts, total


def get_post_by_slug(db: Session, slug: str, status: Optional[PostStatus] = None) -> Optional[Post]:
    """Получить пост по slug"""
    query = db.query(Post).filter(Post.slug == slug)
    
    if status:
        query = query.filter(Post.status == status)
    
    return query.options(joinedload(Post.category), joinedload(Post.tags)).first()


def get_post_by_id(db: Session, post_id: int) -> Optional[Post]:
    """Получить пост по ID"""
    return db.query(Post).options(joinedload(Post.category), joinedload(Post.tags)).filter(Post.id == post_id).first()


def create_post(db: Session, post: PostCreate) -> Post:
    """Создать новый пост"""
    db_post = Post(
        title=post.title,
        slug=post.slug,
        excerpt=post.excerpt,
        content=post.content,
        cover_image=post.cover_image,
        seo_title=post.seo_title,
        seo_description=post.seo_description,
        category_id=post.category_id,
        status=PostStatus.DRAFT if post.status == "draft" else PostStatus.PUBLISHED,
        published_at=datetime.utcnow() if post.status == "published" else None
    )
    
    # Добавляем теги
    if post.tag_ids:
        tags = db.query(Tag).filter(Tag.id.in_(post.tag_ids)).all()
        db_post.tags = tags
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_post(db: Session, post_id: int, post: PostUpdate) -> Optional[Post]:
    """Обновить пост"""
    db_post = get_post_by_id(db, post_id)
    if not db_post:
        return None
    
    update_data = post.model_dump(exclude_unset=True)
    
    # Обработка тегов
    tag_ids = update_data.pop("tag_ids", None)
    if tag_ids is not None:
        tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()
        db_post.tags = tags
    
    # Обработка статуса
    if "status" in update_data:
        status_value = update_data.pop("status")
        if status_value == "published" and not db_post.published_at:
            update_data["published_at"] = datetime.utcnow()
        elif status_value == "draft":
            update_data["published_at"] = None
    
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post


def delete_post(db: Session, post_id: int) -> bool:
    """Удалить пост"""
    db_post = get_post_by_id(db, post_id)
    if not db_post:
        return False
    
    db.delete(db_post)
    db.commit()
    return True


def get_post_count(db: Session) -> int:
    """Получить количество опубликованных постов"""
    return db.query(Post).filter(Post.status == PostStatus.PUBLISHED).count()
