"use client";

import { useEffect } from "react";

const ACCESS_TOKEN_LIFETIME_MS = 13 * 60 * 1000;

export default  function AuthRefresher() {

  useEffect(() => {
    const refresh = async () => {
      await fetch(`${process.env.INTERNAL_API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
    };

    const interval = setInterval(refresh, ACCESS_TOKEN_LIFETIME_MS);
    return () => clearInterval(interval);
  }, []);

  return null;
}