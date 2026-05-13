"use client";

import { 
  getMyNotifications, 
  markAsRead, 
  markAllAsRead, 
  Notification 
} from "@/service/notificationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Notifications
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    refetchInterval: 30000, // Optional: Poll every 30 seconds for new alerts
  });

  // 2. Mark Single as Read Mutation
  const markReadMutation = useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      // Optimistically update or just invalidate
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update notification");
    },
  });

  // 3. Mark All as Read Mutation
  const markAllReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: (res) => {
      toast.success(res.message || "All caught up!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Action failed");
    },
  });

  // Helper: Filter notifications by tab locally for better performance
  const getFilteredNotifications = (activeTab: string) => {
    if (!data?.notifications) return [];
    if (activeTab === "all") return data.notifications;
    return data.notifications.filter((n) => n.type === activeTab);
  };

  const unreadCount = data?.notifications?.filter(n => !n.isRead).length || 0;

  return {
    notifications: data?.notifications || [],
    getFilteredNotifications,
    unreadCount,
    isLoading,
    isError,
    markAsRead: markReadMutation.mutate,
    markAllAsRead: markAllReadMutation.mutate,
    isMarkingAll: markAllReadMutation.isPending
  };
};