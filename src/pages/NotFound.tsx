import { Link } from 'react-router-dom'
import { PAGE_X } from '../components/ui'

export default function NotFound() {
  return (
    <section className={`${PAGE_X} min-h-screen flex flex-col items-center justify-center text-center`}>
      <p className="text-7xl font-light mb-4" style={{ letterSpacing: '-0.04em' }}>
        404
      </p>
      <p className="text-gray-400 mb-8">This page could not be found.</p>
      <Link
        to="/"
        className="bg-white text-black px-8 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100"
      >
        Back to Home
      </Link>
    </section>
  )
}
