"use client";

import { useEffect } from "react";

const targets = [
  ".section-heading",
  ".project-card",
  ".service-card",
  ".timeline-entry",
  ".credential-card",
  ".recommendation-card",
  "#contact > h2",
  "#contact > .contact-description",
  "#contact > .contact-details",
].join(", ");

/** One-time compositor-only reveals. Content never depends on JS to become visible. */
export function SectionMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(targets));
    const active = new Map<HTMLElement, Animation>();
    const delays = new Map<HTMLElement, number>();
    document.querySelectorAll(".projects-grid, .services-grid, .timeline, .credentials-grid").forEach(group => {
      Array.from(group.children).forEach((element, index) => {
        delays.set(element as HTMLElement, Math.min(index, 2) * 60);
      });
    });

    const finish = (element: HTMLElement) => {
      const animation = active.get(element);
      active.delete(element);
      animation?.cancel();
      element.dataset.scrollMotion = "revealed";
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (typeof element.animate !== "function" || element.contains(document.activeElement)) {
          finish(element);
          return;
        }
        try {
          const distance = element.matches(".section-heading") ? 16 : 18;
          const animation = element.animate([
            { opacity: 0, transform: `translateY(${distance}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ], {
            duration: 560,
            delay: delays.get(element) ?? 0,
            easing: "cubic-bezier(.2, .65, .3, 1)",
            fill: "backwards",
          });
          active.set(element, animation);
          element.dataset.scrollMotion = "animating";
          animation.finished.then(() => {
            if (active.get(element) !== animation) return;
            active.delete(element);
            element.dataset.scrollMotion = "revealed";
          }, () => { /* Cancellation leaves the underlying visible styles intact. */ });
        } catch {
          finish(element);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px 24px 0px" });

    elements.forEach(element => {
      // Never flash or animate content already visible on initial load/restoration.
      if (element.getBoundingClientRect().top <= window.innerHeight + 24) return;
      element.dataset.scrollMotion = "ready";
      observer.observe(element);
    });

    const revealAll = () => {
      observer.disconnect();
      elements.forEach(finish);
    };
    const onFocus = (event: FocusEvent) => {
      active.forEach((_, element) => {
        if (event.target instanceof Node && element.contains(event.target)) finish(element);
      });
    };
    preference.addEventListener("change", revealAll);
    document.addEventListener("focusin", onFocus);
    return () => {
      revealAll();
      elements.forEach(element => { delete element.dataset.scrollMotion; });
      preference.removeEventListener("change", revealAll);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
