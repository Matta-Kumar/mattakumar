"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";
import type { Service } from "@/sanity/lib/queries";

export default function ServicesList({ services: SERVICES }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="px-6 md:px-12 py-24 md:py-32">
      <div className="flex items-end justify-between mb-14 md:mb-20">
        <div>
          <p className="label text-signal mb-6">What I do</p>
          <HlTitle as="h2" className="display text-4xl md:text-6xl">
            Seven capabilities, <Hl>one growth engine</Hl>
          </HlTitle>
        </div>
        <p className="hidden md:block label text-smoke pb-2">07</p>
      </div>

      <div className="border-t border-fog" onMouseLeave={() => setActive(0)}>
        {SERVICES.map((s, i) => {
          const open = active === i;
          return (
            <FadeUp key={s.n} delay={i * 0.04} y={20}>
              <div
                className={`border-b border-fog transition-colors duration-500 ${
                  open ? "bg-paper-deep" : "bg-paper"
                }`}
                onMouseEnter={() => setActive(i)}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  data-cursor={open ? "Close" : "Expand"}
                  onClick={() => setActive(open ? null : i)}
                  className="w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-12 gap-4 md:gap-8 items-baseline text-left px-2 md:px-4 py-7 md:py-8"
                >
                  <span className={`md:col-span-1 label transition-colors duration-300 ${open ? "text-signal" : "text-smoke-light"}`}>
                    {s.n}
                  </span>
                  <h3 className={`md:col-span-4 display text-2xl md:text-[2rem] transition-colors duration-300 ${open ? "text-signal" : ""}`}>
                    {s.title}
                  </h3>
                  <p className="hidden md:block md:col-span-6 text-[15px] text-smoke">
                    {s.benefit}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`md:col-span-1 justify-self-end text-xl leading-none transition-transform duration-500 ${
                      open ? "rotate-45 text-signal" : "text-smoke-light"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid md:grid-cols-12 gap-8 px-2 md:px-4 pb-10 pt-1">
                      <div className="md:col-span-5 md:col-start-2">
                        <p className="text-[15px] leading-[1.75] text-smoke mb-7 max-w-[52ch]">
                          {s.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {s.deliverables.map((d) => (
                            <span
                              key={d}
                              className="label border border-fog bg-paper rounded-full px-3.5 py-2 text-ink"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6">
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
                          <Link href={`/services/${s.slug}`} className="link-line text-[13px] font-medium">
                            Full details →
                          </Link>
                        </div>
                      </div>
                      <div className="md:col-span-5 md:col-start-8 relative aspect-[16/10] rounded-2xl overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
