import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPendingDeposits, processDeposit } from "@/service/adminDepositService";
import toast from "react-hot-toast";

export const useAdminDeposits = () => {
  const queryClient = useQueryClient();

  const pendingQuery = useQuery({ queryKey: ["adminDeposits"], queryFn: getPendingDeposits });

  const processMutation = useMutation({
    mutationFn: processDeposit,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adminDeposits"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Action failed")
  });

  return {
    pendingDeposits: pendingQuery.data?.deposits || [],
    isLoading: pendingQuery.isLoading,
    processRequest: processMutation.mutate,
    isProcessing: processMutation.isPending
  };
};