"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { addToCart } from "@/app/lib/cart/actions";

interface CartButtonProps {
  bookId: string;
  isAvailable: boolean;
  isAuthenticated: boolean;
  stock: number;
}

export default function CartButton({ bookId, isAvailable, isAuthenticated, stock }: CartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  function increment() {
    setQuantity((q) => Math.min(q + 1, stock));
  }

  function decrement() {
    setQuantity((q) => Math.max(q - 1, 1));
  }

  async function handleAddToCart() {
    if (!isAuthenticated) {
      window.location.href = "/auth/login";
      return;
    }

    setLoading(true);
    const result = await addToCart(bookId, quantity);
    setLoading(false);

    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Qty</span>
        <div className="flex items-center border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={decrement}
            disabled={quantity <= 1 || !isAvailable}
            className="px-3 py-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-30"
          >
            <Minus size={12} />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            onClick={increment}
            disabled={quantity >= stock || !isAvailable}
            className="px-3 py-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-30"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!isAvailable || loading}
        className="w-full bg-zinc-900 text-white text-sm font-medium py-3 px-4 transition-colors duration-200 hover:bg-zinc-800 focus:outline-none disabled:bg-zinc-200 disabled:text-zinc-400 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"
      >
        {!isAvailable ? "Unavailable" : loading ? "Adding..." : added ? "Added to Cart ✓" : "Add to Cart"}
      </button>
    </div>
  );
}