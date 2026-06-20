import { Link } from 'react-router-dom'
import { Mail, Phone, Globe, ArrowUpRight } from 'lucide-react'
import { COMPANY } from '../content'

const logo = '/logo.png'

export default function Footer() {
  return (
    <footer className="bp-grid border-t border-line" style={{ background: 'var(--surface)' }}>
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logo} alt="SP Consultants" className="logo-img h-12 w-auto mb-5" />
            <p className="text-muted max-w-sm leading-relaxed">
              BIM consultancy and AEC construction technology. We make the BIM
              model the single source of truth — from design to delivery.
            </p>
            <p className="label-mono mt-6">{COMPANY.tagline}</p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-muted text-sm">
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/platform" className="hover:text-accent transition-colors">BIM Platform</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-muted text-sm">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-accent" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-accent transition-colors">{COMPANY.email}</a>
              </li>
              {COMPANY.phones.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone size={15} className="text-accent" />
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">{p}</a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Globe size={15} className="text-accent" />
                <a href={`https://${COMPANY.site}`} className="hover:text-accent transition-colors inline-flex items-center gap-1">
                  {COMPANY.site} <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>Confidential &amp; Proprietary · AEC Construction Technology</span>
        </div>
      </div>
    </footer>
  )
}
