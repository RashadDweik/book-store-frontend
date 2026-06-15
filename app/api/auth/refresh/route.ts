import { getInternalApiBaseUrl } from "@/app/lib/api";
import { parse } from "cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  const match = cookieHeader
    ?.split(";")
    .find((c) => c.trim().startsWith("refresh_token="));
  const refreshToken = match ? match.trim().slice("refresh_token=".length) : null;

  if (!refreshToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = await fetch(`${getInternalApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const body = await res.json();
  const newAccessToken = body.access_token ?? null;

  if (!newAccessToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // Parse rotated refresh token from FastAPI set-cookie
  let newRefreshToken: string | null = null;
  const setCookieHeader = res.headers.get("set-cookie");
  if (setCookieHeader) {
    const parsed = parse(setCookieHeader);
    newRefreshToken = parsed["refresh_token"] ?? null;
  }

  const response = NextResponse.json({
    access_token: newAccessToken,
    refresh_token: newRefreshToken,
  });

  // Set cookies for AuthRefresher (browser calling directly)
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
}