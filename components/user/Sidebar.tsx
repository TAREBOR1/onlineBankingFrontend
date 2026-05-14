"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  Send,
  History,
  Settings,
  Shield,
  Bell,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ArrowDownToLine
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "@/redux/uiSlice";
import { useProfile } from "@/hooks/profileHooks";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Accounts", href: "/dashboard/accounts", icon: Wallet },
  { name: "Cards", href: "/dashboard/card", icon: CreditCard },
  { 
    name: "Transfer", 
    href: "/dashboard/transfer", 
    icon: Send,
    isDropdown: true,
    subItems: [
      { name: "Internal Transfer", href: "/dashboard/transfer" },
      { name: "Wire Transfer", href: "/dashboard/transfer/wire" },
    ]
  },
  { name: "Deposit", href: "/dashboard/deposit", icon:ArrowDownToLine },
  { name: "Transactions", href: "/dashboard/transactions", icon: History },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "KYC Verification", href: "/dashboard/kyc", icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: any) => state.ui);
  const [transferOpen, setTransferOpen] = useState(pathname.includes("/transfer"));

  const closeSidebar = () => dispatch(setSidebarOpen(false));
  const openSidebar = () => dispatch(setSidebarOpen(true));

  const {user,isLoading}=useProfile()
  const initials = `${user?.firstname?.[0] || ""}${user?.lastname?.[0] || ""}`.toUpperCase() 
  const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`
  .trim()
  .toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      {/* 1. FLOATING TOGGLE */}
      {!sidebarOpen && (
        <div className="fixed left-6 top-6 z-40 animate-in fade-in zoom-in duration-300">
          <Button
            variant="outline"
            size="icon"
            onClick={openSidebar}
            className="h-12 w-12 rounded-2xl border-none bg-white dark:bg-[#111113] shadow-xl hover:scale-110 transition-all group"
          >
            <PanelLeftOpen className="h-6 w-6 text-blue-600" />
          </Button>
        </div>
      )}

      {/* 2. OVERLAY BACKDROP (Mobile Only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm md:hidden transition-all"
          onClick={closeSidebar}
        />
      )}

      {/* 3. SIDEBAR DRAWER */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[60] flex flex-col bg-white dark:bg-[#0d0d0d] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-r border-slate-100 dark:border-white/5 shadow-2xl md:shadow-none h-screen",
          sidebarOpen ? "w-[300px] translate-x-0" : "w-[300px] -translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6 overflow-hidden">
          
          {/* Header Action (Fixed Height) */}
          <div className="flex-none mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center relative overflow-hidden shadow-lg border border-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-4 h-4 bg-white rounded-sm relative z-10" />
            </div>
            <span className="font-black text-[24px] tracking-tight text-slate-900">ModernBank</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl" onClick={closeSidebar}>
              <PanelLeftClose className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>

          {/* Navigation Items (The "Grow" Section) */}
          {/* flex-grow handles the "equal manner" height distribution on mobile */}
          <nav className="flex-grow space-y-2 overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));
              
              if (item.isDropdown) {
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => setTransferOpen(!transferOpen)}
                      className={cn(
                        "w-full flex items-center justify-between gap-4 rounded-2xl px-4 py-4 text-sm font-bold transition-all",
                        isActive && !transferOpen ? "bg-blue-600/10 text-blue-600" : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "")} />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", transferOpen && "rotate-180")} />
                    </button>
                    
                    <div className={cn(
                        "overflow-hidden transition-all duration-300 space-y-1 ml-4",
                        transferOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}>
                        {item.subItems?.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                                <Link key={sub.href} href={sub.href} onClick={() => window.innerWidth < 768 && closeSidebar()}>
                                    <div className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all",
                                        isSubActive ? "text-blue-600 bg-blue-50 dark:bg-blue-600/10" : "text-muted-foreground hover:text-slate-900 dark:hover:text-slate-200"
                                    )}>
                                        <ArrowRight size={14} className={isSubActive ? "opacity-100" : "opacity-0"} />
                                        {sub.name}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                  </div>
                );
              }

              return (
                <Link key={item.name} href={item.href} onClick={() => window.innerWidth < 768 && closeSidebar()}>
                  <div
                    className={cn(
                      "group flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-4 text-sm font-bold transition-all",
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "")} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer Section (Fixed to Bottom) */}
          <div className="flex-none mt-6 pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
        

            <Link href="/dashboard/profile" onClick={() => window.innerWidth < 768 && closeSidebar()}>
              <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-black text-xs shrink-0">{initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black dark:text-white leading-none truncate">{fullName}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1">Settings</p>
                </div>
                <Settings className="h-4 w-4 text-muted-foreground group-hover:rotate-90 transition-transform" />
              </div>
            </Link>
            
          </div>
        </div>
      </aside>
    </>
  );
}