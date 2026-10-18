import ThemeSwitcher from "./ui/ThemeSwitcher.tsx";
import GitHubIcon from "./ui/GitHubIcon.tsx";
import { GITHUB_URL } from "../data/site.ts";
import type { ThemeId } from "../lib/theme.ts";

type Props = {
  theme: ThemeId;
  onTheme: (id: ThemeId) => void;
  mode: "NORMAL" | "COMMAND";
};

// A vim/tmux-style status bar
export default function Footer({ theme, onTheme, mode }: Props) {
  return (
    <footer className="border-t border-brand/30 bg-panel px-6 md:px-16 text-sm">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <div className="flex items-center gap-3">
          <span className="bg-brand text-on-brand font-bold px-2 py-0.5">{mode}</span>
          <span>main</span>
        </div>

        <ThemeSwitcher theme={theme} onChange={onTheme} />

        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} vict0r</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:text-brand transition-colors"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a href="#home" className="hover:text-brand transition-colors">top</a>
        </div>
      </div>
    </footer>
  );
}
