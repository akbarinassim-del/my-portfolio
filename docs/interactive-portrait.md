# Bidirectional transparent Hero portrait

This refinement builds on `b2def6457e0de817d2bcd4dd7abcf01e243d375b` on `feat/interactive-video-portrait`. The approved layout from `a87283a` remains intact. No production branch or deployment settings are changed.

## Interaction

The first frame is visible immediately. When the Hero first becomes visible, a one-time 500 ms delay schedules forward autoplay, unless reduced motion is requested. The completed animation permanently holds the last frame. If autoplay is denied, the first frame stays visible and manual activation remains enabled. An early manual activation consumes the pending autoplay. After the forward animation completes, the next mouse-enter plays a separate reverse-encoded clip once and permanently holds the first frame. Further completed interactions alternate directions. Leaving or moving within the portrait does not stop, reset, reverse or restart playback. Re-entering during playback is ignored, not queued.

Mobile taps and keyboard Enter/Space use the same alternation. Extra activations during loading, playback or the final-frame handoff are ignored. Repeated keydown events cannot start accidental extra transitions. The button's English/Persian accessible name describes the next direction.

Only a successfully completed animation changes the held endpoint. The native final video frame stays visible until the matching first/last PNG has decoded, then the exact still holds that pose. Media surfaces switch without opacity transitions, avoiding fades or double-blended transparent edges. The original fixed portrait footprint, contain sizing and transparent side padding are preserved.

When the tab becomes hidden, active playback pauses at its current frame. Returning resumes that same transition and time, without changing direction or resetting the pose. Held endpoints remain held. Reduced motion initially shows the static first-frame PNG with no video download; enabling it during playback freezes the current frame, and disabling it resumes the same transition when visible.

## Assets and reverse encoding

- Original: `public/images/Movie-portfolio.webm`, untouched, 2,834,409 bytes, VP9 with alpha, 1280 × 720, nominal 24 fps, 240 frames. Its 10.04-second container includes an Opus track; playback is always muted.
- Reverse: `public/images/Movie-portfolio-reverse.webm`, lossless VP9 with alpha, 1280 × 720, 24 fps, 240 frames, 10 seconds, 14,532,584 bytes. The generated reverse clip omits audio.
- First still: unchanged `movie-portfolio-poster.png`, the original first decoded RGBA frame.
- Last still: `movie-portfolio-last-frame.png`, the original last decoded RGBA frame.
- All 240 decoded reverse RGBA frame hashes exactly match the original frame hashes in reverse order. This checks color, alpha, resolution, framing and visual quality, rather than only container metadata. Both PNGs also exactly match their original endpoint frame hashes.
- Original SHA-256: `f81a95270c8796233661b2e68c82166abfffa4df5cbd6e0876a20348a9970a6f`.
- Reverse SHA-256: `631b4ed66a16a7eedfd2d207d5e3780ffebd38da6a4a915aa994d064cff5c63e`.

The lossless reverse is larger than the original lossy recording. Neither video has a source attached on initial render. The forward clip loads after the one-time visible-Hero delay or an earlier manual activation; the reverse loads only on the first requested reverse activation. Reduced-motion users and an initially offscreen Hero do not start a video download. The last still is prepared on the first forward activation. Existing media buffers and decoded stills are reused for later interactions. No JavaScript frame-by-frame reversal or negative playback rate is used; both clips play normally at rate 1.

Encoding command (FFmpeg with libvpx-vp9):

```sh
ffmpeg -c:v libvpx-vp9 -i public/images/Movie-portfolio.webm \
  -map 0:v:0 -vf reverse -an -c:v libvpx-vp9 -pix_fmt yuva420p \
  -lossless 1 -crf 0 -b:v 0 -auto-alt-ref 0 -row-mt 1 -threads 4 \
  -deadline good -cpu-used 0 -color_range pc -colorspace bt709 \
  -color_trc iec61966-2-1 -color_primaries bt709 -fps_mode passthrough \
  public/images/Movie-portfolio-reverse.webm
```

Lossless last-frame extraction:

```sh
ffmpeg -c:v libvpx-vp9 -i public/images/Movie-portfolio.webm \
  -vf 'select=eq(n\,239)' -frames:v 1 -update 1 public/images/movie-portfolio-last-frame.png
```

## Transparency and fallback

Codec support alone does not prove alpha support. Each clip is validated independently before being revealed, sampling three known transparent pixels and an opaque subject pixel from its actual first decoded frame. First frames are revealed only after a video frame has been delivered. An incompatible or opaque decoder cannot expose a black rectangle.

Unsupported playback on first use falls back to the unchanged transparent `prof.png`. If the forward animation already completed, a failed reverse load, alpha check or playback request retains the successfully decoded last-frame still and disables animation. Failures never reset that completed pose. The final held pose stays transparent over the approved smoke.

## Verification

Tests ran against the rendered production build in Chromium 154 on Linux, including mobile touch emulation:

- Full English/Persian content, header markup and page/Hero geometry match the approved baseline at 1920, 1440, 768, 430, 390, 375 and 320 px (14 cases).
- Forward → last → reverse → first → forward alternation passes on desktop and touch, in both languages.
- Both forward and reverse were played through naturally once. Other repetitions seek near real EOF to exercise native completion and handoff.
- Early pointer exit continues playback; pointer movement, desktop clicks and re-entry during playback do not restart it. Destination stills remain held after exit, without autoplaying the next direction.
- Keyboard Enter/Space alternate correctly; tabbing away does not interrupt an active clip.
- Hidden state was simulated through `visibilitychange`: playback pauses at the same time, then resumes the same direction and completes. Live reduced-motion changes freeze and resume without changing the pose. Initial reduced motion makes no video request.
- Source, poster and decoded frame checks prove exact endpoint continuity and real alpha. Actual browser alpha sampling passes for both clips. Smoke keeps drifting behind held poses.
- Unsupported codec, opaque reverse decoding, invalid reverse data and rejected reverse playback all show a safe static fallback; reverse failures retain the completed last-frame PNG.
- Portrait-scoped WCAG A/AA checks pass. Existing language-switch accessible labels remain unchanged; their pre-existing WCAG 2.1 label-content mismatch is outside this focused change.
- Lint, TypeScript and production build pass.

Actual Safari, iOS, Firefox and Edge were not available and are not claimed as tested. Safari transparency still needs checking on a real device; the independent alpha gates and static fallbacks are tested safeguards, not Safari certification.

Smoke code/styles, navigation, scroll reveals, factual copy, projects, CV and contact interactions remain unchanged. No merge, production deployment command or Vercel configuration change is part of this work.

## Discovery autoplay and contact glow

The subsequent autoplay and icon-glow refinement is documented in [hero-autoplay-contact-glow.md](hero-autoplay-contact-glow.md), including permission-denial recovery, one-time visibility handling and rendered hover/focus verification. All media assets and the reverse encoding remain unchanged.
