import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestCard, getMyCards, toggleCardFreeze, revealCardDetails } from "@/service/cardService";
import toast from "react-hot-toast";

export const useCards = () => {
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: ["myCards"],
    queryFn: getMyCards,
  });

  const requestMutation = useMutation({
    mutationFn: requestCard,
    onSuccess: () => {
      toast.success("Card request submitted. Awaiting admin approval.");
      queryClient.invalidateQueries({ queryKey: ["myCards"] });
    },
    onError: (error: any) => toast.error(error.response?.data?.message || "Request failed"),
  });


  const toggleFreezeMutation = useMutation({
    mutationFn: (cardId: string) => toggleCardFreeze(cardId), // calls the toggleFreeze endpoint
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myCards"] });
    },
    onError: (error: any) => toast.error(error.response?.data?.message || "Action failed"),
  });

  const revealMutation = useMutation({
    mutationFn: (cardId: string) => revealCardDetails(cardId),
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Verification failed");
    },
  });

  return {
    cards: cardsQuery.data?.cards || [],
    isLoading: cardsQuery.isLoading,
    requestCard: requestMutation.mutate,
    isRequesting: requestMutation.isPending,
    toggleFreeze: toggleFreezeMutation.mutate,
    isToggling: toggleFreezeMutation.isPending,
    reveal: revealMutation.mutateAsync, // We use mutateAsync to handle the promise in the UI
    isRevealing: revealMutation.isPending,
  };
};