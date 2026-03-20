import Link from 'next/link'
import { pageDirectory, sampleQueries } from '@/lib/site-data'

const keyMetrics = [
  {
    value: '8',
    label: 'Статических страниц с уникальными URL',
  },
  {
    value: '3',
    label: 'Таблицы со структурированными данными',
  },
  {
    value: '0',
    label: 'Зависимостей от backend или API',
  },
  {
    value: 'RU/EN',
    label: 'Основной язык RU, технические термины на EN',
  },
]

const crawlNotes = [
  'Все ключевые факты находятся в обычном HTML-тексте, списках и таблицах.',
  'На сайте нет форм, авторизации, динамической подгрузки или клиентских API-запросов.',
  'Внутренние ссылки соединяют страницы так, чтобы можно было тестировать обход и релевантность.',
  'Факты распределены по разным страницам: контакты, сроки хранения, лимиты API и параметры устройств.',
]

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">RAG Test Fixture</p>
          <h1>Atlas Widget Docs</h1>
          <p className="lead">
            Небольшой сайт на 8 страниц для проверки того, как ваш парсер обходит ссылки,
            извлекает таблицы, сохраняет заголовки и отвечает на вопросы по конкретным фактам.
          </p>
          <div className="button-row">
            <Link href="/catalog" className="button button-primary">
              Открыть каталог
            </Link>
            <Link href="/policies/data-retention" className="button button-secondary">
              Проверить policy-страницу
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <h2>Что удобно тестировать на этом сайте</h2>
          <ul className="check-list">
            {crawlNotes.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          {keyMetrics.map(metric => (
            <article key={metric.label} className="info-card">
              <p className="stat-value">{metric.value}</p>
              <p className="stat-label">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Карта страниц</h2>
          <p>
            Ниже собраны все основные URL. Каждая страница содержит отдельный набор фактов:
            характеристики устройств, правила хранения данных, лимиты API и контакты службы поддержки.
          </p>
        </div>
        <div className="card-grid">
          {pageDirectory.map(page => (
            <Link key={page.href} href={page.href} className="link-card">
              <span className="card-tag">{page.tag}</span>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
              <ul className="mini-list">
                {page.highlights.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="section two-column">
        <article className="panel">
          <h2>Примеры запросов для RAG</h2>
          <ul className="faq-list">
            {sampleQueries.map(query => (
              <li key={query}>{query}</li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h2>Как использовать этот fixture</h2>
          <p>
            Задеплойте папку <code>frontend</code> на Vercel, отдайте публичный URL в ваш pipeline,
            затем задавайте вопросы, которые требуют находить точные числа, даты, адреса, таблицы и
            внутренние ссылки.
          </p>
          <p>
            Если парсер пропускает структуру, он обычно теряет детали вроде <code>120 устройств на шлюз</code>,
            <code>180 дней хранения</code> или расписание выгрузки <code>02:30 UTC</code>.
          </p>
        </article>
      </section>
    </>
  )
}
