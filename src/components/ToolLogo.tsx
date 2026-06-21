import { useState } from 'react'

/**
 * Renders a tool's logo image; if the asset is missing (or fails to load),
 * gracefully falls back to the tool name as styled text. Logos render in a
 * neutral tone and gain colour on hover.
 */
export default function ToolLogo({ name, file }: { name: string; file: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="text-xl md:text-2xl font-medium text-muted/70 whitespace-nowrap">
        {name}
      </span>
    )
  }

  return (
    <img
      src={file}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-8 md:h-9 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
    />
  )
}
