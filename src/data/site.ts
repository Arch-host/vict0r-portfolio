export const GITHUB_URL = "https://github.com/Arch-host";

export const EMAIL = "webneth99@gmail.com";

export const NAV = [
  { id: "home", label: "home" },
  { id: "services", label: "services" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
] as const;

export const NAV_IDS = NAV.map((item) => item.id);
