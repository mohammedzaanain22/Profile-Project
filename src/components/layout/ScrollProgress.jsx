import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      bar.current.style.transform = `scaleX(${progress})`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={bar}
      style={{ transform: 'scaleX(0)' }}
      className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-linear-to-r from-brand to-brand2"
    />
  )
}