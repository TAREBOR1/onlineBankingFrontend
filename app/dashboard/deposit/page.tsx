"use client";

import React, { useState, useRef } from "react";
import { 
  Wallet, 
  Copy, 
  QrCode, 
  ArrowRight, 
  UploadCloud, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  ImageIcon
} from "lucide-react";
import { useUserDeposit } from "@/hooks/depositHooks";
import toast from "react-hot-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function UserDepositPage() {
  const { wallets, isLoadingWallets, submitDeposit, isSubmitting } = useUserDeposit();
  
  const [amount, setAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!amount || !selectedWallet || !receiptFile) {
      toast.error("Please fill all required fields and upload a receipt.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("walletId", selectedWallet._id);
    formData.append("currency", selectedWallet.currency);
    formData.append("receipt", receiptFile); // Matches upload.single("receipt")

    submitDeposit(formData);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#050505] p-4 md:p-12 transition-all duration-500">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase ">Fund Account</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
            Secure Asset Deposit Gateway
          </p>
        </div>

        <div className="grid gap-6">
          
          {/* STEP 1: AMOUNT */}
          <Card className="border-none shadow-sm bg-white dark:bg-[#0c0c0e] rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Step 1: Deposit Amount (USD)</Label>
            <div className="mt-4 relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300 dark:text-slate-700">$</span>
              <Input 
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-20 pl-14 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border-none text-4xl font-black focus-visible:ring-2 focus-visible:ring-blue-600 shadow-inner"
              />
            </div>
          </Card>

          {/* STEP 2: SELECT NETWORK */}
          <Card className={`border-none shadow-sm bg-white dark:bg-[#0c0c0e] rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 transition-opacity ${!amount ? 'opacity-50 pointer-events-none' : ''}`}>
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Step 2: Select Asset Network</Label>
            
            {isLoadingWallets ? (
              <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin text-blue-600" /></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {wallets.map((wallet: any) => (
                  <div 
                    key={wallet._id}
                    onClick={() => setSelectedWallet(wallet)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      selectedWallet?._id === wallet._id 
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-600/10' 
                        : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 hover:border-blue-500/30'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-xl bg-white dark:bg-black/50 p-2 shadow-sm flex items-center justify-center">
                      {wallet.logoUrl ? (
                        <img src={wallet.logoUrl} alt={wallet.currency} className="w-full h-full object-contain" />
                      ) : (
                        <Globe className="text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-tight">{wallet.currency}</p>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{wallet.network}</p>
                    </div>
                    {selectedWallet?._id === wallet._id && <CheckCircle2 className="text-blue-600" size={20} />}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* STEP 3 & 4: INSTRUCTIONS & UPLOAD (Only visible if wallet selected) */}
          {selectedWallet && (
            <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              
              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Transfer Instructions</h3>
                  <p className="text-xs text-slate-400 font-medium">Send exactly <strong className="text-white">${amount || "0.00"}</strong> worth of {selectedWallet.currency} to the address below.</p>
                </div>

                <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Deposit Address</Label>
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-none text-[9px] uppercase font-bold tracking-widest">
                      {selectedWallet.network} Network
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-sm md:text-base font-bold break-all text-blue-100 selection:bg-blue-500/30">
                      {selectedWallet.address}
                    </p>
                    <Button onClick={() => handleCopy(selectedWallet.address)} variant="secondary" size="icon" className="shrink-0 rounded-xl bg-white/10 hover:bg-white/20 text-white">
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                  <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-[10px] font-bold text-amber-500/80 leading-relaxed uppercase tracking-widest">
                    Only send {selectedWallet.currency} over the {selectedWallet.network} network to this address. Sending any other asset may result in permanent loss.
                  </p>
                </div>

                <Separator className="bg-white/10" />

                {/* UPLOAD RECEIPT */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 3: Upload Payment Proof</Label>
                  
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-[1.5rem] p-8 text-center cursor-pointer transition-all ${
                      receiptFile ? 'border-blue-500 bg-blue-500/5' : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                    }`}
                  >
                    {receiptFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <CheckCircle2 size={24} />
                        </div>
                        <p className="text-sm font-bold text-white mt-2">{receiptFile.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Click to change file</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-14 w-14 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                          <UploadCloud size={24} />
                        </div>
                        <p className="text-sm font-bold text-white mt-2">Click to upload receipt</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">JPG, PNG, or PDF</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !receiptFile}
                  className="w-full h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/50 group mt-4"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : (
                    <>Confirm & Submit Deposit <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </Button>

              </div>
              
              {/* Abstract Background Glows */}
              <div className="absolute -top-32 -right-32 h-96 w-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}