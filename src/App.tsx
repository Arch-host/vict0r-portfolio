import Hero from './components/Hero.tsx'
import Projects from './components/Projects.tsx'
import Contact from './components/Contact.tsx'
import { useTheme } from './hooks/useTheme.ts'

export default function App() {
  const [theme, setTheme] = useTheme()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-brand focus:text-on-brand focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <main id="main">
        <Hero />
        <Projects />
        <Contact theme={theme} onTheme={setTheme} />
      </main>
    </>
  )
}
