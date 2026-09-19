import { useEffect, useState } from 'react'
import { COMPANY } from '../content'

// wa.me needs the number in international format, digits only.
const WA_NUMBER = COMPANY.phones[0].replace(/\D/g, '')
const WA_TEXT = encodeURIComponent(
  "Hi SP Consultants, I'd like to discuss a project.",
)

/**
 * Floating WhatsApp enquiry button. In Indian B2B this is usually a faster
 * path to a conversation than a contact form.
 */
export default function WhatsAppButton() {
  const [shown, setShown] = useState(false)

  // Hold it back until the hero is out of the way so it doesn't fight the CTAs.
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SP Consultants on WhatsApp"
      className={`group fixed z-50 bottom-5 right-5 flex items-center gap-3 rounded-full pl-4 pr-5 py-3.5 text-white font-medium shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ background: '#25D366' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.465 3.49" />
      </svg>
      <span className="text-sm whitespace-nowrap max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
