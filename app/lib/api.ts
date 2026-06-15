import { cookies } from "next/headers";
import { headers } from "next/headers";

export function getInternalApiBaseUrl() {
  const url = process.env.INTERNAL_API_BASE_URL;
  if (!url) throw new Error("INTERNAL_API_BASE_URL is not defined");
  return url;
}

async function getTokenAccess(): Promise<string | null> {
  const headersList = await headers();
  // Middleware injects this after a refresh
  const injected = headersList.get("x-access-token");
  if (injected) return injected;
  // Otherwise read from cookie (still valid, no refresh was needed)
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? null;
}

export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const token = await getTokenAccess();

  const res = await fetch(`${getInternalApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401) {
      return new Response(JSON.stringify({ detail: "Session expired" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return res;
}

