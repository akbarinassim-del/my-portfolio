"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/config/site";

/** A poster-first, one-shot portrait. Media state stays outside React's render loop. */
export function HeroPortrait({ label, playLabel }: { label: string; playLabel: string }) {
  const button = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const poster = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const control = button.current;
    const media = video.current;
    const still = poster.current;
    if (!control || !media || !still) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    let phase = "idle";
    let disposed = false;
    let failed = false;
    let alphaVerified = false;
    let pointerType = "";
    let attempt = 0;
    let pending: AbortController | undefined;
    let returnTimer = 0;
    let frameTimer = 0;
    let videoFrame = 0;
    let animationFrame = 0;

    function state(value: string) {
      phase = value;
      control!.dataset.state = value;
    }

    function reset(immediate = false) {
      attempt++;
      pending?.abort();
      pending = undefined;
      window.clearTimeout(returnTimer);
      window.clearTimeout(frameTimer);
      if (videoFrame) media!.cancelVideoFrameCallback?.(videoFrame);
      cancelAnimationFrame(animationFrame);
      videoFrame = 0;
      media!.pause();
      const settle = () => {
        // The poster covers seeking, including browsers that briefly clear the video.
        try { media!.currentTime = 0; } catch { /* Metadata may not be available yet. */ }
        state(failed ? "fallback" : "idle");
      };
      if (!immediate && phase === "playing" && !preference.matches) {
        state("returning");
        returnTimer = window.setTimeout(settle, 180);
      } else {
        settle();
      }
    }

    function fallback() {
      if (failed || disposed) return;
      failed = true;
      reset(true);
      control!.disabled = true;
      control!.setAttribute("aria-label", label);
      // Never expose a decoder that loses alpha. The original PNG is the fallback.
      still!.src = site.portrait.src;
      media!.removeAttribute("src");
      media!.load();
    }

    function ready(signal: AbortSignal) {
      return new Promise<void>((resolve, reject) => {
        let timeout = 0;
        const cleanup = () => {
          window.clearTimeout(timeout);
          media!.removeEventListener("loadeddata", check);
          media!.removeEventListener("seeked", check);
          media!.removeEventListener("canplay", check);
          media!.removeEventListener("error", error);
          signal.removeEventListener("abort", abort);
        };
        const check = () => {
          if (media!.readyState < 2 || media!.seeking) return;
          cleanup();
          resolve();
        };
        const error = () => { cleanup(); reject(new Error("Portrait frame unavailable")); };
        const abort = () => { cleanup(); reject(new DOMException("Portrait cancelled", "AbortError")); };
        media!.addEventListener("loadeddata", check);
        media!.addEventListener("seeked", check);
        media!.addEventListener("canplay", check);
        media!.addEventListener("error", error);
        signal.addEventListener("abort", abort, { once: true });
        timeout = window.setTimeout(error, 10000);
        if (signal.aborted) abort();
        else if (media!.error) error();
        else check();
      });
    }

    function hasTransparentFrame() {
      if (media!.videoWidth !== 1280 || media!.videoHeight !== 720) return false;
      const sample = document.createElement("canvas");
      sample.width = 4;
      sample.height = 1;
      const context = sample.getContext("2d", { willReadFrequently: true });
      if (!context) return false;
      // These three background pixels and one opaque subject pixel were verified
      // against the source's first RGBA frame. Codec support alone is insufficient.
      [[20, 360], [1260, 360], [640, 5], [640, 360]].forEach(([x, y], index) => {
        context.drawImage(media!, x, y, 1, 1, index, 0, 1, 1);
      });
      const rgba = context.getImageData(0, 0, 4, 1).data;
      return rgba[3] < 16 && rgba[7] < 16 && rgba[11] < 16 && rgba[15] > 240;
    }

    async function play() {
      if (disposed || failed || preference.matches || document.hidden || phase === "playing" || phase === "loading") return;
      reset(true);
      const currentAttempt = ++attempt;
      const controller = new AbortController();
      pending = controller;
      state("loading");
      try {
        if (!media!.getAttribute("src")) {
          // Initial load needs only the poster; fetch the video on first interaction.
          media!.preload = "auto";
          media!.src = site.portrait.video.src;
          media!.load();
        }
        await ready(controller.signal);
        if (media!.currentTime > .001 || media!.seeking) {
          media!.currentTime = 0;
          await ready(controller.signal);
        }
        if (currentAttempt !== attempt || disposed) return;
        if (!alphaVerified) {
          if (!hasTransparentFrame()) { fallback(); return; }
          alphaVerified = true;
        }
        media!.muted = true;
        await media!.play();
        if (currentAttempt !== attempt || disposed) return;
        const reveal = () => {
          if (currentAttempt !== attempt || disposed) return;
          window.clearTimeout(frameTimer);
          state("playing");
        };
        // Reveal a painted frame, never an empty/black decoding surface.
        frameTimer = window.setTimeout(fallback, 4000);
        if (typeof media!.requestVideoFrameCallback === "function") {
          videoFrame = media!.requestVideoFrameCallback(reveal);
        } else {
          animationFrame = requestAnimationFrame(() => {
            animationFrame = requestAnimationFrame(reveal);
          });
        }
      } catch {
        if (currentAttempt === attempt && !controller.signal.aborted && !disposed) fallback();
      }
    }

    const enter = (event: PointerEvent) => {
      pointerType = event.pointerType;
      if (event.pointerType === "mouse" && hover.matches) void play();
    };
    const leave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") reset();
    };
    const pointerDown = (event: PointerEvent) => { pointerType = event.pointerType; };
    const activate = (event: MouseEvent) => {
      // Native button activation supplies Enter/Space; mouse movement never restarts.
      if (event.detail === 0 || pointerType !== "mouse" || !hover.matches) void play();
    };
    const ended = () => reset();
    const blur = () => reset();
    const visibility = () => { if (document.hidden) reset(true); };
    const motion = () => {
      reset(true);
      control.disabled = preference.matches || failed;
      control.setAttribute("aria-label", control.disabled ? label : playLabel);
    };

    control.addEventListener("pointerenter", enter);
    control.addEventListener("pointerleave", leave);
    control.addEventListener("pointerdown", pointerDown);
    control.addEventListener("click", activate);
    control.addEventListener("blur", blur);
    media.addEventListener("ended", ended);
    media.addEventListener("error", fallback);
    still.addEventListener("error", fallback);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", motion);

    media.muted = true;
    if (!media.canPlayType('video/webm; codecs="vp9"') || (still.complete && still.naturalWidth === 0)) fallback();
    else motion();

    return () => {
      disposed = true;
      reset(true);
      control.removeEventListener("pointerenter", enter);
      control.removeEventListener("pointerleave", leave);
      control.removeEventListener("pointerdown", pointerDown);
      control.removeEventListener("click", activate);
      control.removeEventListener("blur", blur);
      media.removeEventListener("ended", ended);
      media.removeEventListener("error", fallback);
      still.removeEventListener("error", fallback);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", motion);
    };
  }, [label, playLabel]);

  return (
    <button ref={button} className="portrait-control" type="button" disabled aria-label={label} data-state="idle">
      <video ref={video} className="portrait-video" width={1280} height={720} muted playsInline preload="none" disablePictureInPicture aria-hidden="true" tabIndex={-1} />
      <Image ref={poster} className="portrait-image portrait-poster" src={site.portrait.video.poster} alt="" width={1280} height={720} unoptimized preload draggable={false} aria-hidden="true" />
    </button>
  );
}
