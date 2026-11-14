# Hero animation comparison: A and experimental B

## Versions

| | A: existing implementation | B: short-intro experiment |
| --- | --- | --- |
| Branch | `feat/interactive-video-portrait` | `feat/hero-short-intro` |
| Base | `de71e16b8865b48e5f382f06878b4105f0ca227c` | Isolated worktree/branch from A |
| First automatic clip | Original forward animation, 10.04 seconds | Visible one-way opening gesture over 4 seconds |
| Pose held after discovery | Original final, front-facing pose | Exact final intro pose (original source frame 48) |
| First later hover/tap/key activation | Full reverse, then full forward | Continue forward from original time 2 seconds, then full reverse |
| Later clips | Original full-length encodings | The same unchanged full-length encodings |

A's branch, files and Preview are not overwritten. B is an experiment for comparison, not a selected replacement. The same one-time visibility policy, 500 ms delay, reduced-motion behavior, keyboard/touch activation, tab pause/resume, transparent fallback and contact glow are retained.

B's dedicated introductory asset lasts four seconds at normal playback speed. Its final pose remains held until an explicit interaction. That first interaction continues the original forward clip at time 2 seconds, without replaying its already shown opening or jumping to its first frame. This continuation takes approximately eight seconds. After it completes, the original full-length reverse/forward alternation resumes at rate 1. Both full clips are unchanged. Website styling and the controller's other interaction policies are preserved.

For a fair comparison, reload each Preview with the pointer away from the portrait. An explicit activation before the automatic delay takes precedence and starts the full manual animation, as in A.

## How the short motion is made

The existing footage does not contain a complete front-facing turn in its first two seconds. Compressing the full ten-second turn would change its character. B instead eases the first two seconds of real opening movement across four seconds and holds its destination. There is no automatic return leg. The source selection reaches frame 48 so the real head/body gesture is visible without artificial portrait transforms.

`public/images/Movie-portfolio-intro.webm` is a dedicated, once-played clip, not a timer stopping the original video. It contains 96 frames at 24 fps, lasts exactly 4 seconds, and is 2,466,224 bytes. Resolution, framing, color metadata and genuine alpha remain 1280 × 720 with the original appearance.

For output frame `i` (0–95), the selected original source frame is:

```text
round(48 * (1 - cos(pi * i / 95)) / 2)
```

This half-cosine easing starts gently and settles naturally at the destination. Source frame indices never decrease; adjacent output frames repeat or advance one original frame. The first seven output frames are source frame zero and the last seven are source frame 48, giving a stationary start and finish. No generated imagery, interpolation, retouching, morphing, crop or opacity transition is used.

The original decoded YUVA frames are selected directly with FFmpeg `shuffleframes` and encoded with lossless VP9 alpha. All 96 decoded output RGBA hashes exactly match the chosen original source-frame hashes. The first frame matches the existing canonical starting PNG. The final frame matches the new `movie-portfolio-intro-last-frame.png`, extracted directly from original frame 48. The controller holds this transparent still and seeks the original forward clip to the matching time before revealing playback.

Intro SHA-256: `32903f31dba66940b521a59de88aec8a7896bead81928930a50ae13798f28261`. The original forward/reverse assets are unchanged.

Reproduction (FFmpeg with libvpx-vp9):

```python
import math
import subprocess

indices = [round(48 * (1 - math.cos(math.pi * i / 95)) / 2) for i in range(96)]
subprocess.run([
    "ffmpeg", "-c:v", "libvpx-vp9", "-i", "public/images/Movie-portfolio.webm",
    "-map", "0:v:0", "-vf", "trim=end_frame=96,shuffleframes=" + " ".join(map(str, indices)),
    "-frames:v", "96", "-an", "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
    "-lossless", "1", "-crf", "0", "-b:v", "0", "-auto-alt-ref", "0",
    "-row-mt", "1", "-threads", "4", "-deadline", "good", "-cpu-used", "0",
    "-color_range", "pc", "-colorspace", "bt709", "-color_trc", "iec61966-2-1",
    "-color_primaries", "bt709", "-fps_mode", "passthrough",
    "public/images/Movie-portfolio-intro.webm",
], check=True)
subprocess.run([
    "ffmpeg", "-c:v", "libvpx-vp9", "-i", "public/images/Movie-portfolio.webm",
    "-vf", "select='eq(n,48)'", "-frames:v", "1", "-pix_fmt", "rgba",
    "public/images/movie-portfolio-intro-last-frame.png",
], check=True)
```

## Controller reuse and loading

B adds an intro element/source and a distinct held endpoint to the existing portrait controller. Only an automatic discovery request selects the intro. Its natural `ended` event holds the matching final-intro PNG. The first subsequent request continues forward from that endpoint; subsequent requests retain full-clip alternation. Both full WebMs remain unloaded until needed. No playback rate adjustment or JavaScript frame-by-frame animation is used.

If the browser denies B's introductory autoplay, the exact first still remains visible and the existing manual recovery starts the full forward clip. Reduced motion makes no video request. Hiding a tab pauses the current clip, including the intro, and resuming keeps the same playback time.

## Verification

Production builds were run independently from the untouched A checkout and the isolated B worktree. Chromium 154 on Linux, including mobile touch emulation, verified:

- A's 10.04-second autoplay still completes naturally and holds the original final pose; its manual reverse/forward sequence is unchanged.
- B's intro completes naturally after four seconds, holds its exact final pose and does not repeat or return to the beginning after pointer exit, scrolling away/back, or hidden-tab changes. Verification includes actual painted frames at the beginning, middle and end without hover or touch.
- B's first later interaction continues the unchanged original forward clip from the matching 2-second pose, followed by full 10-second reverse and 10.04-second forward clips. Extra inputs and pointer exit do not restart or interrupt playback. Manual activation before discovery or after denied autoplay still starts the full original forward clip from zero.
- Independent decoder alpha checks pass for all active clips. The intro-to-PNG handoff and seek-to-continuation have exactly matching rendered alpha; solid-subject RGB differences are only browser decoding rounding (mean 0.57, max 3 on a 0–255 channel), with no framing or pose discontinuity.
- A and B's content, header and page/Hero geometry match at 1920, 1440, 768, 430, 390, 375 and 320 px in both languages (14 pairs). No horizontal overflow is introduced.
- Initial reduced motion is static in both variants. B's blocked-intro recovery, keyboard full forward/reverse and hidden-tab pause/resume pass.
- Contact icon glow remains active on hover/keyboard focus across both variants, languages and desktop/mobile layouts.
- B lint, TypeScript and production build pass. A source and branch remain clean at the original commit.

All CSS, smoke, contact code/glow, navigation, copy, original assets and full-length videos are unchanged. Actual Safari/iOS/Firefox/Edge testing was unavailable and is not claimed. Review B's one-way opening gesture and held final pose in the Preview; no merge or production deployment is performed.
