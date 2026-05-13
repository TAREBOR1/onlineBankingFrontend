import api from "@/config/api";

export const getDepositWallets = async () => {
  const res = await api.get("/api/transaction/wallets");
  return res.data;
};

// We use FormData because we are uploading a receipt image
export const submitDeposit = async (formData: FormData) => {
  const res = await api.post("/api/transaction/deposit-request", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};