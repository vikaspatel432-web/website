import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero, CTABand } from '../components/ui'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { PRODUCTS } from '../content'
import useSEO from '../useSEO'

export default function Products() {
  useSEO({
    title: 'Construction Technology Products — Digital Ops, Reality Capture & Automated BBS | SP Consultants',
    description:
      'Construction technology built around how projects actually operate: Digital Ops planning and project controls, 360° Reality Capture with AI insight, and automated Bar Bending Schedules in minutes.',
    path: '/products',
  })

  return (
    <>
      <PageHero
        eyebrow="Construction Technology"
        title="Construction technology built around how projects actually operate."
        intro="Three products that connect the programme to the site, turn site reality into intelligence, and automate the engineering work that quietly consumes your team’s time."
      />

      <section className="container-x py-16 space-y-8">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <Link
              to={`/products/${p.slug}`}
              viewTransition
              className="card group relative block overflow-hidden p-8 md:p-10 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-black/5"
            >
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{ background: 'radial-gradient(520px circle at 12% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)' }}
              />
              <div className="relative grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-13 h-13 p-3.5 rounded-xl grid place-items-center text-accent transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'var(--surface-2)' }}
                    >
                      <Icon name={p.icon as never} size={24} strokeWidth={1.6} />
                    </div>
                    <div>
                      <span className="label-mono opacity-60">{String(i + 1).padStart(2, '0')}</span>
                      <h2 className="font-display text-2xl md:text-3xl font-semibold leading-tight">{p.name}</h2>
                    </div>
                  </div>

                  <p className="text-accent font-medium mb-4">{p.tagline}</p>
                  <p className="text-muted leading-relaxed mb-6 max-w-2xl">{p.summary}</p>

                  {p.market && (
                    <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full border border-line text-muted">
                      {p.market}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-2 font-medium text-accent transition-all group-hover:gap-3">
                    {p.cta} <ArrowRight size={17} />
                  </span>
                </div>

                <div className="rounded-xl p-6" style={{ background: 'var(--surface-2)' }}>
                  <p className="label-mono mb-4">What it gives you</p>
                  <ul className="space-y-3">
                    {p.benefits.slice(0, 4).map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm">
                        <Check size={16} className="text-accent shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <CTABand />
    </>
  )
}
