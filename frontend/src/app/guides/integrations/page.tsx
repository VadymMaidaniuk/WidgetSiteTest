import type { Metadata } from 'next'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Интеграции и API',
  description:
    'REST API, webhook-события, расписание CSV-выгрузок и лимиты запросов для платформы Atlas.',
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
        title="Интеграции и API"
        description="Эта страница нужна для тестов, где важно извлекать endpoint, rate limit, расписание batch-выгрузок и список событий webhook."
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Руководства' },
          { label: 'Интеграции' },
        ]}
        meta={['https://api.atlaswidgets.test/v1', '120 req/min Basic', 'CSV в 02:30 UTC']}
      />

      <div className="article-stack">
        <article className="article">
          <h2>REST API</h2>
          <p>
            Базовый endpoint для всех вызовов: <code>https://api.atlaswidgets.test/v1</code>.
            Тестовые ключи начинаются с префикса <code>atl_test_</code>, рабочие — с{' '}
            <code>atl_live_</code>. Ключ передается в заголовке <code>Authorization: Bearer ...</code>.
          </p>
          <ul className="detail-list">
            <li>План Basic: до 120 запросов в минуту.</li>
            <li>План Pro: до 600 запросов в минуту.</li>
            <li>При превышении лимита API отвечает кодом <code>429</code> и возвращает время повтора.</li>
          </ul>
        </article>

        <article className="article">
          <h2>CSV-выгрузки</h2>
          <p>
            Ежедневная CSV-выгрузка запускается автоматически в <code>02:30 UTC</code>. В файл
            попадают новые readings за предыдущие сутки и открытые alerts. Ссылка на выгрузку
            действует 24 часа с момента генерации.
          </p>
        </article>

        <article className="article">
          <h2>Webhook delivery</h2>
          <p>
            Подпись события приходит в заголовке <code>x-atlas-signature</code>. Если endpoint
            недоступен, система делает до <code>8</code> повторных попыток в течение <code>24 часов</code>.
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
