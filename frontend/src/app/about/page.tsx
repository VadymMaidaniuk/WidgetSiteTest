import type { Metadata } from 'next'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Description of the Atlas Widget Docs test site and the principles used to prepare RAG-friendly content.',
}

const milestones = [
  'January 15, 2024: Atlas Widget Labs launched an internal documentation base for field devices.',
  'September 12, 2025: the team created a dedicated demo page set for crawl and retrieval testing.',
  'March 20, 2026: the current version of the site was moved to fully static Next.js with no backend dependency.',
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Project Brief"
        title="About the project"
        description="Atlas Widget Docs is a small, predictable knowledge-base site. Its purpose is not to sell a product, but to provide clean content for testing parsing, indexing, and fragment-based retrieval."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        meta={['8 pages', 'static Next.js', 'no API or forms']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>What the site is designed to test</h2>
          <p>
            The content is intentionally split across multiple URLs so a RAG system cannot rely on
            one long page. The <Link href="/catalog" className="link-inline">catalog page</Link>{' '}
            contains hardware specifications, the{' '}
            <Link href="/guides/integrations" className="link-inline">integrations page</Link>{' '}
            contains API limits and webhook events, and the{' '}
            <Link href="/policies/data-retention" className="link-inline">policy page</Link>{' '}
            contains retention and deletion rules.
          </p>
          <ul className="detail-list">
            <li>There are regular paragraphs, lists, tables, and breadcrumb navigation.</li>
            <li>Some facts are written as prose, others as numbers, codes, and model names.</li>
            <li>Some answers require semantic page selection, not just exact keyword matches.</li>
            <li>The content is written in plain English with technical product terminology.</li>
          </ul>
        </article>

        <article className="article">
          <h2>Content rules</h2>
          <p>
            This fixture is intentionally simple: no pop-ups, no client-side data fetching, and no
            hidden text. If the parser can read the HTML page, it should be able to capture all of
            the useful information.
          </p>
          <ul className="detail-list">
            <li>Each URL covers one topic and has a single primary H1 heading.</li>
            <li>Key entities repeat in a controlled way so grounding is easier to inspect.</li>
            <li>Addresses, email accounts, and domains use test values such as <code>.test</code>.</li>
            <li>The navigation remains flat: home, 2 guide pages, 1 policy page, FAQ, and contact.</li>
          </ul>
        </article>

        <article className="article">
          <h2>Version timeline</h2>
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
