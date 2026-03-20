import type { Metadata } from 'next'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Контакты поддержки Atlas Widget Labs, часы работы, адрес офиса и SLA по заявкам.',
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Контакты"
        description="Контактная страница содержит email, часы поддержки, офисный адрес и быстрые правила эскалации инцидентов. Она полезна для тестов на точное извлечение коротких фактов."
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Контакты' },
        ]}
        meta={['support@atlaswidgets.test', '09:00-18:00 EET', 'critical reply до 2 часов']}
      />

      <section className="section contact-grid">
        <article className="panel">
          <h2>Каналы связи</h2>
          <ul className="contact-list">
            <li><span className="table-highlight">Поддержка:</span> support@atlaswidgets.test</li>
            <li><span className="table-highlight">Продажи:</span> sales@atlaswidgets.test</li>
            <li><span className="table-highlight">Партнерства:</span> partners@atlaswidgets.test</li>
            <li><span className="table-highlight">Демо-звонки:</span> вторник и четверг, 14:00-16:00 EET</li>
          </ul>
        </article>

        <article className="panel">
          <h2>Поддержка и SLA</h2>
          <ul className="contact-list">
            <li>Рабочее окно поддержки: понедельник-пятница, 09:00-18:00 EET.</li>
            <li>Critical incident: первый ответ до 2 часов.</li>
            <li>Standard request: первый ответ в течение 1 рабочего дня.</li>
            <li>Office address: Подольская набережная, 18, Киев, 04070.</li>
          </ul>
        </article>
      </section>
    </>
  )
}
