import api from "@/config/api";
import { AxiosError } from "axios";

export interface ApiError {
  success: false;
  message: string;
}

export const updateProfile = async (formData: FormData): Promise<any> => {
  try {
    // Note: We use FormData here because we are sending files (images)
    const res = await api.patch("/api/profile/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};

export const getProfile = async (): Promise<any> => {
  try {
    const res = await api.get("/api/profile");
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};


export const changePassword = async (data: any): Promise<any> => {
  try {
    const res = await api.post("/api/profile/password", data);
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};

