import { useEffect, useRef } from 'react'

const LETTERS = 'CONSULTANTS'.split('')

// Official SP monogram outline (single evenodd path), viewBox 0 0 520 434.
const LOGO_PATH =
  'M22.5,4.7 L498.7,3.5 L511.7,11.8 L516.5,21.3 L516.5,264.7 L511.7,274.2 L503.5,280.1 L403,281.3 L403,416 L394.7,426.6 L390,429 L295.5,429 L287.2,423.1 L282.5,411.3 L282.5,177.3 L284.8,174.9 L284.8,170.2 L293.1,161.9 L297.8,161.9 L300.2,159.5 L394.7,159.5 L394.7,126.5 L127.6,126.5 L127.6,159.5 L238.7,159.5 L248.2,164.3 L254.1,172.5 L254.1,418.4 L243.5,429 L16.5,429 L5.9,418.4 L5.9,411.3 L3.5,408.9 L3.5,328.5 L8.3,316.7 L11.8,313.2 L21.3,308.5 L135.9,307.3 L134.7,280.1 L16.5,280.1 L5.9,269.5 L5.9,262.4 L3.5,260 L3.5,179.6 L5.9,177.3 L3.5,172.5 L3.5,26 L5.9,23.6 L5.9,16.5 L14.2,8.3 L21.3,5.9 Z'

/**
 * SP Motion Identity intro (ported from the design). The logo self-draws,
 * fills, liquid-morphs, the wordmark + tagline reveal, then the dark stage
 * dissolves to hand off to the site beneath. Full reveal · premium feel.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const q = <T extends Element>(s: string) => root.querySelector(s) as T | null
    const line = q<SVGPathElement>('[data-part=line]')
    const fill = q<SVGPathElement>('[data-part=fill]')
    const icon = q<HTMLElement>('[data-part=icon]')
    const turb = q<SVGElement>('[data-part=turb]')
    const disp = q<SVGElement>('[data-part=disp]')
    const tag = q<HTMLElement>('[data-part=tag]')
    const stage = q<HTMLElement>('[data-part=stage]')
    const ltr = [...root.querySelectorAll<HTMLElement>('[data-part=ltr]')]
    if (!line || !fill || !icon || !turb || !disp || !tag || !stage) return

    const cl = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
    const oc = (t: number) => 1 - Math.pow(1 - t, 3)
    const ob = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) }
    const amp = 13, ov = 1.02
    const P = {
      sDelay: 120, draw: 1180, fillS: 1000, fillD: 560, lineOutS: 1340,
      morphS: 1020, morphD: 1280, wordS: 1780, wordStep: 55, wordD: 380,
      tagS: 2640, finalS: 2500, finalD: 560, handoffS: 3300, handoffD: 850, total: 4200,
    }

    const frame = (el: number, stat: boolean) => {
      const dp = oc(cl((el - P.sDelay) / P.draw))
      line.style.strokeDashoffset = stat ? '0' : String(100 * (1 - dp))
      const fp = oc(cl((el - P.fillS) / P.fillD))
      fill.style.fillOpacity = stat ? '1' : String(fp)
      line.style.opacity = stat ? '0' : String(1 - cl((el - P.lineOutS) / 300))
      const mp = cl((el - P.morphS) / P.morphD)
      const d = stat ? 0 : Math.sin(mp * Math.PI) * amp
      disp.setAttribute('scale', d.toFixed(2))
      if (!stat) turb.setAttribute('baseFrequency', `${(0.011 + 0.005 * Math.sin(el / 520)).toFixed(4)} 0.02`)
      ltr.forEach((n, i) => {
        const wp = stat ? 1 : oc(cl((el - P.wordS - i * P.wordStep) / P.wordD))
        n.style.opacity = String(wp)
        n.style.transform = `translateY(${(1 - wp) * 14}px)`
      })
      tag.style.opacity = String((stat ? 1 : oc(cl((el - P.tagS) / 400))) * 0.9)
      let sc = stat ? 1 : 0.97 + 0.03 * cl(el / 1100)
      if (!stat && el > P.finalS) sc *= 1 + (ov - 1) * ob(cl((el - P.finalS) / P.finalD))
      icon.style.transform = `scale(${sc.toFixed(4)})`
      if (!stat) {
        const ho = oc(cl((el - P.handoffS) / P.handoffD))
        stage.style.opacity = (1 - ho).toFixed(3)
        stage.style.pointerEvents = ho > 0.6 ? 'none' : 'auto'
      }
    }

    document.body.style.overflow = 'hidden'
    let raf = 0
    let finished = false
    const finish = () => { if (finished) return; finished = true; document.body.style.overflow = ''; onDone() }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      frame(1e9, true)
      stage.style.transition = 'opacity .6s ease'
      const t1 = setTimeout(() => { stage.style.opacity = '0'; stage.style.pointerEvents = 'none' }, 700)
      const t2 = setTimeout(finish, 1400)
      return () => { clearTimeout(t1); clearTimeout(t2); cancelAnimationFrame(raf); document.body.style.overflow = '' }
    }

    const t0 = performance.now()
    const tick = () => {
      const el = performance.now() - t0
      frame(el, false)
      if (el >= P.total) finish()
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // click to skip
    const onClick = () => {
      cancelAnimationFrame(raf)
      stage.style.transition = 'opacity .4s ease'
      stage.style.opacity = '0'
      stage.style.pointerEvents = 'none'
      setTimeout(finish, 420)
    }
    root.addEventListener('click', onClick)

    return () => { cancelAnimationFrame(raf); root.removeEventListener('click', onClick); document.body.style.overflow = '' }
  }, [onDone])

  return (
    <div ref={rootRef} style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
      <div
        data-part="stage"
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 34, background: '#0a0e12', cursor: 'pointer',
        }}
        aria-label="SP Consultants"
      >
        <div data-part="icon" style={{ transform: 'scale(0.97)', transformOrigin: 'center', willChange: 'transform' }}>
          <svg width="296" height="247" viewBox="0 0 520 434" style={{ display: 'block', overflow: 'visible' }}>
            <defs>
              <filter id="sp-liquid" x="-30%" y="-30%" width="160%" height="160%">
                <feTurbulence data-part="turb" type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={2} seed={7} result="n" />
                <feDisplacementMap data-part="disp" in="SourceGraphic" in2="n" scale={0} xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <g filter="url(#sp-liquid)">
              <path data-part="fill" fill="#ffffff" fillRule="evenodd" fillOpacity={0} stroke="none" d={LOGO_PATH} />
              <path
                data-part="line" pathLength={100} fill="none" stroke="#ffffff" strokeWidth={3.5}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                d={LOGO_PATH}
              />
            </g>
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
          <div style={{ display: 'flex', gap: '0.02em' }}>
            {LETTERS.map((ch, i) => (
              <span
                key={i}
                data-part="ltr"
                style={{ opacity: 0, display: 'inline-block', transform: 'translateY(14px)', fontWeight: 700, fontSize: 23, letterSpacing: '0.36em', color: '#e8eff3' }}
              >
                {ch}
              </span>
            ))}
          </div>
          <div data-part="tag" style={{ opacity: 0, fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', wordSpacing: '0.45em', color: '#7d8f9a' }}>
            TRANSFORMING VISIONS INTO REALITY
          </div>
        </div>
      </div>
    </div>
  )
}
