import api from "@/config/api";
import { AxiosError } from "axios";

export interface ApiError {
  success: boolean;
  message: string;
}

export const getPendingCardRequests = async () => {
  const res = await api.get("/api/admin/cards/pending");
  return res.data; // { success: true, cards: [] }
};

export const approveCardRequest = async (cardId: string) => {
  const res = await api.patch(`/api/admin/cards/approve/${cardId}`);
  return res.data;
};

export const declineCardRequest = async (cardId: string) => {
  const res = await api.delete(`/api/admin/cards/decline/${cardId}`);
  return res.data;
};