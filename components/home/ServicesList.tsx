"use client";

import { useState } from "react";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";
import MediaPlaceholder from "@/components/media/MediaPlaceholder";

const SERVICES = [
  {
    n: "01",
    title: "SEO · GEO · AEO",
    benefit: "Be the answer on Google — and inside AI.",
    desc: "Classic rankings still matter, but answers increasingly come from AI. We optimize for both: technical foundations and topical authority for Google, plus citation strategies for ChatGPT, Perplexity, and AI Overviews.",
    deliverables: ["Technical audits", "Topical maps & clusters", "On & off-page SEO", "AI citation optimization", "Local SEO"],
    visualNote: "Floating SERP card morphing into an AI answer card that cites the brand — violet accents on white",
  },
  {
    n: "02",
    title: "Performance ads",
    benefit: "Every dollar accountable to pipeline.",
    desc: "Media buying with an engineer’s discipline: tracking that is actually correct, creative that earns the click, and budgets that scale only when the numbers prove it.",
    deliverables: ["Google & Meta ads", "Landing pages", "Creative testing", "Conversion tracking", "Weekly ROAS reporting"],
    visualNote: "Ads dashboard composition with a rising ROAS curve and creative thumbnails — violet data accents",
  },
  {
    n: "03",
    title: "Content marketing",
    benefit: "One insight becomes twenty assets.",
    desc: "We plan, produce, and distribute content that builds authority and feeds every other channel — search, social, email, and sales.",
    deliverables: ["Editorial strategy", "Briefs & production", "SEO content", "Repurposing systems", "Newsletters"],
    visualNote: "A single article exploding into layered formats — post, thread, video, email — stacked paper metaphor",
  },
  {
    n: "04",
    title: "Social media",
    benefit: "Attention earned, day after day.",
    desc: "Audiences behave differently on every platform. We build a presence that feels native to each — with creative and cadence your team can sustain.",
    deliverables: ["Channel strategy", "Content calendars", "Short-form video", "Community management", "Analytics"],
    visualNote: "Floating platform UI cards (reel, post, thread) orbiting a brand mark — clean 3D, soft shadows",
  },
  {
    n: "05",
    title: "Web development",
    benefit: "Your site is your best salesperson.",
    desc: "Fast, accessible, search-ready websites — from static marketing sites to dynamic web apps — engineered to convert, not just to look good.",
    deliverables: ["Next.js & WordPress builds", "Landing page systems", "CMS setup", "Core Web Vitals", "Ongoing maintenance"],
    visualNote: "Wireframe morphing into a finished polished webpage, split-state composition on white",
  },
  {
    n: "06",
    title: "Ecommerce",
    benefit: "From product page to repeat purchase.",
    desc: "Stores engineered to sell: product pages that rank, checkouts that don’t leak revenue, and the email flows and analytics that keep customers coming back.",
    deliverables: ["Shopify & WooCommerce", "Conversion optimization", "Merchandising & feeds", "Email flows", "Revenue analytics"],
    visualNote: "Premium product card with add-to-cart motion trail and a rising revenue sparkline",
  },
  {
    n: "07",
    title: "Brand & design",
    benefit: "Design that makes every channel work harder.",
    desc: "Identity systems and campaign creative with one coherent voice — so every ad, post, and page looks unmistakably like you.",
    deliverables: ["Identity systems", "Campaign creative", "Ad & social creative", "Design systems", "Decks & collateral"],
    visualNote: "Brand identity board — logo grid, color chips, type specimens — arranged as a designer’s desk flat-lay",
  },
];

export default function ServicesList() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="px-6 md:px-12 py-24 md:py-32">
      <div className="flex items-end justify-between mb-14 md:mb-20">
        <div>
          <p className="label text-signal mb-6">What I do</p>
          <HlTitle as="h2" className="display text-4xl md:text-6xl">
            Seven capabilities, <Hl>one growth engine</Hl>
          </HlTitle>
        </div>
        <p className="hidden md:block label text-smoke pb-2">07</p>
      </div>

      <div className="border-t border-fog" onMouseLeave={() => setActive(null)}>
        {SERVICES.map((s, i) => {
          const open = active === i;
          return (
            <FadeUp key={s.n} delay={i * 0.04} y={20}>
              <div
                className={`border-b border-fog transition-colors duration-500 ${
                  open ? "bg-paper-deep" : "bg-paper"
                }`}
                onMouseEnter={() => setActive(i)}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  data-cursor={open ? "Close" : "Expand"}
                  onClick={() => setActive(open ? null : i)}
                  className="w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-12 gap-4 md:gap-8 items-baseline text-left px-2 md:px-4 py-7 md:py-8"
                >
                  <span className={`md:col-span-1 label transition-colors duration-300 ${open ? "text-signal" : "text-smoke-light"}`}>
                    {s.n}
                  </span>
                  <h3 className={`md:col-span-4 display text-2xl md:text-[2rem] transition-colors duration-300 ${open ? "text-signal" : ""}`}>
                    {s.title}
                  </h3>
                  <p className="hidden md:block md:col-span-6 text-[15px] text-smoke">
                    {s.benefit}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`md:col-span-1 justify-self-end text-xl leading-none transition-transform duration-500 ${
                      open ? "rotate-45 text-signal" : "text-smoke-light"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid md:grid-cols-12 gap-8 px-2 md:px-4 pb-10 pt-1">
                      <div className="md:col-span-5 md:col-start-2">
                        <p className="text-[15px] leading-[1.75] text-smoke mb-7 max-w-[52ch]">
                          {s.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {s.deliverables.map((d) => (
                            <span
                              key={d}
                              className="label border border-fog bg-paper rounded-full px-3.5 py-2 text-ink"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6">
                          <Magnetic>
                            <a
                              href="https://calendly.com/mattakumar"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-sweep inline-block bg-ink text-paper text-[13px] font-medium px-6 py-3.5 rounded-full"
                            >
                              <span>Book a call about this</span>
                            </a>
                          </Magnetic>
                          <a href="/services" className="link-line text-[13px] font-medium">
                            Full details →
                          </a>
                        </div>
                      </div>
                      <div className="md:col-span-5 md:col-start-8">
                        <MediaPlaceholder
                          kind="photo"
                          ratio="16/10"
                          note={s.visualNote}
                          className="rounded-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
