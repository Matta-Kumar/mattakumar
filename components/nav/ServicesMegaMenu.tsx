"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Service, EngagementModel } from "@/sanity/lib/queries";

export default function ServicesMegaMenu({
  services: SERVICES,
  engagementModels: ENGAGEMENT_MODELS,
}: {
  services: Service[];
  engagementModels: EngagementModel[];
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLLIElement>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <li ref={wrapRef} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="label text-smoke hover:text-ink transition-colors duration-300 flex items-center gap-1.5"
      >
        <span className="link-line">Services</span>
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ width: "min(880px, 88vw)" }}
      >
        <div
          className="rounded-2xl border border-fog bg-paper overflow-hidden"
          style={{ boxShadow: "0 32px 64px -12px rgba(16,24,40,0.18), 0 8px 24px rgba(16,24,40,0.08)" }}
        >
          <div className="grid grid-cols-[1.5fr_1fr]">
            {/* Services */}
            <div className="p-8 border-r border-fog">
              <p className="label text-smoke-light mb-5">What I do</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3"
                  >
                    <span className="label text-smoke-light mt-0.5 shrink-0">{s.n}</span>
                    <span>
                      <span className="block text-[14px] font-medium text-ink group-hover:text-signal transition-colors duration-300">
                        {s.title}
                      </span>
                      <span className="block text-[12.5px] text-smoke leading-snug mt-0.5">{s.benefit}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="link-line text-[13px] font-medium mt-7 inline-block"
              >
                View all services →
              </Link>
            </div>

            {/* How we'd work together */}
            <div className="p-8 bg-paper-deep">
              <p className="label text-smoke-light mb-5">How we&apos;d work together</p>
              <div className="flex flex-col gap-3.5">
                {ENGAGEMENT_MODELS.map((m) => (
                  <Link
                    key={m.code}
                    href={`/services/how-we-work/${m.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-3"
                  >
                    <span className={`label w-8 shrink-0 ${m.flagship ? "text-signal" : "text-smoke-light"}`}>
                      {m.code}
                    </span>
                    <span
                      className={`text-[13px] font-medium leading-snug transition-colors duration-300 ${
                        m.flagship ? "text-signal" : "text-ink group-hover:text-signal"
                      }`}
                    >
                      {m.name}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/services/how-we-work"
                onClick={() => setOpen(false)}
                className="link-line text-[13px] font-medium mt-6 inline-block"
              >
                See how it works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
