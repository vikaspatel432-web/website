import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTheme } from '../theme'

/* Ported from the "Explore Service" Claude design (CSS-3D). Cycles through the
   service stack: a 2D plan draws, extrudes into a federated BIM model, then
   walkthrough / scan / inspect / dashboards / collaboration. Theme-aware and
   draggable to orbit. */

interface GeoItem {
  id: string
  x: number; y: number; z: number
  w: number; h: number; d: number
  layer: 'struct' | 'arch' | 'mep'
  base: string
  kind: string
  round?: boolean
  order: number
}

const SCENES = [
  { num: '01', name: 'BIM Consultancy', dur: 4600 },
  { num: '02', name: '2D & 3D Layout Planning', dur: 6200 },
  { num: '03', name: '360° Walkthroughs', dur: 5200 },
  { num: '04', name: 'Laser Scanning', dur: 4800 },
  { num: '05', name: 'Construction Management', dur: 6000 },
  { num: '06', name: '4D & 5D Simulations', dur: 5200 },
  { num: '07', name: 'Data Analytics', dur: 6000 },
  { num: '08', name: 'Live Collaboration', dur: 8000 },
]

function buildGeo(): GeoItem[] {
  const X = [-220, 0, 220], Z = [-165, 0, 165]
  const g: GeoItem[] = []
  let o = 0
  for (let xi = 0; xi < 3; xi++) for (let zi = 0; zi < 3; zi++) g.push({ id: 'c' + xi + zi, x: X[xi], y: -75, z: Z[zi], w: 40, h: 150, d: 40, layer: 'struct', base: '#b4b7ba', kind: 'col', order: o++ })
  for (let zi = 0; zi < 3; zi++) g.push({ id: 'bx' + zi, x: 0, y: -160, z: Z[zi], w: 498, h: 20, d: 18, layer: 'struct', base: '#a8acb0', kind: 'beam', order: o++ })
  for (let xi = 0; xi < 3; xi++) g.push({ id: 'bz' + xi, x: X[xi], y: -160, z: 0, w: 18, h: 20, d: 378, layer: 'struct', base: '#a8acb0', kind: 'beam', order: o++ })
  g.push({ id: 'slab', x: 0, y: 8, z: 0, w: 560, h: 12, d: 440, layer: 'arch', base: '#8fb0cc', kind: 'slab', order: o++ })
  g.push({ id: 'wallb', x: 0, y: -80, z: -200, w: 520, h: 148, d: 8, layer: 'arch', base: '#8fb0cc', kind: 'wall', order: o++ })
  g.push({ id: 'walll', x: -250, y: -80, z: 0, w: 8, h: 148, d: 392, layer: 'arch', base: '#8fb0cc', kind: 'wall', order: o++ })
  g.push({ id: 'duct1', x: -30, y: -138, z: 70, w: 380, h: 22, d: 36, layer: 'mep', base: '#c6ccd2', kind: 'duct', order: o++ })
  g.push({ id: 'duct2', x: 130, y: -140, z: -30, w: 26, h: 16, d: 240, layer: 'mep', base: '#c6ccd2', kind: 'duct', order: o++ })
  g.push({ id: 'pipe1', x: -30, y: -120, z: -95, w: 340, h: 14, d: 14, layer: 'mep', base: '#c2a06f', round: true, kind: 'pipe', order: o++ })
  g.push({ id: 'pipe2', x: 75, y: -120, z: 110, w: 14, h: 14, d: 300, layer: 'mep', base: '#c2a06f', round: true, kind: 'pipe', order: o++ })
  return g
}

const hx = (v: number) => { v = Math.max(0, Math.min(255, Math.round(v))); return v.toString(16).padStart(2, '0') }
const rgb = (h: string): [number, number, number] => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const shade = (h: string, m: number) => { const [r, g, b] = rgb(h); const f = (v: number) => (m <= 1 ? v * m : v + (255 - v) * (m - 1)); return '#' + hx(f(r)) + hx(f(g)) + hx(f(b)) }

