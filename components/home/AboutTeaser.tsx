"use client";

import Link from "next/link";
import HlTitle from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import MediaPlaceholder from "@/components/media/MediaPlaceholder";

export default function AboutTeaser() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-paper-deep">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4">
          <MediaPlaceholder
            kind="photo"
            ratio="4/5"
            note="Editorial B&W portrait of Satish — candid, at work. This photo carries the whole section."
            className="rounded-2xl"
          />
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="label text-signal mb-8">Who you work with</p>
          <HlTitle as="h2" className="display text-3xl md:text-[2.9rem] leading-[1.12] mb-8 max-w-[24ch]">
            I’m Satish — your whole agency.
          </HlTitle>
          <FadeUp>
            <p className="text-[15px] md:text-base leading-[1.75] text-smoke max-w-[56ch] mb-10">
              Matta Satish Kumar. Eighteen years inside Google’s algorithm,
              through every era of search. When you work with me, the person on
              the call is the person doing the work — backed by a trusted
              network of specialists when a project needs more hands.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/about" className="link-line text-sm font-medium">
              More about Satish →
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
