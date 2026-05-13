"use client";

import { getTransactionHistory, transfer, TransactionQueryParams } from "@/service/transactionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useTransaction = (params?: Partial<TransactionQueryParams>) => {
  const queryClient = useQueryClient();

  // Query for fetching history
  const historyQuery = useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactionHistory(params as TransactionQueryParams),
    enabled: !!params?.accountId, // Only run if accountId exists
    placeholderData: (previousData) => previousData, // Smooth transition during pagination
  });

  const transferMutation = useMutation({
    mutationFn: transfer,
    onSuccess: (data) => {
      toast.success(data.message || "Transfer successful");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error transferring funds");
    },
  });

  return {
    history: historyQuery.data?.data || [],
    meta: {
      totalPages: historyQuery.data?.totalPages || 1,
      totalRecords: historyQuery.data?.totalRecords || 0,
      currentPage: historyQuery.data?.page || 1,
    },
    isLoading: historyQuery.isLoading,
    isFetching: historyQuery.isFetching,
    transfer: transferMutation,
  };
};