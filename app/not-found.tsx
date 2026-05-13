"use client";

import React from "react";
import { 
  ShieldAlert, 
  ArrowLeft, 
  Home, 
  Search, 
  Lock, 
  Cpu, 
  ChevronRight,
  LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Banking404() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl w-full relative z-10 text-center space-y-12">
        
        {/* ICON LOGIC */}
        <div className="relative inline-block">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-[3rem] bg-white dark:bg-[#111113] shadow-2xl flex items-center justify-center border border-slate-100 dark:border-white/5 relative z-10">
            <ShieldAlert size={64} className="text-blue-600 animate-pulse" />
          </div>
          {/* Decorative floating elements */}
          <div className="absolute -top-4 -right-4 h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg animate-bounce duration-1000">
            <Lock size={20} />
          </div>
          <div className="absolute -bottom-2 -left-6 h-10 w-10 rounded-xl bg-slate-900 dark:bg-white dark:text-black flex items-center justify-center shadow-lg">
            <Cpu size={18} />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter italic uppercase dark:text-white opacity-10">404</h1>
          <div className="space-y-2 -mt-8 md:-mt-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter dark:text-white">Endpoint Not Found</h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium max-w-md mx-auto">
              The requested asset or directory is currently outside of your authorized session scope. It may have been relocated or terminated.
            </p>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <Card 
            onClick={() => router.push("/dashboard")}
            className="p-6 border-none shadow-sm bg-white dark:bg-[#0c0c0e] hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all group rounded-[2rem] border border-slate-100 dark:border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Home size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest italic">Command Center</p>
                <p className="text-[10px] text-muted-foreground">Return to dashboard</p>
              </div>
              <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card 
            onClick={() => router.push("/support")}
            className="p-6 border-none shadow-sm bg-white dark:bg-[#0c0c0e] hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all group rounded-[2rem] border border-slate-100 dark:border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <LifeBuoy size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest italic">Internal Support</p>
                <p className="text-[10px] text-muted-foreground">Contact sys-admin</p>
              </div>
              <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            onClick={() => router.back()}
            variant="ghost" 
            className="h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] gap-2"
          >
            <ArrowLeft size={16} /> Previous Node
          </Button>
          <Button 
            onClick={() => router.push("/dashboard/search")}
            className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-[0.2em] gap-2 shadow-xl shadow-blue-600/20"
          >
            <Search size={16} /> Global Search
          </Button>
        </div>

        {/* SYSTEM FOOTER */}
        <div className="pt-12">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.4em] opacity-30">
            Node: {Math.random().toString(36).substring(7).toUpperCase()} • SSL Encrypted
          </p>
        </div>
      </div>
    </div>
  );
}