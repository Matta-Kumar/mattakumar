"use client";

import { forwardRef, useImperativeHandle, useRef, type RefObject } from "react";
import { PLATFORM_LOGOS } from "./PlatformLogos";

// ─── Data ────────────────────────────────────────────────────────────────────

const QUERY = "best digital marketing consultant";

const YAHOO_LINKS = [
  { t: "Digital Marketing Consultant — Expert SEO Services",   u: "www.digitalmarketing.com/consultant", s: "Top-rated consultant helping brands grow online. Free quote available." },
  { t: "Best Marketing Consultants — Yahoo! Directory",        u: "dir.yahoo.com/Business/Marketing",    s: "Curated directory of trusted digital marketing professionals worldwide." },
  { t: "Hire a Digital Marketing Expert Today",                u: "www.marketingpros.net",               s: "Certified consultants for SEO, email marketing, and web strategy." },
  { t: "Marketing Consultant Services — Small Business Focus", u: "www.smallbizmktg.com",                s: "Affordable digital marketing for growing small and mid-size businesses." },
  { t: "SEO & Web Marketing Consulting — Free Audit",          u: "www.seoexpert.com/consulting",        s: "Search engine optimisation and paid search management specialists." },
];

const GOOGLE_LINKS = [
  { t: "Digital Marketing Consultant | Expert SEO & Growth",  u: "www.digitalmarketer.com/consultant",   s: "Certified digital marketing consultants delivering measurable results across SEO, paid media, and content strategy." },
  { t: "Top Digital Marketing Consultants — Forbes Ranked",   u: "www.forbes.com/advisor/marketing",     s: "Forbes-vetted firms offering strategy, execution, and full-funnel marketing consulting services." },
  { t: "Digital Marketing Consulting | HubSpot Certified",    u: "www.hubspot.com/marketing/consulting", s: "Inbound-led consulting for B2B and B2C brands. Free strategy session included." },
  { t: "Local Digital Marketing Consultant — Verified",       u: "maps.google.com/local/marketing",      s: "Find top-rated digital marketing consultants in your area with verified reviews and ratings." },
];

const BING_LINKS = [
  { t: "Digital Marketing Consultant | Bing Business Results",  u: "www.digitalmarketing.com/consultant",   s: "Expert consultants for SEO, paid search and content strategy. View portfolio." },
  { t: "Best Digital Marketing Consultants — Bing Verified",    u: "www.marketingweek.com/consultants",      s: "Bing-vetted professionals with documented client results across industries." },
  { t: "Top Marketing Consultant Services — Find Yours",        u: "www.expertise.com/marketing",           s: "Compare top-rated digital marketing consultants near you with verified reviews." },
  { t: "Digital Strategy Consultant | Get a Free Proposal",     u: "www.webfx.com/digital-marketing",       s: "Award-winning consultants. Full-funnel strategy and execution from $1,500/mo." },
  { t: "SEO & Digital Marketing Consulting — Bing Partner",     u: "www.searchenginejournal.com/consulting", s: "Trusted by 2,000+ brands. Certified by Bing Ads and Microsoft Advertising." },
];

// ─── Inline favicons ──────────────────────────────────────────────────────────

function YahooFavicon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <rect width="12" height="12" rx="2" fill="#400090" />
      <text x="6" y="10" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontStyle="italic" fontFamily="Georgia, serif">Y</text>
    </svg>
  );
}

function GoogleFavicon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function BingFavicon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <rect width="12" height="12" rx="2" fill="#008272" />
      <text x="5.5" y="10" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif">b</text>
    </svg>
  );
}

// ─── Handle type ──────────────────────────────────────────────────────────────

export interface BrowserVisualHandle {
  browserRef:    RefObject<HTMLDivElement | null>;
  wrapperRef:    RefObject<HTMLDivElement | null>;
  tabRefs:       RefObject<HTMLDivElement | null>[];
  contentRefs:   RefObject<HTMLDivElement | null>[];
  cursorRef:     RefObject<HTMLDivElement | null>;
  serpScrollRef: RefObject<HTMLDivElement | null>;
  serpRefs: {
    snippet:     RefObject<HTMLDivElement | null>;
    shopping:    RefObject<HTMLDivElement | null>;
    paa:         RefObject<HTMLDivElement | null>;
    localPack:   RefObject<HTMLDivElement | null>;
    images:      RefObject<HTMLDivElement | null>;
    videos:      RefObject<HTMLDivElement | null>;
    recommended: RefObject<HTMLDivElement | null>;
  };
  xButtonRefs: RefObject<HTMLSpanElement | null>[];
  addressRef:  RefObject<HTMLDivElement | null>;
}

