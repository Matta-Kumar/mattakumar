"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  immediate?: boolean;
};

export default function SplitReveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.09,
  start = "top 85%",
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-ready");
      return;
    }

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = new SplitText(el, { type: "lines", mask: "lines" });
      el.classList.add("is-ready");
      tween = gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.2,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start, once: true },
      });
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [delay, stagger, start, immediate]);

  return (
    <Tag ref={ref} data-split className={className}>
      {children}
    </Tag>
  );
}
