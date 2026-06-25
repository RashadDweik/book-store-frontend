"use server";

import { loginSchema } from "@/app/lib/schemas";
import { z } from "zod";
import { getInternalApiBaseUrl} from "@/app/lib/api";
import { redirect } from "next/navigation";
import { STATUS_MESSAGES , ActionState } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function loginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validated = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    const errors = {
      email: tree.properties?.email?.errors ?? [],
      password: tree.properties?.password?.errors ?? [],
    };

    return {
      success: false,
      message: "Please review your fields and try again",
      errors,
    };
  }

  try {
    const url = `${getInternalApiBaseUrl()}/auth/login`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: validated.data.email,
        password: validated.data.password,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        message: STATUS_MESSAGES[res.status] || "An unexpected error occurred",
      };
    }

    const body = await res.json();
    const cookieStore = await cookies();

    // 1. Save Access Token from JSON response body into HttpOnly cookie
    if (body.access_token) {
      cookieStore.set("access_token", body.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15, // 15 minutes matching access token lifetime
      });
    }

    // 2. Parse and save Refresh Token if provided by backend header set-cookie
    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      const parsedCookies = parse(setCookieHeader);
      const backendRefreshToken = parsedCookies["refresh_token"];

      if (backendRefreshToken) {
        cookieStore.set("refresh_token", backendRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: process.env.COOKIE_PATH || "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      }
    }

    redirect("/");

    return {
      success: true,
      message: "Logged in",
      errors: {},
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("Failed to login!", error);
    return {
      success: false,
      message: "A network error occurred, please try again!",
    };
  }
}