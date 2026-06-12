// app/lib/session.ts
import { cookies } from "next/headers";
import { cache } from "react";
import { apiFetch } from "@/app/lib/api";
import { User } from '@/app/lib/definitions';

export type Session = 
  | { isAuthenticated: false; user: null } 
  | { isAuthenticated: true; user: User };

/**
 * Fetches the current user session from the FastAPI backend.
 * React cache ensures that even if this is called in multiple Server Components
 * across the same request layout tree, the backend endpoint is only hit once.
 */
export const getSession = cache(async (): Promise<Session> => {
  try {
    const cookieStore = await cookies();
    const hasAccessToken = cookieStore.has("access_token");
    const hasRefreshToken = cookieStore.has("refresh_token");

    // Optimization: If both cookies are missing, skip the network round-trip entirely
    if (!hasAccessToken && !hasRefreshToken) {
      return { isAuthenticated: false, user: null };
    }

    // apiFetch automatically handles appending the token or running a silent refresh
    const res = await apiFetch("/users/me");
    
    if (!res.ok) {
      return { isAuthenticated: false, user: null };
    }

    const user = await res.json();
    
    return {
      isAuthenticated: true,
      user: {
        name: user.full_name,
        email: user.email,
        role_id: user.role_id,
      },
    };
  } catch (error) {
    // Gracefully catches network dropped errors or the SESSION_EXPIRED exception from apiFetch
    console.error("Session verification failed:", error);
    return { isAuthenticated: false, user: null };
  }
});