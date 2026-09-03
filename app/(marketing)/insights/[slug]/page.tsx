import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/wordpress";
import TableOfContents from "@/components/insights/TableOfContents";
import ShareButtons from "@/components/insights/ShareButtons";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Matta Kumar`,
    description: post.excerpt,
    openGraph: post.featuredImage
      ? { title: post.title, description: post.excerpt, images: [post.featuredImage.url] }
      : { title: post.title, description: post.excerpt },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "www.mattakumar.com";
  const proto = hdrs.get("x-forwarded-proto") ?? "https";
  const shareUrl = `${proto}://${host}/insights/${post.slug}`;

  return (
    <article>
      {/* Hero */}
      <div className="bg-signal-tint">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-14 md:pb-16 grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
          <div className="min-w-0">
            <nav className="label text-smoke mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-ink transition-colors duration-300">Home</Link>
              <span className="mx-2 text-smoke-light">/</span>
              <Link href="/insights" className="hover:text-ink transition-colors duration-300">Insights</Link>
              {post.category && (
                <>
                  <span className="mx-2 text-smoke-light">/</span>
                  <span>{post.category.name}</span>
                </>
              )}
            </nav>
            <h1 className="display text-3xl md:text-5xl leading-[1.12] mb-8 max-w-[26ch] break-words">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 label text-smoke">
              {post.author ? (
                <Link href={`/insights/author/${post.author.slug}`} className="hover:text-ink transition-colors duration-300">
                  By {post.author.name}
                </Link>
              ) : (
                <span>By Matta Kumar</span>
              )}
              <span>{formatDate(post.date)}</span>
            </div>
          </div>

          {post.featuredImage && (
            <div className="hidden md:block relative w-[280px] h-[280px] shrink-0 overflow-hidden">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                fill
                sizes="280px"
                className="object-cover mix-blend-multiply"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20 grid md:grid-cols-[240px_1fr] gap-12 md:gap-16 items-start">
        <aside className="md:sticky md:top-28 flex flex-col gap-8">
          <ShareButtons url={shareUrl} title={post.title} />
          <TableOfContents toc={post.toc} />
        </aside>

        <div className="min-w-0">
          {post.tldr && (
            <div className="rounded-xl bg-paper-deep border-l-4 border-signal px-6 py-5 mb-10">
              <p className="label text-signal mb-2">TL;DR</p>
              <p className="text-[15px] leading-relaxed text-ink">{post.tldr}</p>
            </div>
          )}
          <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  );
}
