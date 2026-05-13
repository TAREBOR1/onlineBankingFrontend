import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingCardRequests, approveCardRequest, declineCardRequest } from "@/service/adminCardService";
import { toast } from "react-hot-toast";

export const useAdminCards = () => {
  const queryClient = useQueryClient();

  const pendingQuery = useQuery({
    queryKey: ["admin", "pendingCards"],
    queryFn: getPendingCardRequests,
  });

  const approveMutation = useMutation({
    mutationFn: approveCardRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Card issued successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "pendingCards"] });
    },
    onError: (error: any) => toast.error(error.response?.data?.message || "Approval failed"),
  });

  const declineMutation = useMutation({
    mutationFn: declineCardRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Request declined");
      queryClient.invalidateQueries({ queryKey: ["admin", "pendingCards"] });
    },
    onError: (error: any) => toast.error(error.response?.data?.message || "Decline failed"),
  });

  return {
    pendingRequests: pendingQuery.data?.cards || [],
    isLoading: pendingQuery.isLoading,
    approveRequest: approveMutation.mutate,
    isApproving: approveMutation.isPending,
    declineRequest: declineMutation.mutate,
    isDeclining: declineMutation.isPending,
  };
};