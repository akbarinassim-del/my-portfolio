# Interactive Hero portrait

This focused enhancement is based on approved commit `a87283a5cbd33a5076057183bffe55568741e3c5`. The approved UI changes remain unmerged into `main`; this branch keeps them intact and brings in only the uploaded video from `main` commit `f6a9cd8`.

## Assets and composition

- Original `public/images/Movie-portfolio.webm`: 2,834,409 bytes, 1280 × 720, VP9, nominal 24 fps, 240 decoded frames, 10.04-second container duration. The source includes Opus audio; playback is always muted.
- All 240 frames were decoded with libvpx-vp9 and have genuine alpha transparency. Each has at least 711,089 fully transparent pixels out of 921,600. The background is not baked-in black, white or checkerboard pixels.
- `movie-portfolio-poster.png` is the unaltered first decoded RGBA frame. No image generation, retouching, stretching or lossy recompression was used.
- The approved 3:4 portrait footprint and its desktop/mobile positions remain unchanged. The source's 16:9 transparent canvas is centered at its natural aspect ratio inside it: `(16/9)/(3/4) = 64/27` times the container width. Only surrounding padding extends outside the viewport; the subject, including shoulders, arms and hands, stays within it across the source animation.
- Original video SHA-256: `f81a95270c8796233661b2e68c82166abfffa4df5cbd6e0876a20348a9970a6f`.
- First-frame PNG SHA-256: `09aa6143b47b3b9a12e1926bac5b36fa7694ff7d4c285284ba56ea86709a1407`.

## Interaction and loading

The server-rendered first-frame PNG is visible immediately, including with JavaScript disabled. There is no autoplay, looping, native control panel or play overlay. The WebM has no source attached until the first interaction, so initial loading needs only the PNG.

Fine-pointer mouse entry, touch activation and native button activation with Enter/Space play once. Pointer movement within the portrait and extra taps during playback do not restart it. Mouse exit, focus leaving the control, natural completion or document hiding stop playback and return to the first frame. A 160 ms crossfade covers normal returns; seeking occurs beneath the poster. Loading attempts are cancelled logically on exit so late responses cannot start playback unexpectedly.

Reduced motion keeps the first-frame PNG static and disables the animation control. A live preference change stops a running animation. Per-frame work stays in the browser's media decoder; React does not rerender for playback progress.

## Transparency and failure handling

`canPlayType()` is only an initial codec check. Before any video surface becomes visible, four pixels are sampled from the actual decoded first frame: three known transparent background positions and one opaque subject position. A browser that decodes VP9 but discards alpha therefore cannot expose an opaque video rectangle. The video is revealed only after playback has delivered a frame.

No codec support, failed transparency validation, load/decode errors, rejected playback or poster loading failure use the original unchanged `prof.png`, with `object-fit: contain`. This also handles a poster that fails before hydration. A missing first frame or playback frame times out safely to that same static fallback. The video remains visually hidden until validated.

## Verification

- Production-rendered browser tested: Chromium `154.0.8037.57` on Linux. Desktop pointer input, mobile touch emulation and both English/Persian layouts were tested.
- Full content/header and Hero/page geometry matched the approved baseline at 1920, 1440, 768, 430, 390, 375 and 320 px in both languages (14 cases).
- Initial still/no video request; hover; pointer movement without restart; early exit/reset; natural one-shot completion; re-entry; touch replay; repeated taps; keyboard Enter/Space; focus-leave reset; live reduced-motion updates and unchanged portrait geometry passed.
- Decoder alpha sampling and an actual rendered compositing test passed: a known color behind the running video remained exactly visible through its transparent margin. Smoke remained visible in the normal screenshots.
- All five forced failure cases passed: unsupported codec, opaque decoded alpha, invalid video data, rejected `play()` and failed poster load. Each displayed the original transparent PNG, with the video hidden.
- A delayed first request cancelled by mouse exit remained paused, then played correctly after re-entry.
- Hiding the document was tested by dispatching `visibilitychange` with a simulated hidden state; it stopped and reset playback.
- JavaScript-disabled static poster passed.
- Lint, TypeScript and production build passed.

Actual Safari, iOS, Firefox and Edge were not available and are **not claimed as tested**. In particular, Safari WebM alpha support must still be checked on a real Safari device. The alpha gate and PNG fallback have been exercised by forced failure tests; those tests do not substitute for Safari certification.

The new portrait is audited separately for WCAG A/AA checks. The unchanged language switch has a pre-existing WCAG 2.1 label-content-name mismatch (the `EN`/`FA` abbreviations versus their expanded accessible names); its markup was deliberately preserved as requested. No claim of complete page-wide WCAG conformance is made.

Smoke code/styles, mobile navigation, contact interaction, scroll-reveal implementation, projects, all prior bilingual copy, factual content, assets and the real CV remain unchanged. No Vercel configuration changes or production deployment commands are part of this work.

To reproduce the lossless first-frame extraction:

```sh
ffmpeg -c:v libvpx-vp9 -i public/images/Movie-portfolio.webm -frames:v 1 -update 1 public/images/movie-portfolio-poster.png
```
