"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/config/site";
import { Brand } from "@/components/ui/brand";
import { Arrow } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/links";
import { SmartLink } from "@/components/ui/smart-link";

/** Matches the CSS breakpoint where the desktop nav replaces the menu button. */
const DESKTOP_QUERY = "(min-width: 901px)";

/** `/about/` -> `/about` (exported URLs carry a trailing slash). */
function normalise(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function isCurrent(item: NavItem, pathname: string): boolean {
  return item.matchPrefix ? pathname.startsWith(item.matchPrefix) : pathname === item.href;
}

export function Header() {
  const pathname = normalise(usePathname());
  // The menu is open only on the path where it was opened, so it closes by
  // itself after navigation without a state update in an effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpenOnPath(null);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  // Following a menu link to the page already shown keeps the same path, so
  // close explicitly (a full page load used to do this).
  const closeMenu = () => setOpenOnPath(null);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            {mainNav.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item, pathname) ? "page" : undefined}
              >
                {item.label}
              </SmartLink>
            ))}
          </nav>
          <ButtonLink href="/contact" className="small header-cta">
            {"Let’s talk comfort "}
          </ButtonLink>
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOnPath(open ? null : pathname)}
          >
            {open ? (
              <span>Close ×</span>
            ) : (
              <span>
                {"Menu "}
                <i />
                <i />
              </span>
            )}
          </button>
        </div>
        {open && (
          <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
            {mainNav.map((item) => (
              <SmartLink key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </SmartLink>
            ))}
            <SmartLink href="/contact" onClick={closeMenu}>
              {"Let’s talk comfort "}
              <Arrow />
            </SmartLink>
          </nav>
        )}
      </header>
    </>
  );
}
