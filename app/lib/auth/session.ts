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
  } catch {
    return { isAuthenticated: false, user: null };
  }
});