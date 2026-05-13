"use client";

import { Menu, Moon, Sun, Bell, Inbox } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "@/redux/uiSlice";
import { useNotifications } from "@/hooks/notificationHooks";
import { useProfile } from "@/hooks/profileHooks";


export function Header() {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: any) => state.ui);
  
  // Hooks for data
  const { notifications, unreadCount, markAsRead, isLoading } = useNotifications();
  const { user } = useProfile(); 

  const recentNotifications = notifications.slice(0, 5);
  
  // Safely extract initials
  const initials = `${user?.firstname?.[0] || ""}${user?.lastname?.[0] || ""}`.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-lg"
          onClick={() => dispatch(setSidebarOpen(true))}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Desktop search (Currently hidden/commented in your original) */}
        <div className="hidden md:flex md:flex-1">
           {/* Space reserved for search */}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
     
          <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
          <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button variant="ghost" size="icon" className="relative rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold border-2 border-white dark:border-[#0a0a0b]">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 rounded-2xl p-0 shadow-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111113]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h4 className="font-bold text-sm tracking-tight">Notifications</h4>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-blue-50 dark:bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">
                  {unreadCount} New
                </span>
              )}
            </div>

            <div className="max-h-[380px] overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
                  Loading alerts...
                </div>
              ) : recentNotifications.length === 0 ? (
                <div className="p-10 text-center flex flex-col items-center justify-center gap-2">
                  <Inbox className="h-8 w-8 text-slate-300" />
                  <p className="text-xs font-medium text-slate-400">All caught up!</p>
                </div>
              ) : (
                recentNotifications.map((notif) => (
                  <DropdownMenuItem 
                    key={notif._id}
                    onClick={() => !notif.isRead && markAsRead(notif._id)}
                    className={`flex flex-col items-start gap-1 p-4 cursor-pointer border-b border-slate-50 dark:border-slate-800 last:border-0 focus:bg-slate-50 dark:focus:bg-slate-800/50 ${
                      !notif.isRead ? "bg-blue-50/20 dark:bg-blue-500/5" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className={`text-sm ${!notif.isRead ? "font-bold text-slate-900 dark:text-white" : "font-medium text-slate-600 dark:text-slate-400"}`}>
                        {notif.title}
                      </p>
                      {!notif.isRead && <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                    </p>
                  </DropdownMenuItem>
                ))
              )}
            </div>

            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <Link href="/dashboard/notifications" className="w-full">
                <Button variant="ghost" className="w-full text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl">
                  View all activity
                </Button>
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Avatar Link */}
        <Link href="/dashboard/profile" className="ml-1 md:ml-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors h-10 w-10">
            <Avatar className="h-9 w-9 border-2 border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:scale-105">
              <AvatarImage src={user?.avatar} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </Link>
        
      </div>
    </header>
  );
}
