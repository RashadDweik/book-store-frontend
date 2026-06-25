"use server";

import { apiFetch } from "@/app/lib/api";
import { revalidatePath } from "next/cache";
import { WishlistResponse } from "@/app/lib/definitions";

export async function toggleWishlist(
  isCurrentlyInWishlist: boolean,
  wishlistItemId?: string,
  bookId?: string
) {
  try {
    let res;

    if (isCurrentlyInWishlist) {
      // 1. To REMOVE: DELETE request with the WISHLIST_ITEM_ID in the path
      if (!wishlistItemId) throw new Error("Missing item ID for removal");
      res = await apiFetch(`/wishlist/items/${wishlistItemId}`, {
        method: "DELETE",
      });
    } else {
      // 2. To ADD: POST request to /items with the BOOK_ID in the body
      res = await apiFetch("/wishlist/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_id: bookId }),
      });
    }

    if (!res.ok) throw new Error("Failed to update wishlist");

    revalidatePath("/wishlist");
    revalidatePath(`/book/${bookId}`);
    return { success: true };
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    return { success: false, message: "Could not update wishlist" };
  }
}

export async function fetchWishlist(): Promise<WishlistResponse> {
  try {

    const res = await apiFetch("/wishlist");

    if (!res.ok) throw new Error("Failed to fetch wishlist");

    return await res.json();

  } catch (error) {
    console.error("Fetch wishlist error:", error);
    return { id: "", user_id: "", created_at: "", items: [] };
  }
}
