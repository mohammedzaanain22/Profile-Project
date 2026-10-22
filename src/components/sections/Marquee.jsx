import site from '../../data/site.json'

const fade =
  'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'

export default function Marquee() {
  const items = [...site.marquee, ...site.marquee]

  return (
    <div
      aria-hidden="true"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      className="overflow-hidden border-y border-line bg-bg2 py-5"
    >
      <div className="flex w-max animate-marquee font-display text-lg font-semibold text-mut hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-12 pr-12">
            {text}
            <span className="text-brand2">-</span>
          </span>
        ))}
      </div>
    </div>
  )
}