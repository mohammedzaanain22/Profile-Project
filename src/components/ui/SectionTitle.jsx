export default function SectionTitle({ eyebrow, children }) {
  return (
    <>
      <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-brand2 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-tight font-extrabold tracking-tight">
        {children}
      </h2>
    </>
  )
}