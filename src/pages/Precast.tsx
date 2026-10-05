import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Handshake } from 'lucide-react'
import Reveal from '../components/Reveal'
import { CTABand } from '../components/ui'
import { JOINT_VENTURE as JV } from '../content'
import useSEO from '../useSEO'

export default function Precast() {
  const [logoOk, setLogoOk] = useState(true)

  useSEO({
    title: 'NirJay Precast Solutions — Precast Labour, Reinforcement & Installation | SP Consultants',
    description:
      'Our joint venture with NirJay Precast Solutions: precast production labour, reinforcement work, installation services and precast factory setup consultation and technical support.',
    path: '/precast',
  })

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden" style={{ background: JV.brand }}>
        <img
          src={JV.services[2].image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, ${JV.brand} 32%, transparent 100%)` }}
        />
        <div className="container-x relative pt-32 pb-20">
          <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] px-4 py-2 rounded-full border border-white/25 text-white/90">
            <Handshake size={14} /> {JV.eyebrow} with SP Consultants
          </span>

          {logoOk ? (
            <img
              src={JV.logo}
              alt={JV.partner}
              onError={() => setLogoOk(false)}
              className="h-14 md:h-16 w-auto mt-9 mb-5"
            />
          ) : (
            <p className="mt-9 mb-5 text-3xl font-bold tracking-tight text-white">{JV.partner}</p>
          )}

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60 mb-8">{JV.tagline}</p>
          <h1 className="display-xl text-white max-w-3xl">{JV.title}</h1>
          <p className="mt-6 text-white/70 leading-relaxed max-w-2xl">{JV.text}</p>

          <Link
            to="/contact"
            viewTransition
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium transition-transform hover:-translate-y-0.5"
            style={{ color: JV.brand }}
          >
            Talk to us about precast <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ---------------- Capabilities ---------------- */}
      <section className="container-x py-16 md:py-20">
        <Reveal>
          <p className="label-mono mb-3">Capabilities</p>
          <h2 className="display-lg mb-12 max-w-2xl">Four ways we support a precast operation.</h2>
        </Reveal>

        <div className="space-y-5">
          {JV.services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 90}>
              <div
                className={`panel group grid md:grid-cols-2 gap-0 overflow-hidden ${
                  i % 2 === 1 ? 'md:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="relative min-h-[240px] md:min-h-[300px] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)' }}
                  />
                </figure>

                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center">
                  <span className="label-mono opacity-60 mb-3">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-accent font-medium mb-4">{s.lead}</p>
                  <p className="text-muted leading-relaxed mb-6">{s.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.steps.map((st) => (
                      <span
                        key={st}
                        className="text-xs px-3 py-1.5 rounded-full border"
                        style={{ borderColor: 'var(--line)', background: 'var(--surface-2)' }}
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Why the JV matters ---------------- */}
      <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'var(--surface)' }}>
        <div className="absolute inset-0 bp-grid opacity-50" />
        <div className="aura drift" style={{ width: 420, height: 420, top: '-30%', right: '-6%', opacity: 0.3 }} />
        <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="label-mono mb-3">Model to site</p>
              <h2 className="display-lg mb-5">The model, and the crew that builds it.</h2>
              <p className="text-muted leading-relaxed">
                Most consultancies hand over a model and stop there. With NirJay, the same
                people who coordinate the precast design can put trained crews on the casting
                bed and the erection site — so what was modelled is what gets built.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={JV.services[0].poster}
              alt="NirJay precast production"
              loading="lazy"
              className="rounded-2xl border w-full"
              style={{ borderColor: 'var(--line)' }}
            />
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Need precast delivered, not just drawn?"
        subtitle="Tell us about your scope and we’ll bring the right mix of BIM coordination and precast execution."
      />
    </>
  )
}
