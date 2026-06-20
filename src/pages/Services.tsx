import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero, CTABand } from '../components/ui'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { SERVICES } from '../content'

export default function Services() {
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
      <PageHero
        eyebrow="Services"
        title="An integrated AEC technology stack."
        intro="Seven service lines that connect around a single BIM model — pick the entry point that fits your project, or combine them end to end."
      />

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
                      <h2 className="h-display text-2xl md:text-3xl">{s.title}</h2>
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
                        className="card flex items-center gap-3 px-4 py-3.5 text-sm hover:border-accent transition-colors"
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
              <Link to="/platform" className="btn-ghost">
                See how it all connects on the platform <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure where to start?"
        subtitle="Share your drawings or project scope and we’ll recommend the right combination of services."
      />
    </>
  )
}
