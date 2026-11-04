import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";
import Card from "./ui/Card.tsx";
import Reveal from "./ui/Reveal.tsx";
import GitHubIcon from "./ui/GitHubIcon.tsx";
import projectData from "../data/projects.json";
import generated from "../data/repos.generated.json";

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  url: string;
};

const SLOTS = 3;

// Live details (language, last update) are written at build time by scripts/fetch-repos.mjs
const repos: Repo[] = generated;
// Which projects to show, in order, is set in src/data/projects.json
const { owner, featured } = projectData;
const placeholders = Math.max(0, SLOTS - featured.length);

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
      <Reveal>
        <SectionHeading
          command="git log --projects"
          title="Selected Projects"
          text="A selection of my work. The full source for each is on GitHub."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured.map(({ name, role, description }, i) => {
          const repo = repos.find((r) => r.name.toLowerCase() === name.toLowerCase());
          const url = repo?.url ?? `https://github.com/${owner}/${name}`;

          return (
            <Reveal key={name} step={Math.min(i + 1, 3) as 1 | 2 | 3} className="h-full">
              <Card interactive className="p-8 flex flex-col h-full">
                <h3 className="text-heading text-xl font-bold break-words mb-4">{name}</h3>
                <p className="flex flex-wrap gap-2 text-xs mb-6">
                  <span className="text-on-brand bg-brand rounded px-2 py-1 font-semibold">{role}</span>
                  {repo?.language && (
                    <span className="text-brand border border-brand/40 rounded px-2 py-1">
                      {repo.language}
                    </span>
                  )}
                </p>
                <p className="mb-6 grow">{description}</p>
                {repo && (
                  <p className="text-xs mb-6">
                    updated <time dateTime={repo.pushedAt}>{timeAgo(repo.pushedAt)}</time>
                  </p>
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
                >
                  <GitHubIcon className="size-5" />
                  View on GitHub<span className="sr-only"> for {name}</span>
                </a>
              </Card>
            </Reveal>
          );
        })}

        {Array.from({ length: placeholders }, (_, i) => (
          <Reveal key={`tbd-${i}`} step={3} className="h-full">
            <div className="h-full min-h-64 flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-brand/40 p-8">
              <p className="text-brand font-semibold mb-3">$ ./next-project</p>
              <h3 className="text-heading text-xl font-bold mb-2">Coming soon</h3>
              <p className="text-sm">Something new is in the works.</p>
            </div>
          </Reveal>
        ))}
      </div>

    </Section>
  );
}
