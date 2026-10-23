"use client";

import { useEffect } from "react";

/** Progressive enhancement: content stays visible without JS or with reduced motion. */
export function SectionMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.reveal = "visible";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= window.innerHeight + 24) return;
      section.dataset.reveal = "pending";
      observer.observe(section);
    });
    const revealAll = () => {
      observer.disconnect();
      sections.forEach(section => { delete section.dataset.reveal; });
    };
    preference.addEventListener("change", revealAll);
    return () => {
      revealAll();
      preference.removeEventListener("change", revealAll);
    };
  }, []);
  return null;
}
