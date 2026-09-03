import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";
import { getServices, getServiceBySlug } from "@/sanity/lib/queries";
import { OFFERING_ICONS, getOfferingIcon } from "@/components/icons/OfferingIcons";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — Matta Kumar`,
    description: service.desc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const others = (await getServices()).filter((s) => s.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-12 pt-32 pb-20 md:pb-28">
        <nav className="label text-smoke mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink transition-colors duration-300">Home</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <Link href="/services" className="hover:text-ink transition-colors duration-300">Services</Link>
          <span className="mx-2 text-smoke-light">/</span>
          <span className="label text-smoke-light">{service.title}</span>
        </nav>
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-6">
            <FadeUp>
              <HlTitle as="h1" className="display text-4xl md:text-6xl mb-5 max-w-[16ch]">
                {service.title}
              </HlTitle>
              <p className="text-lg md:text-xl text-signal mb-6 max-w-[30ch] leading-snug">
                {service.benefit}
              </p>
              <p className="text-[15px] leading-[1.75] text-smoke mb-8 max-w-[52ch]">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-9">
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className="label border border-fog bg-paper rounded-full px-3.5 py-2 text-ink"
                  >
                    {d}
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
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-paper-deep">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* What this is */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-8 md:gap-8">
          <div className="md:col-span-3">
            <FadeUp>
              <p className="label text-signal">What this is</p>
            </FadeUp>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <FadeUp delay={0.05} y={24}>
              <p className="text-xl md:text-[1.65rem] leading-[1.45] text-ink max-w-[46ch]">
                {service.whatItIs}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* What you get — editorial numbered list, no cell grid */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28 bg-paper-deep">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <FadeUp>
              <p className="label text-signal mb-6">What you get</p>
            </FadeUp>
            <HlTitle as="h2" className="display text-3xl md:text-[2.75rem] max-w-[14ch]">
              Outcomes, not <Hl>activity</Hl>
            </HlTitle>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <div>
              {service.valueProps.map((v, i) => (
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

      {/* What's included — icon cards */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
          <div>
            <FadeUp>
              <p className="label text-signal mb-6">What&apos;s included</p>
            </FadeUp>
            <HlTitle as="h2" className="display text-3xl md:text-5xl max-w-[22ch]">
              Every <Hl>offering</Hl>, unpacked
            </HlTitle>
          </div>
          <p className="hidden md:block label text-smoke pb-2">{String(service.offerings.length).padStart(2, "0")} offerings</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {service.offerings.map((o, i) => {
            const Icon = OFFERING_ICONS[getOfferingIcon(o.title)];
            return (
              <FadeUp key={o.title} delay={i * 0.04} y={18}>
                <div className="group h-full rounded-2xl border border-fog bg-paper px-7 py-8 md:px-8 md:py-9 transition-colors duration-300 hover:border-signal/40">
                  <div className="w-11 h-11 rounded-xl bg-signal-tint text-signal flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-signal group-hover:text-paper">
                    <Icon className="w-[22px] h-[22px]" aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-medium text-ink mb-2 leading-snug">{o.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-smoke max-w-[40ch]">{o.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* Cross-sell */}
      <section className="border-t border-fog px-6 md:px-12 py-20 md:py-28">
        <FadeUp>
          <p className="label text-smoke-light mb-8">Other capabilities</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fog rounded-2xl overflow-hidden border border-fog">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-paper hover:bg-paper-deep transition-colors duration-300 px-7 py-9 flex flex-col"
            >
              <span className="label text-smoke-light mb-4">{s.n}</span>
              <span className="text-[15px] font-medium text-ink group-hover:text-signal transition-colors duration-300 mb-1.5">
                {s.title}
              </span>
              <span className="text-[13px] text-smoke leading-relaxed">{s.benefit}</span>
            </Link>
          ))}
          <Link
            href="/services/how-we-work"
            className="group bg-ink text-paper hover:bg-ink-soft transition-colors duration-300 px-7 py-9 flex flex-col"
          >
            <span className="label text-signal-soft mb-4">How we work</span>
            <span className="text-[15px] font-medium mb-1.5">Pick how hands-on you want to be</span>
            <span className="text-[13px] text-paper/60 leading-relaxed">Five ways to engage, DIY to fully done-for-you.</span>
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
            Let&apos;s talk <Hl>{service.title.toLowerCase()}</Hl>
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
