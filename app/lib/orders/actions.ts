"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api";
import { OrderRead } from "@/app/lib/definitions";
import { redirect } from "next/navigation";


export async function placeOrderAction(prevState: any, formData: FormData) {
  // 1. Call your FastAPI backend /orders/checkout endpoint
  // Ensure your fetch implementation handles the Auth token/cookies
  const response = await apiFetch(`/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    return { message: "Failed to place order. Please try again." };
  }

  const order = await response.json();

  // 2. Clear cart cache and redirect
  revalidatePath("/cart");
  redirect(`/orders/${order.id}`);
}


// Fetches the authenticated user's order history
export async function getOrders() : Promise<OrderRead[]> {
  try {
   
  const response = await apiFetch("/orders", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
  }
  catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Fetches a single order by ID
export async function getOrderById(orderId: string) : Promise<OrderRead> {
  const response = await apiFetch(`/orders/${orderId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Failed to fetch order");
  return response.json();
}

// Cancels a specific order and triggers inventory updates via the backend
export async function cancelOrderAction(orderId: string) : Promise<{ message: string }> {
  const response = await apiFetch(`/orders/${orderId}/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to cancel order");
  }

  // Refresh the order history page after cancellation
  revalidatePath("/orders");
  return response.json();
}