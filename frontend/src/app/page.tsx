import Link from 'next/link'
import { pageDirectory, sampleQueries } from '@/lib/site-data'

const keyMetrics = [
  {
    value: '8',
    label: 'Static pages with unique URLs',
  },
  {
    value: '3',
    label: 'Tables with structured data',
  },
  {
    value: '0',
    label: 'Backend or API dependencies',
  },
  {
    value: 'EN',
    label: 'Primary language for all public content',
  },
]

const crawlNotes = [
  'All key facts live in regular HTML text, lists, and tables.',
  'The site has no forms, authentication, dynamic loading, or client-side API requests.',
  'Internal links connect the pages so you can test crawl behavior and retrieval relevance.',
  'Facts are split across different pages: contacts, retention rules, API limits, and device details.',
]

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">RAG Test Fixture</p>
          <h1>Atlas Widget Docs</h1>
          <p className="lead">
            A compact 8-page site for testing how your parser follows links, extracts tables,
            preserves headings, and answers questions based on exact facts.
          </p>
          <div className="button-row">
            <Link href="/catalog" className="button button-primary">
              Open catalog
            </Link>
            <Link href="/policies/data-retention" className="button button-secondary">
              Open policy page
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <h2>What this site is good for testing</h2>
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
          <h2>Page map</h2>
          <p>
            Below is the full page directory. Each page contains a distinct set of facts: device
            specifications, data retention rules, API limits, and support contacts.
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
          <h2>Sample RAG queries</h2>
          <ul className="faq-list">
            {sampleQueries.map(query => (
              <li key={query}>{query}</li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h2>How to use this fixture</h2>
          <p>
            Deploy the <code>frontend</code> folder to Vercel, pass the public URL into your
            pipeline, then ask questions that require exact numbers, dates, addresses, tables, and
            internal links.
          </p>
          <p>
            If the parser misses structure, it usually loses details like <code>120 devices per gateway</code>,
            <code>180 days of retention</code>, or the export schedule at <code>02:30 UTC</code>.
          </p>
        </article>
      </section>
    </>
  )
}
