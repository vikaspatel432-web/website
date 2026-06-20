import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../theme'

const logo = '/logo.png'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/platform', label: 'Platform' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="container-x">
          <nav
            className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
              scrolled ? 'glass shadow-lg shadow-black/5' : ''
            }`}
          >
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="SP Consultants" className="logo-img h-9 w-auto" />
              <span className="sr-only">SP Consultants</span>
            </Link>

            <div className="hidden md:flex items-center gap-9">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `relative text-sm transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-muted'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle theme"
                className="p-2 rounded-full text-muted hover:text-accent transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link to="/contact" className="btn-primary hidden sm:inline-flex !px-5 !py-2 text-sm">
                Get in Touch
              </Link>
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="md:hidden p-2 text-ink"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>

          {open && (
            <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `py-2.5 px-2 rounded-lg transition-colors ${
                      isActive ? 'text-accent' : 'text-ink hover:text-accent'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary mt-2 text-sm">
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
