
import api from "@/config/api";
import { AxiosError } from "axios";


export interface ApiError{
    success:false;
    message:string
}


export const getDashBoard = async (): Promise<any | null> => {
    try {
       const res = await api.get("/api/dashboard/getDashBoard");
    return res.data.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};



