import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";
import Button from "./ui/Button.tsx";
import Reveal from "./ui/Reveal.tsx";
import ThemeSwitcher from "./ui/ThemeSwitcher.tsx";
import { EMAIL } from "../data/site.ts";
import type { ThemeId } from "../lib/theme.ts";

type Props = { theme: ThemeId; onTheme: (id: ThemeId) => void };

// Closing call-to-action, plus the vim/tmux-style status bar at the very bottom
export default function Contact({ theme, onTheme }: Props) {
  return (
    <>
      <Section id="contact">
        <Reveal>
          <SectionHeading
            command="mail --to vict0r"
            title="Let's Work Together"
            text="Hiring or have a project in mind? Send me an email and I'll get back to you."
          />
        </Reveal>
        <Reveal step={1} className="flex flex-wrap justify-center gap-4">
          <Button href={`mailto:${EMAIL}`}>Email Me</Button>
        </Reveal>
      </Section>

      <footer className="border-t border-brand/30 bg-panel px-6 md:px-16 text-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
          <div className="flex items-center gap-3">
            <span className="bg-brand text-on-brand font-bold px-2 py-0.5">NORMAL</span>
            <span>main</span>
          </div>

          <ThemeSwitcher theme={theme} onChange={onTheme} />

          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} vict0r</span>
            <a href="#home" className="hover:text-brand transition-colors">top</a>
          </div>
        </div>
      </footer>
    </>
  );
}
