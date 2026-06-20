import { PageHero, SectionHeading, CTABand } from '../components/ui'
import Reveal from '../components/Reveal'
import { PROJECTS } from '../content'

const sectors = [
  'Hospitality & Hotels',
  'Sports Venues & Stadiums',
  'Commercial & Mixed-use',
  'Residential',
  'Infrastructure',
  'Interiors & Fit-out',
]

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Proven on complex, real-world builds."
        intro="From stadiums and hotels to integrated BIM delivery and programme control, our work spans sectors and scales across the AEC industry."
      />

      <section className="container-x py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100}>
              <article className="card group overflow-hidden h-full hover:-translate-y-1.5 hover:border-accent transition-all">
                <div className="relative h-44 bp-grid border-b border-line overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110"
                    style={{ background: 'radial-gradient(circle at 30% 30%, var(--accent), transparent 60%)' }}
                  />
                  <span className="absolute top-4 left-4 label-mono">{p.sector}</span>
                </div>
                <div className="p-7">
                  <h3 className="h-display text-2xl mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-5">{p.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="absolute inset-0 bp-grid opacity-50" />
        <div className="container-x relative">
          <SectionHeading eyebrow="Sectors we serve" title="Wherever the model matters." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((s, i) => (
              <Reveal key={s} delay={(i % 3) * 80}>
                <div className="card px-6 py-5 hover:border-accent hover:text-accent transition-colors">
                  {s}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Have a project in mind?"
        subtitle="Whatever the sector or scale, we’ll help you deliver it on a connected BIM model."
      />
    </>
  )
}
