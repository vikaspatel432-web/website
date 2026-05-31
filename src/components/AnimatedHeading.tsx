import { useEffect, useState, type CSSProperties } from 'react'

interface AnimatedHeadingProps {
  /** Text to animate. Use \n to split into separate lines. */
  text: string
  className?: string
  style?: CSSProperties
  /** Initial delay before the first character animates, in milliseconds. */
  initialDelay?: number
  /** Per-character stagger, in milliseconds. */
  charDelay?: number
}

/**
 * Splits text by line break, then by character, and animates each character in
 * with a staggered opacity + horizontal slide. Spaces render as non-breaking
 * spaces so the layout is preserved.
 */
export default function AnimatedHeading({
  text,
  className = '',
  style,
  initialDelay = 200,
  charDelay = 30,
}: AnimatedHeadingProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  const lines = text.split('\n')

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split('').map((char, charIndex) => {
            const delay =
              lineIndex * line.length * charDelay + charIndex * charDelay
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                  transition: 'opacity 500ms ease, transform 500ms ease',
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === ' ' ? ' ' : char}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
