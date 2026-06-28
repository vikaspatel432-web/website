import { useState } from 'react'
import { Mail, Phone, Target, Users, Eye, Workflow } from 'lucide-react'
import { PageHero, SectionHeading, CTABand } from '../components/ui'
import Reveal from '../components/Reveal'
import { FOUNDERS } from '../content'

function FounderCard({ f }: { f: (typeof FOUNDERS)[number] }) {
  const [imgOk, setImgOk] = useState(true)
  const initials = f.name.split(' ').map((n) => n[0]).join('')
  return (
    <div className="card p-6 sm:p-8 hover:border-accent transition-colors flex flex-col sm:flex-row gap-7 items-center sm:items-start">
      <div className="shrink-0">
        {imgOk && f.photo ? (
          <img
            src={f.photo}
            alt={f.name}
            onError={() => setImgOk(false)}
            className="w-40 h-48 object-cover object-top rounded-2xl border border-line"
          />
        ) : (
          <div className="w-40 h-48 rounded-2xl grid place-items-center font-display text-4xl font-bold text-accent border border-line" style={{ background: 'var(--surface-2)' }}>
            {initials}
          </div>
        )}
      </div>
      <div className="text-center sm:text-left">
        <h3 className="font-display text-2xl font-semibold">{f.name}</h3>
        <p className="text-sm text-accent mb-4">{f.role}</p>
        {f.bio && <p className="text-sm text-muted leading-relaxed mb-5 max-w-md">{f.bio}</p>}
        <div className="space-y-2 text-sm">
          <a href={`mailto:${f.email}`} className="flex items-center gap-2 justify-center sm:justify-start text-muted hover:text-accent transition-colors">
            <Mail size={15} /> {f.email}
          </a>
          <a href={`tel:${f.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 justify-center sm:justify-start text-muted hover:text-accent transition-colors">
            <Phone size={15} /> {f.phone}
          </a>
        </div>
      </div>
    </div>
  )
}

const values = [
  { icon: Eye, title: 'Single source of truth', text: 'One current model that brings everyone onto the same page.' },
  { icon: Workflow, title: 'From files to flow', text: 'Dynamic, real-time collaboration over static deliverables.' },
  { icon: Users, title: 'Inclusive participation', text: 'Every stakeholder contributes directly in the model environment.' },
  { icon: Target, title: 'Predictable outcomes', text: 'Better-informed decisions across the whole project lifecycle.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We don’t just deliver models."
        intro="SP Consultants is a BIM consultancy and AEC construction-technology firm. We create an environment where the model becomes the central point of communication for all stakeholders."
      />

      <section className="container-x py-20">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="h-display text-2xl md:text-3xl leading-snug">
              “Beyond delivery: transforming the BIM model into the central
              nervous system of your project.”
            </p>
            <p className="mt-5 text-muted leading-relaxed">
              By positioning the model as the core information hub, we enable
              seamless data flow between all project participants — creating an
              integrated environment where your BIM investment delivers maximum
              value throughout the project lifecycle.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="absolute inset-0 bp-grid opacity-50" />
        <div className="container-x relative">
          <SectionHeading eyebrow="What we believe" title="How we work." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="card p-7 h-full hover:-translate-y-1 hover:border-accent transition-all">
                  <v.icon size={26} className="text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <SectionHeading eyebrow="Leadership" title="The people behind SP Consultants." />
        <div className="max-w-2xl">
          {FOUNDERS.map((f) => (
            <Reveal key={f.name}>
              <FounderCard f={f} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}
