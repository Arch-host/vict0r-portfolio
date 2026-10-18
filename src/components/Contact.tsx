import Section from "./ui/Section.tsx";
import SectionHeading from "./ui/SectionHeading.tsx";
import Button from "./ui/Button.tsx";
import { EMAIL, GITHUB_URL } from "../data/site.ts";

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        command="mail --to vict0r"
        title="Let's Work Together"
        text="Have a project, a gig, or a question? Send a message and I'll get back to you."
      />
      <div className="flex flex-wrap justify-center gap-4">
        <Button href={`mailto:${EMAIL}`}>Email Me</Button>
        <Button href={GITHUB_URL} variant="outline" external>
          GitHub
        </Button>
      </div>
    </Section>
  );
}
