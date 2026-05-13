"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Download, 
  MoreHorizontal,
  Clock,
  ExternalLink,
  ShieldAlert,
  CalendarDays
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * ADMIN TRANSACTION LEDGER
 * Maps to: TransactionSchema [userId, amount, type, status, metadata]
 */

export default function AdminTransactionPage() {
  const [selectedTxn, setSelectedTxn] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020202] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* VOLUME METRICS HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase italic">Financial Stream</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Real-time global transaction monitoring</p>
          </div>
          <div className="flex flex-wrap gap-4">
             <VolumeMetric label="24h Volume" value="$1.2M" trend="+4.2%" color="blue" />
             <VolumeMetric label="Pending Approvals" value="18" valueColor="text-amber-500" color="amber" />
          </div>
        </div>

        {/* CONTROLS */}
        <Card className="border-none shadow-sm bg-white dark:bg-[#0d0d0d] rounded-2xl overflow-hidden">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search Transaction ID, Sender, or Account..." 
                className="pl-9 bg-slate-50 dark:bg-white/5 border-none rounded-xl h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl h-12 border-slate-200 dark:border-white/10 gap-2 font-bold px-6">
                <CalendarDays size={16} /> Date Range
              </Button>
              <Button variant="outline" className="rounded-xl h-12 border-slate-200 dark:border-white/10 gap-2 font-bold px-6">
                <Download size={16} /> Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* MASTER TRANSACTION TABLE */}
        <Card className="border-none shadow-2xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-white/5">
              <TableRow className="border-none">
                <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest py-5">TXN Reference / Date</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Client</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Category</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Flow</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((txn) => (
                <TableRow key={txn.id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <TableCell className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] font-bold text-blue-600">{txn.id}</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase mt-1">{txn.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-sm dark:text-slate-200">
                    {txn.user}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[9px] uppercase font-black px-2 py-0.5">
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {txn.flow === "in" ? (
                      <ArrowDownLeft className="text-emerald-500 h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="text-rose-500 h-4 w-4" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "border-none font-black text-[9px] uppercase px-3",
                      txn.status === "completed" ? "bg-emerald-500/10 text-emerald-500" : 
                      txn.status === "pending" ? "bg-amber-500/10 text-amber-500 animate-pulse" : "bg-rose-500/10 text-rose-500"
                    )}>
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Sheet>
                      <SheetTrigger>
                        <button 
                          onClick={() => setSelectedTxn(txn)}
                          className={cn(
                            "text-sm font-black transition-colors hover:text-blue-500",
                            txn.flow === "in" ? "text-emerald-500" : "text-rose-500"
                          )}
                        >
                          {txn.flow === "in" ? "+" : "-"}${txn.amount.toLocaleString()}
                        </button>
                      </SheetTrigger>
                      
                      {/* TRANSACTION INSPECTOR PANEL */}
                      <SheetContent className="w-full sm:max-w-md bg-white dark:bg-[#0a0a0b] border-l border-white/5 flex flex-col p-0">
                        <InspectorContent data={txn} />
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

// Transaction Inspector Content
function InspectorContent({ data }: any) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-8 flex-grow space-y-8 overflow-y-auto">
        <SheetHeader className="text-left space-y-4">
          <div className={cn(
            "h-16 w-16 rounded-[2rem] flex items-center justify-center shadow-xl",
            data.flow === "in" ? "bg-emerald-500 shadow-emerald-500/20" : "bg-rose-500 shadow-rose-500/20"
          )}>
            {data.flow === "in" ? <ArrowDownLeft className="text-white h-8 w-8" /> : <ArrowUpRight className="text-white h-8 w-8" />}
          </div>
          <div>
            <SheetTitle className="text-2xl font-black tracking-tighter italic uppercase">Transaction Intel</SheetTitle>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Internal Log ID: {data.id}</p>
          </div>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-6 bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem]">
          <DetailItem label="Status" value={data.status} isStatus status={data.status} />
          <DetailItem label="Amount" value={`$${data.amount.toLocaleString()}`} />
          <DetailItem label="Client" value={data.user} />
          <DetailItem label="Category" value={data.type.toUpperCase()} />
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 px-1">Network Metadata</h4>
          <div className="space-y-3">
             <MetaRow label="Source IP" value="192.168.1.104 (Lagos, NG)" />
             <MetaRow label="Currency" value="USD - US Dollar" />
             <MetaRow label="Channel" value="Mobile App (iOS)" />
          </div>
        </div>

        {data.status === "pending" && (
           <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
              <ShieldAlert className="text-amber-600 shrink-0" size={20} />
              <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 leading-tight">
                This transaction is awaiting manual verification due to high-volume flags.
              </p>
           </div>
        )}
      </div>

      <div className="p-8 border-t border-white/5 bg-slate-50/50 dark:bg-white/5 space-y-3">
         {data.status === "pending" && (
            <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest">
              Release Funds
            </Button>
         )}
         <Button variant="ghost" className="w-full h-14 rounded-2xl text-rose-500 font-black uppercase text-xs tracking-widest hover:bg-rose-500/10 gap-2">
           <RotateCcw size={16} /> Reverse Transaction
         </Button>
      </div>
    </div>
  );
}

// Small helper components
function VolumeMetric({ label, value, trend, color, valueColor }: any) {
  return (
    <Card className="bg-white dark:bg-[#0d0d0d] border-none px-6 py-3 rounded-2xl shadow-sm flex flex-col justify-center">
      <p className="text-[9px] font-black uppercase opacity-40 tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className={cn("text-xl font-black", valueColor || "dark:text-white")}>{value}</p>
        {trend && <span className="text-[10px] font-bold text-emerald-500">{trend}</span>}
      </div>
    </Card>
  );
}

function DetailItem({ label, value, isStatus, status }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black uppercase opacity-40 tracking-widest">{label}</p>
      {isStatus ? (
        <Badge className={cn(
          "h-5 text-[9px] font-black uppercase",
          status === "completed" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
        )}>{value}</Badge>
      ) : (
        <p className="text-sm font-black dark:text-white">{value}</p>
      )}
    </div>
  );
}

function MetaRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-white/5">
      <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
      <span className="text-[10px] font-mono font-bold dark:text-slate-300">{value}</span>
    </div>
  );
}

// MOCK DATA
const mockTransactions = [
  { id: "WT-X882910", user: "Tarex BD", amount: 12400.00, status: "pending", date: "Today, 14:20", type: "wire_transfer", flow: "out" },
  { id: "WT-P002119", user: "John Doe", amount: 2500.00, status: "completed", date: "Today, 12:05", type: "deposit", flow: "in" },
  { id: "WT-L992011", user: "Sarah Williams", amount: 50.00, status: "failed", date: "Yesterday, 18:45", type: "card_spend", flow: "out" },
  { id: "WT-Q882110", user: "Alex Thompson", amount: 8400.00, status: "completed", date: "Oct 15, 2025", type: "internal", flow: "in" },
];