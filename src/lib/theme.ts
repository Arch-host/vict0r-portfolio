export const THEMES = [
  { id: "green", label: "Green phosphor", swatch: "#00ff9c" },
  { id: "amber", label: "Amber CRT", swatch: "#ffb000" },
  { id: "cyan", label: "Cyan", swatch: "#00e5ff" },
  { id: "paper", label: "Paper (light)", swatch: "#0a7a4b" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "vict0r-theme";

const isTheme = (value: unknown): value is ThemeId =>
  THEMES.some((theme) => theme.id === value);

export function readTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isTheme(saved) ? saved : "green";
  } catch {
    return "green"; // storage blocked (private mode, etc.)
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
