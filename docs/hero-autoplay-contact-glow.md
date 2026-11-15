# One-time Hero discovery and contact icon glow

The discovery and contact interactions below are preserved by the newer shared
[browser-compatible portrait renderer](portrait-browser-compatibility.md).

Baseline: completed feature branch `feat/interactive-video-portrait` at `b702a1d3e618c272de28dd134e22fed732b5b348`. This change modifies the portrait interaction and contact-icon CSS. It reuses the existing forward/reverse WebMs, frame-matched first/last PNGs and transparent fallback without changing any asset.

## Hero behavior

- The server-rendered first frame appears immediately. At least 10% of the Hero entering the viewport schedules forward autoplay after 500 ms. The timing includes a subsequent media load/decode, rather than downloading videos before the Hero is visible.
- Autoplay is consumed once per page load and the visibility observer is disconnected. Scrolling away and back cannot schedule another autoplay. A manual activation before the timer fires consumes the pending autoplay too.
- Natural forward completion holds the exact last-frame PNG. The next genuine mouse entry or tap plays reverse and holds the first-frame PNG. Later completed activations keep alternating. Pointer movement, exit and repeated inputs during playback do not reset or restart it.
- A `NotAllowedError` on a new transition retains its starting still and an enabled manual control. A denied resume keeps the already-paused video frame available for manual retry. Initial autoplay denial therefore keeps the exact initial frame. A desktop click can retry while the pointer is already inside; touch and Enter/Space also retry. Denied autoplay is not automatically retried after scrolling.
- The existing alpha gates still validate each decoded clip before exposing it. Genuine decode or alpha failures retain the established transparent static fallback behavior.
- Initially reduced motion skips discovery autoplay entirely. Enabling reduced motion cancels any pending discovery timer and freezes active playback through the existing behavior. Tab hiding cancels an unstarted timer or pauses an active transition at its current time; visibility restoration never resets its pose or direction.
- The geometry-based fallback supports discovery without IntersectionObserver. Cleanup removes observers, timers and fallback listeners. No per-frame React state or new continuous effect is introduced.

## Contact icons

The contact component, SVG paths, links, markup, layout, row hover/selected styles and focus trap are unchanged. CSS adds two centered, diffuse drop-shadows only to the icons:

- Inner: muted lime/gray-green, 5 px blur, 0.48 alpha.
- Outer: muted gray-green, 11 px blur, 0.24 alpha.
- Filter transition: 280 ms in/out; no transition under reduced motion.

Fine-pointer hover and `:focus-visible` produce the glow. The original 2 px focus outline remains visible. No new touch-active or permanent tap-glow style is added; existing touch feedback is preserved. The SVG allows ink overflow, with the existing dialog padding containing the halo in LTR and RTL. The menu and icon dimensions do not change, and no new wrapper or effect covers an entire row.

## Verification

Rendered production build: Chromium 154 on Linux, desktop and mobile touch emulation, English and Persian.

- All 14 approved page/Hero geometry and content comparisons pass at 1920, 1440, 768, 430, 390, 375 and 320 px in both languages. Initial reduced motion makes zero video playback requests and attaches no video source.
- Unattended forward autoplay played through naturally once, with no hover/tap. The four language/device checks recorded the first `play()` request 543–680 ms after the Hero's qualifying observer entry, including initial media loading/decoding.
- Auto-forward → held last frame → manual reverse → held first frame → manual forward passes on desktop and touch in both languages. Entering/tapping during the initial play is ignored; pointer exit continues playback; returning after scrolling does not replay discovery.
- Simulated browser permission denial passes on desktop and touch: initial frame retained, control enabled, no automatic retry, manual retry plays forward. An early manual hover cancels discovery. An initially offscreen Hero waits until scrolled into view. The no-observer fallback passes.
- Hidden state is tested through simulated visibility events: no hidden autoplay; active playback pauses and resumes at the same time. Keyboard Enter/Space and live reduced-motion pause/resume pass. Invalid video data now retains the matching video-frame still; it does not replace it with the older portrait.
- Contact markup, header, link destinations, icon colors and menu/row/icon rectangles exactly match the saved baseline in all four EN/FA desktop/mobile combinations.
- All three contact icons glow on desktop hover. An isolated rendered-image comparison, holding the existing hovered row appearance constant, finds 224/230 changed halo pixels outside the phone icon in English/Persian. The halo stays within the dialog; its pixel-difference bounds do not touch clipping edges.
- Keyboard focus shows the icon glow and the preserved 2 px outline. Focus wrapping, Escape, outside-click closing, and focus restoration still pass. Touch opens/closes normally and reopening shows no lingering phone-icon glow. Reduced motion removes the transition while retaining focus emphasis.
- Dialog-scoped WCAG A/AA checks pass in EN/FA on desktop/mobile. No claim of complete page-wide conformance is made; the pre-existing language-switch label mismatch remains outside this change.
- Independent checks of both running video surfaces confirm actual alpha and successful compositing over a known background color. The original WebM, reverse file, endpoint PNGs, portrait fallback and smoke implementation are byte-for-byte unchanged. CV download bytes match the real PDF, and English → Persian navigation succeeds.
- Lint, TypeScript and production build pass. The final build exit status and rendered test reports are saved with the screenshots in the originating task workspace.

Actual Safari/iOS/Firefox/Edge testing was not available. The existing runtime alpha gates and static fallbacks remain safeguards; browser compatibility beyond the tested Chromium environment is not claimed.

No merge, production deployment command, dependency change or Vercel configuration change is included.
