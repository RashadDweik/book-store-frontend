"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ActionState } from "@/app/lib/definitions";

/**
 * Placeholder action for updating profile settings.
 * Simulates a brief latency period and returns a neutral mock state.
 */
export async function updateProfileAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Extract inputs to verify form field bindings are configured correctly
  const name = formData.get("name");
  const email = formData.get("email");

  // Log incoming parameters purely for terminal visibility during development
  console.log("Mock updateProfileAction invoked with:", { name, email });

  // Simulate remote network database latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return a safe placeholder state that won't throw client-side runtime crashes
  return {
    success: true,
    message: "Profile configuration updated successfully (Mock State).",
  };
}

/**
 * Placeholder action for terminating current authentication sessions.
 */
export async function logoutAction(): Promise<void> {
  console.log("Mock logoutAction invoked.");

  // Simulate clear down latency before breaking request cycle
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Purge layout cache to ensure clean state initialization
  revalidatePath("/");
  
  // Bounce user immediately back to the initial auth landing page
  redirect("/login");
}