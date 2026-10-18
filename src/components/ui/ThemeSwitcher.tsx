import { THEMES, type ThemeId } from "../../lib/theme.ts";

type Props = { theme: ThemeId; onChange: (id: ThemeId) => void };

export default function ThemeSwitcher({ theme, onChange }: Props) {
  return (
    <div role="group" aria-label="Color theme" className="flex items-center">
      {THEMES.map(({ id, label, swatch }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-label={label}
          aria-pressed={theme === id}
          title={label}
          className="p-2"
        >
          <span
            className={`block size-4 rounded-full border border-fg/40 ${
              theme === id ? "ring-2 ring-brand ring-offset-2 ring-offset-panel" : ""
            }`}
            style={{ backgroundColor: swatch }}
          />
        </button>
      ))}
    </div>
  );
}
