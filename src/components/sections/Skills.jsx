import site from '../../data/site.json'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const wide = [0, 3]

export default function Skills() {
  const { skills } = site

  return (
    <section id="skills" className="bg-bg2 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionTitle eyebrow={skills.eyebrow}>{skills.title}</SectionTitle>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {skills.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 100}
              className={`h-full ${wide.includes(i) ? 'md:col-span-2' : ''}`}
            >
              <article
                className={`h-full rounded-3xl border border-line p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand ${
                  wide.includes(i)
                    ? 'bg-linear-to-br from-brand/25 to-card'
                    : 'bg-card'
                }`}
              >
                <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-mut">{item.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-bg/40 px-3 py-1 text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}