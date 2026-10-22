import site from '../../data/site.json'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'
import SectionTitle from '../ui/SectionTitle'

export default function About() {
  const { about } = site
  const [before, after] = about.title.split(about.highlight)

  return (
    <section id="about" className="py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-[.8fr_1.2fr]">
       <Reveal>
  <div className="relative mx-auto max-w-sm animate-float motion-reduce:animate-none md:max-w-none">
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-card">
      {about.photo ? (
        <img
          src={about.photo}
          alt={site.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-mut">
          Your photo here
        </div>
      )}
    </div>
  </div>
</Reveal>

        <div>
          <Reveal>
            <SectionTitle eyebrow={about.eyebrow}>
              {before}
              <span className="bg-linear-to-r from-brand to-brand2 bg-clip-text text-transparent">
                {about.highlight}
              </span>
              {after}
            </SectionTitle>
          </Reveal>

          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={100 + i * 100}>
              <p className="mt-5 max-w-xl text-lg text-mut">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <div className="mt-10 flex gap-10">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <b className="block font-display text-4xl font-extrabold">
                    <CountUp to={s.value} />
                  </b>
                  <span className="text-sm text-mut">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}