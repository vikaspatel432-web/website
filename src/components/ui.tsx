import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import FadeIn from './FadeIn'
import AnimatedHeading from './AnimatedHeading'

/** Eyebrow + heading block for inner-page section intros. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string
  title: string
  intro?: string
  center?: boolean
}) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12`}>
      {eyebrow && (
        <Reveal>
          <p className="label-mono mb-3">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className="mt-5 text-muted text-base md:text-lg leading-relaxed">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Inner-page hero band with blueprint grid. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <section className="relative pt-36 md:pt-44 pb-16 overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-60" />
      <div
        className="absolute -top-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 60%)' }}
      />
      <div className="container-x relative">
        <FadeIn delay={80} duration={700}>
          <p className="label-mono mb-4">{eyebrow}</p>
        </FadeIn>
        <AnimatedHeading
          text={title}
          as="h1"
          initialDelay={150}
          className="h-display text-4xl md:text-6xl lg:text-7xl max-w-4xl"
        />
        {intro && (
          <FadeIn delay={600} duration={900}>
            <p className="mt-6 text-muted text-lg max-w-2xl leading-relaxed">{intro}</p>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

/** Closing call-to-action band. */
export function CTABand({
  title = 'Let’s make the model your single source of truth.',
  subtitle = 'Tell us about your project and we’ll recommend the right BIM and construction-technology approach.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="container-x py-24 md:py-32">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-3xl px-8 md:px-16 py-20 md:py-28 text-center border"
          style={{
            borderColor: 'var(--line)',
            background: 'linear-gradient(160deg, var(--surface) 0%, var(--bg) 70%)',
          }}
        >
          <div className="absolute inset-0 bp-grid opacity-40" />
          <div className="aura drift" style={{ width: 520, height: 520, top: '-45%', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="relative">
            <h2 className="display-lg max-w-3xl mx-auto">{title}</h2>
            <p className="mt-6 text-muted max-w-xl mx-auto leading-relaxed">{subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                viewTransition
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-medium text-white transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--accent)' }}
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link
                to="/projects"
                viewTransition
                className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 font-medium transition-colors hover:text-accent"
                style={{ borderColor: 'var(--line)' }}
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