// ─── Component ────────────────────────────────────────────────────────────────

const BrowserVisual = forwardRef<BrowserVisualHandle>((_, ref) => {
  const outerRef      = useRef<HTMLDivElement>(null);
  const wrapRef       = useRef<HTMLDivElement>(null);
  const cursorRef     = useRef<HTMLDivElement>(null);
  const serpScrollRef = useRef<HTMLDivElement>(null);
  const addressRef    = useRef<HTMLDivElement>(null);

  const tabRef0 = useRef<HTMLDivElement>(null);
  const tabRef1 = useRef<HTMLDivElement>(null);
  const tabRef2 = useRef<HTMLDivElement>(null);
  const tabRef3 = useRef<HTMLDivElement>(null);
  const tabRef4 = useRef<HTMLDivElement>(null);
  const tabRef5 = useRef<HTMLDivElement>(null);
  const tabRef6 = useRef<HTMLDivElement>(null);

  const panRef0 = useRef<HTMLDivElement>(null);
  const panRef1 = useRef<HTMLDivElement>(null);
  const panRef2 = useRef<HTMLDivElement>(null);
  const panRef3 = useRef<HTMLDivElement>(null);
  const panRef4 = useRef<HTMLDivElement>(null);
  const panRef5 = useRef<HTMLDivElement>(null);
  const panRef6 = useRef<HTMLDivElement>(null);

  const serpSnippetRef   = useRef<HTMLDivElement>(null);
  const serpShoppingRef  = useRef<HTMLDivElement>(null);
  const serpPAARef       = useRef<HTMLDivElement>(null);
  const serpLocalPackRef = useRef<HTMLDivElement>(null);
  const serpImagesRef    = useRef<HTMLDivElement>(null);
  const serpVideosRef    = useRef<HTMLDivElement>(null);
  const serpRecommRef    = useRef<HTMLDivElement>(null);

  const xRef0 = useRef<HTMLSpanElement>(null);
  const xRef1 = useRef<HTMLSpanElement>(null);

  const tabRef7          = useRef<HTMLDivElement>(null);
  const panRef7          = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    browserRef:  outerRef,
    wrapperRef:  wrapRef,
    tabRefs:     [tabRef0, tabRef1, tabRef2, tabRef3, tabRef4, tabRef5, tabRef6],
    contentRefs: [panRef0, panRef1, panRef2, panRef3, panRef4, panRef5, panRef6, panRef7],
    cursorRef,
    serpScrollRef,
    serpRefs: {
      snippet:     serpSnippetRef,
      shopping:    serpShoppingRef,
      paa:         serpPAARef,
      localPack:   serpLocalPackRef,
      images:      serpImagesRef,
      videos:      serpVideosRef,
      recommended: serpRecommRef,
    },
    xButtonRefs: [xRef0, xRef1],
    addressRef,
  }));

  const ChatGPTLogo    = PLATFORM_LOGOS["ChatGPT"];
  const ClaudeLogo     = PLATFORM_LOGOS["Claude"];
  const PerplexityLogo = PLATFORM_LOGOS["Perplexity"];
  const GeminiLogo     = PLATFORM_LOGOS["Gemini"];

  return (
    <div
      ref={outerRef}
      className="relative z-20 invisible pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div
        ref={wrapRef}
        className="w-full pointer-events-auto"
      >
        {/* ── Browser shell ── */}
        <div className="rounded-xl overflow-hidden shadow-2xl bg-white">

          {/* Top chrome */}
          <div className="bg-[#3a3a3a] px-4 py-2 flex items-center gap-3">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
            </div>
            <div ref={addressRef} className="flex-1 bg-[#555] rounded text-[10px] text-[#ccc] px-3 py-1 truncate">
              search.yahoo.com/search?p=best+digital+marketing+consultant
            </div>
          </div>

          {/* Tab bar */}
          <div className="bg-[#e8e8e8] flex items-end px-2 pt-1.5 gap-0.5 border-b border-[#d0d0d0] overflow-hidden">

            <div
              ref={tabRef0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] whitespace-nowrap rounded-t-md overflow-hidden min-w-0"
              style={{ backgroundColor: "white", color: "#333" }}
            >
              <YahooFavicon />
              <span className="shrink-0">Yahoo</span>
              <span ref={xRef0} className="ml-1 text-[11px] leading-none shrink-0" style={{ color: "#aaa" }}>×</span>
            </div>

            <div
              ref={tabRef1}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] whitespace-nowrap rounded-t-md overflow-hidden min-w-0"
              style={{ backgroundColor: "rgba(221,221,221,0.6)", color: "#666" }}
            >
              <GoogleFavicon />
              <span className="shrink-0">Google</span>
            </div>

            <div
              ref={tabRef2}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] whitespace-nowrap rounded-t-md overflow-hidden min-w-0"
              style={{ backgroundColor: "rgba(221,221,221,0.6)", color: "#666" }}
            >
              <BingFavicon />
              <span className="shrink-0">Bing</span>
              <span ref={xRef1} className="ml-1 text-[11px] leading-none shrink-0" style={{ color: "#aaa" }}>×</span>
            </div>

            <div
              ref={tabRef3}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] whitespace-nowrap rounded-t-md overflow-hidden min-w-0"
              style={{ backgroundColor: "rgba(221,221,221,0.6)", color: "#666", visibility: "hidden", opacity: 0 }}
            >
              <ChatGPTLogo className="w-3.5 h-3.5 shrink-0" />
              <span className="shrink-0">ChatGPT</span>
            </div>

            <div
              ref={tabRef4}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] whitespace-nowrap rounded-t-md overflow-hidden min-w-0"
              style={{ backgroundColor: "rgba(221,221,221,0.6)", color: "#666", visibility: "hidden", opacity: 0 }}
            >
              <ClaudeLogo className="w-3.5 h-3.5 shrink-0" />
              <span className="shrink-0">Claude</span>
            </div>

            <div
              ref={tabRef5}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] whitespace-nowrap rounded-t-md overflow-hidden min-w-0"
              style={{ backgroundColor: "rgba(221,221,221,0.6)", color: "#666", visibility: "hidden", opacity: 0 }}
            >
              <PerplexityLogo className="w-3.5 h-3.5 shrink-0" />
              <span className="shrink-0">Perplexity</span>
            </div>

            <div
              ref={tabRef6}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] whitespace-nowrap rounded-t-md overflow-hidden min-w-0"
              style={{ backgroundColor: "rgba(221,221,221,0.6)", color: "#666", visibility: "hidden", opacity: 0 }}
            >
              <GeminiLogo className="w-3.5 h-3.5 shrink-0" />
              <span className="shrink-0">Gemini</span>
            </div>

          </div>

          {/* ── Content area ── */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9" }}>

            {/* Panel 0 — Yahoo */}
            <div ref={panRef0} className="absolute inset-0 overflow-y-auto">
              <div className="bg-[#400090] px-5 pt-3 pb-2">
                <div className="flex">
                  <div className="flex-1 bg-white text-[#333] text-[13px] px-3 py-1.5 rounded-l-sm">{QUERY}</div>
                  <div className="bg-[#6200aa] text-white text-[12px] px-4 py-1.5 rounded-r-sm font-medium shrink-0">Search</div>
                </div>
                <div className="flex gap-4 mt-2 text-[11px]">
                  <span className="text-white border-b border-white pb-0.5">Web</span>
                  <span className="text-white/50">Images</span>
                  <span className="text-white/50">Directory</span>
                  <span className="text-white/50">News</span>
                </div>
              </div>
              <div className="bg-white px-5 pt-2.5 pb-4">
                <p className="text-[#555] text-[11px] mb-3">About <strong>2,340,000</strong> results &mdash; <em>best digital marketing consultant</em></p>
                <div className="space-y-2.5">
                  {YAHOO_LINKS.map((r, i) => (
                    <div key={i}>
                      <p className="text-[#0000cc] text-[13px] leading-snug">{r.t}</p>
                      <p className="text-[#009900] text-[11px]">{r.u}</p>
                      <p className="text-[#555] text-[11px] leading-relaxed">{r.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel 1 — Google (inner-scroll for SERP features) */}
            <div ref={panRef1} className="absolute inset-0 overflow-hidden bg-white" style={{ visibility: "hidden", opacity: 0 }}>
              <div ref={serpScrollRef}>

                {/* Google header */}
                <div className="px-5 pt-2.5 pb-0 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[16px] font-normal select-none" aria-label="Google">
                      <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span>
                      <span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span>
                      <span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
                    </span>
                    <div className="flex-1 flex items-center border border-[#dfe1e5] rounded-full px-3 py-1 shadow-sm">
                      <span className="text-[12px] text-[#202124] flex-1">{QUERY}</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-0 border-b border-[#e8eaed] text-[11px] -mx-5 px-5">
                    {["All", "Images", "News", "Maps", "Videos"].map((tab, i) => (
                      <span key={tab} className={i === 0 ? "px-3 py-1.5 text-[#4285f4] border-b-2 border-[#4285f4] font-medium -mb-px" : "px-3 py-1.5 text-[#70757a]"}>{tab}</span>
                    ))}
                  </div>
                </div>

                {/* Initial organic results (always visible) */}
                <div className="px-5 pt-2 pb-2">
                  <p className="text-[#70757a] text-[11px] mb-2.5">About 437,000,000 results (0.38 seconds)</p>
                  <div className="space-y-3 mb-2">
                    {GOOGLE_LINKS.slice(0, 2).map((r, i) => (
                      <div key={i}>
                        <p className="text-[#1a0dab] text-[13px] leading-snug">{r.t}</p>
                        <p className="text-[#006621] text-[11px]">{r.u}</p>
                        <p className="text-[#545454] text-[11px] leading-[1.4]">{r.s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SERP features — all hidden initially, stagger in during era1 */}
                <div className="px-5 pb-4 space-y-3">

                  {/* Featured Snippet */}
                  <div ref={serpSnippetRef} className="border border-[#dfe1e5] rounded-lg p-3 bg-white" style={{ visibility: "hidden", opacity: 0 }}>
                    <p className="text-[9px] text-[#70757a] mb-1 uppercase tracking-wide font-medium">Featured snippet · About this result</p>
                    <p className="text-[11.5px] text-[#202124] leading-relaxed mb-1.5">
                      The best digital marketing consultants combine technical SEO expertise with content strategy depth and full-funnel attribution — helping clients grow organic visibility while adapting to AI-era search.
                    </p>
                    <p className="text-[10px] text-[#006621]">www.digitalmarketer.com › consultant › best</p>
                    <p className="text-[10px] text-[#1a0dab] mt-1">Digital Marketing Consultant | Expert SEO & Growth</p>
                  </div>

                  {/* Shopping carousel */}
                  <div ref={serpShoppingRef} className="p-2.5 bg-[#f8f9fa] rounded-lg border border-[#e8eaed]" style={{ visibility: "hidden", opacity: 0 }}>
                    <p className="text-[11px] text-[#70757a] mb-2">Shopping results for <em>{QUERY}</em></p>
                    <div className="flex gap-2">
                      {[
                        { c: "bg-indigo-200", n: "SEO Masterclass", p: "$299" },
                        { c: "bg-rose-200",   n: "Marketing Toolkit", p: "$149" },
                        { c: "bg-sky-200",    n: "Analytics Pro", p: "$89" },
                        { c: "bg-amber-200",  n: "Content Planner", p: "$49" },
                      ].map((item) => (
                        <div key={item.n} className="flex-1 text-center">
                          <div className={`${item.c} rounded h-10 w-full mb-1`} />
                          <p className="text-[9px] text-[#202124] leading-snug">{item.n}</p>
                          <p className="text-[9px] font-medium text-[#202124]">{item.p}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organic result 3 */}
                  <div>
                    <p className="text-[#1a0dab] text-[13px] leading-snug">{GOOGLE_LINKS[2].t}</p>
                    <p className="text-[#006621] text-[11px]">{GOOGLE_LINKS[2].u}</p>
                    <p className="text-[#545454] text-[11px] leading-[1.4]">{GOOGLE_LINKS[2].s}</p>
                  </div>

                  {/* People Also Ask */}
                  <div ref={serpPAARef} className="rounded-lg border border-[#dfe1e5] overflow-hidden" style={{ visibility: "hidden", opacity: 0 }}>
                    <p className="text-[11px] font-medium text-[#202124] px-3 py-2 border-b border-[#e8eaed] bg-[#f8f9fa]">People also ask</p>
                    {[
                      "What does a digital marketing consultant do?",
                      "How much do digital marketing consultants charge?",
                      "What is the best digital marketing strategy?",
                    ].map((q) => (
                      <div key={q} className="flex items-center justify-between px-3 py-2 border-b border-[#e8eaed] last:border-0">
                        <span className="text-[11px] text-[#202124]">{q}</span>
                        <svg className="w-3 h-3 text-[#70757a] shrink-0 ml-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg>
                      </div>
                    ))}
                  </div>

                  {/* Organic result 4 */}
                  <div>
                    <p className="text-[#1a0dab] text-[13px] leading-snug">{GOOGLE_LINKS[3].t}</p>
                    <p className="text-[#006621] text-[11px]">{GOOGLE_LINKS[3].u}</p>
                    <p className="text-[#545454] text-[11px] leading-[1.4]">{GOOGLE_LINKS[3].s}</p>
                  </div>

                  {/* Local Pack */}
                  <div ref={serpLocalPackRef} style={{ visibility: "hidden", opacity: 0 }}>
                    <p className="text-[11px] text-[#70757a] mb-1.5">Local results near you</p>
                    <div className="flex gap-0 rounded-lg border border-[#e8eaed] overflow-hidden" style={{ height: "100px" }}>
                      <div className="w-[45%] bg-[#dce8d4] flex flex-col items-center justify-center relative shrink-0">
                        <span className="text-[22px] leading-none">📍</span>
                        <span className="text-[8px] text-[#555] mt-0.5">Map results</span>
                        <div className="absolute top-2 left-2 flex gap-0.5">
                          {["bg-red-400","bg-blue-400","bg-green-400"].map((c,i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${c}`} />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 divide-y divide-[#f1f3f4]">
                        {[
                          { name: "Matta Kumar Digital", rating: "4.9", cat: "Digital marketing" },
                          { name: "SEO Experts London",  rating: "4.7", cat: "SEO consultant" },
                          { name: "Growth Digital Ltd",  rating: "4.6", cat: "Marketing agency" },
                        ].map((b) => (
                          <div key={b.name} className="px-2 py-1.5">
                            <p className="text-[10px] text-[#1a0dab] leading-none mb-0.5">{b.name}</p>
                            <p className="text-[9px] text-[#f4b400] leading-none">{"★".repeat(Math.floor(parseFloat(b.rating)))} <span className="text-[#70757a]">{b.rating}</span></p>
                            <p className="text-[9px] text-[#70757a] leading-none">{b.cat} · <span className="text-[#188038]">Open</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image strip */}
                  <div ref={serpImagesRef} style={{ visibility: "hidden", opacity: 0 }}>
                    <p className="text-[11px] text-[#70757a] mb-1.5">Images for <em>{QUERY}</em></p>
                    <div className="flex gap-1.5">
                      {["bg-indigo-300", "bg-rose-300", "bg-sky-300", "bg-amber-300", "bg-emerald-300"].map((c) => (
                        <div key={c} className={`${c} rounded flex-1 h-14`} />
                      ))}
                    </div>
                  </div>

                  {/* Video results */}
                  <div ref={serpVideosRef} style={{ visibility: "hidden", opacity: 0 }}>
                    <p className="text-[11px] text-[#70757a] mb-1.5">Videos</p>
                    <div className="flex gap-2">
                      {[
                        { bg: "bg-red-200",   title: "Digital Marketing Consultant Tips 2024", ch: "Marketing School", dur: "8:42" },
                        { bg: "bg-blue-200",  title: "How to Choose Your Marketing Consultant", ch: "Neil Patel",       dur: "12:18" },
                        { bg: "bg-green-200", title: "Best SEO Strategy for Consultants 2026",  ch: "Ahrefs",          dur: "6:55" },
                      ].map((v) => (
                        <div key={v.ch} className="flex-1">
                          <div className={`${v.bg} rounded-md h-[52px] w-full relative flex items-center justify-center mb-1`}>
                            <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                              <span className="text-[10px] ml-0.5">▶</span>
                            </div>
                            <span className="absolute bottom-1 right-1 text-[8px] bg-black/60 text-white px-1 rounded">{v.dur}</span>
                          </div>
                          <p className="text-[10px] text-[#1a0dab] leading-snug line-clamp-2">{v.title}</p>
                          <p className="text-[9px] text-[#70757a]">{v.ch}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* People also search for */}
                  <div ref={serpRecommRef} style={{ visibility: "hidden", opacity: 0 }}>
                    <p className="text-[11px] text-[#70757a] mb-1.5">People also search for</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["SEO consultant", "PPC specialist", "Content marketing", "Digital strategy"].map((s) => (
                        <span key={s} className="text-[11px] text-[#202124] bg-[#f1f3f4] px-3 py-1 rounded-full border border-[#e8eaed]">{s}</span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Panel 2 — Bing */}
            <div ref={panRef2} className="absolute inset-0 overflow-y-auto" style={{ visibility: "hidden", opacity: 0 }}>
              <div className="bg-[#008272] px-5 pt-3 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-bold text-[18px] italic tracking-tight shrink-0">Bing</span>
                  <div className="flex-1 bg-white text-[#333] text-[12px] px-3 py-1.5 rounded-sm">{QUERY}</div>
                </div>
                <div className="flex gap-4 text-[11px]">
                  <span className="text-white border-b border-white pb-0.5">Web</span>
                  <span className="text-white/60">Images</span>
                  <span className="text-white/60">Videos</span>
                  <span className="text-white/60">Maps</span>
                </div>
              </div>
              <div className="bg-white px-5 pt-2.5 pb-4">
                <p className="text-[#767676] text-[11px] mb-3">24,300,000 results · Any time</p>
                <div className="space-y-2.5">
                  {BING_LINKS.map((r, i) => (
                    <div key={i}>
                      <p className="text-[#1a0dab] text-[13px] leading-snug">{r.t}</p>
                      <p className="text-[#006900] text-[11px]">{r.u}</p>
                      <p className="text-[#555] text-[11px] leading-relaxed">{r.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel 3 — ChatGPT */}
            <div
              ref={panRef3}
              className="absolute inset-0 flex flex-col"
              style={{ background: "#212121", visibility: "hidden", opacity: 0 }}
            >
              <div className="px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <ChatGPTLogo className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-medium text-white/90">ChatGPT</span>
                  <span className="text-[10px] text-white/30 bg-white/[0.06] px-2 py-0.5 rounded-full">4o</span>
                </div>
                <span className="text-[10px] text-white/30">Share</span>
              </div>
              <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-3">
                <div className="self-end max-w-[80%] bg-[#2f2f2f] rounded-2xl rounded-br-md px-3.5 py-2.5">
                  <p className="text-[12px] text-white/90">{QUERY}?</p>
                </div>
                <div className="self-start max-w-[95%] flex gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <ChatGPTLogo className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[12px] leading-relaxed text-white/90">
                      Look for a consultant with proven results across Google core updates — not just recent wins.{" "}
                      <strong className="text-white">SEO track record</strong> and content strategy depth matter most.
                    </p>
                    <p className="text-[12px] leading-relaxed text-white/90 mt-2">
                      Key factors: technical SEO expertise, content authority building, and documented ROI from previous clients.
                    </p>
                    <div className="flex gap-3 mt-2.5">
                      <span className="text-[11px] text-white/25 cursor-pointer hover:text-white/40">👍</span>
                      <span className="text-[11px] text-white/25 cursor-pointer hover:text-white/40">👎</span>
                      <span className="text-[11px] text-white/25 cursor-pointer hover:text-white/40">Copy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-2 border-t border-white/[0.06] shrink-0">
                <div className="bg-[#2f2f2f] rounded-full px-4 py-2 flex items-center gap-2">
                  <p className="flex-1 text-[11px] text-white/30">Message ChatGPT</p>
                  <span className="text-[16px] text-white/40">↑</span>
                </div>
                <p className="text-center text-[9px] text-white/20 mt-1.5">ChatGPT can make mistakes. Check important info.</p>
              </div>
            </div>

            {/* Panel 4 — Claude */}
            <div
              ref={panRef4}
              className="absolute inset-0 flex flex-col"
              style={{ background: "#faf9f7", visibility: "hidden", opacity: 0 }}
            >
              <div className="px-4 py-2.5 border-b border-[#e8e4df] flex items-center gap-2 shrink-0">
                <ClaudeLogo className="w-4 h-4 shrink-0" />
                <span className="text-[12px] font-medium text-[#1c1917]">Claude</span>
                <span className="ml-auto text-[9px] text-[#a8a29e] bg-[#f0ece8] px-2 py-0.5 rounded-full border border-[#ddd8d2]">claude-opus-4</span>
              </div>
              <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-3">
                <div className="self-end max-w-[80%] bg-[#ede9e4] border border-[#ddd8d2] rounded-2xl rounded-br-md px-3.5 py-2.5">
                  <p className="text-[12px] text-[#1c1917]">{QUERY}?</p>
                </div>
                <div className="self-start max-w-[95%] flex gap-2.5">
                  <ClaudeLogo className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] leading-relaxed text-[#1c1917]">
                      The best marketing consultants demonstrate pipeline impact, not just rankings.
                    </p>
                    <p className="text-[12px] leading-relaxed text-[#1c1917] mt-2">
                      Look for <strong>AI search fluency</strong> alongside proven organic and content strategy — and ensure they can show attribution across the full funnel, not just impressions.
                    </p>
                    <p className="text-[12px] leading-relaxed text-[#1c1917] mt-2">
                      Ask to see case studies from post-2022 — that&apos;s when the playbook meaningfully shifted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-2 shrink-0">
                <div className="bg-white border border-[#ddd8d2] rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-sm">
                  <p className="flex-1 text-[11px] text-[#a8a29e]">Reply to Claude…</p>
                  <span className="text-[16px] text-[#cc785c]">↑</span>
                </div>
              </div>
            </div>

            {/* Panel 5 — Perplexity */}
            <div
              ref={panRef5}
              className="absolute inset-0 flex flex-col"
              style={{ background: "#ffffff", visibility: "hidden", opacity: 0 }}
            >
              <div className="px-4 py-2.5 border-b border-[#e8e8e8] flex items-center gap-2 shrink-0">
                <PerplexityLogo className="w-4 h-4 shrink-0" />
                <span className="text-[12px] font-medium text-[#0f172a]">Perplexity</span>
                <span className="ml-auto text-[10px] text-[#64748b]">Pro Search</span>
              </div>
              <div className="px-4 pt-2.5 pb-1 border-b border-[#f1f5f9] shrink-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-semibold text-[#64748b] uppercase tracking-wide mr-0.5">Sources</span>
                  {["Forbes", "HubSpot", "Semrush", "Moz"].map((s) => (
                    <span key={s} className="text-[9px] bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded border border-[#e2e8f0]">{s}</span>
                  ))}
                  <span className="text-[9px] text-[#94a3b8]">+3</span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden px-4 py-3">
                <p className="text-[12px] font-semibold text-[#0f172a] mb-2">Best Digital Marketing Consultants (2026)</p>
                <p className="text-[11.5px] leading-relaxed text-[#334155]">
                  Top consultants combine technical SEO, content authority, and conversion strategy — with documented ROI<sup className="text-[9px] text-[#20b8cd] font-semibold">[1]</sup> and transparent reporting<sup className="text-[9px] text-[#20b8cd] font-semibold">[2]</sup> across verticals.
                </p>
                <p className="text-[11.5px] leading-relaxed text-[#334155] mt-2">
                  In 2026, AI search fluency is non-negotiable<sup className="text-[9px] text-[#20b8cd] font-semibold">[3]</sup>. Traditional keyword tactics alone no longer drive multi-platform visibility.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Top consultants 2026", "SEO consultant cost", "AI marketing strategy"].map((r) => (
                    <span key={r} className="text-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] px-2.5 py-1 rounded-full">{r}</span>
                  ))}
                </div>
              </div>
              <div className="px-3 pb-3 pt-1.5 border-t border-[#f1f5f9] shrink-0">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-full px-3.5 py-2 flex items-center gap-2">
                  <p className="flex-1 text-[11px] text-[#94a3b8]">Ask a follow-up…</p>
                  <span className="text-[14px] text-[#20b8cd]">↗</span>
                </div>
              </div>
            </div>

            {/* Panel 6 — Gemini */}
            <div
              ref={panRef6}
              className="absolute inset-0 flex flex-col"
              style={{ background: "#ffffff", visibility: "hidden", opacity: 0 }}
            >
              <div className="px-4 py-2.5 border-b border-[#e8eaed] flex items-center gap-2 shrink-0">
                <GeminiLogo className="w-4 h-4 shrink-0" />
                <span className="text-[12px] font-medium text-[#202124]">Gemini</span>
                <span className="ml-auto text-[10px] text-[#80868b] flex items-center gap-0.5">1.5 Flash <span className="text-[10px]">▾</span></span>
              </div>
              <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-3">
                <div className="self-end max-w-[80%] bg-[#f1f3f4] rounded-2xl rounded-br-md px-3.5 py-2.5">
                  <p className="text-[12px] text-[#202124]">{QUERY}?</p>
                </div>
                <div className="self-start max-w-[95%] flex gap-2.5">
                  <GeminiLogo className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] leading-relaxed text-[#202124] mb-2">
                      In 2026, ensure your consultant understands <strong>entity-based SEO</strong> and AI Overviews. Key things to look for:
                    </p>
                    <ul className="space-y-1 mb-2">
                      {["Proven core update history", "AI search & GEO strategy", "Full-funnel attribution model", "Transparent monthly reporting"].map((item) => (
                        <li key={item} className="text-[11.5px] text-[#3c4043] flex gap-2">
                          <span className="text-[#4285F4] shrink-0 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="text-[10px] text-[#4285F4] flex items-center gap-1">
                      <span className="text-[12px]">⊕</span> View other drafts
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-2 border-t border-[#e8eaed] shrink-0">
                <div className="bg-[#f1f3f4] rounded-full px-3.5 py-2 flex items-center gap-2">
                  <p className="flex-1 text-[11px] text-[#80868b]">Ask a follow-up</p>
                  <span className="text-[16px] text-[#4285F4]">↑</span>
                </div>
              </div>
            </div>

            {/* Panel 7 — Google AI Mode */}
            <div
              ref={panRef7}
              className="absolute inset-0 flex flex-col"
              style={{ background: "#ffffff", visibility: "hidden", opacity: 0 }}
            >
              {/* Header */}
              <div className="shrink-0 bg-white border-b border-[#e8eaed]">
                <div className="flex items-center gap-2 px-4 py-2">
                  <span className="text-[14px] font-normal select-none" aria-label="Google">
                    <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span>
                    <span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span>
                    <span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
                  </span>
                  <div className="flex-1 flex items-center border border-[#dfe1e5] rounded-full px-3 py-1 shadow-sm">
                    <span className="text-[11px] text-[#202124] flex-1">{QUERY}</span>
                  </div>
                  <span className="text-[9.5px] font-semibold text-[#1a73e8] bg-[#e8f0fe] px-2 py-0.5 rounded-full ml-1 shrink-0 border border-[#c5d8ff]">AI Mode</span>
                </div>
              </div>
              {/* AI answer */}
              <div className="flex-1 overflow-hidden px-4 pt-3 pb-2" style={{ background: "linear-gradient(180deg,#f8faff 0%,#ffffff 60%)" }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5Z" fill="#4285F4"/>
                  </svg>
                  <span className="text-[11px] font-semibold text-[#1a73e8]">Google AI</span>
                </div>
                <p className="text-[12px] font-medium text-[#202124] mb-2">Best digital marketing consultant in 2026</p>
                <p className="text-[11.5px] leading-relaxed text-[#3c4043] mb-2.5">
                  Today&apos;s top consultants go beyond rankings — they build <strong>AI search visibility</strong> across Google AI Overviews, ChatGPT, Perplexity, and Gemini, ensuring your brand appears wherever answers are generated.
                </p>
                <div className="space-y-1.5 mb-3">
                  {[
                    "Proven through Panda, Penguin & every core update",
                    "GEO strategy for AI Overviews & AI Mode",
                    "Full-funnel attribution with transparent ROI",
                  ].map((item) => (
                    <div key={item} className="flex gap-2 items-start">
                      <span className="text-[11px] text-[#34a853] shrink-0 mt-0.5">✓</span>
                      <span className="text-[11px] text-[#3c4043]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["Forbes", "Search Engine Journal", "Moz", "Ahrefs"].map((s) => (
                    <span key={s} className="text-[9.5px] bg-white border border-[#dfe1e5] text-[#1a73e8] px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="border-t border-[#e8eaed] pt-2">
                  <p className="text-[10px] text-[#70757a] mb-1.5">Explore more</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {["AI SEO strategy", "GEO optimisation", "Find a consultant"].map((s) => (
                      <span key={s} className="text-[9.5px] bg-[#f1f3f4] text-[#202124] px-2.5 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-[#e8eaed] shrink-0 bg-white">
                <div className="bg-[#f1f3f4] rounded-full px-4 py-2 flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5Z" fill="#4285F4" opacity="0.6"/>
                  </svg>
                  <p className="flex-1 text-[11px] text-[#80868b]">Ask a follow-up…</p>
                  <span className="text-[14px] text-[#4285F4]">↑</span>
                </div>
              </div>
            </div>

          </div>{/* /content area */}
        </div>{/* /browser shell */}

        {/* ── Mouse cursor ── */}
        <div
          ref={cursorRef}
          className="absolute pointer-events-none z-50"
          style={{ top: 0, left: 0, visibility: "hidden", opacity: 0 }}
        >
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden="true">
            <path
              d="M1 1L1 19L6 13.5L9.5 21.5L12 20.5L8.5 12.5L15 12.5Z"
              fill="white"
              stroke="#222"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

      </div>
    </div>
  );
});

BrowserVisual.displayName = "BrowserVisual";
export default BrowserVisual;
