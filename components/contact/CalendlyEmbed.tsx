"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const CALENDLY_URL = "https://calendly.com/mattakumar";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Official Calendly inline embed, initialized via Calendly's JS API rather
 * than its passive `.calendly-inline-widget` auto-scan. The auto-scan only
 * runs once, when the widget script itself first loads — on a client-side
 * (SPA) navigation back to this page, the script is already loaded from an
 * earlier visit, `next/script`'s onLoad never fires again, and a
 * newly-mounted div would never get picked up (spins forever). Calling
 * `initInlineWidget` directly on every mount works regardless of whether
 * the script is loading for the first time or was already present.
 */
export default function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const initWidget = () => {
    const container = containerRef.current;
    if (!container || !window.Calendly) return;
    container.innerHTML = "";
    window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: container });
  };

  useEffect(() => {
    setReady(false);
    const container = containerRef.current;
    if (!container) return;

    // Attach the observer BEFORE calling initWidget() — when the script is
    // already loaded (revisiting this page in the same SPA session),
    // initInlineWidget() inserts the iframe synchronously, and a mutation
    // that happens before observe() is called is never reported.
    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe")) setReady(true);
    });
    observer.observe(container, { childList: true, subtree: true });

    if (window.Calendly) {
      initWidget();
    }
    if (container.querySelector("iframe")) setReady(true);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[680px] sm:h-[720px] md:h-[700px]">
      {!ready && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-paper"
        >
          <span className="w-8 h-8 rounded-full border-2 border-fog border-t-signal animate-spin" />
          <p className="label text-smoke-light">Loading calendar…</p>
        </div>
      )}
      <div
        ref={containerRef}
        className={`w-full h-full transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ minWidth: 320 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initWidget}
      />
    </div>
  );
}
