"use client";

import React, { useState, useEffect } from "react";
import { Clock, ArrowRight, Edit3, Download, Search, Loader2, CalendarDays, XCircle, CheckCircle2, ScanFace, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminDeposits } from "@/hooks/adminDepositHooks";

export default function AdminDepositRefactored() {
  const { pendingDeposits, isLoading, processRequest, isProcessing } = useAdminDeposits();
  
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [adjustedAmount, setAdjustedAmount] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (selectedRequest) {
      setAdjustedAmount(selectedRequest.amount.toString());
      setAdminNote("");
    }
  }, [selectedRequest]);

  const handleProcess = (action: "approve" | "reject") => {
    if (!selectedRequest) return;
    
    processRequest({
      id: selectedRequest._id,
      action,
      adjustedAmount: action === "approve" ? Number(adjustedAmount) : undefined,
      note: adminNote
    }, {
      onSuccess: () => setIsSheetOpen(false)
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020202] p-4 md:p-8 pt-6 transition-colors">
      <div className="max-w-[1500px] mx-auto space-y-8">
        
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase italic">Credit Control</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Review requests & direct credit users</p>
          </div>
          <Badge className="bg-blue-600 text-white border-none px-4 py-2 font-black text-xs shadow-md">
            {pendingDeposits.length} Pending
          </Badge>
        </div>

        <Card className="border-none shadow-2xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden">
          {isLoading ? (
            <div className="p-24 flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-white/5">
                <TableRow className="border-none font-black uppercase text-[10px] tracking-widest">
                  <TableHead className="px-8 py-5">Applicant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Asset/Method</TableHead>
                  <TableHead className="text-right px-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingDeposits.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium text-sm">No pending deposits.</TableCell></TableRow>
                ) : (
                  pendingDeposits.map((req: any) => (
                    <TableRow key={req._id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                      <TableCell className="px-8 py-5 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-xs text-blue-600">
                            {req.userId?.firstname?.[0]}{req.userId?.lastname?.[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm dark:text-white capitalize">{req.userId?.firstname} {req.userId?.lastname}</span>
                          <span className="text-[10px] text-muted-foreground font-bold font-mono">{req.reference}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                           <CalendarDays size={12} /> {new Date(req.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-emerald-500 text-sm">
                        ${req.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-wider bg-slate-100 dark:bg-white/5">
                          {req.metadata?.method || "Crypto"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 text-right">
                        <Sheet open={isSheetOpen && selectedRequest?._id === req._id} onOpenChange={(open) => {
                          setIsSheetOpen(open);
                          if (open) setSelectedRequest(req);
                        }}>
                          <SheetTrigger asChild>
                            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase h-10 px-6 gap-2">
                              Review & Credit <Edit3 size={14} />
                            </Button>
                          </SheetTrigger>
                          
                          <SheetContent className="w-full sm:max-w-xl bg-white dark:bg-[#0a0a0b] border-l border-white/5 p-0 flex flex-col shadow-2xl">
                            <div className="p-8 space-y-8 flex-grow overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle className="text-3xl font-black italic tracking-tighter uppercase">Process Funding</SheetTitle>
                                    <SheetDescription className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                                      <Clock size={14} /> Verification & Direct Credit
                                    </SheetDescription>
                                </SheetHeader>

                                <Separator className="bg-slate-100 dark:bg-white/5" />

                                <div className="space-y-6">
                                    <div className="p-6 rounded-[2rem] bg-blue-600/5 border border-blue-500/10 space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Credit Amount (Adjustable)</Label>
                                            <Badge className="bg-blue-600 text-white text-[9px] font-black uppercase">Req: ${selectedRequest?.amount}</Badge>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-300 dark:text-slate-700">$</span>
                                            <Input 
                                                type="number"
                                                value={adjustedAmount}
                                                onChange={(e) => setAdjustedAmount(e.target.value)}
                                                className="h-20 pl-14 rounded-2xl bg-white dark:bg-black/40 border-none text-4xl font-black focus-visible:ring-2 focus-visible:ring-blue-600 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">User Submitted Evidence</p>
                                    </div>
                                    <div 
                                      onClick={() => window.open(selectedRequest?.metadata?.receiptUrl, '_blank')}
                                      className="aspect-video bg-slate-100 dark:bg-white/5 rounded-[2rem] overflow-hidden border-4 border-slate-50 dark:border-white/5 group relative flex items-center justify-center cursor-pointer"
                                    >
                                        {selectedRequest?.metadata?.receiptUrl ? (
                                          <>
                                            <img src={selectedRequest.metadata.receiptUrl} alt="Receipt Proof" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <ExternalLink className="text-white" size={24} />
                                            </div>
                                          </>
                                        ) : (
                                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No Receipt Provided</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-1">Internal Note / Rejection Reason</Label>
                                    <Textarea 
                                      value={adminNote}
                                      onChange={(e) => setAdminNote(e.target.value)}
                                      placeholder="Explain adjustments or rejection reason..." 
                                      className="rounded-2xl bg-slate-50 dark:bg-white/5 border-none min-h-[100px] p-5 text-sm font-medium focus-visible:ring-1 focus-visible:ring-blue-500" 
                                    />
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0a0a0b] grid grid-cols-2 gap-4">
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleProcess("reject")}
                                  disabled={isProcessing}
                                  className="h-16 rounded-[2rem] text-rose-500 border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 font-black uppercase text-xs tracking-widest"
                                >
                                    <XCircle size={16} className="mr-2" /> Decline
                                </Button>
                                <Button 
                                  onClick={() => handleProcess("approve")}
                                  disabled={isProcessing}
                                  className="h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 group"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" /> : <>Confirm & Credit <ArrowRight size={18} className="ml-2" /></>}
                                </Button>
                            </div>
                          </SheetContent>
                        </Sheet>
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