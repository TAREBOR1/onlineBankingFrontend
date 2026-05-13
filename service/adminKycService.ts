import api from "@/config/api";

export const getAllKycRequests = async () => {
  const res = await api.get("/api/admin/kyc/getAllKyc");
  return res.data;
};

export const approveKyc = async (id: string) => {
  const res = await api.patch(`/api/admin/kyc/${id}/approve`);
  return res.data;
};

export const rejectKyc = async (data: { id: string; reason: string }) => {
  const res = await api.patch(`/api/admin/kyc/${data.id}/reject`, { reason: data.reason });
  return res.data;
};