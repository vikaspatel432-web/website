import { useEffect, useState } from 'react'
import { useTheme } from '../theme'

const TAG_WORDS = ['TRANSFORMING', 'VISIONS', 'INTO', 'REALITY']

/**
 * One-time brand intro: the SP monogram pops in and resolves into the
 * CONSULTANTS wordmark + tagline, then the overlay fades out to hand off to
 * the page beneath. Ported from the "SP Logo Intro" design.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const [leaving, setLeaving] = useState(false)

  const bg = dark ? '#0a1622' : '#f4f7f9'
  const primary = dark ? '#ffffff' : '#156082'
  const wm = primary
  const tag = dark ? '#bcd0db' : '#475157'
  const url = dark ? '#6f93a6' : '#8a97a0'

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduce ? 700 : 2300
    const t1 = setTimeout(() => setLeaving(true), hold)
    const t2 = setTimeout(onDone, hold + 650)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <div
      onClick={() => { setLeaving(true); setTimeout(onDone, 500) }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 36, padding: '40px',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.6s ease',
        cursor: 'pointer',
      }}
      aria-label="SP Consultants"
    >
      <div style={{ perspective: 1400 }}>
        <svg
          width="240" height="196" viewBox="0 0 440 360"
          style={{ display: 'block', overflow: 'visible', animation: 'sp-pop 0.95s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          <rect x="10" y="0" width="420" height="244" rx="30" fill={primary} />
          <rect x="10" y="238" width="205" height="122" rx="14" fill={primary} />
          <rect x="238" y="238" width="104" height="122" rx="14" fill={primary} />
          <rect x="108" y="102" width="214" height="32" rx="6" fill={bg} />
          <rect x="212" y="128" width="26" height="122" rx="4" fill={bg} />
          <rect x="4" y="236" width="112" height="30" rx="6" fill={bg} />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 26, letterSpacing: '0.16em', color: wm, opacity: 0, animation: 'sp-rise 0.6s ease 0.7s forwards' }}>
          CONSULTANTS
        </div>
        <div style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap', justifyContent: 'center', fontWeight: 600, fontSize: 14, letterSpacing: '0.34em' }}>
          {TAG_WORDS.map((w, i) => (
            <span key={w} style={{ color: tag, opacity: 0, animation: `sp-rise 0.55s ease ${0.85 + i * 0.1}s forwards` }}>{w}</span>
          ))}
        </div>
        <div style={{ fontWeight: 500, fontSize: 12.5, letterSpacing: '0.12em', color: url, marginTop: 4, opacity: 0, animation: 'sp-rise 0.6s ease 1.35s forwards' }}>
          www.spconsultants.info
        </div>
      </div>
    </div>
  )
}
