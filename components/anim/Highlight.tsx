"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  start = "top 85%",
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
    const overs = el.querySelectorAll<HTMLElement>(".hl-over");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(overs, { clipPath: "inset(0 0% 0 0)" });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start, once: true },
    });

    tl.from(el, { opacity: 0, y: 32, duration: 0.9, ease: "power3.out" });
    if (overs.length) {
      tl.to(
        overs,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.85,
          ease: "power4.inOut",
          stagger: 0.18,
        },
        "-=0.35"
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
