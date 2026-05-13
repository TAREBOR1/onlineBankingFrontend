"use client";

import React, { useState } from "react";
import { 
  Plus, 
  ShieldCheck, 
  Snowflake, 
  Eye, 
  EyeOff, 
  Settings, 
  Lock, 
  CreditCard,
  Smartphone,
  ChevronRight,
  Globe,
  Loader2,
  AlertCircle,
  Clock
} from "lucide-react";

import { Card as ShadCard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useCards } from "@/hooks/cardHooks";
import { useDashboard } from "@/hooks/dashboardHooks";

export default function CardManagement() {
  const { cards, isLoading, requestCard, isRequesting, toggleFreeze, reveal, isRevealing } = useCards();
  const { dashboard } = useDashboard();
  
  const [showDetails, setShowDetails] = useState(false);
  const [unmaskedData, setUnmaskedData] = useState<{ number: string; cvv: string } | null>(null);
  const [selectedBrand, setSelectedBrand] = useState("visa");

  // Find the most relevant card (Active takes priority, then Pending)
  const activeCard = cards.find((c: any) => c.status === "active");
  const pendingCard = cards.find((c: any) => c.status === "pending");

  console.log(cards,'see card')

  const handleReveal = async () => {
    if (showDetails) {
      setShowDetails(false);
      return;
    }

    if (!activeCard) return;

    try {
      const data = await reveal(activeCard._id);
      setUnmaskedData({ number: data.fullCardNumber, cvv: data.cvv });
      setShowDetails(true);

      // Auto-hide for security after 30 seconds
      setTimeout(() => {
        setShowDetails(false);
        setUnmaskedData(null);
      }, 30000);
    } catch (e) {
      // Error handled by hook toast
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0b]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight dark:text-white">My Cards</h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Manage your digital spending limits
            </p>
          </div>

          {/* Show request button only if no active or pending card exists */}
          {!activeCard && !pendingCard && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 shadow-xl shadow-blue-500/20">
                  <Plus className="mr-2 h-4 w-4" /> Request New Card
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] dark:bg-slate-900 border-none shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black">Request Virtual Card</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase opacity-60 ml-1">Select Network</label>
                    <Select onValueChange={setSelectedBrand} defaultValue="visa">
                      <SelectTrigger className="rounded-2xl h-14 bg-slate-50 dark:bg-slate-800 border-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="visa">Visa Platinum</SelectItem>
                        <SelectItem value="mastercard">Mastercard World</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-500/5 p-4 rounded-2xl border border-blue-100 dark:border-blue-500/20">
                    <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
                      Note: Your card will be generated and activated once an administrator approves your request.
                    </p>
                  </div>

                  <Button 
                    disabled={isRequesting}
                    onClick={() => requestCard({ 
                        accountId: dashboard.accounts[0]._id, 
                        brand: selectedBrand, 
                        cardHolderName: `${dashboard.accounts[0].userId.firstname} ${dashboard.accounts[0].userId.lastname}` 
                    })}
                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg"
                  >
                    {isRequesting ? <Loader2 className="animate-spin h-5 w-5" /> : "Confirm Request"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* MAIN INTERFACE */}
        {!activeCard ? (
          <div className="space-y-6">
            {pendingCard ? (
              <ShadCard className="border-none shadow-xl bg-white dark:bg-[#111113] rounded-[2.5rem] p-12 text-center">
                <div className="h-16 w-16 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-amber-600 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold dark:text-white">Request Pending Approval</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-2 font-medium">
                  Your request for a {pendingCard.brand} card is being reviewed by our compliance team.
                </p>
              </ShadCard>
            ) : (
              <ShadCard className="border-none shadow-xl bg-white dark:bg-[#111113] rounded-[2.5rem] p-16 text-center">
                <CreditCard className="mx-auto h-16 w-16 text-slate-200 mb-6" />
                <h3 className="text-xl font-bold dark:text-white">No Active Cards Found</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2">
                  Request your first virtual card to start making secure online payments.
                </p>
              </ShadCard>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in zoom-in-95 duration-500">
            
            {/* CARD VISUALIZER */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`relative transition-all duration-700 ${activeCard.status === "blocked" ? "grayscale opacity-60 scale-95" : "scale-100"}`}>
                <div className="w-full aspect-[1.58/1] rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900 p-8 relative text-white flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden">
                  
                  <div className="flex justify-between items-center italic font-black uppercase text-xs tracking-widest opacity-80">
                    <span className="flex items-center gap-1.5"><Globe size={12}/> Virtual Card</span>
                    <span>{activeCard.brand}</span>
                  </div>
                  
                  <div className="space-y-1 relative z-10">
                    <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Card Number</p>
                    <div className="text-xl md:text-2xl font-mono tracking-[0.2em]">
                      {showDetails && unmaskedData 
                        ? unmaskedData.number.match(/.{1,4}/g)?.join(" ") 
                        : `**** **** **** ${activeCard.last4}`}
                    </div>
                  </div>

                  <div className="flex justify-between items-end relative z-10">
                    <div className="space-y-1">
                      <p className="text-[8px] uppercase font-bold opacity-40">Card Holder</p>
                      <p className="text-sm font-bold uppercase tracking-tight">{activeCard.cardHolderName}</p>
                    </div>
                    <div className="flex gap-6">
                      <div className="space-y-1 text-center">
                        <p className="text-[8px] uppercase font-bold opacity-40">Expiry</p>
                        <p className="text-xs font-mono">{activeCard.expiryMonth}/{activeCard.expiryYear.toString().slice(-2)}</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-[8px] uppercase font-bold opacity-40">CVV</p>
                        <p className="text-xs font-mono">{showDetails && unmaskedData ? unmaskedData.cvv : "***"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
                </div>
                
                {activeCard.status === "blocked" && (
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Badge className="bg-white/90 text-slate-900 font-black px-4 py-2 rounded-full backdrop-blur-md shadow-lg border-none">
                         <Snowflake size={14} className="mr-2" /> CARD FROZEN
                      </Badge>
                   </div>
                )}
              </div>

              <Button 
                onClick={handleReveal}
                disabled={isRevealing}
                variant="outline" 
                className="w-full h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold gap-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isRevealing ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : showDetails ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
                {showDetails ? "Hide Sensitive Data" : "Reveal Card Numbers"}
              </Button>
            </div>

            {/* CARD CONTROLS */}
            <div className="lg:col-span-3 space-y-6">
              <ShadCard className="border-none shadow-xl bg-white dark:bg-[#111113] rounded-[2.5rem] p-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-muted-foreground flex items-center gap-2">
                  Security Controls <Settings size={14} className="text-blue-500" />
                </h3>

                <div className="space-y-2">
                  <ControlRow 
                    icon={<Snowflake className={activeCard.status === "blocked" ? "text-blue-500" : "text-slate-400"} />}
                    title="Freeze Card"
                    desc="Temporarily disable all transactions."
                    action={
                      <Switch 
                        checked={activeCard.status === "blocked"} 
                        onCheckedChange={() => toggleFreeze(activeCard._id)} 
                      />
                    }
                  />
                  
                  <div className="h-[1px] bg-slate-50 dark:bg-slate-800/50 my-2" />
                  
                  <ControlRow 
                    icon={<ShieldCheck className="text-emerald-500" />}
                    title="Fraud Protection"
                    desc="Real-time AI monitoring enabled."
                    action={<Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">Active</Badge>}
                  />

                  <div className="h-[1px] bg-slate-50 dark:bg-slate-800/50 my-2" />

                  <div className="flex items-center justify-between py-4 group cursor-pointer">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-amber-500">
                        <Lock size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black dark:text-slate-100">Reset Card PIN</h4>
                        <p className="text-xs text-muted-foreground">Change your 4-digit security code.</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ShadCard>

              {/* SECURITY TIP */}
              <div className="p-6 bg-blue-600 rounded-[2rem] text-white flex items-center gap-4 shadow-xl shadow-blue-500/20">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Safety First</p>
                  <p className="text-sm font-bold leading-tight">Never share your CVV or Card PIN with anyone, even bank staff.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ControlRow({ icon, title, desc, action }: any) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex gap-4 items-center">
        <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-transparent dark:border-white/5">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-black dark:text-slate-100 leading-none mb-1">{title}</h4>
          <p className="text-[11px] text-muted-foreground font-medium">{desc}</p>
        </div>
      </div>
      {action}
    </div>
  );
}