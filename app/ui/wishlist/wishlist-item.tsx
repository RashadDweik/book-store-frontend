"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toggleWishlist } from "@/app/lib/wishlists/actions";
import { WishlistItem } from "@/app/lib/definitions";

export function WishlistItemRow({ item }: { item: WishlistItem }) {
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    setLoading(true);
    await toggleWishlist(true, item.id, item.book.id);
    setLoading(false);
  }

  return (
    <li
      className={`flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-4 sm:py-5 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 transition-opacity ${loading ? "opacity-40" : ""}`}
    >
      {/* Cover */}
      <div className="relative w-10 h-[3.75rem] sm:w-12 sm:h-[4.5rem] shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {item.book.cover_url ? (
          <Image
            src={item.book.cover_url}
            alt={item.book.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-600">—</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/book/${item.book.id}`}
          className="group/title inline-block max-w-full"
        >
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate group-hover/title:underline underline-offset-2">
            {item.book.title}
          </h2>
        </Link>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
          {item.book.authors?.map((a) => a.name).join(", ")}
        </p>
      </div>

      {/* Price */}
      <span className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100 shrink-0">
        ${item.book.price}
      </span>

      {/* Remove */}
      <button
        onClick={handleRemove}
        disabled={loading}
        aria-label="Remove from wishlist"
        className="shrink-0 text-zinc-300 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-40"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}