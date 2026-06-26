"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { updateCartItem, removeFromCart } from "@/app/lib/cart/actions";
import { CartItem } from "@/app/lib/definitions";

export function CartItemRow({ item }: { item: CartItem }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  async function handleQuantityChange(newQuantity: number) {
    if (newQuantity < 1) return;
    setLoading(true);
    setQuantity(newQuantity);
    await updateCartItem(item.id, newQuantity);
    setLoading(false);
  }

  async function handleRemove() {
    setLoading(true);
    await removeFromCart(item.id);
    setLoading(false);
  }

  return (
    <li
      className={`flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-4 sm:py-5 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 transition-opacity ${loading ? "opacity-40" : ""}`}
    >
      {/* Cover */}
      <div className="relative w-10 h-16 sm:w-12 sm:h-20 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
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
        <Link href={`/books/${item.book.id}`} className="group/title inline-block max-w-full">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate group-hover/title:underline underline-offset-2">
            {item.book.title}
          </h2>
        </Link>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
          {item.book.authors?.map((a) => a.name).join(", ")}
        </p>
      </div>

      {/* Quantity stepper */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={loading || quantity <= 1}
          className="text-zinc-300 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-30"
        >
          <Minus size={13} />
        </button>
        <span className="text-xs font-mono w-4 text-center text-zinc-900 dark:text-zinc-100 tabular-nums">
          {quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={loading}
          className="text-zinc-300 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-30"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* Line total */}
      <span className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100 shrink-0 w-16 text-right">
        ${(parseFloat(item.book.price) * quantity).toFixed(2)}
      </span>

      {/* Remove */}
      <button
        onClick={handleRemove}
        disabled={loading}
        aria-label="Remove from cart"
        className="shrink-0 text-zinc-300 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-40"
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </li>
  );
}