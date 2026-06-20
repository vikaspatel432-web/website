import { useEffect, useState, type ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  /** Slide up while fading in. */
  y?: number
}

/** Fades (and optionally slides) content in after a configurable delay. */
export default function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = '',
  y = 0,
}: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      {children}
    </div>
  )
}
