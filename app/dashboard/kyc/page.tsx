"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, User, MapPin, FileText, Upload, 
  CheckCircle2, ChevronRight, ChevronLeft, 
  Loader2, Clock, XCircle, Inbox
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useKYC } from "@/hooks/kycHooks";
import { useAuth } from "@/hooks/loginHooks";


type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  documentType: any;
  documentNumber: string;
};

export default function KYCPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { submitKYC, isSubmitting } = useKYC();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isRestarting, setIsRestarting] = useState(false); // State to handle re-submission
  const [previews, setPreviews] = useState<{ front: string | null; back: string | null }>({
    front: null,
    back: null
  });
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", dob: "", ssn: "",
    addressLine1: "", city: "", state: "", country: "", zipCode: "",
    documentType: "", documentNumber: ""
  });
  
  // Auto-fill user data when it loads
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstname || "",
        lastName: user.lastname || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const [files, setFiles] = useState<{ front: File | null; back: File | null }>({
    front: null,
    back: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles({ ...files, [side]: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviews(prev => ({ ...prev, [side]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (files.front) data.append("front", files.front);
    if (files.back) data.append("back", files.back);
    submitKYC(data);
  };

  if (isAuthLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  // --- RENDER STATUS VIEW ---
  // We only show the status if the user has a status AND we aren't currently restarting the process
  if (user?.kycStatus && user.kycStatus !== "unverified" && !isRestarting  && !isSubmitting) {
    const status = user.kycStatus;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] p-4 md:p-8 pt-6">
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <Card className="border-none shadow-2xl bg-white dark:bg-[#111113] rounded-[3rem] overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-20 rounded-full -mr-20 -mt-20 ${
              status === 'verified' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />

            <CardContent className="p-8 md:p-12 text-center relative z-10">
              <div className="flex flex-col items-center gap-6">
                <div className={`h-24 w-24 rounded-[2.2rem] flex items-center justify-center shadow-2xl ${
                  status === 'verified' ? 'bg-emerald-500 text-white' : 
                  status === 'rejected' ? 'bg-rose-500 text-white' : 
                  'bg-amber-100 dark:bg-amber-500/10 text-amber-600'
                }`}>
                  {status === 'verified' ? <ShieldCheck size={48} /> : 
                   status === 'rejected' ? <XCircle size={48} /> : 
                   <Clock size={48} className="animate-pulse" />}
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tighter capitalize">
                    {status === 'pending' ? "Under Review" : 
                     status === 'verified' ? "Verification Successful" : "Verification Rejected"}
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto font-medium">
                    {status === 'pending' ? "We're currently verifying your documents. You'll receive a notification once approved." :
                     status === 'verified' ? "Your identity is confirmed. You now have full access to premium banking features." : 
                     "Your application was declined. You can restart the process by clicking the button below."}
                  </p>
                </div>

                <div className="w-full bg-slate-50/50 dark:bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 grid grid-cols-2 gap-6 text-left border border-slate-100 dark:border-white/5">
                   <SummaryItem label="Full Name" value={`${user.firstname} ${user.lastname}`} />
                   <SummaryItem label="Account Email" value={user.email} />
                   <SummaryItem label="Current Status" value={status.toUpperCase()} />
                   <SummaryItem label="Last Update" value={new Date(user.updatedAt).toLocaleDateString()} />
                </div>

                {status === 'rejected' && (
                  <Button 
                    onClick={() => {
                        setIsRestarting(true);
                        setCurrentStep(1);
                    }} 
                    className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
                  >
                    Re-submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- RENDER FORM ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] p-4 md:p-8 pt-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">Identity Verification</Badge>
          <h1 className="text-3xl font-black tracking-tight dark:text-white">Verify your Identity</h1>
        </div>

        <div className="flex justify-between items-center px-4 md:px-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((step) => (
            <div key={step} className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= step ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
              {currentStep > step ? <CheckCircle2 size={20} /> : step}
            </div>
          ))}
        </div>

        <Card className="border-none shadow-2xl bg-white dark:bg-[#111113] rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-8">
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <SectionHeader icon={<User className="text-blue-500" />} title="Personal Details" desc="Confirm your identity details." />
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* These fields are now auto-filled from User data and disabled */}
                    <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled />
                    <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled />
                    <InputField label="Email Address" name="email" value={formData.email} onChange={handleInputChange} type="email" disabled />
                    
                    <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 567 890" />
                    <InputField label="Date of Birth" name="dob" value={formData.dob} onChange={handleInputChange} type="date" />
                    <InputField label="SSN (Optional)" name="ssn" value={formData.ssn} onChange={handleInputChange} placeholder="000-00-0000" />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <SectionHeader icon={<MapPin className="text-blue-500" />} title="Your Address" desc="Residential address." />
                  <InputField label="Address Line 1" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} />
                    <InputField label="State" name="state" value={formData.state} onChange={handleInputChange} />
                    <InputField label="Country" name="country" value={formData.country} onChange={handleInputChange} />
                    <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <SectionHeader icon={<FileText className="text-blue-500" />} title="Document Upload" desc="Upload government ID." />
                  <Select onValueChange={(val) => setFormData({...formData, documentType: val})}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border-none ring-offset-0 focus:ring-1 focus:ring-blue-500">
                      <SelectValue placeholder="Select Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="id_card">National ID</SelectItem>
                      <SelectItem value="driver_license">Driver's License</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputField label="Document Number" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange} />
                  <div className="grid md:grid-cols-2 gap-6">
                    <UploadBox label="Front of Document" onChange={(e:any) => handleFileChange(e, 'front')} preview={previews.front} />
                    <UploadBox label="Back of Document" onChange={(e:any) => handleFileChange(e, 'back')} preview={previews.back} />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                {currentStep > 1 ? (
                  <Button type="button" variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)} className="h-14 flex-1 rounded-2xl font-bold">
                    Back
                  </Button>
                ) : isRestarting ? (
                    <Button type="button" variant="ghost" onClick={() => setIsRestarting(false)} className="h-14 flex-1 rounded-2xl font-bold">
                        Cancel
                    </Button>
                ) : null}
                <Button 
                  type="button" 
                  disabled={isSubmitting}
                  onClick={() => currentStep < 3 ? setCurrentStep(prev => prev + 1) : handleSubmit()}
                  className="h-14 flex-[2] rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/20"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : currentStep === 3 ? "Submit Verification" : "Next Step"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- HELPERS ---

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">{label}</p>
      <p className="text-sm font-bold truncate dark:text-slate-200">{value}</p>
    </div>
  );
}

function InputField({ label, disabled, ...props }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase opacity-60 ml-1">{label} *</Label>
      <Input 
        className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-800/40 border-none focus-visible:ring-1 focus-visible:ring-blue-500 ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`} 
        disabled={disabled}
        {...props} 
      />
    </div>
  );
}

function SectionHeader({ icon, title, desc }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border dark:border-slate-700">{icon}</div>
      <div>
        <h3 className="text-lg font-bold leading-none">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}

function UploadBox({ label, onChange, preview }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-bold uppercase opacity-60 ml-1">{label} *</Label>
      <label className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] aspect-video flex flex-col items-center justify-center gap-3 hover:bg-blue-500/5 transition-all cursor-pointer overflow-hidden group">
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <>
            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
              <Upload size={18} />
            </div>
            <p className="text-[11px] font-bold dark:text-slate-300">Click to upload</p>
          </>
        )}
        <input type="file" className="hidden" onChange={onChange} accept="image/*" />
      </label>
    </div>
  );
}