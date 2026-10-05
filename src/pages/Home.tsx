import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Marquee from '../components/Marquee'
import BeforeAfter from '../components/BeforeAfter'
import ScrollSequence from '../components/ScrollSequence'
import ToolLogo from '../components/ToolLogo'
import Icon from '../components/Icon'
import { CTABand } from '../components/ui'
import { SERVICES, STATS, TOOLS, DIVISIONS } from '../content'
import useSEO from '../useSEO'

/** Tracks the cursor so .panel can light up from where the pointer is. */
const trackPointer = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--px', `${((e.clientX - r.left) / r.width) * 100}%`)
  e.currentTarget.style.setProperty('--py', `${((e.clientY - r.top) / r.height) * 100}%`)
}

export default function Home() {
  useSEO({
    title: 'SP Consultants — BIM Consultancy & AEC Construction Technology',
    description:
      'Multi-discipline BIM modelling, clash detection, 4D/5D simulation, reality capture and live analytics. Transforming visions into reality.',
    path: '/',
  })

  return (
    <>
      <Hero />

      {/* ============ Positioning statement ============ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="aura drift" style={{ width: 640, height: 640, top: '-22%', left: '52%' }} />
        <div className="container-x relative">
          <Reveal>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {['BIM Expertise', 'Construction Technology', 'AI-Powered Project Intelligence'].map((t) => (
                <span
                  key={t}
                  className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] px-4 py-2 rounded-full border"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="display-xl max-w-5xl">
              We don’t just model
              <br />
              construction projects.{' '}
              <span className="text-accent text-glow">We help plan, monitor and deliver them.</span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <div className="rule mt-14 mb-8 max-w-md" />
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              Construction expertise and technology, working on the same project.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ Two divisions ============ */}
      <section className="container-x pb-20 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-6">
          {DIVISIONS.map((d, i) => (
            <Reveal key={d.id} delay={i * 120}>
              <Link
                to={d.to}
                viewTransition
                onMouseMove={trackPointer}
                className="panel group block h-full p-9 md:p-12"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-10">
                    <div
                      className="w-14 h-14 rounded-2xl grid place-items-center text-accent transition-transform duration-500 group-hover:scale-110"
                      style={{ background: 'var(--surface-2)' }}
                    >
                      <Icon name={d.icon as never} size={26} strokeWidth={1.5} />
                    </div>
                    <span className="text-5xl md:text-6xl font-light opacity-15 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="display-lg mb-4">{d.title}</h3>
                  <p className="text-muted leading-relaxed mb-8 max-w-md">{d.text}</p>

                  <ul className="space-y-2.5 mb-10">
                    {d.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-sm text-muted">
                        <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-2 font-medium text-accent transition-all group-hover:gap-3.5">
                    {d.cta} <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Stats ============ */}
      <section className="relative overflow-hidden py-24 border-y" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
        <div className="absolute inset-0 bp-grid opacity-60" />
        <div className="aura drift" style={{ width: 520, height: 520, bottom: '-40%', left: '-8%', opacity: 0.35 }} />
        <div className="container-x relative grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div>
                <div className="display-lg text-accent text-glow tabular-nums">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="rule mt-5 mb-4 max-w-[64px]" />
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Tool logo wall (deliberate light break) ============ */}
      <section className="py-12" style={{ background: '#f4f7f9' }}>
        <p className="text-center mb-8 text-xs font-medium uppercase tracking-[0.25em]" style={{ color: '#156082' }}>
          Our Technology Stack
        </p>
        <Marquee>
          {TOOLS.map((t) => (
            <ToolLogo key={t.name} name={t.name} file={t.file} />
          ))}
        </Marquee>
      </section>

      {/* ============ Scan to BIM ============ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="aura drift" style={{ width: 560, height: 560, top: '10%', right: '-14%', opacity: 0.32 }} />
        <div className="container-x relative grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
          <Reveal>
            <div>
              <p className="label-mono mb-5">Reality capture → BIM</p>
              <h2 className="display-lg mb-6">
                From a cloud of points to a model you can build from.
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                We scan the asset as it is, then turn that survey into a clean, parametric
                model. Drag to compare.
              </p>
              <Link
                to="/services"
                viewTransition
                className="inline-flex items-center gap-2 font-medium text-accent hover:gap-3.5 transition-all"
              >
                Explore scan-to-BIM <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <BeforeAfter
              beforeSrc="/projects/stadium-scan.webp"
              afterSrc="/projects/stadium.webp"
              beforeLabel="Point cloud"
              afterLabel="BIM model"
            />
          </Reveal>
        </div>
      </section>

      {/* ============ 4D scroll-scrubbed sequence ============ */}
      <ScrollSequence />

      {/* ============ Services ============ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="container-x relative">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <h2 className="display-lg max-w-xl">
                Seven services, one connected model.
              </h2>
              <Link
                to="/services"
                viewTransition
                className="inline-flex items-center gap-2 font-medium text-accent hover:gap-3.5 transition-all"
              >
                All services <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 90}>
                <Link
                  to={`/services#${s.id}`}
                  viewTransition
                  onMouseMove={trackPointer}
                  className="panel group flex items-center gap-5 h-full p-6"
                >
                  <div className="relative z-10 flex items-center gap-5 w-full">
                    <div
                      className="w-12 h-12 shrink-0 rounded-xl grid place-items-center text-accent transition-transform duration-500 group-hover:scale-110"
                      style={{ background: 'var(--surface-2)' }}
                    >
                      <Icon name={s.icon as never} size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-medium leading-snug flex-1">{s.title}</h3>
                    <ArrowUpRight
                      size={18}
                      className="text-accent shrink-0 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
