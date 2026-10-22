"use client";

import { useRef } from "react";

export function MobileNavigation({ label, items, navigationLabel }: {
  label: string;
  items: [string, string][];
  navigationLabel: string;
}) {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <details className="mobile-menu" ref={menu} onKeyDown={event => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    }}>
      <summary><span className="sr-only">{label}</span><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h16M4 16h16" /></svg></summary>
      <nav aria-label={navigationLabel}>
        {items.map(([id, text]) => (
          <a key={id} href={`#${id}`} onClick={() => {
            if (menu.current) menu.current.open = false;
          }}>{text}</a>
        ))}
      </nav>
    </details>
  );
}
