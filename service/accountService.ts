
import api from "@/config/api";
import { AxiosError } from "axios";


export interface ApiError{
    success:false;
    message:string
}


export const getMyAccount = async (): Promise<any | null> => {
    try {
       const res = await api.get("/api/account/getMyAccount");
    return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};