function specFor(id: string, geo: GeoItem[]) {
  const s = geo.find((g) => g.id === id)
  const k = s?.kind
  if (k === 'col') return { label: 'COLUMN · C-11', specs: [['Section', '400 × 400 mm'], ['Height', '3.60 m'], ['Material', 'C40/50'], ['Rebar', '8 T20'], ['Fire rating', '120 min'], ['Status', 'Coordinated']] }
  if (k === 'beam') return { label: 'BEAM · B-' + id.slice(-2), specs: [['Section', 'UB 533×210'], ['Span', '6.40 m'], ['Grade', 'S355'], ['Camber', '12 mm'], ['Status', 'Coordinated']] }
  if (k === 'slab') return { label: 'SLAB · L02', specs: [['Thickness', '250 mm'], ['Area', '246 m²'], ['Material', 'C32/40'], ['Status', 'Coordinated']] }
  if (k === 'wall') return { label: 'WALL · EXT', specs: [['Type', 'Cavity 300'], ['U-value', '0.18 W/m²K'], ['Height', '3.45 m'], ['Status', 'Coordinated']] }
  if (k === 'duct') return { label: 'HVAC DUCT', specs: [['Size', '600 × 400'], ['Flow', '1.2 m³/s'], ['Material', 'Galv. steel'], ['Status', 'Coordinated']] }
  if (k === 'pipe') return { label: 'PIPE · CHW', specs: [['Diameter', 'DN 100'], ['Medium', 'Chilled water'], ['Status', 'Coordinated']] }
  return { label: 'ELEMENT', specs: [['Status', 'Coordinated']] }
}

