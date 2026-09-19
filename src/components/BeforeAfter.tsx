import { useState } from 'react'

/**
 * Drag/keyboard before-after comparison.
 * Built on a range input so arrow keys, Home/End and touch all work for free.
 */
export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}: {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}) {
  const [pos, setPos] = useState(50)

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line select-none ${className}`}
      style={{ aspectRatio: '3 / 2' }}
    >
      {/* After (revealed on the right) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before (clipped from the left up to the handle) */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Labels */}
      <span
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-white bg-black/55 backdrop-blur-sm transition-opacity"
        style={{ opacity: pos > 12 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-white bg-black/55 backdrop-blur-sm transition-opacity"
        style={{ opacity: pos < 88 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      {/* Divider + handle (visual only; the range input drives it) */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center">
          <span className="text-[#156082] text-sm font-bold tracking-tighter">‹ ›</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Reveal slider: drag to compare ${beforeLabel} with ${afterLabel}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  )
}
