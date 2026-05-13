import { User } from "@/service/authService";

type JwtPayload = User;

export const useRole = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const payload: JwtPayload = JSON.parse(
      atob(token.split(".")[1])
    );
    return payload;
  } catch {
    return null;
  }
};