export default function ServicesHero() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const accent = dark ? '#3ea0c9' : '#156082'

  const worldRef = useRef<HTMLDivElement | null>(null)
  const geo = useRef<GeoItem[]>(buildGeo())

  const [chapter, setChapter] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [, force] = useState(0)

  const rot = useRef({ x: -54, y: -33 })
  const clock = useRef(0)
  const last = useRef<number | null>(null)
  const drag = useRef(false)
  const moved = useRef(false)
  const ptr = useRef({ x: 0, y: 0 })
  const chapterRef = useRef(0)
  const playingRef = useRef(true)
  const raf = useRef(0)

  useEffect(() => { chapterRef.current = chapter }, [chapter])
  useEffect(() => { playingRef.current = playing }, [playing])

  const applyWorld = () => {
    if (worldRef.current)
      worldRef.current.style.transform = `translate(-50%,-50%) translateY(-20px) scale(0.62) rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`
  }

  useEffect(() => {
    applyWorld()
    const loop = (ts: number) => {
      if (last.current == null) last.current = ts
      const dt = Math.min(64, ts - last.current)
      last.current = ts
      const c = chapterRef.current
      if (!drag.current && playingRef.current) {
        rot.current.y += (c === 2 ? 0.2 : 0.04) * (dt / 16.67)
        clock.current += dt
        if (clock.current > SCENES[c].dur) {
          clock.current = 0
          const next = (c + 1) % SCENES.length
          setSelected(next === 3 ? 'c11' : null)
          setChapter(next)
        } else if (c === 1 || c === 4 || c === 7) {
          force((n) => n + 1)
        }
      }
      applyWorld()
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDown = (e: React.PointerEvent) => { drag.current = true; moved.current = false; ptr.current = { x: e.clientX, y: e.clientY } }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const dx = e.clientX - ptr.current.x, dy = e.clientY - ptr.current.y
    if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true
    rot.current.y += dx * 0.3
    rot.current.x = Math.max(-80, Math.min(-24, rot.current.x - dy * 0.18))
    ptr.current = { x: e.clientX, y: e.clientY }
    applyWorld()
  }
  const onUp = () => { drag.current = false }
  const onCanvasClick = () => { if (!moved.current) setSelected(null) }
  const pick = (id: string) => (e: React.MouseEvent) => { e.stopPropagation(); if (!moved.current) setSelected(id) }

  const jump = (i: number) => { clock.current = 0; setSelected(i === 3 ? 'c11' : null); setChapter(i) }

  // ---- derived ----
  const c = chapter
  const built = c >= 1
  const shadeProg = c === 0 ? 0 : c === 1 ? Math.min(1, clock.current / 4200) : 1
  const clickable = c >= 3 && c !== 7
  const total = geo.current.length
  const sp = specFor(selected || 'c11', geo.current)
  const planShown = c <= 1
  const scanShown = c === 3
  const propsShown = !!selected && c !== 7
  const dashShown = c === 5 || c === 6
  const collabShown = c === 7
  const showComment = c === 7 && clock.current > 500
  const showReply = c === 7 && clock.current > 3000
  const showResolved = c === 7 && clock.current > 5400

  const lineFor = (layer: string) => (layer === 'mep' ? 'rgba(150,110,55,0.9)' : layer === 'arch' ? 'rgba(64,110,160,0.8)' : 'rgba(40,66,92,0.75)')

  const faceStyle = (s: GeoItem, mult: number, shaded: boolean, hl: boolean): CSSProperties => {
    const st: CSSProperties = { position: 'absolute', left: '50%', top: '50%', boxSizing: 'border-box', transition: 'background .5s ease, border-color .5s ease' }
    if (hl) { st.background = `rgba(${rgb(accent).join(',')},${(0.34 * mult).toFixed(3)})`; st.border = `1px solid ${accent}` }
    else if (!shaded) { st.background = dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)'; st.border = '1px solid ' + lineFor(s.layer) }
    else if (s.layer === 'arch') { st.background = `rgba(120,158,194,${(0.14 * mult).toFixed(3)})`; st.border = '1px solid rgba(86,132,176,0.4)' }
    else { st.background = shade(s.base, mult); st.border = `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(18,26,34,0.06)'}` }
    if (s.round) st.borderRadius = '42%'
    return st
  }

  const box = (s: GeoItem) => {
    const shaded = s.order / total <= shadeProg
    const hl = s.id === selected
    const defs: [string, number, number, number][] = [
      [`rotateY(0deg) translateZ(${s.d / 2}px)`, s.w, s.h, 0.9],
      [`rotateY(180deg) translateZ(${s.d / 2}px)`, s.w, s.h, 0.82],
      [`rotateY(90deg) translateZ(${s.w / 2}px)`, s.d, s.h, 0.97],
      [`rotateY(-90deg) translateZ(${s.w / 2}px)`, s.d, s.h, 0.8],
      [`rotateX(90deg) translateZ(${s.h / 2}px)`, s.w, s.d, 1.15],
      [`rotateX(-90deg) translateZ(${s.h / 2}px)`, s.w, s.d, 0.62],
    ]
    const wrap: CSSProperties = {
      position: 'absolute', left: '50%', top: '50%', width: 0, height: 0,
      transformStyle: 'preserve-3d',
      transition: 'transform .8s cubic-bezier(.22,.61,.36,1), opacity .55s, filter .4s',
      transform: `translate3d(${s.x}px,${built ? s.y : s.y + 80}px,${s.z}px)`,
      opacity: built ? 1 : 0,
      cursor: clickable ? 'pointer' : 'inherit',
      filter: hl ? `drop-shadow(0 0 16px rgba(${rgb(accent).join(',')},0.6))` : undefined,
    }
    return (
      <div key={s.id} style={wrap} onClick={clickable ? pick(s.id) : undefined}>
        {defs.map((f, i) => {
          const fs = faceStyle(s, f[3], shaded, hl)
          fs.width = f[1] + 'px'; fs.height = f[2] + 'px'
          fs.transform = `translate(-50%,-50%) ${f[0]}`
          return <div key={i} style={fs} />
        })}
      </div>
    )
  }

  const sceneBg = dark
    ? 'radial-gradient(120% 90% at 64% 32%,#11212f 0%,#0c1825 55%,#081019 100%)'
    : 'radial-gradient(120% 90% at 64% 32%,#f5f6f4 0%,#e8eae7 55%,#dadcd8 100%)'
  const gridLine = dark ? 'rgba(130,180,215,0.10)' : 'rgba(40,62,84,0.07)'
  const floorTint = dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.16)'

  return (
    <div className="relative w-full h-[72vh] min-h-[500px] overflow-hidden select-none" style={{ background: sceneBg }}>
      {/* 3D canvas */}
      <div
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
        onClick={onCanvasClick}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ perspective: '1700px', perspectiveOrigin: '50% 42%', touchAction: 'none' }}
      >
        <div ref={worldRef} style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transformStyle: 'preserve-3d' }}>
          {/* floor grid */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 1100, height: 820, transform: 'translate(-50%,-50%) rotateX(90deg)', backgroundImage: `linear-gradient(${gridLine} 1px,transparent 1px),linear-gradient(90deg,${gridLine} 1px,transparent 1px)`, backgroundSize: '55px 55px', backgroundColor: floorTint }} />

          {/* 2D plan */}
          {planShown && (
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 1000, height: 760, transform: 'translate(-50%,-50%) rotateX(90deg) translateZ(-2px)' }}>
              <svg viewBox="0 0 1000 760" width="1000" height="760" style={{ overflow: 'visible' }}>
                <g fill="none" stroke="#36659c" strokeWidth="2.4" strokeDasharray="1600" strokeDashoffset="1600" style={{ animation: 'draw2d 2.2s ease forwards' }}>
                  <rect x="120" y="110" width="760" height="540" />
                  <line x1="120" y1="290" x2="880" y2="290" />
                  <line x1="120" y1="470" x2="880" y2="470" />
                  <line x1="373" y1="110" x2="373" y2="650" />
                  <line x1="626" y1="110" x2="626" y2="650" />
                </g>
                <text x="120" y="92" fill="#36659c" fontFamily="ui-monospace,Menlo,monospace" fontSize="15" letterSpacing="3">PLAN · LEVEL 02 · 1:100</text>
              </svg>
            </div>
          )}

          {geo.current.map(box)}

          {/* laser scan sweep */}
          {scanShown && (
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 760, height: 30, animation: 'scanSweep 2.6s ease-in-out infinite alternate', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 760, height: 560, transform: 'translate(-50%,-50%) rotateX(90deg)', background: 'radial-gradient(circle at center,rgba(64,196,210,0.20),rgba(64,196,210,0.03) 70%)', border: '1px solid rgba(64,196,210,0.85)', boxShadow: '0 0 34px rgba(64,196,210,0.45)', backgroundImage: 'radial-gradient(rgba(64,196,210,0.65) 1.2px,transparent 1.3px)', backgroundSize: '26px 26px' }} />
            </div>
          )}
        </div>

        {/* multi cursors */}
        {collabShown && (
          <div className="absolute inset-0 z-[5] pointer-events-none">
            {[['Priya', '#2f6db0', 'curA 11s'], ['Marco', '#c98a2f', 'curB 13s'], ['Dana', '#3f8f5e', 'curC 14.5s']].map(([nm, col, an]) => (
              <div key={nm} style={{ position: 'absolute', left: 0, top: 0, animation: `${an} ease-in-out infinite` }}>
                <svg width="22" height="22" viewBox="0 0 20 20"><path d="M2 2 L2 16 L6 12 L9 18 L11 17 L8 11 L14 11 Z" fill={col} stroke="#fff" strokeWidth="1" /></svg>
                <div style={{ background: col, color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, marginTop: 2, whiteSpace: 'nowrap' }}>{nm}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* properties panel */}
      {propsShown && (
        <div className="absolute right-5 md:right-10 top-24 w-64 card glass !rounded-md p-4 z-[7] shadow-xl" style={{ animation: 'popIn .3s ease' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: accent }} />
            <span className="font-mono text-[11px] tracking-wider font-bold text-muted">{sp.label}</span>
          </div>
          {sp.specs.map(([k, v]) => (
            <div key={k} className="flex justify-between items-baseline py-1.5 border-t border-line text-[12.5px]">
              <span className="text-muted">{k}</span>
              <span className="font-semibold font-mono text-[12px] text-ink">{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* analytics dashboard */}
      {dashShown && (
        <div className="absolute right-5 md:right-10 top-24 w-[300px] flex flex-col gap-3 z-[7]" style={{ animation: 'fadeUp .5s ease' }}>
          <div className="flex gap-3">
            {[['SCHEDULE · 4D', 'D-312', 'of 540'], ['COST · 5D', '$42.8M', '+2.1%']].map(([l, v, s]) => (
              <div key={l} className="flex-1 card glass p-3.5">
                <div className="font-mono text-[9.5px] tracking-wider font-bold text-muted">{l}</div>
                <div className="flex items-baseline gap-1.5 mt-1.5 whitespace-nowrap">
                  <span className="text-xl font-bold tracking-tight text-ink">{v}</span>
                  <span className="text-[11px] font-semibold text-muted">{s}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="card glass p-4 flex items-center gap-4">
            <svg width="64" height="64" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--line)" strokeWidth="9" />
              <circle cx="40" cy="40" r="32" fill="none" stroke={accent} strokeWidth="9" strokeLinecap="round" strokeDasharray="201" strokeDashoffset={(201 * 0.04).toFixed(1)} transform="rotate(-90 40 40)" />
            </svg>
            <div>
              <div className="font-mono text-[9.5px] tracking-wider font-bold text-muted">CLASH DETECTION</div>
              <div className="text-2xl font-bold tracking-tight mt-0.5 text-ink">96<span className="text-sm">%</span> <span className="text-[13px] font-semibold text-muted">resolved</span></div>
              <div className="text-[11.5px] text-muted mt-0.5">238 of 248 clashes cleared</div>
            </div>
          </div>
          <div className="card glass p-4">
            <div className="font-mono text-[9.5px] tracking-wider font-bold text-muted mb-3">QUANTITIES BY TRADE</div>
            {[['Concrete', '1,840 m³', '92%', '#2f6db0'], ['Rebar', '218 t', '64%', '#3f8f5e'], ['Ducting', '1,260 m', '78%', '#c98a2f'], ['Piping', '940 m', '52%', '#7a6cc4']].map(([l, val, pct, col]) => (
              <div key={l} className="grid grid-cols-[70px_1fr_56px] gap-2 items-center mb-2">
                <span className="text-[12px] text-muted">{l}</span>
                <span className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}><span className="block h-full rounded-full" style={{ width: pct, background: col }} /></span>
                <span className="text-[11.5px] font-mono font-semibold text-right text-ink">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* collaboration thread */}
      {collabShown && (
        <div className="absolute right-5 md:right-10 top-24 w-[300px] card glass !rounded-md overflow-hidden z-[7] shadow-xl" style={{ animation: 'fadeUp .5s ease' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-line">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[#c98a2f]" /><span className="font-mono text-[11px] font-bold tracking-wider text-muted">BEAM · B-12</span></div>
            <span className="text-[10.5px] font-bold tracking-wide px-2.5 py-0.5 rounded-full transition-all" style={showResolved ? { background: 'rgba(63,143,94,0.16)', color: '#3f8f5e' } : { background: 'rgba(201,138,47,0.16)', color: '#c98a2f' }}>{showResolved ? 'RESOLVED' : 'OPEN'}</span>
          </div>
          <div className="px-4 py-3.5 flex flex-col gap-3">
            {showComment && (
              <div className="flex gap-2.5" style={{ animation: 'fadeUp .4s ease' }}>
                <div className="w-7 h-7 flex-none rounded-full bg-[#2f6db0] text-white text-[11px] font-bold grid place-items-center">PN</div>
                <div><div className="flex items-baseline gap-1.5"><span className="text-[12.5px] font-bold text-ink">Priya Nair</span><span className="text-[10.5px] text-muted">10:42</span></div><div className="text-[12.5px] leading-snug text-muted mt-0.5">This beam clashes with the HVAC duct run here — can we drop the duct by 150&nbsp;mm?</div></div>
              </div>
            )}
            {showReply && (
              <div className="flex gap-2.5 pl-3.5" style={{ animation: 'fadeUp .4s ease' }}>
                <div className="w-7 h-7 flex-none rounded-full bg-[#c98a2f] text-white text-[11px] font-bold grid place-items-center">MD</div>
                <div><div className="flex items-baseline gap-1.5"><span className="text-[12.5px] font-bold text-ink">Marco Diaz</span><span className="text-[10.5px] text-muted">10:48</span></div><div className="text-[12.5px] leading-snug text-muted mt-0.5">Good catch — rerouted the duct and updated the model. Clash cleared.</div></div>
              </div>
            )}
            {showResolved && (
              <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: 'rgba(63,143,94,0.12)', animation: 'fadeUp .4s ease' }}>
                <svg width="15" height="15" viewBox="0 0 16 16"><path d="M3 8.5 L6.5 12 L13 4" fill="none" stroke="#3f8f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-[11.5px] font-semibold" style={{ color: '#3f8f5e' }}>Resolved by Marco Diaz · 10:49</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* title + transport */}
      <div className="absolute left-5 md:left-10 bottom-7 z-[8]">
        <div className="text-[11px] tracking-[0.24em] font-bold text-muted mb-2">INTEGRATED AEC TECHNOLOGY STACK</div>
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-ink mb-4">{SCENES[c].name}</div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => setPlaying((p) => !p)} className="w-9 h-9 rounded-full grid place-items-center text-white" style={{ background: dark ? '#e9f2fb' : '#161b1f', color: dark ? '#0c1620' : '#fff' }} aria-label="Play/Pause">
            {playing ? <span className="flex gap-[3px]"><span className="w-[3px] h-3 bg-current" /><span className="w-[3px] h-3 bg-current" /></span> : <span className="ml-0.5" style={{ width: 0, height: 0, borderLeft: '10px solid currentColor', borderTop: '6px solid transparent', borderBottom: '6px solid transparent' }} />}
          </button>
          <div className="flex gap-1.5">
            {SCENES.map((_, i) => (
              <button key={i} onClick={() => jump(i)} aria-label={`Scene ${i + 1}`} className="h-1.5 rounded-full transition-all" style={{ width: c === i ? 22 : 6, background: c === i ? (dark ? '#e9f2fb' : '#161b1f') : 'var(--line)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* hint */}
      <div className="absolute right-5 md:right-10 bottom-7 z-[8] hidden sm:block text-[10.5px] tracking-wider uppercase text-muted">Drag to orbit · click elements</div>
    </div>
  )
}
