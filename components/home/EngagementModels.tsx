"use client";

import Link from "next/link";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import Magnetic from "@/components/anim/Magnetic";
import type { EngagementModel, InHouseCapability } from "@/sanity/lib/queries";

export default function EngagementModels({
  models: MODELS,
  teamBuilding: TEAM_BUILDING,
}: {
  models: EngagementModel[];
  teamBuilding: InHouseCapability[];
}) {
  return (
    <section id="how-we-work" className="px-6 md:px-12 py-24 md:py-32 border-t border-fog">
      <div className="mb-14 md:mb-20">
        <p className="label text-signal mb-6">How we&apos;d work together</p>
        <HlTitle as="h2" className="display text-4xl md:text-6xl max-w-[20ch] mb-5">
          Pick <Hl>how hands-on</Hl> you want to be
        </HlTitle>
        <p className="text-smoke text-[15px] max-w-[42ch]">
          Five models, from fully in-house to fully done-for-you. Open one to see how it actually runs.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-px bg-fog rounded-2xl overflow-hidden border border-fog">
        {MODELS.map((m) => (
          <Link
            key={m.code}
            href={`/services/how-we-work/${m.slug}`}
            data-cursor="View"
            className={`group relative px-6 py-8 md:py-10 flex flex-col transition-colors duration-300 ${
              m.flagship ? "bg-ink text-paper hover:bg-ink-soft" : "bg-paper hover:bg-paper-deep"
            }`}
          >
            {m.flagship ? (
              <span className="label text-signal-soft mb-4">Most popular</span>
            ) : (
              <span className="label text-smoke-light mb-4">{m.code}</span>
            )}
            <h3
              className={`display text-xl md:text-2xl mb-3 leading-tight transition-colors duration-300 ${
                m.flagship ? "" : "group-hover:text-signal"
              }`}
            >
              {m.name}
            </h3>
            <p className={`text-sm leading-relaxed ${m.flagship ? "text-paper/75" : "text-smoke"}`}>
              {m.desc}
            </p>
            <span
              aria-hidden="true"
              className={`mt-6 text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                m.flagship ? "text-signal-soft" : ""
              }`}
            >
              →
            </span>
          </Link>
        ))}
      </div>

      {/* Team building — a lighter, secondary path for those who'd rather build in-house */}
      <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-fog">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <p className="text-smoke text-[15px] max-w-[42ch]">
            Prefer to build the capability in-house? I help you get there too.
          </p>
          <Magnetic>
            <a
              href="https://calendly.com/mattakumar"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line text-[13px] font-medium"
            >
              Talk about team building →
            </a>
          </Magnetic>
        </div>
        <div className="rounded-2xl bg-paper-deep p-4 md:p-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
            {TEAM_BUILDING.map((t, i) => (
              <div key={t.title} className="bg-paper border border-fog rounded-xl p-5 transition-colors duration-300 hover:border-signal/40">
                <span className="label text-smoke-light mb-3 block">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="text-[15px] font-medium text-ink mb-1.5 leading-snug">{t.title}</h4>
                <p className="text-[13px] leading-relaxed text-smoke">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
