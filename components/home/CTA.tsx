"use client";

import { useState } from "react";
import HlTitle, { Hl } from "@/components/anim/Highlight";
import FadeUp from "@/components/anim/FadeUp";
import Magnetic from "@/components/anim/Magnetic";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="bg-ink text-paper px-6 md:px-12 py-32 md:py-44">
      <div className="max-w-6xl mx-auto">
        <HlTitle
          as="h2"
          className="display text-5xl md:text-[5.2rem] mb-20 md:mb-28 max-w-[16ch]"
        >
          Let’s make you <Hl>the answer</Hl>.
        </HlTitle>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <FadeUp>
            <p className="label text-signal-soft mb-6">Ready now</p>
            <p className="text-[15px] leading-[1.7] text-paper/60 max-w-[40ch] mb-10">
              Thirty minutes on your growth problem. Bring your domain — leave
              with a direction.
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

          <FadeUp delay={0.15}>
            <p className="label text-signal-soft mb-6">Still researching</p>
            <p className="text-[15px] leading-[1.7] text-paper/60 max-w-[40ch] mb-10">
              One email when it matters — what changed in search and AI
              discovery, and what to do about it.
            </p>
            {done ? (
              <p className="text-lg text-signal-soft">You’re in — check your inbox.</p>
            ) : (
              <form
                className="flex border-b border-fog-light focus-within:border-signal-soft transition-colors duration-300 max-w-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setDone(true);
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent py-4 text-[15px] placeholder:text-paper/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-sm font-medium text-signal-soft px-2 hover:text-paper transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
