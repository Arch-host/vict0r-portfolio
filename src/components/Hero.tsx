import Section from "./ui/Section.tsx";
import Button from "./ui/Button.tsx";
import Terminal from "./Terminal.tsx";

export default function Hero() {
  return (
    <Section id="home">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <p className="inline-flex items-center gap-2 border border-brand/40 rounded-full px-3 py-1 text-sm mb-6">
            <span className="size-2 rounded-full bg-brand animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            Available for freelance work
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-heading mb-6 leading-tight text-balance">
            Building Clean Code in the Terminal Age
          </h1>
          <p className="mb-8">
            ALX-certified, Linux-native, and fluent across the modern stack: from React and
            TypeScript to Node.js and MongoDB. This is where I build, break, and ship things.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button href="#projects">View My Work</Button>
            <Button href="#contact" variant="outline">Get in Touch</Button>
          </div>
        </div>

        <div className="flex-1 w-full min-w-0">
          <Terminal />
        </div>
      </div>
    </Section>
  );
}
