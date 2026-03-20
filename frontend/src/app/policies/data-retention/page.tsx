import type { Metadata } from 'next'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Политика хранения данных',
  description:
    'Сроки хранения sensor readings, alerts, audit log и резервных копий в Atlas Widget Docs.',
}

export default function DataRetentionPolicyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Policy"
        title="Политика хранения данных"
        description="Сроки хранения вынесены на отдельную страницу, чтобы можно было тестировать вопросы по policy-контенту и отличать Basic от Pro."
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Политики' },
          { label: 'Хранение данных' },
        ]}
        meta={['Basic: 180 дней', 'Pro: 730 дней', 'purge workspace через 14 дней']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>Таблица сроков хранения</h2>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Тип данных</th>
                  <th>План Basic</th>
                  <th>План Pro</th>
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-highlight">Sensor readings</td>
                  <td>180 дней</td>
                  <td>730 дней</td>
                  <td>Основной массив измерений, выгружается через API и CSV.</td>
                </tr>
                <tr>
                  <td className="table-highlight">Alerts</td>
                  <td>365 дней</td>
                  <td>365 дней</td>
                  <td>История инцидентов и статусов обработки.</td>
                </tr>
                <tr>
                  <td className="table-highlight">Audit log</td>
                  <td>90 дней</td>
                  <td>365 дней</td>
                  <td>Входы, изменения настроек, действия операторов.</td>
                </tr>
                <tr>
                  <td className="table-highlight">Backup snapshots</td>
                  <td>30 дней</td>
                  <td>30 дней</td>
                  <td>Бэкапы создаются каждые 6 часов.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article className="article">
          <h2>Удаление workspace</h2>
          <p>
            После ручного удаления workspace он переводится в режим soft delete на 14 дней. По
            истечении этого периода система выполняет физический purge данных без возможности
            восстановления. Если нужен экспорт до удаления, сначала используйте{' '}
            <Link href="/guides/integrations" className="link-inline">
              ежедневную CSV-выгрузку
            </Link>{' '}
            или API.
          </p>
        </article>

        <article className="article">
          <h2>Краткие правила</h2>
          <ul className="detail-list">
            <li>Срок хранения readings зависит от тарифа и отличается сильнее всего: 180 против 730 дней.</li>
            <li>Alerts хранятся одинаково на обоих тарифах: 365 дней.</li>
            <li>Период хранения backup snapshots фиксированный и не зависит от тарифа.</li>
          </ul>
        </article>
      </div>
    </>
  )
}
