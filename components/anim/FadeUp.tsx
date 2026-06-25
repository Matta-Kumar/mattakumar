"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
};

export default function FadeUp({
  children,
  className,
  delay = 0,
  y = 40,
  start = "top 88%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.from(el, {
      opacity: 0,
      y,
      duration: 1.1,
      ease: "power3.out",
      delay,
      scrollTrigger: { trigger: el, start, once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
