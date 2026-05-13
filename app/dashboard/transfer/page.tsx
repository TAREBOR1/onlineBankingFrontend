"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ChevronRight, 
  Fingerprint, 
  Check, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  User,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAccount } from "@/hooks/accountHooks";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/config/api";
import { useTransaction } from "@/hooks/transactionHooks";

export default function ManualTransferWizard() {
  const [step, setStep] = useState(1);
  const { myAccount, isAccountLoading } = useAccount();

  const {transfer}= useTransaction()
  
  // State for recipient validation
  const [recipientData, setRecipientData] = useState({
    firstName: "",
    lastName: "",
    toAccountId: "", 
    loading: false,
    error: ""
  });

  const [formData, setFormData] = useState({
    recipientAccountNumber: "", // The visual ACC... number
    amount: "",
    category: "general",
    note: "",
    sourceAccountId: "" // Set this from myAccount
  });

  // Initialize source account
  useEffect(() => {
    if (myAccount?.accounts?.length > 0) {
      setFormData(prev => ({ ...prev, sourceAccountId: myAccount.accounts[0]._id }));
    }
  }, [myAccount]);

  // Lookup Logic: Trigger when account number changes
  useEffect(() => {
    const lookupAccount = async () => {
      // Assuming your account numbers are roughly 16 chars (ACC...)
      if (formData.recipientAccountNumber.length > 10) {
        setRecipientData(prev => ({ ...prev, loading: true, error: "", firstName: "" }));
        
        try {
          // Replace with your actual API endpoint for account lookup
          const res = await api.get(`/api/account/getAccountInfo/${formData.recipientAccountNumber}`);
              res.data;
        console.log(res.data,'let me see')
         res.data.account[0]
          if (res.data.success ) {
            setRecipientData({
              firstName: res.data.account[0].userId.firstname,
              lastName: res.data.account[0].userId.lastname,
              toAccountId: res.data.account[0]._id, 
              loading: false,
              error: ""
            });
          } else {
            throw new Error("Account not found");
          }
        } catch (err) {
          setRecipientData(prev => ({ ...prev, loading: false, error: "Invalid account number", firstName: "" }));
        }
      }
    };

    const debounce = setTimeout(lookupAccount, 500);
    return () => clearTimeout(debounce);
  }, [formData.recipientAccountNumber]);

  const handleTransfer = async () => {
    const payload = {
      fromAccountId: formData.sourceAccountId,
      toAccountId: recipientData.toAccountId, 
      amount: parseFloat(formData.amount)
    };
    
    // Call your transfer API here

    transfer.mutate(payload)
    console.log("Sending Payload:", payload);
    setStep(4); 
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (isAccountLoading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-xl mx-auto p-6 md:pt-16 space-y-10">
        
        {/* HEADER & PROGRESS */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={step > 1 ? prevStep : undefined} 
            className={`rounded-full bg-slate-100 dark:bg-white/5 ${step >= 3 ? 'hidden' : ''}`}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-black tracking-tight dark:text-white uppercase">
              {step === 1 && "Recipient"}
              {step === 2 && "Amount"}
              {step === 3 && "Confirm"}
            </h1>
          </div>
          <div className="w-10" />
        </div>

        {/* STEP 1: RECIPIENT ACCOUNT */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-[0.2em] opacity-50 ml-1">Account Number</Label>
                <div className="relative">
                  <Input 
                    placeholder="ACC177..." 
                    value={formData.recipientAccountNumber}
                    onChange={(e) => setFormData({...formData, recipientAccountNumber: e.target.value})}
                    className="h-16 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border-none text-xl font-mono tracking-widest focus-visible:ring-2 focus-visible:ring-blue-600"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center">
                    {recipientData.loading ? (
                       <Loader2 className="animate-spin text-blue-600" />
                    ) : (
                      <CreditCard className="opacity-20" />
                    )}
                  </div>
                </div>

                {/* RECIPIENT NAME DISPLAY */}
                {recipientData.firstName && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-2xl animate-in zoom-in-95">
                    <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <User size={18} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-emerald-600">Verified Recipient</p>
                       <p className="font-bold dark:text-white capitalize">{recipientData.firstName} {recipientData.lastName}</p>
                    </div>
                  </div>
                )}

                {recipientData.error && (
                  <div className="flex items-center gap-2 px-4 text-red-500">
                    <AlertCircle size={14} />
                    <span className="text-xs font-bold">{recipientData.error}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-[0.2em] opacity-50 ml-1">From Wallet</Label>
                <Select 
                  defaultValue={formData.sourceAccountId} 
                  onValueChange={(v:any) => setFormData({...formData, sourceAccountId: v})}
                >
                  <SelectTrigger className="h-16 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border-none font-bold text-lg">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#111113] border-none rounded-2xl shadow-2xl">
                    {myAccount?.accounts?.map((acc: any) => (
                       <SelectItem key={acc._id} value={acc._id}>
                         {acc.currency} Wallet - Balance: {acc.balance}
                       </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              disabled={!recipientData.toAccountId || recipientData.loading}
              onClick={nextStep}
              className="w-full h-16 rounded-[2rem] bg-slate-900 dark:bg-white dark:text-black text-white text-lg font-black shadow-2xl group transition-all disabled:opacity-30"
            >
              Continue <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* STEP 2: AMOUNT (Simplified for brevity) */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-6 duration-500 text-center">
            <div className="py-6">
              <Label className="text-xs font-black text-blue-500 uppercase tracking-widest">Enter Amount</Label>
              <div className="flex items-center justify-center gap-1 mt-4">
                <span className="text-4xl font-black text-slate-300">$</span>
                <input 
                  type="number"
                  autoFocus
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="bg-transparent border-none text-7xl font-black focus:outline-none w-full text-center dark:text-white"
                  placeholder="0.00"
                />
              </div>
            </div>
            <Button 
              disabled={!formData.amount}
              onClick={nextStep}
              className="w-full h-16 rounded-[2rem] bg-blue-600 text-white text-lg font-black"
            >
              Review Transfer
            </Button>
          </div>
        )}

        {/* STEP 3: FINAL REVIEW */}
        {step === 3 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
             <Card className="border-none bg-slate-50 dark:bg-white/5 rounded-[2.5rem]">
                <CardContent className="p-8 space-y-6">
                   <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">To Recipient</span>
                        <p className="text-lg font-bold dark:text-white capitalize">{recipientData.firstName} {recipientData.lastName}</p>
                        <p className="text-xs font-mono opacity-50">{formData.recipientAccountNumber}</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <User size={24} />
                      </div>
                   </div>
                   
                   <div className="h-[1px] bg-slate-200 dark:bg-white/10" />

                   <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount to Send</span>
                        <p className="text-4xl font-black text-blue-600">${formData.amount}</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold italic">Instant</Badge>
                   </div>
                </CardContent>
             </Card>

             <Button 
                onClick={handleTransfer}
                className="w-full h-20 rounded-[2.5rem] bg-slate-900 dark:bg-white dark:text-black text-white text-xl font-black flex items-center justify-center gap-4 group"
             >
                <Fingerprint size={28} className="animate-pulse text-blue-500" />
                Confirm & Pay
             </Button>
          </div>
        )}

        {/* STEP 4: SUCCESS STATE (Same as your original code) */}
        {step === 4 && transfer.isSuccess && (
             <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in zoom-in-95 duration-700">
                <div className="h-32 w-32 rounded-[2.5rem] bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_50px_rgba(16,185,129,0.3)] rotate-12">
                    <Check size={64} strokeWidth={4} className="-rotate-12" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">Sent!</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Funds are on the way to {recipientData.firstName}</p>
                </div>
                <Button variant="ghost" onClick={() => setStep(1)} className="font-black text-slate-500 uppercase text-xs tracking-widest">Close</Button>
            </div>
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
    return <div className="p-8 space-y-8 max-w-xl mx-auto mt-20"><Skeleton className="h-16 w-full rounded-2xl" /><Skeleton className="h-64 w-full rounded-2xl" /></div>;
}