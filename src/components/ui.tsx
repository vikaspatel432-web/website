import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import FadeIn from './FadeIn'

/** Standard horizontal page padding used across the site. */
export const PAGE_X = 'px-6 md:px-12 lg:px-16'

/** Inner-page header with eyebrow, title and intro paragraph. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <section className={`${PAGE_X} pt-36 md:pt-44 pb-16 border-b border-white/10`}>
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={100} duration={700}>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">
            {eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={200} duration={800}>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal"
            style={{ letterSpacing: '-0.04em' }}
          >
            {title}
          </h1>
        </FadeIn>
        {intro && (
          <FadeIn delay={400} duration={900}>
            <p className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
              {intro}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

/** Section heading used inside content pages. */
export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl font-normal"
        style={{ letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
    </div>
  )
}

/** Liquid-glass content card. */
export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`liquid-glass border border-white/10 rounded-2xl p-7 h-full ${className}`}
    >
      {children}
    </div>
  )
}

/** Closing call-to-action band reused at the bottom of pages. */
export function CTASection({
  title = 'Ready to digitise your project?',
  subtitle = 'Tell us about the structure you need captured — we will recommend the right scanning and BIM approach.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className={`${PAGE_X} py-24`}>
      <div className="max-w-5xl mx-auto liquid-glass border border-white/20 rounded-3xl px-8 md:px-14 py-16 text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-normal mb-5"
          style={{ letterSpacing: '-0.03em' }}
        >
          {title}
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-black px-8 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100"
          >
            Get in Touch
          </Link>
          <Link
            to="/projects"
            className="border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-white hover:text-black"
          >
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  )
}
