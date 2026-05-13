"use client";

import React from "react";
import { 
  Wallet, 
  Copy, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Banknote,
  Loader2,
  AlertTriangle,
  CalendarDays,
  Activity
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/dashboardHooks";

export default function AccountPage() {
  const router = useRouter();
  const { dashboard, isLoading } = useDashboard();

  // Extract the primary account from the backend data
  const primaryAccount = dashboard?.accounts?.[0];

  const copyAccount = () => {
    if (!primaryAccount?.accountNumber) return;
    navigator.clipboard.writeText(primaryAccount.accountNumber);
    toast.success("Account number copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0b]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!primaryAccount) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-4 max-w-md">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">No Account Found</h2>
          <p className="text-muted-foreground text-sm mb-6">
            You do not have an active account yet. Please complete your identity verification to generate your account numbers.
          </p>
          <Button onClick={() => router.push("/dashboard/kyc")} className="rounded-xl h-12 px-8 bg-blue-600 font-bold">
            Complete KYC
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] p-4 md:p-8 pt-6 transition-all duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Account Overview
          </h1>
          <Badge className={`px-4 py-1.5 rounded-full font-bold uppercase text-[10px] border-none ${
            primaryAccount.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
          }`}>
            {primaryAccount.status}
          </Badge>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* BALANCE BREAKDOWN */}
          <Card className="border-none shadow-sm bg-white dark:bg-[#111113] rounded-[2rem] p-8 border border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
              Balance Breakdown
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Ledger Balance</p>
                  <p className="text-xl font-black dark:text-white">
                    {primaryAccount.currency === "USD" ? "$" : "₦"}
                    {primaryAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                  <Wallet size={18} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                <p className="text-xs text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
                  Your <strong className="font-bold">Available Balance</strong> is what you can currently spend. The <strong className="font-bold">Ledger Balance</strong> includes all funds, including pending transactions that haven't fully cleared.
                </p>
              </div>
            </div>
          </Card>

          {/* ACCOUNT INFORMATION */}
          <Card className="border-none shadow-sm bg-white dark:bg-[#111113] rounded-[2rem] p-8 border border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
              Account Information
            </h3>
            
            <div className="space-y-6">
              {/* Account Number */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-500">
                    <Banknote size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Account Number</p>
                    <p className="text-lg font-mono font-bold dark:text-white">{primaryAccount.accountNumber}</p>
                  </div>
                </div>
                <Button onClick={copyAccount} variant="ghost" size="icon" className="rounded-full opacity-50 group-hover:opacity-100">
                  <Copy size={16} />
                </Button>
              </div>

              <div className="h-[1px] bg-slate-100 dark:bg-white/5 w-full" />

              {/* Currency */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-500">
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Currency</p>
                    <p className="text-sm font-bold dark:text-white uppercase">{primaryAccount.currency}</p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 dark:bg-white/5 w-full" />

              {/* Date Opened */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-500">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Date Opened</p>
                    <p className="text-sm font-bold dark:text-white">
                      {new Date(primaryAccount.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <ShieldCheck size={20} className="text-emerald-500" />
              </div>
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  );
}