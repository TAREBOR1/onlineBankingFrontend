import { useQuery } from "@tanstack/react-query";
import { getPaginatedUsers } from "@/service/adminProfileService";

export const useAdminUsers = (page: number, limit: number, search: string) => {
  const usersQuery = useQuery({
    // Add page and search to the queryKey so it refetches when they change
    queryKey: ["admin", "users", page, limit, search],
    queryFn: () => getPaginatedUsers(page, limit, search),
    placeholderData: (previousData) => previousData, // Keeps old data visible while fetching the new page
  });

  return {
    users: usersQuery.data?.users || [],
    pagination: usersQuery.data?.pagination || { totalItems: 0, totalPages: 1, currentPage: 1 },
    isLoading: usersQuery.isLoading,
    isFetching: usersQuery.isFetching,
    isError: usersQuery.isError,
  };
};