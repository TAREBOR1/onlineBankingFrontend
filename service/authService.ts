
import api from "@/config/api";
import { AxiosError } from "axios";


export type KycStatus = "unverified" | "pending" | "verified" | "rejected";
export type Role = "admin" | "user"




export interface User {
  id: string;
  firstname: string;
  lastname:string;
  email: string;
  role:Role;
}
export interface Account {
  userId: string;
   accountNumber:string;
currency:string;
balance:number;
availableBalance:number;
status: string;
}

export interface UserProfile{
     firstname: string;
  lastname:string;
  email: string;
  phone:string;
  lastLogin:Date;
  isEmailVerifies:boolean;
   kycStatus: KycStatus;
   role:Role;
   updatedAt:Date;
}


export interface authResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
  account:Account;
}

export interface ApiError{
    success:false;
    message:string
}

// Input types
export interface RegisterInput {
firstname:string;
lastname:string;
email: string;
password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}





// Helper to save token
const saveToken = (token: string) => {
  localStorage.setItem("userToken", token);
};


export const register = async (data: RegisterInput): Promise<authResponse> => {
   try {
        const res = await api.post("/api/user/signup", data);
  const { token } = res.data;
  saveToken(token);
  return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};

export const login = async (data: LoginInput): Promise<authResponse> => {
    try {
         const res = await api.post("/api/user/login", data);
  const { token } = res.data;
  saveToken(token);
  return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
 
};

export const verify = async (): Promise<UserProfile | null> => {
    try {
       const res = await api.get("/api/user/verify");
    return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("userToken");
};


