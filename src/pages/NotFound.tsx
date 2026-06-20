import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-screen grid place-items-center bp-grid">
      <div className="text-center container-x">
        <p className="h-display text-7xl md:text-8xl text-gradient">404</p>
        <p className="text-muted mt-4 mb-8">This page could not be found.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </section>
  )
}
