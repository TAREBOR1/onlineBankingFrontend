"use client";

import React, { useState } from "react";
import { 
  Search, Filter, ShieldAlert, UserCheck, XCircle, FileText, 
  ArrowRight, Eye, CalendarDays, CheckCircle2, ScanFace, Loader2, ExternalLink
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useAdminKyc } from "@/hooks/adminKycHooks";

export default function AdminKycPage() {
  const { kycRequests, isLoading, approveKyc, isApproving, rejectKyc, isRejecting } = useAdminKyc();

  const [selectedKyc, setSelectedKyc] = useState<any>(null);
  const [adminNote, setAdminNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isProcessing = isApproving || isRejecting;

  const handleApprove = () => {
    if (!selectedKyc) return;
    approveKyc(selectedKyc._id, {
      onSuccess: () => {
        setIsSheetOpen(false);
        setAdminNote("");
      }
    });
  };

  const handleReject = () => {
    if (!selectedKyc) return;
    rejectKyc({ id: selectedKyc._id, reason: adminNote }, {
      onSuccess: () => {
        setIsSheetOpen(false);
        setAdminNote("");
      }
    });
  };

  const filteredRequests = kycRequests.filter((req: any) => {
    const term = searchQuery.toLowerCase();
    const user = req.userId;
    if (!user) return false;
    return (
      user.firstname?.toLowerCase().includes(term) ||
      user.lastname?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      req.documentType?.toLowerCase().includes(term)
    );
  });

  const getKycBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified": return <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 font-bold uppercase text-[9px] tracking-widest">Verified</Badge>;
      case "pending": return <Badge className="bg-amber-500/10 text-amber-500 border-none px-3 font-bold uppercase text-[9px] tracking-widest animate-pulse">Pending</Badge>;
      case "rejected": return <Badge className="bg-rose-500/10 text-rose-500 border-none px-3 font-bold uppercase text-[9px] tracking-widest">Rejected</Badge>;
      default: return <Badge variant="outline" className="opacity-50 uppercase text-[9px] tracking-widest font-bold">Unverified</Badge>;
    }
  };

  const openImage = (url: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const pendingCount = kycRequests.filter((req: any) => req.userId?.kycStatus === 'pending').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020202] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-[1500px] mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase ">Identity Verification</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-70 ">Audit & Validate Client Documents</p>
          </div>
          <Badge className="bg-amber-500/10 text-amber-500 border-none px-5 py-2.5 font-black text-[10px] uppercase tracking-widest shadow-sm">
            <ShieldAlert size={14} className="mr-2" /> {pendingCount} Pending Audits
          </Badge>
        </div>

        {/* SEARCH BAR */}
        <Card className="border-none shadow-sm bg-white dark:bg-[#0d0d0d] rounded-2xl overflow-hidden p-4 flex gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Search by client name, email, or document type..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 bg-slate-50 dark:bg-white/5 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 font-medium" 
              />
            </div>
        </Card>

        {/* MAIN TABLE */}
        <Card className="border-none shadow-2xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden">
          {isLoading ? (
            <div className="p-24 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Loading KYC Data...</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-white/5">
                <TableRow className="border-none font-black uppercase text-[10px] tracking-widest">
                  <TableHead className="px-8 py-5">Applicant Profile</TableHead>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>System Status</TableHead>
                  <TableHead className="text-right px-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-16 text-muted-foreground font-medium text-sm">
                      No verification records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((req: any) => (
                    <TableRow key={req._id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                      <TableCell className="px-8 py-5 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center font-black text-xs text-blue-600">
                            {req.userId?.firstname?.[0] || ""}{req.userId?.lastname?.[0] || ""}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm dark:text-white capitalize">{req.userId?.firstname} {req.userId?.lastname}</span>
                          <span className="text-[11px] text-muted-foreground font-medium">{req.userId?.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-slate-400" />
                          <span className="font-bold text-xs uppercase tracking-wider">{req.documentType || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                            <CalendarDays size={12} />
                            {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getKycBadge(req.userId?.kycStatus)}
                      </TableCell>
                      <TableCell className="px-8 text-right">
                        <Sheet open={isSheetOpen && selectedKyc?._id === req._id} onOpenChange={(open) => {
                          setIsSheetOpen(open);
                          if (open) {
                            setSelectedKyc(req);
                            setAdminNote(""); // Reset note when opening
                          }
                        }}>
                          <SheetTrigger >
                            <Button className="rounded-xl bg-slate-900 dark:bg-white dark:text-black hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest h-10 px-6 gap-2">
                              Audit Data <Eye size={14} />
                            </Button>
                          </SheetTrigger>
                          
                          <SheetContent className="w-full sm:max-w-2xl bg-white dark:bg-[#0a0a0b] border-l border-white/5 p-0 flex flex-col shadow-2xl overflow-hidden">
                            <div className="p-8 space-y-8 flex-grow overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle className="text-3xl font-black italic tracking-tighter uppercase">Protocol Review</SheetTitle>
                                    <SheetDescription className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                      <ScanFace size={14} className="text-blue-500" /> Identity Verification Audit
                                    </SheetDescription>
                                </SheetHeader>

                                <Separator className="bg-slate-100 dark:bg-white/5" />

                                {/* APPLICANT SUMMARY */}
                                <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 flex items-center justify-between border border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                                          {selectedKyc?.userId?.firstname?.[0] || ""}
                                        </div>
                                        <div>
                                            <p className="font-black text-lg leading-none capitalize">{selectedKyc?.userId?.firstname} {selectedKyc?.userId?.lastname}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{selectedKyc?.userId?.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Current Status</p>
                                        {getKycBadge(selectedKyc?.userId?.kycStatus)}
                                    </div>
                                </div>

                                {/* CONTACT / ADDRESS INFO */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="space-y-1">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Phone</Label>
                                    <p className="font-bold dark:text-white">{selectedKyc?.contact?.phone || "N/A"}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">SSN / ID Number</Label>
                                    <p className="font-bold dark:text-white">{selectedKyc?.documentNumber || selectedKyc?.contact?.ssn || "N/A"}</p>
                                  </div>
                                  <div className="space-y-1 col-span-2">
                                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Address</Label>
                                    <p className="font-medium dark:text-white">
                                      {selectedKyc?.address?.addressLine1}, {selectedKyc?.address?.city}, {selectedKyc?.address?.state}, {selectedKyc?.address?.country}
                                    </p>
                                  </div>
                                </div>

                                <Separator className="bg-slate-100 dark:bg-white/5" />

                                {/* DOCUMENT PREVIEWS */}
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Provided Documentation (Click to Expand)</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* ID Front */}
                                        <div className="space-y-2">
                                          <div 
                                            onClick={() => openImage(selectedKyc?.idCard?.front)}
                                            className="aspect-[4/3] bg-slate-100 dark:bg-black/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group relative flex items-center justify-center cursor-pointer"
                                          >
                                              {selectedKyc?.idCard?.front ? (
                                                <>
                                                  <img src={selectedKyc.idCard.front} alt="ID Front" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <ExternalLink className="text-white" size={24} />
                                                  </div>
                                                </>
                                              ) : (
                                                <span className="text-xs font-bold text-muted-foreground">No Image</span>
                                              )}
                                          </div>
                                          <p className="text-[9px] font-bold text-center uppercase tracking-widest opacity-60">ID Document (Front)</p>
                                        </div>
                                        
                                        {/* ID Back */}
                                        <div className="space-y-2">
                                          <div 
                                            onClick={() => openImage(selectedKyc?.idCard?.back)}
                                            className="aspect-[4/3] bg-slate-100 dark:bg-black/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group relative flex items-center justify-center cursor-pointer"
                                          >
                                              {selectedKyc?.idCard?.back ? (
                                                <>
                                                  <img src={selectedKyc.idCard.back} alt="ID Back" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <ExternalLink className="text-white" size={24} />
                                                  </div>
                                                </>
                                              ) : (
                                                <span className="text-xs font-bold text-muted-foreground">No Image</span>
                                              )}
                                          </div>
                                          <p className="text-[9px] font-bold text-center uppercase tracking-widest opacity-60">ID Document (Back)</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-slate-100 dark:bg-white/5" />

                                {/* ADMIN NOTES */}
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-1">Audit Notes / Rejection Reason</Label>
                                    <Textarea 
                                      value={adminNote}
                                      onChange={(e) => setAdminNote(e.target.value)}
                                      placeholder="Required if rejecting. Optional for approvals..." 
                                      className="rounded-2xl bg-slate-50 dark:bg-white/5 border-none min-h-[100px] p-5 text-sm font-medium focus-visible:ring-1 focus-visible:ring-blue-500" 
                                    />
                                </div>
                            </div>

                            {/* STICKY FOOTER */}
                            {selectedKyc?.userId?.kycStatus === 'pending' && (
                              <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0a0a0b] grid grid-cols-2 gap-4 mt-auto">
                                  <Button 
                                    variant="outline" 
                                    onClick={handleReject}
                                    disabled={isProcessing || !adminNote.trim()}
                                    className="h-16 rounded-[2rem] text-rose-500 border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 font-black uppercase text-[10px] tracking-widest transition-all"
                                  >
                                      {isRejecting ? <Loader2 className="animate-spin mr-2" size={16} /> : <XCircle size={16} className="mr-2" />} 
                                      Reject Protocol
                                  </Button>
                                  <Button 
                                    onClick={handleApprove}
                                    disabled={isProcessing}
                                    className="h-16 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-500/20 group transition-all"
                                  >
                                      {isApproving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                                      Verify Identity <CheckCircle2 size={18} className="ml-2 group-hover:scale-110 transition-transform" />
                                  </Button>
                              </div>
                            )}
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