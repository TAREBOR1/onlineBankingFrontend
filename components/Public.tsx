"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(payload,'make i see payload')

      router.replace(
        payload.role === "admin" ? "/admin" : "/dashboard"
      );
    } catch {
      localStorage.removeItem("userToken");
    }
  }, [router]);

  return <>{children}</>;
};