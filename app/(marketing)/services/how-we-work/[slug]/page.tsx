import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";
import { getEngagementModels, getEngagementModelBySlug, getServices } from "@/sanity/lib/queries";
import { OFFERING_ICONS } from "@/components/icons/OfferingIcons";

export async function generateStaticParams() {
  const models = await getEngagementModels();
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = await getEngagementModelBySlug(slug);
  if (!model) return {};

  return {
    title: `${model.name} — How We'd Work Together — Matta Kumar`,
    description: model.desc,
  };
}

export default async function EngagementModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [model, allModels, allServices] = await Promise.all([
    getEngagementModelBySlug(slug),
    getEngagementModels(),
    getServices(),
  ]);
  if (!model) notFound();

  const index = allModels.findIndex((m) => m.slug === slug);
  const others = allModels.filter((m) => m.slug !== slug);
  const SERVICES = allServices;

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-12 pt-32 pb-20 md:pb-28">
        <nav className="label text-smoke mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink transition-colors duration-300">Home</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <Link href="/services" className="hover:text-ink transition-colors duration-300">Services</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <Link href="/services/how-we-work" className="hover:text-ink transition-colors duration-300">How we&apos;d work together</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <span className="label text-smoke-light">{model.name}</span>
        </nav>
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-6">
            <FadeUp>
              <p className="label text-smoke-light mb-6">
                {model.flagship ? <span className="text-signal"> · Most popular</span> : null}
              </p>
              <HlTitle as="h1" className="display text-4xl md:text-6xl mb-5 max-w-[18ch]">
                {model.name}
              </HlTitle>
              <p className="text-lg md:text-xl text-signal mb-6 max-w-[36ch] leading-snug">
                {model.desc}
              </p>
              <p className="text-[15px] leading-[1.75] text-smoke mb-8 max-w-[52ch]">
                <span className="text-ink font-medium">Best for: </span>
                {model.bestFor}
              </p>
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

          <div className="md:col-span-5">
            <FadeUp delay={0.1} y={28}>
              <div
                className={`relative aspect-[16/11] rounded-2xl overflow-hidden border border-fog p-8 md:p-10 flex flex-col justify-between ${
                  model.flagship ? "bg-ink text-paper" : "bg-paper-deep"
                }`}
              >
                <div>
                  <p className={`label mb-3 ${model.flagship ? "text-signal-soft" : "text-smoke-light"}`}>
                    {model.code}
                  </p>
                  <p
                    aria-hidden="true"
                    className={`display text-6xl md:text-7xl leading-none select-none ${
                      model.flagship ? "text-paper/10" : "text-ink/10"
                    }`}
                  >
                    {model.code}
                  </p>
                </div>
                <ul className="space-y-3">
                  {model.includes.slice(0, 3).map((inc) => {
                    const Icon = OFFERING_ICONS[inc.icon];
                    return (
                      <li
                        key={inc.title}
                        className={`flex items-center gap-3 text-[13px] ${
                          model.flagship ? "text-paper/75" : "text-smoke"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                        {inc.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* What this looks like */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-8 md:gap-8">
          <div className="md:col-span-3">
            <FadeUp>
              <p className="label text-signal">What this looks like</p>
            </FadeUp>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <FadeUp delay={0.05} y={24}>
              <p className="text-xl md:text-[1.65rem] leading-[1.45] text-ink max-w-[46ch]">
                {model.whatItIs}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Value props — editorial numbered list */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28 bg-paper-deep">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <FadeUp>
              <p className="label text-signal mb-6">Why this model</p>
            </FadeUp>
            <HlTitle as="h2" className="display text-3xl md:text-[2.75rem] max-w-[14ch]">
              What you actually <Hl>get</Hl>
            </HlTitle>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <div>
              {model.valueProps.map((v, i) => (
                <FadeUp key={v} delay={i * 0.05} y={20}>
                  <div className="flex items-start gap-6 md:gap-8 py-7 md:py-8 border-t border-fog first:border-t-0">
                    <span className="label text-signal shrink-0 pt-1.5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xl md:text-[1.7rem] leading-[1.35] text-ink max-w-[42ch]">
                      {v}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's included — vertical cadence timeline, distinct from services' icon-card grid */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <FadeUp>
              <p className="label text-signal mb-6">How it runs</p>
            </FadeUp>
            <HlTitle as="h2" className="display text-3xl md:text-[2.75rem] max-w-[14ch] mb-5">
              What&apos;s <Hl>included</Hl>
            </HlTitle>
            <p className="label text-smoke-light">
              {String(model.includes.length).padStart(2, "0")} parts
            </p>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            {model.includes.map((inc, i) => {
              const Icon = OFFERING_ICONS[inc.icon];
              const isLast = i === model.includes.length - 1;
              return (
                <FadeUp key={inc.title} delay={i * 0.05} y={18}>
                  <div className="relative flex gap-6 md:gap-8">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full border border-fog bg-paper-deep text-signal flex items-center justify-center shrink-0">
                        <Icon className="w-[24px] h-[24px]" aria-hidden="true" />
                      </div>
                      {!isLast && <div className="w-px flex-1 bg-fog my-2" />}
                    </div>
                    <div className={isLast ? "pb-0 pt-1" : "pb-10 md:pb-12 pt-1"}>
                      <h3 className="text-xl md:text-2xl font-semibold text-ink mb-2.5 leading-snug">{inc.title}</h3>
                      <p className="text-[15px] md:text-base leading-relaxed text-smoke max-w-[60ch]">{inc.desc}</p>
                    </div>
                  </div>
              </FadeUp>
            );
          })}
        </div>
        </div>
      </section>

      {/* Cross-sell to the other engagement models */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <FadeUp>
          <p className="label text-smoke-light mb-8">Other ways to work together</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fog rounded-2xl overflow-hidden border border-fog">
          {others.map((m) => (
            <Link
              key={m.slug}
              href={`/services/how-we-work/${m.slug}`}
              className={`group transition-colors duration-300 px-7 py-9 flex flex-col ${
                m.flagship ? "bg-ink text-paper hover:bg-ink-soft" : "bg-paper hover:bg-paper-deep"
              }`}
            >
              <span className={`label mb-4 ${m.flagship ? "text-signal-soft" : "text-smoke-light"}`}>
                {m.flagship ? "Most popular" : m.code}
              </span>
              <span
                className={`text-[15px] font-medium mb-1.5 transition-colors duration-300 ${
                  m.flagship ? "" : "text-ink group-hover:text-signal"
                }`}
              >
                {m.name}
              </span>
              <span className={`text-[13px] leading-relaxed ${m.flagship ? "text-paper/60" : "text-smoke"}`}>
                {m.desc}
              </span>
            </Link>
          ))}
          <Link
            href="/services"
            className="group bg-ink text-paper hover:bg-ink-soft transition-colors duration-300 px-7 py-9 flex flex-col"
          >
            <span className="label text-signal-soft mb-4">Not sure yet?</span>
            <span className="text-[15px] font-medium mb-1.5">See what we&apos;d actually be doing</span>
            <span className="text-[13px] text-paper/60 leading-relaxed">
              Browse all {SERVICES.length} capabilities, then pick the model that fits.
            </span>
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink text-paper px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="label text-signal-soft mb-6">Ready now</p>
          </FadeUp>
          <HlTitle as="h2" className="display text-5xl md:text-[5.2rem] mb-12 md:mb-16 max-w-[18ch]">
            Let&apos;s talk <Hl>{model.name.toLowerCase()}</Hl>
          </HlTitle>
          <FadeUp delay={0.1}>
            <p className="text-[15px] leading-[1.7] text-paper/60 max-w-[44ch] mb-10">
              Thirty minutes on your growth problem. Bring your domain — leave
              with a direction, and a straight answer on whether this model is
              the right fit.
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
