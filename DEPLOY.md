# CryptoMaster Blog Platform — Инструкция по деплою

## 📋 Обзор

Проект состоит из двух частей:
- **Frontend** (Next.js) — хостится на Vercel
- **Backend** (FastAPI) — хостится на Railway

---

## 🚀 Деплой бэкенда на Railway

### Шаг 1: Подготовка
1. Запушьте проект на GitHub
2. Зайдите на [railway.app](https://railway.app)
3. Войдите через GitHub

### Шаг 2: Создание проекта
1. Нажмите **New Project**
2. Выберите **Deploy from GitHub repo**
3. Выберите ваш репозиторий

### Шаг 3: Настройка
1. В настройках сервиса укажите:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Шаг 4: Environment Variables
Добавьте следующие переменные в Railway:

```
SECRET_KEY=ваш-секретный-ключ-32-символа-минимум
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
ADMIN_EMAIL=admin@cryptomaster.com
ADMIN_PASSWORD=ваш-пароль-админа
DATABASE_URL=sqlite:///./blog.db
CORS_ORIGIN=https://ваш-домен.vercel.app
```

### Шаг 5: Деплой
1. Railway автоматически запустит деплой
2. После завершения вы получите URL вида: `https://your-project.railway.app`
3. Сохраните этот URL — он понадобится для фронтенда

---

## 🌐 Деплой фронтенда на Vercel

### Шаг 1: Подготовка
1. Зайдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub

### Шаг 2: Импорт проекта
1. Нажмите **Add New Project**
2. Выберите **Import Git Repository**
3. Выберите ваш репозиторий

### Шаг 3: Настройка
1. **Framework Preset**: Next.js
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### Шаг 4: Environment Variables
Добавьте переменную:

```
NEXT_PUBLIC_API_URL=https://your-project.railway.app
```

(замените на ваш Railway URL)

### Шаг 5: Деплой
1. Нажмите **Deploy**
2. Vercel автоматически соберёт и задеплоит проект
3. Вы получите URL вида: `https://your-project.vercel.app`

---

## 🔐 Настройка CORS на бэкенде

В файле `backend/app/main.py` обновите CORS_ORIGIN:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-project.vercel.app",
        "https://your-custom-domain.com"
    ],
    # ...
)
```

Или используйте environment variable `CORS_ORIGIN`.

---

## 📝 Финальные шаги

### 1. Создайте первого админа
При первом запуске бэкенд автоматически создаст админа с credentials из `.env`

### 2. Войдите в админ-панель
- Откройте `https://your-project.vercel.app/admin/login`
- Введите email и пароль из `ADMIN_EMAIL` / `ADMIN_PASSWORD`

### 3. Создайте категории и теги
Перед публикацией статей создайте категории в админ-панели

### 4. Опубликуйте первую статью
1. Создайте статью в режиме черновика
2. Загрузите обложку
3. Заполните SEO-поля
4. Опубликуйте

---

## 🔧 Дополнительные настройки

### Кастомный домен на Vercel
1. В настройках проекта перейдите в **Domains**
2. Добавьте ваш домен
3. Настройте DNS записи согласно инструкции Vercel

### HTTPS на Railway
Railway автоматически предоставляет HTTPS для всех проектов

### Бэкапы базы данных
Для SQLite на Railway рекомендуется настроить периодические бэкапы:

```bash
# Скрипт для бэкапа
cp /railway/data/blog.db /railway/data/backups/blog-$(date +%Y%m%d).db
```

---

## 🐛 Troubleshooting

### Ошибка CORS
Убедитесь, что `CORS_ORIGIN` на бэкенде совпадает с доменом Vercel

### 404 на статических файлах
Проверьте, что uploads папка существует:
```bash
mkdir -p backend/app/uploads
touch backend/app/uploads/.gitkeep
```

### Ошибка подключения к API
Проверьте, что `NEXT_PUBLIC_API_URL` установлен правильно и доступен

### Медленная загрузка изображений
Для production рассмотрите использование CDN (Cloudinary, AWS S3)

---

## 📊 Мониторинг

### Railway
- Логи: Railway Dashboard → Logs
- Метрики: Railway Dashboard → Metrics

### Vercel
- Логи: Vercel Dashboard → Function Logs
- Аналитика: Vercel Dashboard → Analytics

---

## 🎉 Готово!

Ваш блог успешно развёрнут! Теперь вы можете:
- Создавать и публиковать статьи через админ-панель
- Управлять категориями и тегами
- Загружать изображения
- Просматривать статистику
