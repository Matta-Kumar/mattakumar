"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.body.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
    gsap.set(ring, { width: 40, height: 40 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    let lastX = -100;
    let lastY = -100;

    // The ring is resized via width/height (never transform scale) so the
    // label text stays on the type grid and renders crisp.
    const applyHover = (target: HTMLElement | null) => {
      if (target) {
        const text = target.getAttribute("data-cursor") ?? "";
        if (text) {
          label.textContent = text;
          label.style.opacity = "1";
          ring.style.mixBlendMode = "normal";
          gsap.to(ring, {
            width: 92,
            height: 92,
            scale: 1,
            backgroundColor: "#ffffff",
            borderColor: "rgba(11, 10, 20, 0.14)",
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 0, duration: 0.35 });
        } else {
          label.style.opacity = "0";
          ring.style.mixBlendMode = "difference";
          gsap.to(ring, {
            width: 64,
            height: 64,
            scale: 1,
            backgroundColor: "transparent",
            borderColor: "#ffffff",
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 0.5, duration: 0.35 });
        }
      } else {
        label.style.opacity = "0";
        ring.style.mixBlendMode = "difference";
        gsap.to(ring, {
          width: 40,
          height: 40,
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "#ffffff",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.35 });
      }
    };

    const matchTarget = (el: Element | null) =>
      (el?.closest("a, button, [data-cursor]") as HTMLElement | null) ?? null;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      applyHover(matchTarget(e.target as HTMLElement));
    };

    // While the page scrolls under a stationary mouse, mouseover never fires —
    // re-check what's under the pointer so hover affordances stay live.
    let scrollRaf = 0;
    const onScroll = () => {
      if (!visible || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        applyHover(matchTarget(document.elementFromPoint(lastX, lastY)));
      });
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
