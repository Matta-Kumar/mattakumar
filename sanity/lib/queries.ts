import { client } from "./client";
import type { OfferingIconKey } from "@/components/icons/OfferingIcons";

// Revalidation matches lib/wordpress.ts's convention: a moderate ISR window
// plus a tag so a webhook (or manual revalidateTag call) can bust it early
// once Sanity's own webhooks are wired up.
const REVALIDATE_SECONDS = 3600;

async function groq<T>(query: string, params: Record<string, unknown> = {}, tags: string[]): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
}

// ─── Services ────────────────────────────────────────────────────────────────

export type Service = {
  n: string;
  slug: string;
  title: string;
  benefit: string;
  desc: string;
  deliverables: string[];
  whatItIs: string;
  valueProps: string[];
  offerings: { title: string; desc: string }[];
  visualNote: string;
  image: string;
  alt: string;
};

const SERVICE_PROJECTION = /* groq */ `{
  n,
  title,
  "slug": slug.current,
  benefit,
  desc,
  deliverables,
  whatItIs,
  valueProps,
  offerings[]{ title, desc },
  visualNote,
  "image": image.asset->url,
  "alt": image.alt,
}`;

export async function getServices(): Promise<Service[]> {
  return groq<Service[]>(
    `*[_type == "service"] | order(order asc) ${SERVICE_PROJECTION}`,
    {},
    ["sanity", "sanity:service"]
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const result = await groq<Service[]>(
    `*[_type == "service" && slug.current == $slug] ${SERVICE_PROJECTION}`,
    { slug },
    ["sanity", "sanity:service"]
  );
  return result[0] ?? null;
}

// ─── Industries ──────────────────────────────────────────────────────────────

export type Industry = {
  name: string;
  blurb: string;
  featured?: boolean;
};

export async function getIndustries(): Promise<Industry[]> {
  return groq<Industry[]>(
    `*[_type == "industry"] | order(order asc) { name, blurb, featured }`,
    {},
    ["sanity", "sanity:industry"]
  );
}

// ─── Engagement models ───────────────────────────────────────────────────────

export type EngagementModel = {
  code: string;
  slug: string;
  name: string;
  desc: string;
  flagship?: boolean;
  whatItIs: string;
  bestFor: string;
  valueProps: string[];
  includes: { title: string; desc: string; icon: OfferingIconKey }[];
};

const ENGAGEMENT_MODEL_PROJECTION = /* groq */ `{
  code,
  name,
  "slug": slug.current,
  desc,
  flagship,
  whatItIs,
  bestFor,
  valueProps,
  includes[]{ title, desc, icon },
}`;

export async function getEngagementModels(): Promise<EngagementModel[]> {
  return groq<EngagementModel[]>(
    `*[_type == "engagementModel"] | order(order asc) ${ENGAGEMENT_MODEL_PROJECTION}`,
    {},
    ["sanity", "sanity:engagementModel"]
  );
}

export async function getEngagementModelBySlug(slug: string): Promise<EngagementModel | null> {
  const result = await groq<EngagementModel[]>(
    `*[_type == "engagementModel" && slug.current == $slug] ${ENGAGEMENT_MODEL_PROJECTION}`,
    { slug },
    ["sanity", "sanity:engagementModel"]
  );
  return result[0] ?? null;
}

// ─── In-house capabilities (team building) ──────────────────────────────────

export type InHouseCapability = {
  title: string;
  desc: string;
};

export async function getInHouseCapabilities(): Promise<InHouseCapability[]> {
  return groq<InHouseCapability[]>(
    `*[_type == "inHouseCapability"] | order(order asc) { title, desc }`,
    {},
    ["sanity", "sanity:inHouseCapability"]
  );
}

// ─── Case studies ────────────────────────────────────────────────────────────

export type CaseStudy = {
  slug: string;
  metric: string;
  line: string;
  client: string;
  services: string[];
  note: string;
  situation: string;
  approach: string;
  outcome: string;
};

const CASE_STUDY_PROJECTION = /* groq */ `{
  client,
  "slug": slug.current,
  metric,
  line,
  services,
  note,
  situation,
  approach,
  outcome,
}`;

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return groq<CaseStudy[]>(
    `*[_type == "caseStudy"] | order(order asc) ${CASE_STUDY_PROJECTION}`,
    {},
    ["sanity", "sanity:caseStudy"]
  );
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const result = await groq<CaseStudy[]>(
    `*[_type == "caseStudy" && slug.current == $slug] ${CASE_STUDY_PROJECTION}`,
    { slug },
    ["sanity", "sanity:caseStudy"]
  );
  return result[0] ?? null;
}
