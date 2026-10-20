import type { ReactNode } from "react";
import { THEMES, type ThemeId } from "../../lib/theme.ts";

type Props = { theme: ThemeId; onChange: (id: ThemeId) => void };

const icons: Record<ThemeId, ReactNode> = {
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
};

export default function ThemeSwitcher({ theme, onChange }: Props) {
  return (
    <div role="group" aria-label="Color theme" className="flex items-center rounded border border-brand/40 p-0.5">
      {THEMES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-label={label}
          aria-pressed={theme === id}
          title={label}
          className={`rounded p-1.5 transition-colors ${
            theme === id ? "bg-brand text-on-brand" : "hover:text-brand"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
            {icons[id]}
          </svg>
        </button>
      ))}
    </div>
  );
}