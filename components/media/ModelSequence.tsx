"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed 3D-model frame sequence (turntable of Satish).
 *
 * Production: render/generate an 8s turntable clip of the model rotating at
 * constant speed, export ~96 frames (`ffmpeg -i model.mp4 -vf "fps=12,scale=1080:-1"
 * public/model/f-%03d.jpg`), then pass framePath="/model/f-{i}.jpg".
 *
 * Until real frames exist, a rotating wireframe bust placeholder is drawn —
 * same motion, same scrub feel.
 */
type Props = {
  framePath?: string;
  frameCount?: number;
  trigger: React.RefObject<HTMLElement | null>;
  className?: string;
};

export default function ModelSequence({ framePath, frameCount = 96, trigger, className }: Props) {
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
      // Freestanding human silhouette on a turntable — rotates with scroll.
      render = (p) => {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const rot = p * Math.PI * 3;
        const sway = Math.sin(rot);
        const cx = w / 2 + sway * w * 0.012;
        const R = Math.min(w, h) * 0.15;
        const headY = h * 0.3;
        const headRx = R * (0.88 + 0.12 * Math.abs(Math.cos(rot)));
        const neckTop = headY + R * 0.78;
        const shoulderY = headY + R * 1.85;
        const bustBottom = h * 0.82;
        const shoulderW = R * 2.1 * (0.92 + 0.08 * Math.abs(Math.cos(rot)));

        // ground shadow
        ctx.fillStyle = "rgba(11,10,20,0.08)";
        ctx.beginPath();
        ctx.ellipse(w / 2, h * 0.87, R * 2.5, R * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // bust silhouette
        ctx.fillStyle = "#1a1726";
        ctx.beginPath();
        ctx.ellipse(cx, headY, headRx, R * 1.06, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx - R * 0.36, neckTop);
        ctx.lineTo(cx - R * 0.4, shoulderY - R * 0.55);
        ctx.bezierCurveTo(
          cx - R * 1.5, shoulderY - R * 0.35,
          cx - shoulderW, shoulderY + R * 0.4,
          cx - shoulderW, bustBottom
        );
        ctx.lineTo(cx + shoulderW, bustBottom);
        ctx.bezierCurveTo(
          cx + shoulderW, shoulderY + R * 0.4,
          cx + R * 1.5, shoulderY - R * 0.35,
          cx + R * 0.4, shoulderY - R * 0.55
        );
        ctx.lineTo(cx + R * 0.36, neckTop);
        ctx.closePath();
        ctx.fill();

        // violet rim light on the lit side
        ctx.strokeStyle = "rgba(91,61,245,0.85)";
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.ellipse(cx, headY, headRx, R * 1.06, 0, -0.95, 0.65);
        ctx.stroke();
        ctx.strokeStyle = "rgba(91,61,245,0.45)";
        ctx.beginPath();
        ctx.moveTo(cx + R * 0.42, shoulderY - R * 0.5);
        ctx.bezierCurveTo(
          cx + R * 1.45, shoulderY - R * 0.3,
          cx + shoulderW * 0.98, shoulderY + R * 0.45,
          cx + shoulderW * 0.98, bustBottom - R * 0.2
        );
        ctx.stroke();

        // turntable rotation cue
        ctx.strokeStyle = "#5b3df5";
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.ellipse(
          w / 2, h * 0.87, R * 2.5, R * 0.3, 0,
          rot % (Math.PI * 2),
          (rot % (Math.PI * 2)) + 0.8
        );
        ctx.stroke();

        ctx.fillStyle = "rgba(11,10,20,0.28)";
        ctx.font = `${10 * dpr}px Switzer, sans-serif`;
        ctx.fillText(
          `3D MODEL PLACEHOLDER — FRAME ${String(Math.floor(p * (frameCount - 1)) + 1).padStart(3, "0")} / ${String(frameCount).padStart(3, "0")}`,
          14 * dpr,
          h - 12 * dpr
        );
      };
    }

    if (reduced) {
      render(1);
      return () => window.removeEventListener("resize", resize);
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
  }, [framePath, frameCount, trigger]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
