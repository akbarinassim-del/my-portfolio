"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/config/site";

type Direction = "forward" | "reverse";
type Endpoint = "first" | "last";
type Phase = "idle" | "loading" | "playing" | "paused" | "finishing" | "fallback";

/** Alternates two real encodings; pointer exit never changes playback or the held pose. */
export function HeroPortrait({ label, playLabel, reverseLabel }: {
  label: string; playLabel: string; reverseLabel: string;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const forward = useRef<HTMLVideoElement>(null);
  const reverse = useRef<HTMLVideoElement>(null);
  const poster = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!button.current || !poster.current || !forward.current || !reverse.current) return;
    const control = button.current;
    const still = poster.current;
    const clips = { forward: forward.current, reverse: reverse.current };
    const sources = { forward: site.portrait.video.src, reverse: site.portrait.video.reverseSrc };
    const stills = { first: site.portrait.video.poster, last: site.portrait.video.lastPoster };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const verified = new Set<HTMLVideoElement>();
    const posterLoads = new Map<string, Promise<void>>();
    let endpoint: Endpoint = "first";
    let active: Direction | null = null;
    let phase: Phase = "idle";
    let disposed = false;
    let failed = false;
    let completed = 0;
    let prepared = false;
    let pointerType = "";
    let attempt = 0;
    let playback = 0;
    let pending: AbortController | undefined;
    let frameTimer = 0;
    let videoFrame = 0;
    let frameMedia: HTMLVideoElement | undefined;
    let animationFrame = 0;

    const allowed = () => !disposed && !failed && !preference.matches && !document.hidden;
    const destination = (direction: Direction): Endpoint => direction === "forward" ? "last" : "first";
    const state = (value: Phase) => {
      phase = value;
      control.dataset.state = value;
      control.setAttribute("aria-busy", active ? "true" : "false");
    };
    const updateLabel = () => {
      control.disabled = failed || preference.matches;
      control.setAttribute("aria-label", control.disabled ? label : endpoint === "first" ? playLabel : reverseLabel);
    };
    const cancelFrameWait = () => {
      window.clearTimeout(frameTimer);
      if (videoFrame) frameMedia?.cancelVideoFrameCallback?.(videoFrame);
      cancelAnimationFrame(animationFrame);
      videoFrame = 0;
      frameMedia = undefined;
    };

    function fallback() {
      if (failed || disposed) return;
      failed = true;
      attempt++;
      playback++;
      pending?.abort();
      cancelFrameWait();
      active = null;
      Object.values(clips).forEach(media => media.pause());
      // A failed reverse attempt must keep a successfully held destination pose.
      const keepEndpoint = completed > 0 && still!.complete && still!.naturalWidth > 0
        && still!.getAttribute("src") === stills[endpoint];
      if (!keepEndpoint) {
        control!.dataset.fallback = "original";
        still!.src = site.portrait.src;
      }
      state("fallback");
      updateLabel();
      Object.values(clips).forEach(media => { media.removeAttribute("src"); media.load(); });
    }

    function ready(media: HTMLVideoElement, signal: AbortSignal) {
      return new Promise<void>((resolve, reject) => {
        let timeout = 0;
        const cleanup = () => {
          window.clearTimeout(timeout);
          ["loadeddata", "seeked", "canplay"].forEach(event => media.removeEventListener(event, check));
          media.removeEventListener("error", error);
          signal.removeEventListener("abort", abort);
        };
        const check = () => {
          if (media.readyState < 2 || media.seeking) return;
          cleanup(); resolve();
        };
        const error = () => { cleanup(); reject(new Error("Portrait frame unavailable")); };
        const abort = () => { cleanup(); reject(new DOMException("Portrait cancelled", "AbortError")); };
        ["loadeddata", "seeked", "canplay"].forEach(event => media.addEventListener(event, check));
        media.addEventListener("error", error);
        signal.addEventListener("abort", abort, { once: true });
        const expire = () => {
          if (document.hidden || preference.matches) timeout = window.setTimeout(expire, 1000);
          else error();
        };
        timeout = window.setTimeout(expire, 15000);
        if (signal.aborted) abort();
        else if (media.error) error();
        else check();
      });
    }

    function preparePoster(src: string) {
      let loading = posterLoads.get(src);
      if (!loading) {
        const image = document.createElement("img");
        image.src = src;
        loading = image.decode();
        posterLoads.set(src, loading);
      }
      return loading;
    }

    function hasTransparentFrame(media: HTMLVideoElement) {
      if (media.videoWidth !== 1280 || media.videoHeight !== 720) return false;
      const sample = document.createElement("canvas");
      sample.width = 4; sample.height = 1;
      const context = sample.getContext("2d", { willReadFrequently: true });
      if (!context) return false;
      // Verified background/subject pixels in BOTH clips' first decoded frames.
      [[20, 360], [1260, 360], [640, 5], [640, 360]].forEach(([x, y], index) => {
        context.drawImage(media, x, y, 1, 1, index, 0, 1, 1);
      });
      const rgba = context.getImageData(0, 0, 4, 1).data;
      return rgba[3] < 16 && rgba[7] < 16 && rgba[11] < 16 && rgba[15] > 240;
    }

    async function playActive() {
      if (!active || !allowed() || phase === "finishing") return;
      const direction = active;
      const media = clips[direction];
      const currentAttempt = attempt;
      const currentPlayback = ++playback;
      cancelFrameWait();
      try {
        media.muted = true;
        media.playbackRate = 1;
        await media.play();
        if (currentAttempt !== attempt || currentPlayback !== playback || disposed || active !== direction) return;
        if (!allowed()) { media.pause(); state("paused"); return; }
        const reveal = () => {
          if (currentAttempt !== attempt || currentPlayback !== playback || disposed || active !== direction || phase === "finishing") return;
          cancelFrameWait();
          if (allowed()) state("playing");
          else { media.pause(); state("paused"); }
        };
        frameTimer = window.setTimeout(fallback, 5000);
        if (typeof media.requestVideoFrameCallback === "function") {
          frameMedia = media;
          videoFrame = media.requestVideoFrameCallback(reveal);
        } else {
          animationFrame = requestAnimationFrame(() => { animationFrame = requestAnimationFrame(reveal); });
        }
      } catch {
        if (currentAttempt === attempt && currentPlayback === playback && allowed()) fallback();
      }
    }

    async function play() {
      if (!allowed() || active) return;
      const direction: Direction = endpoint === "first" ? "forward" : "reverse";
      const media = clips[direction];
      const currentAttempt = ++attempt;
      const controller = new AbortController();
      pending = controller;
      prepared = false;
      active = direction;
      control.dataset.direction = direction;
      Object.entries(clips).forEach(([name, clip]) => { clip.dataset.active = String(name === direction); });
      state("loading");
      try {
        if (!media.getAttribute("src")) {
          // Neither clip downloads initially; reverse loads only on first reverse activation.
          media.preload = "auto";
          media.src = sources[direction];
          media.load();
        }
        await Promise.all([ready(media, controller.signal), preparePoster(stills[destination(direction)])]);
        if (media.currentTime > .001 || media.seeking || media.ended) {
          media.currentTime = 0;
          await ready(media, controller.signal);
        }
        if (currentAttempt !== attempt || disposed) return;
        if (!verified.has(media)) {
          if (!hasTransparentFrame(media)) { fallback(); return; }
          verified.add(media);
        }
        prepared = true;
        if (allowed()) await playActive();
        else state("paused");
      } catch {
        if (currentAttempt === attempt && !controller.signal.aborted && !disposed) fallback();
      }
    }

    async function finish(direction: Direction) {
      const media = clips[direction];
      if (active !== direction || !media.ended || (phase !== "playing" && phase !== "paused")) return;
      const currentAttempt = attempt;
      const target = destination(direction);
      cancelFrameWait();
      media.pause();
      state("finishing");
      try {
        // The actual final video frame remains visible until its matching still is decoded.
        still.src = stills[target];
        await still.decode();
        if (currentAttempt !== attempt || disposed) return;
        endpoint = target;
        completed++;
        control.dataset.endpoint = target;
        active = null;
        state("idle");
        updateLabel();
      } catch { if (currentAttempt === attempt && !disposed) fallback(); }
    }

    const syncMotion = () => {
      updateLabel();
      if (!active || !prepared || phase === "finishing") return;
      if (!allowed()) {
        playback++;
        clips[active].pause();
        cancelFrameWait();
        state("paused");
      } else if (phase === "paused") {
        // Resume the same clip/time, never a fresh interaction or a reset pose.
        void playActive();
      }
    };
    const enter = (event: PointerEvent) => {
      pointerType = event.pointerType;
      if (event.pointerType === "mouse" && hover.matches) void play();
    };
    const pointerDown = (event: PointerEvent) => { pointerType = event.pointerType; };
    const activate = (event: MouseEvent) => {
      // Desktop clicks are not a second hover; taps and native keyboard clicks alternate.
      if (event.detail === 0 || pointerType !== "mouse" || !hover.matches) void play();
    };
    const keyDown = (event: KeyboardEvent) => {
      if (event.repeat && (event.key === "Enter" || event.key === " ")) event.preventDefault();
    };
    const forwardEnded = () => { void finish("forward"); };
    const reverseEnded = () => { void finish("reverse"); };

    control.addEventListener("pointerenter", enter);
    control.addEventListener("pointerdown", pointerDown);
    control.addEventListener("click", activate);
    control.addEventListener("keydown", keyDown);
    clips.forward.addEventListener("ended", forwardEnded);
    clips.reverse.addEventListener("ended", reverseEnded);
    Object.values(clips).forEach(media => { media.muted = true; media.addEventListener("error", fallback); });
    still.addEventListener("error", fallback);
    document.addEventListener("visibilitychange", syncMotion);
    preference.addEventListener("change", syncMotion);

    if (!clips.forward.canPlayType('video/webm; codecs="vp9"') || (still.complete && !still.naturalWidth)) fallback();
    else updateLabel();

    return () => {
      disposed = true;
      attempt++;
      playback++;
      pending?.abort();
      cancelFrameWait();
      Object.values(clips).forEach(media => { media.pause(); media.removeEventListener("error", fallback); });
      control.removeEventListener("pointerenter", enter);
      control.removeEventListener("pointerdown", pointerDown);
      control.removeEventListener("click", activate);
      control.removeEventListener("keydown", keyDown);
      clips.forward.removeEventListener("ended", forwardEnded);
      clips.reverse.removeEventListener("ended", reverseEnded);
      still.removeEventListener("error", fallback);
      document.removeEventListener("visibilitychange", syncMotion);
      preference.removeEventListener("change", syncMotion);
    };
  }, [label, playLabel, reverseLabel]);

  return (
    <button ref={button} className="portrait-control" type="button" disabled aria-label={label} aria-busy="false" data-state="idle" data-endpoint="first">
      <video ref={forward} className="portrait-video portrait-forward" data-active="false" width={1280} height={720} muted playsInline preload="none" disablePictureInPicture aria-hidden="true" tabIndex={-1} />
      <video ref={reverse} className="portrait-video portrait-reverse" data-active="false" width={1280} height={720} muted playsInline preload="none" disablePictureInPicture aria-hidden="true" tabIndex={-1} />
      <Image ref={poster} className="portrait-image portrait-poster" src={site.portrait.video.poster} alt="" width={1280} height={720} unoptimized preload draggable={false} aria-hidden="true" />
    </button>
  );
}
