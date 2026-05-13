import api from "@/config/api";

export const getPendingDeposits = async () => (await api.get("/api/admin/transaction/pending-deposit")).data;
export const processDeposit = async (data: { id: string; action: string; adjustedAmount?: number; note?: string }) => 
  (await api.patch(`/api/admin/transaction/process-deposit/${data.id}`, data)).data;