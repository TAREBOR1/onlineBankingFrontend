import api from "@/config/api";

export const getPaginatedUsers = async (page: number, limit: number, search: string) => {
  const res = await api.get("/api/admin/profile/allUsers", {
    params: { page, limit, search }
  });
  return res.data;
};