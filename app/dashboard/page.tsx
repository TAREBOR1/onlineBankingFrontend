"use client";

import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Plus, 
  Send, 
  Zap, 
  ShieldCheck,
  History,
  Smartphone,
  Copy,
  Clock,
  Wallet,
  Lock,
  ChevronRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { useDashboard } from "@/hooks/dashboardHooks";
import { useAuth } from "@/hooks/loginHooks";
import { useRouter } from "next/navigation";


export default function BankingDashboard() {
  const { dashboard, isLoading } = useDashboard();
  const { user } = useAuth();
  const router = useRouter();

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const formatDateTime = (date: Date | string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) return <DashboardSkeleton />;

  // Logic helpers
  const primaryAccount = dashboard?.accounts?.[0];
  
  // TECHNICAL INTEGRATION: Check if card exists in the dashboard response
  // Assuming your backend adds the card object to the dashboard response
  const activeCard = dashboard?.cards[0]; 
  const hasCard = !!activeCard;

  console.log(dashboard,'make i seee dashboard')
  console.log(activeCard,'makwe i see active card')
  
  // KYC check
  const isVerified = user?.kycStatus === "verified";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] transition-colors duration-300">
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">


        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                Welcome, {user?.firstname || "User"}
              </h2>
              <Badge 
                variant={isVerified ? "default" : "outline"} 
                className={`text-[10px] uppercase ${isVerified ? 'bg-emerald-500 hover:bg-emerald-600' : 'border-amber-200 text-amber-600'}`}
              >
                {isVerified ? "Verified Account" : "Verification Required"}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <p className="text-xs">System Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => router.push('/dashboard/deposit')} className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Plus className="mr-2 h-4 w-4" /> Deposit
            </Button>
          </div>
        </div>

        {/* MAIN TOP SECTION */}
        <div className="grid gap-6 md:grid-cols-12">
          
          {/* BALANCE CARD */}
          <Card className="md:col-span-8 overflow-hidden border-none bg-slate-900 dark:bg-zinc-950 text-white shadow-2xl relative group">
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                  <p className="text-xs font-medium opacity-50 uppercase tracking-widest">Available Balance</p>
                  <h3 className="text-5xl md:text-6xl font-bold tracking-tighter">
                    {primaryAccount?.currency === "USD" ? "$" : "₦"}
                    {primaryAccount?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "0.00"}
                  </h3>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] opacity-40 uppercase font-bold text-blue-400">Account Type</p>
                    <span className="text-sm font-medium">Standard Savings</span>
                  </div>
                  <div className="w-[1px] bg-white/10" />
                  <div className="space-y-1">
                    <p className="text-[10px] opacity-40 uppercase font-bold text-emerald-400">Status</p>
                    <span className="text-sm font-medium capitalize">{primaryAccount?.status || "Active"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => router.push('/dashboard/transfer')} size="sm" variant="secondary" className="rounded-xl gap-2 bg-white/10 hover:bg-white/20 text-white border-none">
                    <Send className="h-4 w-4" /> Transfer
                  </Button>
                </div>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />
          </Card>

          {/* VIRTUAL CARD SLOT - FULLY INTEGRATED */}
          <Card className="md:col-span-4 bg-white dark:bg-[#111113] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden rounded-[2rem] flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                My Virtual Card
              </CardTitle>
              {hasCard && (
                <Badge variant="outline" className="text-[9px] bg-emerald-50 text-emerald-600 border-emerald-100">
                  {activeCard.status}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              {!hasCard ? (
                <div className="w-full aspect-[1.58/1] rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
                    {!isVerified ? <Lock className="h-5 w-5 text-amber-500" /> : <Plus className="h-6 w-6 text-blue-500" />}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sm">{!isVerified ? "Identity Unverified" : "Request Card"}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight px-2">
                      {!isVerified ? "Complete KYC to unlock virtual card features." : "Get a virtual card for safe online global payments."}
                    </p>
                  </div>
                  <Button 
                    onClick={() => router.push(!isVerified ? '/dashboard/kyc' : '/dashboard/card')}
                    size="sm" 
                    className={`rounded-full px-8 ${!isVerified ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {!isVerified ? "Verify Identity" : "Create Card"}
                  </Button>
                </div>
              ) : (
                <div 
                  onClick={() => router.push('/dashboard/card')}
                  className="w-full aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 relative text-white flex flex-col justify-between shadow-lg cursor-pointer group transition-transform hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-center italic font-black uppercase text-[10px] opacity-80">
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3 fill-current"/> Virtual</span>
                    <span>{activeCard.brand || "Visa"}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase font-bold opacity-40">Card Number</p>
                    <div className="text-lg font-mono tracking-[0.25em]">**** **** **** {activeCard.last4}</div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-[10px] uppercase font-bold tracking-tighter">
                      <p className="opacity-60">Holder</p>
                      <p className="truncate max-w-[120px]">{user?.firstname} {user?.lastname}</p>
                    </div>
                    <div className="h-8 w-12 bg-white/10 rounded-md backdrop-blur-sm border border-white/10 flex items-center justify-center">
                        <span className="text-[10px] italic font-black">FAST</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <p className="text-xs font-bold flex items-center gap-2">Manage Card <ChevronRight className="h-3 w-3"/></p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* QUICK ACTIONS */}
        <div className="md:col-span-4 space-y-4">
  {/* Title added here */}
  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
    Quick Actions
  </h3>
  {/* Inner Grid for the icons */}
  <div className="grid grid-cols-2 gap-4">
    <QuickActionIcon icon={<Smartphone size={20}/>} label="Buy Airtime" color="text-orange-500" bg="bg-orange-50 dark:bg-orange-500/10" />
    <QuickActionIcon icon={<Zap size={20}/>} label="Pay Bills" color="text-yellow-500" bg="bg-yellow-50 dark:bg-yellow-500/10" />
    <QuickActionIcon icon={<History size={20}/>} label="Analytics" color="text-purple-500" bg="bg-purple-50 dark:bg-purple-500/10" />
    <QuickActionIcon icon={<ShieldCheck size={20}/>} label="Security" color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-500/10" />
  </div>
</div>

          {/* TRANSACTIONS */}
          <Card className="md:col-span-8 bg-white dark:bg-[#111113] border-none shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="px-8 py-6 flex flex-row items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
              <Button onClick={() => router.push('/dashboard/transactions')} variant="link" className="text-blue-500 font-bold p-0">View Report</Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {dashboard?.transactions?.length > 0 ? (
                    dashboard.transactions.map((tx: any, i: number) => (
                      <div key={i} className="flex items-center justify-between px-8 py-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                            tx.type === 'deposit' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {tx.type === 'deposit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{tx.metadata?.merchantName || tx.description || "Transfer"}</p>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase">{tx.type} • {formatDateTime(tx.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-black ${tx.type === 'deposit' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                            {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
                          </p>
                          <Badge variant="outline" className={`text-[9px] uppercase h-4 px-1.5 opacity-80 ${tx.status === 'completed' ? 'text-emerald-500 border-emerald-200' : 'text-amber-500 border-amber-200'}`}>
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-muted-foreground text-sm">
                      <History className="mx-auto mb-2 opacity-20" />
                      No transactions to show.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function QuickActionIcon({ icon, label, color, bg }: any) {
  return (
    <Card className="p-4 bg-white dark:bg-[#111113] border-none shadow-sm hover:shadow-md transition-all cursor-pointer rounded-3xl flex flex-col items-center justify-center gap-3 border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
      <div className={`p-3 ${bg} ${color} rounded-2xl`}>
        {icon}
      </div>
      <span className="text-[11px] font-bold tracking-tight opacity-70">{label}</span>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Skeleton className="col-span-8 h-72 rounded-[2rem]" />
        <Skeleton className="col-span-4 h-72 rounded-[2rem]" />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Skeleton className="col-span-4 h-48 rounded-[2rem]" />
        <Skeleton className="col-span-8 h-48 rounded-[2rem]" />
      </div>
    </div>
  );
}