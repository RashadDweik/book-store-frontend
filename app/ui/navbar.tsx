"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar(props: { isAuthenticated: boolean }) {
  const { isAuthenticated } = props;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileNavOpen]);

  const mobileMenu =
    typeof document === "undefined"
      ? null
      : createPortal(
          <div
            className={`fixed inset-0 z-[200] md:hidden transition-opacity duration-200 ${mobileNavOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={!mobileNavOpen}
            style={{ willChange: "transform, opacity" }}
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 bg-zinc-950/24 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            />

            <div
              className={`absolute inset-y-0 right-0 z-[210] w-[min(100vw,22rem)] h-full bg-white dark:bg-zinc-950 p-6 pt-24 flex flex-col justify-between border-l border-zinc-100 dark:border-zinc-900 transition-transform duration-200 ease-out transform-gpu ${mobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex flex-col space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                  Navigation
                </span>
                <Link href="/" className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50" onClick={() => setMobileNavOpen(false)}>
                  Books
                </Link>
                <Link href="/authors" className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50" onClick={() => setMobileNavOpen(false)}>
                  Authors
                </Link>
                <Link href="/categories" className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50" onClick={() => setMobileNavOpen(false)}>
                  Categories
                </Link>

                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pt-4 pb-2 dark:border-zinc-900">
                  User Workspace
                </span>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <Link href="/cart" className="flex flex-col items-center justify-center p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 gap-1.5" onClick={() => setMobileNavOpen(false)}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Cart (0)</span>
                  </Link>
                  <Link href="/wishlist" className="flex flex-col items-center justify-center p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 gap-1.5" onClick={() => setMobileNavOpen(false)}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Saved</span>
                  </Link>
                  <Link href="/orders" className="flex flex-col items-center justify-center p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 gap-1.5" onClick={() => setMobileNavOpen(false)}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Orders</span>
                  </Link>
                </div>
              </div>

              {/* Mobile auth section */}
              <div className="flex flex-col space-y-3 mb-12">
                {isAuthenticated ? (
                  <Link
                    href="/account"
                    className="w-full flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 text-sm font-medium py-3 text-zinc-900 dark:text-zinc-100"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Account
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="w-full text-center border border-zinc-200 text-sm font-medium py-3 text-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="w-full text-center bg-zinc-900 text-white text-sm font-medium py-3 dark:bg-zinc-50 dark:text-zinc-900"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        );

  return (
    <div className="w-full overflow-x-hidden sticky top-0 z-[100] bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 transition-colors duration-200 border-b border-zinc-200 dark:border-zinc-800">
      <nav className="w-full">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between relative z-[110] bg-transparent md:grid md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors justify-self-start"
          >
            The Wisdom Vault
          </Link>

          <div className="hidden md:flex items-center justify-self-center gap-6">
            <Link href="/" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Books</Link>
            <Link href="/authors" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Authors</Link>
            <Link href="/categories" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Categories</Link>
          </div>

          <div className="hidden md:flex items-center justify-self-end gap-5">
            <Link href="/wishlist" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative p-1" title="Wishlist">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </Link>
            <Link href="/orders" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative p-1" title="Orders">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Link>
            <Link href="/cart" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative p-1 flex items-center gap-1" title="Cart">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <span className="text-[9px] font-mono font-bold px-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 scale-90">0</span>
            </Link>

            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

            {/* Desktop auth section */}
            {isAuthenticated ? (
              <Link
                href="/account"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1"
                title="Account"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="text-[10px] font-mono uppercase tracking-wider border border-zinc-200 bg-white px-2.5 py-1 text-zinc-900 hover:border-zinc-900 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-50">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="flex md:hidden flex-col justify-between w-4 h-3 cursor-pointer justify-self-end"
            aria-expanded={mobileNavOpen}
            aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileNavOpen((current) => !current)}
          >
            <span className={`w-full h-[1px] bg-zinc-900 dark:bg-zinc-50 transition-transform duration-300 origin-top-left ${mobileNavOpen ? "rotate-45 translate-x-[2px]" : ""}`} />
            <span className={`w-full h-[1px] bg-zinc-900 dark:bg-zinc-50 transition-opacity duration-200 ${mobileNavOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`w-full h-[1px] bg-zinc-900 dark:bg-zinc-50 transition-transform duration-300 origin-bottom-left ${mobileNavOpen ? "-rotate-45 translate-x-[2px] -translate-y-[1px]" : ""}`} />
          </button>
        </div>
        {mobileMenu}
      </nav>
    </div>
  );
}