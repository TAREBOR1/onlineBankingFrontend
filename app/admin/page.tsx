"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  Banknote, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  Clock,
  Search,
  BarChart3,
  ChevronRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  // Real-time stats fetching
  const { data: stats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => ({
      totalLiquidity: 12450000.00,
      activeUsers: 8420,
      pendingKYC: 12,
      failedTransactions: 5,
    })
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020202] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto space-y-8">
       
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase italic">Command Center</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              System Status: <span className="text-emerald-500">Optimal</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search global records..." className="pl-9 h-11 bg-white dark:bg-[#111113] border-none rounded-xl shadow-sm" />
            </div>
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 shadow-lg shadow-blue-500/20 transition-all active:scale-95">
              Live Logs
            </Button>
          </div>
        </div>

        {/* TOP METRICS GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Net Liquidity" 
            value={`$${stats?.totalLiquidity.toLocaleString()}`} 
            icon={<Banknote className="text-emerald-500" />} 
            trend="+12.5% vs Last Mo"
          />
          <MetricCard 
            title="Total Clients" 
            value={stats?.activeUsers.toLocaleString()} 
            icon={<Users className="text-blue-500" />} 
            trend="142 Onboarded Today"
          />
          <MetricCard 
            title="KYC Backlog" 
            value={stats?.pendingKYC} 
            icon={<ShieldAlert className="text-amber-500" />} 
            trend="Action Required"
            isAlert
          />
          <MetricCard 
            title="Critical Errors" 
            value={stats?.failedTransactions} 
            icon={<Activity className="text-rose-500" />} 
            trend="Last 24 Hours"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* TRANSACTION LEDGER (Main Content) */}
          <Card className="lg:col-span-2 border-none shadow-2xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-8 py-6 border-b border-slate-50 dark:border-white/5">
              <CardTitle className="text-lg font-black tracking-tight">System Ledger</CardTitle>
              <Button variant="ghost" className="text-xs font-bold text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl">
                Audit Trail
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-white/5">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest py-4">Participant</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">Category</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest">Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <TableRow key={i} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                      <TableCell className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">Alex Thompson</span>
                          <span className="text-[9px] font-mono text-muted-foreground tracking-tighter uppercase">ID: WT-90211-TX</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold border-slate-200 dark:border-white/10">
                          Transfer
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                           <span className="text-[11px] font-bold uppercase tracking-tight">Success</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-8 font-black dark:text-white">
                        $4,500.00
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* RIGHT SIDEBAR: KYC & SYSTEM STATUS */}
          <div className="space-y-6">
            <Card className="border-none shadow-2xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] p-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                Pending KYC <Clock size={16} className="text-amber-500" />
              </h3>
              <ScrollArea className="h-[320px] pr-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                          JD
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">John Doe</p>
                          <p className="text-[9px] text-muted-foreground mt-1 uppercase font-bold tracking-tight">Submitted 12m ago</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button className="w-full mt-8 rounded-2xl bg-slate-900 dark:bg-white dark:text-black font-black uppercase text-xs h-14 tracking-widest shadow-xl">
                Go to Verification
              </Button>
            </Card>

            <Card className="border-none shadow-2xl bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <BarChart3 size={32} />
                  <div>
                    <h4 className="text-xl font-black italic tracking-tighter">Real-time Analytics</h4>
                    <p className="text-xs opacity-80 leading-relaxed font-medium mt-1">
                      Platform traffic has surged by 24% in the last hour. Servers are scaling.
                    </p>
                  </div>
               </div>
               <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/10 rounded-full blur-[60px]" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Admin Metrics
function MetricCard({ title, value, icon, trend, isAlert }: any) {
  return (
    <Card className={cn(
        "border-none shadow-xl rounded-[2rem] p-7 transition-all hover:-translate-y-1 duration-300",
        isAlert ? "bg-amber-50 dark:bg-amber-500/5 border border-amber-200/50" : "bg-white dark:bg-[#0d0d0d]"
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-xl shadow-inner">
          {icon}
        </div>
        <span className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em]">{title}</span>
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-black dark:text-white tracking-tighter">{value}</h3>
        <p className={cn("text-[10px] font-bold uppercase tracking-tight", isAlert ? "text-amber-600" : "text-emerald-500")}>
            {trend}
        </p>
      </div>
    </Card>
  );
}