import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Boxes, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Marquee from '../components/Marquee'
import Icon from '../components/Icon'
import { SectionHeading, CTABand } from '../components/ui'
import { SERVICES, STATS, TOOLS, TECH_WE_MASTER } from '../content'

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bp-grid animate-grid-pan opacity-70" />
        <div
          className="absolute top-0 right-0 w-[45rem] h-[45rem] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, var(--accent), transparent 60%)' }}
        />
        <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <Reveal>
              <span className="label-mono inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                BIM Consultancy · AEC Construction Technology
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="h-display text-5xl md:text-6xl xl:text-7xl mt-5">
                Transforming visions <br />
                into <span className="text-gradient">reality.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-muted text-lg max-w-xl leading-relaxed">
                We turn the BIM model into your project’s single source of truth —
                from multi-discipline modelling and clash detection to 4D/5D
                simulation, reality capture and live data analytics.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Start a Project <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="btn-ghost">
                  Explore Services
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — animated "single source of truth" visual */}
          <Reveal delay={250} className="relative">
            <div className="relative card p-6 md:p-8 shadow-2xl shadow-black/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span className="w-3 h-3 rounded-full bg-accent" />
                  Live BIM Model
                </div>
                <span className="label-mono">SSOT</span>
              </div>
              <div className="relative aspect-square rounded-xl bp-grid border border-line flex items-center justify-center overflow-hidden">
                <Boxes size={120} strokeWidth={0.8} className="text-accent animate-floaty" />
                {[
                  { t: 'Clash-free', c: 'top-4 left-4' },
                  { t: 'RFIs', c: 'top-4 right-4' },
                  { t: 'Auto BOQ', c: 'bottom-4 left-4' },
                  { t: '4D · 5D', c: 'bottom-4 right-4' },
                ].map((chip) => (
                  <span
                    key={chip.t}
                    className={`absolute ${chip.c} glass rounded-full px-3 py-1 text-xs font-medium`}
                  >
                    {chip.t}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {['Architecture', 'Structure', 'MEPF'].map((d) => (
                  <div key={d} className="rounded-lg border border-line py-2 text-xs text-muted">
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Tools marquee ---------------- */}
      <section className="py-8 border-y border-line" style={{ background: 'var(--surface)' }}>
        <Marquee>
          {TOOLS.map((t) => (
            <span key={t} className="font-display text-xl md:text-2xl text-muted/70 whitespace-nowrap">
              {t}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="container-x py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="card p-7 hover:-translate-y-1 hover:border-accent">
                <div className="h-display text-4xl md:text-5xl text-accent">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="What we do"
          title="Seven integrated services, one connected model."
          intro="From the first concept to construction control, our services plug into a single BIM backbone — so data flows instead of sitting in files."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 90}>
              <Link
                to={`/services#${s.id}`}
                className="card group p-7 h-full block hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-black/5"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl grid place-items-center text-accent" style={{ background: 'var(--surface-2)' }}>
                    <Icon name={s.icon as never} size={24} strokeWidth={1.6} />
                  </div>
                  <span className="label-mono opacity-60">{s.num}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  Learn more <ArrowRight size={15} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- From Files to Flow ---------------- */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="absolute inset-0 bp-grid opacity-50" />
        <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="label-mono mb-3">Our vision</p>
              <h2 className="h-display text-3xl md:text-5xl">
                From <span className="line-through decoration-accent/50">files</span> to{' '}
                <span className="text-gradient">flow.</span>
              </h2>
              <p className="mt-5 text-muted leading-relaxed max-w-xl">
                We’re shifting BIM from static, delivery-based 3D files to dynamic,
                real-time collaboration. The model becomes the central nervous
                system of your project — where every stakeholder participates and
                decisions are better informed.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Inclusive participation — everyone in one model environment',
                  'Accessible to all — a simple link, on any device',
                  'Single source of truth — one version, always current',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/platform" className="btn-ghost mt-8">
                See the platform <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid sm:grid-cols-2 gap-4">
              {TECH_WE_MASTER.map((t) => (
                <div key={t.title} className="card p-5 hover:border-accent transition-colors">
                  <h4 className="font-display font-semibold text-sm mb-1.5">{t.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
