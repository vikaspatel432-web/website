import { useEffect, useRef, useState } from 'react'

/**
 * Autoplaying silent product clip. Falls back to a branded placeholder if the
 * file isn't present yet, so product pages hold their shape before the media
 * lands. Only plays while on screen, and holds a still frame under
 * prefers-reduced-motion.
 */
export default function ProductVideo({
  src,
  poster,
  label,
}: {
  src: string
  poster?: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className="relative overflow-hidden rounded-3xl border"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', aspectRatio: '16 / 9' }}
    >
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bp-grid">
          <div className="text-center px-6">
            <div className="rule mx-auto mb-5 w-16" />
            <p className="text-sm text-muted">{label}</p>
          </div>
        </div>
      ) : (
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* soft vignette so the clip sits into the dark page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 100% at 50% 0%, transparent 55%, color-mix(in srgb, var(--bg) 70%, transparent) 100%)' }}
      />
    </div>
  )
}
