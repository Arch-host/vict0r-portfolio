export const THEMES = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "vict0r-theme";

const isTheme = (value: unknown): value is ThemeId =>
  THEMES.some((theme) => theme.id === value);

export function readTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isTheme(saved) ? saved : "system";
  } catch {
    return "system"; // storage blocked (private mode, etc.)
  }
}

export function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage blocked: the theme still applies for this visit */
  }
}