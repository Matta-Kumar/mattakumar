// Typed data-fetching layer for the headless WordPress backend at mattakumar.com.
// No Cache Components in this repo (cacheComponents is unset in next.config.ts), so
// caching follows the pre-16 model: per-fetch `next.revalidate` + `next.tags`.

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ?? "https://www.mattakumar.com/wp-json/wp/v2";

const REVALIDATE_SECONDS = 3600;

interface WPRendered {
  rendered: string;
}

interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface WPMedia {
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
  };
}

interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls?: Record<string, string>;
}

interface WPPost {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
    author?: WPAuthor[];
  };
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  link: string;
  category: { name: string; slug: string } | null;
  featuredImage: { url: string; alt: string; width: number; height: number } | null;
  author: { id: number; name: string; slug: string } | null;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string[];
  avatarUrl: string | null;
}

export interface TocItem {
  id: string;
  text: string;
  level: 1 | 2 | 3;
  number: string;
}

export interface PostDetail extends Post {
  toc: TocItem[];
  tldr: string | null;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  deg: "°",
};

// WordPress serves titles/excerpts with HTML entities encoded (numeric and named).
function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => NAMED_ENTITIES[name] ?? match);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// WordPress author bios are often authored as several block-level elements
// (Elementor wraps each paragraph in its own <div>). A flat stripTags() would
// collapse them into one run-on string, so split on block boundaries first.
function stripTagsToParagraphs(html: string): string[] {
  return html
    .split(/<\/(?:p|div|h[1-6])>/i)
    .map((chunk) => decodeEntities(stripTags(chunk)))
    .filter(Boolean);
}

function mapPost(raw: WPPost): Post {
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  const terms = raw._embedded?.["wp:term"]?.flat() ?? [];
  const category = terms.find((t) => t.taxonomy === "category");
  const author = raw._embedded?.author?.[0];
  const title = decodeEntities(raw.title.rendered);

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    excerpt: decodeEntities(stripTags(raw.excerpt.rendered)),
    content: raw.content.rendered,
    date: raw.date,
    link: raw.link,
    category: category ? { name: category.name, slug: category.slug } : null,
    featuredImage:
      media && media.source_url
        ? {
            url: media.source_url,
            alt: media.alt_text || title,
            width: media.media_details?.width ?? 1200,
            height: media.media_details?.height ?? 800,
          }
        : null,
    author: author ? { id: author.id, name: author.name, slug: author.slug } : null,
  };
}

function mapAuthor(raw: WPAuthor): Author {
  const avatars = raw.avatar_urls ?? {};
  const sizes = Object.keys(avatars).map(Number).sort((a, b) => b - a);
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    bio: stripTagsToParagraphs(raw.description ?? ""),
    avatarUrl: sizes.length ? avatars[String(sizes[0])] : null,
  };
}

