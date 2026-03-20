import type { Metadata } from 'next'
import Link from 'next/link'
import PageIntro from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Короткие ответы на самые частые вопросы о датчиках Atlas, шлюзах, CSV-выгрузках и поддержке.',
}

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Частые вопросы"
        description="FAQ полезен для коротких factual retrieval-запросов. Ответы ссылаются на другие страницы, но сформулированы компактно."
        crumbs={[
          { label: 'Главная', href: '/' },
          { label: 'FAQ' },
        ]}
        meta={['BLE', 'CSV', 'SLA', '120 датчиков']}
      />

      <div className="article-stack">
        <article className="article">
          <div className="faq-item">
            <h3>Нужен ли интернет каждому датчику?</h3>
            <p>
              Нет. Интернет нужен только шлюзу Dock Gateway One. Датчики AMS-20 и Beacon Tag
              передают данные по Bluetooth Low Energy.
            </p>
          </div>

          <div className="faq-item">
            <h3>Сколько устройств можно подключить к одному шлюзу?</h3>
            <p>
              Один Dock Gateway One обслуживает до 120 устройств. Подробное описание есть на{' '}
              <Link href="/catalog" className="link-inline">
                странице каталога
              </Link>
              .
            </p>
          </div>

          <div className="faq-item">
            <h3>Во сколько создается ежедневная CSV-выгрузка?</h3>
            <p>
              Выгрузка стартует ежедневно в 02:30 UTC, а ссылка на файл сохраняется активной 24 часа.
            </p>
          </div>

          <div className="faq-item">
            <h3>Как быстро отвечает поддержка на критический инцидент?</h3>
            <p>
              Первая реакция на инциденты уровня critical должна прийти не позже чем через 2 часа в
              рабочее окно поддержки.
            </p>
          </div>

          <div className="faq-item">
            <h3>Сколько времени хранится история measurements на тарифе Basic?</h3>
            <p>
              Для Basic срок хранения readings составляет 180 дней. Для Pro он расширен до 730 дней.
            </p>
          </div>

          <div className="faq-item">
            <h3>Что делать, если устройство не появилось после установки?</h3>
            <p>
              Проверьте питание шлюза, расстояние до датчика и повторите pairing. Если нужно,
              удерживайте reset на шлюзе 7 секунд и выполните первичную синхронизацию заново.
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
