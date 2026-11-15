"""Rebuild browser-compatible H.264 color/mask clips; originals stay untouched.

Requires FFmpeg with libvpx-vp9 and libx264. Run from any directory:
    python scripts/pack-portrait.py
"""
from pathlib import Path
import subprocess


def main():
    images = Path(__file__).resolve().parents[1] / "public" / "images"
    filters = (
        "split=2[color][alpha];"
        "[color]scale=in_range=pc:out_range=tv,format=yuv420p[rgb];"
        "[alpha]alphaextract,scale=in_range=pc:out_range=tv,format=yuv420p[mask];"
        "[rgb][mask]vstack=inputs=2[packed]"
    )
    for source, destination in [
        ("Movie-portfolio.webm", "movie-portrait-packed-forward.mp4"),
        ("Movie-portfolio-reverse.webm", "movie-portrait-packed-reverse.mp4"),
    ]:
        subprocess.run([
            "ffmpeg", "-y", "-c:v", "libvpx-vp9", "-i", str(images / source),
            "-filter_complex", filters, "-map", "[packed]", "-an",
            "-c:v", "libx264", "-preset", "slow", "-crf", "10",
            "-profile:v", "high", "-level:v", "4.0", "-pix_fmt", "yuv420p",
            "-threads", "4", "-g", "48", "-color_range", "tv",
            "-colorspace", "bt709", "-color_trc", "iec61966-2-1",
            "-color_primaries", "bt709", "-movflags", "+faststart",
            "-fps_mode", "passthrough", str(images / destination),
        ], check=True)


if __name__ == "__main__":
    main()
