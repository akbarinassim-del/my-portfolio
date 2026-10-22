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
      <summary>{label}<span aria-hidden="true">+</span></summary>
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
