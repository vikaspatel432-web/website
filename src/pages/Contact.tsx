import { useState, type FormEvent } from 'react'
import { Mail, Phone, Globe, MapPin } from 'lucide-react'
import { PageHeader, Card, PAGE_X } from '../components/ui'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = { 'form-name': 'contact' }
    data.forEach((value, key) => {
      payload[key] = value.toString()
    })

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
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your project."
        intro="Tell us what you need captured and we'll get back to you with the right approach. We typically reply within one business day."
      />

      <section className={`${PAGE_X} py-20`}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Details */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium mb-5">Get in touch</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-white/70" />
                  <a href="mailto:admin@spconsultants.info" className="hover:text-white transition-colors">
                    admin@spconsultants.info
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-white/70" />
                  <a href="tel:+919913462740" className="hover:text-white transition-colors">
                    +91 99134 62740
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-white/70" />
                  <a href="tel:+919428510353" className="hover:text-white transition-colors">
                    +91 94285 10353
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe size={18} className="text-white/70" />
                  <a href="https://www.spconsultants.info" className="hover:text-white transition-colors">
                    www.spconsultants.info
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-white/70" />
                  <span>Projects across the UK &amp; India</span>
                </li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-medium mb-2">Prefer to email a contact directly?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Yogiraj Surti — Strategic Director ·{' '}
                <a href="mailto:yogiraj@spconsultants.info" className="text-gray-300 hover:text-white">yogiraj@spconsultants.info</a>
                <br />
                Vikas Patel — Technical Director ·{' '}
                <a href="mailto:vikas@spconsultants.info" className="text-gray-300 hover:text-white">vikas@spconsultants.info</a>
              </p>
            </Card>
          </div>

          {/* Form */}
          <Card>
            {status === 'sent' ? (
              <div className="h-full flex flex-col justify-center text-center py-10">
                <h3 className="text-2xl font-normal mb-3">Thank you</h3>
                <p className="text-gray-400">
                  Your message has been sent. We'll be in touch shortly.
                </p>
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
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Project details <span className="text-gray-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    placeholder="What would you like scanned or modelled?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please email us at admin@spconsultants.info.
                  </p>
                )}
              </form>
            )}
          </Card>
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
      <label className="block text-sm text-gray-400 mb-2">
        {label} {required && <span className="text-gray-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-colors"
      />
    </div>
  )
}
