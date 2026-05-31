import {
  Ruler,
  Scissors,
  Boxes,
  Filter,
  MessageSquare,
  Bookmark,
  PenTool,
  Camera,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { PageHeader, Card, SectionHeading, CTASection, PAGE_X } from '../components/ui'

const viewerFeatures = [
  { icon: Ruler, title: 'Measure', text: 'Take quick, accurate measurements directly in the 3D view.' },
  { icon: Scissors, title: 'Sectioning', text: 'Slice through the model with a section box to inspect interior geometry.' },
  { icon: Boxes, title: 'Explode Model', text: 'Separate components to understand how the structure fits together.' },
  { icon: Camera, title: 'Camera Controls', text: 'Snap to standard views, fit to selection, and orbit a full 360°.' },
  { icon: Filter, title: 'Filter by Property', text: 'Find and colour-code objects by category, level, tag or any parameter.' },
  { icon: MessageSquare, title: 'Issues', text: 'Raise issues against objects, assign owners, set priorities and track progress.' },
  { icon: Bookmark, title: 'Saved Views', text: 'Capture camera, visibility and filters into shareable saved views.' },
  { icon: PenTool, title: 'Markups', text: 'Sketch, add shapes and write notes directly on the model.' },
]

export default function Technology() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Best-in-class hardware. Effortless cloud access."
        intro="We pair survey-grade scanning hardware with a collaborative cloud BIM platform, so the data we capture stays accurate — and stays in your hands."
      />

      {/* Hardware */}
      <section className={`${PAGE_X} py-20 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:items-center">
          <FadeIn delay={100} duration={800}>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">
                Scanning Hardware
              </p>
              <h2
                className="text-3xl md:text-4xl font-normal mb-5"
                style={{ letterSpacing: '-0.03em' }}
              >
                Leica RTC360 3D Laser Scanner
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The RTC360 is one of the fastest, most accurate terrestrial laser
                scanners available. It captures up to two million points per
                second and automatically registers scans in the field — letting
                us cover large, complex sites in a single visit without
                compromising on precision.
              </p>
              <ul className="space-y-3">
                {[
                  'Survey-grade, millimetre accuracy',
                  'High-speed capture of full sites',
                  'Colourised, photo-textured point clouds',
                  'Contactless — ideal for live or occupied sites',
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3 text-gray-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={300} duration={900}>
            <Card className="aspect-[4/3] flex flex-col justify-center items-center text-center">
              <Camera size={48} strokeWidth={1} className="mb-5 text-white/80" />
              <p className="text-lg font-light">Reality capture at</p>
              <p className="text-4xl md:text-5xl font-light my-1">2,000,000</p>
              <p className="text-sm text-gray-400">points per second</p>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* BIM Viewer platform */}
      <section className={`${PAGE_X} py-24`}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="The BIM Platform"
            title="Your models, live in the browser."
          />
          <p className="text-gray-300 max-w-2xl mb-12 leading-relaxed -mt-6">
            Every project is delivered through our secure cloud BIM viewer. Invite
            your team, open the model on any device, and work together — no CAD
            software, no heavy downloads.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {viewerFeatures.map((f, i) => (
              <FadeIn key={f.title} delay={120 + i * 80} duration={650}>
                <Card>
                  <f.icon size={24} className="mb-4" strokeWidth={1.5} />
                  <h3 className="text-base font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {f.text}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want a tour of the BIM viewer?"
        subtitle="We'll walk you through the platform with a sample model and show how your team would collaborate on a live project."
      />
    </>
  )
}
