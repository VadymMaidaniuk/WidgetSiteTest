# CryptoMaster Blog — Быстрый старт

## 🚀 Локальный запуск

### Требования
- Python 3.10+
- Node.js 18+
- npm

### 1. Запуск бэкенда (FastAPI)

```bash
# Перейдите в директорию бэкенда
cd backend

# Создайте виртуальное окружение (опционально)
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt

# Запустите сервер
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Бэкенд будет доступен на: **http://localhost:8000**

API документация (Swagger): **http://localhost:8000/docs**

---

### 2. Запуск фронтенда (Next.js)

```bash
# Откройте новый терминал
# Перейдите в директорию фронтенда
cd frontend

# Установите зависимости (если еще не установлены)
npm install

# Запустите dev-сервер
npm run dev
```

Фронтенд будет доступен на: **http://localhost:3000**

---

## 🔐 Вход в админ-панель

1. Откройте **http://localhost:3000/admin/login**
2. Используйте default credentials:
   - **Email**: `admin@cryptomaster.com`
   - **Пароль**: `admin123`

---

## 📁 Структура проекта

```
WidgetSiteTest/
├── backend/                 # FastAPI сервер
│   ├── app/
│   │   ├── main.py         # Точка входа
│   │   ├── models.py       # SQLAlchemy модели
│   │   ├── schemas.py      # Pydantic схемы
│   │   ├── database.py     # Подключение к БД
│   │   ├── auth.py         # JWT аутентификация
│   │   ├── crud.py         # CRUD операции
│   │   └── uploads/        # Загруженные файлы
│   ├── requirements.txt
│   └── .env
│
├── frontend/                # Next.js приложение
│   ├── src/
│   │   ├── app/            # App Router страницы
│   │   │   ├── page.tsx    # Главная
│   │   │   ├── blog/       # Блог и статьи
│   │   │   ├── about/      # О нас
│   │   │   └── admin/      # Админ-панель
│   │   ├── components/     # React компоненты
│   │   └── lib/            # Утилиты и API клиент
│   ├── package.json
│   └── .env.local
│
├── README.md                # Основная документация
├── DEPLOY.md                # Инструкция по деплою
└── QUICKSTART.md           # Этот файл
```

---

## 🛠 Что дальше?

### Создание первой статьи

1. Войдите в админ-панель
2. Перейдите в **Категории** и создайте категорию (например, "Трейдинг")
3. Перейдите в **Новая статья**
4. Заполните:
   - Заголовок
   - Slug (URL)
   - Краткое описание
   - Контент (используйте WYSIWYG редактор)
   - Загрузите обложку
   - Выберите категорию и теги
   - Установите статус "Опубликован"
5. Нажмите **Сохранить**

### Настройка окружения

#### Backend (.env)
```env
SECRET_KEY=ваш-секретный-ключ
ADMIN_EMAIL=admin@cryptomaster.com
ADMIN_PASSWORD=новый-пароль
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 Тестирование API

### Через Swagger UI
Откройте **http://localhost:8000/docs** для интерактивной документации

### Через curl

```bash
# Получить список статей
curl http://localhost:8000/api/posts

# Войти как админ
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cryptomaster.com","password":"admin123"}'

# Получить категории
curl http://localhost:8000/api/categories
```

---

## 🐛 Troubleshooting

### Бэкенд не запускается
- Убедитесь, что Python 3.10+ установлен
- Проверьте, что все зависимости установлены: `pip install -r requirements.txt`
- Проверьте, что порт 8000 свободен

### Фронтенд не запускается
- Убедитесь, что Node.js 18+ установлен
- Очистите кэш: `rm -rf node_modules .next && npm install`
- Проверьте, что порт 3000 свободен

### Ошибка CORS
- Убедитесь, что `CORS_ORIGIN` в `.env` бэкенда совпадает с URL фронтенда

### Ошибка подключения к API
- Проверьте, что `NEXT_PUBLIC_API_URL` в `.env.local` правильный
- Убедитесь, что бэкенд запущен

---

## 📞 Поддержка

Если возникли вопросы:
1. Проверьте логи бэкенда в терминале
2. Откройте консоль браузера (F12) для ошибок фронтенда
3. Проверьте Swagger UI для тестирования API

---

**Приятной разработки! 🚀**
