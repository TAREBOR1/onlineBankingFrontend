import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllAccounts, toggleAccountStatus } from "@/service/adminAccountService";
import toast from "react-hot-toast";

export const useAdminAccounts = () => {
  const queryClient = useQueryClient();

  const accountsQuery = useQuery({
    queryKey: ["admin", "accounts"],
    queryFn: getAllAccounts,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleAccountStatus,
    onSuccess: (data) => {
      toast.success(data.message);
      // Immediately refresh the table data
      queryClient.invalidateQueries({ queryKey: ["admin", "accounts"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Action failed");
    },
  });

  return {
    accounts: accountsQuery.data?.accounts || [],
    totalLiquidity: accountsQuery.data?.totalLiquidity || 0,
    isLoading: accountsQuery.isLoading,
    toggleStatus: toggleStatusMutation.mutate,
    isToggling: toggleStatusMutation.isPending,
  };
};