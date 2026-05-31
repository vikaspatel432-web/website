import { Link } from 'react-router-dom'
import { Mail, Phone, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 md:px-12 lg:px-16 py-14">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-2xl font-semibold tracking-tight mb-3">
            SP <span className="font-light text-gray-400 text-lg">CONSULTANTS</span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Reality capture and Scan-to-BIM specialists. We help architects,
            engineers and builders work from a precise digital record of the
            world as it really is.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/technology" className="hover:text-white transition-colors">Technology</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={15} />
              <a href="mailto:admin@spconsultants.info" className="hover:text-white transition-colors">admin@spconsultants.info</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} />
              <a href="tel:+919913462740" className="hover:text-white transition-colors">+91 99134 62740</a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={15} />
              <a href="https://www.spconsultants.info" className="hover:text-white transition-colors">www.spconsultants.info</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} SP Consultants. All rights reserved.</span>
        <span>Transforming visions into reality.</span>
      </div>
    </footer>
  )
}
