import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";
import Card from "./ui/Card.tsx";
import GitHubIcon from "./ui/GitHubIcon.tsx";
import projectData from "../data/projects.json";
import generated from "../data/repos.generated.json";

type RepoStats = { stars: number; language: string | null; pushedAt: string };

// Live numbers written at build time by scripts/fetch-repos.mjs
const stats: Record<string, RepoStats | undefined> = generated;

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
        text="A few things I've built and shipped. Full source is available on GitHub."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectData.projects.map(({ repo, description, tech }) => {
          const live = stats[repo];
          return (
            <Card key={repo} interactive className="p-8 flex flex-col">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                <h3 className="text-heading text-xl font-bold">{repo}</h3>
                <span className="text-xs text-brand border border-brand/40 rounded px-2 py-1">
                  {live?.language ?? tech}
                </span>
              </div>
              <p className="mb-6 grow">{description}</p>
              {live && (
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-6">
                  <span className="inline-flex items-center gap-1" title="GitHub stars">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-brand" aria-hidden="true">
                      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
                    </svg>
                    {live.stars}
                    <span className="sr-only"> stars</span>
                  </span>
                  <span>
                    updated <time dateTime={live.pushedAt}>{timeAgo(live.pushedAt)}</time>
                  </span>
                </p>
              )}
              <a
                href={`https://github.com/${projectData.owner}/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
              >
                <GitHubIcon className="size-5" />
                View on GitHub
              </a>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}