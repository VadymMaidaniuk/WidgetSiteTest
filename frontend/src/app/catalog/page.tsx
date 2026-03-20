import type { Metadata } from 'next'
import PageIntro from '@/components/PageIntro'
import { catalogItems } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Каталог устройств',
  description:
    'Каталог фиктивных устройств Atlas Widget Labs с артикулами, питанием, связью и гарантийными сроками.',
}

export default function CatalogPage() {
  return (
    <>
      <PageIntro
        eyebrow="Catalog"
        title="Каталог устройств"
        description="На этой странице собраны модели Atlas, их артикулы и контрольные характеристики. Для RAG здесь особенно полезны таблицы, числовые ограничения и различающиеся сроки гарантии."
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Каталог' },
        ]}
        meta={['3 устройства', '2 вида батарей', '1 шлюз на 120 датчиков']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>Короткое описание линейки</h2>
          <p>
            Линейка Atlas состоит из мини-датчиков, шлюза для передачи данных и компактных меток
            для отслеживания объектов. Устройства намеренно различаются по питанию, дальности и
            режиму применения, чтобы на этой странице было удобно тестировать retrieval по
            конкретным атрибутам.
          </p>
        </article>

        <article className="article">
          <h2>Сводная таблица</h2>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Устройство</th>
                  <th>Модель</th>
                  <th>Питание</th>
                  <th>Связь</th>
                  <th>Лимиты</th>
                  <th>Гарантия</th>
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
          <h2>Что важно помнить</h2>
          <ul className="detail-list">
            <li>Единственное устройство с проводным питанием — Dock Gateway One модели DG-100.</li>
            <li>Только шлюз подключается к интернету; датчики и метки общаются через BLE.</li>
            <li>Максимум в 120 устройств относится к одному шлюзу, а не ко всему workspace.</li>
            <li>Самая длинная гарантия в каталоге — 24 месяца; у Beacon Tag она сокращена до 12 месяцев.</li>
          </ul>
        </article>
      </div>
    </>
  )
}
