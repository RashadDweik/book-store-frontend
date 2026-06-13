import { refreshTokens } from "@/app/lib/auth/refresh";
import { cookies } from "next/headers"; // Import native headers utility

export function getInternalApiBaseUrl() {
  const url = process.env.INTERNAL_API_BASE_URL;
  if (!url) throw new Error("INTERNAL_API_BASE_URL is not defined");
  return url;
};


async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? null;
}

export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  let token = await getToken();

  const res = await fetch(`${getInternalApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401) {
    const success = await refreshTokens();
    
    if (!success) {
      const cookieStore = await cookies();
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      throw new Error("SESSION_EXPIRED");
    }

    const updatedCookieStore = await cookies();
    const newToken = updatedCookieStore.get("access_token")?.value;

    return fetch(`${getInternalApiBaseUrl()}${path}`, {
      ...init,
      headers: {
        ...init?.headers,
        ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
      },
    });
  }

  return res;
}