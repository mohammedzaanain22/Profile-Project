import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to, duration = 1200 }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    let raf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          setN(Math.round(to * p))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])

  return <span ref={ref}>{n}+</span>
}