import type { Metadata } from 'next'
import PageIntro from '@/components/PageIntro'
import { catalogItems } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Catalog of fictional Atlas Widget Labs devices with model numbers, power requirements, connectivity, and warranty periods.',
}

export default function CatalogPage() {
  return (
    <>
      <PageIntro
        eyebrow="Catalog"
        title="Device catalog"
        description="This page lists Atlas models, model numbers, and reference specifications. For RAG testing, the most useful elements here are the table, the numeric limits, and the differing warranty periods."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Catalog' },
        ]}
        meta={['3 devices', '2 battery types', '1 gateway for 120 sensors']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>Short product line overview</h2>
          <p>
            The Atlas lineup includes mini sensors, a data gateway, and compact tracking tags. The
            devices intentionally differ in power model, range, and usage pattern so this page is
            useful for retrieval tests based on concrete attributes.
          </p>
        </article>

        <article className="article">
          <h2>Summary table</h2>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Model</th>
                  <th>Power</th>
                  <th>Connectivity</th>
                  <th>Limits</th>
                  <th>Warranty</th>
                </tr>
              </thead>
              <tbody>
                {catalogItems.map(item => (
                  <tr key={item.model}>
                    <td>
                      <span className="table-highlight">{item.name}</span>
                      <br />
                      {item.useCase}
                    </td>
                    <td>{item.model}</td>
                    <td>{item.power}</td>
                    <td>{item.connectivity}</td>
                    <td>{item.limits}</td>
                    <td>{item.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="article">
          <h2>Important notes</h2>
          <ul className="detail-list">
            <li>The only mains-powered device is Dock Gateway One, model DG-100.</li>
            <li>Only the gateway connects to the internet; sensors and tags communicate over BLE.</li>
            <li>The 120-device limit applies to one gateway, not to the whole workspace.</li>
            <li>The longest warranty in the catalog is 24 months; Beacon Tag has only 12 months.</li>
          </ul>
        </article>
      </div>
    </>
  )
}
