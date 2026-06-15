"use server";

import { apiFetch } from "@/app/lib/api";
import { revalidatePath } from "next/cache";
import { CartResponse } from "../definitions";

export async function fetchCart(): Promise<CartResponse> {
  try {
    const res = await apiFetch("/cart");
    if (!res.ok) throw new Error("Failed to fetch cart");
    return await res.json();
  } catch (error) {
    console.error("Fetch cart error:", error);
    return { id: "", user_id: "", created_at: "", items: [] };
  }
}

export async function addToCart(bookId: string, quantity: number = 1) {
  try {
    const res = await apiFetch("/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_id: bookId, quantity }),
    });
    if (!res.ok) throw new Error("Failed to add to cart");
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Add to cart error:", error);
    return { success: false };
  }
}

export async function updateCartItem(itemId: string, quantity: number) {
  try {
    const res = await apiFetch(`/cart/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to update cart item");
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Update cart item error:", error);
    return { success: false };
  }
}

export async function removeFromCart(itemId: string) {
  try {
    const res = await apiFetch(`/cart/items/${itemId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove cart item");
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Remove from cart error:", error);
    return { success: false };
  }
}

export async function clearCart() {
  try {
    const res = await apiFetch("/cart", { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to clear cart");
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Clear cart error:", error);
    return { success: false };
  }
}