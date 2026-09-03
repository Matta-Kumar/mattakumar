"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hl } from "@/components/anim/Highlight";
import Magnetic from "@/components/anim/Magnetic";
import { PLATFORM_LOGOS } from "./PlatformLogos";
import BrowserVisual, { type BrowserVisualHandle } from "./BrowserVisual";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const ERAS = [
  { year: "2003", label: "Gen 1 — ten blue links" },
  { year: "2011", label: "Gen 2 — the algorithm era" },
  { year: "2023", label: "Gen 3 — AI gives answers" },
  { year: "Now",  label: "Present — every AI" },
];

const HERO_PLATFORM_NAMES = [
  "AI Overviews",
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Claude",
  "Copilot",
  "Bing",
  'Grok',
  'Meta',
];

// ─── Gen4 dashboard data ─────────────────────────────────────────────────────

const GEN4_PLATFORMS = [
  { name: "AI Overviews", color: "#4285F4", pct: 94, trend: 8,  spark: [55, 61, 70, 73, 81, 87, 94] },
  { name: "ChatGPT",      color: "#10a37f", pct: 89, trend: 14, spark: [42, 54, 62, 67, 75, 81, 89] },
  { name: "Perplexity",   color: "#20b8cd", pct: 91, trend: 11, spark: [48, 58, 64, 71, 77, 86, 91] },
  { name: "Gemini",       color: "#7c3aed", pct: 87, trend: 6,  spark: [60, 66, 69, 75, 77, 84, 87] },
  { name: "Claude",       color: "#cc785c", pct: 82, trend: 19, spark: [30, 41, 49, 59, 65, 75, 82] },
  { name: "Copilot",      color: "#0078D4", pct: 79, trend: 3,  spark: [65, 69, 71, 75, 75, 79, 79] },
];

const CHART_WEEKS = ["7 wks ago", "", "", "Today's trend", "", "", "Now"];

// ─── Visual sub-components ───────────────────────────────────────────────────

