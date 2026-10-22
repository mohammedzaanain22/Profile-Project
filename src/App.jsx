import ScrollProgress from './components/layout/ScrollProgress'
import Navbar from './components/layout/Navbar'
import BackToTop from './components/layout/BackToTop'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}