import type { ReactNode } from 'react'

/** Infinite horizontal marquee; duplicates children for a seamless loop. */
export default function Marquee({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
