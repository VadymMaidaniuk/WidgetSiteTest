import Link from 'next/link'

type Crumb = {
  label: string
  href?: string
}

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  crumbs: Crumb[]
  meta?: string[]
}

export default function PageIntro({
  eyebrow,
  title,
  description,
  crumbs,
  meta = [],
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="narrow-shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`}>
              {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
              {index < crumbs.length - 1 ? ' / ' : ''}
            </span>
          ))}
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {meta.length > 0 ? (
          <ul className="meta-inline">
            {meta.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
