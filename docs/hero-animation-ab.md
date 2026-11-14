# Hero animation comparison: A and experimental B

## Versions

| | A: existing implementation | B: short-intro experiment |
| --- | --- | --- |
| Branch | `feat/interactive-video-portrait` | `feat/hero-short-intro` |
| Base | `de71e16b8865b48e5f382f06878b4105f0ca227c` | Isolated worktree/branch from A |
| First automatic clip | Original forward animation, 10.04 seconds | Visible opening gesture settling back over 4 seconds |
| Pose held after discovery | Original final, front-facing pose | Exact original starting pose |
| First later hover/tap/key activation | Full reverse, then full forward | Full forward, then full reverse |
| Later clips | Original full-length encodings | The same unchanged full-length encodings |

A's branch, files and Preview are not overwritten. B is an experiment for comparison, not a selected replacement. The same one-time visibility policy, 500 ms delay, reduced-motion behavior, keyboard/touch activation, tab pause/resume, transparent fallback and contact glow are retained.

B's dedicated introductory asset lasts four seconds at normal playback speed. Full manual forward/reverse clips remain unchanged at rate 1. Only the introductory footage selection is refined; website styling and the controller's interaction policies are preserved.

For a fair comparison, reload each Preview with the pointer away from the portrait. An explicit activation before the automatic delay takes precedence and starts the full manual animation, as in A.

## How the short motion is made

The existing footage does not contain a complete front-facing turn in its first two seconds. Compressing the full ten-second turn would change its character. B instead uses the first two seconds of real opening movement, easing outward and back to rest at the original starting pose. The previous selection stopped at source frame 16: its body movement was only about 1–3 displayed pixels and was barely perceptible when slowed to four seconds. Extending the source selection to frame 48 makes the real head/body gesture visible without adding artificial portrait transforms.

`public/images/Movie-portfolio-intro.webm` is a dedicated, once-played clip, not a timer stopping the original video. It contains 96 frames at 24 fps, lasts exactly 4 seconds, and is 4,438,172 bytes. Resolution, framing, color metadata and genuine alpha remain 1280 × 720 with the original appearance.

For output frame `i` (0–95), the selected original source frame is:

```text
round(48 * (1 - cos(2 * pi * i / 95)) / 2)
```

This cosine easing slows to rest at the turn and at both endpoints. Adjacent output frames repeat or move at most two original frames at a time. The first four and last four output frames are exactly source frame zero, giving a stationary start and finish. No generated imagery, interpolation, retouching, morphing, crop or opacity transition is used.

The original decoded YUVA frames are selected directly with FFmpeg `shuffleframes` and encoded with lossless VP9 alpha. All 96 decoded output RGBA hashes exactly match the chosen original source-frame hashes. Both endpoints exactly match the existing canonical first-frame PNG, so B can hold that still and enter the full forward clip without a pose jump.

Intro SHA-256: `5c87f3ca35bf705cfedf54c0d1bff1d028a17e71fb67418965d7e6201573d490`. The original forward/reverse assets are unchanged.

Reproduction (FFmpeg with libvpx-vp9):

```python
import math
import subprocess

indices = [round(48 * (1 - math.cos(2 * math.pi * i / 95)) / 2) for i in range(96)]
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
```

## Controller reuse and loading

B adds an intro element/source to the existing portrait controller. Only an automatic discovery request selects it; manual requests retain the existing full-clip direction logic. Its natural `ended` event holds the matching first-frame PNG. Both full WebMs remain unloaded until needed. No playback rate adjustment or JavaScript frame-by-frame animation is used.

If the browser denies B's introductory autoplay, the exact first still remains visible and the existing manual recovery starts the full forward clip. Reduced motion makes no video request. Hiding a tab pauses the current clip, including the intro, and resuming keeps the same playback time.

## Verification

Production builds were run independently from the untouched A checkout and the isolated B worktree. Chromium 154 on Linux, including mobile touch emulation, verified:

- A's 10.04-second autoplay still completes naturally and holds the original final pose; its manual reverse/forward sequence is unchanged.
- B's intro completes naturally after four seconds, holds the exact starting pose and does not repeat after scrolling away and back. Verification includes actual painted frames at the beginning, middle and end without hover or touch.
- B's first later interaction plays the unchanged 10.04-second forward clip, then the 10-second reverse clip. A full manual forward run was also observed naturally to completion. Extra inputs and pointer exit do not restart or interrupt playback.
- Independent decoder alpha checks pass for all active clips. The intro-to-PNG handoff has exactly matching rendered alpha; solid-subject RGB differences are only browser decoding rounding (mean 0.45, max 3 on a 0–255 channel), with no framing or pose discontinuity.
- A and B's content, header and page/Hero geometry match at 1920, 1440, 768, 430, 390, 375 and 320 px in both languages (14 pairs). No horizontal overflow is introduced.
- Initial reduced motion is static in both variants. B's blocked-intro recovery, keyboard full forward/reverse and hidden-tab pause/resume pass.
- Contact icon glow remains active on hover/keyboard focus across both variants, languages and desktop/mobile layouts.
- B lint, TypeScript and production build pass. A source and branch remain clean at the original commit.

All CSS, smoke, contact code/glow, navigation, copy, original assets and full-length videos are unchanged. Actual Safari/iOS/Firefox/Edge testing was unavailable and is not claimed. Review B's edited settling gesture in the Preview to choose the motion style; no merge or production deployment is performed.
