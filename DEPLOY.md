# Deploy to Vercel

## Root directory

Для деплоя используйте папку `frontend`.

## Build settings

- Framework Preset: `Next.js`
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: оставить по умолчанию

## Environment variables

Обязательных переменных нет.

Опционально:

```env
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

Эта переменная нужна только для корректных URL в `sitemap.xml` и `robots.txt`.

## Проверка после деплоя

Проверьте:

- `/`
- `/catalog`
- `/guides/installation`
- `/guides/integrations`
- `/policies/data-retention`
- `/faq`
- `/contact`
- `/sitemap.xml`
- `/robots.txt`

## Зачем такой деплой удобен

- Весь сайт живет в одном Next.js-приложении.
- Нет зависимости от FastAPI, Railway или отдельной базы данных.
- Vercel сам отрендерит статические страницы и отдаст их по обычным URL.
