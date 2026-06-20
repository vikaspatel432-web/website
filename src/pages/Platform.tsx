import { Suspense, lazy, useState } from 'react'
import { Box, Clock, IndianRupee } from 'lucide-react'
import { PageHero, SectionHeading, CTABand } from '../components/ui'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { PLATFORM_FEATURES } from '../content'

const BuildingAssembly = lazy(() => import('../components/BuildingAssembly'))

const DIMENSIONS = [
  {
    key: '3D',
    icon: Box,
    title: '3D — The Model',
    text: 'Integrated Architectural, Structural and MEPF geometry, coordinated and clash-free, acting as the single source of truth for every discipline.',
    points: ['Multi-discipline coordination', 'Clash detection', 'Automated BOQ & BBS'],
  },
  {
    key: '4D',
    icon: Clock,
    title: '4D — Time',
    text: 'We link your Primavera P6 / MSP schedule to the model, turning static schedules into dynamic visual timelines you can fast-forward and validate.',
    points: ['Schedule-linked sequencing', 'Progress vs baseline', 'Site logistics planning'],
  },
  {
    key: '5D',
    icon: IndianRupee,
    title: '5D — Cost',
    text: 'Adding cost to the timeline lets you see exactly when and where budget is spent — managing cash flow and the cost/budget cycle with precision.',
    points: ['Cost linked to timeline', 'Cash-flow visualisation', 'What-if scenarios'],
  },
]

export default function Platform() {
  const [dim, setDim] = useState(0)
  const active = DIMENSIONS[dim]

  return (
    <>
      <PageHero
        eyebrow="The BIM Platform"
        title="Beyond delivery: a collaborative ecosystem."
        intro="Our online BIM platform positions the model as the central nervous system of your project — accessible to every stakeholder via a simple link, on any device, with no complex training."
      />

      {/* Feature grid */}
      <section className="container-x py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORM_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 80}>
              <div className="card p-6 h-full hover:-translate-y-1.5 hover:border-accent transition-all">
                <div className="w-11 h-11 rounded-xl grid place-items-center text-accent mb-4" style={{ background: 'var(--surface-2)' }}>
                  <Icon name={f.icon as never} size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Building assembly — interactive 3D construction sequencing */}
      <section className="container-x py-16">
        <SectionHeading
          eyebrow="Construction sequencing"
          title="Watch the model come together."
          intro="An interactive 3D walkthrough of how a building assembles — structure, then architecture, then MEP. Orbit it, switch view modes, or jump between phases."
        />
        <Reveal>
          <Suspense
            fallback={
              <div className="w-full h-[560px] sm:h-[640px] rounded-2xl border border-line grid place-items-center text-muted text-sm">
                Loading 3D model…
              </div>
            }
          >
            <BuildingAssembly />
          </Suspense>
        </Reveal>
      </section>

      {/* Dimensions explorer */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="absolute inset-0 bp-grid opacity-50" />
        <div className="container-x relative">
          <SectionHeading
            center
            eyebrow="3D · 4D · 5D"
            title="One model, more dimensions."
            intro="Click through the dimensions to see how time and cost layer onto the 3D model."
          />
          <div className="flex justify-center gap-3 mb-10">
            {DIMENSIONS.map((d, i) => (
              <button
                key={d.key}
                onClick={() => setDim(i)}
                className={`rounded-full px-6 py-2.5 font-display font-semibold transition-all ${
                  dim === i ? 'text-white' : 'text-muted hover:text-ink'
                }`}
                style={dim === i ? { background: 'var(--accent)' } : { border: '1px solid var(--line)' }}
              >
                {d.key}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto card p-8 md:p-12">
            <div key={active.key} className="grid md:grid-cols-[auto_1fr] gap-8 items-center reveal in">
              <div className="w-24 h-24 rounded-2xl grid place-items-center text-accent mx-auto" style={{ background: 'var(--surface-2)' }}>
                <active.icon size={44} strokeWidth={1.3} />
              </div>
              <div>
                <h3 className="h-display text-2xl md:text-3xl mb-3">{active.title}</h3>
                <p className="text-muted leading-relaxed mb-5">{active.text}</p>
                <div className="flex flex-wrap gap-2">
                  {active.points.map((p) => (
                    <span key={p} className="rounded-full px-3 py-1 text-xs font-medium text-accent" style={{ background: 'var(--surface-2)' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow strip */}
      <section className="container-x py-24">
        <SectionHeading
          eyebrow="How it works"
          title="From model to decision, in real time."
        />
        <div className="grid md:grid-cols-4 gap-5">
          {[
            ['Model', 'Integrated multi-discipline BIM built and coordinated.'],
            ['Collaborate', 'Stakeholders review, raise RFIs and mark up live.'],
            ['Simulate', '4D/5D links schedule and cost to the model.'],
            ['Decide', 'Dashboards and analytics turn data into decisions.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 90}>
              <div className="card p-7 h-full relative hover:border-accent transition-colors">
                <span className="label-mono opacity-60">0{i + 1}</span>
                <h3 className="font-display text-lg font-semibold mt-2 mb-2">{t}</h3>
                <p className="text-sm text-muted leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        title="Want a tour of the platform?"
        subtitle="We’ll walk you through a live model — RFIs, markups, dashboards and 4D/5D — with your project in mind."
      />
    </>
  )
}
