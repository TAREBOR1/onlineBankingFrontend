import api from "@/config/api";

export const getWallets = async () => (await api.get("/api/admin/wallet")).data;
export const createWallet = async (data: any) => (await api.post("/api/admin/wallet/add-wallet", data)).data;
export const deleteWallet = async (id: string) => (await api.delete(`/api/admin/wallet/remove-wallet/${id}`)).data;