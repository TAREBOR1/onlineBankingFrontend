"use client";

import React, { useState, useEffect } from "react";
import {
  Menu, X, ChevronRight, ChevronDown, ShieldCheck, 
  TrendingUp, CreditCard, Lock, ArrowRight, Smartphone, 
  PieChart, Home, User, Zap, Globe, Plus, Minus,
  Briefcase, Building, CheckCircle2, ArrowUpRight,
  ChevronLeft, Fingerprint, BarChart3
} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/config/api";

// --- Custom CSS for Minimal Animations & Semicircular Menu Reveal ---
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 40s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up {
      animation: fadeUp 0.6s ease-out forwards;
    }
    
    /* Mobile Menu Semicircular Ease-In Effect */
    .menu-clip {
      clip-path: circle(0px at calc(100% - 40px) 40px);
      transition: clip-path 0.7s cubic-bezier(0.65, 0, 0.15, 1), opacity 0.4s ease;
    }
    .menu-clip.open {
      clip-path: circle(150vmax at calc(100% - 40px) 40px);
    }
  `}} />
);

export default function LuxuryBankingLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  
  // Testimonial Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  const router = useRouter();

  useEffect(() => {
    // Increased threshold slightly to prevent top-bounce flicker
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await api.get("/");
        console.log(response.data);
      } catch (error) {
        console.error("Backend ping failed:", error);
      }
    };
    pingBackend();
  }, []);

  const navItems = [
    { title: "Personal Banking", hasMega: true },
    { title: "Business Banking", hasMega: false },
    { title: "Investments", hasMega: false },
    { title: "Insurance", hasMega: false },
    { title: "Security", hasMega: false }
  ];

  const personalBankingContent = [
    { heading: "Accounts", links: ["Checking Accounts", "Savings Accounts", "Student Banking", "Joint Accounts"] },
    { heading: "Cards", links: ["Travel Rewards", "Cashback Cards", "Premium Credit Cards", "Business Cards"] },
    { heading: "Loans", links: ["Mortgage Loans", "Auto Loans", "Personal Loans", "Refinancing"] }
  ];

  const testimonials = [
    { name: "Sophia Martinez", role: "Entrepreneur", quote: "The experience feels luxurious while still being incredibly easy to use. It perfectly bridges the gap between traditional banking trust and fintech innovation." },
    { name: "Daniel Kim", role: "Creative Director", quote: "The mobile banking experience is smooth, modern, and beautifully designed. Managing our agency's cash flow has never been more intuitive." },
    { name: "Michael Carter", role: "Small Business Owner", quote: "Managing payroll and vendor payments has never been this seamless. The analytics tools give me total clarity on our runway." },
    { name: "Emily Johnson", role: "Financial Consultant", quote: "The investment dashboards and portfolio analytics tools rival dedicated brokerage platforms. Exceptional clarity and speed." },
    { name: "James Wilson", role: "Startup Founder", quote: "It combines the impenetrable trust of a traditional corporate bank with the rapid, premium feel of a top-tier fintech app." }
  ];

  // Auto-play for the Testimonial Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const partners = ["Visa", "Mastercard", "Apple Pay", "PayPal", "Stripe", "American Express", "Bloomberg", "Forbes", "CNBC"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <CustomStyles />
      
      {/* --- Ambient Background Mesh --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute top-[30%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      {/* --- Navigation --- */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          // Added border-transparent to the unscrolled state to prevent layout shift flicker
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm h-[80px]" 
            : "bg-transparent border-b border-transparent h-[92px]"
        } flex items-center`}
        onMouseLeave={() => setActiveMegamenu(null)}
      >
        <div className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group z-50">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center relative overflow-hidden shadow-lg border border-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-4 h-4 bg-white rounded-sm relative z-10" />
            </div>
            <span className="font-black text-[24px] tracking-tight text-slate-900">ModernBank</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {navItems.map((item) => (
              <div 
                key={item.title}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasMega ? setActiveMegamenu(item.title) : setActiveMegamenu(null)}
              >
                <button className="flex items-center gap-1.5 font-bold text-[15px] text-slate-700 hover:text-blue-600 transition-colors group py-8">
                  {item.title}
                  {item.hasMega && (
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeMegamenu === item.title ? "rotate-180 text-blue-600" : ""}`} />
                  )}
                  <span className="absolute bottom-6 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5 z-50">
            <button onClick={() => {router.replace('/login')}} className="text-slate-900 font-bold text-[15px] hover:text-blue-600 transition-colors">
              Sign In
            </button>
            <button onClick={() => {router.replace('/signup')}} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full text-[15px] font-bold transition-all duration-300 shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:-translate-y-0.5">
              Open Account
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-slate-900 z-50 bg-white/80 backdrop-blur p-2.5 rounded-xl border border-gray-200 shadow-sm transition-colors hover:bg-gray-50" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- Megamenu (Desktop) --- */}
        <div 
          className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl overflow-hidden hidden lg:block transition-all duration-300 origin-top ${
            activeMegamenu === "Personal Banking" ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
          }`}
        >
          <div className="max-w-[1320px] mx-auto px-12 py-12 grid grid-cols-12 gap-12">
            <div className="col-span-8 grid grid-cols-3 gap-10">
              {personalBankingContent.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6">{col.heading}</h4>
                  <ul className="space-y-4">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-base font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                          {link} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-span-4 bg-blue-50 rounded-[32px] p-8 border border-blue-100 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Modern Online Banking</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-8 font-medium">Experience seamless banking with real-time analytics, smart budgeting, and secure payments built for you.</p>
              </div>
              <button className="text-blue-600 font-black text-base flex items-center gap-2 group/btn relative z-10">
                Explore Premium <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Nav Drawer (Semicircular Ease-In) --- */}
        <div 
          className={`absolute top-0 left-0 w-full bg-white/95 backdrop-blur-3xl lg:hidden z-40 h-screen menu-clip ${
            mobileMenuOpen ? "open opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col gap-2 h-full pt-28 px-6 pb-20 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.title} className="border-b border-gray-100">
                <button 
                  onClick={() => item.hasMega ? setMobileExpanded(mobileExpanded === item.title ? null : item.title) : null}
                  className="w-full py-5 flex justify-between items-center text-2xl font-black text-slate-900"
                >
                  {item.title}
                  {item.hasMega && (
                    <ChevronDown size={24} className={`transition-transform duration-300 ${mobileExpanded === item.title ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                  )}
                </button>
                
                {/* Mobile Mega Menu Accordion */}
                {item.hasMega && (
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileExpanded === item.title ? "max-h-[800px] opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col gap-6 pl-4 pt-2 border-l-2 border-blue-100 ml-2">
                      {personalBankingContent.map(col => (
                        <div key={col.heading}>
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">{col.heading}</h4>
                          <ul className="space-y-3">
                            {col.links.map(link => (
                              <li key={link}>
                                <a href="#" className="text-base font-bold text-slate-600 hover:text-blue-600 transition-colors">{link}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-8 flex flex-col gap-4 mt-auto">
              <button onClick={() => {router.replace('/signup')}} className="bg-blue-600 text-white px-6 py-4 rounded-full text-lg font-black w-full text-center shadow-lg shadow-blue-600/20">
                Open Account
              </button>
              <button onClick={() => {router.replace('/login')}} className="text-slate-900 bg-gray-100 px-6 py-4 rounded-full text-lg font-black w-full text-center hover:bg-gray-200 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 lg:px-12 max-w-[1320px] mx-auto z-10 min-h-[90vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center w-full">
          
          {/* Hero Content */}
          <div className="max-w-2xl relative z-20 animate-fade-up">
            <div className="flex flex-wrap gap-3 mb-6 md:mb-8">
              {[
                { text: "FDIC Insured", icon: ShieldCheck },
                { text: "Premium Security", icon: Lock }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm text-[12px] md:text-xs font-bold text-slate-800">
                  <badge.icon size={14} className="text-blue-600" /> {badge.text}
                </div>
              ))}
            </div>
            
            <h1 className="text-[44px] md:text-6xl lg:text-[82px] font-black tracking-tight leading-[1.05] mb-6 md:mb-8 text-slate-900">
              Bank smarter with a modern financial experience
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 md:mb-12 leading-relaxed max-w-xl font-medium">
              Manage spending, savings, investments, and credit cards from one beautifully designed, enterprise-grade banking platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => {router.replace('/signup')}} className="bg-blue-600 hover:bg-blue-700 text-white px-9 py-5 rounded-full text-base md:text-lg font-black transition-all duration-300 shadow-[0_15px_30px_rgba(37,99,235,0.2)] hover:-translate-y-1 text-center">
                Open an Account
              </button>
              <button className="bg-white hover:bg-gray-50 text-slate-900 border border-gray-200 px-9 py-5 rounded-full text-base md:text-lg font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md group">
                Explore Features <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Minimal Device Mockup */}
          <div className="relative h-[600px] md:h-[750px] hidden md:flex items-center justify-center z-10 w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative w-[340px] h-[720px] bg-white rounded-[40px] border-[8px] border-slate-900 shadow-2xl overflow-hidden z-20 flex flex-col">
              
              <div className="flex-1 bg-slate-50 pt-10 px-5 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Good morning</h2>
                    <p className="text-[12px] font-bold text-slate-500">Isabella Wright</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black">
                    IW
                  </div>
                </div>

                <div className="bg-blue-600 rounded-[24px] p-6 text-white shadow-xl shadow-blue-600/20 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <div className="text-xs font-bold text-white/80 mb-1 flex items-center justify-between">
                    <span>Total Checking</span>
                    <ShieldCheck size={14} className="text-blue-300" />
                  </div>
                  <div className="text-[32px] font-black mb-5 tracking-tight">$84,250.00</div>
                  <div className="flex gap-3 relative z-10">
                    <button className="flex-1 bg-white/20 hover:bg-white/30 rounded-xl py-2.5 text-[11px] font-black flex items-center justify-center gap-1.5 transition-colors"><ArrowUpRight size={14} /> Send</button>
                    <button className="flex-1 bg-white text-blue-600 hover:bg-gray-50 rounded-xl py-2.5 text-[11px] font-black flex items-center justify-center gap-1.5 transition-colors"><Plus size={14} /> Add</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
                     <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                       <BarChart3 className="text-emerald-600" size={14} />
                     </div>
                     <div className="text-[11px] font-bold text-slate-500">Investments</div>
                     <div className="text-lg font-black text-slate-900">$142.5K</div>
                   </div>
                   <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
                     <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                       <CreditCard className="text-blue-600" size={14} />
                     </div>
                     <div className="text-[11px] font-bold text-slate-500">Virtual Card</div>
                     <div className="text-lg font-black text-slate-900">Active</div>
                   </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-black text-slate-900">Recent Activity</h3>
                    <span className="text-[11px] font-bold text-blue-600 cursor-pointer">See All</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Whole Foods", cat: "Groceries", amt: "-$145.20", icon: Smartphone, bg: "bg-slate-100 text-slate-600" },
                      { name: "Salary Deposit", cat: "Income", amt: "+$6,200.00", icon: TrendingUp, bg: "bg-emerald-50 text-emerald-600", isPos: true },
                      { name: "Equinox", cat: "Fitness", amt: "-$250.00", icon: Zap, bg: "bg-indigo-50 text-indigo-600" }
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${tx.bg}`}>
                            <tx.icon size={16} strokeWidth={2.5} />
                          </div>
                          <div>
                            <div className="text-[13px] font-black text-slate-900">{tx.name}</div>
                            <div className="text-[11px] font-bold text-slate-500">{tx.cat}</div>
                          </div>
                        </div>
                        <div className={`text-[13px] font-black ${tx.isPos ? 'text-emerald-600' : 'text-slate-900'}`}>{tx.amt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-[20%] -right-[40px] z-30 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3 w-56 transform translate-y-[-10px]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="text-emerald-600" size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900">Apple Pay</div>
                <div className="text-[11px] font-bold text-slate-500">Payment successful</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Marquee Logos Section --- */}
      <section className="py-10 md:py-12 border-y border-gray-200 bg-white/50 relative z-20 overflow-hidden">
        <div className="w-full mx-auto px-4">
          <p className="text-center text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest mb-6 md:mb-8">Trusted by millions worldwide</p>
          <div className="w-full flex overflow-hidden relative">
             <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
             <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />
             <div className="flex space-x-12 md:space-x-24 min-w-max animate-marquee opacity-50 items-center">
               {[...partners, ...partners].map((logo, i) => (
                 <div key={i} className="text-xl md:text-3xl font-black tracking-tighter text-slate-900 italic">
                   {logo}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- Smart Online Banking Section --- */}
      <section className="py-20 md:py-[120px] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
             <div className="aspect-square md:aspect-[4/3] bg-slate-50 rounded-[32px] md:rounded-[40px] overflow-hidden border border-gray-100 flex items-center justify-center p-6 md:p-10 shadow-sm relative">
               <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop" alt="Online Banking on Laptop" className="w-full h-full object-cover rounded-[20px] md:rounded-[24px] shadow-lg" />
             </div>
          </div>

          <div className="order-1 lg:order-2">
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <Globe className="text-blue-600" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[52px] font-black text-slate-900 mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Smart online banking tools
             </h2>
             <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium">
               Highlight seamless banking tools including bill payments, instant transfers, budgeting, savings automation, and deep spending insights.
             </p>
             <div className="space-y-4 md:space-y-5">
               {[
                 "Instant money transfers globally", 
                 "Automated bill payments & scheduling", 
                 "Advanced budgeting tools", 
                 "Real-time analytics and insights"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 md:gap-4 text-base md:text-lg font-bold text-slate-800">
                   <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                     <CheckCircle2 size={16} className="text-blue-600" />
                   </div>
                   {item}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- Premium Credit Cards Section --- */}
      <section className="py-20 md:py-[120px] bg-slate-50 overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <CreditCard className="text-amber-500" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[52px] font-black text-slate-900 mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Premium credit card experiences
             </h2>
             <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium">
               Display luxury credit card visuals with cashback rewards, elite travel benefits, smart spending controls, and robust analytics.
             </p>
             <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-8 md:mb-10">
               {["Cashback rewards", "Travel points", "Virtual card generation", "Card freezing & security controls"].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-sm md:text-base font-bold text-slate-800">
                   <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                   {item}
                 </div>
               ))}
             </div>
             <button className="text-blue-600 font-black text-base md:text-lg flex items-center gap-2 group hover:text-blue-700 transition-colors">
                Explore Premium Cards <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
             <div className="relative w-full max-w-md z-10 flex items-center justify-center">
               <div className="w-full relative h-[300px] md:h-[400px]">
                 <div className="absolute top-0 right-10 md:right-16 w-[280px] md:w-[360px] aspect-[1.586] bg-slate-900 rounded-[20px] md:rounded-[24px] shadow-2xl p-6 md:p-8 border border-slate-700 z-10 transform rotate-[-8deg] hover:rotate-0 transition-transform duration-500">
                    <div className="w-10 h-6 md:w-14 md:h-10 bg-amber-500 rounded mb-8 md:mb-12 opacity-90" />
                    <div className="text-white/90 font-mono text-lg md:text-2xl tracking-[0.2em] mb-4 md:mb-6">•••• •••• •••• 8821</div>
                    <div className="flex justify-between items-center text-white/70">
                      <div className="text-[10px] md:text-sm font-black tracking-widest uppercase">Reserve Elite</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10" />
                    </div>
                 </div>

                 <div className="absolute bottom-0 left-4 md:left-8 w-[280px] md:w-[360px] aspect-[1.586] bg-blue-600 rounded-[20px] md:rounded-[24px] shadow-2xl p-6 md:p-8 border border-blue-500 z-20 transform rotate-[5deg] hover:-translate-y-4 transition-transform duration-500">
                    <div className="w-10 h-6 md:w-14 md:h-10 bg-white/80 rounded mb-8 md:mb-12 shadow-sm" />
                    <div className="text-white font-mono text-lg md:text-2xl tracking-[0.2em] mb-4 md:mb-6">•••• •••• •••• 1042</div>
                    <div className="flex justify-between items-center text-white">
                      <div className="text-[10px] md:text-sm font-black tracking-widest uppercase">Platinum</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20" />
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- Wealth Management Section --- */}
      <section className="py-20 md:py-[120px] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] bg-slate-900 rounded-[32px] md:rounded-[40px] overflow-hidden p-6 md:p-10 relative shadow-2xl flex flex-col justify-end">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600&auto=format&fit=crop" alt="Trading Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
              
              <div className="relative z-10 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                 <div className="flex justify-between items-center mb-4 md:mb-6">
                   <div className="text-white/80 font-bold text-xs md:text-sm">Portfolio Value</div>
                   <div className="text-blue-100 bg-blue-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">+12.4% YTD</div>
                 </div>
                 <div className="text-3xl md:text-4xl font-black text-white mb-6 md:mb-8">$1,245,890.50</div>
                 
                 <div className="relative w-full h-24 md:h-32 mb-2">
                   <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                     <path d="M0,50 Q10,40 20,45 T40,30 T60,35 T80,10 T100,5" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
                   </svg>
                   <div className="absolute top-2 right-0 w-4 h-4 bg-white rounded-full border-4 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                 </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <TrendingUp className="text-blue-600" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[52px] font-black text-slate-900 mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Wealth management & investments
             </h2>
             <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium">
               Showcase retirement planning, portfolio tracking, deep market insights, and intelligent investment growth analytics perfectly tailored for you.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
               {[
                 { title: "Portfolio management", desc: "Automated & expert managed portfolios." },
                 { title: "Retirement planning", desc: "Advanced tools to secure your future." },
                 { title: "Market insights", desc: "Real-time market data and global news." },
                 { title: "AI recommendations", desc: "Smart algorithmic investment advice." }
               ].map((item, i) => (
                 <div key={i}>
                   <h4 className="text-base md:text-lg font-bold text-slate-900 mb-1 md:mb-2">{item.title}</h4>
                   <p className="text-sm font-medium text-slate-500">{item.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- Business Banking Section --- */}
      <section className="py-20 md:py-[150px] bg-slate-50">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <Briefcase className="text-slate-900" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[56px] font-black text-slate-900 mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Business banking built for scaling growth
             </h2>
             <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium max-w-lg">
               Highlight invoicing tools, seamless payroll management, premium business credit cards, team permissions, and advanced analytics for entrepreneurs.
             </p>
             <button className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-base font-black transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Explore Business Accounts
             </button>
          </div>

          <div>
             <div className="aspect-[4/3] bg-white rounded-[32px] md:rounded-[48px] overflow-hidden p-6 md:p-10 relative shadow-lg border border-gray-100 flex flex-col justify-center transition-shadow hover:shadow-xl duration-300">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop" alt="Business Meeting" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8 md:mb-10">
                    <div className="flex gap-3 md:gap-4 items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center"><Building size={20} className="text-slate-900"/></div>
                      <div><h4 className="font-bold text-slate-900 text-base md:text-lg">Acme Corp</h4><p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">Operating Account</p></div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-black text-slate-900">$842,500</div>
                      <div className="text-[11px] md:text-sm font-bold text-emerald-500">+15.4% this month</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-blue-50/50 rounded-[20px] md:rounded-[24px] p-5 md:p-6 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                      <div className="text-xs md:text-sm font-bold text-gray-500 mb-2">Invoices Paid</div>
                      <div className="text-xl md:text-2xl font-black text-slate-900">$45,200</div>
                    </div>
                    <div className="bg-amber-50/50 rounded-[20px] md:rounded-[24px] p-5 md:p-6 border border-amber-100/50 hover:bg-amber-50 transition-colors">
                      <div className="text-xs md:text-sm font-bold text-gray-500 mb-2">Payroll Due</div>
                      <div className="text-xl md:text-2xl font-black text-slate-900">$28,400</div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[20px] md:rounded-[24px] p-5 md:p-6 flex items-center justify-between relative overflow-hidden shadow-md group cursor-pointer">
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.3),transparent)] group-hover:opacity-70 transition-opacity" />
                     <div className="relative z-10 flex items-center justify-between w-full">
                       <div className="text-white font-bold text-base md:text-lg">Cash Flow Projection</div>
                       <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors"><ArrowUpRight size={16}/></div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- Advanced Security Section --- */}
      <section className="py-20 md:py-[120px] bg-slate-900 text-white md:rounded-[40px] md:mx-6 lg:mx-12 md:my-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 md:mb-8 border border-white/20 backdrop-blur-sm shadow-sm">
              <Lock size={28} />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[52px] font-black mb-6 tracking-tight leading-[1.1]">
              Enterprise-grade security for every transaction
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-10 md:mb-12 leading-relaxed max-w-lg font-medium">
              Display biometric authentication, AI fraud detection, encrypted transactions, and advanced monitoring systems protecting your funds 24/7.
            </p>
            <div className="grid sm:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-8">
              {[
                "Biometric login",
                "AI fraud monitoring",
                "Encrypted payments",
                "Instant alerts"
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 text-white font-bold text-base md:text-lg">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm shrink-0">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                  {feat}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
             <div className="w-48 h-48 md:w-56 md:h-56 bg-blue-600 rounded-[32px] md:rounded-[40px] rotate-12 flex items-center justify-center shadow-2xl border border-blue-500 hover:rotate-0 transition-transform duration-500">
               <Fingerprint size={80} className="text-white relative z-10" strokeWidth={1.5} />
             </div>
          </div>
        </div>
      </section>

      {/* --- Slider Testimonials (Ecommerce Hero Style) --- */}
      <section className="py-20 md:py-[120px] bg-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-3xl md:text-[48px] font-black text-slate-900 tracking-tight mb-4">What customers are saying</h2>
              <p className="text-base md:text-lg text-slate-600 font-medium max-w-xl">Join millions of leaders, creatives, and entrepreneurs who trust us with their financial future.</p>
            </div>
            
            {/* Custom Navigation Arrows */}
            <div className="hidden md:flex gap-3">
               <button 
                 onClick={prevSlide}
                 className="w-12 h-12 rounded-full bg-slate-50 border border-gray-200 flex items-center justify-center text-slate-900 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
               >
                 <ChevronLeft size={20} />
               </button>
               <button 
                 onClick={nextSlide}
                 className="w-12 h-12 rounded-full bg-slate-50 border border-gray-200 flex items-center justify-center text-slate-900 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
               >
                 <ChevronRight size={20} />
               </button>
            </div>
          </div>
        </div>

        {/* The Slider Track */}
        <div className="relative w-full overflow-hidden max-w-[1320px] mx-auto px-6 lg:px-12">
          <div 
            className="flex transition-transform duration-700 ease-in-out" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((test, i) => (
              <div key={i} className="w-full shrink-0 px-2 md:px-4">
                 <div className="bg-slate-50 rounded-[32px] md:rounded-[48px] p-8 md:p-16 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                     
                     <div className="flex-1 order-2 md:order-1">
                        <div className="text-amber-500 mb-8 flex gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <svg key={star} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          ))}
                        </div>
                        <p className="text-2xl md:text-4xl text-slate-900 font-black leading-tight mb-8 md:mb-12 tracking-tight">
                          "{test.quote}"
                        </p>
                        <div>
                          <div className="font-black text-slate-900 text-lg md:text-xl">{test.name}</div>
                          <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1">{test.role}</div>
                        </div>
                     </div>
                     
                     <div className="w-32 h-32 md:w-64 md:h-64 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-5xl md:text-8xl font-black shadow-2xl shadow-blue-600/20 order-1 md:order-2">
                         {test.name.charAt(0)}
                     </div>

                 </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)} 
                className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-blue-600 w-8' : 'bg-slate-300 w-2.5 hover:bg-slate-400'}`} 
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-20 md:py-[120px] bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[48px] font-black text-slate-900 tracking-tight mb-6">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How secure is the platform?", a: "We use enterprise-grade encryption, biometric authentication, and AI fraud monitoring to ensure your data and transactions are absolutely secure." },
              { q: "Can users manage investments?", a: "Yes, our platform includes comprehensive investment dashboards, detailed portfolio tracking, and personalized retirement planning tools all within the same interface." },
              { q: "Is the platform mobile responsive?", a: "Absolutely. The entire website and web-app experience should be perfectly optimized for mobile devices with native-feeling interactions." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-sm">
                <button 
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-bold text-base md:text-lg text-slate-900 pr-6">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${faqOpen === i ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-900 shadow-sm border border-gray-200'}`}>
                    {faqOpen === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div 
                  className={`px-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium transition-all duration-300 overflow-hidden ${faqOpen === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Premium CTA Section --- */}
      <section className="py-24 md:py-[120px] bg-blue-600 text-white text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
          Experience premium digital banking today
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
          Open your account in minutes and unlock a modern banking experience tailored perfectly for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-full text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </section>

      {/* --- Luxury Minimal Footer --- */}
      <footer className="bg-slate-900 text-white pt-16 md:pt-20 pb-10 px-6 lg:px-12">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className="font-black text-2xl tracking-tight">ModernBank</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm font-medium">
              Enterprise digital banking designed to provide unparalleled luxury and uncompromising security.
            </p>
          </div>
          
          {[
            { title: "Banking", links: ["Checking", "Savings", "Credit Cards", "Loans"] },
            { title: "Investing", links: ["Stocks", "Retirement", "Portfolio", "Insights"] },
            { title: "Company", links: ["About", "Careers", "Security", "Support"] }
          ].map((column, idx) => (
            <div key={idx} className="col-span-1">
              <h4 className="font-black text-base mb-4 text-white uppercase tracking-widest">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-[1320px] mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 font-bold text-xs uppercase tracking-widest">
          <p>© 2026 ModernBank. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}