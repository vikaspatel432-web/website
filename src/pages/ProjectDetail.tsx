import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Target } from 'lucide-react'
import Reveal from '../components/Reveal'
import { CTABand } from '../components/ui'
import { PROJECTS } from '../content'
import useSEO from '../useSEO'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = PROJECTS.find((p) => p.slug === slug)
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  const next = index >= 0 ? PROJECTS[(index + 1) % PROJECTS.length] : null

  useSEO({
    title: project
      ? `${project.title} — ${project.sector} Case Study | SP Consultants`
      : 'Project | SP Consultants',
    description: project?.text ?? 'BIM and reality capture case study by SP Consultants.',
    path: `/projects/${slug ?? ''}`,
  })

  if (!project) return <Navigate to="/projects" replace />

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden bg-black">
        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <div className="container-x relative h-full flex flex-col justify-end pb-10">
          <Link
            to="/projects"
            viewTransition
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-4 w-fit"
          >
            <ArrowLeft size={16} /> All projects
          </Link>
          <p className="label-mono text-white/80 mb-2">{project.sector}</p>
          <h1 className="h-display text-white text-3xl md:text-5xl max-w-3xl">{project.title}</h1>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-12">
          <div className="space-y-12">
            <Reveal>
              <div>
                <p className="label-mono mb-3 inline-flex items-center gap-2">
                  <Target size={14} /> The challenge
                </p>
                <p className="text-lg leading-relaxed text-muted">{project.challenge}</p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <p className="label-mono mb-5">Our approach</p>
                <ol className="space-y-5">
                  {project.approach.map((step, i) => (
                    <li key={step} className="flex gap-5">
                      <span
                        className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-sm font-semibold text-accent"
                        style={{ background: 'var(--surface-2)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="pt-1.5 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal delay={100}>
              <div className="card p-7">
                <p className="label-mono mb-4">What we delivered</p>
                <ul className="space-y-3">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={17} className="text-accent shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="card p-7">
                <p className="label-mono mb-4">Capabilities used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-line text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <section className="container-x pb-20">
          <Link
            to={`/projects/${next.slug}`}
            viewTransition
            className="card group flex items-center justify-between gap-6 p-7 hover:border-accent hover:-translate-y-1"
          >
            <div>
              <p className="label-mono mb-1">Next project</p>
              <p className="font-display text-xl md:text-2xl font-semibold">{next.title}</p>
            </div>
            <ArrowRight size={22} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      )}

      <CTABand />
    </>
  )
}
