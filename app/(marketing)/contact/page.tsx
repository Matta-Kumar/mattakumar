import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import CalendlyEmbed from "@/components/contact/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Contact — Matta Kumar",
  description:
    "Book a 30-minute strategy call directly on the calendar below — no forms, no back-and-forth.",
};

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What happens on the call?",
    a: (
      <>
        Thirty minutes, no deck. We talk through what&apos;s actually
        happening in your search, ads, content, or site — and you leave with
        a direction, not a pitch.
      </>
    ),
  },
  {
    q: "How fast can we start?",
    a: (
      <>
        Depends on the engagement. A one-time consultation can wrap up on
        the call itself; a Done-For-You build starts with a short scoping
        step right after. There are{" "}
        <Link href="/services/how-we-work" className="link-line text-ink font-medium">
          five ways to work together
        </Link>
        , from DIY to fully hands-off.
      </>
    ),
  },
  {
    q: "Not sure which service is the right fit?",
    a: (
      <>
        That&apos;s a normal reason to book the call. If you&apos;d rather
        look first, all seven capabilities are laid out on the{" "}
        <Link href="/services" className="link-line text-ink font-medium">
          services page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do you only work with SEO clients?",
    a: (
      <>
        Search is the anchor, but the engine covers ads, content, social,
        the site itself, ecommerce, and brand &amp; design too — across ten
        sectors from SaaS to local services.
      </>
    ),
  },
  {
    q: "Prefer not to hop on a call?",
    a: (
      <>
        Email reaches the same team —{" "}
        <a href="mailto:support@mattakumar.com" className="link-line text-ink font-medium">
          support@mattakumar.com
        </a>
        , Mon–Fri, 9AM–6PM IST — or follow the day-to-day of the work on{" "}
        <a
          href="https://x.com/mattakumar"
          target="_blank"
          rel="noopener noreferrer"
          className="link-line text-ink font-medium"
        >
          X
        </a>
        .
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero — title left, description right, calendar full-width below */}
      <section className="px-6 md:px-12 pt-44 pb-16 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 mb-14 md:mb-16">
          <div className="shrink-0">
            <p className="label text-signal mb-8">Contact</p>
            <HlTitle as="h1" className="display text-5xl md:text-6xl lg:text-7xl max-w-[14ch]">
              Let&apos;s talk <Hl>growth.</Hl>
            </HlTitle>
          </div>
          <FadeUp className="md:max-w-[50ch] md:text-right">
            <p className="text-[15px] md:text-base leading-[1.75] text-smoke">
              Pick a slot below and it lands directly on my calendar — no
              forms, no gatekeeping. Thirty minutes on your growth problem:
              bring your domain, leave with a direction and a straight
              answer on where to start.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.05} y={24}>
          {/* <p className="label text-signal mb-6">Pick a time</p> */}
          <div className="rounded-2xl border border-fog bg-paper-deep p-3 md:p-4">
            <div className="rounded-xl overflow-hidden bg-paper">
              <CalendlyEmbed />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* FAQ */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <div className="mb-14 md:mb-16">
          <FadeUp>
            <p className="label text-signal mb-6">Before you book</p>
          </FadeUp>
          <HlTitle as="h2" className="display text-3xl md:text-5xl max-w-[20ch]">
            A few things <Hl>people ask</Hl>
          </HlTitle>
        </div>

        <div className="border-t border-fog">
          {FAQS.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.03} y={16}>
              <details className="group border-b border-fog open:bg-paper-deep transition-colors duration-500">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6 px-2 md:px-4 py-7 md:py-8">
                  <span className="text-[15px] md:text-lg font-medium text-ink pr-4">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl leading-none text-smoke-light transition-transform duration-500 group-open:rotate-45 group-open:text-signal"
                  >
                    +
                  </span>
                </summary>
                <div className="px-2 md:px-4 pb-7 md:pb-8 -mt-1">
                  <p className="text-[15px] leading-[1.75] text-smoke max-w-[60ch]">
                    {f.a}
                  </p>
                </div>
              </details>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
