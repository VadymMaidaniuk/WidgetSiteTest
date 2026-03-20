import type { Metadata } from 'next'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'О проекте',
  description:
    'Описание тестового сайта Atlas Widget Docs и принципов подготовки контента для RAG-проверок.',
}

const milestones = [
  '15 января 2024: Atlas Widget Labs запустила внутреннюю базу документации для полевых устройств.',
  '12 сентября 2025: команда выделила отдельный демо-набор страниц для тестирования crawl и retrieval.',
  '20 марта 2026: текущая версия сайта переведена на полностью статический Next.js без backend-зависимостей.',
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Project Brief"
        title="О проекте"
        description="Atlas Widget Docs создан как маленький, предсказуемый knowledge-base сайт. Его задача не продавать продукт, а давать чистый контент для тестирования парсинга, индексации и поиска по фрагментам."
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'О проекте' },
        ]}
        meta={['8 страниц', 'статический Next.js', 'без API и форм']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>Что именно проверяет сайт</h2>
          <p>
            Контент специально разнесен по нескольким URL, чтобы RAG-система не опиралась на одну
            длинную страницу. На <Link href="/catalog" className="link-inline">странице каталога</Link>{' '}
            лежат характеристики оборудования, на{' '}
            <Link href="/guides/integrations" className="link-inline">странице интеграций</Link> —
            ограничения API и webhook-события, а на{' '}
            <Link href="/policies/data-retention" className="link-inline">policy-странице</Link> —
            сроки хранения и удаления данных.
          </p>
          <ul className="detail-list">
            <li>Есть обычные абзацы, списки, таблицы и breadcrumb-навигация.</li>
            <li>Часть фактов выражена словами, часть числами и кодами моделей.</li>
            <li>Некоторые ответы требуют найти страницу по смыслу, а не по точному совпадению слов.</li>
            <li>В контенте используются и русский текст, и английские технические термины.</li>
          </ul>
        </article>

        <article className="article">
          <h2>Контентные правила</h2>
          <p>
            Этот fixture намеренно простой: без pop-up элементов, без клиентских запросов и без
            скрытого текста. Если парсер видит HTML-страницу целиком, он должен получить всю
            полезную информацию.
          </p>
          <ul className="detail-list">
            <li>Один URL содержит одну тему и один основной заголовок H1.</li>
            <li>Ключевые сущности повторяются ограниченно, чтобы было легче отслеживать grounding.</li>
            <li>Адреса, email и домены используют тестовые значения вроде <code>.test</code>.</li>
            <li>Навигация остается плоской: главная, 2 guide-страницы, 1 policy-страница, FAQ и контакты.</li>
          </ul>
        </article>

        <article className="article">
          <h2>Хронология версии</h2>
          <ul className="timeline">
            {milestones.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </>
  )
}