function MultiLineChart({
  platforms,
  w = 420,
  h = 230,
}: {
  platforms: typeof GEN4_PLATFORMS;
  w?: number;
  h?: number;
}) {
  const padL = 26, padR = 34, padT = 10, padB = 20;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const allValues = platforms.flatMap((p) => p.spark);
  const min = Math.floor(Math.min(...allValues) / 10) * 10;
  const max = Math.ceil(Math.max(...allValues) / 10) * 10;
  const spread = max - min || 1;

  const toX = (i: number, len: number) => padL + (i / (len - 1)) * plotW;
  const toY = (v: number) => padT + plotH - ((v - min) / spread) * plotH;

  // Catmull-Rom → cubic Bezier: a real spline through every point, not a subtle midpoint fudge.
  const smoothPath = (data: number[]) => {
    const pts = data.map((v, i) => [toX(i, data.length), toY(v)] as const);
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  };

  const yTicks = [min, (min + max) / 2, max];
  const byRank = [...platforms].sort((a, b) => b.pct - a.pct);
  const leader = byRank[0];
  const leaderPts = leader.spark.map((v, i) => [toX(i, leader.spark.length), toY(v)] as const);
  const areaD = `${smoothPath(leader.spark)} L ${leaderPts[leaderPts.length - 1][0].toFixed(1)} ${(padT + plotH).toFixed(1)} L ${leaderPts[0][0].toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="w-full h-auto">
      {yTicks.map((v) => {
        const y = toY(v);
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#eef0f3" strokeWidth="1" />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="8.5" fill="#a7abb4">{Math.round(v)}%</text>
          </g>
        );
      })}
      {CHART_WEEKS.map((label, i) => {
        if (!label) return null;
        const x = toX(i, CHART_WEEKS.length);
        const anchor = i === 0 ? "start" : i === CHART_WEEKS.length - 1 ? "end" : "middle";
        return (
          <text key={i} x={x} y={h - 5} textAnchor={anchor} fontSize="8.5" fill="#a7abb4">{label}</text>
        );
      })}
      <path d={areaD} fill={leader.color} opacity="0.07" />
      {platforms.map((p) => (
        <path
          key={p.name}
          d={smoothPath(p.spark)}
          fill="none"
          stroke={p.color}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {platforms.map((p) => {
        const x = toX(p.spark.length - 1, p.spark.length);
        const y = toY(p.spark[p.spark.length - 1]);
        return (
          <g key={p.name + "-end"}>
            <circle cx={x} cy={y} r="2.25" fill="white" stroke={p.color} strokeWidth="1.25" />
            <text x={x + 6} y={y + 3} fontSize="8" fontWeight="600" fill={p.color}>{p.pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}

function Gen4Visual({ domRef }: { domRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={domRef}
      className="absolute inset-0 z-20 invisible pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div className="w-full pointer-events-auto">
        <div
          className="rounded-2xl overflow-hidden bg-white border border-[#ececef]"
          style={{ boxShadow: "0 32px 64px -12px rgba(16,24,40,0.18), 0 8px 24px rgba(16,24,40,0.08)" }}
        >
          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-[#ececef]">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-ink/40 text-[11px] font-medium uppercase tracking-widest">
                AI Search Presence
              </span>
              <span className="ml-auto text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Live
              </span>
            </div>
            <p className="text-ink text-[16px] font-medium leading-snug mb-3">
              &quot;best digital marketing consultant&quot;
            </p>
            <div>
              <p className="text-ink/40 text-[10px] mb-1 uppercase tracking-wide">
                Overall AI Visibility
              </p>
              <p className="text-ink text-[26px] font-bold leading-none">88.6%</p>
              <p className="text-emerald-600 text-[10px] mt-1">&#8593; avg +10% across platforms &middot; 7-week trend</p>
            </div>
          </div>

          {/* Platforms (left) + chart (right) */}
          <div className="flex gap-6 px-6 py-5">
            <div className="w-[152px] shrink-0 flex flex-col gap-3 border-r border-[#ececef] pr-5">
              {GEN4_PLATFORMS.map((p) => {
                const Logo = PLATFORM_LOGOS[p.name as keyof typeof PLATFORM_LOGOS];
                return (
                  <div key={p.name} className="flex items-center gap-2">
                    {Logo ? (
                      <Logo className="w-4 h-4 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                    )}
                    <span className="text-ink/60 text-[11px] leading-tight truncate flex-1 min-w-0">{p.name}</span>
                    <span className="text-[12px] font-semibold leading-tight shrink-0" style={{ color: p.color }}>{p.pct}%</span>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 min-w-0 flex items-center">
              <MultiLineChart platforms={GEN4_PLATFORMS} />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-[#ececef] flex items-center justify-between">
            <p className="text-ink/40 text-[11px]">6 platforms &middot; 7-week history</p>
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
  const sectionRef        = useRef<HTMLElement>(null);
  const textWrapRef       = useRef<HTMLDivElement>(null);
  const textRefs          = useRef<(HTMLDivElement | null)[]>([]);
  const descWrapRef       = useRef<HTMLDivElement>(null);
  const descRefs          = useRef<(HTMLParagraphElement | null)[]>([]);
  const stageRef          = useRef<HTMLDivElement>(null);
  const satishRef         = useRef<HTMLDivElement>(null);
  const satishCenterRef   = useRef<HTMLImageElement>(null);
  const browserVisualRef  = useRef<BrowserVisualHandle>(null);
  const gen4Ref           = useRef<HTMLDivElement>(null);
  const platformPanelRef  = useRef<HTMLDivElement>(null);
  const platformScrollRef = useRef<HTMLDivElement>(null);
  const timelineWrapRef   = useRef<HTMLDivElement>(null);
  const progressRef       = useRef<HTMLDivElement>(null);
  const markerRefs        = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section        = sectionRef.current;
    const textWrap       = textWrapRef.current;
    const descWrap       = descWrapRef.current;
    const stage          = stageRef.current;
    const satish         = satishRef.current;
    const satishCenter   = satishCenterRef.current;
    const bv             = browserVisualRef.current;
    const gen4           = gen4Ref.current;
    const platformPanel  = platformPanelRef.current;
    const platformScroll = platformScrollRef.current;
    const progress       = progressRef.current;
    const tlWrap         = timelineWrapRef.current;
    const texts          = textRefs.current.filter(Boolean) as HTMLDivElement[];
    const descs          = descRefs.current;

    if (
      !section || !textWrap || !descWrap || !stage || !satish ||
      !satishCenter ||
      !bv || !gen4 ||
      !platformPanel || !progress || !tlWrap || texts.length < 5 ||
      !descs[1] || !descs[2] || !descs[3] || !descs[4]
    ) return;

    const browser     = bv.browserRef.current!;
    const wrap        = bv.wrapperRef.current!;
    const cursor      = bv.cursorRef.current!;
    const tabs        = bv.tabRefs.map((r) => r.current!);
    const panels      = bv.contentRefs.map((r) => r.current!);
    const serpScroll  = bv.serpScrollRef.current!;
    const serp = {
      snippet:     bv.serpRefs.snippet.current!,
      shopping:    bv.serpRefs.shopping.current!,
      paa:         bv.serpRefs.paa.current!,
      localPack:   bv.serpRefs.localPack.current!,
      images:      bv.serpRefs.images.current!,
      videos:      bv.serpRefs.videos.current!,
      recommended: bv.serpRefs.recommended.current!,
    };
    const xBtns   = bv.xButtonRefs.map((r) => r.current!);
    const address = bv.addressRef.current!;

    if (!browser || !wrap || !cursor || !serpScroll || !address || tabs.some((t) => !t) || panels.some((p) => !p)) return;

    // ── Cursor position helpers ──────────────────────────────────────────────
    const getTabX = (tab: HTMLElement): number => {
      const wRect = wrap.getBoundingClientRect();
      const tRect = tab.getBoundingClientRect();
      return tRect.left - wRect.left + tRect.width / 2;
    };
    const getXBtnX = (btn: HTMLElement): number => {
      const wRect = wrap.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      return bRect.left - wRect.left + bRect.width / 2;
    };

    const measure = () => {
      const max = Math.max(...texts.slice(1).map((t) => t.offsetHeight));
      textWrap.style.minHeight = max + "px";
      const descMax = Math.max(descs[1]!.offsetHeight, descs[2]!.offsetHeight, descs[3]!.offsetHeight, descs[4]!.offsetHeight);
      descWrap.style.minHeight = descMax + "px";
      ScrollTrigger.refresh();
    };
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([satish, tlWrap], { autoAlpha: 1 });
      gsap.set(texts[0], { autoAlpha: 1 });
      gsap.set(satishCenter, { autoAlpha: 1 });
      gsap.set(browser, { autoAlpha: 1 });
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

    const satishEntrance = gsap.fromTo(
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

    // ── Initial states ───────────────────────────────────────────────────────
    gsap.set(tlWrap, { autoAlpha: 0 });
    gsap.set([textWrap, descWrap], { autoAlpha: 0 });
    gsap.set(texts.slice(1), { autoAlpha: 0, y: 36 });
    gsap.set([descs[1], descs[2], descs[3], descs[4]], { autoAlpha: 0, y: 36 });
    gsap.set(gen4, { autoAlpha: 0, y: 40 });
    gsap.set(satishCenter, { autoAlpha: 1 });
    gsap.set(platformPanel, { autoAlpha: 1 });

    // Browser visual initial states
    gsap.set(browser, { autoAlpha: 0, y: 40 });
    gsap.set(cursor, { autoAlpha: 0, y: 48 });
    gsap.set([tabs[3], tabs[4], tabs[5], tabs[6]], { autoAlpha: 0, x: 20 });
    gsap.set([panels[1], panels[2], panels[3], panels[4], panels[5], panels[6], panels[7]], { autoAlpha: 0 });
    gsap.set(
      [serp.snippet, serp.shopping, serp.paa, serp.localPack, serp.images, serp.videos, serp.recommended],
      { autoAlpha: 0, y: 8 }
    );
    gsap.set(serpScroll, { y: 0 });
    gsap.set(wrap, { scale: 1 });

    const allScrollOvers = texts.slice(1).flatMap((t) =>
      Array.from(t.querySelectorAll<HTMLElement>(".hl-over"))
    );
    gsap.set(allScrollOvers, { clipPath: "inset(0 100% 0 0)" });

    const overs = (t: HTMLDivElement) =>
      Array.from(t.querySelectorAll<HTMLElement>(".hl-over"));

    // ── Per-era browser loops — each gen's internal choreography runs on its own
    // clock, independent of scroll speed. Scroll only ever decides *which* loop is
    // currently playing (see setActiveEra below); it never scrubs their content.
    const clickPulseOn = (loop: gsap.core.Timeline) => {
      loop.to(cursor, { scale: 0.78, duration: 0.07, ease: "power2.in" });
      loop.to(cursor, { scale: 1,    duration: 0.10, ease: "power2.out" });
    };
    const activateTabOn = (loop: gsap.core.Timeline, on: HTMLElement, ...off: HTMLElement[]) => {
      loop.to(on,  { backgroundColor: "white",                 color: "#333", duration: 0.15 }, "<0.04");
      loop.to(off, { backgroundColor: "rgba(221,221,221,0.6)", color: "#666", duration: 0.15 }, "<");
    };

    // Gen1 — Yahoo → Google → Bing → Google cursor-click cycle
    const gen1Loop = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "power2.inOut" } });
    gen1Loop.set([tabs[0], tabs[2]], { clearProps: "width,paddingLeft,paddingRight,minWidth,opacity" });
    gen1Loop.set(tabs[0], { backgroundColor: "white", color: "#333" });
    gen1Loop.set([tabs[1], tabs[2]], { backgroundColor: "rgba(221,221,221,0.6)", color: "#666" });
    gen1Loop.set([tabs[3], tabs[4], tabs[5], tabs[6]], { autoAlpha: 0, x: 20 });
    gen1Loop.set(panels[0], { autoAlpha: 1 });
    gen1Loop.set([panels[1], panels[2], panels[3], panels[4], panels[5], panels[6], panels[7]], { autoAlpha: 0 });
    gen1Loop.set(serpScroll, { y: 0 });
    gen1Loop.set(
      [serp.snippet, serp.shopping, serp.paa, serp.localPack, serp.images, serp.videos, serp.recommended],
      { autoAlpha: 0, y: 8 }
    );
    gen1Loop.set(address, { textContent: "search.yahoo.com/search?p=best+digital+marketing+consultant" });
    gen1Loop.set(cursor, { autoAlpha: 0, x: () => getTabX(tabs[0]), y: 48, scale: 1 });

    gen1Loop.to(cursor, { autoAlpha: 1, duration: 0.3 }, "+=0.5");
    clickPulseOn(gen1Loop);
    gen1Loop.to({}, { duration: 0.6 });

    gen1Loop.to(cursor, { x: () => getTabX(tabs[1]), duration: 0.4 });
    activateTabOn(gen1Loop, tabs[1], tabs[0]);
    gen1Loop.set(address, { textContent: "www.google.com/search?q=best+digital+marketing+consultant" }, "<");
    clickPulseOn(gen1Loop);
    gen1Loop.to(panels[0], { autoAlpha: 0, duration: 0.2 }, "<0.04");
    gen1Loop.to(panels[1], { autoAlpha: 1, duration: 0.3 }, "<0.07");
    gen1Loop.to({}, { duration: 0.6 });

    gen1Loop.to(cursor, { x: () => getTabX(tabs[2]), duration: 0.4 });
    activateTabOn(gen1Loop, tabs[2], tabs[1]);
    gen1Loop.set(address, { textContent: "www.bing.com/search?q=best+digital+marketing+consultant" }, "<");
    clickPulseOn(gen1Loop);
    gen1Loop.to(panels[1], { autoAlpha: 0, duration: 0.2 }, "<0.04");
    gen1Loop.to(panels[2], { autoAlpha: 1, duration: 0.3 }, "<0.07");
    gen1Loop.to({}, { duration: 0.6 });

    gen1Loop.to(cursor, { x: () => getTabX(tabs[1]), duration: 0.4 });
    activateTabOn(gen1Loop, tabs[1], tabs[2]);
    gen1Loop.set(address, { textContent: "www.google.com/search?q=best+digital+marketing+consultant" }, "<");
    clickPulseOn(gen1Loop);
    gen1Loop.to(panels[2], { autoAlpha: 0, duration: 0.2 }, "<0.04");
    gen1Loop.to(panels[1], { autoAlpha: 1, duration: 0.3 }, "<0.07");
    gen1Loop.to(cursor, { autoAlpha: 0, duration: 0.25 }, "+=0.8");
    gen1Loop.to({}, { duration: 1.0 });

    // Gen2 — Yahoo/Bing already closed, enriched SERP features stagger in with inner scroll
    const gen2Loop = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "power2.inOut" } });
    gen2Loop.set([tabs[0], tabs[2]], { width: 0, paddingLeft: 0, paddingRight: 0, minWidth: 0, opacity: 0 });
    gen2Loop.set(tabs[1], { backgroundColor: "white", color: "#333" });
    gen2Loop.set([tabs[3], tabs[4], tabs[5], tabs[6]], { autoAlpha: 0, x: 20 });
    gen2Loop.set(panels[1], { autoAlpha: 1 });
    gen2Loop.set([panels[0], panels[2], panels[3], panels[4], panels[5], panels[6], panels[7]], { autoAlpha: 0 });
    gen2Loop.set(
      [serp.snippet, serp.shopping, serp.paa, serp.localPack, serp.images, serp.videos, serp.recommended],
      { autoAlpha: 0, y: 8 }
    );
    gen2Loop.set(serpScroll, { y: 0 });
    gen2Loop.set(address, { textContent: "www.google.com/search?q=best+digital+marketing+consultant" });
    gen2Loop.set(cursor, { autoAlpha: 0 });

    gen2Loop.to(serpScroll,   { y: -60,  duration: 0.6 }, "+=0.7");
    gen2Loop.to(serp.snippet, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.3");

    gen2Loop.to(serpScroll,    { y: -155, duration: 0.6 }, "+=0.35");
    gen2Loop.to(serp.shopping, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.3");

    gen2Loop.to(serpScroll, { y: -250, duration: 0.6 }, "+=0.35");
    gen2Loop.to(serp.paa,   { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.3");

    gen2Loop.to(serpScroll,     { y: -375, duration: 0.6 }, "+=0.35");
    gen2Loop.to(serp.localPack, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.3");

    gen2Loop.to(serpScroll,  { y: -480, duration: 0.6 }, "+=0.35");
    gen2Loop.to(serp.images, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.3");
    gen2Loop.to(serp.videos, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.25");

    gen2Loop.to(serpScroll,       { y: -590, duration: 0.6 }, "+=0.2");
    gen2Loop.to(serp.recommended, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.3");
    gen2Loop.to({}, { duration: 2.0 });
    gen2Loop.to(serpScroll, { y: 0, duration: 0.8, ease: "power2.inOut" });
    gen2Loop.to({}, { duration: 0.4 });

    // Gen3 — AI tabs already open, ChatGPT → Claude → Perplexity → Gemini → Google AI Mode
    const gen3Loop = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "power2.inOut" } });
    gen3Loop.set([tabs[0], tabs[2]], { width: 0, paddingLeft: 0, paddingRight: 0, minWidth: 0, opacity: 0 });
    gen3Loop.set([tabs[3], tabs[4], tabs[5], tabs[6]], { autoAlpha: 1, x: 0 });
    gen3Loop.set(tabs[3], { backgroundColor: "white", color: "#333" });
    gen3Loop.set([tabs[1], tabs[4], tabs[5], tabs[6]], { backgroundColor: "rgba(221,221,221,0.6)", color: "#666" });
    gen3Loop.set(panels[3], { autoAlpha: 1 });
    gen3Loop.set([panels[0], panels[1], panels[2], panels[4], panels[5], panels[6], panels[7]], { autoAlpha: 0 });
    gen3Loop.set(serpScroll, { y: 0 });
    gen3Loop.set(
      [serp.snippet, serp.shopping, serp.paa, serp.localPack, serp.images, serp.videos, serp.recommended],
      { autoAlpha: 0, y: 8 }
    );
    gen3Loop.set(address, { textContent: "chatgpt.com/c/best-digital-marketing-consultant" });
    gen3Loop.set(cursor, { autoAlpha: 0, x: () => getTabX(tabs[3]), y: 48, scale: 1 });

    gen3Loop.to(cursor, { autoAlpha: 1, duration: 0.3 }, "+=0.6");
    clickPulseOn(gen3Loop);
    gen3Loop.to({}, { duration: 0.7 });

    gen3Loop.to(cursor, { x: () => getTabX(tabs[4]), duration: 0.4 });
    activateTabOn(gen3Loop, tabs[4], tabs[3]);
    gen3Loop.set(address, { textContent: "claude.ai/chat/best-digital-marketing-consultant" }, "<");
    clickPulseOn(gen3Loop);
    gen3Loop.to(panels[3], { autoAlpha: 0, duration: 0.2 }, "<0.04");
    gen3Loop.to(panels[4], { autoAlpha: 1, duration: 0.3 }, "<0.07");
    gen3Loop.to({}, { duration: 0.7 });

    gen3Loop.to(cursor, { x: () => getTabX(tabs[5]), duration: 0.4 });
    activateTabOn(gen3Loop, tabs[5], tabs[4]);
    gen3Loop.set(address, { textContent: "www.perplexity.ai/search?q=best+digital+marketing+consultant" }, "<");
    clickPulseOn(gen3Loop);
    gen3Loop.to(panels[4], { autoAlpha: 0, duration: 0.2 }, "<0.04");
    gen3Loop.to(panels[5], { autoAlpha: 1, duration: 0.3 }, "<0.07");
    gen3Loop.to({}, { duration: 0.7 });

    gen3Loop.to(cursor, { x: () => getTabX(tabs[6]), duration: 0.4 });
    activateTabOn(gen3Loop, tabs[6], tabs[5]);
    gen3Loop.set(address, { textContent: "gemini.google.com/app" }, "<");
    clickPulseOn(gen3Loop);
    gen3Loop.to(panels[5], { autoAlpha: 0, duration: 0.2 }, "<0.04");
    gen3Loop.to(panels[6], { autoAlpha: 1, duration: 0.3 }, "<0.07");
    gen3Loop.to({}, { duration: 0.9 });

    gen3Loop.to(cursor, { x: () => getTabX(tabs[1]), duration: 0.4 });
    activateTabOn(gen3Loop, tabs[1], tabs[6]);
    gen3Loop.set(address, { textContent: "www.google.com/search?q=best+digital+marketing+consultant&udm=50" }, "<");
    clickPulseOn(gen3Loop);
    gen3Loop.to(panels[6], { autoAlpha: 0, duration: 0.2 }, "<0.04");
    gen3Loop.to(panels[7], { autoAlpha: 1, duration: 0.3 }, "<0.07");
    gen3Loop.to(cursor, { autoAlpha: 0, duration: 0.25 }, "+=1.2");
    gen3Loop.to({}, { duration: 1.0 });

    // Only one loop plays at a time — whichever era is currently scrolled to.
    // Entering an era always restarts its loop fresh; leaving just pauses it.
    const genLoops = [gen1Loop, gen2Loop, gen3Loop];
    let activeEra = -1;
    const setActiveEra = (idx: number) => {
      if (idx === activeEra) return;
      activeEra = idx;
      genLoops.forEach((loop, i) => {
        if (i === idx) loop.restart();
        else loop.pause();
      });
    };

    // ── Outer scroll timeline — just which era is showing, kept short ─────────
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    // ── Entry hold ──────────────────────────────────────────────────────────
    tl.to({}, { duration: 1.5 });

    // ── era0 — Gen1 ────────────────────────────────────────────────────────
    tl.addLabel("era0");
    tl.to(platformPanel, { autoAlpha: 0, duration: 0.9, ease: "power2.out" }, "<0.15");

    // Step 1 — the opening line exits first, before anything else moves
    tl.to(texts[0], { autoAlpha: 0, y: -36, duration: 0.6 });

    // Step 2 — once it's clear, Satish fades out, timeline + top banner fade in, Gen1 text crossfades in
    tl.to(tlWrap, { autoAlpha: 1, duration: 0.6 }, "<0.2");
    tl.to([textWrap, descWrap], { autoAlpha: 1, duration: 0.6 }, "<");
    tl.to(satish, { autoAlpha: 0, y: -20, duration: 0.5 }, "<0");
    tl.to(texts[1], { autoAlpha: 1, y: 0, duration: 0.7 }, "<0.15");
    tl.to(descs[1], { autoAlpha: 1, y: 0, duration: 0.7 }, "<");

    // Browser fades in — after the text has fully settled, not overlapping its fade-in
    tl.to(browser, { autoAlpha: 1, y: 0, duration: 0.75 }, "+=0.2");

    if (overs(texts[1]).length) {
      tl.to(overs(texts[1]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.4");
    }
    tl.to({}, { duration: 2.5 });

    // ── era1 — Gen2 ────────────────────────────────────────────────────────
    tl.addLabel("era1");
    tl.to(texts[1], { autoAlpha: 0, y: -36, duration: 0.7 });
    tl.to(descs[1], { autoAlpha: 0, y: -36, duration: 0.7 }, "<");
    tl.to(texts[2], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<0.25");
    tl.to(descs[2], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<");
    if (overs(texts[2]).length) {
      tl.to(overs(texts[2]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.2");
    }
    tl.to({}, { duration: 2.5 });

    // ── era2 — Gen3 ────────────────────────────────────────────────────────
    tl.addLabel("era2");
    tl.to(texts[2], { autoAlpha: 0, y: -36, duration: 0.7 });
    tl.to(descs[2], { autoAlpha: 0, y: -36, duration: 0.7 }, "<");
    tl.to(texts[3], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<0.25");
    tl.to(descs[3], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<");
    if (overs(texts[3]).length) {
      tl.to(overs(texts[3]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.3");
    }
    tl.to({}, { duration: 2.5 });

    // ── era3 — Gen4 dark dashboard ────────────────────────────────────────────
    tl.addLabel("era3");
    tl.to(texts[3], { autoAlpha: 0, y: -36, duration: 0.7 });
    tl.to(descs[3], { autoAlpha: 0, y: -36, duration: 0.7 }, "<");
    tl.to(texts[4], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<0.25");
    tl.to(descs[4], { autoAlpha: 1, y: 0,   duration: 0.7 }, "<");
    tl.to(browser, { autoAlpha: 0, y: -40, duration: 0.6 }, "<");
    tl.to(gen4,    { autoAlpha: 1, y: 0,   duration: 0.8 }, "<0.15");
    if (overs(texts[4]).length) {
      tl.to(overs(texts[4]), { clipPath: "inset(0 0% 0 0)", duration: 0.6, stagger: 0.14, ease: "power4.inOut" }, "<0.5");
    }
    tl.to({}, { duration: 2.5 });

    const eraTimes = ["era0", "era1", "era2", "era3"].map((l) => tl.labels[l]);
    const total    = tl.duration();

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // The scroll-driven timeline now owns Satish's autoAlpha (it fades him out at
        // era0) — once the user actually scrolls, kill the standalone entrance tween so
        // its still-running render doesn't fight the scrubbed one and leave him stuck visible.
        satishEntrance.kill();
        gsap.set(progress, { scaleY: self.progress });
        const t   = self.progress * total;
        const idx = eraTimes.filter((et) => t >= et + 0.4).length - 1;
        markerRefs.current.forEach((m, i) => m?.classList.toggle("text-signal", i === idx));
        setActiveEra(idx);
      },
    });

    return () => {
      satishEntrance.kill();
      window.removeEventListener("resize", measure);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
      genLoops.forEach((loop) => loop.kill());
      platformTween?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[450vh] bg-paper text-ink">
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between pt-24 min-h-0 w-full">

          {/* Left — text column (entry line only; Gen1/2/3/Now move to the top-center banner below) */}
          <div className="flex flex-col justify-center relative z-40 w-full md:w-2/5 px-6 md:px-12 lg:px-24">
            {/* 0 — entry */}
            <div ref={(el) => { textRefs.current[0] = el; }}>
              <h1 className="display text-[clamp(2.5rem,4.5vw,5rem)] max-w-[12ch] leading-[1.07]">
                I&apos;ve been there for every <Hl>generation of search.</Hl>
              </h1>
              <p className="mt-5 text-[clamp(14px,1.1vw,17px)] text-smoke leading-relaxed max-w-[28ch]">
                Since 2003, Satish Kumar Matta has ranked pages, survived every algorithm update,
                and is now optimising for AI.
              </p>
              <div className="mt-8">
                <Magnetic>
                  <a
                    href="https://calendly.com/mattakumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sweep inline-block bg-ink text-paper text-sm font-medium px-7 py-4 rounded-full"
                  >
                    <span>Book a call</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Entry-only overlay — Satish portrait + platform logo panel (part of the opening state) */}
          <div
            ref={stageRef}
            className="flex flex-row items-center justify-center md:justify-end w-full md:w-3/5 gap-3 h-full"
          >
            {/* Satish portrait */}
            <div
              ref={satishRef}
              className="relative z-30 shrink-0 pointer-events-none w-3/5 md:w-2/5 item-center justify-center flex flex-col self-start md:self-center md:pt-0"
              style={{ opacity: 0 }}
            >
              <img
                ref={satishCenterRef}
                src="/satish/short-portrait.png"
                alt="Satish Kumar Matta"
                className="pointer-events-none h-max w-full object-contain"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 98%)",
                  maskImage: "linear-gradient(to bottom, black 82%, transparent 98%)",
                }}
              />
            </div>

            <div ref={platformPanelRef} className="absolute md:relative right-0 bottom-10 md:bottom-0 z-100 shrink-0 self-start md:self-center md:pt-0 w-1/3">
              <div className="h-[64vh] md:h-[85vh] overflow-hidden">
                <div ref={platformScrollRef} className="flex flex-col items-center gap-4 md:gap-10 py-4">
                  {[...HERO_PLATFORM_NAMES, ...HERO_PLATFORM_NAMES].map((platform, index) => {
                    const Logo = PLATFORM_LOGOS[platform];
                    return (
                      <div key={`${platform}-${index}`} className="flex w-full justify-center">
                        <div className="flex h-10 w-10 md:h-28 md:w-28 items-center justify-center shrink-0">
                          <Logo className={"h-full w-full"} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Gen1/2/3/Now content — a real flex column: title+description row, then the visual below it */}
        <div className="flex absolute left-4 right-4 md:left-12 md:right-12 lg:left-24 lg:right-24 top-32 md:top-28 bottom-4 md:bottom-8 z-30 flex-col pointer-events-none">

        {/* Row — title (mobile: stacked above description; desktop: side by side) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-10 shrink-0">

          {/* Title */}
          <div ref={textWrapRef} className="relative text-left pointer-events-auto shrink-0 w-full md:w-[46%] md:max-w-[560px]" style={{ opacity: 0 }}>

            {/* 1 — Gen 1 */}
            <div
              ref={(el) => { textRefs.current[1] = el; }}
              className="absolute inset-x-0 top-0 invisible"
              style={{ opacity: 0 }}
            >
              <p className="label text-signal mb-4">{ERAS[0].label}</p>
              <p className="display text-[clamp(1.5rem,2.4vw,2.75rem)] max-w-[16ch] leading-[1.15]">
                Yahoo. Google. Bing. I ranked on <Hl>all of them</Hl>.
              </p>
            </div>

            {/* 2 — Gen 2 */}
            <div
              ref={(el) => { textRefs.current[2] = el; }}
              className="absolute inset-x-0 top-0 invisible"
              style={{ opacity: 0 }}
            >
              <p className="label text-signal mb-4">{ERAS[1].label}</p>
              <p className="display text-[clamp(1.5rem,2.4vw,2.75rem)] max-w-[16ch] leading-[1.15]">
                One engine won. Every update was a <Hl>playbook rewrite</Hl>.
              </p>
            </div>

            {/* 3 — Gen 3 */}
            <div
              ref={(el) => { textRefs.current[3] = el; }}
              className="absolute inset-x-0 top-0 invisible"
              style={{ opacity: 0 }}
            >
              <p className="label text-signal mb-4">{ERAS[2].label}</p>
              <p className="display text-[clamp(1.5rem,2.4vw,2.75rem)] max-w-[16ch] leading-[1.15]">
                The answer box replaced the link. <Hl>I optimised for that too</Hl>.
              </p>
            </div>

            {/* 4 — Now */}
            <div
              ref={(el) => { textRefs.current[4] = el; }}
              className="absolute inset-x-0 top-0 invisible"
              style={{ opacity: 0 }}
            >
              <p className="label text-signal mb-4">{ERAS[3].label}</p>
              <p className="display text-[clamp(1.5rem,2.4vw,2.75rem)] max-w-[16ch] leading-[1.15]">
                Whatever search becomes, <Hl>I&apos;m already building for it</Hl>.
              </p>
            </div>

          </div>

          {/* Description */}
          <div ref={descWrapRef} className="relative text-left pointer-events-auto shrink-0 w-full md:w-[30%] md:max-w-[340px]" style={{ opacity: 0 }}>

            <p
              ref={(el) => { descRefs.current[1] = el; }}
              className="absolute inset-x-0 top-0 invisible text-[clamp(13px,1vw,15px)] text-smoke leading-relaxed"
              style={{ opacity: 0 }}
            >
              Three engines competed for the same user. I built strategies that worked across
              every one of them simultaneously.
            </p>

            <p
              ref={(el) => { descRefs.current[2] = el; }}
              className="absolute inset-x-0 top-0 invisible text-[clamp(13px,1vw,15px)] text-smoke leading-relaxed"
              style={{ opacity: 0 }}
            >
              Panda. Penguin. Hummingbird. Each update wiped competitors &mdash; I decoded them
              before most people knew they&apos;d shipped.
            </p>

            <p
              ref={(el) => { descRefs.current[3] = el; }}
              className="absolute inset-x-0 top-0 invisible text-[clamp(13px,1vw,15px)] text-smoke leading-relaxed"
              style={{ opacity: 0 }}
            >
              AI Overviews, zero-click results, featured snippets &mdash; when the format of
              search changed, the strategy changed with it.
            </p>

            <p
              ref={(el) => { descRefs.current[4] = el; }}
              className="absolute inset-x-0 top-0 invisible text-[clamp(13px,1vw,15px)] text-smoke leading-relaxed"
              style={{ opacity: 0 }}
            >
              Across ChatGPT, Perplexity, Gemini, and Google AI &mdash; your brand needs to show
              up where answers come from. That&apos;s what I do.
            </p>

          </div>
        </div>

        {/* Visual — normal flow below the row; BrowserVisual sets the box's natural height, Gen4 overlays it for the crossfade */}
        <div className="relative mx-auto mt-6 md:mt-14 pointer-events-auto w-full md:w-[min(960px,74%)]">
          <BrowserVisual ref={browserVisualRef} />
          <Gen4Visual domRef={gen4Ref} />
        </div>

        </div>

        {/* Vertical timeline */}
        <div
          ref={timelineWrapRef}
          className="flex absolute right-2 md:right-5 lg:right-8 top-24 md:top-1/2 md:-translate-y-1/2 z-40 items-stretch gap-2 md:gap-3 h-52 md:h-[52vh]"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col justify-between items-end">
            {ERAS.map((era, i) => (
              <span
                key={era.year}
                ref={(el) => { markerRefs.current[i] = el; }}
                className="label text-[10px] md:text-xs text-smoke-light transition-colors duration-300"
              >
                {era.year}
              </span>
            ))}
          </div>
          <div className="relative w-px bg-fog">
            <div ref={progressRef} className="absolute inset-0 bg-signal origin-top scale-y-0" />
          </div>
        </div>

        <div className="flex absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-5 lg:right-8 z-40 items-center gap-2 label text-smoke-light">
          Scroll
          <span className="inline-block animate-bounce text-sm leading-none" aria-hidden="true">&#8595;</span>
        </div>
      </div>
    </section>
  );
}
