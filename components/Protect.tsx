
"use client";

import { useRole } from "@/hooks/roleHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


type Role = "user" | "admin";

export const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: Role;
}) => {
  const router = useRouter();
  const user = useRole();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
      return;
    }

    if (user.role !== allowedRole) {
      router.replace(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [user, router, allowedRole]);

  // Prevent flicker
  if (!user || user.role !== allowedRole) return null;

  return <>{children}</>;
};


