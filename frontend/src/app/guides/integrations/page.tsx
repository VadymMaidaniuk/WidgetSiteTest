import type { Metadata } from 'next'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Integrations and API',
  description:
    'REST API, webhook events, CSV export schedule, and request limits for the Atlas platform.',
}

const webhookEvents = [
  'device.created',
  'device.updated',
  'reading.received',
  'alert.opened',
  'alert.closed',
]

export default function IntegrationsGuidePage() {
  return (
    <>
      <PageIntro
        eyebrow="Guide"
        title="Integrations and API"
        description="This page is useful for tests where the model needs to extract an endpoint, a rate limit, a batch export schedule, and a webhook event list."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides' },
          { label: 'Integrations' },
        ]}
        meta={['https://api.atlaswidgets.test/v1', '120 req/min Basic', 'CSV at 02:30 UTC']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>REST API</h2>
          <p>
            The base endpoint for all requests is <code>https://api.atlaswidgets.test/v1</code>.
            Test keys start with the prefix <code>atl_test_</code>, while live keys start with{' '}
            <code>atl_live_</code>. The key is sent in the <code>Authorization: Bearer ...</code> header.
          </p>
          <ul className="detail-list">
            <li>Basic plan: up to 120 requests per minute.</li>
            <li>Pro plan: up to 600 requests per minute.</li>
            <li>If the limit is exceeded, the API responds with <code>429</code> and returns a retry time.</li>
          </ul>
        </article>

        <article className="article">
          <h2>CSV exports</h2>
          <p>
            The daily CSV export starts automatically at <code>02:30 UTC</code>. The file includes
            new readings from the previous day and all open alerts. The download link remains valid
            for 24 hours after generation.
          </p>
        </article>

        <article className="article">
          <h2>Webhook delivery</h2>
          <p>
            Event signatures are sent in the <code>x-atlas-signature</code> header. If the endpoint
            is unavailable, the system makes up to <code>8</code> retry attempts over <code>24 hours</code>.
          </p>
          <ul className="detail-list">
            {webhookEvents.map(event => (
              <li key={event}>{event}</li>
            ))}
          </ul>
        </article>
      </div>
    </>
  )
}
