"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar(props: {
  isAuthenticated: boolean;
  itemsCounts: { cart: number; wishlist: number; orders: number };
}) {
  const { isAuthenticated, itemsCounts } = props;
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

  const navItems = [
    {
      href: "/wishlist",
      count: itemsCounts.wishlist,
      title: "Wishlist",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      href: "/orders",
      count: itemsCounts.orders,
      title: "Orders",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
        </svg>
      ),
    },
    {
      href: "/cart",
      count: itemsCounts.cart,
      title: "Cart",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
      ),
    },
  ];

  const mobileMenu =
    typeof document === "undefined"
      ? null
      : createPortal(
          <div
            className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${mobileNavOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={!mobileNavOpen}
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 bg-zinc-950/25 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            />

            <div
              className={`absolute inset-y-0 right-0 z-50 w-[min(100vw,22rem)] h-full bg-white dark:bg-zinc-950 p-6 pt-24 flex flex-col justify-between border-l border-zinc-100 dark:border-zinc-900 transition-transform duration-200 ease-out transform-gpu ${mobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="flex flex-col space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                  Navigation
                </span>
                <Link href="/" className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50" onClick={() => setMobileNavOpen(false)}>Books</Link>
                <Link href="/authors" className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50" onClick={() => setMobileNavOpen(false)}>Authors</Link>
                <Link href="/categories" className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50" onClick={() => setMobileNavOpen(false)}>Categories</Link>

                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pt-4 pb-2 dark:border-zinc-900">
                  User Workspace
                </span>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <Link href="/cart" className="flex flex-col items-center justify-center p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 gap-1.5" onClick={() => setMobileNavOpen(false)}>
                    {isAuthenticated && <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Cart {itemsCounts.cart}</span>}
                  </Link>
                  <Link href="/wishlist" className="flex flex-col items-center justify-center p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 gap-1.5" onClick={() => setMobileNavOpen(false)}>
                    {isAuthenticated && <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Saved {itemsCounts.wishlist}</span>}
                  </Link>
                  <Link href="/orders" className="flex flex-col items-center justify-center p-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 gap-1.5" onClick={() => setMobileNavOpen(false)}>
                    {isAuthenticated && <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">Orders {itemsCounts.orders}</span>}
                  </Link>
                </div>
              </div>

              <div className="flex flex-col space-y-3 mb-12">
                {isAuthenticated ? (
                  <Link href="/account" className="w-full flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 text-sm font-medium py-3 text-zinc-900 dark:text-zinc-100" onClick={() => setMobileNavOpen(false)}>Account</Link>
                ) : (
                  <>
                    <Link href="/auth/login" className="w-full text-center border border-zinc-200 text-sm font-medium py-3 text-zinc-900 dark:border-zinc-800 dark:text-zinc-100" onClick={() => setMobileNavOpen(false)}>Sign In</Link>
                    <Link href="/auth/signup" className="w-full text-center bg-zinc-900 text-white text-sm font-medium py-3 dark:bg-zinc-50 dark:text-zinc-900" onClick={() => setMobileNavOpen(false)}>Create Account</Link>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        );

  return (
    <div className="w-full overflow-x-hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 transition-colors duration-200 border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors justify-self-start">
          The Wisdom Vault
        </Link>

        <div className="hidden md:flex items-center justify-self-center gap-6">
          <Link href="/" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Books</Link>
          <Link href="/authors" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Authors</Link>
          <Link href="/categories" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Categories</Link>
        </div>

        <div className="hidden md:flex items-center justify-self-end gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative flex items-center gap-1 p-1"
              title={item.title}
            >
              {item.icon}
              {isAuthenticated && (
                <span className="text-[9px] font-mono font-bold px-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-full">
                  {item.count}
                </span>
              )}
            </Link>
          ))}

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          {isAuthenticated ? (
            <Link href="/account" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1" title="Account">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Sign In</Link>
              <Link href="/auth/signup" className="text-[10px] font-mono uppercase tracking-wider border border-zinc-200 bg-white px-2.5 py-1 text-zinc-900 hover:border-zinc-900 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-50">Sign Up</Link>
            </>
          )}
        </div>

        <button type="button" className="flex md:hidden flex-col justify-between w-4 h-3 cursor-pointer justify-self-end" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((c) => !c)}>
          <span className={`w-full h-px bg-zinc-900 dark:bg-zinc-50 transition-transform ${mobileNavOpen ? "rotate-45 translate-y-5px" : ""}`} />
          <span className={`w-full h-px bg-zinc-900 dark:bg-zinc-50 transition-opacity ${mobileNavOpen ? "opacity-0" : ""}`} />
          <span className={`w-full h-px bg-zinc-900 dark:bg-zinc-50 transition-transform ${mobileNavOpen ? "-rotate-45 -translate-y-6px" : ""}`} />
        </button>
      </nav>
      {mobileMenu}
    </div>
  );
}