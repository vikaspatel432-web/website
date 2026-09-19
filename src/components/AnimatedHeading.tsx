import { Fragment, useEffect, useState, type CSSProperties } from 'react'

interface AnimatedHeadingProps {
  text: string
  className?: string
  style?: CSSProperties
  initialDelay?: number
  charDelay?: number
  as?: 'h1' | 'h2'
}

/**
 * Splits text by line break, then by word, then by character. Each character
 * animates in with a staggered opacity + horizontal slide, but words are kept
 * atomic (whitespace-nowrap) so they never break mid-word — line wraps only
 * happen between words.
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
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')
        let charCounter = 0
        return (
          <span key={lineIndex} className="block">
            {words.map((word, wi) => {
              const start = charCounter
              charCounter += word.length + 1 // account for the space
              return (
                <Fragment key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {word.split('').map((char, ci) => {
                      const delay =
                        lineIndex * line.length * charDelay + (start + ci) * charDelay
                      return (
                        <span
                          key={ci}
                          className="inline-block"
                          style={{
                            opacity: animate ? 1 : 0,
                            transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                            transition: 'opacity 500ms ease, transform 500ms ease',
                            transitionDelay: `${delay}ms`,
                          }}
                        >
                          {char}
                        </span>
                      )
                    })}
                  </span>
                  {wi < words.length - 1 ? ' ' : null}
                </Fragment>
              )
            })}
          </span>
        )
      })}
    </Tag>
  )
}
