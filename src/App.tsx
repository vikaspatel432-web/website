import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Intro from './components/Intro'
import Home from './pages/Home'
import Services from './pages/Services'
import Platform from './pages/Platform'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('sp-intro-seen')
    } catch {
      return true
    }
  })

  const finishIntro = () => {
    try {
      sessionStorage.setItem('sp-intro-seen', '1')
    } catch {
      /* ignore */
    }
    setShowIntro(false)
  }

  return (
    <div className="min-h-screen">
      {showIntro && <Intro onDone={finishIntro} />}
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
