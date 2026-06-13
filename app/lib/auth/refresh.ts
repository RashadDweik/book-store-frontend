"use server";

import { cookies } from "next/headers";
import { getInternalApiBaseUrl } from "@/app/lib/api";
import { parse } from "cookie";

export async function refreshTokens(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) return false;

  const res = await fetch(`${getInternalApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!res.ok) return false;

  const setCookieHeader = res.headers.get("set-cookie");
  if (setCookieHeader) {
    const parsedCookies = parse(setCookieHeader);
    const backendRefreshToken = parsedCookies["refresh_token"];

    if (backendRefreshToken) {
      cookieStore.set("refresh_token", backendRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }
  }

  const body = await res.json();
  const newAccessToken = body.access_token ?? null;

  if (newAccessToken) {
    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });
    return true;
  }

  return false;
}