import { useEffect, useRef, type ReactNode } from "react";

// Full class names (not built dynamically) so Tailwind can see them
const DELAYS = ["", "delay-100", "delay-200", "delay-300", "delay-500"];

type Props = { step?: 0 | 1 | 2 | 3 | 4; className?: string; children: ReactNode };

// Fades and slides its children up once they scroll into view.
// `step` staggers siblings so they cascade in. The CSS lives in index.css.
export default function Reveal({ step = 0, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.in = "true";
        observer.disconnect(); // animate once, then stop watching
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${DELAYS[step]} ${className}`}>
      {children}
    </div>
  );
}
