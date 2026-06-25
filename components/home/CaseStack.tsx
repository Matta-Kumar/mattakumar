"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HlTitle from "@/components/anim/Highlight";
import MediaPlaceholder from "@/components/media/MediaPlaceholder";

gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    metric: "+212%",
    line: "Organic revenue in 12 months",
    client: "Sample — D2C skincare brand",
    services: ["SEO · AEO", "Content", "Web"],
    note: "Full-bleed lifestyle/product photo of the client brand, or a cinemagraph of the product",
  },
  {
    metric: "3.1x",
    line: "Return on ad spend, sustained two quarters",
    client: "Sample — ecommerce retailer",
    services: ["Performance ads", "Ecommerce", "Design"],
    note: "Full-bleed campaign creative or storefront photography from the ads account",
  },
  {
    metric: "5x",
    line: "Qualified pipeline from organic + social",
    client: "Sample — B2B SaaS",
    services: ["SEO · GEO", "Social", "Content"],
    note: "Full-bleed product UI screenshot composition or branded illustration",
  },
];

export default function CaseStack() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll(".case-card"));
    const tweens: gsap.core.Tween[] = [];

    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      tweens.push(
        gsap.to(card.firstElementChild, {
          scale: 0.94,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top+=96",
            scrub: true,
          },
        })
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section className="px-0 md:px-0 py-24 md:py-32">
      <div className="px-6 md:px-12 flex items-end justify-between mb-14 md:mb-20">
        <div>
          <p className="label text-signal mb-6">Case studies</p>
          <HlTitle as="h2" className="display text-4xl md:text-6xl">
            Numbers, not narratives
          </HlTitle>
        </div>
        <p className="hidden md:block label text-smoke pb-2">
          Sample data — pending real cases
        </p>
      </div>

      <div ref={wrapRef}>
        {CASES.map((c, i) => (
          <article key={c.metric} className="case-card sticky top-24 px-6 md:px-12 pb-6">
            <a
              href="/services"
              data-cursor="View case"
              className="group block relative h-[72vh] rounded-3xl overflow-hidden will-change-transform"
              style={{ transformOrigin: "center top" }}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                <MediaPlaceholder
                  kind="photo"
                  dark
                  ratio="auto"
                  note={c.note}
                  className="w-full h-full"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-colors duration-500 group-hover:from-signal-deep/90"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-paper">
                <div className="flex flex-wrap items-end justify-between gap-8">
                  <div>
                    <p className="label text-paper/60 mb-4">
                      {String(i + 1).padStart(2, "0")} — {c.client}
                    </p>
                    <p className="display text-6xl md:text-8xl mb-3">{c.metric}</p>
                    <p className="text-base md:text-lg text-paper/80 max-w-[36ch]">{c.line}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div className="flex flex-wrap gap-2">
                      {c.services.map((s) => (
                        <span
                          key={s}
                          className="label border border-paper/30 rounded-full px-3 py-1.5 group-hover:border-paper/60 transition-colors duration-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="label text-paper/60 group-hover:text-paper transition-colors duration-300">
                      View case →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
