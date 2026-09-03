import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/wordpress";
import PostCard from "@/components/insights/PostCard";

export const metadata: Metadata = {
  title: "Insights — Matta Kumar",
  description:
    "Notes on SEO, GEO, and AI search visibility — from ranking in Google to being cited by ChatGPT.",
};

const PER_PAGE = 9;

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, totalPages } = await getPosts({ page, perPage: PER_PAGE });

  return (
    <section className="px-6 md:px-12 pt-44 pb-32 min-h-svh">
      <p className="label text-signal mb-8">Insights</p>
      <h1 className="display text-5xl md:text-7xl max-w-[16ch] mb-10">
        SEO and AI search, in practice.
      </h1>
      <p className="text-[15px] leading-[1.7] text-smoke max-w-[50ch] mb-20">
        Notes on ranking in Google, ChatGPT, and every surface in between —
        pulled straight from the field.
      </p>

      {posts.length === 0 ? (
        <p className="text-smoke">No posts to show yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-between mt-24 pt-10 border-t border-fog">
          {page > 1 ? (
            <Link href={`/insights?page=${page - 1}`} className="link-line label">
              ← Newer
            </Link>
          ) : (
            <span />
          )}
          <p className="label text-smoke-light">
            Page {page} of {totalPages}
          </p>
          {page < totalPages ? (
            <Link href={`/insights?page=${page + 1}`} className="link-line label">
              Older →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </section>
  );
}
