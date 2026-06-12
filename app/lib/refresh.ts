"use server";

import { cookies } from "next/headers";
import { getInternalApiBaseUrl } from "@/app/lib/api";

export async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) return null;

  const res = await fetch(`${getInternalApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!res.ok) return null;

  const body = await res.json();
  return body.accessToken ?? null;
}