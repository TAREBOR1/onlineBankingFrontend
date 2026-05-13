"use client";

import React, { useState } from "react";
import { 
  Bell, 
  BellRing, 
  ShieldAlert, 
  ArrowRightLeft, 
  Info, 
  CheckCircle2, 
  Trash2, 
  MoreHorizontal,
  Circle,
  Inbox
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/notificationHooks";
// import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { 
    getFilteredNotifications, 
    markAsRead, 
    markAllAsRead, 
    unreadCount, 
    isLoading,
    isMarkingAll 
  } = useNotifications();

  const notifications = getFilteredNotifications(activeTab);

  // Icon selector based on Notification Type
  const getIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <ArrowRightLeft className="text-blue-500 h-5 w-5" />;
      case "security":
        return <ShieldAlert className="text-rose-500 h-5 w-5" />;
      case "system":
        return <Info className="text-amber-500 h-5 w-5" />;
      default:
        return <Bell className="text-slate-500 h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight dark:text-white flex items-center gap-3">
              Inbox <BellRing className={`${unreadCount > 0 ? "text-blue-600 animate-pulse" : "text-slate-400"} h-6 w-6`} />
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                Activity & Alerts
              </p>
              {unreadCount > 0 && (
                <Badge className="bg-blue-600 hover:bg-blue-600 h-5 px-1.5 text-[10px] rounded-full">
                  {unreadCount} New
                </Badge>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            disabled={unreadCount === 0 || isMarkingAll}
            onClick={() => markAllAsRead()}
            className="text-xs font-bold text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl"
          >
            {isMarkingAll ? "Updating..." : "Mark all as read"}
          </Button>
        </div>

        {/* TAB FILTERS */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-[#111113] p-1 rounded-2xl h-14 shadow-sm border dark:border-slate-800">
            <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all font-bold text-xs">All</TabsTrigger>
            <TabsTrigger value="transaction" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all font-bold text-xs">Funds</TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all font-bold text-xs">Security</TabsTrigger>
            <TabsTrigger value="system" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all font-bold text-xs">System</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 outline-none">
            <Card className="border-none shadow-2xl bg-white dark:bg-[#111113] rounded-[2.5rem] overflow-hidden">
              <ScrollArea className="h-[calc(100vh-320px)] min-h-[500px]">
                <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <div key={i} className="p-6 flex gap-4">
                        <Skeleton className="h-12 w-12 rounded-2xl shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-3 w-full" />
                        </div>
                      </div>
                    ))
                  ) : notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center opacity-30">
                      <Inbox className="h-16 w-16 mb-4" />
                      <p className="font-bold text-lg">No notifications yet</p>
                      <p className="text-sm">We'll notify you when something happens.</p>
                    </div>
                  ) : (
                    notifications.map((notif: any) => (
                      <div 
                        key={notif._id} 
                        onClick={() => !notif.isRead && markAsRead(notif._id)}
                        className={`group flex items-start gap-4 p-6 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer relative ${!notif.isRead ? "bg-blue-50/40 dark:bg-blue-600/5" : ""}`}
                      >
                        {/* UNREAD INDICATOR DOT */}
                        {!notif.isRead && (
                          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                            <Circle className="h-2 w-2 fill-blue-600 text-blue-600" />
                          </div>
                        )}

                        {/* ICON BOX */}
                        <div className="mt-1 h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          {getIcon(notif.type)}
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 space-y-1 pr-2">
                          <div className="flex justify-between items-start">
                            <h4 className={`text-sm tracking-tight leading-none ${!notif.isRead ? "font-black text-slate-900 dark:text-white" : "font-semibold text-slate-500 dark:text-slate-400"}`}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap ml-2">
                              {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed line-clamp-2 ${!notif.isRead ? "text-slate-700 dark:text-slate-200 font-medium" : "text-muted-foreground"}`}>
                            {notif.message}
                          </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col items-end shrink-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl dark:bg-slate-900 border-slate-800">
                              {!notif.isRead && (
                                <DropdownMenuItem onClick={() => markAsRead(notif._id)} className="text-xs gap-2 font-semibold">
                                  <CheckCircle2 size={14} className="text-emerald-500" /> Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-xs gap-2 text-rose-500 font-semibold">
                                <Trash2 size={14} /> Delete Alert
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>
        </Tabs>

        {/* PROMO / SECURITY FOOTER */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
              <ShieldAlert size={24} />
            </div>
            <div>
              <p className="text-sm font-black tracking-tight">Push Notifications</p>
              <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">Never miss a transaction alert</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-xl px-6 h-10 shadow-lg">
            Enable
          </Button>
        </div>
      </div>
    </div>
  );
}