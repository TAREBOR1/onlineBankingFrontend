"use client";

import { submitKYC, getMyKYC } from "@/service/kycService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useKYC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const kycQuery = useQuery({
    queryKey: ["myKYC"],
    queryFn: getMyKYC,
    retry: false,
  });

  const submitMutation = useMutation({
    mutationFn: submitKYC,
    onSuccess: (data) => {
      toast.success(data.message || "KYC Submitted for review!");
      queryClient.invalidateQueries({ queryKey: ["myKYC"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      queryClient.invalidateQueries({ queryKey: ["auth"]}); 
      router.push("/dashboard"); // Redirect after success
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to submit KYC");
    },
  });

  return {
    kycData: kycQuery.data,
    isLoading: kycQuery.isLoading,
    submitKYC: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
  };
};