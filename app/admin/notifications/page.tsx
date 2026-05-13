"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Bell, 
  BellRing, 
  ShieldAlert, 
  ArrowRightLeft, 
  Info, 
  CheckCircle2, 
  Trash2, 
  MoreHorizontal,
  Circle
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * NOTIFICATION PAGE
 * Logic: Filters notifications by Type (Transaction, Security, System)
 * Schema: Maps to your notificationSchema [userId, title, message, type, isRead]
 */

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState("all");

  // React Query fetch logic
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", activeTab],
    queryFn: () => mockNotifications, // Using mock data
  });

  // Icon selector based on Notification Type
  const getIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <ArrowRightLeft className="text-blue-500" />;
      case "security":
        return <ShieldAlert className="text-rose-500" />;
      case "system":
        return <Info className="text-amber-500" />;
      default:
        return <Bell className="text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight dark:text-white flex items-center gap-3">
              Inbox <BellRing className="text-blue-600 h-6 w-6" />
            </h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Manage your alerts and activity
            </p>
          </div>
          <Button variant="ghost" className="text-xs font-bold text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl">
            Mark all as read
          </Button>
        </div>

        {/* TAB FILTERS */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-[#111113] p-1 rounded-2xl h-14 shadow-sm border dark:border-slate-800">
            <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="transaction" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">Funds</TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">Security</TabsTrigger>
            <TabsTrigger value="system" className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white">System</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card className="border-none shadow-2xl bg-white dark:bg-[#111113] rounded-[2.5rem] overflow-hidden">
              <ScrollArea className="h-[600px]">
                <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {notifications?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                      <Bell className="h-12 w-12 mb-4" />
                      <p className="font-bold">No notifications yet</p>
                    </div>
                  ) : (
                    notifications?.map((notif, i) => (
                      <div 
                        key={i} 
                        className={`group flex items-start gap-4 p-6 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer relative ${!notif.isRead ? "bg-blue-50/30 dark:bg-blue-500/5" : ""}`}
                      >
                        {/* UNREAD INDICATOR */}
                        {!notif.isRead && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2">
                            <Circle className="h-2 w-2 fill-blue-600 text-blue-600" />
                          </div>
                        )}

                        {/* ICON */}
                        <div className="mt-1 h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          {getIcon(notif.type)}
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className={`text-sm tracking-tight ${!notif.isRead ? "font-black dark:text-white" : "font-bold text-slate-600 dark:text-slate-400"}`}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{notif.createdAt}</span>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                            {notif.message}
                          </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col items-end gap-2">
                           <DropdownMenu>
                            <DropdownMenuTrigger >
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl dark:bg-slate-900 border-slate-800">
                              <DropdownMenuItem className="text-xs gap-2">
                                <CheckCircle2 size={14} /> Mark as read
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs gap-2 text-rose-500">
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

        {/* SECURITY NOTE */}
        <div className="p-6 bg-blue-600 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <ShieldAlert size={20} />
            </div>
            <div>
              <p className="text-sm font-black italic">Security First</p>
              <p className="text-[10px] opacity-80 font-bold uppercase tracking-wider">Turn on Push Notifications for instant alerts</p>
            </div>
          </div>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border-none rounded-xl text-xs font-bold">
            Enable
          </Button>
        </div>
      </div>
    </div>
  );
}

// MOCK DATA (Matches your schema)
const mockNotifications = [
  {
    title: "Transfer Received",
    message: "You have received $2,500.00 from Alex Thompson. Your new balance is $24,560.00.",
    type: "transaction",
    isRead: false,
    createdAt: "2m ago"
  },
  {
    title: "New Device Login",
    message: "A new login was detected on an iPhone 15 Pro from Lagos, Nigeria. If this wasn't you, secure your account immediately.",
    type: "security",
    isRead: false,
    createdAt: "1h ago"
  },
  {
    title: "KYC Under Review",
    message: "Your document verification is currently being processed by our compliance team. Expect an update within 24 hours.",
    type: "system",
    isRead: true,
    createdAt: "Yesterday"
  },
  {
    title: "Card Payment",
    message: "Spent $12.99 at Netflix.com using your virtual Mastercard ending in 9012.",
    type: "transaction",
    isRead: true,
    createdAt: "2 days ago"
  }
];