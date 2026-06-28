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
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const onHome = location.pathname === '/'
  // Over the dark hero video → force white UI; otherwise use themed colours.
  const overVideo = onHome && !scrolled && !open

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className={`transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="container-x">
          <nav
            className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
              scrolled || open ? 'glass shadow-lg shadow-black/5' : ''
            }`}
          >
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="SP Consultants"
                className={`h-12 md:h-14 w-auto transition-[filter] duration-300 ${
                  overVideo ? '[filter:brightness(0)_invert(1)]' : 'logo-img'
                }`}
              />
              <span className="sr-only">SP Consultants</span>
            </Link>

            <div className="hidden md:flex items-center gap-9">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `relative text-sm transition-colors ${
                      overVideo
                        ? 'text-white/80 hover:text-white'
                        : isActive
                        ? 'text-accent'
                        : 'text-muted hover:text-accent'
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
                className={`p-2 rounded-full transition-colors ${
                  overVideo ? 'text-white/80 hover:text-white' : 'text-muted hover:text-accent'
                }`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className={`md:hidden p-2 ${overVideo ? 'text-white' : 'text-ink'}`}
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
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium"
              >
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
