// Runs before every build: pulls live stats for the repos listed in
// src/data/projects.json and saves them to src/data/repos.generated.json.
// It never fails the build. If GitHub is unreachable, the last saved data is kept.
import { readFile, writeFile } from "node:fs/promises";

const SOURCE = new URL("../src/data/projects.json", import.meta.url);
const OUTPUT = new URL("../src/data/repos.generated.json", import.meta.url);

const { owner, projects } = JSON.parse(await readFile(SOURCE, "utf8"));

let repos = {};
try {
  repos = JSON.parse(await readFile(OUTPUT, "utf8"));
} catch {
  /* first run: no previous file */
}

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "vict0r-portfolio-build",
};
// Optional: a token only raises the API rate limit. It is never sent to the browser.
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

for (const { repo } of projects) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    repos[repo] = {
      stars: data.stargazers_count,
      language: data.language,
      pushedAt: data.pushed_at,
    };
    console.log(`fetched ${repo}`);
  } catch (error) {
    console.warn(`skipped ${repo}: ${error.message} (keeping previous data)`);
  }
}

await writeFile(OUTPUT, JSON.stringify(repos, null, 2) + "\n");