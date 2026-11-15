"use client";

import { useEffect, useRef } from "react";

const trailCount = 7;
const pointCount = 86;
const frameInterval = 1000 / 24;

/** One bounded background: evolving incense-like trails, independent of scrolling. */
export function Atmosphere() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = host.current;
    const surface = canvas.current;
    const context = surface?.getContext("2d", { alpha: true });
    if (!element || !surface || !context) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points = Array.from({ length: trailCount }, () => new Float32Array(pointCount * 2));
    const outline = new Float32Array(pointCount * 4);
    let ink: CanvasGradient;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastPaint = -Infinity;
    let elapsed = 11000;
    let previousTime: number | undefined;
    let disposed = false;

    const paint = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const time = elapsed / 1000;
      for (let trail = 0; trail < trailCount; trail++) {
        const phase = trail * 2.39996;
        const age = ((time / (38 + trail * 2.7)) + trail / trailCount) % 1;
        // Independently fading lifetimes conceal resets without a global pulse.
        const presence = Math.pow(Math.sin(age * Math.PI), .7);
        const origin = width * ((trail + .4) / trailCount);
        const amplitude = Math.min(width * .12, 120);
        const curl = .42 + Math.sin(time * .08 + phase) * .16;
        const coordinates = points[trail];
        for (let point = 0; point < pointCount; point++) {
          const along = point / (pointCount - 1);
          const bend = Math.exp(-Math.pow((along - curl) / .18, 2));
          const angle = along * 27 - time * .17 + phase;
          coordinates[point * 2] = origin
            + Math.sin(along * 7 - time * .12 + phase) * amplitude
            + Math.sin(along * 13 + time * .09 + phase) * amplitude * .24
            + Math.cos(angle) * Math.min(width * .075, 72) * bend;
          coordinates[point * 2 + 1] = height * (1.3 - along * 1.65 - age * .22)
            + Math.sin(angle) * height * .075 * bend;
        }

        context.fillStyle = ink;
        // Tapered translucent ribbons widen, curl, and unravel locally. There is
        // no bright central line, uniform-width tube, animated blur, or noise filter.
        for (const [spread, opacity] of [[3.1, .019], [1.9, .033], [1, .055], [.45, .035]]) {
          for (let point = 0; point < pointCount; point++) {
            const along = point / (pointCount - 1);
            const before = Math.max(0, point - 1) * 2;
            const after = Math.min(pointCount - 1, point + 1) * 2;
            const dx = coordinates[after] - coordinates[before];
            const dy = coordinates[after + 1] - coordinates[before + 1];
            const length = Math.hypot(dx, dy) || 1;
            const taper = Math.pow(Math.sin(along * Math.PI), .7);
            const thickness = (1.5 + 4.5 * (1 + Math.sin(along * 12 - time * .19 + phase))) * taper * spread;
            outline[point * 4] = coordinates[point * 2] - dy / length * thickness;
            outline[point * 4 + 1] = coordinates[point * 2 + 1] + dx / length * thickness;
            outline[point * 4 + 2] = coordinates[point * 2] + dy / length * thickness;
            outline[point * 4 + 3] = coordinates[point * 2 + 1] - dx / length * thickness;
          }
          context.beginPath();
          context.moveTo(outline[0], outline[1]);
          for (let point = 1; point < pointCount - 1; point++) {
            const index = point * 4;
            context.quadraticCurveTo(outline[index], outline[index + 1],
              (outline[index] + outline[index + 4]) / 2,
              (outline[index + 1] + outline[index + 5]) / 2);
          }
          context.lineTo(outline[pointCount * 4 - 2], outline[pointCount * 4 - 1]);
          for (let point = pointCount - 2; point > 0; point--) {
            const index = point * 4 + 2;
            context.quadraticCurveTo(outline[index], outline[index + 1],
              (outline[index] + outline[index - 4]) / 2,
              (outline[index + 1] + outline[index - 3]) / 2);
          }
          context.closePath();
          context.globalAlpha = opacity * presence;
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const tick = (now: number) => {
      if (disposed || preference.matches || document.hidden) return;
      if (previousTime !== undefined) elapsed += Math.min(now - previousTime, 100);
      previousTime = now;
      if (now - lastPaint >= frameInterval) {
        paint();
        lastPaint = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      previousTime = undefined;
      paint();
      if (!preference.matches && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const box = element.getBoundingClientRect();
      width = box.width;
      height = box.height;
      // A small fixed viewport buffer; never allocate a page-height canvas or high-DPI bitmap.
      const scale = Math.min(.8, 960 / Math.max(width, 1), 800 / Math.max(height, 1));
      surface.width = Math.max(1, Math.round(width * scale));
      surface.height = Math.max(1, Math.round(height * scale));
      context.setTransform(surface.width / Math.max(width, 1), 0, 0, surface.height / Math.max(height, 1), 0, 0);
      ink = context.createLinearGradient(0, height, 0, 0);
      ink.addColorStop(0, "rgba(151, 161, 154, 0)");
      ink.addColorStop(.18, "rgba(151, 161, 154, .65)");
      ink.addColorStop(.52, "rgba(151, 161, 154, 1)");
      ink.addColorStop(.85, "rgba(151, 161, 154, .5)");
      ink.addColorStop(1, "rgba(151, 161, 154, 0)");
      paint();
    };
    resize();
    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(element);
    if (!resizeObserver) window.addEventListener("resize", resize);

    const densities = new Map<Element, number>();
    const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
      entries.forEach(entry => densities.set(entry.target, entry.intersectionRect.height));
      let active: Element | undefined;
      let largest = 0;
      densities.forEach((score, section) => {
        if (score > largest) { largest = score; active = section; }
      });
      if (!active) return;
      element.dataset.density = active.classList.contains("hero") ? "hero"
        : ["work", "about"].includes(active.id) ? "soft"
        : ["services", "experience", "education"].includes(active.id) ? "quiet" : "gentle";
    }, { rootMargin: "-20% 0px -45% 0px", threshold: [0, .01, .1, .25, .5, .75, 1] }) : null;
    document.querySelectorAll("main > section, .footer").forEach(section => observer?.observe(section));
    preference.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    start();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      preference.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return <div ref={host} className="atmosphere" data-density="hero" aria-hidden="true"><canvas ref={canvas} /></div>;
}
