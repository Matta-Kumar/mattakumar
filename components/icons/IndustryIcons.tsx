// Concept icons for the homepage industries grid. Same thin-stroke, 24px
// viewBox, single-color (currentColor) style as OfferingIcons.tsx, keyword-
// matched against each industry's name so new Sanity documents render a
// sensible icon without a schema change.

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

function IconChip(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <line x1="9" y1="3" x2="9" y2="7" />
      <line x1="15" y1="3" x2="15" y2="7" />
      <line x1="9" y1="17" x2="9" y2="21" />
      <line x1="15" y1="17" x2="15" y2="21" />
      <line x1="3" y1="9" x2="7" y2="9" />
      <line x1="3" y1="15" x2="7" y2="15" />
      <line x1="17" y1="9" x2="21" y2="9" />
      <line x1="17" y1="15" x2="21" y2="15" />
    </svg>
  );
}

function IconBag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 8h11l1 12.5a1.3 1.3 0 01-1.3 1.4H6.8a1.3 1.3 0 01-1.3-1.4L6.5 8z" />
      <path d="M9 8V6.2a3 3 0 016 0V8" />
    </svg>
  );
}

function IconPulse(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12.5 20.2c-.3.2-.7.2-1 0C7.8 17.6 3.5 14.2 3.5 9.9A4.9 4.9 0 0112 6.8a4.9 4.9 0 018.5 3.1c0 4.3-4.3 7.7-8 10.3z" />
      <polyline points="6.5 12.2 9 12.2 10.2 9.7 12 15 13.3 12.2 17.5 12.2" />
    </svg>
  );
}

function IconHome(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5L12 4l8 7.5" />
      <path d="M6 10v9.5a1 1 0 001 1h10a1 1 0 001-1V10" />
      <line x1="10" y1="20.5" x2="10" y2="14.5" />
      <line x1="14" y1="20.5" x2="14" y2="14.5" />
      <line x1="10" y1="14.5" x2="14" y2="14.5" />
    </svg>
  );
}

function IconPlane(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 3L3 10.5l7 2.6L13 20l3-6 5-11z" />
      <path d="M10.5 13.1L21 3" />
    </svg>
  );
}

function IconCap(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5l9.5 4.5-9.5 4.5L2.5 9l9.5-4.5z" />
      <path d="M6.5 11.3v4.4c0 1.4 2.6 3 5.5 3s5.5-1.6 5.5-3v-4.4" />
      <line x1="21.5" y1="9" x2="21.5" y2="15.5" />
    </svg>
  );
}

function IconCoin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <line x1="12" y1="7" x2="12" y2="17" />
      <path d="M14.7 9.3a2.7 2.7 0 00-2.6-1.8c-1.5 0-2.7.8-2.7 2s1.2 1.7 2.6 2c1.5.3 2.8.7 2.8 2s-1.2 2-2.7 2a2.9 2.9 0 01-2.8-1.9" />
    </svg>
  );
}

function IconUtensils(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3v7a2 2 0 002 2 2 2 0 002-2V3" />
      <line x1="8" y1="3" x2="8" y2="21" />
      <path d="M17 3c-1.5 0-2.5 2-2.5 5.5S16 13 17 13v8" />
    </svg>
  );
}

function IconDumbbell(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="6.5" y1="12" x2="17.5" y2="12" />
      <rect x="3" y="9.5" width="3" height="5" rx="1" />
      <rect x="18" y="9.5" width="3" height="5" rx="1" />
      <rect x="6" y="10.3" width="1.6" height="3.4" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="16.4" y="10.3" width="1.6" height="3.4" rx="0.5" fill="currentColor" stroke="none" />
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

/** Generic fallback for anything that doesn't match a keyword below. */
function IconSpark(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

export const INDUSTRY_ICONS = {
  chip: IconChip,
  bag: IconBag,
  pulse: IconPulse,
  home: IconHome,
  plane: IconPlane,
  cap: IconCap,
  coin: IconCoin,
  utensils: IconUtensils,
  dumbbell: IconDumbbell,
  wrench: IconWrench,
  spark: IconSpark,
} as const;

export type IndustryIconKey = keyof typeof INDUSTRY_ICONS;

/**
 * Keyword rules, checked in order, first match wins. Written against the
 * lowercased industry name. Falls back to a neutral spark glyph if nothing
 * matches, so new industries added later never render broken.
 */
const RULES: Array<[RegExp, IndustryIconKey]> = [
  [/saas|tech/, "chip"],
  [/d2c|e-?commerce|retail/, "bag"],
  [/health|wellness|medical/, "pulse"],
  [/real estate|property/, "home"],
  [/hospitality|travel|hotel/, "plane"],
  [/education|e-?learning|school/, "cap"],
  [/finance|fintech|bank/, "coin"],
  [/food|beverage|restaurant/, "utensils"],
  [/fitness|sport/, "dumbbell"],
  [/local|home services|contractor/, "wrench"],
];

export function getIndustryIcon(name: string): IndustryIconKey {
  const n = name.toLowerCase();
  for (const [re, key] of RULES) {
    if (re.test(n)) return key;
  }
  return "spark";
}
