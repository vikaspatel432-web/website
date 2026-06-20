import { useEffect, useState, type CSSProperties } from 'react'

interface AnimatedHeadingProps {
  text: string
  className?: string
  style?: CSSProperties
  initialDelay?: number
  charDelay?: number
  as?: 'h1' | 'h2'
}

/**
 * Splits text by line break, then by character, animating each character in
 * with a staggered opacity + horizontal slide. Spaces use non-breaking spaces.
 */
export default function AnimatedHeading({
  text,
  className = '',
  style,
  initialDelay = 200,
  charDelay = 28,
  as: Tag = 'h1',
}: AnimatedHeadingProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), initialDelay)
    return () => clearTimeout(t)
  }, [initialDelay])

  const lines = text.split('\n')

  return (
    <Tag className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split('').map((char, charIndex) => {
            const delay = lineIndex * line.length * charDelay + charIndex * charDelay
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
    </Tag>
  )
}
