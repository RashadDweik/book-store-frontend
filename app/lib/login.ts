"use server";

import { loginSchema } from "./schemas";
import { z } from "zod";
import { getInternalApiBaseUrl, ActionState } from "@/app/lib/api";
import { redirect } from "next/navigation";
import { STATUS_CODES } from "http";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function loginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  //validate login input fields with zod schemas
  const validated = loginSchema.safeParse(Object.fromEntries(formData));

  //handle invalid input values
  if (!validated.success) {
    //error tree
    const tree = z.treeifyError(validated.error);

    //extract errors from tree
    const errors = {
      email: tree.properties?.email?.errors ?? [],
      password: tree.properties?.password?.errors ?? [],
    };

    //return input validation error
    return {
      success: false,
      message: "Please review your fields and try again",
      errors,
    };
  }

  try {
    //define backend Url
    const url = `${getInternalApiBaseUrl()}/auth/login`;

    //call endpoint
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      //URLSearchParams returns application/x-www-form-urlencoded
      body: new URLSearchParams({
        username: validated.data.email,
        password: validated.data.password,
      }),
    });

    //handle api errors
    if (!res.ok) {
      return {
        success: false,
        message: STATUS_CODES[res.status] || "An unexpected error occured",
      };
    }

    //no errors , get the body for access token extraction
    const body = await res.json();

    //boolean that checks cookie existence
    const setCookieHeader = res.headers.get("set-cookie");

    if (setCookieHeader) {
      const cookieStore = await cookies();

      // Parse the token out of the backend's Set-Cookie header string
      const parsedCookies = parse(setCookieHeader);
      const backendRefreshToken = parsedCookies["refresh_token"];

      if (backendRefreshToken) {
        cookieStore.set("refresh_token", backendRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: process.env.COOKIE_PATH,
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      }
    }

    redirect("/");

    return {
      success: true,
      message: "Logged in",
      accessToken: body.accessToken,
      errors: {},
    };
  } catch (error) {

    //check for NEXT_REDIRECT error so its not swallowed by catch block
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    //log error
    console.error("Failed to login!", error);

    //return failure
    return {
      success: false,
      message: "A network error occurred, please try again!",
    };
  }
}