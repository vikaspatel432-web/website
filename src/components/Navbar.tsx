import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/technology', label: 'Technology' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  return (
    <header
      className={`${
        onHome ? 'absolute' : 'sticky'
      } top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 pt-6`}
    >
      <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-2xl font-semibold tracking-tight flex items-baseline gap-1"
        >
          <span>SP</span>
          <span className="text-sm font-light text-gray-300 tracking-wide hidden sm:inline">
            CONSULTANTS
          </span>
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-gray-300 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden sm:inline-block bg-white text-black px-6 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
          >
            Get in Touch
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-2 liquid-glass rounded-xl p-4 flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-base py-1 transition-colors hover:text-gray-300 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium text-center mt-1"
          >
            Get in Touch
          </Link>
        </div>
      )}
    </header>
  )
}
