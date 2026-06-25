"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed video as a canvas frame sequence (Apple AirPods technique).
 *
 * Production: export the 5–8s hero clip as ~96 JPEG frames
 * (e.g. `ffmpeg -i hero.mp4 -vf "fps=12,scale=1920:-1" frames/f-%03d.jpg`),
 * drop them in /public/frames and pass framePath="/frames/f-{i}.jpg" frameCount={96}.
 *
 * Until real frames exist, a procedural placeholder scene is drawn instead:
 * a dark horizon grid with a growth line that ascends as the user scrolls.
 */
type Props = {
  framePath?: string;
  frameCount?: number;
  trigger: React.RefObject<HTMLElement | null>;
  className?: string;
  theme?: "dark" | "light";
};

export default function ScrollVideo({
  framePath,
  frameCount = 96,
  trigger,
  className,
  theme = "dark",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const triggerEl = trigger.current;
    if (!canvas || !triggerEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    let frames: HTMLImageElement[] = [];
    let render: (progress: number) => void;

    if (framePath) {
      frames = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = framePath.replace("{i}", String(i + 1).padStart(3, "0"));
        return img;
      });
      render = (p) => {
        const idx = Math.min(frameCount - 1, Math.floor(p * frameCount));
        const img = frames[idx];
        if (!img?.complete) return;
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / img.width, ch / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      };
    } else {
      // Placeholder concept — "every channel, one engine": scattered channel
      // cards (search, AI answer, social, ad, product, email) glide into an
      // orbit around a glowing brand core as the user scrolls.
      const light = theme === "light";
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const CARDS = [
        { cw: 0.2, ch: 0.05, sx: 0.1, sy: 0.14, rot: -0.12, angle: -2.6, hot: false },
        { cw: 0.15, ch: 0.11, sx: 0.9, sy: 0.13, rot: 0.1, angle: -0.5, hot: true },
        { cw: 0.065, ch: 0.13, sx: 0.06, sy: 0.78, rot: 0.14, angle: 2.6, hot: false },
        { cw: 0.1, ch: 0.085, sx: 0.93, sy: 0.8, rot: -0.1, angle: 0.5, hot: false },
        { cw: 0.12, ch: 0.09, sx: 0.32, sy: 1.0, rot: 0.08, angle: 1.57, hot: false },
        { cw: 0.11, ch: 0.055, sx: 0.62, sy: 0.0, rot: -0.08, angle: -1.57, hot: false },
      ];

      render = (p) => {
        const w = canvas.width;
        const h = canvas.height;
        ctx.fillStyle = light ? "#ffffff" : "#0b0a14";
        ctx.fillRect(0, 0, w, h);

        // faint dot grid
        ctx.fillStyle = light ? "rgba(11,10,20,0.05)" : "rgba(255,255,255,0.06)";
        const gap = Math.max(40 * dpr, w / 28);
        for (let gx = gap / 2; gx < w; gx += gap) {
          for (let gy = gap / 2; gy < h; gy += gap) {
            ctx.beginPath();
            ctx.arc(gx, gy, 1 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        const cx = w * 0.5;
        const cy = h * 0.54;
        const rx = w * 0.21;
        const ry = h * 0.2;

        // brand core
        const coreR = (5 + 5 * p) * dpr;
        ctx.fillStyle = "#5b3df5";
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(91,61,245,${0.25 + 0.3 * p})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR + 8 * dpr * p, 0, Math.PI * 2);
        ctx.stroke();

        CARDS.forEach((c, i) => {
          const tp = easeOut(Math.min(1, Math.max(0, (p - i * 0.05) / 0.75)));
          const ex = cx + Math.cos(c.angle) * rx;
          const ey = cy + Math.sin(c.angle) * ry;
          const x = (c.sx * w) + (ex - c.sx * w) * tp;
          const y = (c.sy * h) + (ey - c.sy * h) * tp;
          const rot = c.rot * (1 - tp);
          const cardW = c.cw * w;
          const cardH = c.ch * h;
          const alpha = 0.35 + 0.65 * tp;

          // connector to core once settled
          if (tp > 0.85) {
            ctx.strokeStyle = `rgba(91,61,245,${(tp - 0.85) * 2.2})`;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
          }

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rot);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = light ? "#ffffff" : "#15131f";
          ctx.strokeStyle = c.hot
            ? "#5b3df5"
            : light
              ? "rgba(11,10,20,0.16)"
              : "rgba(255,255,255,0.16)";
          ctx.lineWidth = (c.hot ? 2 : 1.25) * dpr;
          ctx.beginPath();
          ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 8 * dpr);
          if (light) {
            ctx.shadowColor = "rgba(11,10,20,0.07)";
            ctx.shadowBlur = 14 * dpr;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.stroke();

          // abstract UI lines inside the card
          ctx.fillStyle = light ? "rgba(11,10,20,0.14)" : "rgba(255,255,255,0.2)";
          const pad = Math.min(cardW, cardH) * 0.18;
          const lineH = Math.max(2 * dpr, cardH * 0.07);
          for (let li = 0; li < 3; li++) {
            const ly = -cardH / 2 + pad + li * lineH * 2.2;
            if (ly + lineH > cardH / 2 - pad) break;
            const lw = (cardW - pad * 2) * (li === 0 ? 0.9 : 0.55 + 0.2 * li);
            ctx.fillRect(-cardW / 2 + pad, ly, lw, lineH);
          }
          if (c.hot) {
            ctx.fillStyle = "#5b3df5";
            ctx.beginPath();
            ctx.arc(cardW / 2 - pad, cardH / 2 - pad, 2.5 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          ctx.restore();
        });

        ctx.fillStyle = light ? "rgba(11,10,20,0.3)" : "rgba(255,255,255,0.35)";
        ctx.font = `${10 * dpr}px Switzer, sans-serif`;
        ctx.fillText(
          `PLACEHOLDER SEQUENCE — FRAME ${String(Math.floor(p * 95) + 1).padStart(3, "0")} / 096`,
          16 * dpr,
          h - 16 * dpr
        );
      };
    }

    if (reduced) {
      render(1);
      window.removeEventListener("resize", resize);
      return;
    }

    const state = { p: 0 };
    render(0);

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        state.p = self.progress;
        render(state.p);
      },
      onRefresh: () => render(state.p),
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, [framePath, frameCount, trigger, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
