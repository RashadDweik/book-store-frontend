"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Clear out both cookies synchronously on the server
  cookieStore.delete("refresh_token");
  cookieStore.delete("access_token");
  
  redirect("/");
}