import type { Metadata } from 'next'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Installation and First Launch',
  description:
    'Step-by-step guide for installing Atlas sensors, configuring the gateway, and checking the first connection.',
}

export default function InstallationGuidePage() {
  return (
    <>
      <PageIntro
        eyebrow="Guide"
        title="Installation and first launch"
        description="This page covers the minimum installation path: how to mount the sensor, where to place the gateway, how long the first sync takes, and which power requirements are mandatory."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides' },
          { label: 'Installation' },
        ]}
        meta={['12V DC 2A', 'sync up to 10 minutes', 'reset for 7 seconds']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>Before installation begins</h2>
          <ul className="detail-list">
            <li>Make sure you have one DG-100 gateway, at least one AMS-20 sensor, and either an Ethernet cable or access to 2.4 GHz Wi-Fi.</li>
            <li>The gateway requires a dedicated <code>12V DC / 2A</code> power adapter; USB chargers must not be used.</li>
            <li>The recommended sensor mounting height is between <code>1.4 m</code> and <code>1.8 m</code> from the floor.</li>
          </ul>
        </article>

        <article className="article">
          <h2>Step-by-step setup</h2>
          <h3>1. Place the gateway</h3>
          <p>
            Place the DG-100 in a dry location no more than 25 meters indoors from the farthest
            sensor. If the site is large, add another gateway instead of trying to cover the whole
            area from a single point.
          </p>
          <h3>2. Connect power and network</h3>
          <p>
            Power on the unit, wait for the green <code>status</code> indicator, then connect
            Ethernet or configure Wi-Fi via the local gateway panel. On first boot, the gateway
            creates a temporary access point named <code>Atlas-Gateway-Setup</code>.
          </p>
          <h3>3. Mount the sensor</h3>
          <p>
            Mount the AMS-20 on a wall or inside a display case so that there is at least 3 cm of
            clearance between the sensor and any metal surface. After mounting, press the pairing
            button once.
          </p>
          <h3>4. Complete the first sync</h3>
          <p>
            The initial sync usually takes up to <code>10 minutes</code>. If the device does not
            appear in the dashboard, hold the reset button on the gateway for <code>7 seconds</code>
            and repeat the pairing process.
          </p>
        </article>

        <article className="article">
          <h2>Verify the result</h2>
          <ul className="detail-list">
            <li>The gateway status in the dashboard should switch to <code>online</code>.</li>
            <li>The sensor should produce its first reading within 15 minutes after pairing.</li>
            <li>If the site uses three or more refrigeration zones, compare the installation with the <code>CAL-01</code> calibration report.</li>
          </ul>
          <p>
            After the basic setup is complete, continue to the{' '}
            <Link href="/guides/integrations" className="link-inline">
              integrations guide
            </Link>{' '}
            to connect exports and webhooks.
          </p>
        </article>
      </div>
    </>
  )
}
