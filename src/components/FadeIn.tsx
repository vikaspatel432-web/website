import { useEffect, useState, type ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  /** Delay before the fade-in starts, in milliseconds. */
  delay?: number
  /** Transition duration, in milliseconds. */
  duration?: number
  className?: string
}

/**
 * Wrapper that starts fully transparent and transitions to opaque after a
 * configurable delay. Used throughout the hero and the inner pages.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = '',
}: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
