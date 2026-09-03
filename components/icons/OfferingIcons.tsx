// Small, hand-authored concept icons for the services detail page's "What's
// included" grid. Thin stroke, 24px viewBox, single-color (currentColor) —
// deliberately generic so a modest set (~2 dozen) can be keyword-matched
// across all 35 offerings (7 services × 5 offerings) instead of hand-drawing
// one bespoke icon per offering. Distinct from PlatformLogos.tsx, which is
// full-color third-party brand marks, not a concept-icon system.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.2" cy="10.2" r="6.2" />
      <line x1="14.9" y1="14.9" x2="20" y2="20" />
    </svg>
  );
}

function IconCluster(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6.5" r="2.1" />
      <circle cx="18" cy="6.5" r="2.1" />
      <circle cx="12" cy="18" r="2.1" />
      <line x1="7.7" y1="7.6" x2="16.3" y2="7.6" />
      <line x1="7.3" y1="8.2" x2="10.8" y2="16.1" />
      <line x1="16.7" y1="8.2" x2="13.2" y2="16.1" />
    </svg>
  );
}

function IconLink(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 14.5l5-5" />
      <path d="M8.3 15.7a3.2 3.2 0 010-4.5l2.6-2.6a3.2 3.2 0 014.5 4.5l-1.1 1.1" />
      <path d="M15.7 8.3a3.2 3.2 0 010 4.5l-2.6 2.6a3.2 3.2 0 01-4.5-4.5l1.1-1.1" />
    </svg>
  );
}

function IconSparkle(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M11.3 3.2c.15-.53.87-.53 1.02 0l1.06 3.72a4.6 4.6 0 003.16 3.16l3.72 1.06c.53.15.53.87 0 1.02l-3.72 1.06a4.6 4.6 0 00-3.16 3.16l-1.06 3.72c-.15.53-.87.53-1.02 0l-1.06-3.72a4.6 4.6 0 00-3.16-3.16l-3.72-1.06c-.53-.15-.53-.87 0-1.02l3.72-1.06a4.6 4.6 0 003.16-3.16l1.06-3.72z" />
      <path d="M18.8 3.3c.09-.32.53-.32.62 0l.32 1.13c.15.5.54.9 1.04 1.04l1.13.32c.32.09.32.53 0 .62l-1.13.32a1.4 1.4 0 00-1.04 1.04l-.32 1.13c-.09.32-.53.32-.62 0l-.32-1.13a1.4 1.4 0 00-1.04-1.04l-1.13-.32c-.32-.09-.32-.53 0-.62l1.13-.32a1.4 1.4 0 001.04-1.04l.32-1.13z" />
    </svg>
  );
}

function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-6.86 6.5-11.5a6.5 6.5 0 10-13 0C5.5 14.14 12 21 12 21z" />
      <circle cx="12" cy="9.4" r="2.2" />
    </svg>
  );
}

function IconMegaphone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 9.8v4.4a1 1 0 001 1h1.6l6.9 3.9V4.9L6.1 8.8H4.5a1 1 0 00-1 1z" />
      <path d="M15.8 9.3a3.6 3.6 0 010 5.4" />
      <line x1="6.6" y1="15.2" x2="6.6" y2="19" />
    </svg>
  );
}

function IconBrowser(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <line x1="2.5" y1="8.5" x2="21.5" y2="8.5" />
      <circle cx="5.3" cy="6.5" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="7.3" cy="6.5" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="9.3" cy="6.5" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFlask(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="9.5" y1="3" x2="9.5" y2="9.3" />
      <line x1="14.5" y1="3" x2="14.5" y2="9.3" />
      <line x1="8.2" y1="3" x2="15.8" y2="3" />
      <path d="M9.5 9.3l-4.4 8.3a1.8 1.8 0 001.6 2.6h10.6a1.8 1.8 0 001.6-2.6l-4.4-8.3" />
      <line x1="7.6" y1="14.5" x2="16.4" y2="14.5" />
    </svg>
  );
}

function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.7" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconChart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="13" width="3.6" height="7" rx="0.6" />
      <rect x="10.2" y="8.5" width="3.6" height="11.5" rx="0.6" />
      <rect x="16.4" y="4.5" width="3.6" height="15.5" rx="0.6" />
    </svg>
  );
}

function IconCalendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="15.5" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="7.5" y1="3" x2="7.5" y2="6.6" />
      <line x1="16.5" y1="3" x2="16.5" y2="6.6" />
    </svg>
  );
}

function IconDocument(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h7l4 4v12a1 1 0 01-1 1h-10a1 1 0 01-1-1v-15a1 1 0 011-1z" />
      <path d="M13.5 3.5v4h4" />
      <line x1="8.5" y1="13" x2="15.5" y2="13" />
      <line x1="8.5" y1="16.5" x2="13" y2="16.5" />
    </svg>
  );
}

function IconRefresh(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 11.2A8 8 0 006.4 6.1" />
      <polyline points="20.3 6.2 20 11.2 15 10.9" />
      <path d="M4 12.8a8 8 0 0013.6 5.1" />
      <polyline points="3.7 17.8 4 12.8 9 13.1" />
    </svg>
  );
}

function IconEnvelope(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <polyline points="3.5 6.5 12 13 20.5 6.5" />
    </svg>
  );
}

function IconCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.3 8.7l-2.1 4.6-4.6 2.1 2.1-4.6 4.6-2.1z" />
    </svg>
  );
}

function IconPlay(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.2 8.4l5.4 3.6-5.4 3.6V8.4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconChat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16a1 1 0 011 1v10a1 1 0 01-1 1H9.2L4.5 21v-4.5H4a1 1 0 01-1-1v-9a1 1 0 011-1z" />
      <line x1="7.5" y1="10" x2="16.5" y2="10" />
      <line x1="7.5" y1="13" x2="13.5" y2="13" />
    </svg>
  );
}

function IconCode(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <polyline points="9 8 4.2 12 9 16" />
      <polyline points="15 8 19.8 12 15 16" />
    </svg>
  );
}

function IconLayers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l8 4.5-8 4.5-8-4.5 8-4.5z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16l8 4.5 8-4.5" />
    </svg>
  );
}

function IconGauge(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16.5a8 8 0 0116 0" />
      <line x1="12" y1="16.5" x2="15.3" y2="11.6" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconWrench(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.7 5.2a4 4 0 00-5.1 5l-6.1 6.1a1.8 1.8 0 002.5 2.5l6.1-6.1a4 4 0 005-5.1l-2.6 2.6-2-2 2.6-2.6z" />
    </svg>
  );
}

function IconCart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 4h2l2.3 12a1.8 1.8 0 001.8 1.5h7.4a1.8 1.8 0 001.8-1.4L20.5 8H6.3" />
      <circle cx="9.5" cy="20" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPackage(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l8 4.3v8.4L12 20.5l-8-4.3V7.8l8-4.3z" />
      <path d="M4 7.8l8 4.3 8-4.3" />
      <line x1="12" y1="12.1" x2="12" y2="20.5" />
    </svg>
  );
}

function IconPalette(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5a8.5 8.5 0 100 17c1.05 0 1.9-.85 1.9-1.9 0-.5-.2-.95-.52-1.28-.32-.35-.5-.78-.5-1.24a1.9 1.9 0 011.9-1.9h2.1a3.9 3.9 0 003.62-5.36A8.49 8.49 0 0012 3.5z" />
      <circle cx="7.6" cy="10.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.4" cy="7.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="7.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.6" cy="10.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFrame(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="M4.5 16.5l4.6-4.6a1.4 1.4 0 011.98 0l3.42 3.42" />
      <path d="M12.5 16.5l3-3a1.4 1.4 0 011.98 0l1.52 1.52" />
    </svg>
  );
}

/** Generic fallback for anything that doesn't match a keyword below. */
function IconSpark(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

export const OFFERING_ICONS = {
  search: IconSearch,
  cluster: IconCluster,
  link: IconLink,
  sparkle: IconSparkle,
  pin: IconPin,
  megaphone: IconMegaphone,
  browser: IconBrowser,
  flask: IconFlask,
  target: IconTarget,
  chart: IconChart,
  calendar: IconCalendar,
  document: IconDocument,
  refresh: IconRefresh,
  envelope: IconEnvelope,
  compass: IconCompass,
  play: IconPlay,
  chat: IconChat,
  code: IconCode,
  layers: IconLayers,
  gauge: IconGauge,
  wrench: IconWrench,
  cart: IconCart,
  package: IconPackage,
  palette: IconPalette,
  frame: IconFrame,
  spark: IconSpark,
} as const;

export type OfferingIconKey = keyof typeof OFFERING_ICONS;

/**
 * Keyword rules, checked in order, first match wins. Written against the
 * lowercased offering title. Falls back to a neutral spark glyph if nothing
 * matches, so new offerings added later never render broken.
 */
const RULES: Array<[RegExp, OfferingIconKey]> = [
  [/\bai\b|citation/, "sparkle"],
  [/local seo|\blocal\b/, "pin"],
  [/topical|cluster|map(s|ping)?\b/, "cluster"],
  [/on\s*&\s*off-page|backlink|off-page/, "link"],
  [/technical audit|\baudit/, "search"],
  [/\bseo content\b|content\b.*seo|seo\b.*content/, "search"],
  [/social creative|ad & social/, "frame"],
  [/ads?\b|campaign creative/, "megaphone"],
  [/landing page/, "browser"],
  [/creative testing|testing\b/, "flask"],
  [/conversion (tracking|optimi[sz]ation)/, "target"],
  [/roas|revenue analytics|\banalytics\b/, "chart"],
  [/editorial strategy|content calendar/, "calendar"],
  [/brief|decks? & collateral|collateral/, "document"],
  [/repurpos/, "refresh"],
  [/newsletter|email flow/, "envelope"],
  [/channel strategy/, "compass"],
  [/short-form video|video\b/, "play"],
  [/community management/, "chat"],
  [/cms setup|design systems?/, "layers"],
  [/next\.js|wordpress/, "code"],
  [/identity systems?/, "palette"],
  [/core web vitals/, "gauge"],
  [/maintenance/, "wrench"],
  [/shopify|woocommerce/, "cart"],
  [/merchandising|feeds?/, "package"],
];

export function getOfferingIcon(title: string): OfferingIconKey {
  const t = title.toLowerCase();
  for (const [re, key] of RULES) {
    if (re.test(t)) return key;
  }
  return "spark";
}
