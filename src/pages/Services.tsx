import {
  ScanLine,
  Ruler,
  Box,
  Building2,
  MonitorPlay,
  Layers,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { PageHeader, Card, CTASection, PAGE_X } from '../components/ui'

const services = [
  {
    icon: ScanLine,
    title: '360° Laser Scanning',
    text: 'High-density interior and exterior scanning of existing structures. Using the Leica RTC360, we capture full sites quickly and contactlessly — ideal for occupied buildings, heritage assets and live construction.',
    points: ['Interior & exterior capture', 'Survey-grade accuracy', 'Minimal site disruption'],
  },
  {
    icon: Ruler,
    title: '2D CAD Layouts',
    text: 'Accurate 2D CAD drawings of existing structures generated directly from scan data — floor plans, elevations and sections that reflect true as-built conditions, not outdated records.',
    points: ['Plans, elevations & sections', 'As-built accuracy', 'CAD-ready deliverables'],
  },
  {
    icon: Box,
    title: '3D Point Cloud Generation',
    text: 'Registered and colourised point clouds that serve as a complete, measurable digital twin of the physical space — a single source of truth for design, coordination and verification.',
    points: ['Registered & colourised', 'Measurable digital record', 'Standard exchange formats'],
  },
  {
    icon: Building2,
    title: 'Point Cloud to BIM',
    text: 'Intelligent, parametric BIM models built from point cloud data to your required Level of Detail. Perfect for renovation, retrofit, facilities management and clash-free coordination.',
    points: ['Parametric BIM models', 'Defined Level of Detail (LOD)', 'Discipline-ready'],
  },
  {
    icon: MonitorPlay,
    title: 'Cloud BIM Viewer',
    text: 'A browser-based platform to access your models anywhere. Measure, section, explode and filter geometry, raise issues against objects, add markups and save shareable views — no CAD licence required.',
    points: ['Measure, section & filter', 'Issue tracking & markups', 'Shareable saved views'],
  },
  {
    icon: Layers,
    title: 'Specialist Capture',
    text: 'Stadiums, hotels, roads and pathways, industrial and heritage sites — wherever access is complex or accuracy is critical, we tailor the capture and modelling workflow to suit.',
    points: ['Large & complex sites', 'Infrastructure & interiors', 'Tailored workflows'],
  },
]

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Capture, model and deliver — with precision."
        intro="A complete reality-capture pipeline, from the first scan on site to an intelligent BIM model your whole team can work from in the cloud."
      />

      <section className={`${PAGE_X} py-20`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={120 + i * 100} duration={700}>
              <Card>
                <s.icon size={28} className="mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-medium mb-3">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  {s.text}
                </p>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="text-sm text-gray-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/60" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure what you need?"
        subtitle="Send us your drawings or a description of the site. We'll recommend the right level of scanning and BIM detail for your goals and budget."
      />
    </>
  )
}
