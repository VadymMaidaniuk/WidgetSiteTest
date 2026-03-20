# Quick Start

## 1. Локальный запуск

```bash
cd frontend
npm install
npm run dev
```

Откройте `http://localhost:3000`.

## 2. Что проверить после старта

- Главная страница открывается без ошибок.
- Доступны все 8 URL из навигации.
- Работают страницы:
  - `/catalog`
  - `/guides/installation`
  - `/guides/integrations`
  - `/policies/data-retention`
  - `/faq`
  - `/contact`

## 3. Деплой на Vercel

1. Импортируйте репозиторий в Vercel.
2. Выберите `frontend` как `Root Directory`.
3. Нажмите `Deploy`.
4. При желании добавьте переменную `NEXT_PUBLIC_SITE_URL` со значением вашего production URL.

## 4. Что именно это за сайт

Это fixture-сайт для тестирования RAG:

- без backend;
- без форм и авторизации;
- с таблицами, списками и фактами на разных страницах;
- с предсказуемыми вопросами для retrieval-проверок.

## 5. Примеры контрольных вопросов

- Сколько дней хранятся readings на тарифе Basic?
- Во сколько формируется CSV-выгрузка?
- Сколько устройств обслуживает Dock Gateway One?
- Какой SLA у critical incident?
- Какое питание нужно для DG-100?
