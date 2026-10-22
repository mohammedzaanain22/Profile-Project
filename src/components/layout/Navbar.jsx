import { useEffect, useState } from 'react'
import site from '../../data/site.json'
import useTheme from '../../hooks/useTheme'
import { FiSun, FiMoon } from 'react-icons/fi'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const {theme , toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const link =
    'rounded-xl px-4 py-2 font-medium text-mut transition hover:bg-card hover:text-ink'

  return (
   
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition ${
        scrolled || open
          ? 'border-b border-line bg-bg/80 backdrop-blur-md'
          : ''
      }`}
    >
      <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6">
        <a href="#top" className="font-display text-xl font-extrabold">
          {site.name}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {site.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={link}>
              {n.label}
            </a>
          ))}
            <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="ml-2  flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card
                 
                " >
                {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
            </div>

        <div className="flex items-center gap-2 mx-1 md:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-10 w-10 rounded-xl border border-line bg-card  flex items-center justify-center"
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 px-6 pb-5 md:hidden">
          {site.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className={link}>
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}