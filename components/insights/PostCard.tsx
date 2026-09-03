import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/wordpress";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <Link href={`/insights/${post.slug}`} className="group block">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-paper-deep mb-6">
          {post.featuredImage && (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>
        {post.category && (
          <p className="label text-signal mb-3">{post.category.name}</p>
        )}
        <h2 className="text-xl leading-snug mb-3 group-hover:text-signal transition-colors duration-300">
          {post.title}
        </h2>
        <p className="text-[14px] leading-[1.6] text-smoke line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <p className="label text-smoke-light">{formatDate(post.date)}</p>
      </Link>
    </article>
  );
}
