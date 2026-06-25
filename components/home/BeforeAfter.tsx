"use client";

import HlTitle, { Hl } from "@/components/anim/Highlight";
import CompareSwap from "@/components/media/CompareSwap";
import MediaPlaceholder from "@/components/media/MediaPlaceholder";

const STATS = [
  { channel: "Search & AI", bad: "Page 2 · uncited", good: "#1 · cited by AI" },
  { channel: "Website", bad: "0.9% conversion", good: "3.4% conversion" },
  { channel: "Paid ads", bad: "0.8x ROAS", good: "3.1x ROAS" },
  { channel: "Social", bad: "−2% reach", good: "+480% reach" },
];

function SceneLayer({ winning }: { winning: boolean }) {
  return (
    <div className="relative h-full w-full bg-ink-soft">
      <MediaPlaceholder
        kind="photo"
        dark
        ratio="auto"
        className="absolute inset-0 w-full h-full"
        note={
          winning
            ? "AFTER photo — exact same storefront, now alive: warm light, customers at the counter, the owner mid-handover smiling, tablet showing a rising chart, busy street outside"
            : "BEFORE photo — a beautiful but empty store at dusk: the owner alone behind the counter checking their phone, cool dim light, empty street through the window"
        }
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-16 md:bottom-20 px-6 md:px-12 flex flex-wrap gap-2.5 md:gap-3 justify-center">
        {STATS.map((s) => (
          <span
            key={s.channel}
            className={`label rounded-full px-4 py-2.5 border ${
              winning
                ? "bg-signal border-signal text-white"
                : "bg-ink/70 border-fog-light text-paper/50"
            }`}
          >
            {s.channel} — {winning ? s.good : s.bad}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="bg-ink text-paper">
      <div className="px-6 md:px-12 pt-24 md:pt-32 pb-10 md:pb-14">
        <p className="label text-signal-soft mb-8">The shift I deliver</p>
        <HlTitle as="h2" className="display text-4xl md:text-6xl max-w-[22ch]">
          Same business. <Hl>Every channel, moved</Hl> — keep scrolling.
        </HlTitle>
      </div>
      <CompareSwap
        before={<SceneLayer winning={false} />}
        after={<SceneLayer winning={true} />}
        beforeLabel="Before — great business, invisible"
        afterLabel="After — found, chosen, busy"
      />
    </section>
  );
}
