"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Inbox
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/hooks/dashboardHooks";
import { useTransaction } from "@/hooks/transactionHooks";

export default function TransactionHistory() {
  const { dashboard } = useDashboard();
  const accountId = dashboard?.accounts?.[0]?._id;

  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { history, meta, isLoading, isFetching } = useTransaction({
    accountId,
    page,
    type: filterType,
    limit: 10
  });


  console.log(history,'let me see')
  // Helper to render Status Badges
  const renderStatus = (status: string) => {
    const styles: Record<string, any> = {
      completed: { bg: "bg-emerald-500/10 text-emerald-500", icon: <CheckCircle2 size={12}/> },
      pending: { bg: "bg-amber-500/10 text-amber-500", icon: <Clock size={12}/> },
      failed: { bg: "bg-rose-500/10 text-rose-500", icon: <XCircle size={12}/> },
    };
    const current = styles[status] || styles.pending;
    return (
      <Badge className={`${current.bg} border-none px-2 py-0.5 flex gap-1 items-center w-fit capitalize font-medium`}>
        {current.icon} {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight dark:text-white">Transaction History</h1>
            <p className="text-muted-foreground text-sm">Review your financial activity and export reports.</p>
          </div>
          <Button variant="outline" className="rounded-xl bg-white dark:bg-slate-900 gap-2 h-11">
            <Download size={16} /> Export CSV
          </Button>
        </div>

        {/* SEARCH & FILTERS */}
        <Card className="border-none shadow-sm bg-white dark:bg-[#111113] rounded-2xl">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search by merchant or reference..." 
                className="pl-10 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={(val) => { setFilterType(val); setPage(1); }}>
                <SelectTrigger className="w-[160px] rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none h-11">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="transfer">Transfers</SelectItem>
                  <SelectItem value="card_payment">Card Payments</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* DATA TABLE */}
        <Card className="border-none shadow-xl bg-white dark:bg-[#111113] rounded-[2rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/50 text-[11px] uppercase tracking-widest text-muted-foreground font-bold">
                  <th className="px-6 py-5">Activity</th>
                  <th className="px-6 py-5 hidden md:table-cell">Reference</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5 text-right">Amount</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}><td colSpan={6} className="px-6 py-4"><Skeleton className="h-12 w-full rounded-xl" /></td></tr>
                  ))
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-40">
                        <Inbox size={48} />
                        <p className="font-bold">No transactions found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  history.map((tx: any) => (
                    <tr key={tx._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                            tx.type === 'credit' 
                            ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {tx.type === 'credit' ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
                          </div>
                          <div>
                            <p className="text-sm font-bold dark:text-slate-100">
                              {tx.metadata?.merchantName || "Internal Transfer"}
                            </p>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                              {tx.type.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-xs font-mono text-muted-foreground uppercase">{tx.transactionId?.reference?.slice(-8) || "N/A"}</p>
                      </td>
                      <td className="px-6 py-4">
                        {renderStatus(tx.status)}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium dark:text-slate-300">
                          {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className={`text-sm font-black ${tx.type === 'credit' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                          {tx.type === 'credit' ? '+' : '-'}
                          {dashboard?.accounts?.[0]?.currency === 'USD' ? '$' : '₦'}
                          {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem className="text-xs font-medium">View Receipt</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-medium">Report Issue</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {!isLoading && history.length > 0 && (
            <div className="p-6 border-t border-slate-50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30 dark:bg-transparent">
              <p className="text-xs text-muted-foreground font-medium">
                Page {meta.currentPage} of {meta.totalPages} • Total {meta.totalRecords} records
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl h-9 px-4 dark:border-slate-800"
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage(p => p - 1)}
                >
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl h-9 px-4 dark:border-slate-800"
                  disabled={page >= meta.totalPages || isFetching}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}