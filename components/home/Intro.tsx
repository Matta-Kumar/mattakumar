"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const STATEMENT =
  "Attention is scattered — across Google, AI answers, feeds, and inboxes. Winning it takes more than ads or rankings. It takes one strategy, executed across every touchpoint — by someone who has done it through every era of search.";

export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);

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
      split = new SplitText(el, { type: "words" });
      el.classList.add("is-ready");
      gsap.set(split.words, { opacity: 0.12 });
      tween = gsap.to(split.words, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section className="px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-6xl">
        <p className="label text-signal mb-10">How we think</p>
        <p
          ref={ref}
          data-split
          className="display text-3xl md:text-[3.4rem] leading-[1.12]"
        >
          {STATEMENT}
        </p>
      </div>
    </section>
  );
}
