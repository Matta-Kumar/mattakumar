"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hl } from "@/components/anim/Highlight";
import { PLATFORM_LOGOS } from "./PlatformLogos";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const ERAS = [
  { year: "2003", label: "Gen 1 — ten blue links" },
  { year: "2011", label: "Gen 2 — the algorithm era" },
  { year: "2023", label: "Gen 3 — AI gives answers" },
  { year: "Now",  label: "Present — every AI" },
];

const QUERY = "best digital marketing consultant";

const YAHOO_LINKS = [
  { t: "Digital Marketing Consultant — Expert SEO Services",   u: "www.digitalmarketing.com/consultant",  s: "Top-rated consultant helping brands grow online. Free quote available." },
  { t: "Best Marketing Consultants — Yahoo! Directory",        u: "dir.yahoo.com/Business/Marketing",     s: "Curated directory of trusted digital marketing professionals worldwide." },
  { t: "Hire a Digital Marketing Expert Today",                u: "www.marketingpros.net",                s: "Certified consultants for SEO, email marketing, and web strategy." },
  { t: "Marketing Consultant Services — Small Business Focus", u: "www.smallbizmktg.com",                 s: "Affordable digital marketing for growing small and mid-size businesses." },
  { t: "SEO & Web Marketing Consulting — Free Audit",          u: "www.seoexpert.com/consulting",         s: "Search engine optimisation and paid search management specialists." },
  { t: "Digital Strategy Consulting — Fortune 500 & SMB",     u: "www.digitalstrategy.com",              s: "We help brands find and convert customers online. Case studies inside." },
  { t: "Internet Marketing Consultant — Request Free Quote",   u: "www.imarketing.biz",                   s: "Expert marketing team available for consultation. Rates from $99/hr." },
];

const GOOGLE_LINKS = [
  { t: "Digital Marketing Consultant | Expert SEO & Growth",  u: "www.digitalmarketer.com/consultant",   s: "Certified digital marketing consultants delivering measurable results across SEO, paid media, and content strategy." },
  { t: "Top Digital Marketing Consultants — Forbes Ranked",   u: "www.forbes.com/advisor/marketing",     s: "Forbes-vetted firms offering strategy, execution, and full-funnel marketing consulting services." },
  { t: "Digital Marketing Consulting | HubSpot Certified",    u: "www.hubspot.com/marketing/consulting", s: "Inbound-led consulting for B2B and B2C brands. Free strategy session included." },
  { t: "Local Digital Marketing Consultant — Verified",       u: "maps.google.com/local/marketing",      s: "Find top-rated digital marketing consultants in your area with verified reviews and ratings." },
];

const AI_PLATFORM_CARDS = [
  { name: "ChatGPT",    color: "#10a37f", bg: "#212121", sources: [] as string[],             response: "Look for a consultant with proven results across Google core updates — not just recent wins. SEO track record and content strategy depth matter most." },
  { name: "Perplexity", color: "#20b8cd", bg: "#0f0f10", sources: ["Clutch.co", "G2 Reviews"], response: "Top consultants combine technical SEO, content authority, and conversion strategy — with documented ROI and transparent reporting across verticals." },
  { name: "Gemini",     color: "#7c3aed", bg: "#1e1e2e", sources: [] as string[],             response: "In 2025, ensure your consultant understands entity-based SEO and AI Overviews. Traditional keyword tactics alone are no longer sufficient for visibility." },
  { name: "Claude",     color: "#cc785c", bg: "#1a1612", sources: [] as string[],             response: "The best marketing consultants demonstrate pipeline impact, not just rankings. Look for AI search fluency alongside proven organic and content strategy." },
];

const AI_PLATFORMS = [
  { name: "Google AI Overview", color: "#4285F4", pct: 94 },
  { name: "ChatGPT",            color: "#10a37f", pct: 89 },
  { name: "Perplexity",         color: "#20b8cd", pct: 91 },
  { name: "Gemini",             color: "#7c3aed", pct: 87 },
  { name: "Claude Search",      color: "#cc785c", pct: 82 },
];

