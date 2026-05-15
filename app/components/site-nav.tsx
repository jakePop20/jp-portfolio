"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["home", "projects", "skills", "contact"] as const;

const links = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

function IconMenu({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      {open ? (
        <path
          strokeWidth="2"
          strokeLinecap="round"
          d="M6 6l12 12M18 6L6 18"
        />
      ) : (
        <path
          strokeWidth="2"
          strokeLinecap="round"
          d="M4 7h16M4 12h16M4 17h16"
        />
      )}
    </svg>
  );
}

export function SiteNav() {
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const offset = 80;
      const y = window.scrollY + offset;
      let current = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between gap-3 border-b border-outline-variant/30 bg-background/80 px-margin-mobile backdrop-blur-xl md:gap-0 md:px-margin-desktop">
      <a
        href="#home"
        className="min-w-0 shrink text-headline-md font-bold tracking-tight text-on-surface"
        onClick={() => setMenuOpen(false)}
      >
        JP.Dev
      </a>

      <div className="hidden items-center gap-8 text-body-md md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link border-b-2 border-transparent pb-1 text-on-surface-variant transition-all duration-300 hover:text-on-surface ${
              active === link.id ? "active" : ""
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex shrink-0 items-center md:hidden">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant/50 text-on-surface transition-colors hover:bg-surface-variant/40 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <IconMenu open={menuOpen} />
        </button>

      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-16 z-40 bg-black/55 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="fixed right-0 top-16 z-[60] flex max-h-[calc(100dvh-4rem)] w-[min(100%,18rem)] flex-col gap-1 overflow-y-auto border-l border-outline-variant/30 bg-surface-container p-4 shadow-xl md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-body-md transition-colors hover:bg-surface-variant/50 ${
                  active === link.id
                    ? "bg-primary/15 font-semibold text-primary"
                    : "text-on-surface"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </>
      ) : null}
    </nav>
  );
}
