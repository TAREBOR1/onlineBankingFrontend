"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Menu, X, ChevronRight, ChevronDown, ShieldCheck, 
  TrendingUp, CreditCard, Lock, ArrowRight, Smartphone, 
  PieChart, Home, User, Zap, Globe, Plus, Minus,
  Briefcase, Building, Landmark, CheckCircle2, ArrowUpRight,
  ChevronLeft, Fingerprint, BarChart3, Clock
} from "lucide-react";

// --- Custom CSS for Marquee & Hide Scrollbar ---
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
  `}} />
);

// --- Animation Config ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function LuxuryBankingLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    { name: "Sophia Martinez", role: "Entrepreneur", quote: "The experience feels luxurious while still being incredibly easy to use. It perfectly bridges the gap between traditional banking trust and fintech innovation." },
    { name: "Daniel Kim", role: "Creative Director", quote: "The mobile banking experience is smooth, modern, and beautifully designed. Managing our agency's cash flow has never been more intuitive." },
    { name: "Michael Carter", role: "Small Business Owner", quote: "Managing payroll and vendor payments has never been this seamless. The analytics tools give me total clarity on our runway." },
    { name: "Emily Johnson", role: "Financial Consultant", quote: "The investment dashboards and portfolio analytics tools rival dedicated brokerage platforms. Exceptional clarity and speed." },
    { name: "James Wilson", role: "Startup Founder", quote: "It combines the impenetrable trust of a traditional corporate bank with the rapid, premium feel of a top-tier fintech app." }
  ];

  const partners = ["Visa", "Mastercard", "Apple Pay", "PayPal", "Stripe", "American Express", "Bloomberg", "Forbes", "CNBC"];

  return (
    <div className="min-h-screen bg-[#F5F9FF] text-[#0A2540] font-sans selection:bg-[#0052CC] selection:text-white overflow-hidden">
      <CustomStyles />
      
      {/* --- Ambient Background Mesh --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(0,82,204,0.12)_0%,transparent_60%)] blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(179,27,27,0.08)_0%,transparent_60%)] blur-[100px]"
        />
      </div>

      {/* --- Navigation --- */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/85 backdrop-blur-2xl border-b border-gray-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.04)] h-[80px]" : "bg-transparent h-[92px]"
        } flex items-center`}
        onMouseLeave={() => setActiveMegamenu(null)}
      >
        <div className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group z-50">
            <div className="w-11 h-11 rounded-xl bg-[#0A2540] flex items-center justify-center relative overflow-hidden shadow-lg border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] to-[#0052CC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-4 h-4 bg-[#D4A017] rounded-sm relative z-10" />
            </div>
            <span className="font-bold text-[24px] tracking-tight text-[#0A2540]">ModernBank</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {[
              { title: "Personal Banking", hasMega: true },
              { title: "Business Banking", hasMega: false },
              { title: "Investments", hasMega: false },
              { title: "Insurance", hasMega: false },
              { title: "Security", hasMega: false }
            ].map((item) => (
              <div 
                key={item.title}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasMega ? setActiveMegamenu(item.title) : setActiveMegamenu(null)}
              >
                <button className="flex items-center gap-1.5 font-semibold text-[15px] text-[#0A2540]/85 hover:text-[#0052CC] transition-colors group py-8">
                  {item.title}
                  {item.hasMega && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeMegamenu === item.title ? "rotate-180 text-[#0052CC]" : ""}`} />
                  )}
                  <span className="absolute bottom-6 left-0 w-0 h-[2px] bg-[#0052CC] transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5 z-50">
            <button className="text-[#0A2540] font-bold text-[15px] hover:text-[#0052CC] transition-colors">
              Sign In
            </button>
            <button className="bg-[#0A2540] hover:bg-[#0052CC] text-white px-8 py-3.5 rounded-full text-[15px] font-bold transition-all duration-300 shadow-[0_15px_30px_rgba(10,37,64,0.15)] hover:shadow-[0_20px_40px_rgba(0,82,204,0.25)] hover:-translate-y-0.5">
              Open Account
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-[#0A2540] z-50 bg-white/50 backdrop-blur p-2 rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* --- Megamenu --- */}
        <AnimatePresence>
          {activeMegamenu === "Personal Banking" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-gray-200 shadow-[0_40px_120px_rgba(0,0,0,0.12)] overflow-hidden hidden lg:block"
            >
              <div className="max-w-[1320px] mx-auto px-12 py-12 grid grid-cols-12 gap-12">
                <div className="col-span-8 grid grid-cols-3 gap-10">
                  {[
                    { heading: "Accounts", links: ["Checking Accounts", "Savings Accounts", "Student Banking", "Joint Accounts"] },
                    { heading: "Cards", links: ["Travel Rewards", "Cashback Cards", "Premium Credit Cards", "Business Cards"] },
                    { heading: "Loans", links: ["Mortgage Loans", "Auto Loans", "Personal Loans", "Refinancing"] }
                  ].map((col) => (
                    <div key={col.heading}>
                      <h4 className="text-xs font-bold text-[#0052CC] uppercase tracking-widest mb-6">{col.heading}</h4>
                      <ul className="space-y-4">
                        {col.links.map(link => (
                          <li key={link}>
                            <a href="#" className="text-base font-semibold text-[#0A2540] hover:text-[#0052CC] transition-colors flex items-center gap-2 group">
                              {link} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0052CC]" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="col-span-4 bg-gradient-to-br from-[#F5F9FF] to-[#EAF2FF] rounded-[32px] p-8 border border-blue-100 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#0052CC]/10 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-700" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0A2540] mb-6">
                      <CreditCard size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A2540] mb-3">Modern Online Banking</h3>
                    <p className="text-[#0A2540]/70 text-base leading-relaxed mb-8 font-medium">Experience seamless banking with real-time analytics, smart budgeting, and secure payments built for you.</p>
                  </div>
                  <button className="text-[#0052CC] font-bold text-base flex items-center gap-2 group/btn relative z-10">
                    Explore Premium <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-3xl lg:hidden pt-28 px-6 overflow-hidden z-40"
            >
              <div className="flex flex-col gap-5 h-full pb-20 overflow-y-auto">
                {["Personal Banking", "Business Banking", "Investments", "Insurance", "Security"].map((link) => (
                  <a key={link} href="#" className="text-2xl font-bold text-[#0A2540] border-b border-gray-100 pb-4">
                    {link}
                  </a>
                ))}
                <div className="pt-4 flex flex-col gap-4 mt-auto">
                  <button className="bg-[#0A2540] text-white px-6 py-4 rounded-full text-lg font-bold w-full text-center shadow-lg">
                    Open Account
                  </button>
                  <button className="text-[#0A2540] bg-gray-100 px-6 py-4 rounded-full text-lg font-bold w-full text-center">
                    Sign In
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 lg:px-12 max-w-[1320px] mx-auto z-10 min-h-[90vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center w-full">
          
          {/* Hero Content */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl relative z-20">
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-6 md:mb-8">
              {[
                { text: "FDIC Insured", icon: ShieldCheck },
                { text: "Premium Security", icon: Lock }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm text-[12px] md:text-xs font-bold text-[#0A2540]">
                  <badge.icon size={14} className="text-[#0052CC]" /> {badge.text}
                </div>
              ))}
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-[44px] md:text-6xl lg:text-[82px] font-bold tracking-tight leading-[1.05] mb-6 md:mb-8 text-[#0A2540]">
              Bank smarter with a modern financial experience
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#0A2540]/75 mb-10 md:mb-12 leading-relaxed max-w-xl font-medium">
              Manage spending, savings, investments, and credit cards from one beautifully designed, enterprise-grade banking platform.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#0A2540] hover:bg-[#0052CC] text-white px-9 py-5 rounded-full text-base md:text-lg font-bold transition-all duration-300 shadow-[0_20px_40px_rgba(10,37,64,0.25)] hover:shadow-[0_30px_60px_rgba(0,82,204,0.35)] hover:-translate-y-1 text-center">
                Open an Account
              </button>
              <button className="bg-white/80 hover:bg-white text-[#0A2540] border border-gray-200/60 px-9 py-5 rounded-full text-base md:text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md backdrop-blur-sm group">
                Explore Features <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Detailed iPhone Mockup Visual */}
          <div className="relative h-[600px] md:h-[750px] hidden md:block perspective-[2000px] z-10 w-full">
            <motion.div style={{ y: yParallax }} className="relative w-full h-full transform-style-3d flex items-center justify-center">
              
              {/* Back ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-[#0052CC]/15 to-[#B31B1B]/10 rounded-full blur-[80px]" />

              {/* Central iPhone */}
              <motion.div 
                animate={{ y: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="relative w-[340px] h-[720px] bg-white rounded-[56px] border-[14px] border-[#0A2540] shadow-[0_50px_120px_rgba(0,0,0,0.18)] overflow-hidden z-20 flex flex-col"
              >
                {/* Dynamic Island */}
                <div className="absolute top-2 inset-x-0 flex justify-center z-50">
                  <div className="w-[120px] h-[32px] bg-[#0A2540] rounded-full flex items-center justify-between px-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B] border border-gray-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-80" />
                  </div>
                </div>

                {/* iPhone UI Background */}
                <div className="flex-1 bg-[#F7F9FC] pt-14 px-5 flex flex-col relative overflow-hidden">
                  
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0A2540]">Good morning</h2>
                      <p className="text-[12px] font-semibold text-gray-500">Isabella Wright</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-[#0A2540] to-[#0F3D91] rounded-[24px] p-6 text-white shadow-xl mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                    <div className="text-xs font-medium text-white/70 mb-1 flex items-center justify-between">
                      <span>Total Checking</span>
                      <ShieldCheck size={14} className="text-[#00C2FF]" />
                    </div>
                    <div className="text-[32px] font-bold mb-5 tracking-tight">$84,250.00</div>
                    <div className="flex gap-3 relative z-10">
                      <button className="flex-1 bg-white/15 backdrop-blur-md rounded-xl py-2.5 text-[11px] font-bold flex items-center justify-center gap-1.5"><ArrowUpRight size={14} /> Send</button>
                      <button className="flex-1 bg-white text-[#0A2540] rounded-xl py-2.5 text-[11px] font-bold flex items-center justify-center gap-1.5"><Plus size={14} /> Add Money</button>
                    </div>
                  </div>

                  {/* Savings / Analytics Area */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                     <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
                       <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-2">
                         <BarChart3 className="text-green-600" size={14} />
                       </div>
                       <div className="text-[11px] font-bold text-gray-500">Investments</div>
                       <div className="text-lg font-bold text-[#0A2540]">$142.5K</div>
                     </div>
                     <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
                       <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                         <CreditCard className="text-orange-500" size={14} />
                       </div>
                       <div className="text-[11px] font-bold text-gray-500">Virtual Card</div>
                       <div className="text-lg font-bold text-[#0A2540]">Active</div>
                     </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold text-[#0A2540]">Recent Activity</h3>
                      <span className="text-[11px] font-bold text-[#0052CC]">See All</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Whole Foods", cat: "Groceries", amt: "-$145.20", icon: Smartphone, bg: "bg-gray-100 text-gray-600" },
                        { name: "Salary Deposit", cat: "Income", amt: "+$6,200.00", icon: TrendingUp, bg: "bg-blue-50 text-[#0052CC]", isPos: true },
                        { name: "Equinox", cat: "Fitness", amt: "-$250.00", icon: Zap, bg: "bg-purple-50 text-purple-600" }
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${tx.bg}`}>
                              <tx.icon size={16} strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-[#0A2540]">{tx.name}</div>
                              <div className="text-[11px] font-medium text-gray-500">{tx.cat}</div>
                            </div>
                          </div>
                          <div className={`text-[14px] font-bold ${tx.isPos ? 'text-[#0052CC]' : 'text-[#0A2540]'}`}>{tx.amt}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 inset-x-0 h-[85px] bg-white/90 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around px-4 pb-5">
                    {[Home, PieChart, CreditCard, User].map((Icon, i) => (
                      <div key={i} className={`flex flex-col items-center gap-1 ${i === 0 ? 'text-[#0052CC]' : 'text-gray-400'}`}>
                        <Icon size={22} className={i === 0 ? "fill-current" : ""} />
                        {i === 0 && <div className="w-1.5 h-1.5 bg-[#0052CC] rounded-full mt-1" />}
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>

              {/* Floating Element 1 - Notification */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute top-[20%] -right-[70px] z-30 bg-white/95 backdrop-blur-2xl rounded-[20px] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-3 w-60"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0A2540]">Apple Pay</div>
                  <div className="text-[11px] font-medium text-gray-500">Payment successful</div>
                </div>
              </motion.div>

              {/* Floating Element 2 - Analytics Card */}
              <motion.div 
                animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[25%] -left-[60px] z-30 bg-white/95 backdrop-blur-2xl rounded-[24px] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 w-52"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Spending</div>
                  <div className="text-[11px] font-bold text-green-500 flex items-center gap-0.5"><Minus size={10}/> 12%</div>
                </div>
                <div className="text-2xl font-bold text-[#0A2540] mb-3">$2,150</div>
                <div className="flex items-end gap-1.5 h-10">
                   {[40, 70, 45, 90, 60, 30].map((h, i) => (
                     <div key={i} className={`flex-1 rounded-t-sm ${i === 4 ? 'bg-[#0052CC]' : 'bg-blue-50'}`} style={{height: `${h}%`}} />
                   ))}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Marquee Logos Section --- */}
      <section className="py-10 md:py-12 border-y border-gray-200/50 bg-white/50 backdrop-blur-sm relative z-20 overflow-hidden">
        <div className="w-full mx-auto px-4">
          <p className="text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8">Trusted by millions worldwide</p>
          <div className="w-full flex overflow-hidden relative">
             {/* Fade edges */}
             <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F9FF] to-transparent z-10" />
             <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F9FF] to-transparent z-10" />
             
             <div className="flex space-x-12 md:space-x-24 min-w-max animate-marquee opacity-60 items-center">
               {[...partners, ...partners].map((logo, i) => (
                 <div key={i} className="text-xl md:text-3xl font-black tracking-tighter text-[#0A2540] italic">
                   {logo}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- Smart Online Banking Section --- */}
      <section className="py-20 md:py-[150px] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="order-2 lg:order-1 relative">
             <div className="aspect-square md:aspect-[4/3] bg-[#F7F9FC] rounded-[32px] md:rounded-[48px] overflow-hidden border border-gray-100 flex items-center justify-center p-6 md:p-10 shadow-inner relative">
               <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop" alt="Online Banking on Laptop" className="w-full h-full object-cover rounded-[20px] md:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)]" />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2540]/20 to-transparent mix-blend-overlay rounded-[32px] md:rounded-[48px]" />
             </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="order-1 lg:order-2">
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#EAF2FF] flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <Globe className="text-[#0052CC]" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#0A2540] mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Smart online banking tools
             </h2>
             <p className="text-base md:text-xl text-[#0A2540]/70 mb-8 md:mb-10 leading-relaxed font-medium">
               Highlight seamless banking tools including bill payments, instant transfers, budgeting, savings automation, and deep spending insights.
             </p>
             <div className="space-y-4 md:space-y-5">
               {[
                 "Instant money transfers globally", 
                 "Automated bill payments & scheduling", 
                 "Advanced budgeting tools", 
                 "Real-time analytics and insights"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 md:gap-4 text-base md:text-lg font-bold text-[#0A2540]">
                   <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                     <CheckCircle2 size={16} className="text-green-600" />
                   </div>
                   {item}
                 </div>
               ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Premium Credit Cards Section --- */}
      <section className="py-20 md:py-[150px] bg-[#F5F9FF] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#FFF9E5] flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <CreditCard className="text-[#D4A017]" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#0A2540] mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Premium credit card experiences
             </h2>
             <p className="text-base md:text-xl text-[#0A2540]/70 mb-8 md:mb-10 leading-relaxed font-medium">
               Display luxury credit card visuals with cashback rewards, elite travel benefits, smart spending controls, and robust analytics.
             </p>
             <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-8 md:mb-10">
               {["Cashback rewards", "Travel points", "Virtual card generation", "Card freezing & security controls"].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-sm md:text-base font-bold text-[#0A2540]">
                   <div className="w-2 h-2 rounded-full bg-[#D4A017] shrink-0" />
                   {item}
                 </div>
               ))}
             </div>
             <button className="text-[#0A2540] font-bold text-base md:text-lg flex items-center gap-2 group hover:text-[#D4A017] transition-colors">
                Explore Premium Cards <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative h-[400px] md:h-[600px] flex items-center justify-center">
             <div className="absolute inset-0 bg-[#081B33] rounded-[32px] md:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.2),transparent_70%)]" />
               <img src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1600&auto=format&fit=crop" alt="Premium Cards" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
             </div>
             
             {/* 3D Premium Cards UI Overlays */}
             <div className="relative w-full max-w-md perspective-[1000px] z-10">
               <motion.div style={{ y: yParallaxSlow }} className="w-full relative h-[300px] md:h-[400px] flex items-center justify-center">
                 <motion.div 
                   animate={{ y: [-10, 10, -10], rotateZ: [12, 15, 12], rotateX: [15, 10, 15] }} 
                   transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                   className="absolute w-[280px] md:w-[360px] aspect-[1.586] bg-gradient-to-br from-[#1E293B] via-black to-[#0A2540] rounded-[20px] md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-6 md:p-8 border border-gray-700 backdrop-blur-md z-10 -ml-12 md:-ml-16 -mt-8 md:-mt-10"
                 >
                    <div className="w-10 h-6 md:w-14 md:h-10 bg-[#D4A017] rounded mb-8 md:mb-12 opacity-90 shadow-sm" />
                    <div className="text-white/90 font-mono text-lg md:text-2xl tracking-[0.2em] mb-4 md:mb-6">•••• •••• •••• 8821</div>
                    <div className="flex justify-between items-center text-white/70">
                      <div className="text-[10px] md:text-sm font-bold tracking-widest uppercase">Reserve Elite</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10" />
                    </div>
                 </motion.div>

                 <motion.div 
                   animate={{ y: [10, -10, 10], rotateZ: [-12, -8, -12], rotateX: [-15, -20, -15] }} 
                   transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
                   className="absolute w-[280px] md:w-[360px] aspect-[1.586] bg-gradient-to-br from-[#D4A017] via-[#B31B1B] to-[#0A2540] rounded-[20px] md:rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] p-6 md:p-8 border border-white/30 z-20 ml-8 md:ml-12 mt-12 md:mt-16 backdrop-blur-md"
                 >
                    <div className="w-10 h-6 md:w-14 md:h-10 bg-white/80 rounded mb-8 md:mb-12 shadow-sm" />
                    <div className="text-white font-mono text-lg md:text-2xl tracking-[0.2em] mb-4 md:mb-6 drop-shadow-md">•••• •••• •••• 1042</div>
                    <div className="flex justify-between items-center text-white">
                      <div className="text-[10px] md:text-sm font-bold tracking-widest uppercase">Platinum</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20" />
                    </div>
                 </motion.div>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Wealth Management Section --- */}
      <section className="py-20 md:py-[150px] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] bg-[#0A2540] rounded-[32px] md:rounded-[48px] overflow-hidden p-6 md:p-10 relative shadow-[0_40px_120px_rgba(10,37,64,0.15)] flex flex-col justify-end">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600&auto=format&fit=crop" alt="Trading Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/60 to-transparent" />
              
              <div className="relative z-10 w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                 <div className="flex justify-between items-center mb-4 md:mb-6">
                   <div className="text-white/80 font-bold text-xs md:text-sm">Portfolio Value</div>
                   <div className="text-[#EAF2FF] bg-[#0052CC] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">+12.4% YTD</div>
                 </div>
                 <div className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">$1,245,890.50</div>
                 
                 <div className="relative w-full h-24 md:h-32 mb-2">
                   <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                     <path d="M0,50 Q10,40 20,45 T40,30 T60,35 T80,10 T100,5" fill="none" stroke="#00C2FF" strokeWidth="3" strokeLinecap="round" />
                     <path d="M0,50 Q10,40 20,45 T40,30 T60,35 T80,10 T100,5 L100,50 L0,50 Z" fill="url(#gradient)" opacity="0.3" />
                     <defs>
                       <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#00C2FF" />
                         <stop offset="100%" stopColor="transparent" />
                       </linearGradient>
                     </defs>
                   </svg>
                   <div className="absolute top-2 right-0 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full border-[3px] md:border-4 border-[#00C2FF] shadow-[0_0_20px_rgba(0,194,255,0.8)]" />
                 </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="order-1 lg:order-2">
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#EAF2FF] flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <TrendingUp className="text-[#0052CC]" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#0A2540] mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Wealth management & investments
             </h2>
             <p className="text-base md:text-xl text-[#0A2540]/70 mb-8 md:mb-10 leading-relaxed font-medium">
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
                   <h4 className="text-base md:text-lg font-bold text-[#0A2540] mb-1 md:mb-2">{item.title}</h4>
                   <p className="text-sm font-medium text-gray-500">{item.desc}</p>
                 </div>
               ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Business Banking Section --- */}
      <section className="py-20 md:py-[150px] bg-[#F5F9FF]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
             <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center mb-6 md:mb-8 shadow-sm">
               <Briefcase className="text-[#0A2540]" size={30} />
             </div>
             <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#0A2540] mb-5 md:mb-6 tracking-tight leading-[1.1]">
               Business banking built for scaling growth
             </h2>
             <p className="text-base md:text-xl text-[#0A2540]/70 mb-8 md:mb-10 leading-relaxed font-medium max-w-lg">
               Highlight invoicing tools, seamless payroll management, premium business credit cards, team permissions, and advanced analytics for entrepreneurs.
             </p>
             <button className="bg-[#0A2540] hover:bg-[#0052CC] text-white px-8 py-4 rounded-full text-base font-bold transition-all duration-300 shadow-lg hover:-translate-y-1">
                Explore Business Accounts
             </button>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
             <div className="aspect-[4/3] bg-white rounded-[32px] md:rounded-[48px] overflow-hidden p-6 md:p-10 relative shadow-[0_40px_100px_rgba(10,37,64,0.08)] border border-gray-100 flex flex-col justify-center">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop" alt="Business Meeting" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8 md:mb-10">
                    <div className="flex gap-3 md:gap-4 items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center"><Building size={20} className="text-[#0A2540]"/></div>
                      <div><h4 className="font-bold text-[#0A2540] text-base md:text-lg">Acme Corp</h4><p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">Operating Account</p></div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-[#0A2540]">$842,500</div>
                      <div className="text-[11px] md:text-sm font-bold text-green-500">+15.4% this month</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-[#F5F9FF] rounded-[20px] md:rounded-[24px] p-5 md:p-6 border border-blue-50">
                      <div className="text-xs md:text-sm font-bold text-gray-500 mb-2">Invoices Paid</div>
                      <div className="text-xl md:text-2xl font-bold text-[#0A2540]">$45,200</div>
                    </div>
                    <div className="bg-[#FFF9E5] rounded-[20px] md:rounded-[24px] p-5 md:p-6 border border-yellow-50">
                      <div className="text-xs md:text-sm font-bold text-gray-500 mb-2">Payroll Due</div>
                      <div className="text-xl md:text-2xl font-bold text-[#0A2540]">$28,400</div>
                    </div>
                  </div>

                  <div className="bg-[#0A2540] rounded-[20px] md:rounded-[24px] p-5 md:p-6 flex items-center justify-between relative overflow-hidden shadow-xl">
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,82,204,0.5),transparent)]" />
                     <div className="relative z-10 flex items-center justify-between w-full">
                       <div className="text-white font-bold text-base md:text-lg">Cash Flow Projection</div>
                       <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"><ArrowUpRight size={16}/></div>
                     </div>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Advanced Security Section --- */}
      <section className="py-20 md:py-[150px] bg-[#081B33] relative overflow-hidden text-white md:rounded-[48px] md:mx-4 lg:mx-8 md:my-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#0052CC]/30 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#B31B1B]/20 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
        
        <div className="max-w-[1320px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 md:mb-8 border border-white/20 backdrop-blur-md shadow-lg">
              <Lock size={28} />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold mb-6 tracking-tight leading-[1.1]">
              Enterprise-grade security for every transaction
            </h2>
            <p className="text-base md:text-xl text-white/70 mb-10 md:mb-12 leading-relaxed max-w-lg font-medium">
              Display biometric authentication, AI fraud detection, encrypted transactions, and advanced monitoring systems protecting your funds 24/7.
            </p>
            <div className="grid sm:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-8">
              {[
                "Biometric login",
                "AI fraud monitoring",
                "Encrypted payments",
                "Instant alerts"
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 text-white font-semibold text-base md:text-lg">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#0052CC] to-[#3B82F6] flex items-center justify-center shadow-lg shrink-0">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                  {feat}
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative h-[350px] md:h-[500px] flex items-center justify-center">
             <div className="absolute inset-4 md:inset-0 border border-white/10 rounded-full animate-[spin_40s_linear_infinite]" />
             <div className="absolute inset-12 md:inset-16 border border-[#0052CC]/40 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
             
             <div className="w-36 h-36 md:w-48 md:h-48 bg-gradient-to-br from-[#0A2540] to-[#0052CC] rounded-[32px] md:rounded-[40px] rotate-45 flex items-center justify-center shadow-[0_0_80px_rgba(0,82,204,0.8)] border border-white/20 backdrop-blur-2xl z-10 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]" />
               <Fingerprint size={64} className="text-white -rotate-45 relative z-10 drop-shadow-2xl md:w-[80px] md:h-[80px]" strokeWidth={1} />
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Slider Testimonials Section --- */}
      <section className="py-20 md:py-[150px] bg-[#F5F9FF] relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 mb-10 md:mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-3xl md:text-[50px] font-bold text-[#0A2540] tracking-tight mb-4">What customers are saying</h2>
              <p className="text-base md:text-xl text-[#0A2540]/70 font-medium max-w-xl">Join millions of leaders, creatives, and entrepreneurs who trust us with their financial future.</p>
            </div>
            <div className="hidden md:flex gap-2">
               <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0A2540] opacity-50 cursor-not-allowed">
                 <ChevronLeft size={20} />
               </div>
               <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0A2540] shadow-sm">
                 <ChevronRight size={20} />
               </div>
            </div>
          </div>
        </div>

        {/* CSS Scroll Snap Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-12 px-6 lg:px-12 max-w-[1320px] mx-auto">
          {testimonials.map((test, i) => (
            <div 
              key={i} 
              className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[420px] snap-center shrink-0 bg-white/70 backdrop-blur-xl rounded-[32px] p-8 md:p-12 border border-white shadow-[0_15px_40px_rgba(10,37,64,0.04)]"
            >
              <div className="text-[#D4A017] mb-6 flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p className="text-lg md:text-xl text-[#0A2540] font-bold leading-relaxed mb-10 tracking-tight">"{test.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#0A2540] to-[#0052CC] flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#0A2540] text-base">{test.name}</div>
                  <div className="text-[#0A2540]/60 text-sm font-semibold">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-20 md:py-[120px] bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-[52px] font-bold text-[#0A2540] tracking-tight mb-6">Frequently asked questions</h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {[
              { q: "How secure is the platform?", a: "We use enterprise-grade encryption, biometric authentication, and AI fraud monitoring to ensure your data and transactions are absolutely secure." },
              { q: "Can users manage investments?", a: "Yes, our platform includes comprehensive investment dashboards, detailed portfolio tracking, and personalized retirement planning tools all within the same interface." },
              { q: "Is the platform mobile responsive?", a: "Absolutely. The entire website and web-app experience should be perfectly optimized for mobile devices with native-feeling interactions." }
            ].map((faq, i) => (
              <div key={i} className="bg-[#F7F9FC] rounded-[20px] md:rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-bold text-base md:text-lg text-[#0A2540] pr-6">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${faqOpen === i ? 'bg-[#0052CC] text-white' : 'bg-white text-[#0A2540] shadow-sm'}`}>
                    {faqOpen === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="px-6 md:px-8 pb-5 md:pb-6 text-[#0A2540]/70 text-sm md:text-lg leading-relaxed font-medium"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Premium CTA Section --- */}
      <section className="py-24 md:py-[160px] relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,82,204,0.08),transparent_70%)] pointer-events-none" />
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-[68px] font-bold text-[#0A2540] tracking-tight mb-6 md:mb-8 leading-[1.05]">
            Experience premium digital banking today
          </h2>
          <p className="text-lg md:text-2xl text-[#0A2540]/70 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Open your account in minutes and unlock a modern banking experience tailored perfectly for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0A2540] hover:bg-[#0052CC] text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold transition-all duration-300 shadow-[0_20px_40px_rgba(10,37,64,0.2)] hover:-translate-y-1">
              Get Started
            </button>
            <button className="bg-white hover:bg-gray-50 text-[#0A2540] border border-gray-200 px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold transition-all duration-300 shadow-sm">
              Talk to an Advisor
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- Luxury Minimal Footer --- */}
      <footer className="bg-[#0A2540] text-white pt-16 md:pt-24 pb-10 px-6 lg:px-12 md:rounded-t-[48px]">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-8 mb-16 md:mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-[#D4A017] rounded-sm" />
              </div>
              <span className="font-bold text-2xl tracking-tight">ModernBank</span>
            </div>
            <p className="text-[#F5F9FF]/60 max-w-sm leading-relaxed text-sm md:text-base font-medium">
              Enterprise digital banking designed to provide unparalleled luxury and uncompromising security.
            </p>
          </div>
          
          {[
            { title: "Banking", links: ["Checking", "Savings", "Credit Cards", "Loans"] },
            { title: "Investing", links: ["Stocks", "Retirement", "Portfolio", "Insights"] },
            { title: "Company", links: ["About", "Careers", "Security", "Support"] }
          ].map((column, idx) => (
            <div key={idx} className="col-span-1">
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-white">{column.title}</h4>
              <ul className="space-y-3 md:space-y-4">
                {column.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[#F5F9FF]/70 hover:text-white transition-colors font-medium text-sm md:text-base">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-[1320px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[#F5F9FF]/50 font-medium text-sm">
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