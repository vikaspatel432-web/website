import { Target, ShieldCheck, Zap, Users } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { PageHeader, Card, SectionHeading, CTASection, PAGE_X } from '../components/ui'

const values = [
  { icon: Target, title: 'Precision first', text: 'Survey-grade accuracy is the foundation of everything we deliver.' },
  { icon: ShieldCheck, title: 'Dependable', text: 'Clear deliverables, honest timelines and data you can trust.' },
  { icon: Zap, title: 'Efficient', text: 'Fast on-site capture that minimises disruption to your operations.' },
  { icon: Users, title: 'Collaborative', text: 'Cloud-first delivery that keeps your whole team on the same model.' },
]

const founders = [
  {
    name: 'Yogiraj Surti',
    role: 'Co-Founder & Strategic Director',
    email: 'yogiraj@spconsultants.info',
  },
  {
    name: 'Vikas Patel',
    role: 'Co-Founder & Technical Director',
    email: 'vikas@spconsultants.info',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Transforming visions into reality."
        intro="SP Consultants is a reality-capture and Scan-to-BIM practice. We give architects, engineers, builders and owners a precise digital record of the built world — so better decisions get made, faster."
      />

      {/* Mission */}
      <section className={`${PAGE_X} py-20 border-b border-white/10`}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={100} duration={800}>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
              Too many projects still rely on outdated drawings and guesswork
              about existing conditions. We replace that uncertainty with
              accurate, measurable digital models — captured on site and
              delivered to your team in the cloud.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className={`${PAGE_X} py-24 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="What we value" title="How we work." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={120 + i * 100} duration={700}>
                <Card>
                  <v.icon size={26} className="mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-medium mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.text}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className={`${PAGE_X} py-24`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Leadership" title="The people behind SP Consultants." />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {founders.map((f, i) => (
              <FadeIn key={f.name} delay={120 + i * 120} duration={750}>
                <Card>
                  <div className="w-14 h-14 rounded-full liquid-glass border border-white/20 flex items-center justify-center text-xl font-light mb-5">
                    {f.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-medium">{f.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{f.role}</p>
                  <a
                    href={`mailto:${f.email}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {f.email}
                  </a>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
