import { Link } from 'react-router-dom'
import {
  ScanLine,
  Box,
  Building2,
  MonitorPlay,
  ArrowRight,
} from 'lucide-react'
import Hero from '../components/Hero'
import FadeIn from '../components/FadeIn'
import { Card, SectionHeading, CTASection, PAGE_X } from '../components/ui'

const services = [
  {
    icon: ScanLine,
    title: '360° Laser Scanning',
    text: 'Millimetre-accurate interior and exterior capture of existing structures using the Leica RTC360.',
  },
  {
    icon: Box,
    title: '3D Point Clouds',
    text: 'Registered, colourised point clouds that form a precise digital record of as-built conditions.',
  },
  {
    icon: Building2,
    title: 'Point Cloud to BIM',
    text: 'Intelligent, parametric BIM models built from scan data — ready for design, retrofit and FM.',
  },
  {
    icon: MonitorPlay,
    title: 'Cloud BIM Viewer',
    text: 'Review, measure, section and mark up your models from any browser, with no software to install.',
  },
]

const stats = [
  { value: 'mm', label: 'Survey-grade accuracy' },
  { value: '360°', label: 'Full interior & exterior capture' },
  { value: 'Cloud', label: 'Browser-based BIM access' },
  { value: 'Global', label: 'Projects across UK & India' },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Intro / what we do */}
      <section className={`${PAGE_X} py-24 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:items-center">
          <FadeIn delay={100} duration={800}>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">
                Reality Capture &amp; Scan-to-BIM
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                The world as it really is — measured, modelled and made useful.
              </h2>
              <p className="text-gray-300 leading-relaxed">
                SP Consultants turns physical spaces into accurate digital
                assets. From a single room to an entire stadium, we scan
                existing conditions and deliver clean point clouds, 2D CAD
                layouts and intelligent BIM models your whole team can rely on.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={300} duration={900}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <Card key={s.label} className="!p-6">
                  <div className="text-3xl md:text-4xl font-light mb-2">
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-400 leading-snug">
                    {s.label}
                  </div>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services overview */}
      <section className={`${PAGE_X} py-24 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="What we do"
            title="End-to-end reality capture services."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={150 + i * 120} duration={700}>
                <Card>
                  <s.icon size={26} className="mb-5 text-white" strokeWidth={1.5} />
                  <h3 className="text-lg font-medium mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {s.text}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              Explore all services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={`${PAGE_X} py-24 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="How it works" title="From site to BIM in four steps." />
          <div className="grid md:grid-cols-4 gap-5">
            {[
              ['01', 'Scan on site', 'We capture the space with the Leica RTC360 — fast, contactless and survey-grade.'],
              ['02', 'Register & process', 'Scans are aligned into a single, colourised point cloud of the structure.'],
              ['03', 'Model to BIM', 'We build accurate 2D CAD and parametric BIM models from the cloud.'],
              ['04', 'Review in the cloud', 'You explore, measure and mark up everything in our online BIM viewer.'],
            ].map(([num, title, text], i) => (
              <FadeIn key={num} delay={150 + i * 120} duration={700}>
                <Card>
                  <div className="text-sm text-gray-500 mb-4">{num}</div>
                  <h3 className="text-lg font-medium mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
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
