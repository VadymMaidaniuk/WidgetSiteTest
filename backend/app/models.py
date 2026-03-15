from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base


class PostStatus(enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}>"


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", back_populates="category")

    def __repr__(self):
        return f"<Category {self.name}>"


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", secondary="post_tags", back_populates="tags")

    def __repr__(self):
        return f"<Tag {self.name}>"


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False, index=True)
    excerpt = Column(Text)  # Краткое описание
    content = Column(Text, nullable=False)  # HTML контент из TipTap
    cover_image = Column(String, nullable=True)  # Путь к изображению
    
    # SEO поля
    seo_title = Column(String, nullable=True)
    seo_description = Column(Text, nullable=True)
    
    # Статус и даты
    status = Column(Enum(PostStatus), default=PostStatus.DRAFT)
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Связи
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    category = relationship("Category", back_populates="posts")
    tags = relationship("Tag", secondary="post_tags", back_populates="posts")

    def __repr__(self):
        return f"<Post {self.title}>"


# Many-to-many связь между постами и тегами
post_tags = Table(
    "post_tags",
    Base.metadata,
    Column("post_id", Integer, ForeignKey("posts.id")),
    Column("tag_id", Integer, ForeignKey("tags.id"))
)
