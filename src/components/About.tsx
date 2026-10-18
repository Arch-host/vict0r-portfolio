import Section from "./ui/Section.tsx";
import Card from "./ui/Card.tsx";
import Button from "./ui/Button.tsx";

const points = [
  "Full-stack development across React, TypeScript, Node.js, and MongoDB",
  "ALX-certified AI enthusiast, always exploring what's next",
  "Comfortable in Linux environments, Git and GitHub workflows",
  "Also mid-level in videography: visual storytelling on the side",
];

const stack = [
  { group: "frontend", items: "React, TypeScript, Tailwind, HTML, CSS" },
  { group: "backend", items: "Node.js, MongoDB" },
  { group: "tools", items: "Linux, Git, GitHub" },
  { group: "also", items: "AI tooling (ALX certified), videography" },
];

export default function About() {
  return (
    <Section id="about">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
            Exclusive Skills, Delivered Right
          </h2>
          <p className="mb-6">
            A developer's toolkit built for real-world problems, from backend logic to frontend
            polish, with a growing focus on AI tooling.
          </p>
          <ul className="space-y-4 mb-8">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="text-brand font-bold" aria-hidden="true">&gt;</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Button href="#services" variant="outline">See What I Do</Button>
        </div>

        <Card className="w-full max-w-md p-6 text-sm">
          <p className="text-brand font-semibold mb-4">stack.json</p>
          <dl className="space-y-3">
            {stack.map(({ group, items }) => (
              <div key={group} className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="text-brand sm:w-24 shrink-0">{group}</dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </Section>
  );
}
