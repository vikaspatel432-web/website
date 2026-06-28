import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pause, Play } from 'lucide-react'
import { useTheme } from '../theme'

type Mode = 'pen' | 'shaded' | 'solid'
type Phase = 'structural' | 'architectural' | 'mep'

// Palettes ported from the original "Building Assembly" design, lightly tuned
// toward the SP Consultants palette (navy / teal edges).
const COLORS = {
  light: {
    bg: 0xf3f3f1, fog: 0xf1f1ef, penFace: 0xffffff, edge: 0x1f4e79, edgeSubtleOp: 0.55, hemi: 1.05, dir: 0.5,
    shade: { structural: 0xe7e8ea, arch: 0xece6dc, line: 0xd4d6d8, duct: 0xdbe6f1, pipe: 0xe9dccb, light: 0xfdf3d8, tray: 0xdfe7e1 },
    solid: { structural: 0xc6ccd5, arch: 0xd8ccb7, line: 0x99a1ab, duct: 0xa9c6e0, pipe: 0xd3ad8b, light: 0xeedd97, tray: 0xb9ccba },
  },
  dark: {
    bg: 0x0a1622, fog: 0x0a1622, penFace: 0x111d29, edge: 0x3ea0c9, edgeSubtleOp: 0.45, hemi: 0.7, dir: 0.42,
    shade: { structural: 0x2b3848, arch: 0x363a4c, line: 0x222c38, duct: 0x244460, pipe: 0x46382e, light: 0x5b5230, tray: 0x2c4040 },
    solid: { structural: 0x3d4f64, arch: 0x4d5266, line: 0x33404f, duct: 0x2f6088, pipe: 0x6e5238, light: 0x8a7c3e, tray: 0x3a5656 },
  },
} as const

const PHASE: Record<Phase, { n: string; t: string; d: string; start: number }> = {
  structural: { n: '01', t: 'Structural', d: 'Columns · Beams · Slabs', start: 0.05 },
  architectural: { n: '02', t: 'Architectural', d: 'Walls · Partitions · Layout', start: 0.44 },
  mep: { n: '03', t: 'MEP', d: 'Ducts · Pipes · Lighting', start: 0.67 },
}

interface El {
  grp: THREE.Group
  faceMat: THREE.MeshLambertMaterial
  edgeMat: THREE.LineBasicMaterial
  edges: THREE.LineSegments
  kind: string
  grow: [number, number, number]
  faceMax: number
  edgeBase: number
  t0: number
  t1: number
}

