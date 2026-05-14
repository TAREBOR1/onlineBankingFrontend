"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/loginHooks";
import { PublicRoute } from "@/components/Public";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {login}=useAuth()

      const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

     const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

     const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const loginPayload={
            email:formData.email,
            password:formData.password
        }
   login.mutate(loginPayload)

    }

  return (
    <PublicRoute>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#050505]">
      
      {/* LEFT SIDE: THE FORM */}
      <div className="flex flex-col justify-center px-8 md:px-20 lg:px-32 relative overflow-hidden">
        {/* Abstract Background Blur for Form Side */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 w-full max-w-md mx-auto space-y-10">
          
          {/* Logo & Header */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
                {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group z-50">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center relative overflow-hidden shadow-lg border border-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-4 h-4 bg-white rounded-sm relative z-10" />
            </div>
            <span className="font-black text-[24px] tracking-tight text-slate-900">ModernBank</span>
          </div>
            </Link>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white leading-tight">
              Welcome back to <br /> 
              <span className="text-blue-600">Secure Access.</span>
            </h1>
            <p className="text-muted-foreground font-medium">Enter your credentials to manage your assets.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Account Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com" 
                    className="h-14 pl-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold focus-visible:ring-2 focus-visible:ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Password</Label>
                  <Link href="/auth/forgot" className="text-[10px] font-black uppercase text-blue-600 hover:underline">Forgot Access?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="h-14 pl-12 pr-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold focus-visible:ring-2 focus-visible:ring-blue-600"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2  -translate-y-1/2 text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={login.isPending}
              className="w-full h-16 rounded-2xl bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-black text-lg gap-3 shadow-xl shadow-blue-500/20 group relative overflow-hidden"
            >
              {login.isPending ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Secure Login <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm font-medium text-muted-foreground">
            New to the platform?{" "}
            <Link href="/signup" className="text-blue-600 font-black hover:underline">Create an Account</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: BRANDED VISUAL AREA */}
      <div className="hidden lg:flex relative bg-slate-900 overflow-hidden items-center justify-center p-20">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent z-10" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />

        {/* Floating Security Cards */}
        <div className="relative z-20 space-y-8 max-w-lg">
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl transform hover:-rotate-2 transition-transform duration-500">
             <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6">
                <ShieldCheck size={28} />
             </div>
             <h3 className="text-2xl font-black text-white italic tracking-tighter">Military Grade Encryption</h3>
             <p className="text-white/60 mt-2 font-medium leading-relaxed">Your assets are protected by advanced AES-256 standards and multi-factor authentication protocols.</p>
          </div>

          <div className="flex gap-4 translate-x-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Fingerprint size={24} />
               </div>
               <div>
                  <p className="text-white font-bold text-sm">Biometric Unlock</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Active Status</p>
               </div>
            </div>
            
            <div className="bg-blue-600 p-6 rounded-3xl flex items-center gap-4 shadow-xl shadow-blue-500/20">
               <Sparkles className="text-white h-6 w-6" />
               <p className="text-white font-black text-sm uppercase tracking-tighter italic">V 3.0</p>
            </div>
          </div>

        </div>

        {/* Footer Text */}
        <div className="absolute bottom-10 text-white/20 font-black text-[10rem] select-none tracking-tighter uppercase italic -rotate-12 pointer-events-none whitespace-nowrap">
          NEXUS TRUST
        </div>
      </div>
    </div>
    </PublicRoute>
  );
}