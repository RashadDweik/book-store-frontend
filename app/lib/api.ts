import { tokenStore } from "@/app/lib/token";
import { refreshAccessToken } from "@/app/lib/refresh";

//export getter instead of const
export const getInternalApiBaseUrl = () => {
  const url = process.env.INTERNAL_API_BASE_URL;
  if (!url) throw new Error("INTERNAL_API_BASE_URL is not defined");
  return url;
};


//status codes and corrsponding messages
export const STATUS_MESSAGES: Record<number, string> = {
        400: "Invalid Input Data",
        404: "Authentication service unavailable (404).",
        409: "An account with this email already exists.",
        500: "Internal server error. Please try again later.",
        401: "Invalid email or password",
        403: "Access Denied"
      };


//interface used by useActionState react hook on login and signup pages
export interface ActionState {
  success?: boolean;
  message: string;
  accessToken? : string;
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}


//utility function to get access token from cookie
async function getToken(): Promise<string | null> {
  let token = tokenStore.get();

  if (!token) {
    token = await refreshAccessToken();
    if (token) tokenStore.set(token);
  }

  return token;
}


//api fetching for authenticated route
export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const token = await getToken();

  const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // Token expired mid-session — refresh once and retry
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      tokenStore.clear();
      throw new Error("SESSION_EXPIRED");
    }

    tokenStore.set(newToken);

    return fetch(`${process.env.INTERNAL_API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res;
}