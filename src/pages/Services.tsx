import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { CTABand } from '../components/ui'
import Reveal from '../components/Reveal'
import JointVenture from '../components/JointVenture'
import Icon from '../components/Icon'
import ServicesHero from '../components/ServicesHero'
import ProductVideo from '../components/ProductVideo'
import { SERVICES } from '../content'
import useSEO from '../useSEO'

export default function Services() {
  useSEO({
    title: 'BIM Consultancy Services — Modelling, Coordination & GFC Delivery | SP Consultants',
    description: 'A specialist BIM delivery partner: Architectural, Structural and MEP modelling, federated models, clash detection and coordination, constructability reviews and GFC drawing exports.',
    path: '/services',
  })

  const [active, setActive] = useState(SERVICES[0].id)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SERVICES.forEach((s) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const io = new IntersectionObserver(
        ([e]) => e.isIntersecting && setActive(s.id),
        { rootMargin: '-45% 0px -50% 0px' },
      )
      io.observe(el)
      observers.push(io)
    })
    // jump to hash on load
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      {/* Full-wide interactive hero animation */}
      <ServicesHero />

      <section className="container-x pt-16 pb-4">
        <Reveal>
          <p className="label-mono mb-3">Services</p>
          <h1 className="display-xl max-w-3xl">
            An integrated AEC technology stack.
          </h1>
          <p className="mt-5 text-muted text-lg max-w-2xl leading-relaxed">
            Seven service lines that connect around a single BIM model — pick the
            entry point that fits your project, or combine them end to end.
          </p>
        </Reveal>
      </section>

      {/* One coordinated model — the BIM consultancy story in motion */}
      <section className="container-x pt-10 pb-4">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
          <Reveal>
            <div>
              <p className="label-mono mb-4">Division 01 — BIM Consultancy</p>
              <h2 className="display-lg mb-5">One coordinated model. Constructible and ready.</h2>
              <p className="text-muted leading-relaxed">
                Architecture, structure and MEP modelled together, clashed out and issued as
                construction-ready information — so the model the site works from is the one
                everyone agreed.
              </p>
            </div>
          </Reveal>
          <Reveal delay={130}>
            <ProductVideo src="/videos/bim-coordination.mp4" label="Coordinated BIM model walkthrough" />
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12">
          {/* Sticky index */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="label-mono mb-4">All services</p>
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active === s.id
                      ? 'text-accent'
                      : 'text-muted hover:text-ink'
                  }`}
                  style={active === s.id ? { background: 'var(--surface)' } : undefined}
                >
                  <span className="label-mono opacity-60">{s.num}</span>
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Sections */}
          <div className="space-y-20">
            {SERVICES.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <Reveal>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl grid place-items-center text-accent shrink-0" style={{ background: 'var(--surface-2)' }}>
                      <Icon name={s.icon as never} size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="label-mono opacity-60">{s.num} / 07</span>
                      <h2 className="display-lg">{s.title}</h2>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <p className="text-muted text-lg leading-relaxed max-w-2xl">{s.desc}</p>
                </Reveal>
                <Reveal delay={160}>
                  <div className="mt-7 grid sm:grid-cols-2 gap-3">
                    {s.points.map((p) => (
                      <div
                        key={p}
                        className="panel flex items-center gap-3 px-4 py-3.5 text-sm"
                      >
                        <Check size={18} className="text-accent shrink-0" />
                        {p}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>
            ))}

            <Reveal>
              <div className="flex flex-wrap gap-4">
                <Link to="/platform" viewTransition className="btn-ghost">
                  See how it all connects on the platform <ArrowRight size={17} />
                </Link>
                <Link to="/products" viewTransition className="btn-ghost">
                  Explore our construction technology products <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <JointVenture />

      <CTABand
        title="Not sure where to start?"
        subtitle="Share your drawings or project scope and we’ll recommend the right combination of services."
      />
    </>
  )
}
