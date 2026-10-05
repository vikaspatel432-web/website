import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { CTABand } from '../components/ui'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import ProductVideo from '../components/ProductVideo'
import { PRODUCTS } from '../content'
import useSEO from '../useSEO'

const trackPointer = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--px', `${((e.clientX - r.left) / r.width) * 100}%`)
  e.currentTarget.style.setProperty('--py', `${((e.clientY - r.top) / r.height) * 100}%`)
}

export default function Products() {
  useSEO({
    title: 'Construction Technology Products — Digital Ops, Reality Capture & Automated BBS | SP Consultants',
    description:
      'Construction technology built around how projects actually operate: Digital Ops planning and project controls, 360° Reality Capture with AI insight, and automated Bar Bending Schedules in minutes.',
    path: '/products',
  })

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="absolute inset-0 bp-grid opacity-50" />
        <div className="aura drift" style={{ width: 560, height: 560, top: '-28%', left: '48%' }} />
        <div className="container-x relative">
          <p className="label-mono mb-5">Construction Technology</p>
          <h1 className="display-xl max-w-3xl">
            Built around how projects <span className="text-accent text-glow">actually operate.</span>
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            Three products that connect the programme to the site, turn site reality into
            intelligence, and automate the engineering work that quietly eats your team’s time.
          </p>
        </div>
      </section>

      {/* ---------------- Products ---------------- */}
      <section className="container-x pb-16 md:pb-20 space-y-6">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 90}>
            <Link
              to={`/products/${p.slug}`}
              viewTransition
              onMouseMove={trackPointer}
              className="panel group block p-7 md:p-10"
            >
              <div className="relative z-10 grid lg:grid-cols-2 gap-9 lg:gap-12 items-center">
                {/* copy */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl grid place-items-center text-accent transition-transform duration-500 group-hover:scale-110"
                      style={{ background: 'var(--surface-2)' }}
                    >
                      <Icon name={p.icon as never} size={22} strokeWidth={1.5} />
                    </div>
                    <span className="text-3xl font-light opacity-15 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="display-lg mb-2">{p.name}</h2>
                  <p className="text-accent font-medium mb-4">{p.tagline}</p>
                  <p className="text-muted leading-relaxed mb-6 max-w-lg">{p.summary}</p>

                  {p.market && (
                    <span className="inline-block mb-6 text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--line)' }}>
                      {p.market}
                    </span>
                  )}

                  <ul className="space-y-2.5 mb-7">
                    {p.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-muted">
                        <Check size={15} className="text-accent shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-2 font-medium text-accent transition-all group-hover:gap-3.5">
                    {p.cta} <ArrowRight size={17} />
                  </span>
                </div>

                {/* live product clip */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  {p.video ? (
                    <ProductVideo src={p.video} label={`${p.name} walkthrough`} />
                  ) : (
                    <div className="rounded-3xl border bp-grid" style={{ borderColor: 'var(--line)', aspectRatio: '16/9' }} />
                  )}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <CTABand
        title="See them running on your project."
        subtitle="Book a walkthrough and we’ll show you the products working on the kind of work you actually do."
      />
    </>
  )
}
