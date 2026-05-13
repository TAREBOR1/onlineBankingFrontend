"use client";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);

      const expiryTime = decoded.exp * 1000;
      const timeLeft = expiryTime - Date.now();

      if (timeLeft <= 0) {
        handleLogout();
      } else {
        const timer = setTimeout(() => {
          handleLogout();
        }, timeLeft);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      handleLogout();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  return children;
}