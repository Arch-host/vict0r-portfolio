import { useState } from "react";
import { NAV, NAV_IDS } from "../data/site.ts";
import { useScrollSpy } from "../hooks/useScrollSpy.ts";

type Props = { onOpenPalette: () => void };

export default function Header({ onOpenPalette }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(NAV_IDS);

  return (
    <header
      onKeyDown={(e) => e.key === "Escape" && setMenuOpen(false)}
      className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-brand/30 px-6 md:px-16 py-3"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <a href="#home" className="font-bold text-heading whitespace-nowrap">
          vict0r<span className="text-brand">@portfolio</span>
          <span className="hidden sm:inline">:~$</span>
        </a>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${menuOpen ? "flex" : "hidden"} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-bg md:bg-transparent border-b md:border-0 border-brand/30 p-6 md:p-0`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 w-full text-center">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === id ? "location" : undefined}
                  className={`transition-colors hover:text-brand ${
                    active === id ? "text-brand underline underline-offset-8" : ""
                  }`}
                >
                  ~/{label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="border border-brand/40 rounded px-2 py-1 text-sm text-brand hover:border-brand transition-colors"
          >
            <span className="hidden sm:inline">Ctrl K</span>
            <span className="sm:hidden" aria-hidden="true">&gt;_</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-brand"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
