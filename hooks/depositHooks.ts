import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDepositWallets, submitDeposit } from "@/service/depositService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useUserDeposit = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const walletsQuery = useQuery({
    queryKey: ["depositWallets"],
    queryFn: getDepositWallets,
  });

  const submitMutation = useMutation({
    mutationFn: submitDeposit,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push("/dashboard"); // Redirect back to dashboard on success
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to submit deposit");
    },
  });

  return {
    wallets: walletsQuery.data?.wallets || [],
    isLoadingWallets: walletsQuery.isLoading,
    submitDeposit: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
  };
};