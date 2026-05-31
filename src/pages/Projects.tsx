import FadeIn from '../components/FadeIn'
import { PageHeader, Card, SectionHeading, CTASection, PAGE_X } from '../components/ui'

const projects = [
  {
    sector: 'Sports & Venues',
    title: 'Stadium Reality Capture',
    text: 'Full 360° laser scanning of a large stadium structure, producing a registered 3D point cloud and BIM model of complex seating, structural and roof geometry.',
    tags: ['Laser Scanning', '3D Point Cloud', 'Scan-to-BIM'],
  },
  {
    sector: 'Hospitality',
    title: 'Lemon Tree Hotel, Surat',
    text: 'As-built capture and modelling of hotel interiors and structure, giving the design and operations team an accurate digital record to plan refurbishment and fit-out.',
    tags: ['Interior Scanning', 'BIM Model', 'BIM Viewer'],
  },
  {
    sector: 'Interiors',
    title: 'Empire Interiors, UK',
    text: 'Detailed interior scanning and 2D CAD generation for an international interiors project, delivering precise existing-condition layouts for design coordination.',
    tags: ['Interior Scanning', '2D CAD', 'Point Cloud'],
  },
  {
    sector: 'Infrastructure',
    title: 'Road & Pathway Survey',
    text: 'Capture of road and pathway corridors as colourised point clouds, supporting accurate measurement, design verification and as-built documentation.',
    tags: ['Exterior Scanning', '3D Point Cloud', 'Survey'],
  },
]

const sectors = [
  'Hospitality & Hotels',
  'Sports Venues & Stadiums',
  'Interiors & Fit-out',
  'Roads & Infrastructure',
  'Heritage & Existing Buildings',
  'Industrial & Commercial',
]

export default function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Trusted on complex sites, across sectors."
        intro="From stadiums and hotels to interiors and infrastructure, we deliver dependable reality-capture and BIM outcomes on projects across the UK and India."
      />

      <section className={`${PAGE_X} py-20 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={120 + i * 110} duration={750}>
              <Card>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                  {p.sector}
                </p>
                <h3 className="text-2xl font-normal mb-3" style={{ letterSpacing: '-0.02em' }}>
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {p.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-gray-300 border border-white/15 rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className={`${PAGE_X} py-24`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Sectors we serve" title="Wherever accuracy matters." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((s, i) => (
              <FadeIn key={s} delay={100 + i * 70} duration={600}>
                <div className="liquid-glass border border-white/10 rounded-xl px-6 py-5 text-gray-200">
                  {s}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a project in mind?"
        subtitle="Whatever the sector or scale, we'll help you capture it accurately and deliver it in a format your team can use."
      />
    </>
  )
}
