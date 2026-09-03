import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";
import MediaPlaceholder from "@/components/media/MediaPlaceholder";
import { getCaseStudies, getCaseStudyBySlug } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.client} — Case Study — Matta Kumar`,
    description: `${study.metric} — ${study.line}. Illustrative example, not a verified client result.`,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [study, CASES] = await Promise.all([getCaseStudyBySlug(slug), getCaseStudies()]);
  if (!study) notFound();

  const index = CASES.findIndex((c) => c.slug === slug);
  const others = CASES.filter((c) => c.slug !== slug);

  const NARRATIVE: { label: string; heading: string; text: string }[] = [
    { label: "The situation", heading: "Where it started", text: study.situation },
    { label: "The approach", heading: "What we did", text: study.approach },
    { label: "The outcome", heading: "What changed", text: study.outcome },
  ];

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-12 pt-32 pb-16 md:pb-20">
        <nav className="label text-smoke mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink transition-colors duration-300">Home</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <Link href="/case-studies" className="hover:text-ink transition-colors duration-300">Case Studies</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <span className="label text-smoke-light">{study.client}</span>
        </nav>
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-6">
            <FadeUp>
              <p className="label text-smoke-light mb-6">
                {String(index + 1).padStart(2, "0")} — {study.client}
              </p>
              <HlTitle as="h1" className="display text-5xl md:text-7xl mb-5 max-w-[14ch]">
                <Hl>{study.metric}</Hl>
              </HlTitle>
              <p className="text-lg md:text-xl text-signal mb-8 max-w-[34ch] leading-snug">
                {study.line}
              </p>
              <div className="flex flex-wrap gap-2 mb-9">
                {study.services.map((s) => (
                  <span
                    key={s}
                    className="label border border-fog bg-paper rounded-full px-3.5 py-2 text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <Magnetic>
                <a
                  href="https://calendly.com/mattakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sweep inline-block bg-ink text-paper text-[13px] font-medium px-6 py-3.5 rounded-full"
                >
                  <span>Book a call about this</span>
                </a>
              </Magnetic>
            </FadeUp>
          </div>

          <div className="md:col-span-6">
            <FadeUp delay={0.1} y={28}>
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden">
                <MediaPlaceholder
                  kind="photo"
                  dark
                  ratio="auto"
                  note={study.note}
                  className="w-full h-full"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Honesty callout — kept visible on the detail page, not just the index */}
      <section className="border-t border-fog px-6 md:px-12 py-10 md:py-12">
        <FadeUp>
          <div className="flex items-start gap-4 rounded-2xl border border-signal/30 bg-signal-tint px-6 py-5 max-w-[62ch]">
            <span aria-hidden="true" className="mt-[7px] shrink-0 w-2 h-2 rounded-full bg-signal" />
            <p className="text-[13.5px] leading-relaxed text-ink">
              <span className="font-medium">Illustrative example — not a verified client result.</span>{" "}
              The metric, client description, and narrative on this page are a
              representative scenario of the kind of outcome this work is
              built toward, not a claim from a named client. Real case
              studies are in progress and will replace these as they clear
              approval.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Narrative — situation / approach / outcome, given room to breathe */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28 bg-paper-deep">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <FadeUp>
              <p className="label text-signal mb-6">How it played out</p>
            </FadeUp>
            <HlTitle as="h2" className="display text-3xl md:text-[2.75rem] max-w-[14ch]">
              Situation, <Hl>approach</Hl>, outcome
            </HlTitle>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <div>
              {NARRATIVE.map((n, i) => (
                <FadeUp key={n.label} delay={i * 0.05} y={20}>
                  <div className="flex items-start gap-6 md:gap-8 py-8 md:py-10 border-t border-fog first:border-t-0">
                    <span className="label text-signal shrink-0 pt-1.5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="label text-signal mb-3">{n.label}</p>
                      <h3 className="text-xl md:text-[1.7rem] leading-[1.35] text-ink mb-3 max-w-[42ch]">
                        {n.heading}
                      </h3>
                      <p className="text-[15px] md:text-base leading-[1.75] text-smoke max-w-[58ch]">
                        {n.text}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell to the other case studies */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <FadeUp>
          <p className="label text-smoke-light mb-8">Other case studies</p>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-px bg-fog rounded-2xl overflow-hidden border border-fog">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="group bg-paper hover:bg-paper-deep transition-colors duration-300 px-7 py-9 flex flex-col"
            >
              <span className="label text-smoke-light mb-4">{c.client}</span>
              <span className="display text-2xl md:text-3xl mb-2 text-ink group-hover:text-signal transition-colors duration-300">
                {c.metric}
              </span>
              <span className="text-[13px] text-smoke leading-relaxed">{c.line}</span>
            </Link>
          ))}
          <Link
            href="/case-studies"
            className="group bg-ink text-paper hover:bg-ink-soft transition-colors duration-300 px-7 py-9 flex flex-col"
          >
            <span className="label text-signal-soft mb-4">All cases</span>
            <span className="text-[15px] font-medium mb-1.5">See every illustrative example</span>
            <span className="text-[13px] text-paper/60 leading-relaxed">
              {CASES.length} scenarios across the services on this site.
            </span>
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink text-paper px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="label text-signal-soft mb-6">Not a roster yet</p>
          </FadeUp>
          <HlTitle as="h2" className="display text-5xl md:text-[5.2rem] mb-12 md:mb-16 max-w-[20ch]">
            Want to talk about <Hl>your numbers</Hl>?
          </HlTitle>
          <FadeUp delay={0.1}>
            <p className="text-[15px] leading-[1.7] text-paper/60 max-w-[48ch] mb-10">
              Real case studies are still in progress, but your current
              numbers aren&apos;t hypothetical. Thirty minutes on your growth
              problem — bring your domain, leave with a direction.
            </p>
            <Magnetic>
              <a
                href="https://calendly.com/mattakumar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-block bg-paper text-ink text-sm font-medium px-9 py-4 rounded-full"
              >
                <span>Book a call</span>
              </a>
            </Magnetic>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
