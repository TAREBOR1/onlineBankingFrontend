"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  BellRing, 
  Cpu, 
  Wrench, 
  Blocks,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function FeatureUnavailable() {
  const router = useRouter();
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    setNotified(true);
    // Add toast or API call here if needed in the future
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020202] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 text-center space-y-10">
        
        {/* ICON ANIMATION */}
        <div className="relative inline-block mx-auto">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-[3rem] bg-white dark:bg-[#0d0d0d] shadow-2xl flex items-center justify-center border border-slate-100 dark:border-white/5 relative z-10 overflow-hidden">
            {/* Inner rotating/pulsing background element */}
            <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
            <Blocks size={56} className="text-blue-600" />
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
            <Wrench size={20} />
          </div>
          <div className="absolute -bottom-2 -left-6 h-12 w-12 rounded-2xl bg-slate-900 dark:bg-white dark:text-black flex items-center justify-center shadow-lg">
            <Cpu size={20} />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-4 px-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-600/10 px-4 py-2 rounded-full">
            Deployment Pending
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase dark:text-white mt-6">
            Module Locked
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-md mx-auto leading-relaxed">
            This financial module is currently undergoing core architectural upgrades and is not yet deployed for live sessions. 
          </p>
        </div>

        {/* NOTIFICATION OPT-IN */}
        <Card className="p-2 border-none shadow-xl bg-white dark:bg-[#0d0d0d] rounded-[2rem] border border-slate-100 dark:border-white/5 max-w-md mx-auto">
          {notified ? (
            <div className="h-14 flex items-center justify-center gap-3 text-emerald-600 font-black uppercase text-[10px] tracking-widest bg-emerald-50 dark:bg-emerald-500/10 rounded-[1.5rem]">
              <CheckCircle2 size={16} /> Notification Protocol Active
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex gap-2">
              <div className="relative flex-1">
                <BellRing className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="Enter email for deployment alert..." 
                  required
                  className="pl-11 bg-slate-50 dark:bg-white/5 border-none h-14 rounded-[1.5rem] text-xs font-medium focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
              <Button type="submit" className="h-14 px-6 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-500/20 shrink-0">
                Notify Me
              </Button>
            </form>
          )}
        </Card>

        {/* NAVIGATION BACK */}
        <div className="pt-4">
          <Button 
            onClick={() => router.back()}
            variant="ghost" 
            className="h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] gap-3 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Command Center
          </Button>
        </div>

      </div>
    </div>
  );
}