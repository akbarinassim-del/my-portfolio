"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/config/site";

export type ContactLabels = {
  title: string;
  close: string;
  email: string;
  phone: string;
  linkedin: string;
  newTab: string;
};

function ContactIcon({ type }: { type: "email" | "phone" | "linkedin" }) {
  return <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {type === "email" ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></> : type === "phone" ? <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z" /> : <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7M7 7h.01M11 17v-7m0 3c0-4 6-4 6 0v4" /></>}
  </svg>;
}

/** Native modal focus containment; anchored on desktop and a bottom sheet on mobile. */
export function ContactMenu({ label, labels, className }: {
  label: string;
  labels: ContactLabels;
  className: string;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function position() {
    const panel = dialog.current;
    const button = trigger.current;
    if (!panel || !button) return;
    const rect = button.getBoundingClientRect();
    const { width, height } = panel.getBoundingClientRect();
    const rtl = document.documentElement.dir === "rtl";
    const left = rtl ? rect.left : rect.right - width;
    panel.style.left = `${Math.max(16, Math.min(left, window.innerWidth - width - 16))}px`;
    const below = rect.bottom + 12;
    const top = below + height <= window.innerHeight - 16 ? below : rect.top - height - 12;
    panel.style.top = `${Math.max(16, Math.min(top, window.innerHeight - height - 16))}px`;
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", position);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", position);
    };
  }, [open]);

  function close() { dialog.current?.close(); }

  function toggle() {
    if (dialog.current?.open) { close(); return; }
    dialog.current?.showModal();
    position();
    setOpen(true);
    dialog.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
  }

  return (
    <>
      <button ref={trigger} type="button" className={className} onClick={toggle} aria-haspopup="dialog" aria-expanded={open} aria-controls={id}>
        {label}<svg className="arrow" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m7 10 5 5 5-5" /></svg>
      </button>
      <dialog ref={dialog} id={id} className="contact-dialog" aria-labelledby={`${id}-title`} onKeyDown={event => {
        if (event.key !== "Tab") return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }} onClose={() => {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
      }}>
        <div className="contact-dialog-heading">
          <h2 id={`${id}-title`}>{labels.title}</h2>
          <button className="contact-close" type="button" onClick={close} aria-label={labels.close}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="contact-options">
          <a href={`mailto:${site.contact.email}`} onClick={close}><ContactIcon type="email" /><span><strong>{labels.email}</strong><bdi dir="ltr">{site.contact.email}</bdi></span></a>
          <a href={site.contact.phoneHref} onClick={close}><ContactIcon type="phone" /><span><strong>{labels.phone}</strong><bdi dir="ltr">{site.contact.phone}</bdi></span></a>
          <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer" onClick={close}><ContactIcon type="linkedin" /><span><strong>{labels.linkedin}</strong><span>{labels.newTab}</span></span></a>
        </div>
      </dialog>
    </>
  );
}
