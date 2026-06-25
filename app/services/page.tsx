import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Matta Kumar",
  description:
    "SEO, GEO/AEO, web development, ecommerce, digital ads, content marketing, social media, and design.",
};

export default function ServicesPage() {
  return (
    <section className="px-6 md:px-12 pt-44 pb-32 min-h-svh">
      <p className="label text-signal mb-8">Services</p>
      <h1 className="display text-5xl md:text-7xl max-w-[14ch] mb-10">
        Full service-page build coming next.
      </h1>
      <p className="text-[15px] leading-[1.7] text-smoke max-w-[50ch]">
        This page will detail each capability — SEO · GEO · AEO, web
        development, ecommerce, digital ads, content marketing, social media,
        and graphic design — with deliverables and engagement models.
      </p>
    </section>
  );
}
