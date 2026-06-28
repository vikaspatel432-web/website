import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
  className?: string
}

/** Counts up from 0 to `to` once it scrolls into view. */
export default function Counter({
  to,
  suffix = '',
  prefix = '',
  duration = 1600,
  decimals = 0,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(to * eased)
          if (p < 1) requestAnimationFrame(tick)
          else setVal(to)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
