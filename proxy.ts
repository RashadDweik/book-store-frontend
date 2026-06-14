import { parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/account",
  "/settings",
  "/wishlist",
  "/cart",
];
const AUTH_ROUTES = ["/auth/login", "/auth/signup"];

export async function proxy(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const accessToken = req.cookies.get("access_token")?.value;
  const path = req.nextUrl.pathname;
  const isAuthenticated = !!refreshToken;

  // Only process page navigations, not assets or API calls
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

  // If refresh token exists but access token is missing, refresh here
  if (refreshToken && !accessToken && isPageRequest){

    console.log("Token being sent to FastAPI:", refreshToken);
    console.log("Token length:", refreshToken?.length);

    const refreshRes = await fetch(
      'http://localhost:8000/api/v1/auth/refresh',
      {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      },
    );

    console.log("refreshRes status:", refreshRes.status);
    const setCookie = refreshRes.headers.get("set-cookie");
    console.log("set-cookie from route handler:", setCookie);

    if (refreshRes.ok) {
      const body = await refreshRes.json();
      const newAccessToken = body.access_token;

      // Inject the new token into the request headers for server components
      requestHeaders.set("x-access-token", newAccessToken);

      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });

      // Set cookies on the response
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      // Forward rotated refresh token if backend returned one
      const setCookie = refreshRes.headers.get("set-cookie");
      if (setCookie) {
        const parsed = parse(setCookie);
        const newRefreshToken = parsed["refresh_token"];
        if (newRefreshToken) {
          response.cookies.set("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      }

      return response;
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
