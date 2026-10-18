import type { ReactNode } from "react";

type Props = { id?: string; children: ReactNode };

// Two-layer container: full-width outer + centered inner, so every section aligns
export default function Section({ id, children }: Props) {
  return (
    <section id={id} className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}
