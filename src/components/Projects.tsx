import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";
import Card from "./ui/Card.tsx";
import Button from "./ui/Button.tsx";
import GitHubIcon from "./ui/GitHubIcon.tsx";
import projectData from "../data/projects.json";
import generated from "../data/repos.generated.json";
import { GITHUB_URL } from "../data/site.ts";

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  url: string;
};

// Written at build time by scripts/fetch-repos.mjs
const repos: Repo[] = generated;
// Optional hand-written descriptions that replace the GitHub ones
const descriptions: Record<string, string | undefined> = projectData.descriptions;

const NOW = Date.now();
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function timeAgo(iso: string) {
  const days = Math.round((new Date(iso).getTime() - NOW) / 86_400_000);
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        command="git log --projects"
        title="Recent Projects"
        text="My latest work, pulled straight from GitHub. Full source is available there."
      />

      {repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {repos.map(({ name, description, language, stars, pushedAt, url }) => (
            <Card key={name} interactive className="p-8 flex flex-col">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                <h3 className="text-heading text-xl font-bold break-all">{name}</h3>
                {language && (
                  <span className="text-xs text-brand border border-brand/40 rounded px-2 py-1">
                    {language}
                  </span>
                )}
              </div>
              <p className="mb-6 grow">{descriptions[name] ?? description ?? "No description yet."}</p>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-6">
                <span className="inline-flex items-center gap-1" title="GitHub stars">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-brand" aria-hidden="true">
                    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
                  </svg>
                  {stars}
                  <span className="sr-only"> stars</span>
                </span>
                <span>
                  updated <time dateTime={pushedAt}>{timeAgo(pushedAt)}</time>
                </span>
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
              >
                <GitHubIcon className="size-5" />
                View on GitHub
              </a>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Button href={`${GITHUB_URL}?tab=repositories`} variant="outline" external>
          See All Repositories
        </Button>
      </div>
    </Section>
  );
}