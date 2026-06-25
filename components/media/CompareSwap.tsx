"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Before/after swap driven by scroll: the section pins, and the "after"
 * layer wipes across the "before" layer via clip-path as the user scrolls.
 * Pass any two same-composition visuals (images, screenshots, mock UIs).
 */
type Props = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export default function CompareSwap({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const afterEl = afterRef.current;
    const seam = seamRef.current;
    if (!section || !afterEl || !seam) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(afterEl, { clipPath: "inset(0 0% 0 0)" });
      gsap.set(seam, { opacity: 0 });
      return;
    }

    gsap.set(afterEl, { clipPath: "inset(0 100% 0 0)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 0.5,
      },
    });

    tl.to(afterEl, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0).fromTo(
      seam,
      { left: "0%" },
      { left: "100%", ease: "none" },
      0
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      <div className="relative h-svh overflow-hidden">
        <div className="absolute inset-0">{before}</div>
        <div ref={afterRef} className="absolute inset-0 will-change-[clip-path]">
          {after}
        </div>
        <div
          ref={seamRef}
          className="absolute top-0 bottom-0 w-px bg-paper/40 pointer-events-none"
          aria-hidden="true"
        />
        <span className="label absolute bottom-8 left-6 md:left-12 text-paper/60">
          {beforeLabel}
        </span>
        <span className="label absolute bottom-8 right-6 md:right-12 text-paper/60">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
