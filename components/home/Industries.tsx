"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HlTitle from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";

const INDUSTRIES = [
  { name: "SaaS & technology", clients: "Client names — to supply", note: "Product UI composition or abstract tech visual" },
  { name: "D2C & ecommerce", clients: "Client names — to supply", note: "Product flat-lay or unboxing photo" },
  { name: "Healthcare & wellness", clients: "Client names — to supply", note: "Clinic / practitioner photo, warm tones" },
  { name: "Real estate", clients: "Client names — to supply", note: "Architectural photography, golden hour" },
  { name: "Hospitality & travel", clients: "Client names — to supply", note: "Destination or property hero shot" },
  { name: "Education & e-learning", clients: "Client names — to supply", note: "Campus or learning-platform visual" },
  { name: "Finance & fintech", clients: "Client names — to supply", note: "Dashboard UI or abstract data visual" },
  { name: "Food & beverage", clients: "Client names — to supply", note: "Editorial food photography" },
  { name: "Fitness & sports", clients: "Client names — to supply", note: "High-energy training photo" },
  { name: "Local & home services", clients: "Client names — to supply", note: "Craftsperson at work, documentary style" },
];

export default function Industries() {
  const previewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const preview = previewRef.current;
    const list = listRef.current;
    if (!preview || !list) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 110);
    };

    list.addEventListener("mousemove", onMove, { passive: true });
    return () => list.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.9 : 1,
      duration: 0.3,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <section className="px-6 md:px-12 py-24 md:py-32 border-t border-fog">
      <div className="flex items-end justify-between mb-14 md:mb-20">
        <div>
          <p className="label text-signal mb-6">Industries</p>
          <HlTitle as="h2" className="display text-4xl md:text-6xl">
            Who we work with
          </HlTitle>
        </div>
        <p className="hidden md:block label text-smoke pb-2">10 sectors</p>
      </div>

      <div ref={listRef} className="border-t border-fog">
        {INDUSTRIES.map((ind, i) => (
          <FadeUp key={ind.name} delay={i * 0.03} y={16}>
            <div
              data-cursor=""
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group grid md:grid-cols-12 gap-2 md:gap-8 items-baseline border-b border-fog px-2 md:px-4 py-6 md:py-7 transition-colors duration-300 hover:bg-paper-deep"
            >
              <span className="md:col-span-1 label text-smoke-light">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="md:col-span-5 display text-xl md:text-3xl group-hover:text-signal transition-colors duration-300">
                {ind.name}
              </h3>
              <p className="md:col-span-5 text-sm text-smoke">{ind.clients}</p>
              <span className="hidden md:block md:col-span-1 text-right text-signal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
            </div>
          </FadeUp>
        ))}
      </div>

      <div ref={previewRef} className="hover-preview hidden md:block" aria-hidden="true">
        <div className="bg-ink text-paper rounded-2xl overflow-hidden">
          <div className="aspect-[4/3] bg-ink-soft relative">
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" />
            </svg>
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <span className="label text-paper/50">Photo — to supply</span>
              <p className="text-xs text-paper/70 leading-relaxed">
                {active !== null ? INDUSTRIES[active].note : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
