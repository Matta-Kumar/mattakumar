"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Hl } from "@/components/anim/Highlight";
import Magnetic from "@/components/anim/Magnetic";
import { PLATFORM_LOGOS } from "./PlatformLogos";

const HERO_PLATFORM_NAMES = [
  "AI Overviews",
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Claude",
  "Copilot",
  "Bing",
  "Grok",
  "Meta",
];

export default function Hero() {
  const textRef           = useRef<HTMLDivElement>(null);
  const satishRef         = useRef<HTMLDivElement>(null);
  const platformScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text           = textRef.current;
    const satish         = satishRef.current;
    const platformScroll = platformScrollRef.current;

    if (!text || !satish) return;

    let platformTween: gsap.core.Tween | null = null;
    if (platformScroll) {
      const distance = platformScroll.scrollHeight / 2;
      if (distance > 16) {
        gsap.set(platformScroll, { y: 0 });
        platformTween = gsap.to(platformScroll, {
          y: -distance,
          duration: 14,
          ease: "none",
          repeat: -1,
        });
      }
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(satish, { autoAlpha: 1 });
      return () => {
        platformTween?.kill();
      };
    }

    const satishEntrance = gsap.fromTo(
      satish,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 1.1, delay: 0.2, ease: "power2.out" }
    );

    const overs = Array.from(text.querySelectorAll<HTMLElement>(".hl-over"));
    gsap.set(overs, { clipPath: "inset(0 100% 0 0)" });
    if (overs.length) {
      gsap.to(overs, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.85,
        delay: 1.0,
        ease: "power4.inOut",
        stagger: 0.18,
      });
    }

    return () => {
      satishEntrance.kill();
      platformTween?.kill();
    };
  }, []);

  return (
    <section className="relative h-svh overflow-hidden flex flex-col bg-paper text-ink">
      <div className="flex flex-col md:flex-row items-center justify-between pt-24 min-h-0 w-full flex-1">

        {/* Left — text column */}
        <div className="flex flex-col justify-center relative z-40 w-full md:w-2/5 px-6 md:px-12 lg:px-24">
          <div ref={textRef}>
            <h1 className="display text-[clamp(2.5rem,4.5vw,5rem)] max-w-[12ch] leading-[1.07]">
              I&apos;ve been there for every <Hl>generation of search.</Hl>
            </h1>
            <p className="mt-5 text-[clamp(14px,1.1vw,17px)] text-smoke leading-relaxed max-w-[28ch]">
              Since 2003, Satish Kumar Matta has ranked pages, survived every algorithm update,
              and is now optimising for AI.
            </p>
            <div className="mt-8">
              <Magnetic>
                <a
                  href="https://calendly.com/mattakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sweep inline-block bg-ink text-paper text-sm font-medium px-7 py-4 rounded-full"
                >
                  <span>Book a call</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Right — Satish portrait + platform logo panel */}
        <div className="flex flex-row items-center justify-center md:justify-end w-full md:w-3/5 gap-3 h-full">
          <div
            ref={satishRef}
            className="relative z-30 shrink-0 pointer-events-none w-3/5 md:w-2/5 item-center justify-center flex flex-col self-start md:self-center md:pt-0"
            style={{ opacity: 0 }}
          >
            <img
              src="/satish/short-portrait.png"
              alt="Satish Kumar Matta"
              className="pointer-events-none h-max w-full object-contain"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 98%)",
                maskImage: "linear-gradient(to bottom, black 82%, transparent 98%)",
              }}
            />
          </div>

          <div className="absolute md:relative right-0 bottom-10 md:bottom-0 z-10 shrink-0 self-start md:self-center md:pt-0 w-1/3">
            <div className="h-[64vh] md:h-[85vh] overflow-hidden">
              <div ref={platformScrollRef} className="flex flex-col items-center gap-4 md:gap-10 py-4">
                {[...HERO_PLATFORM_NAMES, ...HERO_PLATFORM_NAMES].map((platform, index) => {
                  const Logo = PLATFORM_LOGOS[platform];
                  return (
                    <div key={`${platform}-${index}`} className="flex w-full justify-center">
                      <div className="flex h-10 w-10 md:h-28 md:w-28 items-center justify-center shrink-0">
                        <Logo className={"h-full w-full"} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 items-center gap-2 label text-smoke-light">
        Scroll
        <span className="inline-block animate-bounce text-sm leading-none" aria-hidden="true">&#8595;</span>
      </div>
    </section>
  );
}
