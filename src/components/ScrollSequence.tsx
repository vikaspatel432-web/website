import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const BuildingAssembly = lazy(() => import('./BuildingAssembly'))

const STAGES = [
  { at: 0.0, label: 'Substructure & frame', week: 'Weeks 1–14' },
  { at: 0.44, label: 'Envelope & partitions', week: 'Weeks 15–28' },
  { at: 0.67, label: 'MEP first fix', week: 'Weeks 29–40' },
  { at: 0.9, label: 'Handover model', week: 'Weeks 41–48' },
]

/**
 * Scroll-scrubbed 4D construction sequence: the page scroll drives the build
 * order of the model rather than a timer, so the programme is the story.
 */
export default function ScrollSequence() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [p, setP] = useState(0)
  const [reduced, setReduced] = useState(false)
  const [inView, setInView] = useState(false)

  // Only download/mount the 3D chunk once the section is close to the viewport,
  // so it never weighs on the initial page load.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setP(1)
      return
    }
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = wrapRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const scrollable = r.height - window.innerHeight
        if (scrollable <= 0) return
        setP(Math.min(1, Math.max(0, -r.top / scrollable)))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Map the scroll range onto the model's build cycle (stop just short of the
  // loop point so the finished building holds at the end instead of resetting).
  const modelProgress = p * 0.985
  const active = STAGES.reduce((acc, s, i) => (p >= s.at ? i : acc), 0)

  return (
    <div ref={wrapRef} className="relative" style={{ height: reduced ? 'auto' : '320vh' }}>
      <div className={reduced ? '' : 'sticky top-0 h-screen flex flex-col justify-center overflow-hidden'}>
        <div className="container-x w-full py-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
            <div>
              <p className="label-mono mb-2">4D sequencing</p>
              <h2 className="font-display text-2xl md:text-4xl font-semibold leading-tight">
                Scroll to build the programme.
              </h2>
            </div>
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-display font-semibold text-accent tabular-nums">
                {Math.round(p * 100)}%
              </div>
              <div className="label-mono opacity-70">{STAGES[active].week}</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${p * 100}%`, background: 'var(--accent)' }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {STAGES.map((s, i) => (
                <div
                  key={s.label}
                  className="transition-opacity duration-300"
                  style={{ opacity: i <= active ? 1 : 0.35 }}
                >
                  <div className="text-xs font-semibold" style={{ color: i === active ? 'var(--accent)' : undefined }}>
                    {s.label}
                  </div>
                  <div className="text-[11px] text-muted">{s.week}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-line" style={{ height: '52vh', minHeight: 300 }}>
            <Suspense fallback={<div className="w-full h-full" style={{ background: 'var(--surface-2)' }} />}>
              {inView ? (
                <BuildingAssembly progress={reduced ? 0.985 : modelProgress} />
              ) : (
                <div className="w-full h-full" style={{ background: 'var(--surface-2)' }} />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
