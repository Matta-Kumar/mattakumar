import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Matta Kumar",
  description:
    "Led by Matta Satish Kumar — 18 years in search — with a team of developers, writers, designers, and media buyers.",
};

export default function AboutPage() {
  return (
    <section className="px-6 md:px-12 pt-44 pb-32 min-h-svh">
      <p className="label text-signal mb-8">About</p>
      <h1 className="display text-5xl md:text-7xl max-w-[14ch] mb-10">
        The story of Satish goes here.
      </h1>
      <p className="text-[15px] leading-[1.7] text-smoke max-w-[50ch]">
        Full about-page build coming next: Matta Satish Kumar’s 18 years in
        search, the studio’s philosophy, and the team behind the work.
      </p>
    </section>
  );
}
