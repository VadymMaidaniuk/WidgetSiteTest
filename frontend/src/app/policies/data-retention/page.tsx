import type { Metadata } from 'next'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Data Retention Policy',
  description:
    'Retention periods for sensor readings, alerts, audit logs, and backup snapshots in Atlas Widget Docs.',
}

export default function DataRetentionPolicyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Policy"
        title="Data retention policy"
        description="Retention rules are separated onto their own page so you can test policy-oriented queries and clearly distinguish Basic from Pro."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Policies' },
          { label: 'Data retention' },
        ]}
        meta={['Basic: 180 days', 'Pro: 730 days', 'workspace purge after 14 days']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>Retention table</h2>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data type</th>
                  <th>Basic plan</th>
                  <th>Pro plan</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-highlight">Sensor readings</td>
                  <td>180 days</td>
                  <td>730 days</td>
                  <td>Main measurement dataset, available through API and CSV exports.</td>
                </tr>
                <tr>
                  <td className="table-highlight">Alerts</td>
                  <td>365 days</td>
                  <td>365 days</td>
                  <td>Incident history and status changes.</td>
                </tr>
                <tr>
                  <td className="table-highlight">Audit log</td>
                  <td>90 days</td>
                  <td>365 days</td>
                  <td>Logins, configuration changes, and operator actions.</td>
                </tr>
                <tr>
                  <td className="table-highlight">Backup snapshots</td>
                  <td>30 days</td>
                  <td>30 days</td>
                  <td>Backups are created every 6 hours.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article className="article">
          <h2>Workspace deletion</h2>
          <p>
            After a workspace is deleted manually, it enters a soft delete state for 14 days. Once
            that period ends, the system performs a permanent data purge with no recovery option.
            If you need an export before deletion, first use the{' '}
            <Link href="/guides/integrations" className="link-inline">
              daily CSV export
            </Link>{' '}
            or the API.
          </p>
        </article>

        <article className="article">
          <h2>Quick rules</h2>
          <ul className="detail-list">
            <li>Reading retention depends on the plan and shows the biggest gap: 180 days versus 730 days.</li>
            <li>Alerts are stored the same way on both plans: 365 days.</li>
            <li>The backup snapshot retention period is fixed and does not depend on the plan.</li>
          </ul>
        </article>
      </div>
    </>
  )
}
