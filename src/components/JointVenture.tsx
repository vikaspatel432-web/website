import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Handshake } from 'lucide-react'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { JOINT_VENTURE as JV } from '../content'

/** Joint-venture band — carries NirJay's own brand colour as its backdrop. */
export default function JointVenture() {
  const [logoOk, setLogoOk] = useState(true)

  return (
    <section className="relative overflow-hidden py-18 md:py-24" style={{ background: JV.brand }}>
      <div className="absolute inset-0 bp-grid opacity-[0.12]" />
      <div
        className="aura drift"
        style={{ width: 620, height: 620, top: '-30%', right: '-10%', background: 'radial-gradient(circle, #5fb0e0 0%, transparent 70%)', opacity: 0.3 }}
      />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-20 items-start">
          {/* Left — the partnership */}
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] px-4 py-2 rounded-full border border-white/25 text-white/90">
                <Handshake size={14} /> {JV.eyebrow}
              </span>

              {logoOk ? (
                <img
                  src={JV.logo}
                  alt={JV.partner}
                  onError={() => setLogoOk(false)}
                  className="h-11 w-auto mt-8 mb-6"
                />
              ) : (
                <p className="mt-8 mb-6 text-2xl font-semibold tracking-tight text-white">{JV.partner}</p>
              )}

              <h2 className="display-lg text-white mb-6">{JV.title}</h2>
              <p className="text-white/70 leading-relaxed max-w-lg mb-9">{JV.text}</p>

              <Link
                to="/contact"
                viewTransition
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium transition-transform hover:-translate-y-0.5"
                style={{ color: JV.brand }}
              >
                Explore NirJay Precast <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>

          {/* Right — what the JV delivers */}
          <div className="space-y-3">
            {JV.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="group flex items-start gap-5 rounded-2xl p-5 md:p-6 border border-white/10 bg-white/[0.04] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25">
                  <div className="w-11 h-11 shrink-0 rounded-xl grid place-items-center bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon name={s.icon as never} size={20} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{s.lead}</p>
                  </div>
                  <span className="ml-auto text-xs font-medium text-white/25 tabular-nums pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
