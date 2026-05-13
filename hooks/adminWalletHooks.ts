import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWallets, createWallet, deleteWallet } from "@/service/adminWalletService";
import toast from "react-hot-toast";

export const useAdminWallets = () => {
  const queryClient = useQueryClient();

  const walletsQuery = useQuery({ queryKey: ["adminWallets"], queryFn: getWallets });

  const addMutation = useMutation({
    mutationFn: createWallet,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adminWallets"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to add wallet")
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWallet,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adminWallets"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to delete wallet")
  });

  return {
    wallets: walletsQuery.data?.wallets || [],
    isLoading: walletsQuery.isLoading,
    addWallet: addMutation.mutate,
    isAdding: addMutation.isPending,
    deleteWallet: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};