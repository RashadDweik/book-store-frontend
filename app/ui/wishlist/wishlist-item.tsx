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
    await toggleWishlist(true ,item.id, item.book.id);
    setLoading(false);
  }

  return (
    <li className={`flex items-center gap-5 lg:gap-8 py-5 transition-opacity ${loading ? "opacity-40" : ""}`}>
      {/* Cover */}
      <div className="relative w-12 h-16 lg:w-16 lg:h-20 shrink-0 bg-zinc-100">
        {item.book.cover_url ? (
          <Image
            src={item.book.cover_url}
            alt={item.book.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-zinc-100" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/book/${item.book.id}`} className="hover:underline underline-offset-2">
          <h2 className="font-medium text-sm lg:text-base truncate">{item.book.title}</h2>
        </Link>
        <p className="text-xs lg:text-sm text-zinc-400 mt-0.5 truncate">
          {item.book.authors?.map((a) => a.name).join(", ")}
        </p>
      </div>

      {/* Price */}
      <span className="text-sm lg:text-base text-zinc-600 shrink-0">${item.book.price}</span>

      {/* Remove */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="text-zinc-300 hover:text-zinc-600 transition-colors disabled:opacity-40 shrink-0"
      >
         X
      </button>
    </li>
  );
}