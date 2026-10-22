import site from '../../data/site.json'
import useTypewriter from '../../hooks/useTypewriter'
import RobotScene from '../three/RobotScene'
export default function Hero() {
  const { hero } = site
  const typed = useTypewriter(hero.words)
  const [first, ...rest] = site.name.split(' ')

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      <div className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-brand opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-32 h-[420px] w-[420px] rounded-full bg-brand2 opacity-25 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm font-semibold hover:bg-card/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {hero.status}
          </span>

          <h1 className="mt-5 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[1.05] font-extrabold tracking-tight">
            {first}
            <br />
            <span className="bg-linear-to-r from-brand to-brand2 bg-clip-text text-transparent">
              {rest.join(' ')}
            </span>
          </h1>

          <p className="mt-4 h-8 text-xl font-semibold text-mut">
            {hero.prefix}{' '}
            <span className="text-brand2">{typed}</span>
            <span className="animate-pulse text-brand2"> |
            </span>
          </p>

          <p className="mt-3 max-w-lg text-lg text-mut">{hero.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-2xl bg-linear-to-r from-brand to-brand2 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5"
            >
              {hero.primaryButton}
            </a>
            <a
              href="#contact"
              className="rounded-2xl border border-line bg-card px-7 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:border-brand2"
            >
              {hero.secondaryButton}
            </a>
          </div>
        </div>

        <div className="mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-3xl  ">
          
          <RobotScene />
        </div>
      </div>
    </section>
  )
}