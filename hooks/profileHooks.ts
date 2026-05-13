import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, changePassword } from "@/service/profileService";
import toast from "react-hot-toast";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile Updated");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Update failed")
  });

  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => toast.success("Security updated successfully"),
    onError: (err: any) => toast.error(err.response?.data?.message || "Change failed")
  });

  return {
    user: profileQuery.data?.user,
    isLoading: profileQuery.isLoading,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    changePassword: passwordMutation.mutate,
    isChangingPass: passwordMutation.isPending
  };
};