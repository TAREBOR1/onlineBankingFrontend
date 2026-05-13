import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllKycRequests, approveKyc, rejectKyc } from "@/service/adminKycService";
import toast from "react-hot-toast";

export const useAdminKyc = () => {
  const queryClient = useQueryClient();

  const kycQuery = useQuery({
    queryKey: ["admin", "kyc"],
    queryFn: getAllKycRequests,
  });

  const approveMutation = useMutation({
    mutationFn: approveKyc,
    onSuccess: (data) => {
      toast.success(data.message || "KYC Approved Successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "kyc"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] }); // Update global user table if needed
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to approve KYC");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectKyc,
    onSuccess: (data) => {
      toast.success(data.message || "KYC Rejected");
      queryClient.invalidateQueries({ queryKey: ["admin", "kyc"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reject KYC");
    },
  });

  return {
    kycRequests: kycQuery.data || [],
    isLoading: kycQuery.isLoading,
    approveKyc: approveMutation.mutate,
    isApproving: approveMutation.isPending,
    rejectKyc: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,
  };
};