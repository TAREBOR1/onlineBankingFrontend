import api from "@/config/api";
import { AxiosError } from "axios";

export interface ApiError {
  success: false;
  message: string;
}

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: "transaction" | "security" | "system";
  isRead: boolean;
  metadata?: any;
  createdAt: string;
}

interface NotificationResponse {
  success: boolean;
  notifications: Notification[];
}

// GET ALL NOTIFICATIONS
export const getMyNotifications = async (): Promise<NotificationResponse> => {
  try {
    const res = await api.get("/api/notifications/getNotifications");
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};

// MARK SINGLE AS READ
export const markAsRead = async (notificationId: string): Promise<any> => {
  try {
    const res = await api.patch(`/api/notifications/${notificationId}/read`);
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};

// MARK ALL AS READ
export const markAllAsRead = async (): Promise<any> => {
  try {
    const res = await api.patch("/api/notifications/read-all");
    return res.data;
  } catch (err) {
    throw err as AxiosError<ApiError>;
  }
};