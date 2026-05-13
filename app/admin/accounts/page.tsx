"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Banknote, 
  Lock, 
  Unlock, 
  Loader2 
} from "lucide-react";
import { useAdminAccounts } from "@/hooks/adminAccountHooks";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function AdminAccountsPage() {
  const { accounts, totalLiquidity, isLoading, toggleStatus, isToggling } = useAdminAccounts();
  
  // Track which specific account is being toggled to show the correct loading spinner
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleStatus = (accountId: string) => {
    setProcessingId(accountId);
    toggleStatus(accountId, {
      onSettled: () => setProcessingId(null)
    });
  };

  // Optional: Simple local filtering based on search input
  const filteredAccounts = accounts.filter((acc: any) => {
    const term = searchQuery.toLowerCase();
    return (
      acc.accountNumber?.toLowerCase().includes(term) ||
      acc.userId?.firstname?.toLowerCase().includes(term) ||
      acc.userId?.lastname?.toLowerCase().includes(term) ||
      acc.userId?.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020202] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* HEADER & GLOBAL STATS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase italic">Global Ledger</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-70 italic">Monitoring total platform liquidity</p>
          </div>
          <div className="flex gap-4">
             <Card className="bg-white dark:bg-[#111113] border-none px-6 py-3 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Banknote size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase opacity-40">System Liquidity</p>
                    <p className="text-xl font-black dark:text-white">
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin mt-1" /> : `$${totalLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    </p>
                </div>
             </Card>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <Card className="border-none shadow-sm bg-white dark:bg-[#0d0d0d] rounded-2xl overflow-hidden">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Search account number, name, or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 bg-slate-50 dark:bg-white/5 border-none rounded-xl h-12 font-medium focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <Button variant="outline" className="rounded-xl h-12 border-slate-200 dark:border-white/10 gap-2 font-bold px-6 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5">
              <Filter size={16} /> Filter Accounts
            </Button>
          </CardContent>
        </Card>

        {/* ACCOUNTS TABLE */}
        <Card className="border-none shadow-2xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden">
          {isLoading ? (
            <div className="p-24 flex justify-center items-center flex-col gap-4">
              <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Loading Ledger...</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-white/5">
                <TableRow className="border-none">
                  <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest py-5">Account Owner</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Account Number</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Balance</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="px-8 text-right font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium text-sm">
                      No accounts found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAccounts.map((acc: any) => (
                    <TableRow key={acc._id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm dark:text-white capitalize">
                            {acc.userId?.firstname} {acc.userId?.lastname}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-medium">{acc.userId?.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs font-bold tracking-widest text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">
                          {acc.accountNumber}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                            <span className="font-black text-sm dark:text-white">
                              {acc.currency === "USD" ? "$" : "₦"}{acc.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-[9px] font-bold opacity-40 uppercase tracking-tighter mt-0.5">
                              Avail: {acc.currency === "USD" ? "$" : "₦"}{acc.availableBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border-none font-black text-[9px] uppercase px-3 py-1 ${
                          acc.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                        }`}>
                            {acc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 text-right">
                        <Button 
                          onClick={() => handleToggleStatus(acc._id)}
                          disabled={isToggling && processingId === acc._id}
                          variant="ghost"
                          className={`rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6 gap-2 transition-all ${
                            acc.status === "active" 
                              ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-500/20" 
                              : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                          }`}
                        >
                          {isToggling && processingId === acc._id ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : acc.status === "active" ? (
                            <><Lock size={14} /> Freeze</>
                          ) : (
                            <><Unlock size={14} /> Unfreeze</>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}