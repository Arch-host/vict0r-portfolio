import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";
import Card from "./ui/Card.tsx";
import GitHubIcon from "./ui/GitHubIcon.tsx";

type Project = { name: string; description: string; tech: string; repoUrl: string };

const projects: Project[] = [
  {
    name: "BokuSuperMarket",
    description:
      "An inventory management system for tracking stock and store operations, built with TypeScript.",
    tech: "TypeScript",
    repoUrl: "https://github.com/Arch-host/BokuSuperMarket",
  },
  {
    name: "student-api",
    description:
      "A backend REST API for managing student records, focused on clean, testable endpoint design.",
    tech: "JavaScript",
    repoUrl: "https://github.com/Arch-host/student-api",
  },
  {
    name: "React24-7",
    description:
      "A reviews platform built in React, exploring dynamic UI state and real-time content updates.",
    tech: "React",
    repoUrl: "https://github.com/Arch-host/React24-7",
  },
];

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        command="git log --projects"
        title="Recent Projects"
        text="A few things I've built and shipped. Full source is available on GitHub."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map(({ name, description, tech, repoUrl }) => (
          <Card key={name} interactive className="p-8 flex flex-col">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
              <h3 className="text-heading text-xl font-bold">{name}</h3>
              <span className="text-xs text-brand border border-brand/40 rounded px-2 py-1">{tech}</span>
            </div>
            <p className="mb-8 grow">{description}</p>
            <a
              href={repoUrl}
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
    </Section>
  );
}
