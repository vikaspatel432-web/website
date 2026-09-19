import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AnimatedHeading from './AnimatedHeading'
import FadeIn from './FadeIn'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null)
  const mediaRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  // Interactive pointer spotlight over the hero
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  // Scroll-linked parallax: the media drifts and scales while the copy rises
  // and fades, so the hero hands off to the page instead of just scrolling away.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const h = window.innerHeight
        const p = Math.min(1, Math.max(0, window.scrollY / h))
        if (mediaRef.current) {
          mediaRef.current.style.transform = `translate3d(0, ${p * 12}%, 0) scale(${1 + p * 0.12})`
        }
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${-p * 40}px, 0)`
          contentRef.current.style.opacity = String(1 - p * 1.15)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Full-screen background video (parallax layer) */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      {/* Subtle bottom scrim so text stays legible over any video frame */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      {/* Interactive spotlight */}
      <div
        className="absolute inset-0 opacity-60 transition-opacity"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), rgba(62,160,201,0.18), transparent 70%)',
        }}
      />

      {/* Content pinned to bottom */}
      <div ref={contentRef} className="relative z-10 h-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto flex flex-col justify-end pb-14 lg:pb-20 will-change-transform">
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
          {/* Left */}
          <div>
            <FadeIn delay={100} duration={800}>
              <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ea0c9] animate-pulse" />
                BIM Consultancy · AEC Technology
              </span>
            </FadeIn>

            <AnimatedHeading
              text={'Transforming visions\ninto reality.'}
              className="h-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 mb-4"
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-white/80 mb-7 max-w-xl">
                We make the BIM model your project’s single source of truth — from
                multi-discipline modelling and clash detection to 4D/5D
                simulation, reality capture and live analytics.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3 font-medium transition-transform hover:-translate-y-0.5"
                >
                  Start a Project <ArrowRight size={18} />
                </Link>
                <Link
                  to="/services"
                  className="liquid-glass rounded-full text-white px-8 py-3 font-medium transition-colors hover:bg-white/10"
                >
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right — glass tag */}
          <div className="mt-8 lg:mt-0 flex items-end lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass rounded-2xl px-6 py-4">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  BIM. Simulation. Reality Capture.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
