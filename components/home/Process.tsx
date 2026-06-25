"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import Magnetic from "@/components/anim/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    when: "Weeks 1–2",
    title: "Audit",
    body: "Where you stand today — rankings, AI visibility, site health, ad accounts, funnel leaks. No fluff, just findings.",
  },
  {
    n: "02",
    when: "Weeks 2–4",
    title: "Strategy",
    body: "A prioritized roadmap tied to revenue: what to fix, build, and publish — in what order, and why.",
  },
  {
    n: "03",
    when: "Weeks 4–8",
    title: "Build & launch",
    body: "Sites, content, campaigns, creative — shipped under one roof, so nothing gets lost between vendors.",
  },
  {
    n: "04",
    when: "Ongoing",
    title: "Measure & compound",
    body: "Monthly reporting in numbers your board understands, feeding the next cycle of growth.",
  },
];

export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const hLine = hLineRef.current;
    const vLine = vLineRef.current;
    if (!wrap || !hLine || !vLine) return;

    const steps = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll(".step"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([hLine, vLine], { scaleX: 1, scaleY: 1 });
      steps.forEach((s) => s.classList.add("step-active"));
      return;
    }

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 72%",
      end: "bottom 45%",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(hLine, { scaleX: p });
        gsap.set(vLine, { scaleY: p });
        steps.forEach((s, i) => {
          s.classList.toggle("step-active", p >= (i + 0.4) / STEPS.length);
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8 mb-16 md:mb-24">
        <HlTitle as="h2" className="display text-4xl md:text-6xl max-w-[18ch]">
          From first audit to <Hl>compounding growth</Hl>
        </HlTitle>
        <Magnetic>
          <a
            href="https://calendly.com/mattakumar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep inline-block bg-ink text-paper text-sm font-medium px-7 py-4 rounded-full"
          >
            <span>Start with an audit</span>
          </a>
        </Magnetic>
      </div>

      <div ref={wrapRef} className="relative">
        {/* Horizontal track — desktop */}
        <div className="hidden md:block absolute top-2 left-0 right-0 h-px bg-fog">
          <div ref={hLineRef} className="absolute inset-0 bg-signal origin-left scale-x-0" />
        </div>
        {/* Vertical track — mobile */}
        <div className="md:hidden absolute top-0 bottom-0 left-2 w-px bg-fog">
          <div ref={vLineRef} className="absolute inset-0 bg-signal origin-top scale-y-0" />
        </div>

        <div className="grid md:grid-cols-4 gap-y-12 md:gap-x-10">
          {STEPS.map((s) => (
            <div key={s.n} className="step relative pl-10 md:pl-0">
              <span
                className="step-node absolute left-2 top-1 md:left-0 md:top-2 -translate-x-1/2 -translate-y-1/2 md:translate-y-[-50%] w-4 h-4 rounded-full border-2 border-fog bg-paper"
                aria-hidden="true"
              />
              <div className="md:pt-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="step-num label text-smoke-light transition-colors duration-300">
                    {s.n}
                  </span>
                  <span className="label text-signal">{s.when}</span>
                </div>
                <h3 className="display text-2xl mb-3">{s.title}</h3>
                <p className="text-sm leading-[1.7] text-smoke max-w-[34ch]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
