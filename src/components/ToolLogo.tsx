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
      <span className="text-xl md:text-2xl font-medium whitespace-nowrap" style={{ color: '#5a6b75' }}>
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
      className="h-9 md:h-11 w-auto object-contain opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-105"
    />
  )
}
