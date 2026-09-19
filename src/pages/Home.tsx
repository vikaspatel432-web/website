import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Marquee from '../components/Marquee'
import BeforeAfter from '../components/BeforeAfter'
import ToolLogo from '../components/ToolLogo'
import Icon from '../components/Icon'
import { SectionHeading, CTABand } from '../components/ui'
import { SERVICES, STATS, TOOLS, TECH_WE_MASTER } from '../content'
import useSEO from '../useSEO'

export default function Home() {
  useSEO({
    title: 'SP Consultants — BIM Consultancy & AEC Construction Technology',
    description: 'Multi-discipline BIM modelling, clash detection, 4D/5D simulation, reality capture and live analytics. Transforming visions into reality.',
    path: '/',
  })

  return (
    <>
      <Hero />

      {/* ---------------- Tools marquee (fixed light logo wall) ---------------- */}
      <section className="py-10 border-y" style={{ background: '#f4f7f9', borderColor: '#e2e8ee' }}>
        <p className="text-center mb-7 text-xs font-medium uppercase tracking-[0.25em]" style={{ color: '#156082' }}>
          Our Technology Stack — the tools we build with
        </p>
        <Marquee>
          {TOOLS.map((t) => (
            <ToolLogo key={t.name} name={t.name} file={t.file} />
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

      {/* ---------------- Scan to BIM comparison ---------------- */}
      <section className="container-x py-20">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
          <Reveal>
            <div>
              <p className="label-mono mb-4">Reality capture → BIM</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-5">
                From a cloud of points to a model you can build from.
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                We scan the asset as it truly is — millions of measured points — then
                turn that survey into a clean, parametric BIM model with accurate
                geometry, families and data. Drag the handle to compare.
              </p>
              <ul className="space-y-3">
                {['Survey-grade laser scanning', 'Registered, cleaned point cloud', 'Parametric Revit model at LOD 200–400'].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
              >
                Explore scan-to-BIM <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BeforeAfter
              beforeSrc="/projects/stadium-scan.webp"
              afterSrc="/projects/stadium.webp"
              beforeLabel="Point cloud"
              afterLabel="BIM model"
            />
          </Reveal>
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
          {SERVICES.map((s, i) => {
            const wide = i === 0 || i === 3
            return (
              <Reveal key={s.id} delay={(i % 3) * 90} className={wide ? 'lg:col-span-2' : ''}>
                <Link
                  to={`/services#${s.id}`}
                  viewTransition
                  className="card group relative p-7 h-full block overflow-hidden hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-black/5"
                >
                  {/* hover wash — bento tiles reveal on hover */}
                  <span
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                    style={{ background: 'radial-gradient(420px circle at 15% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)' }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl grid place-items-center text-accent transition-transform duration-300 group-hover:scale-110" style={{ background: 'var(--surface-2)' }}>
                        <Icon name={s.icon as never} size={24} strokeWidth={1.6} />
                      </div>
                      <span className="label-mono opacity-60">{s.num}</span>
                    </div>
                    <h3 className={`font-display font-semibold mb-2 ${wide ? 'text-2xl' : 'text-xl'}`}>{s.title}</h3>
                    <p className={`text-muted leading-relaxed ${wide ? 'text-base max-w-xl' : 'text-sm'}`}>{s.short}</p>
                    <span className={`mt-5 inline-flex items-center gap-1 text-sm text-accent transition-all duration-300 ${wide ? 'opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                      Learn more <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
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
