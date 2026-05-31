import { Link } from 'react-router-dom'
import AnimatedHeading from './AnimatedHeading'
import FadeIn from './FadeIn'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-screen background video — no overlay, plays raw */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Hero content pinned to the bottom of the viewport */}
      <div className="relative z-10 h-full px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          {/* Left column — main content */}
          <div>
            <AnimatedHeading
              text={'Transforming visions\ninto reality.'}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
              style={{ letterSpacing: '-0.04em' }}
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                We capture the built world with precision laser scanning and turn
                it into intelligent BIM models you can measure, explore and build
                from.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100"
                >
                  Get in Touch
                </Link>
                <Link
                  to="/services"
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-white hover:text-black"
                >
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right column — tag */}
          <div className="mt-8 lg:mt-0 flex items-end justify-start lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light">
                  Scan. Model. Visualize.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
