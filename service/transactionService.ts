import api from "@/config/api";
import { AxiosError } from "axios";

export interface ApiError {
  success: false;
  message: string;
}

// Interfaces for better Type Safety
export interface TransactionQueryParams {
  accountId: string;
  page?: number;
  limit?: number;
  type?: string;
  searchTerm?: string;
}

export const transfer = async (data: any): Promise<any> => {
  try {
    const res = await api.post("/api/transaction/transfer", data);
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};

export const getTransactionHistory = async ({
  accountId,
  page = 1,
  limit = 10,
  type,
}: TransactionQueryParams): Promise<any> => {
  try {
    // Construct query string for filters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(type && type !== "all" && { type }),
    });

    const res = await api.get(`/api/transaction/history/${accountId}?${queryParams}`);
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};