const HERO_PLATFORM_NAMES = [
  "AI Overviews",
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Claude",
  "Copilot",
  "Bing",
];

// ─── Visual sub-components ───────────────────────────────────────────────────

function Gen1Visual({ domRef }: { domRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={domRef}
      className="absolute inset-0 z-20 invisible pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div
        className="absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        style={{ width: "560px" }}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl">

          {/* Browser chrome */}
          <div className="bg-[#3a3a3a] px-4 py-2 flex items-center gap-3">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
            </div>
            <div className="flex-1 bg-[#555] rounded text-[10px] text-[#ccc] px-3 py-1 truncate">
              search.yahoo.com/search?p=best+digital+marketing+consultant
            </div>
          </div>

          {/* Yahoo header */}
          <div className="bg-[#400090] px-5 pt-4 pb-3">
            <p className="text-white font-black text-2xl italic tracking-tight mb-3">Yahoo!</p>
            <div className="flex">
              <div className="flex-1 bg-white text-[#333] text-[13px] px-3 py-2 rounded-l-sm">
                {QUERY}
              </div>
              <div className="bg-[#6200aa] text-white text-[12px] px-4 py-2 rounded-r-sm font-medium shrink-0">
                Search
              </div>
            </div>
            <div className="flex gap-4 mt-2.5 text-[11px]">
              <span className="text-white border-b border-white pb-0.5">Web</span>
              <span className="text-white/50">Images</span>
              <span className="text-white/50">Directory</span>
              <span className="text-white/50">News</span>
              <span className="text-white/50">Shopping</span>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white px-5 pt-3 pb-4">
            <p className="text-[#555] text-[11px] mb-3.5">
              About <strong>2,340,000</strong> results &mdash; <em>best digital marketing consultant</em>
            </p>
            <div className="space-y-3">
              {YAHOO_LINKS.map((r, i) => (
                <div key={i}>
                  <p className="text-[#0000cc] text-[13px] leading-snug">{r.t}</p>
                  <p className="text-[#009900] text-[11px]">{r.u}</p>
                  <p className="text-[#555] text-[11px] leading-relaxed">{r.s}</p>
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex items-center gap-0.5 text-[12px] border-t border-[#eee] pt-3">
              <span className="font-bold text-[#400090] mr-1">[1]</span>
              {[2, 3, 4, 5].map((n) => (
                <span key={n} className="text-[#0000cc] px-1">{n}</span>
              ))}
              <span className="text-[#0000cc] ml-1">Next &raquo;</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Gen2Visual({ domRef }: { domRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={domRef}
      className="absolute inset-0 z-20 invisible pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div
        className="absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        style={{ width: "540px" }}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl bg-white">

          {/* Browser chrome */}
          <div className="bg-[#ebebeb] px-4 py-2 flex items-center gap-3 border-b border-[#d0d0d0]">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
            </div>
            <div className="flex-1 bg-white rounded border border-[#ccc] text-[10px] text-[#555] px-3 py-1 truncate">
              google.com/search?q=best+digital+marketing+consultant
            </div>
          </div>

          {/* Google header */}
          <div className="px-5 pt-4 pb-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[22px] leading-none font-normal select-none" aria-label="Google">
                <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span>
                <span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span>
                <span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
              </span>
              <div className="flex-1 flex items-center gap-2 border border-[#dfe1e5] rounded-full px-4 py-2 shadow-sm bg-white">
                <span className="text-[13px] text-[#202124] flex-1">{QUERY}</span>
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
                  <circle cx="11" cy="11" r="7" stroke="#4285F4" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-end px-4 border-b border-[#e8eaed] text-[12px]">
            {["All", "Images", "Maps", "News", "More"].map((tab, i) => (
              <span
                key={tab}
                className={i === 0
                  ? "px-3 py-2 text-[#4285f4] border-b-[3px] border-[#4285f4] font-medium -mb-px whitespace-nowrap"
                  : "px-3 py-2 text-[#70757a] whitespace-nowrap"}
              >
                {tab}
              </span>
            ))}
            <span className="ml-auto px-3 py-2 text-[#70757a] whitespace-nowrap">Tools</span>
          </div>

          {/* Results count */}
          <div className="px-5 pt-2.5 pb-0.5">
            <p className="text-[#70757a] text-[11px]">About 437,000,000 results (0.38 seconds)</p>
          </div>

          {/* Panda update notice */}
          <div className="mx-5 my-2 px-4 py-3 rounded-lg border-l-[3px] border-[#FBBC05] bg-[#FFFBEA]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold text-[#C45000]">&#9654; Algorithm Update &mdash; Google Panda</span>
              <span className="ml-auto text-[10px] text-[#999] shrink-0">Apr 2011</span>
            </div>
            <p className="text-[10px] text-[#555] leading-relaxed">
              Content quality signals added. Thin, low-quality pages saw significant ranking drops.{" "}
              <strong className="text-[#333]">Strategy rewrite required.</strong>
            </p>
          </div>

          {/* Blue link results */}
          <div className="px-5 pb-4 space-y-3">
            {GOOGLE_LINKS.map((r, i) => (
              <div key={i}>
                <p className="text-[#1a0dab] text-[14px] leading-snug">{r.t}</p>
                <p className="text-[#006621] text-[11px]">{r.u}</p>
                <p className="text-[#545454] text-[12px] mt-0.5 leading-[1.45]">{r.s}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function Gen3Visual({ domRef }: { domRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={domRef}
      className="absolute inset-0 z-20 invisible pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div
        className="absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        style={{ width: "560px" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest text-[#999]">Same query &mdash; every AI platform</span>
          <div className="flex gap-1 ml-auto">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`rounded-full ${i === 0 ? "w-4 h-1.5 bg-[#555]" : "w-1.5 h-1.5 bg-[#ddd]"}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ height: "300px" }}>
          <div data-ai-scroll="" className="flex gap-3 h-full" style={{ width: "max-content" }}>
            {AI_PLATFORM_CARDS.map((p) => {
              const Logo = PLATFORM_LOGOS[p.name] ?? PLATFORM_LOGOS["AI Overviews"];
              return (
                <div key={p.name} className="h-full shrink-0" style={{ width: "280px" }}>
                  {p.name === "ChatGPT" ? (
                    <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-38px_rgba(15,23,42,0.18)] p-4 flex flex-col">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <Logo className="h-8 w-8" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">ChatGPT</p>
                            <p className="text-[11px] text-slate-500">OpenAI conversational AI</p>
                          </div>
                        </div>
                        <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500">GPT-4</div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="self-end max-w-[85%] rounded-3xl bg-slate-100 p-3 text-sm text-slate-900 shadow-sm">
                          <p className="font-semibold text-slate-700 mb-1">You</p>
                          <p>What is the best way to optimise for AI search?</p>
                        </div>
                        <div className="self-start max-w-[90%] rounded-[2rem] bg-slate-950 p-4 text-sm text-slate-50 shadow-sm">
                          <p className="font-semibold text-white mb-1">ChatGPT</p>
                          <p>{p.response}</p>
                        </div>
                      </div>
                    </div>
                  ) : p.name === "Perplexity" ? (
                    <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-38px_rgba(15,23,42,0.16)] p-4 flex flex-col">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <Logo className="h-8 w-8 text-sky-500" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Perplexity</p>
                            <p className="text-[11px] text-slate-500">Answers with sources</p>
                          </div>
                        </div>
                        <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500">Verified</div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="self-end max-w-[85%] rounded-3xl bg-slate-100 p-3 text-sm text-slate-900 shadow-sm">
                          <p className="font-semibold text-slate-700 mb-1">You</p>
                          <p>{QUERY}?</p>
                        </div>
                        <div className="self-start max-w-[90%] rounded-[2rem] bg-slate-50 p-4 text-sm text-slate-900 shadow-sm border border-slate-200">
                          <p className="font-semibold text-slate-900 mb-2">Perplexity</p>
                          <p className="mb-3">{p.response}</p>
                          <div className="flex flex-wrap gap-2">
                            {p.sources.map((s) => (
                              <span key={s} className="text-[10px] text-slate-700 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : p.name === "Gemini" ? (
                    <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-38px_rgba(15,23,42,0.16)] p-4 flex flex-col">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <Logo className="h-8 w-8" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Gemini</p>
                            <p className="text-[11px] text-slate-500">Google AI answers</p>
                          </div>
                        </div>
                        <div className="rounded-full bg-sky-50 px-3 py-1 text-[11px] text-sky-600">AI</div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="self-end max-w-[85%] rounded-3xl bg-slate-100 p-3 text-sm text-slate-900 shadow-sm">
                          <p className="font-semibold text-slate-700 mb-1">You</p>
                          <p>{QUERY}</p>
                        </div>
                        <div className="self-start max-w-[90%] rounded-[2rem] bg-slate-50 p-4 text-sm text-slate-900 shadow-sm border border-slate-200">
                          <p className="font-semibold text-slate-900 mb-2">Gemini</p>
                          <p>{p.response}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-38px_rgba(15,23,42,0.16)] p-4 flex flex-col">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <Logo className="h-8 w-8" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Claude</p>
                            <p className="text-[11px] text-slate-500">Anthropic answer studio</p>
                          </div>
                        </div>
                        <div className="rounded-full bg-orange-50 px-3 py-1 text-[11px] text-orange-600">Claude</div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="self-end max-w-[85%] rounded-3xl bg-slate-100 p-3 text-sm text-slate-900 shadow-sm">
                          <p className="font-semibold text-slate-700 mb-1">You</p>
                          <p>What makes AI search optimised for consultants?</p>
                        </div>
                        <div className="self-start max-w-[90%] rounded-[2rem] bg-slate-50 p-4 text-sm text-slate-900 shadow-sm border border-slate-200">
                          <p className="font-semibold text-slate-900 mb-2">Claude</p>
                          <p>{p.response}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Gen4Visual({ domRef }: { domRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={domRef}
      className="absolute inset-0 z-20 invisible pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div
        className="absolute left-[36%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        style={{ width: "500px" }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#08080d", boxShadow: "0 0 90px rgba(91,61,245,0.18), 0 24px 64px rgba(0,0,0,0.65)" }}
        >
          <div className="px-6 pt-5 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/40 text-[11px] font-medium uppercase tracking-widest">
                AI Search Presence
              </span>
              <span className="ml-auto text-[10px] text-emerald-400/70 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                Live
              </span>
            </div>
            <p className="text-white/90 text-[16px] font-medium leading-snug">
              &quot;best digital marketing consultant&quot;
            </p>
          </div>

          <div className="px-6 py-5 space-y-4">
            {AI_PLATFORMS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                  style={{ backgroundColor: p.color + "22", border: "1px solid " + p.color + "44" }}
                >
                  <span style={{ color: p.color }}>{p.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-[13px] leading-none mb-1.5">{p.name}</p>
                  <div className="w-full h-[3px] rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{ backgroundColor: p.color, width: p.pct + "%", opacity: 0.8 }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 min-w-[80px] justify-end">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                    style={{ animationDelay: i * 0.25 + "s" }}
                  />
                  <span className="text-emerald-400 text-[11px]">{p.pct}% match</span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
            <p className="text-white/25 text-[11px]">5 platforms &middot; avg 88.6% coverage</p>
            <p className="text-[11px] font-medium" style={{ color: "#5b3df5" }}>
              Fully optimised &#10003;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef       = useRef<HTMLElement>(null);
  const textWrapRef      = useRef<HTMLDivElement>(null);
  const textRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef         = useRef<HTMLDivElement>(null);
  const satishRef        = useRef<HTMLDivElement>(null);
  const satishCenterRef  = useRef<HTMLImageElement>(null);
  const satishLeftRef    = useRef<HTMLImageElement>(null);
  const satishRightRef   = useRef<HTMLImageElement>(null);
  const gen1Ref          = useRef<HTMLDivElement>(null);
  const gen2Ref         = useRef<HTMLDivElement>(null);
  const gen3Ref         = useRef<HTMLDivElement>(null);
  const gen4Ref         = useRef<HTMLDivElement>(null);
  const platformPanelRef = useRef<HTMLDivElement>(null);
  const platformScrollRef = useRef<HTMLDivElement>(null);
  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const progressRef     = useRef<HTMLDivElement>(null);
  const markerRefs      = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section      = sectionRef.current;
    const textWrap     = textWrapRef.current;
    const stage        = stageRef.current;
    const satish       = satishRef.current;
    const satishCenter = satishCenterRef.current;
    const satishLeft   = satishLeftRef.current;
    const satishRight  = satishRightRef.current;
    const gen1     = gen1Ref.current;
    const gen2     = gen2Ref.current;
    const gen3     = gen3Ref.current;
    const gen4     = gen4Ref.current;
    const platformPanel = platformPanelRef.current;
    const platformScroll = platformScrollRef.current;
    const gen3Scroll = gen3?.querySelector<HTMLElement>("[data-ai-scroll]") ?? null;
    const progress = progressRef.current;
    const tlWrap   = timelineWrapRef.current;
    const texts    = textRefs.current.filter(Boolean) as HTMLDivElement[];

    if (
      !section || !textWrap || !stage || !satish ||
      !satishCenter || !satishLeft || !satishRight ||
      !gen1 || !gen2 || !gen3 || !gen4 ||
      !platformPanel || !progress || !tlWrap || texts.length < 5
    ) return;

    const measure = () => {
      const max = Math.max(...texts.map((t) => t.offsetHeight));
      textWrap.style.minHeight = max + "px";
      ScrollTrigger.refresh();
    };
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([satish, tlWrap], { autoAlpha: 1 });
      gsap.set(texts[0], { autoAlpha: 1 });
      gsap.set(satishCenter, { autoAlpha: 1 });
      gsap.set([satishLeft, satishRight], { autoAlpha: 0 });
      return () => window.removeEventListener("resize", measure);
    }

    let platformTween: gsap.core.Tween | null = null;
    if (platformScroll) {
      const distance = platformScroll.scrollHeight / 2;
      if (distance > 16) {
        gsap.set(platformScroll, { y: 0 });
        platformTween = gsap.to(platformScroll, {
          y: -distance,
          duration: 14,
          ease: "none",
          repeat: -1,
        });
      }
    }

    gsap.fromTo(
      satish,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 1.1, delay: 0.2, ease: "power2.out" }
    );

    const initOvers = Array.from(texts[0].querySelectorAll<HTMLElement>(".hl-over"));
    if (initOvers.length) {
      gsap.to(initOvers, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.85,
        delay: 1.0,
        ease: "power4.inOut",
        stagger: 0.18,
      });
    }

    gsap.set(tlWrap, { autoAlpha: 0 });
    gsap.set(texts.slice(1), { autoAlpha: 0, y: 36 });
    gsap.set([gen1, gen2, gen3, gen4], { autoAlpha: 0, y: 40 });
    gsap.set(satish, { x: 0 });
    gsap.set(satishCenter, { autoAlpha: 1, scale: 1, y: 0, x: 0, left: "50%", transformOrigin: "50% 50%" });
    gsap.set(satishRight, { autoAlpha: 0, scale: 0.96, y: 0, x: 0, left: "28%", transformOrigin: "50% 50%" });
    gsap.set(satishLeft, { autoAlpha: 0, scale: 0.96, y: 0, x: 0, left: "72%", transformOrigin: "50% 50%" });
    gsap.set(platformPanel, { autoAlpha: 1 });

    const allScrollOvers = texts.slice(1).flatMap((t) =>
      Array.from(t.querySelectorAll<HTMLElement>(".hl-over"))
    );
    gsap.set(allScrollOvers, { clipPath: "inset(0 100% 0 0)" });

    const overs = (t: HTMLDivElement) =>
      Array.from(t.querySelectorAll<HTMLElement>(".hl-over"));

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    const portraitTransition = (target: "center" | "left" | "right", duration = 0.75) => {
      const targetLeft = target === "center" ? "33.333%" : target === "left" ? "72%" : "28%";
      const targetSrc = target === "center"
        ? "/satish/portrait.png"
        : target === "left"
          ? "/satish/left.png"
          : "/satish/right.png";

      return tl.to(satishCenter, {
        left: targetLeft,
        scale: 1,
        duration,
        ease: "power2.out",
        onStart: () => {
          if (satishCenter) satishCenter.src = targetSrc;
        },
      });
    };

    tl.to({}, { duration: 1.5 });

    tl.addLabel("era0");
    tl.to(platformPanel, { autoAlpha: 0, duration: 0.9, ease: "power2.out" }, "<0.15");
    tl.to(satish, { x: 120, duration: 0.9, ease: "power2.inOut" });
    tl.to(tlWrap, { autoAlpha: 1, duration: 0.6 }, "<0.15");
    tl.to(satishCenter, { autoAlpha: 1, scale: 1.04, y: 0, duration: 0.35, ease: "power2.out" }, "<0");
    portraitTransition("left", 0.75);
    tl.to(satishRight, { autoAlpha: 0, duration: 0.1 }, "<");
    if (overs(texts[1]).length) {
      tl.to(overs(texts[1]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.5");
    }
    tl.to({}, { duration: 1.8 });
    tl.to(texts[0], { autoAlpha: 0, y: -36, duration: 0.7 }, "<0.05");
    tl.to(texts[1], { autoAlpha: 1, y: 0, duration: 0.7 }, "<0.2");
    tl.to(gen1, { autoAlpha: 1, y: 0, duration: 0.8 }, "<");

    tl.addLabel("era1");
    tl.to(texts[1], { autoAlpha: 0, y: -36, duration: 0.7 });
    tl.to(texts[2], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<0.25");
    tl.to(gen1, { autoAlpha: 0, y: -40, duration: 0.2 }, "<");
    tl.to(satish, { x: -120, duration: 0.8, ease: "power2.inOut" }, "<");
    portraitTransition("right", 0.75);
    tl.to(satishLeft, { autoAlpha: 0, duration: 0.1 }, "<");
    tl.to(gen2, { autoAlpha: 1, y: 0,   duration: 0.8 }, "<0.15");
    if (overs(texts[2]).length) {
      tl.to(overs(texts[2]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.5");
    }
    tl.to({}, { duration: 1.8 });

    tl.addLabel("era2");
    tl.to(texts[2], { autoAlpha: 0, y: -36, duration: 0.7 });
    tl.to(texts[3], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<0.25");
    tl.to(gen2, { autoAlpha: 0, y: -40, duration: 0.2 }, "<");
    tl.to(satish, { x: 120, duration: 0.8, ease: "power2.inOut" }, "<");
    portraitTransition("left", 0.75);
    tl.to(satishRight, { autoAlpha: 0, duration: 0.1 }, "<");
    tl.to(gen3, { autoAlpha: 1, y: 0,   duration: 0.8 }, "<0.15");
    if (overs(texts[3]).length) {
      tl.to(overs(texts[3]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.5");
    }
    if (gen3Scroll) {
      tl.fromTo(gen3Scroll, { x: 0 }, { x: -460, duration: 1.5, ease: "none" });
      tl.to({}, { duration: 0.3 });
    } else {
      tl.to({}, { duration: 1.8 });
    }

    tl.addLabel("era3");
    tl.to(texts[3], { autoAlpha: 0, y: -36, duration: 0.7 });
    tl.to(texts[4], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<0.25");
    tl.to(gen3, { autoAlpha: 0, y: -40, duration: 0.6 }, "<");
    tl.to(gen4, { autoAlpha: 1, y: 0,   duration: 0.8 }, "<0.15");
    tl.to(satish, { x: 0, duration: 0.8, ease: "power2.inOut" }, "<");
    portraitTransition("left", 0.75);
    tl.to(satishLeft, { autoAlpha: 0, duration: 0.1 }, "<");
    tl.to(satishRight, { autoAlpha: 0, duration: 0.1 }, "<");
    if (overs(texts[4]).length) {
      tl.to(overs(texts[4]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.5");
    }
    tl.to({}, { duration: 2 });

    const eraTimes = ["era0", "era1", "era2", "era3"].map((l) => tl.labels[l]);
    const total = tl.duration();
    const portraitForTime = (t: number) => {
      if (t < eraTimes[0]) return "center";
      if (t < eraTimes[1]) return "left";
      if (t < eraTimes[2]) return "right";
      if (t < eraTimes[3]) return "left";
      return "left";
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(progress, { scaleY: self.progress });
        const t = self.progress * total;
        const idx = eraTimes.filter((et) => t >= et + 0.4).length - 1;
        markerRefs.current.forEach((m, i) => m?.classList.toggle("text-signal", i === idx));

        const portrait = portraitForTime(t);
        const src = portrait === "center"
          ? "/satish/portrait.png"
          : portrait === "left"
            ? "/satish/left.png"
            : "/satish/right.png";

        if (satishCenter && satishCenter.getAttribute("src") !== src) {
          satishCenter.setAttribute("src", src);
        }
      },
    });

    return () => {
      window.removeEventListener("resize", measure);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
      platformTween?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[560vh] bg-paper text-ink">
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col">
        <div className="flex-1 grid md:grid-cols-12 gap-6 md:gap-8 items-center px-6 md:px-12 lg:px-24 pt-24 pb-2 min-h-0">

          {/* Left — text column */}
          <div className="md:col-span-4 flex flex-col justify-center relative z-40">
            <div ref={textWrapRef} className="relative">

              {/* 0 — entry */}
              <div ref={(el) => { textRefs.current[0] = el; }} className="absolute inset-x-0 top-0">
                <h1 className="display text-[clamp(2.5rem,4.5vw,5rem)] max-w-[12ch] leading-[1.07]">
                  I&apos;ve been there for every <Hl>generation of search</Hl>.
                </h1>
                <p className="mt-5 text-[clamp(14px,1.1vw,17px)] text-smoke leading-relaxed max-w-[28ch]">
                  Since 2003, Satish Kumar Matta has ranked pages, survived every algorithm update,
                  and is now optimising for AI.
                </p>
              </div>

              {/* 1 — Gen 1 */}
              <div
                ref={(el) => { textRefs.current[1] = el; }}
                className="absolute inset-x-0 top-0 invisible"
                style={{ opacity: 0 }}
              >
                <p className="label text-signal mb-4">{ERAS[0].label}</p>
                <p className="display text-[clamp(2rem,3.5vw,4rem)] max-w-[18ch] leading-[1.1]">
                  Yahoo. Google. Bing. I ranked on <Hl>all of them</Hl>.
                </p>
                <p className="mt-4 text-[clamp(14px,1.1vw,17px)] text-smoke leading-relaxed max-w-[28ch]">
                  Three engines competed for the same user. I built strategies that worked across
                  every one of them simultaneously.
                </p>
              </div>

              {/* 2 — Gen 2 */}
              <div
                ref={(el) => { textRefs.current[2] = el; }}
                className="absolute inset-x-0 top-0 invisible"
                style={{ opacity: 0 }}
              >
                <p className="label text-signal mb-4">{ERAS[1].label}</p>
                <p className="display text-[clamp(2rem,3.5vw,4rem)] max-w-[18ch] leading-[1.1]">
                  One engine won. Every update was a <Hl>playbook rewrite</Hl>.
                </p>
                <p className="mt-4 text-[clamp(14px,1.1vw,17px)] text-smoke leading-relaxed max-w-[28ch]">
                  Panda. Penguin. Hummingbird. Each update wiped competitors &mdash; I decoded them
                  before most people knew they&apos;d shipped.
                </p>
              </div>

              {/* 3 — Gen 3 */}
              <div
                ref={(el) => { textRefs.current[3] = el; }}
                className="absolute inset-x-0 top-0 invisible"
                style={{ opacity: 0 }}
              >
                <p className="label text-signal mb-4">{ERAS[2].label}</p>
                <p className="display text-[clamp(2rem,3.5vw,4rem)] max-w-[18ch] leading-[1.1]">
                  The answer box replaced the link. <Hl>I optimised for that too</Hl>.
                </p>
                <p className="mt-4 text-[clamp(14px,1.1vw,17px)] text-smoke leading-relaxed max-w-[28ch]">
                  AI Overviews, zero-click results, featured snippets &mdash; when the format of
                  search changed, the strategy changed with it.
                </p>
              </div>

              {/* 4 — Now */}
              <div
                ref={(el) => { textRefs.current[4] = el; }}
                className="absolute inset-x-0 top-0 invisible"
                style={{ opacity: 0 }}
              >
                <p className="label text-signal mb-4">{ERAS[3].label}</p>
                <p className="display text-[clamp(2rem,3.5vw,4rem)] max-w-[18ch] leading-[1.1]">
                  Whatever search becomes, <Hl>I&apos;m already building for it</Hl>.
                </p>
                <p className="mt-4 text-[clamp(14px,1.1vw,17px)] text-smoke leading-relaxed max-w-[28ch]">
                  Across ChatGPT, Perplexity, Gemini, and Google AI &mdash; your brand needs to show
                  up where answers come from. That&apos;s what I do.
                </p>
              </div>

            </div>
          </div>

          {/* Right — visual stage */}
          <div
            ref={stageRef}
            className="hidden md:block md:col-span-8 md:col-start-5 relative h-[78vh] min-h-0"
          >
            {/* Satish portrait — centered in right half, cropped at upper body */}
            <div
              ref={satishRef}
              className="absolute inset-0 z-30 pointer-events-none flex items-start justify-center"
              style={{ opacity: 0 }}
            >
              <img
                ref={satishCenterRef}
                src="/satish/portrait.png"
                alt="Satish Kumar Matta"
                className="pointer-events-none absolute top-0 h-auto w-[40%] -translate-x-1/2"
                style={{
                  left: "33.333%",
                  WebkitMaskImage: "linear-gradient(to bottom, black 38%, transparent 55%)",
                  maskImage: "linear-gradient(to bottom, black 38%, transparent 55%)",
                }}
              />
              <img
                ref={satishLeftRef}
                src="/satish/left.png"
                alt=""
                className="pointer-events-none absolute top-0 h-auto w-[40%] -translate-x-1/2"
                aria-hidden="true"
                style={{ left: "72%", opacity: 0 }}
              />
              <img
                ref={satishRightRef}
                src="/satish/right.png"
                alt=""
                className="pointer-events-none absolute top-0 h-auto w-[40%] -translate-x-1/2"
                aria-hidden="true"
                style={{ left: "28%", opacity: 0 }}
              />
            </div>

            <div ref={platformPanelRef} className="absolute right-[5%] top-1/2 z-100 hidden xl:block -translate-y-1/2">
              <div className="h-[56vh]">
                <div
                  ref={platformScrollRef}
                  className="flex flex-col items-center gap-10 py-4"
                >
                  {[...HERO_PLATFORM_NAMES, ...HERO_PLATFORM_NAMES].map((platform, index) => {
                    const Logo = PLATFORM_LOGOS[platform];
                    return (
                      <div key={`${platform}-${index}`} className="flex w-full justify-center">
                        <div className="flex h-28 w-28 items-center justify-center shrink-0">
                          <Logo className="h-full w-full" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Gen1Visual domRef={gen1Ref} />
            <Gen2Visual domRef={gen2Ref} />
            <Gen3Visual domRef={gen3Ref} />
            <Gen4Visual domRef={gen4Ref} />
          </div>

        </div>

        {/* Vertical timeline */}
        <div
          ref={timelineWrapRef}
          className="hidden md:flex absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-40 items-stretch gap-3 h-[52vh]"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col justify-between items-end">
            {ERAS.map((era, i) => (
              <span
                key={era.year}
                ref={(el) => { markerRefs.current[i] = el; }}
                className="label text-smoke-light transition-colors duration-300"
              >
                {era.year}
              </span>
            ))}
          </div>
          <div className="relative w-px bg-fog">
            <div ref={progressRef} className="absolute inset-0 bg-signal origin-top scale-y-0" />
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-6 right-5 lg:right-8 z-40 items-center gap-2 label text-smoke-light">
          Scroll
          <span className="inline-block animate-bounce text-sm leading-none" aria-hidden="true">&#8595;</span>
        </div>
      </div>
    </section>
  );
}
