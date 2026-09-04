"use client";

import { useState } from "react";
import HlTitle from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import type { Industry } from "@/sanity/lib/queries";
import { INDUSTRY_ICONS, getIndustryIcon } from "@/components/icons/IndustryIcons";

export default function Industries({ industries: INDUSTRIES }: { industries: Industry[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="px-6 md:px-12 py-24 md:py-32 border-t border-fog">
      <div className="flex items-end justify-between mb-14 md:mb-20">
        <div>
          <p className="label text-signal mb-6">Industries</p>
          <HlTitle as="h2" className="display text-4xl md:text-6xl">
            Who we work with
          </HlTitle>
        </div>
        <p className="hidden md:block label text-smoke pb-2">{INDUSTRIES.length} sectors</p>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        onMouseLeave={() => setActive(0)}
      >
        {INDUSTRIES.map((ind, i) => {
          const on = active === i;
          const Icon = INDUSTRY_ICONS[getIndustryIcon(ind.name)];
          return (
            <FadeUp
              key={ind.name}
              delay={i * 0.03}
              y={16}
              className={ind.featured ? "col-span-2" : "col-span-1"}
            >
              <div
                onMouseEnter={() => setActive(i)}
                className={`group relative h-full rounded-2xl border px-6 py-7 md:px-8 md:py-9 transition-colors duration-300 hover:bg-ink hover:border-ink ${
                  on ? "bg-ink border-ink" : "border-fog"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`label transition-colors duration-300 group-hover:text-paper/40 ${
                      on ? "text-paper/40" : "text-smoke-light"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-paper/10 group-hover:text-paper ${
                      on ? "bg-paper/10 text-paper" : "bg-signal-tint text-signal"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] md:w-5 md:h-5" aria-hidden="true" />
                  </div>
                </div>
                <h3
                  className={`display mt-4 md:mt-6 transition-colors duration-300 group-hover:text-paper ${
                    on ? "text-paper" : ""
                  } ${ind.featured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}`}
                >
                  {ind.name}
                </h3>
                <p
                  className={`mt-3 text-smoke transition-colors duration-300 group-hover:text-paper/70 ${
                    on ? "text-paper/70" : ""
                  } ${ind.featured ? "text-[15px] max-w-[38ch]" : "text-sm max-w-[26ch]"}`}
                >
                  {ind.blurb}
                </p>
                {/* <span
                  aria-hidden="true"
                  className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    on ? "opacity-100" : ""
                  }`}
                >
                  →
                </span> */}
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
