// Runs before every build: asks GitHub for your newest public repos and saves
// them to src/data/repos.generated.json (see src/data/projects.json for the settings).
// It never fails the build. If GitHub is unreachable, the last saved file is kept.
import { readFile, writeFile } from "node:fs/promises";

const SOURCE = new URL("../src/data/projects.json", import.meta.url);
const OUTPUT = new URL("../src/data/repos.generated.json", import.meta.url);

const { owner, count = 3, sort = "pushed", exclude = [] } = JSON.parse(
  await readFile(SOURCE, "utf8"),
);

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "vict0r-portfolio-build",
};
// Optional: a token only raises the API rate limit. It is never sent to the browser.
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const url = `https://api.github.com/users/${owner}/repos?sort=${sort}&direction=desc&per_page=50`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const repos = (await res.json())
    .filter((repo) => !repo.fork && !repo.archived && !exclude.includes(repo.name))
    .slice(0, count)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
      url: repo.html_url,
    }));

  await writeFile(OUTPUT, JSON.stringify(repos, null, 2) + "\n");
  console.log(`saved: ${repos.map((repo) => repo.name).join(", ")}`);
} catch (error) {
  console.warn(`GitHub fetch failed (${error.message}). Keeping the previous data.`);
}