export async function getPosts({
  page = 1,
  perPage = 9,
}: { page?: number; perPage?: number } = {}): Promise<{ posts: Post[]; totalPages: number }> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?per_page=${perPage}&page=${Math.max(1, page)}&_embed=1`,
    { next: { revalidate: REVALIDATE_SECONDS, tags: ["wp-posts"] } }
  );

  if (!res.ok) {
    // WordPress returns 400 (rest_post_invalid_page_number) once you page past the end.
    if (res.status === 400) return { posts: [], totalPages: 0 };
    throw new Error(`Failed to fetch WordPress posts: ${res.status} ${res.statusText}`);
  }

  const raw: WPPost[] = await res.json();
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
  return { posts: raw.map(mapPost), totalPages };
}

// Elementor articles open with a "Tl;DR" label widget followed by summary paragraph
// widgets, then the real article starting at the first <h2>. Pull that block out so it
// can render as a styled callout instead of unstyled leading paragraphs, and build a
// table of contents from the h2/h3 structure, injecting anchor ids as we go.
function processContent(rawHtml: string): { html: string; toc: TocItem[]; tldr: string | null } {
  let html = rawHtml;
  let tldr: string | null = null;

  // Some articles wrap the TL;DR label + summary paragraphs in a <blockquote>, others in
  // plain sibling <div>s — the wrapper varies, but it's never safe to slice out a raw
  // character range (that cuts through whatever <div>/<blockquote> wraps it, unbalancing
  // the HTML and causing hydration mismatches). Instead, only ever delete complete <strong>
  // and <p> elements by exact match, leaving every wrapper tag untouched.
  const tldrLabelMatch = html.match(/<strong>\s*tl\s*[;:]?\s*dr\s*<\/strong>/i);
  if (tldrLabelMatch?.index !== undefined) {
    const labelEnd = tldrLabelMatch.index + tldrLabelMatch[0].length;
    const nextHeading = html.slice(labelEnd).match(/<h[234][\s>]/i);
    const boundary = nextHeading?.index !== undefined ? labelEnd + nextHeading.index : html.length;

    const paraRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    const paras: string[] = [];
    const removals: { start: number; end: number }[] = [
      { start: tldrLabelMatch.index, end: labelEnd },
    ];
    let m: RegExpExecArray | null;
    while ((m = paraRegex.exec(html))) {
      if (m.index >= boundary) break;
      if (m.index >= labelEnd) {
        const text = decodeEntities(stripTags(m[1]));
        if (text) paras.push(text);
        removals.push({ start: m.index, end: m.index + m[0].length });
      }
    }

    if (paras.length) {
      tldr = paras.join(" ");
      for (const { start, end } of removals.sort((a, b) => b.start - a.start)) {
        html = html.slice(0, start) + html.slice(end);
      }
    }
  }

  // Heading levels aren't always semantically consistent (the section above was one example,
  // and the same article can also use h4 as a real third tier nested under an h3 elsewhere) —
  // so rather than hard-coding "h2/h3/h4 = tier 1/2/3", adapt to whatever tag first establishes
  // each tier and re-adopt a shallower tag for a tier when one shows up, up to three tiers deep
  // ("1", "2", "2.1", "2.2", "3", "3.1", "3.1.1"...), matching what the sidebar renders.
  const usedSlugs = new Set<string>();
  const toc: TocItem[] = [];
  let tier1Tag: number | null = null;
  let tier2Tag: number | null = null;
  let n1 = 0;
  let n2 = 0;
  let n3 = 0;

  html = html.replace(/<h([234])((?:\s[^>]*)?)>([\s\S]*?)<\/h\1>/gi, (match, levelStr, attrs, inner) => {
    const tag = Number(levelStr);
    const text = decodeEntities(stripTags(inner)).trim();
    if (!text) return match;

    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
    let slug = base;
    let i = 2;
    while (usedSlugs.has(slug)) slug = `${base}-${i++}`;
    usedSlugs.add(slug);

    if (tier1Tag === null) tier1Tag = tag;

    let number: string;
    let level: 1 | 2 | 3;
    if (tag <= tier1Tag) {
      tier1Tag = tag;
      tier2Tag = null;
      n1 += 1;
      n2 = 0;
      n3 = 0;
      number = `${n1}`;
      level = 1;
    } else if (tier2Tag === null || tag <= tier2Tag) {
      tier2Tag = tag;
      n2 += 1;
      n3 = 0;
      number = `${n1}.${n2}`;
      level = 2;
    } else {
      n3 += 1;
      number = `${n1}.${n2}.${n3}`;
      level = 3;
    }
    toc.push({ id: slug, text, level, number });

    const newAttrs = /\bid=/.test(attrs) ? attrs : `${attrs} id="${slug}"`;
    return `<h${tag}${newAttrs}>${inner}</h${tag}>`;
  });

  return { html, toc, tldr };
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
    { next: { revalidate: REVALIDATE_SECONDS, tags: ["wp-posts", `wp-post-${slug}`] } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch WordPress post "${slug}": ${res.status} ${res.statusText}`);
  }

  const raw: WPPost[] = await res.json();
  if (!raw[0]) return null;

  const post = mapPost(raw[0]);
  const { html, toc, tldr } = processContent(post.content);
  return { ...post, content: html, toc, tldr };
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/users?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: REVALIDATE_SECONDS, tags: ["wp-authors", `wp-author-${slug}`] } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch WordPress author "${slug}": ${res.status} ${res.statusText}`);
  }

  const raw: WPAuthor[] = await res.json();
  return raw[0] ? mapAuthor(raw[0]) : null;
}

export async function getPostsByAuthor(
  authorId: number,
  { page = 1, perPage = 9 }: { page?: number; perPage?: number } = {}
): Promise<{ posts: Post[]; totalPages: number }> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?author=${authorId}&per_page=${perPage}&page=${Math.max(1, page)}&_embed=1`,
    { next: { revalidate: REVALIDATE_SECONDS, tags: ["wp-posts", `wp-author-posts-${authorId}`] } }
  );

  if (!res.ok) {
    if (res.status === 400) return { posts: [], totalPages: 0 };
    throw new Error(`Failed to fetch posts for author ${authorId}: ${res.status} ${res.statusText}`);
  }

  const raw: WPPost[] = await res.json();
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
  return { posts: raw.map(mapPost), totalPages };
}
