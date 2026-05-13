"use client";

import React, { useState } from "react";
import { 
  CreditCard, Search, Filter, ShieldCheck, ArrowRight, Cpu, Zap, XCircle, CheckCircle2, Loader2, Clock
} from "lucide-react";
import { useAdminCards } from "@/hooks/adminCardHooks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

export default function AdminCardRequestPage() {
  const { pendingRequests, isLoading, approveRequest, isApproving, declineRequest, isDeclining } = useAdminCards();
  const [selectedReq, setSelectedReq] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleApprove = () => {
    if (!selectedReq) return;
    approveRequest(selectedReq._id, {
      onSuccess: () => setIsSheetOpen(false)
    });
  };

  const handleDecline = () => {
    if (!selectedReq) return;
    declineRequest(selectedReq._id, {
      onSuccess: () => setIsSheetOpen(false)
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] dark:bg-[#080808] p-4 md:p-8 pt-6 transition-colors">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase ">Card Provisioning</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
              Systemized Card Issuance & Security
            </p>
          </div>
          <div className="flex gap-4">
             <div className="h-14 px-6 rounded-2xl bg-white dark:bg-[#111113] border border-slate-100 dark:border-white/5 flex items-center gap-3 shadow-sm">
                <Cpu className={cn("text-blue-600 h-5 w-5", pendingRequests.length > 0 && "animate-pulse")} />
                <div>
                    <p className="text-[9px] font-black uppercase opacity-40">Awaiting Action</p>
                    <p className="text-lg font-black dark:text-white">{pendingRequests.length} Requests</p>
                </div>
             </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex gap-4 flex-col md:flex-row">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
              <Input placeholder="Search by name..." className="pl-11 h-14 bg-white dark:bg-[#111113] border-none rounded-2xl shadow-sm" />
            </div>
        </div>

        {/* TABLE */}
        <Card className="border-none shadow-2xl bg-white dark:bg-[#111113] rounded-[2.5rem] overflow-hidden">
          {isLoading ? (
            <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-white/5">
                <TableRow className="border-none">
                  <TableHead className="px-8 py-6 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Applicant</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Type</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Eligibility</TableHead>
                  <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((req: any) => (
                  <TableRow key={req._id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/10 transition-colors">
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">
                          {req.cardHolderName?.[0] || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm dark:text-white">{req.cardHolderName}</span>
                          <span className="text-[10px] font-mono font-bold opacity-40 uppercase">{req._id.slice(-6)}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-purple-500/10 text-purple-500 uppercase text-[9px] font-black px-3 py-1 border-none">
                        {req.isVirtual ? "Virtual" : "Physical"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase text-emerald-600">Verified</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 text-right">
                      <Sheet open={isSheetOpen && selectedReq?._id === req._id} onOpenChange={(val) => { setIsSheetOpen(val); if(val) setSelectedReq(req); }}>
                        <SheetTrigger asChild>
                          <Button className="rounded-xl bg-slate-900 dark:bg-white dark:text-black font-black text-[10px] uppercase h-10 px-6 gap-2 shadow-md">
                            Provision <ArrowRight size={14} />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl bg-white dark:bg-[#0d0d0d] p-0 flex flex-col">
                          <div className="p-8 space-y-8 flex-grow overflow-y-auto">
                             <SheetHeader className="text-left space-y-4">
                               <div className="h-16 w-16 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white">
                                  <CreditCard size={32} />
                               </div>
                               <div>
                                  <SheetTitle className="text-3xl font-black italic tracking-tighter uppercase dark:text-white">Issue Asset</SheetTitle>
                                  <SheetDescription className="font-bold text-blue-500 uppercase tracking-widest text-[10px]">Processing: {selectedReq?.cardHolderName}</SheetDescription>
                               </div>
                             </SheetHeader>

                             <div className="aspect-[1.58/1] rounded-[2rem] bg-slate-900 p-8 text-white relative shadow-2xl overflow-hidden border border-white/10">
                                <Zap className="h-8 w-8 text-blue-500 fill-blue-500 relative z-10" />
                                <div className="mt-12 relative z-10">
                                    <p className="text-2xl font-mono tracking-[0.2em] opacity-80">**** **** **** ****</p>
                                </div>
                                <div className="mt-auto flex justify-between items-end relative z-10">
                                    <p className="text-[10px] font-bold uppercase tracking-widest">{selectedReq?.cardHolderName}</p>
                                    <div className="h-8 w-12 bg-white/10 rounded-lg flex items-center justify-center font-black text-[9px] italic">{selectedReq?.brand?.toUpperCase()}</div>
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Network</label>
                                 <Input disabled value={selectedReq?.brand?.toUpperCase()} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold" />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Limit</label>
                                 <Input value="10000" className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-black text-blue-600" />
                               </div>
                             </div>
                          </div>

                          <div className="p-8 border-t border-white/5 bg-slate-50/50 dark:bg-black/20 grid grid-cols-2 gap-4">
                             <Button onClick={handleDecline} disabled={isDeclining} variant="ghost" className="h-16 rounded-[2rem] text-rose-500 font-black uppercase text-xs">
                                {isDeclining ? <Loader2 className="animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />} Decline
                             </Button>
                             <Button onClick={handleApprove} disabled={isApproving} className="h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs shadow-xl">
                                {isApproving ? <Loader2 className="animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />} Finalize & Issue
                             </Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}