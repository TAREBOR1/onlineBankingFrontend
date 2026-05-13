import api from "@/config/api";
import { AxiosError } from "axios";

export interface ApiError {
  success: false;
  message: string;
}

export const submitKYC = async (formData: FormData): Promise<any> => {
  try {
    // Note: We use FormData here because we are sending files (images)
    const res = await api.post("/api/kyc/submit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};

export const getMyKYC = async (): Promise<any> => {
  try {
    const res = await api.get("/api/kyc/getKyc");
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};