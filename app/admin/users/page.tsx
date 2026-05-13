"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ShieldAlert, 
  Ban, 
  Mail, 
  CreditCard,
  ExternalLink,
  ChevronDown,
  Loader2
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminUsers } from "@/hooks/adminProfileHooks";

export default function AdminUserPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  
  // Search state & Debounce state
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce the search input to avoid spamming the backend
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const { users, pagination, isLoading, isFetching } = useAdminUsers(page, limit, debouncedSearch);

  const getKycBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified": return <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1 font-bold uppercase text-[10px] tracking-widest">Verified</Badge>;
      case "pending": return <Badge className="bg-amber-500/10 text-amber-500 border-none px-3 py-1 font-bold animate-pulse uppercase text-[10px] tracking-widest">Pending</Badge>;
      case "rejected": return <Badge className="bg-rose-500/10 text-rose-500 border-none px-3 py-1 font-bold uppercase text-[10px] tracking-widest">Rejected</Badge>;
      default: return <Badge variant="outline" className="opacity-50 uppercase text-[10px] tracking-widest px-3 py-1 font-bold">Unverified</Badge>;
    }
  };

  // Pagination calculation for "Showing X-Y of Z"
  const startItem = (pagination.currentPage - 1) * limit + 1;
  const endItem = Math.min(pagination.currentPage * limit, pagination.totalItems);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020202] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase ">Client Directory</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-70">
              Total Managed Clients: {pagination.totalItems || 0}
            </p>
          </div>
        </div>

        {/* FILTERS & SEARCH */}
        <Card className="border-none shadow-sm bg-white dark:bg-[#0d0d0d] rounded-2xl overflow-hidden">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Search by name, username, or email..." 
                className="pl-11 bg-slate-50 dark:bg-white/5 border-none rounded-xl h-12 font-medium focus-visible:ring-1 focus-visible:ring-blue-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {/* Small spinner to show search is fetching */}
              {isFetching && searchInput && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 animate-spin" />
              )}
            </div>
          
          </CardContent>
        </Card>

        {/* USERS TABLE */}
        <Card className={`border-none shadow-xl bg-white dark:bg-[#0d0d0d] rounded-[2rem] overflow-hidden transition-opacity duration-300 ${isFetching && !isLoading ? 'opacity-60' : 'opacity-100'}`}>
          {isLoading ? (
             <div className="p-24 flex flex-col items-center justify-center gap-4">
               <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Loading Client Data...</p>
             </div>
          ) : (
            <>
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-white/5">
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest py-5">Client Identity</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">KYC Status</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Total Balance</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">System Role</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Registered Date</TableHead>
                    <TableHead className="px-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-16 text-muted-foreground font-medium text-sm">
                        No clients found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user: any) => (
                      <TableRow key={user._id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                        <TableCell className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-blue-600 font-black text-xs shadow-sm">
                              {user.firstname?.[0]}{user.lastname?.[0]}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm dark:text-slate-100 capitalize">{user.firstname} {user.lastname}</span>
                              <span className="text-[11px] text-muted-foreground font-medium">{user.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getKycBadge(user.kycStatus)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-black text-sm dark:text-white">${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            <span className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">USD ACCOUNT</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="ghost" className={`text-[9px] uppercase tracking-widest px-2 py-1 ${user.role === 'admin' ? "text-purple-500 font-black bg-purple-500/10" : "font-bold text-slate-500 bg-slate-100 dark:bg-white/5"}`}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-[11px] font-bold text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </TableCell>
                      
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {/* PAGINATION CONTROLS */}
              {!isLoading && users.length > 0 && (
                <div className="flex items-center justify-between p-6 border-t border-slate-50 dark:border-white/5">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                    Showing {startItem}-{endItem} of {pagination.totalItems} Clients
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(old => Math.max(old - 1, 1))}
                      disabled={page === 1 || isFetching}
                      className="rounded-xl h-10 px-6 text-[10px] uppercase tracking-widest font-black border-slate-200 dark:border-white/10 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30" 
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(old => (old < pagination.totalPages ? old + 1 : old))}
                      disabled={page === pagination.totalPages || isFetching}
                      className="rounded-xl h-10 px-6 text-[10px] uppercase tracking-widest font-black border-slate-200 dark:border-white/10 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}