export default function BuildingAssembly() {
  const { theme } = useTheme()
  const mountRef = useRef<HTMLDivElement | null>(null)
  const progRef = useRef<HTMLDivElement | null>(null)
  const engine = useRef<ReturnType<typeof createEngine> | null>(null)

  const [mode, setMode] = useState<Mode>('shaded')
  const [phase, setPhase] = useState<Phase>('structural')
  const [playing, setPlaying] = useState(true)

  // Init once
  useEffect(() => {
    const eng = createEngine(mountRef.current!, progRef.current!, theme, setPhase)
    engine.current = eng
    return () => eng.dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { engine.current?.applyTheme(theme) }, [theme])
  useEffect(() => { engine.current?.applyMode(mode) }, [mode])
  useEffect(() => { engine.current?.setPlaying(playing) }, [playing])

  const info = PHASE[phase]

  const segBtn = (m: Mode, label: string) => (
    <button
      onClick={() => setMode(m)}
      className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
        mode === m ? 'bg-ink text-bg' : 'text-ink/70 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
  const chipBtn = (p: Phase) => (
    <button
      onClick={() => { engine.current?.jump(p); setPhase(p) }}
      className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
        phase === p ? 'text-ink bg-ink/5 dark:bg-white/10' : 'text-muted hover:text-ink'
      }`}
    >
      <span className="text-[10px] opacity-60 font-bold">{PHASE[p].n}</span>
      {PHASE[p].t}
    </button>
  )

  return (
    <div className="relative w-full h-[560px] sm:h-[640px] rounded-2xl overflow-hidden border border-line">
      <div ref={mountRef} className="absolute inset-0" />

      {/* Overlay */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        {/* top */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-bold tracking-[0.24em] text-ink">SP&nbsp;CONSULTANTS</div>
            <div className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-muted mt-1">
              BIM · Coordination · Construction Sequencing
            </div>
          </div>
        </div>

        {/* bottom */}
        <div>
          <div className="mb-5">
            <div className="text-xs font-semibold tracking-[0.28em] text-muted">{info.n}</div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-none my-1.5">{info.t}</div>
            <div className="text-xs font-medium tracking-[0.1em] uppercase text-muted">{info.d}</div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap pointer-events-auto">
            <div className="flex gap-0.5 p-1.5 rounded-xl glass shadow-lg shadow-black/5">
              {chipBtn('structural')}{chipBtn('architectural')}{chipBtn('mep')}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 p-1.5 rounded-xl glass shadow-lg shadow-black/5">
                {segBtn('pen', 'Pen')}{segBtn('shaded', 'Shaded')}{segBtn('solid', 'Solid')}
              </div>
              <button
                onClick={() => setPlaying((v) => !v)}
                className="w-10 h-10 grid place-items-center rounded-xl glass shadow-lg shadow-black/5 text-ink"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* progress */}
      <div className="absolute left-0 right-0 bottom-0 h-0.5" style={{ background: 'var(--line)' }}>
        <div ref={progRef} className="h-full w-0" style={{ background: 'var(--accent)', transition: 'width .1s linear' }} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Imperative Three.js engine (ported from the design handoff)         */
/* ------------------------------------------------------------------ */
function createEngine(
  el: HTMLDivElement,
  prog: HTMLDivElement,
  initialTheme: 'light' | 'dark',
  onPhase: (p: Phase) => void,
) {
  let themeKey: 'light' | 'dark' = initialTheme
  let viewMode: Mode = 'shaded'
  let playing = true
  let raf = 0
  let lastPhase: Phase | null = null
  let autoT: ReturnType<typeof setTimeout> | undefined
  const total = 27
  let elapsed = 1.0
  const elements: El[] = []
  const buckets: Record<string, El[]> = { structuralEls: [], architecturalEls: [], mepEls: [] }

  const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
  const ez = (p: number) => { p = clamp01(p); return 1 - Math.pow(1 - p, 3) }

  const w = el.clientWidth || 1280
  const h = el.clientHeight || 640
  let C = COLORS[themeKey]

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(C.bg)
  scene.fog = new THREE.Fog(C.fog, 34, 78)

  const camera = new THREE.PerspectiveCamera(56, w / h, 0.1, 400)
  camera.position.set(18, 1.5, 13)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
  renderer.setSize(w, h)
  el.appendChild(renderer.domElement)

  const hemi = new THREE.HemisphereLight(0xffffff, 0xb9bcc2, C.hemi)
  scene.add(hemi)
  const dir = new THREE.DirectionalLight(0xffffff, C.dir)
  dir.position.set(14, 26, 10)
  scene.add(dir)
  const dir2 = new THREE.DirectionalLight(0xffffff, C.dir * 0.5)
  dir2.position.set(-12, 14, -8)
  scene.add(dir2)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 2.7, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enablePan = false
  controls.minDistance = 8
  controls.maxDistance = 40
  controls.minPolarAngle = 1.22
  controls.maxPolarAngle = 1.66
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5
  controls.update()
  controls.addEventListener('start', () => { if (autoT) clearTimeout(autoT); controls.autoRotate = false })
  controls.addEventListener('end', () => { autoT = setTimeout(() => { controls.autoRotate = true }, 4500) })

  const pivot = (p: string, cx: number, cy: number, cz: number, bw: number, bh: number, bd: number): [number, number, number] => {
    if (p === 'base') return [cx, cy - bh / 2, cz]
    if (p === 'top') return [cx, cy + bh / 2, cz]
    if (p === 'minx') return [cx - bw / 2, cy, cz]
    if (p === 'maxx') return [cx + bw / 2, cy, cz]
    if (p === 'minz') return [cx, cy, cz - bd / 2]
    if (p === 'maxz') return [cx, cy, cz + bd / 2]
    return [cx, cy, cz]
  }

  function addBox(o: { size: [number, number, number]; pos: [number, number, number]; pivot?: string; grow?: [number, number, number]; kind: string; phase: string }) {
    const [bw, bh, bd] = o.size
    const [cx, cy, cz] = o.pos
    const geo = new THREE.BoxGeometry(bw, bh, bd)
    const eg = new THREE.EdgesGeometry(geo, 25)
    const faceMat = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0 })
    const edgeMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0 })
    const mesh = new THREE.Mesh(geo, faceMat)
    const edges = new THREE.LineSegments(eg, edgeMat)
    const pv = pivot(o.pivot || 'center', cx, cy, cz, bw, bh, bd)
    const grp = new THREE.Group()
    grp.position.set(pv[0], pv[1], pv[2])
    mesh.position.set(cx - pv[0], cy - pv[1], cz - pv[2])
    edges.position.copy(mesh.position)
    grp.add(mesh); grp.add(edges)
    scene.add(grp)
    const e: El = { grp, faceMat, edgeMat, edges, kind: o.kind, grow: o.grow || [1, 1, 1], faceMax: 1, edgeBase: 1, t0: 0, t1: 1 }
    elements.push(e); buckets[o.phase + 'Els'].push(e)
  }
  function addCyl(o: { r: number; len: number; axis: 'x' | 'z'; pos: [number, number, number]; kind: string; phase: string }) {
    const { r, len } = o
    const [cx, cy, cz] = o.pos
    const geo = new THREE.CylinderGeometry(r, r, len, 16, 1, false)
    let pv: [number, number, number]
    let grow: [number, number, number]
    if (o.axis === 'x') { geo.rotateZ(Math.PI / 2); pv = [cx - len / 2, cy, cz]; grow = [1, 0, 0] }
    else { geo.rotateX(Math.PI / 2); pv = [cx, cy, cz - len / 2]; grow = [0, 0, 1] }
    const eg = new THREE.EdgesGeometry(geo, 25)
    const faceMat = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0 })
    const edgeMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0 })
    const mesh = new THREE.Mesh(geo, faceMat)
    const edges = new THREE.LineSegments(eg, edgeMat)
    const grp = new THREE.Group()
    grp.position.set(pv[0], pv[1], pv[2])
    mesh.position.set(cx - pv[0], cy - pv[1], cz - pv[2])
    edges.position.copy(mesh.position)
    grp.add(mesh); grp.add(edges)
    scene.add(grp)
    const e: El = { grp, faceMat, edgeMat, edges, kind: o.kind, grow, faceMax: 1, edgeBase: 1, t0: 0, t1: 1 }
    elements.push(e); buckets[o.phase + 'Els'].push(e)
  }

  function build() {
    const xs = [-16, -8, 0, 8, 16], zs = [-9, 0, 9]
    addBox({ size: [44, 0.3, 30], pos: [0, -0.15, 0], pivot: 'center', grow: [1, 0, 1], kind: 'structural', phase: 'structural' })
    addBox({ size: [44, 0.35, 30], pos: [0, 4.45, 0], pivot: 'center', grow: [1, 0, 1], kind: 'structural', phase: 'structural' })
    xs.forEach((x) => zs.forEach((z) => addBox({ size: [0.9, 4, 0.9], pos: [x, 2, z], pivot: 'base', grow: [0, 1, 0], kind: 'structural', phase: 'structural' })))
    zs.forEach((z) => { for (let i = 0; i < xs.length - 1; i++) { const cx = (xs[i] + xs[i + 1]) / 2, len = xs[i + 1] - xs[i]; addBox({ size: [len, 0.55, 0.4], pos: [cx, 3.72, z], pivot: 'minx', grow: [1, 0, 0], kind: 'structural', phase: 'structural' }) } })
    xs.forEach((x) => { for (let j = 0; j < zs.length - 1; j++) { const cz = (zs[j] + zs[j + 1]) / 2, len = zs[j + 1] - zs[j]; addBox({ size: [0.4, 0.55, len], pos: [x, 3.72, cz], pivot: 'minz', grow: [0, 0, 1], kind: 'structural', phase: 'structural' }) } })

    for (let i = 0; i < 3; i++) addBox({ size: [12.3, 3, 0.25], pos: [-12.6 + i * 12.7, 1.5, -12.6], pivot: 'base', grow: [0, 1, 0], kind: 'arch', phase: 'architectural' })
    for (let j = 0; j < 2; j++) addBox({ size: [0.25, 3, 9.5], pos: [-19.6, 1.5, -4.9 + j * 9.7], pivot: 'base', grow: [0, 1, 0], kind: 'arch', phase: 'architectural' })
    addBox({ size: [0.25, 3, 6], pos: [11.5, 1.5, -9.2], pivot: 'base', grow: [0, 1, 0], kind: 'arch', phase: 'architectural' })
    addBox({ size: [8, 3, 0.25], pos: [15.4, 1.5, -6.3], pivot: 'base', grow: [0, 1, 0], kind: 'arch', phase: 'architectural' })
    ;[-14, -6, 2, 10, 17].forEach((x) => addBox({ size: [0.14, 0.06, 22], pos: [x, 0.04, 0], pivot: 'minz', grow: [0, 0, 1], kind: 'line', phase: 'architectural' }))
    ;[-5, 6].forEach((z) => addBox({ size: [34, 0.06, 0.14], pos: [0, 0.04, z], pivot: 'minx', grow: [1, 0, 0], kind: 'line', phase: 'architectural' }))

    addBox({ size: [32, 0.6, 0.75], pos: [0, 3.05, 3], pivot: 'minx', grow: [1, 0, 0], kind: 'duct', phase: 'mep' })
    addBox({ size: [26, 0.5, 0.6], pos: [-2, 3.05, -5], pivot: 'minx', grow: [1, 0, 0], kind: 'duct', phase: 'mep' })
    ;[-10, 0, 9].forEach((x) => addBox({ size: [0.5, 0.42, 7.5], pos: [x, 3.05, -1], pivot: 'minz', grow: [0, 0, 1], kind: 'duct', phase: 'mep' }))
    addBox({ size: [28, 0.12, 0.65], pos: [2, 3.4, -1], pivot: 'minx', grow: [1, 0, 0], kind: 'tray', phase: 'mep' })
    addCyl({ r: 0.14, len: 30, axis: 'x', pos: [-1, 3.5, 6], kind: 'pipe', phase: 'mep' })
    addCyl({ r: 0.11, len: 24, axis: 'x', pos: [4, 3.5, -7.5], kind: 'pipe', phase: 'mep' })
    addCyl({ r: 0.1, len: 16, axis: 'z', pos: [12, 3.42, 0], kind: 'pipe', phase: 'mep' })
    ;[-12, -4, 4, 12].forEach((x) => [-6, 2].forEach((z) => addBox({ size: [2.4, 0.08, 0.26], pos: [x, 4.12, z], pivot: 'center', grow: [1, 0, 1], kind: 'light', phase: 'mep' })))
  }

  function assignTiming() {
    const wins: Record<string, [number, number]> = { structuralEls: [0.05, 0.40], architecturalEls: [0.44, 0.63], mepEls: [0.67, 0.90] }
    ;(['structuralEls', 'architecturalEls', 'mepEls'] as const).forEach((key) => {
      const list = buckets[key], win = wins[key], N = list.length
      const dur = Math.min(0.13, (win[1] - win[0]) * 0.5)
      const step = N > 1 ? (win[1] - win[0] - dur) / (N - 1) : 0
      list.forEach((e, i) => { e.t0 = win[0] + i * step; e.t1 = e.t0 + dur })
    })
  }

  function applyMode(m?: Mode) {
    if (m) viewMode = m
    C = COLORS[themeKey]
    type FamKey = keyof typeof C.shade
    const famOf = (kind: string): FamKey => (kind === 'arch' ? 'arch' : kind === 'line' ? 'line' : kind === 'duct' ? 'duct' : kind === 'pipe' ? 'pipe' : kind === 'light' ? 'light' : kind === 'tray' ? 'tray' : 'structural')
    elements.forEach((el2) => {
      const fam = famOf(el2.kind)
      if (viewMode === 'pen') {
        el2.faceMat.emissive.setHex(C.penFace); el2.faceMat.color.setHex(0x000000)
        el2.edgeMat.color.setHex(C.edge); el2.edgeBase = 1; el2.edges.visible = true; el2.faceMax = 1
      } else if (viewMode === 'shaded') {
        el2.faceMat.color.setHex(C.shade[fam]); el2.faceMat.emissive.setHex(0x000000)
        el2.edgeMat.color.setHex(C.edge); el2.edgeBase = C.edgeSubtleOp; el2.edges.visible = true; el2.faceMax = 1
      } else {
        el2.faceMat.emissive.setHex(C.solid[fam]); el2.faceMat.color.setHex(0x000000)
        el2.edges.visible = false; el2.edgeBase = 0; el2.faceMax = 1
      }
    })
  }

  function applyTheme(t: 'light' | 'dark') {
    themeKey = t
    C = COLORS[themeKey]
    ;(scene.background as THREE.Color).setHex(C.bg)
    ;(scene.fog as THREE.Fog).color.setHex(C.fog)
    hemi.intensity = C.hemi
    dir.intensity = C.dir
    dir2.intensity = C.dir * 0.5
    applyMode()
  }

  const phaseForGp = (gp: number): Phase => (gp < 0.44 ? 'structural' : gp < 0.67 ? 'architectural' : 'mep')

  const clock = new THREE.Clock()
  function animate() {
    raf = requestAnimationFrame(animate)
    const dt = Math.min(0.05, clock.getDelta())
    if (playing) elapsed += dt
    const gp = (elapsed / total) % 1
    for (const e of elements) {
      const p = clamp01((gp - e.t0) / (e.t1 - e.t0))
      if (p <= 0.0006) { e.grp.visible = false; continue }
      e.grp.visible = true
      const eo = ez(p)
      e.grp.scale.set(e.grow[0] ? Math.max(0.0001, eo) : 1, e.grow[1] ? Math.max(0.0001, eo) : 1, e.grow[2] ? Math.max(0.0001, eo) : 1)
      e.faceMat.opacity = clamp01((p - 0.34) / 0.6) * e.faceMax
      if (e.edges.visible) e.edgeMat.opacity = clamp01(p / 0.5) * e.edgeBase
    }
    if (prog) prog.style.width = (gp * 100).toFixed(1) + '%'
    const ph = phaseForGp(gp)
    if (ph !== lastPhase) { lastPhase = ph; onPhase(ph) }
    controls.update()
    renderer.render(scene, camera)
  }

  const onResize = () => {
    const cw = el.clientWidth, ch = el.clientHeight
    camera.aspect = cw / ch; camera.updateProjectionMatrix()
    renderer.setSize(cw, ch)
  }
  window.addEventListener('resize', onResize)

  build()
  assignTiming()
  applyMode('shaded')
  animate()

  return {
    applyMode,
    applyTheme,
    setPlaying: (p: boolean) => { playing = p },
    jump: (key: Phase) => { elapsed = total * PHASE[key].start + 0.002; lastPhase = key },
    dispose() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    },
  }
}
