export const navigation = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О проекте' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/guides/installation', label: 'Монтаж' },
  { href: '/guides/integrations', label: 'Интеграции' },
  { href: '/policies/data-retention', label: 'Хранение данных' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Контакты' },
]

export const footerLinks = [
  { href: '/catalog', label: 'Каталог устройств' },
  { href: '/guides/installation', label: 'Руководство по монтажу' },
  { href: '/guides/integrations', label: 'Интеграции и API' },
  { href: '/policies/data-retention', label: 'Data retention policy' },
  { href: '/faq', label: 'Частые вопросы' },
  { href: '/contact', label: 'Служба поддержки' },
]

export const pageDirectory = [
  {
    href: '/about',
    tag: 'Context',
    title: 'О проекте',
    description:
      'Зачем этот сайт существует, какие типы контента он содержит и как распределены тестовые факты.',
    highlights: ['история версии', 'контентные правила', 'цель для RAG'],
  },
  {
    href: '/catalog',
    tag: 'Catalog',
    title: 'Каталог устройств',
    description:
      'Три фиктивных устройства Atlas с артикулами, режимами связи, гарантией и limits для инфраструктуры.',
    highlights: ['таблица моделей', 'гарантия 24 месяца', 'до 120 датчиков на шлюз'],
  },
  {
    href: '/guides/installation',
    tag: 'Guide',
    title: 'Монтаж и первый запуск',
    description:
      'Пошаговое руководство: высота крепления, питание, первичная синхронизация и проверка сигнала.',
    highlights: ['12V DC 2A', '1.4-1.8 м высота', 'первый sync до 10 минут'],
  },
  {
    href: '/guides/integrations',
    tag: 'Guide',
    title: 'Интеграции и API',
    description:
      'REST endpoint, лимиты запросов, ежедневные CSV-выгрузки и список поддерживаемых webhook-событий.',
    highlights: ['120 req/min на Basic', 'CSV в 02:30 UTC', '8 попыток retry'],
  },
  {
    href: '/policies/data-retention',
    tag: 'Policy',
    title: 'Политика хранения данных',
    description:
      'Сколько времени Atlas хранит показания, логи, бэкапы и когда физически удаляет workspace.',
    highlights: ['180 дней на Basic', '730 дней на Pro', 'purge через 14 дней'],
  },
  {
    href: '/faq',
    tag: 'FAQ',
    title: 'Частые вопросы',
    description:
      'Короткие ответы про интернет-доступ, CSV, количество устройств на шлюз и режимы поддержки.',
    highlights: ['BLE для датчиков', 'выгрузки по расписанию', 'support SLA'],
  },
  {
    href: '/contact',
    tag: 'Contact',
    title: 'Контакты',
    description:
      'Email, часы поддержки, адрес офиса, слоты для демо-звонков и правила эскалации инцидентов.',
    highlights: ['support@atlaswidgets.test', '09:00-18:00 EET', 'critical reply до 2 часов'],
  },
]

export const sampleQueries = [
  'Сколько устройств может обслуживать один Dock Gateway One?',
  'Во сколько формируется ежедневная CSV-выгрузка?',
  'Сколько дней хранятся sensor readings на плане Basic?',
  'Какой email у службы поддержки и какие часы работы?',
  'Какое напряжение нужно для шлюза при первом запуске?',
  'Какие webhook-события поддерживает платформа Atlas?',
]

export const catalogItems = [
  {
    name: 'Atlas Mini Sensor',
    model: 'AMS-20',
    useCase: 'Температура, влажность и контроль витрин в небольших помещениях.',
    power: 'Батарея CR2477, до 18 месяцев',
    connectivity: 'Bluetooth Low Energy 5.2',
    limits: 'Передача каждые 15 минут, дальность до 35 м в помещении',
    warranty: '24 месяца',
  },
  {
    name: 'Dock Gateway One',
    model: 'DG-100',
    useCase: 'Связующее устройство между датчиками и облачной панелью Atlas.',
    power: '12V DC, 2A блок питания',
    connectivity: 'Ethernet или Wi-Fi 2.4 GHz',
    limits: 'До 120 датчиков на один шлюз, локальный буфер 72 часа',
    warranty: '24 месяца',
  },
  {
    name: 'Beacon Tag',
    model: 'BT-5',
    useCase: 'Метка для отслеживания перемещаемых контейнеров и паллет.',
    power: 'Батарея CR2032, до 9 месяцев',
    connectivity: 'Bluetooth Low Energy 5.0',
    limits: 'Пинг каждые 5 минут, рекомендуемая температура от -10 до +45 C',
    warranty: '12 месяцев',
  },
]

export const siteRoutes = [
  '/',
  '/about',
  '/catalog',
  '/guides/installation',
  '/guides/integrations',
  '/policies/data-retention',
  '/faq',
  '/contact',
]
