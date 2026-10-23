/** Decorative, CSS-only haze. No client bundle or dependency on hydration. */
export function Atmosphere({ variant }: { variant: "hero" | "work" | "contact" }) {
  const layers = variant === "hero" ? 3 : variant === "contact" ? 2 : 1;
  return (
    <div className={`atmosphere atmosphere--${variant}`} aria-hidden="true">
      {Array.from({ length: layers }, (_, index) => <span className="mist-layer" key={index} />)}
    </div>
  );
}
