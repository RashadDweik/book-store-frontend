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
        <Link href={`/books/${item.book.id}`} className="hover:underline underline-offset-2">
          <h2 className="font-medium text-sm lg:text-base truncate">{item.book.title}</h2>
        </Link>
        <p className="text-xs lg:text-sm text-zinc-400 mt-0.5 truncate">
          {item.book.authors?.map((a) => a.name).join(", ")}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={loading || quantity <= 1}
          className="text-zinc-400 hover:text-zinc-600 transition-colors disabled:opacity-30"
        >
          <Minus size={14} />
        </button>
        <span className="text-sm w-4 text-center">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={loading}
          className="text-zinc-400 hover:text-zinc-600 transition-colors disabled:opacity-30"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Price */}
      <span className="text-sm lg:text-base text-zinc-600 shrink-0">
        ${(parseFloat(item.book.price) * quantity).toFixed(2)}
      </span>

      {/* Remove */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="text-zinc-300 hover:text-zinc-600 transition-colors disabled:opacity-40 shrink-0"
      >
        <X size={16} />
      </button>
    </li>
  );
}