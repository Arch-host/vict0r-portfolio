import { useEffect, useState } from 'react'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Services from './components/Services.tsx'
import Projects from './components/Projects.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import CommandPalette from './components/CommandPalette.tsx'
import { useTheme } from './hooks/useTheme.ts'

export default function App() {
  const [theme, setTheme] = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Ctrl/Cmd + K toggles the command palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-brand focus:text-on-brand focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer theme={theme} onTheme={setTheme} mode={paletteOpen ? 'COMMAND' : 'NORMAL'} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onTheme={setTheme}
      />
    </>
  )
}
