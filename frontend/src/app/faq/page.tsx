import type { Metadata } from 'next'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Short answers to common questions about Atlas sensors, gateways, CSV exports, and support.',
}

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="The FAQ page is useful for short factual retrieval prompts. The answers point to other pages, but remain compact and direct."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'FAQ' },
        ]}
        meta={['BLE', 'CSV', 'SLA', '120 sensors']}
      />

      <div className="article-stack">
        <article className="article">
          <div className="faq-item">
            <h3>Does every sensor need internet access?</h3>
            <p>
              No. Internet access is required only for the Dock Gateway One gateway. AMS-20 sensors
              and Beacon Tag devices send data over Bluetooth Low Energy.
            </p>
          </div>

          <div className="faq-item">
            <h3>How many devices can be connected to one gateway?</h3>
            <p>
              One Dock Gateway One supports up to 120 devices. Full details are listed on the{' '}
              <Link href="/catalog" className="link-inline">
                catalog page
              </Link>
              .
            </p>
          </div>

          <div className="faq-item">
            <h3>What time is the daily CSV export created?</h3>
            <p>
              The export starts every day at 02:30 UTC, and the file link stays active for 24 hours.
            </p>
          </div>

          <div className="faq-item">
            <h3>How fast does support respond to a critical incident?</h3>
            <p>
              The first response to a critical incident should arrive within 2 hours during support hours.
            </p>
          </div>

          <div className="faq-item">
            <h3>How long is measurement history stored on the Basic plan?</h3>
            <p>
              On Basic, readings are retained for 180 days. On Pro, that period is extended to 730 days.
            </p>
          </div>

          <div className="faq-item">
            <h3>What should I do if the device does not appear after installation?</h3>
            <p>
              Check gateway power, sensor distance, and repeat the pairing process. If needed, hold
              reset on the gateway for 7 seconds and run the initial sync again.
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
