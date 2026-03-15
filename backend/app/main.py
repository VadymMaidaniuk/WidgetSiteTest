from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import os
import uuid
import shutil
from dotenv import load_dotenv

from database import engine, get_db, Base
from models import User, Post, Category, Tag, PostStatus
from schemas import (
    LoginRequest, Token, UserCreate, User as UserSchema,
    PostCreate, PostUpdate, Post as PostSchema, PostListResponse,
    CategoryCreate, Category as CategorySchema,
    TagCreate, Tag as TagSchema
)
from auth import verify_password, create_access_token, decode_access_token, get_password_hash
import crud

load_dotenv()

# ===== Инициализация БД =====
Base.metadata.create_all(bind=engine)

# ===== Создание админа при первом запуске =====
def create_initial_admin(db: Session):
    admin_email = os.getenv("ADMIN_EMAIL", "admin@cryptomaster.com")
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
    
    existing_admin = crud.get_user_by_email(db, admin_email)
    if not existing_admin:
        crud.create_admin_user(db, admin_email, admin_password)
        print(f"✅ Admin user created: {admin_email}")

# ===== FastAPI App =====
app = FastAPI(
    title="CryptoMaster Blog API",
    description="API для блога CryptoMaster Academy",
    version="1.0.0"
)

# ===== CORS =====
cors_origin = os.getenv("CORS_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[cors_origin, "http://localhost:3000", "https://your-vercel-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Папка для загрузок =====
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ===== Security =====
security = HTTPBearer()

# ===== Dependency для проверки авторизации =====
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Проверка JWT токена и получение текущего пользователя"""
    token = credentials.credentials
    payload = decode_access_token(token)
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    email = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    
    user = crud.get_user_by_email(db, email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    return user


# ===== Инициализация при старте =====
@app.on_event("startup")
async def startup_event():
    db = next(get_db())
    create_initial_admin(db)


# ===== Public Endpoints =====

@app.get("/")
def read_root():
    return {"message": "CryptoMaster Blog API", "version": "1.0.0"}


@app.get("/api/posts", response_model=PostListResponse)
def get_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    category: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Получить список опубликованных постов с пагинацией и фильтрами"""
    posts, total = crud.get_posts(
        db,
        page=page,
        page_size=page_size,
        search=search,
        category_slug=category,
        tag_slug=tag
    )
    
    total_pages = (total + page_size - 1) // page_size
    
    return PostListResponse(
        posts=posts,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@app.get("/api/posts/{slug}", response_model=PostSchema)
def get_post(slug: str, db: Session = Depends(get_db)):
    """Получить пост по slug"""
    post = crud.get_post_by_slug(db, slug, PostStatus.PUBLISHED)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@app.get("/api/categories", response_model=List[CategorySchema])
def get_categories(db: Session = Depends(get_db)):
    """Получить все категории"""
    return crud.get_categories(db)


@app.get("/api/tags", response_model=List[TagSchema])
def get_tags(db: Session = Depends(get_db)):
    """Получить все теги"""
    return crud.get_tags(db)


# ===== Auth Endpoints =====

@app.post("/api/admin/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Вход для админа"""
    user = crud.get_user_by_email(db, login_data.email)
    
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token)


# ===== Admin Endpoints =====

@app.get("/api/admin/me", response_model=UserSchema)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Получить информацию о текущем пользователе"""
    return current_user


@app.post("/api/admin/posts", response_model=PostSchema)
def create_post(
    post: PostCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Создать новый пост"""
    return crud.create_post(db, post)


@app.put("/api/admin/posts/{post_id}", response_model=PostSchema)
def update_post(
    post_id: int,
    post: PostUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Обновить пост"""
    updated_post = crud.update_post(db, post_id, post)
    if not updated_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return updated_post


@app.delete("/api/admin/posts/{post_id}")
def delete_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Удалить пост"""
    success = crud.delete_post(db, post_id)
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}


@app.get("/api/admin/posts", response_model=PostListResponse)
def get_all_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить все посты (включая черновики)"""
    post_status = PostStatus(status) if status else None
    posts, total = crud.get_posts(db, page=page, page_size=page_size, status=post_status)
    total_pages = (total + page_size - 1) // page_size
    
    return PostListResponse(
        posts=posts,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@app.get("/api/admin/posts/{post_id}", response_model=PostSchema)
def get_admin_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить пост по ID (для админа)"""
    post = crud.get_post_by_id(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


# ===== Category Admin Endpoints =====

@app.post("/api/admin/categories", response_model=CategorySchema)
def create_category(
    category: CategoryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Создать категорию"""
    return crud.create_category(db, category)


@app.delete("/api/admin/categories/{category_id}")
def delete_category(
    category_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Удалить категорию"""
    success = crud.delete_category(db, category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}


# ===== Tag Admin Endpoints =====

@app.post("/api/admin/tags", response_model=TagSchema)
def create_tag(
    tag: TagCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Создать тег"""
    return crud.create_tag(db, tag)


@app.delete("/api/admin/tags/{tag_id}")
def delete_tag(
    tag_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Удалить тег"""
    success = crud.delete_tag(db, tag_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tag not found")
    return {"message": "Tag deleted successfully"}


# ===== File Upload =====

@app.post("/api/admin/upload")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Загрузить изображение"""
    # Проверка типа файла
    allowed_types = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(allowed_types)}"
        )
    
    # Генерация уникального имени файла
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Сохранение файла
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Возвращаем URL для доступа к файлу
    return {
        "filename": unique_filename,
        "url": f"/uploads/{unique_filename}"
    }


# ===== Health Check =====

@app.get("/api/health")
def health_check():
    """Проверка здоровья API"""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}
