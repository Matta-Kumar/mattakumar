import type { Metadata } from "next";
import Link from "next/link";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";
import { getCaseStudies } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Case Studies — Matta Kumar",
  description:
    "Illustrative examples of the outcomes each service is built toward, honestly labeled as sample data — real client case studies are in progress.",
};

export default async function CaseStudiesPage() {
  const CASES = await getCaseStudies();

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-12 pt-44 pb-16 md:pb-20">
        <p className="label text-signal mb-8">Case studies</p>
        <HlTitle as="h1" className="display text-5xl md:text-7xl max-w-[20ch] mb-10">
          Illustrative examples, <Hl>not a client roster</Hl>
        </HlTitle>
        <FadeUp>
          <p className="text-[15px] md:text-base leading-[1.75] text-smoke max-w-[56ch] mb-10">
            We don&apos;t yet have permission to publish real client names or
            numbers here. What follows are representative scenarios — the
            kind of situation, approach, and outcome each service on this
            site is built to produce — not a swapped-in fabrication of a real
            engagement. As real case studies clear approval, they&apos;ll
            replace these one at a time.
          </p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <div className="flex items-start gap-4 rounded-2xl border border-signal/30 bg-signal-tint px-6 py-5 max-w-[62ch]">
            <span aria-hidden="true" className="mt-[7px] shrink-0 w-2 h-2 rounded-full bg-signal" />
            <p className="text-[13.5px] leading-relaxed text-ink">
              <span className="font-medium">Illustrative examples — real case studies coming soon.</span>{" "}
              Every metric, client description, and narrative below is a
              representative example of the kind of result we aim for, not a
              verified claim from a named client.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Case grid */}
      <div className="border-t border-fog px-6 md:px-12 py-14 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fog rounded-2xl overflow-hidden border border-fog">
          {CASES.map((c, i) => (
            <FadeUp key={c.slug} delay={i * 0.03} y={16}>
              <Link
                href={`/case-studies/${c.slug}`}
                className="group bg-paper hover:bg-paper-deep transition-colors duration-300 px-7 py-9 flex flex-col h-full"
              >
                <span className="label text-smoke-light mb-5">
                  {String(i + 1).padStart(2, "0")} — {c.client}
                </span>
                <span className="display text-4xl md:text-5xl mb-3 leading-tight text-ink group-hover:text-signal transition-colors duration-300">
                  {c.metric}
                </span>
                <span className="text-sm text-smoke leading-relaxed mb-6">{c.line}</span>
                <div className="flex flex-wrap gap-2 mt-auto mb-6">
                  {c.services.map((s) => (
                    <span
                      key={s}
                      className="label border border-fog rounded-full px-3 py-1.5 text-smoke"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="link-line text-[13px] font-medium self-start">View case →</span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>

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
