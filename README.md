# VICT0R portfolio

React + TypeScript + Tailwind v4 (Vite). Terminal-themed single-page portfolio.

## Run

```bash
npm install
npm run dev       # local dev server
npm run lint
npm run build     # type-check + production build -> dist/
npm run preview   # serve the production build locally
```

## Before you deploy

1. Replace `EMAIL` in `src/data/site.ts` (it is a placeholder).
2. Add `og:image` and `og:url` to `index.html` once you have a domain.
3. `public/_headers` holds the security headers (Cloudflare Pages / Netlify).

## Structure

```
src/
  components/      sections (Hero, About, ...), Terminal, CommandPalette, Header, Footer
  components/ui/   Section, SectionHeading, Card, Button, ThemeSwitcher, GitHubIcon
  hooks/           useScrollSpy, useTheme, useReducedMotion
  lib/theme.ts     theme list + localStorage helpers
  data/site.ts     nav, links, email
  index.css        theme tokens (colors per data-theme)
```

Change colors in `src/index.css`. Add a theme by adding a `[data-theme="x"]` block
and an entry in `THEMES` (`src/lib/theme.ts`).
