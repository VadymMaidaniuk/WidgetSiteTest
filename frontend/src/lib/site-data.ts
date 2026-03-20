export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/guides/installation', label: 'Installation' },
  { href: '/guides/integrations', label: 'Integrations' },
  { href: '/policies/data-retention', label: 'Data Retention' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export const footerLinks = [
  { href: '/catalog', label: 'Device catalog' },
  { href: '/guides/installation', label: 'Installation guide' },
  { href: '/guides/integrations', label: 'Integrations and API' },
  { href: '/policies/data-retention', label: 'Data retention policy' },
  { href: '/faq', label: 'Frequently asked questions' },
  { href: '/contact', label: 'Support contacts' },
]

export const pageDirectory = [
  {
    href: '/about',
    tag: 'Context',
    title: 'About the project',
    description:
      'Why this site exists, what content types it contains, and how the test facts are distributed.',
    highlights: ['version history', 'content rules', 'RAG testing purpose'],
  },
  {
    href: '/catalog',
    tag: 'Catalog',
    title: 'Device catalog',
    description:
      'Three fictional Atlas devices with model numbers, connectivity modes, warranty periods, and infrastructure limits.',
    highlights: ['model table', '24-month warranty', 'up to 120 sensors per gateway'],
  },
  {
    href: '/guides/installation',
    tag: 'Guide',
    title: 'Installation and first launch',
    description:
      'Step-by-step guide: mounting height, power, initial sync, and signal checks.',
    highlights: ['12V DC 2A', '1.4-1.8 m height', 'first sync up to 10 minutes'],
  },
  {
    href: '/guides/integrations',
    tag: 'Guide',
    title: 'Integrations and API',
    description:
      'REST endpoint, request limits, daily CSV exports, and the list of supported webhook events.',
    highlights: ['120 req/min on Basic', 'CSV at 02:30 UTC', '8 retry attempts'],
  },
  {
    href: '/policies/data-retention',
    tag: 'Policy',
    title: 'Data retention policy',
    description:
      'How long Atlas keeps readings, logs, backups, and when a workspace is permanently deleted.',
    highlights: ['180 days on Basic', '730 days on Pro', 'purge after 14 days'],
  },
  {
    href: '/faq',
    tag: 'FAQ',
    title: 'Frequently asked questions',
    description:
      'Short answers about internet access, CSV exports, devices per gateway, and support response times.',
    highlights: ['BLE for sensors', 'scheduled exports', 'support SLA'],
  },
  {
    href: '/contact',
    tag: 'Contact',
    title: 'Contact',
    description:
      'Email addresses, support hours, office address, demo call slots, and incident escalation rules.',
    highlights: ['support@atlaswidgets.test', '09:00-18:00 EET', 'critical reply within 2 hours'],
  },
]

export const sampleQueries = [
  'How many devices can one Dock Gateway One handle?',
  'At what time is the daily CSV export generated?',
  'How many days are sensor readings stored on the Basic plan?',
  'What is the support email and what are the working hours?',
  'What power supply is required for the gateway during first launch?',
  'Which webhook events does the Atlas platform support?',
]

export const catalogItems = [
  {
    name: 'Atlas Mini Sensor',
    model: 'AMS-20',
    useCase: 'Temperature, humidity, and display case monitoring in small indoor spaces.',
    power: 'CR2477 battery, up to 18 months',
    connectivity: 'Bluetooth Low Energy 5.2',
    limits: 'Transmits every 15 minutes, indoor range up to 35 m',
    warranty: '24 months',
  },
  {
    name: 'Dock Gateway One',
    model: 'DG-100',
    useCase: 'Bridge device between sensors and the Atlas cloud dashboard.',
    power: '12V DC, 2A power adapter',
    connectivity: 'Ethernet or Wi-Fi 2.4 GHz',
    limits: 'Up to 120 sensors per gateway, local buffer for 72 hours',
    warranty: '24 months',
  },
  {
    name: 'Beacon Tag',
    model: 'BT-5',
    useCase: 'Tag for tracking movable containers and pallets.',
    power: 'CR2032 battery, up to 9 months',
    connectivity: 'Bluetooth Low Energy 5.0',
    limits: 'Pings every 5 minutes, recommended temperature range from -10 to +45 C',
    warranty: '12 months',
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
