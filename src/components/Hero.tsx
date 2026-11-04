import { useEffect, useState } from "react";
import Section from "./ui/Section.tsx";
import Button from "./ui/Button.tsx";
import Reveal from "./ui/Reveal.tsx";
import GitHubIcon from "./ui/GitHubIcon.tsx";
import { CV_URL, GITHUB_URL } from "../data/site.ts";
import { useReducedMotion } from "../hooks/useReducedMotion.ts";

type Step = { cmd: string; out: string[] };

const SCRIPT: Step[] = [
  { cmd: "whoami", out: ["vict0r, full-stack developer & AI enthusiast"] },
  { cmd: "cat stack.txt", out: ["React, TypeScript, Node.js, MongoDB", "Linux, Git, GitHub, Tailwind"] },
  { cmd: "ls links/", out: ["github.url  cv.pdf  email.txt"] },
];

const TICK_MS = 45; // one tick = one typed character
const PAUSE = 10; // ticks of "thinking" after each command

// Precompute when each command starts so rendering is a pure function of `tick`
const STEPS = SCRIPT.map((step, i) => ({
  ...step,
  start: SCRIPT.slice(0, i).reduce((sum, s) => sum + s.cmd.length + PAUSE, 0),
}));
const TOTAL = SCRIPT.reduce((sum, s) => sum + s.cmd.length + PAUSE, 0);

function Terminal() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  const t = reduced ? TOTAL : tick;
  const done = t >= TOTAL;

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setTick((n) => n + 1), TICK_MS);
    return () => clearInterval(id);
  }, [done]);

  return (
    <div
      role="img"
      aria-label="Terminal window listing who I am, my stack and my links"
      className="rounded-lg border border-brand/40 bg-panel text-xs sm:text-sm overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-brand/30 px-4 py-2">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-400" />
        <span className="size-3 rounded-full bg-brand" />
        <span className="ml-2 truncate">vict0r@portfolio: ~</span>
      </div>

      <div className="min-h-64 p-4 space-y-3 break-words">
        {STEPS.map(({ cmd, out, start }) => {
          const at = t - start;
          if (at < 0) return null;
          return (
            <div key={cmd}>
              <p>
                <span className="text-brand">$ </span>
                <span className="text-heading">{cmd.slice(0, at)}</span>
              </p>
              {at >= cmd.length + 3 && out.map((line) => <p key={line}>{line}</p>)}
            </div>
          );
        })}
        {done && (
          <p>
            <span className="text-brand">$ </span>
            <span className="inline-block w-2 h-4 align-middle bg-brand animate-blink motion-reduce:animate-none" />
          </p>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <Section id="home">
      <div className="flex flex-col md:flex-row items-center gap-10 md:py-8">
        <div className="flex-1 text-center md:text-left">
          <Reveal>
            <p className="inline-flex items-center gap-2 border border-brand/40 rounded-full px-3 py-1 text-sm mb-6">
              <span className="size-2 rounded-full bg-brand animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              Open to work &amp; freelance
            </p>
          </Reveal>
          <Reveal step={1}>
            <h1 className="text-4xl lg:text-5xl font-bold text-heading mb-6 leading-tight text-balance">
              I build clean, reliable web applications
            </h1>
          </Reveal>
          <Reveal step={2}>
            <p className="mb-8">
              Full-stack developer. Explore my projects on GitHub, or read my CV to learn more.
            </p>
          </Reveal>
          <Reveal step={3} className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button href={GITHUB_URL} external>
              <GitHubIcon className="size-5" />
              View GitHub
            </Button>
            <Button href={CV_URL} variant="outline" external>
              View CV
            </Button>
          </Reveal>
        </div>

        <Reveal step={2} className="flex-1 w-full min-w-0">
          <Terminal />
        </Reveal>
      </div>
    </Section>
  );
}
