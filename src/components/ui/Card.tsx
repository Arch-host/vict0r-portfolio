import type { ReactNode } from "react";

type Props = { interactive?: boolean; className?: string; children: ReactNode };

const hover =
  "hover:border-brand hover:shadow-[0_0_20px_color-mix(in_srgb,var(--brand)_15%,transparent)]";

export default function Card({ interactive = false, className = "", children }: Props) {
  return (
    <div
      className={`border border-brand/30 rounded-lg bg-panel transition-all ${interactive ? hover : ""} ${className}`}
    >
      {children}
    </div>
  );
}
