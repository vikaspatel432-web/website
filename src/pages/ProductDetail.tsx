import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, AlertCircle, Lightbulb } from 'lucide-react'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import ProductVideo from '../components/ProductVideo'
import { PRODUCTS } from '../content'
import useSEO from '../useSEO'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = PRODUCTS.find((p) => p.slug === slug)
  const index = PRODUCTS.findIndex((p) => p.slug === slug)
  const next = index >= 0 ? PRODUCTS[(index + 1) % PRODUCTS.length] : null

  useSEO({
    title: product ? `${product.name} — ${product.tagline} | SP Consultants` : 'Products | SP Consultants',
    description: product?.summary ?? 'Construction technology products by SP Consultants.',
    path: `/products/${slug ?? ''}`,
  })

  if (!product) return <Navigate to="/products" replace />

  return (
    <>
      {/* ---- Hero: name, tagline, strongest commercial message ---- */}
      <section className="relative overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="absolute inset-0 bp-grid opacity-50" />
        <div className="container-x relative pt-28 pb-16">
          <Link
            to="/products"
            viewTransition
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft size={16} /> All products
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3.5 rounded-xl grid place-items-center text-accent" style={{ background: 'var(--surface-2)' }}>
              <Icon name={product.icon as never} size={26} strokeWidth={1.6} />
            </div>
            {product.market && (
              <span className="text-xs px-3 py-1.5 rounded-full border border-line text-muted">{product.market}</span>
            )}
          </div>

          <h1 className="display-xl mb-4">{product.name}</h1>
          <p className="text-lg md:text-xl text-accent font-medium mb-6">{product.tagline}</p>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl font-medium">{product.headline}</p>

          {product.video && (
            <div className="mt-12 max-w-4xl">
              <ProductVideo src={product.video} label={`${product.name} — product walkthrough`} />
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-9">
            <Link to="/contact" viewTransition className="btn-primary">
              {product.cta} <ArrowRight size={17} />
            </Link>
            <Link
              to="/contact"
              viewTransition
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3 font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Problem → Solution ---- */}
      <section className="container-x py-20">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="card p-8 h-full">
              <p className="label-mono mb-4 inline-flex items-center gap-2">
                <AlertCircle size={14} /> The problem
              </p>
              <h2 className="display-lg mb-4">{product.problem.title}</h2>
              <p className="text-muted leading-relaxed">{product.problem.text}</p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="card p-8 h-full" style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, var(--line))' }}>
              <p className="label-mono mb-4 inline-flex items-center gap-2">
                <Lightbulb size={14} /> The solution
              </p>
              <h2 className="display-lg mb-4">{product.solution.title}</h2>
              <p className="text-muted leading-relaxed">{product.solution.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Business benefits ---- */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="container-x">
          <Reveal>
            <p className="label-mono mb-3">What it changes</p>
            <h2 className="display-lg mb-10 max-w-3xl">
              The business outcome, not the feature list.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.benefits.map((b, i) => (
              <Reveal key={b} delay={(i % 3) * 90}>
                <div className="card p-6 h-full flex gap-4">
                  <Check size={19} className="text-accent shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Key features ---- */}
      <section className="container-x py-20">
        <Reveal>
          <p className="label-mono mb-3">Key capabilities</p>
          <h2 className="display-lg mb-10">How it works in practice.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {product.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80}>
              <div className="panel group p-7 h-full"><div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl grid place-items-center text-accent mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'var(--surface-2)' }}
                >
                  <Icon name={f.icon as never} size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Optional extras block (e.g. workflow templates) */}
        {product.extras && (
          <Reveal>
            <div className="card mt-8 p-8 md:p-10">
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">{product.extras.title}</h3>
              <p className="text-muted leading-relaxed mb-6 max-w-2xl">{product.extras.text}</p>
              <div className="flex flex-wrap gap-2.5">
                {product.extras.items.map((it) => (
                  <span
                    key={it}
                    className="text-sm px-4 py-2 rounded-full border border-line"
                    style={{ background: 'var(--surface-2)' }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* ---- Full walkthrough (portrait clip) ---- */}
      {product.videoVertical && (
        <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'var(--surface)' }}>
          <div className="absolute inset-0 bp-grid opacity-50" />
          <div className="aura drift" style={{ width: 460, height: 460, top: '-25%', left: '-8%', opacity: 0.3 }} />
          <div className="container-x relative grid lg:grid-cols-[1fr_0.6fr] gap-12 items-center">
            <Reveal>
              <div>
                <p className="label-mono mb-3">Full walkthrough</p>
                <h2 className="display-lg mb-5">See it the way your team will.</h2>
                <p className="text-muted leading-relaxed max-w-lg">
                  Capture the site, walk it from anywhere, and raise an issue against the exact
                  spot you saw it — start to finish.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mx-auto w-full max-w-[280px]">
                <ProductVideo src={product.videoVertical} label={`${product.name} full walkthrough`} portrait />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- CTA ---- */}
      <section className="container-x pb-20">
        <div className="rounded-2xl p-10 md:p-14 text-center" style={{ background: 'var(--surface)' }}>
          <h2 className="display-lg mb-4">{product.cta}</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Tell us about your project and we’ll show you {product.name} working on the kind of work you actually do.
          </p>
          <Link to="/contact" viewTransition className="btn-primary">
            Book a Demo <ArrowRight size={17} />
          </Link>
        </div>

        {next && next.slug !== product.slug && (
          <Link
            to={`/products/${next.slug}`}
            viewTransition
            className="card group mt-8 flex items-center justify-between gap-6 p-7 hover:border-accent hover:-translate-y-1"
          >
            <div>
              <p className="label-mono mb-1">Next product</p>
              <p className="font-display text-xl md:text-2xl font-semibold">{next.name}</p>
            </div>
            <ArrowRight size={22} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </section>
    </>
  )
}
