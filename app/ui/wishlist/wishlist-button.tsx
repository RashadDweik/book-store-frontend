"use client";

import { useState } from "react";
import { toggleWishlist } from "@/app/lib/wishlists/actions";

export default function WishlistButton({ itemId , bookId, initialStatus, isAuthenticated }: { itemId?: string, bookId?: string, initialStatus: boolean, isAuthenticated?: boolean }) {
  const [inWishlist, setInWishlist] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  
  const buttonDisabled = loading || !isAuthenticated;

  const handleToggle = async () => {
    setLoading(true);
    const result = await toggleWishlist(inWishlist , itemId,  bookId);
    if (result.success) setInWishlist(!inWishlist);
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={buttonDisabled}
      className={`w-full mt-4 py-3 text-sm font-medium border transition-colors disabled:opacity-40 disabled:cursor-ne-resize${
        inWishlist 
          ? "border-red-200 bg-red-50 text-red-600" 
          : "border-zinc-200 hover:bg-zinc-100"
      }`
    }
    >
      {loading ? "Updating..." : inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
}