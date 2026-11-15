# Shared portrait playback across browsers

Branch: `fix/portrait-cross-browser`, based on the reviewed Version A merged into
`feat/readable-atmospheric-mist` at `3b48472`. No production branch or Vercel
settings are changed. The previous unrelated-photo fallback fix is included.

## Rendering

Safari can report VP9 support while omitting WebM's alpha channel. The portrait
now uses one H.264 MP4 playback path for every browser rather than relying on
native WebM alpha or user-agent detection. Each encoded frame contains the
original RGB image above its original grayscale alpha mask. A small WebGL shader
combines them into a genuinely transparent canvas over the existing smoke.
The MP4 itself is opaque packed data and is never exposed as the visible portrait.

- Both clips contain the same 240 source frames at 24 fps, each lasting 10 seconds.
- The visible canvas remains 1280 × 720; its CSS matches the existing portrait
  surfaces exactly. Encoding retains full framing and resolution without crop,
  retouching, regenerated imagery or a changed pose.
- H.264 High Profile Level 4.0, 4:2:0, CRF 10, no audio and fast-start metadata.
  These are high-quality derivatives, not lossless replacements for the originals.
- Files: `movie-portrait-packed-forward.mp4` (3,674,560 bytes) and
  `movie-portrait-packed-reverse.mp4` (3,841,508 bytes).
- Original WebMs, endpoint PNGs, `prof.png`, portrait placement, typography,
  smoke, contact glow and every unrelated section remain unchanged.
- Rebuild the derivatives with `python scripts/pack-portrait.py`; FFmpeg with
  libvpx-vp9 and libx264 is required only to rebuild assets, not at runtime.

## Interaction and performance

Version A still autoplays once after the visible Hero delay, holds the last frame,
then alternates full reverse/forward clips on a new mouse entry, tap or keyboard
activation. Busy inputs and pointer exit do not interrupt or queue playback.
Hidden tabs and live reduced motion pause the same frame and resume its time.
Initial reduced motion and no JavaScript leave the original first-frame still.

Video sources attach only when needed. The reverse clip is not downloaded during
discovery. GPU compositing runs on decoded video-frame callbacks; the fallback
animation-frame scheduler skips duplicate media times. There is no per-frame
React update or pixel readback. Four alpha samples verify each clip once, after
its first actual playback frame, before the canvas is revealed. Preserving the
drawing buffer prevents blank frames during pauses and endpoint handoff.

No WebGL, an incompatible decoder or context loss leaves the matching portrait
still rather than an older photo or an opaque rectangle. Autoplay permission
denial leaves an enabled tap/keyboard retry. Browser power-saving policies can
require this manual interaction; they cannot be overridden reliably by a site.

## Verification

Chromium 154 passed English/Persian laptop, phone and tablet viewport/touch checks:
automatic ten-second playback, real output alpha, held endpoints, reverse/forward
alternation, busy-input handling, manual recovery, keyboard, hidden-tab resume,
context loss and safe fallback. Twelve reduced-motion layout comparisons at
1440, 1024, 768, 430, 390 and 320px match the preceding Version A content and
geometry without horizontal overflow. Canvas-to-still RGB mean error is about
1.3/255 and alpha mean error about 0.02/255 at the verified endpoint.

Lint, TypeScript and production build pass. WebKit validation is being performed
separately; physical iPhone/iPad and Android hardware were not available in this
environment. Viewport/touch emulation is not physical-device certification.

For review, use this branch's new Preview, not the earlier mist/A/B branch URLs.
On iPhone Safari, open it directly, watch ten seconds without touching the
portrait, check the held final pose and smoke transparency, then tap twice to
verify reverse and forward playback. Repeat in Persian and after rotating the
device. If autoplay is blocked by device policy, tap once to start.
