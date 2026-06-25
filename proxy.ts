import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/account",
  "/settings",
  "/wishlist",
  "/cart",
  "/orders",
];
const AUTH_ROUTES = ["/auth/login", "/auth/signup"];

export async function proxy(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const accessToken = req.cookies.get("access_token")?.value;
  const path = req.nextUrl.pathname;
  const isAuthenticated = !!refreshToken;
  const isPageRequest = req.headers.get("accept")?.includes("text/html");

  if (isAuthenticated && AUTH_ROUTES.some((r) => path.startsWith(r))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && PROTECTED_ROUTES.some((r) => path.startsWith(r))) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-is-authenticated", String(isAuthenticated));

  if (refreshToken && !accessToken && isPageRequest) {
    const refreshRes = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (refreshRes.ok) {
      const body = await refreshRes.json();
      const newAccessToken = body.access_token;
      const newRefreshToken = body.refresh_token;

      requestHeaders.set("x-access-token", newAccessToken);

      const response = NextResponse.next({ request: { headers: requestHeaders } });

      // Set cookies explicitly — don't forward route handler set-cookie headers
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      if (newRefreshToken) {
        response.cookies.set("refresh_token", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      return response;
    } else {
      const loginUrl = new URL("/auth/login", req.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)",],
};