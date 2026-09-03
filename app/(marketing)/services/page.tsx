import type { Metadata } from "next";
import Link from "next/link";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";
import { getServices } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Services — Matta Kumar",
  description:
    "SEO · GEO · AEO, performance ads, content marketing, social media, web development, ecommerce, and brand & design — seven capabilities, one growth engine.",
};

export default async function ServicesPage() {
  const SERVICES = await getServices();

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-12 pt-44 pb-16 md:pb-20">
        <p className="label text-signal mb-8">Services</p>
        <HlTitle as="h1" className="display text-5xl md:text-7xl max-w-[16ch] mb-10">
          Seven capabilities, <Hl>one growth engine</Hl>
        </HlTitle>
        <FadeUp>
          <p className="text-[15px] md:text-base leading-[1.75] text-smoke max-w-[56ch]">
            Search, ads, content, social, the site itself, the store, the
            brand — treated as one system instead of seven vendors. Pick a
            single capability or hand over the whole engine; every service
            below ships with the deliverables, not just the strategy deck.
          </p>
        </FadeUp>
      </section>

      {/* Service grid */}
      <div className="border-t border-fog px-6 md:px-12 py-14 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fog rounded-2xl overflow-hidden border border-fog">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.slug} delay={i * 0.03} y={16}>
              <Link
                href={`/services/${s.slug}`}
                className="group bg-paper hover:bg-paper-deep transition-colors duration-300 px-7 py-9 flex flex-col h-full"
              >
                <span className="label text-smoke-light mb-5">{s.n}</span>
                <span className="display text-xl md:text-2xl mb-3 leading-tight text-ink group-hover:text-signal transition-colors duration-300">
                  {s.title}
                </span>
                <span className="text-sm text-smoke leading-relaxed mb-6">{s.benefit}</span>
                <span className="link-line text-[13px] font-medium mt-auto self-start">Explore →</span>
              </Link>
            </FadeUp>
          ))}

          {/* How we'd work together callout */}
          <FadeUp delay={SERVICES.length * 0.03} y={16}>
            <Link
              href="/services/how-we-work"
              className="group bg-signal-tint hover:bg-signal/10 transition-colors duration-300 px-7 py-9 flex flex-col h-full"
            >
              <span className="label text-signal mb-5">How we work</span>
              <span className="display text-xl md:text-2xl mb-3 leading-tight text-ink group-hover:text-signal transition-colors duration-300">
                Pick how hands-on you want to be
              </span>
              <span className="text-sm text-smoke leading-relaxed mb-6">
                DIY to fully done-for-you — five ways to engage.
              </span>
              <span className="link-line text-[13px] font-medium mt-auto self-start">See the models →</span>
            </Link>
          </FadeUp>
        </div>
      </div>

      {/* Closing CTA */}
      <section className="bg-ink text-paper px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="label text-signal-soft mb-6">Ready now</p>
          </FadeUp>
          <HlTitle as="h2" className="display text-5xl md:text-[5.2rem] mb-12 md:mb-16 max-w-[18ch]">
            Not sure which service <Hl>you need</Hl>?
          </HlTitle>
          <FadeUp delay={0.1}>
            <p className="text-[15px] leading-[1.7] text-paper/60 max-w-[44ch] mb-10">
              Thirty minutes on your growth problem. Bring your domain — leave
              with a direction, and a straight answer on where to start.
            </p>
            <Magnetic>
              <a
                href="https://calendly.com/mattakumar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-block bg-paper text-ink text-sm font-medium px-9 py-4 rounded-full"
              >
                <span>Book a strategy call</span>
              </a>
            </Magnetic>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
