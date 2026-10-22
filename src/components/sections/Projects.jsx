import site from '../../data/site.json'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

function ProjectCard({ p }) {
  const linkClass =
    'rounded-xl border border-line px-4 py-2 text-sm font-semibold transition hover:border-brand2 hover:text-brand2'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition duration-300 hover:-translate-y-1.5 hover:border-brand">
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-brand/40 to-brand2/30">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-7xl font-extrabold text-white/30">
            {p.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold">{p.title}</h3>
        <p className="mt-2 flex-1 text-mut">{p.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-bg/40 px-3 py-1 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {(p.demo || p.code) && (
          <div className="mt-5 flex gap-3">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Live demo
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const { projects } = site

  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionTitle eyebrow={projects.eyebrow}>{projects.title}</SectionTitle>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="h-full">
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}