import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAuthorBySlug, getPostsByAuthor } from "@/lib/wordpress";
import { SOCIALS } from "@/lib/socials";
import PostCard from "@/components/insights/PostCard";
import Magnetic from "@/components/anim/Magnetic";

// The WordPress Gravatar for the primary author resolves to a generic
// placeholder silhouette (no photo registered with that email), and the
// old theme's author box carried a job title that isn't exposed by the
// REST API at all. Both are known-real facts about this specific person,
// not guesses, so they're keyed off the one real author this site has.
const KNOWN_AUTHORS: Record<string, { photo: string; title: string }> = {
  "matta-kumar": { photo: "/satish/short-portrait.png", title: "CEO of Pyrite Technologies" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};

  return {
    title: `${author.name} — Matta Kumar`,
    description: author.bio.join(" ") || undefined,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const { posts } = await getPostsByAuthor(author.id, { perPage: 24 });
  const known = KNOWN_AUTHORS[author.slug];
  const firstName = author.name.split(" ")[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-signal-tint">
        <div className="px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-20 grid md:grid-cols-12 gap-12 md:gap-8 items-center">
          <div className="md:col-span-7">
            <h1 className="display text-4xl md:text-6xl mb-2">
              Hi, I&apos;m {author.name}
            </h1>
            {known && (
              <p className="text-lg md:text-xl text-signal font-medium mb-8">{known.title}</p>
            )}
            {author.bio.length > 0 && (
              <div className="space-y-4 mb-10 max-w-[60ch]">
                {author.bio.map((para, i) => (
                  <p key={i} className="text-[15px] md:text-base leading-[1.75] text-ink/80">
                    {para}
                  </p>
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              <Magnetic>
                <a
                  href="https://calendly.com/mattakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sweep inline-block bg-ink text-paper text-sm font-medium px-7 py-4 rounded-full"
                >
                  <span>Book an appointment</span>
                </a>
              </Magnetic>
              <div className="flex items-center gap-4">
                <span className="label text-ink/50">Follow:</span>
                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center w-9 h-9 rounded-full text-ink/70 hover:text-signal transition-colors duration-200"
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-signal/10 shrink-0">
              {known ? (
                <Image
                  src={known.photo}
                  alt={author.name}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                  priority
                />
              ) : author.avatarUrl ? (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center display text-6xl text-signal/40">
                  {firstName.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <p className="label text-smoke-light mb-10">
          {posts.length} {posts.length === 1 ? "article" : "articles"} by {firstName}
        </p>
        {posts.length === 0 ? (
          <p className="text-smoke">No posts from {author.name} yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
