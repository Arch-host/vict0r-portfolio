// Runs before every build: asks GitHub for details (language, last update) of the
// projects listed under "featured" in src/data/projects.json and saves them to
// src/data/repos.generated.json.
// It never fails the build. If GitHub can't be reached for a repo, its last saved data is kept.
import { readFile, writeFile } from "node:fs/promises";

const SOURCE = new URL("../src/data/projects.json", import.meta.url);
const OUTPUT = new URL("../src/data/repos.generated.json", import.meta.url);

const { owner, featured = [] } = JSON.parse(await readFile(SOURCE, "utf8"));

let previous = [];
try {
  previous = JSON.parse(await readFile(OUTPUT, "utf8"));
} catch {
  /* first run: nothing saved yet */
}

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "vict0r-portfolio-build",
};
// Optional: a token only raises the API rate limit. It is never sent to the browser.
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const results = await Promise.all(
  featured.map(async ({ name }) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const repo = await res.json();
      return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        pushedAt: repo.pushed_at,
        url: repo.html_url,
      };
    } catch (error) {
      console.warn(`${name}: GitHub fetch failed (${error.message}). Keeping previous data.`);
      return previous.find((repo) => repo.name.toLowerCase() === name.toLowerCase());
    }
  }),
);

const repos = results.filter(Boolean);
await writeFile(OUTPUT, JSON.stringify(repos, null, 2) + "\n");
console.log(`saved: ${repos.map((repo) => repo.name).join(", ") || "(none)"}`);
