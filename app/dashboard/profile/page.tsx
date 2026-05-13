"use client";

import React, { useState, useRef } from "react";
import { 
  Camera, Lock, LogOut, ChevronRight, CheckCircle2, 
  Clock, Loader2, Mail, Phone, ShieldCheck, Globe, Cpu 
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/profileHooks";
import { useAuth } from "@/hooks/loginHooks";

export default function SmartProfilePage() {
  const { user, isLoading, updateProfile, isUpdating, changePassword, isChangingPass } = useProfile();
    const {logout}=useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [phone, setPhone] = useState("");
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "" });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      updateProfile(formData);
    }
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-[#080808]">
      <Loader2 className="animate-spin text-blue-600 h-8 w-8" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#080808] text-slate-900 dark:text-slate-100 p-4 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* TOP INTERFACE HEADER */}
        <div className="flex justify-between items-end border-b border-slate-100 dark:border-white/5 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight uppercase italic">Account Node</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Live Session • {user?._id.slice(-12).toUpperCase()}</p>
          </div>
          <Badge variant="outline" className="rounded-lg border-blue-500/20 text-blue-600 font-bold px-3 py-1 text-[10px] uppercase">
            Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* USER IDENTITY CARD */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-sm bg-white dark:bg-[#111113] rounded-[2.5rem] p-8 text-center border border-slate-100 dark:border-white/5">
              <div className="relative inline-block mx-auto mb-6">
                <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-slate-50 dark:border-zinc-800 shadow-xl">
                  <AvatarImage src={user?.avatar} className="object-cover" />
                  <AvatarFallback className="bg-blue-600 text-white text-3xl font-black italic">
                    {user?.firstname?.[0]}{user?.lastname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  size="icon" 
                  className="cursor-pointer absolute bottom-0 right-0 rounded-full h-9 w-9 bg-slate-900 dark:bg-white dark:text-black shadow-lg"
                >
                  {isUpdating ? <Loader2 className="animate-spin h-4 w-4" /> : <Camera size={14} />}
                </Button>
              </div>
              
              <h2 className="text-xl font-black uppercase italic tracking-tighter">{user?.firstname} {user?.lastname}</h2>
              
              <div className="mt-8 space-y-2">
                <StatusBadge icon={<ShieldCheck size={12}/>} label="Verification" value={user?.kycStatus} active={user?.kycStatus === 'verified'} />
                <StatusBadge icon={<Globe size={12}/>} label="Protocol" value={user?.status} active={user?.status === 'active'} />
              </div>
            </Card>
          </div>

          {/* CONFIGURATION HUB */}
          <div className="lg:col-span-8">
            <Card className="border-none shadow-sm bg-white dark:bg-[#111113] rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Parameters</h3>
                 <Dialog>
                    <DialogTrigger >
                      <Button onClick={() => setPhone(user?.phone || "")} className="cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-11 text-xs">
                        Update Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[2.5rem] dark:bg-[#111113] border-none shadow-2xl p-8">
                       <DialogHeader><DialogTitle className="text-xl font-black uppercase italic tracking-tighter">Modify Credentials</DialogTitle></DialogHeader>
                       <Tabs defaultValue="phone" className="mt-4">
                          <TabsList className="grid w-full grid-cols-2 bg-slate-50 dark:bg-white/5 rounded-xl p-1 mb-6">
                            <TabsTrigger value="phone" className="rounded-lg font-bold py-2.5">Mobile</TabsTrigger>
                            <TabsTrigger value="pass" className="rounded-lg font-bold py-2.5">Security</TabsTrigger>
                          </TabsList>
                          <TabsContent value="phone" className="space-y-4">
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none px-5 font-bold" />
                            <Button onClick={() => {
                                const fd = new FormData();
                                fd.append("phone", phone);
                                updateProfile(fd);
                            }} disabled={isUpdating} className="w-full h-14 rounded-2xl bg-blue-600 font-black uppercase text-xs">
                              {isUpdating ? <Loader2 className="animate-spin" /> : "Save Changes"}
                            </Button>
                          </TabsContent>
                          <TabsContent value="pass" className="space-y-4">
                            <Input type="password" placeholder="Current Password" onChange={(e) => setPassForm({...passForm, currentPassword: e.target.value})} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none px-5" />
                            <Input type="password" placeholder="New Password" onChange={(e) => setPassForm({...passForm, newPassword: e.target.value})} className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none px-5" />
                            <Button onClick={() => changePassword(passForm)} disabled={isChangingPass} className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase text-xs">
                              {isChangingPass ? <Loader2 className="animate-spin" /> : "Verify & Update"}
                            </Button>
                          </TabsContent>
                       </Tabs>
                    </DialogContent>
                 </Dialog>
              </div>

              <div className="space-y-8">
                <DataRow icon={<Mail size={18} />} label="Identifier" value={user?.email} />
                <DataRow icon={<Phone size={18} />} label="Mobile Link" value={user?.phone || "Not Configured"} />
                <DataRow icon={<Cpu size={18} />} label="System Permissions" value={user?.status} />
              </div>

              <Separator className="bg-slate-50 dark:bg-white/5 my-10" />

              <Button onClick={()=>{logout.mutate()}} variant="ghost" className="cursor-pointer w-full h-14 rounded-2xl text-rose-500 hover:bg-rose-500/5 font-black uppercase text-[10px] tracking-[0.2em] gap-3">
                <LogOut size={16} /> Terminate System Session
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ icon, label, value, active }: any) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/5 border border-slate-100 dark:border-white/5">
      <div className="flex items-center gap-2">
        <span className={active ? "text-blue-600" : "text-slate-400"}>{icon}</span>
        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <span className={`text-[10px] font-black uppercase ${active ? "text-emerald-500" : "text-amber-500"}`}>{value}</span>
    </div>
  );
}

function DataRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between group cursor-default">
      <div className="flex items-center gap-5">
        <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-[9px] font-black uppercase opacity-30 tracking-widest leading-none mb-1">{label}</p>
          <p className="text-sm font-bold dark:text-white">{value}</p>
        </div>
      </div>
      <ChevronRight size={14} className="text-slate-200 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
    </div>
  );
}