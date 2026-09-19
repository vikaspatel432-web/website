import { useState, type FormEvent } from 'react'
import { Mail, Phone, Globe, MapPin, Send } from 'lucide-react'
import { PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { COMPANY, FOUNDERS, SERVICES } from '../content'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const payload: Record<string, string> = { 'form-name': 'contact' }
    new FormData(form).forEach((v, k) => (payload[k] = v.toString()))
    setStatus('sending')
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(payload),
    })
      .then(() => {
        setStatus('sent')
        form.reset()
      })
      .catch(() => setStatus('error'))
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your project."
        intro="Tell us your scope and we’ll recommend the right BIM and construction-technology approach. We typically reply within one business day."
      />

      <section className="container-x py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Details */}
          <div className="space-y-6">
            <Reveal>
              <div className="card p-7">
                <h3 className="font-display text-lg font-semibold mb-5">Get in touch</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-accent" />
                    <a href={`mailto:${COMPANY.email}`} className="text-muted hover:text-accent transition-colors">{COMPANY.email}</a>
                  </li>
                  {COMPANY.phones.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <Phone size={18} className="text-accent" />
                      <a href={`tel:${p.replace(/\s/g, '')}`} className="text-muted hover:text-accent transition-colors">{p}</a>
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <Globe size={18} className="text-accent" />
                    <a href={`https://${COMPANY.site}`} className="text-muted hover:text-accent transition-colors">{COMPANY.site}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin size={18} className="text-accent" />
                    <span className="text-muted">Serving projects across India &amp; abroad</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="card p-7">
                <h3 className="font-display text-lg font-semibold mb-4">Speak to a founder</h3>
                <div className="space-y-4">
                  {FOUNDERS.map((f) => (
                    <div key={f.name} className="text-sm">
                      <p className="font-medium">{f.name}</p>
                      <p className="text-muted text-xs mb-1">{f.role}</p>
                      <a href={`mailto:${f.email}`} className="text-accent hover:underline">{f.email}</a>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={120}>
            <div className="card p-7 md:p-9">
              {status === 'sent' ? (
                <div className="h-full flex flex-col justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full grid place-items-center text-accent mx-auto mb-5" style={{ background: 'var(--surface-2)' }}>
                    <Send size={24} />
                  </div>
                  <h3 className="h-display text-2xl mb-2">Thank you</h3>
                  <p className="text-muted">Your message has been sent — we’ll be in touch shortly.</p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>Don’t fill this out: <input name="bot-field" /></label>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" name="name" required />
                    <Field label="Company" name="company" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" required />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-2">Service of interest</label>
                    <select name="service" className="input">
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Multiple / Not sure">Multiple / Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-2">Project details <span className="text-accent">*</span></label>
                    <textarea name="message" required rows={5} className="input resize-none" placeholder="Tell us about your project, scope and timeline…" />
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : 'Send Message'} <Send size={17} />
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-red-500">Something went wrong. Please email {COMPANY.email}.</p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm text-muted mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input type={type} name={name} required={required} className="input" />
    </div>
  )
}
