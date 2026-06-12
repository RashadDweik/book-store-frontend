import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/account", "/settings"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const isAuthenticated = !!refreshToken;
  const path = req.nextUrl.pathname;

  // Redirect logged in users away from auth pages
  if (isAuthenticated && AUTH_ROUTES.some((r) => path.startsWith(r))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && PROTECTED_ROUTES.some((r) => path.startsWith(r))) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", path); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // Clone request headers to inject authentication state safely
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-is-authenticated", String(isAuthenticated));

  // Pass the updated request headers down to server components
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|public|_static).*)"],
};