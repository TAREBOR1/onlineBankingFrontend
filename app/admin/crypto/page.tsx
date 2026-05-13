"use client";

import React, { useState } from "react";
import { Plus, Wallet, Trash2, Copy, Globe, QrCode, ArrowRight, ShieldCheck, ImageIcon, Lock, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAdminWallets } from "@/hooks/adminWalletHooks";
import toast from "react-hot-toast";



type FormData = {
  currency: string;
  symbol: string;
  network: any;
  address: string;
  logoUrl: string;
};

const initialFormData: FormData = {
  currency: "",
  symbol: "",
  network: "",
  address: "",
  logoUrl: "",
};


export default function AdminWalletSettings() {
  const { wallets, isLoading, addWallet, isAdding, deleteWallet, isDeleting } = useAdminWallets();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");
  };

  const handleSubmit = () => {
    addWallet(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setFormData({ currency: "", symbol: "", network: "", address: "", logoUrl: "" });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] dark:bg-[#080808] p-4 md:p-8 pt-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase italic">Vault Assets</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-70 italic">Configure crypto logos and deposit gateways</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger >
              <Button className="h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black px-8 shadow-xl shadow-blue-500/20 gap-2">
                <Plus size={20} /> Add New Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl rounded-[2.5rem] dark:bg-[#0d0d0d] border-slate-800 p-8">
              <DialogHeader className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                    <Wallet size={24} />
                </div>
                <DialogTitle className="text-2xl font-black tracking-tighter italic uppercase">Register Vault Asset</DialogTitle>
                <DialogDescription className="text-xs font-bold uppercase tracking-widest text-blue-500">Add asset details below</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Asset Name</Label>
                    <Input placeholder="e.g. Bitcoin" value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Symbol</Label>
                        <Input placeholder="BTC" value={formData.symbol} onChange={e => setFormData({...formData, symbol: e.target.value})} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Network</Label>
                        <Select onValueChange={val => setFormData({...formData, network: val})}>
                            <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold text-xs">
                                <SelectValue placeholder="Chain Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ERC20">ERC20</SelectItem>
                                <SelectItem value="TRC20">TRC20</SelectItem>
                                <SelectItem value="BEP20">BEP20</SelectItem>
                                <SelectItem value="Native">Native</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1 flex items-center gap-2">
                        <ImageIcon size={12} /> Crypto Logo URL
                    </Label>
                    <Input placeholder="https://example.com/logo.png" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none text-xs font-medium" />
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Public Receive Address</Label>
                    <Input placeholder="Paste address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-mono text-sm tracking-tighter" />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleSubmit} disabled={isAdding || !formData.address || !formData.network} className="w-full h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-lg gap-3 shadow-xl">
                  {isAdding ? <Loader2 className="animate-spin" /> : <>Activate Asset <ArrowRight size={20} /></>}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* ACTIVE WALLETS LIST */}
        {isLoading ? (
            <div className="p-20 flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wallets.map((wallet: any) => (
                <Card key={wallet._id} className="border-none shadow-xl bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden group border border-transparent hover:border-blue-500/10 transition-all">
                <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center p-2 shadow-inner overflow-hidden border border-slate-100 dark:border-white/5">
                            {wallet.logoUrl ? (
                                <img src={wallet.logoUrl} alt={wallet.currency} className="w-full h-full object-contain" />
                            ) : (
                                <Globe size={24} className="text-blue-600" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-black text-xl dark:text-white leading-none tracking-tight">{wallet.currency} ({wallet.symbol})</h3>
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1.5">{wallet.network}</p>
                        </div>
                    </div>
                    <Button onClick={() => deleteWallet(wallet._id)} disabled={isDeleting} variant="ghost" size="icon" className="rounded-full text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                    </Button>
                    </div>

                    <div className="space-y-4">
                        <div onClick={() => handleCopy(wallet.address)} className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all cursor-pointer group/address">
                            <p className="text-[9px] font-black uppercase opacity-40 mb-2 tracking-widest">Public Deposit Key</p>
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[11px] truncate max-w-[220px] opacity-70 group-hover/address:opacity-100 tracking-tighter">{wallet.address}</span>
                                <Copy size={14} className="text-blue-500" />
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between px-2 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status: Active</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        )}

      </div>
    </div>
  );
}