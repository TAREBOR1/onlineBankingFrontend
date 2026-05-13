import api from "@/config/api";
import { AxiosError } from "axios";

export interface ApiError{
    success:false;
    message:string
}

export const requestCard = async (data: { accountId: string; brand: string; cardHolderName: string }) => {
  const res = await api.post("/api/cards/request", data);
  return res.data;
};

export const getMyCards = async () => {
  const res = await api.get("/api/cards/my-cards");
  return res.data; // Backend should return Card.find({ userId, status: 'active' })
};

export const toggleCardFreeze = async (cardId: string): Promise<{ 
  success: boolean; 
  message: string; 
  status: "active" | "blocked";
}> => {
  try {
    const res = await api.patch(`/api/cards/${cardId}/toggle-freeze`);
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};


export const revealCardDetails = async (cardId: string): Promise<{ 
  fullCardNumber: string; 
  cvv: string; 
  success: boolean 
}> => {
  try {
    const res = await api.get(`/api/cards/${cardId}/reveal`);
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};