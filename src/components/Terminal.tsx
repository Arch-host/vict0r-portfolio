import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion.ts";

type Step = { cmd: string; out: string[] };

const SCRIPT: Step[] = [
  { cmd: "whoami", out: ["vict0r, full-stack developer & AI enthusiast"] },
  { cmd: "cat stack.txt", out: ["React, TypeScript, Node.js, MongoDB", "Linux, Git, GitHub, Tailwind"] },
  { cmd: "ls projects/", out: ["BokuSuperMarket/  student-api/  React24-7/"] },
];

const TICK_MS = 45; // one tick = one typed character
const PAUSE = 10; // ticks of "thinking" after each command

// Precompute when each command starts so rendering is a pure function of `tick`
const STEPS = SCRIPT.map((step, i) => ({
  ...step,
  start: SCRIPT.slice(0, i).reduce((sum, s) => sum + s.cmd.length + PAUSE, 0),
}));
const TOTAL = SCRIPT.reduce((sum, s) => sum + s.cmd.length + PAUSE, 0);

export default function Terminal() {
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
      aria-label="Terminal window listing who I am, my stack and my projects"
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
