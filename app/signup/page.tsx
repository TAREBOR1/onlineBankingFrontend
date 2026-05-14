"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Check,
  Globe,
  Zap,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/loginHooks";
import { PublicRoute } from "@/components/Public";

export default function SignupPage() {

  const {register} = useAuth()

  const [formData, setFormData] = useState({
        firstname:'',
         lastname:'',
          email: '',
          password: ''
      })
  
       const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target
          setFormData(prev => ({ ...prev, [name]: value }))
      }
  
       const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
          e.preventDefault()
          const registerPayload={
              firstname:formData.firstname,
             lastname:formData.lastname,
              email:formData.email,
              password:formData.password
          }
     register.mutate(registerPayload)
  
      }

  return (
     <PublicRoute>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#050505]">
      
      {/* LEFT SIDE: BRANDED ONBOARDING AREA */}
      <div className="hidden lg:flex relative bg-blue-600 overflow-hidden items-center justify-center p-20">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-black/20 rounded-full blur-[80px]" />
        
        <div className="relative z-20 max-w-md space-y-12 text-white">
          <div className="space-y-6">
            <h2 className="text-5xl font-black tracking-tighter italic leading-[0.9]">
              The Future <br /> of Wealth <br /> Starts Here.
            </h2>
            <p className="text-blue-100 font-medium text-lg leading-relaxed">
              Join 50,000+ global citizens managing assets with institutional-grade security and borderless speed.
            </p>
          </div>

          <div className="space-y-4">
            <BenefitItem text="Instant Multi-Currency Accounts" />
            <BenefitItem text="Zero-Fee Internal Transfers" />
            <BenefitItem text="High-Yield Savings Vaults" />
          </div>

          <div className="pt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-blue-600 bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-100">
              Joined by world-class investors
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: THE SIGNUP FORM */}
      <div className="flex flex-col justify-center px-8 md:px-20 lg:px-32 relative">
        <div className="w-full max-w-md mx-auto space-y-8 py-12">
          
          {/* Header */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2 mb-8">
               {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group z-50">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center relative overflow-hidden shadow-lg border border-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-4 h-4 bg-white rounded-sm relative z-10" />
            </div>
            <span className="font-black text-[24px] tracking-tight text-slate-900">ModernBank</span>
          </div>
            </Link>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Create Account</h1>
            <p className="text-muted-foreground font-medium text-sm">Start your journey toward financial freedom.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">First Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                  <Input name='firstname' value={formData.firstname} onChange={handleChange} placeholder="John" className="h-12 pl-10 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold focus-visible:ring-2 focus-visible:ring-blue-600" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Last Name</Label>
                <Input name='lastname' value={formData.lastname} onChange={handleChange} placeholder="Doe" className="h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold focus-visible:ring-2 focus-visible:ring-blue-600" required />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                <Input name='email' value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" className="h-12 pl-10 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold focus-visible:ring-2 focus-visible:ring-blue-600" required />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Secure Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                <Input name='password' value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="h-12 pl-10 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold focus-visible:ring-2 focus-visible:ring-blue-600" required />
              </div>
            </div>

            {/* Terms Toggle (Stylized) */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-600/5 border border-blue-100 dark:border-blue-500/10">
              <div className="mt-0.5">
                <div className="h-5 w-5 rounded-md border-2 border-blue-600 flex items-center justify-center bg-white cursor-pointer group">
                  <Check className="h-3 w-3 text-blue-600 opacity-100" />
                </div>
              </div>
              <p className="text-[11px] font-medium leading-relaxed dark:text-slate-400">
                I agree to the <span className="text-blue-600 font-bold cursor-pointer">Terms of Service</span> and <span className="text-blue-600 font-bold cursor-pointer">Privacy Policy</span>. I understand that KYC verification is required for full access.
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={register.isPending}
              className="w-full cursor-pointer h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-md gap-3 shadow-xl shadow-blue-500/20 group"
            >
              {register.isPending ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create My Wallet <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm font-medium text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-black hover:underline inline-flex items-center gap-1">
              Login <ChevronRight size={14} />
            </Link>
          </p>
        </div>
      </div>
    </div>
      </PublicRoute>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
        <Check size={14} className="text-white" />
      </div>
      <span className="text-sm font-bold tracking-tight">{text}</span>
    </div>
  );

}