import type { ReactNode } from "react";

type Props = {
  href: string;
  variant?: "solid" | "outline";
  external?: boolean;
  children: ReactNode;
};

const styles = {
  solid: "bg-brand text-on-brand hover:bg-brand-dim",
  outline: "border border-brand/50 text-brand hover:border-brand hover:bg-brand/10",
};

export default function Button({ href, variant = "solid", external = false, children }: Props) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-block rounded px-8 py-3 font-bold transition-colors ${styles[variant]}`}
    >
      {children}
    </a>
  );
}
