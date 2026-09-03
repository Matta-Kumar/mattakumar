"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/wordpress";

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-110px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="border border-fog rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="label text-ink">Table of contents</span>
        <span
          aria-hidden="true"
          className={`text-smoke-light transition-transform duration-300 ${open ? "" : "rotate-180"}`}
        >
          ▾
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ol ref={listRef} data-lenis-prevent className="px-5 pb-5 max-h-[60vh] overflow-y-auto">
            {toc.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id} className={item.level === 3 ? "ml-8" : item.level === 2 ? "ml-4" : ""}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-1.5 text-[13px] leading-snug border-l-2 pl-3 -ml-px transition-colors duration-200 ${
                      active
                        ? "border-signal text-signal font-medium"
                        : "border-transparent text-smoke hover:text-ink"
                    }`}
                  >
                    {item.number}. {item.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
