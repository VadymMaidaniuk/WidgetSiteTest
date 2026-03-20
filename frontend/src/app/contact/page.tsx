import type { Metadata } from 'next'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Support contacts for Atlas Widget Labs, including working hours, office address, and request SLA.',
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Contact"
        description="The contact page contains email addresses, support hours, the office address, and quick escalation rules. It is useful for tests that require exact extraction of short factual details."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
        meta={['support@atlaswidgets.test', '09:00-18:00 EET', 'critical reply within 2 hours']}
      />

      <section className="section contact-grid">
        <article className="panel">
          <h2>Contact channels</h2>
          <ul className="contact-list">
            <li><span className="table-highlight">Support:</span> support@atlaswidgets.test</li>
            <li><span className="table-highlight">Sales:</span> sales@atlaswidgets.test</li>
            <li><span className="table-highlight">Partnerships:</span> partners@atlaswidgets.test</li>
            <li><span className="table-highlight">Demo calls:</span> Tuesday and Thursday, 14:00-16:00 EET</li>
          </ul>
        </article>

        <article className="panel">
          <h2>Support and SLA</h2>
          <ul className="contact-list">
            <li>Support hours: Monday through Friday, 09:00-18:00 EET.</li>
            <li>Critical incident: first response within 2 hours.</li>
            <li>Standard request: first response within 1 business day.</li>
            <li>Office address: Podilska Naberezhna 18, Kyiv, 04070.</li>
          </ul>
        </article>
      </section>
    </>
  )
}
