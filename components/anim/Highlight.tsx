"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Inline "text selection" highlight. Wrap emphasized words inside an HlTitle. */
export function Hl({ children }: { children: ReactNode }) {
  return (
    <span className="hl">
      <span>{children}</span>
      <span className="hl-over" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

/**
 * Section title that fades up on view, then sweeps a violet selection block
 * across any <Hl> segments — like text being selected left to right.
 */
export default function HlTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal-up${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
