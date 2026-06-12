// lib/auth/session.ts
import { headers } from "next/headers";
import { cache } from "react";
import { apiFetch } from "@/app/lib/api";
import { User } from '@/app/lib/definitions'

export type Session = {
  isAuthenticated: false;
  user: null;
} | {
  isAuthenticated: true;
  user: User;
};

// apiFetch("/users/me") only runs once even if getSession() is called in 10 different server components
export const getSession = cache(async (): Promise<Session> => {
  const headerStore = await headers();
  const isAuthenticated = headerStore.get("x-is-authenticated") === "true";

  if (!isAuthenticated) return { isAuthenticated: false, user: null };

  const res = await apiFetch("/users/me");
  if (!res.ok) return { isAuthenticated: false, user: null };

  const user = await res.json();
  return { 
    isAuthenticated: true ,
    user: {
      name: user.full_name,
      email: user.email,
      role_id: user.role_id
    }
};
});