import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";
import Card from "./ui/Card.tsx";

const icons = {
  code: <path d="M8 4L3 12l5 8M16 4l5 8-5 8" />,
  ai: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </>
  ),
  video: (
    <>
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </>
  ),
};

type Service = { title: string; description: string; icon: keyof typeof icons };

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Full-stack apps built with React, TypeScript, Node.js, and MongoDB, from first commit to production deploy.",
    icon: "code",
  },
  {
    title: "AI Integration",
    description:
      "Practical AI tooling built into real products, backed by ALX certification, not just buzzwords.",
    icon: "ai",
  },
  {
    title: "Videography",
    description:
      "Visual storytelling through editing and content production, a creative complement to the technical work.",
    icon: "video",
  },
];

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        command="ls services/"
        title="Services & Skills"
        text="A mix of technical build work and creative production: three areas where I actually spend my time."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map(({ title, description, icon }) => (
          <Card key={title} interactive className="p-8 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-12 mx-auto mb-6 text-brand"
            >
              {icons[icon]}
            </svg>
            <h3 className="text-heading text-xl font-bold mb-4">{title}</h3>
            <p className="mb-6">{description}</p>
            <a href="#contact" className="text-brand font-semibold hover:underline">
              Start a project
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
}
