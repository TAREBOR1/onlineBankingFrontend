import api from "@/config/api";

export const getAllAccounts = async () => {
  const res = await api.get("/api/admin/account");
  return res.data;
};

export const toggleAccountStatus = async (accountId: string) => {
  const res = await api.patch(`/api/admin/account/${accountId}/toggle-status`);
  return res.data;
};