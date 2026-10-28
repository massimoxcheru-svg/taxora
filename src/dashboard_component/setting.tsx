"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/micro-components/card";
import { Label } from "@/src/micro-components/label";
import { Input } from "@/src/micro-components/input";
import { Button } from "@/src/micro-components/button";
import { FileText, Save, CheckCircle2 } from "lucide-react";
import { useTax } from "@/src/lib/tax-context";

export function Settings_page() {
  const { state, updateProfile } = useTax();
  const [formData, setFormData] = useState({
    fullName: state.profile.fullName,
    email: state.profile.email,
    phone: state.profile.phone,
    tin: state.profile.tin,
    taxpayerType: state.profile.taxpayerType,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      tin: formData.tin,
      taxpayerType: formData.taxpayerType as "individual" | "business",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="py-1">
        <h1 className="text-[14px] font-semibold text-foreground">Settings & Profile</h1>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Manage account details and taxpayer identification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
         <Card>
            <CardHeader>
               <CardTitle>Taxpayer Information</CardTitle>
               <span className="text-[10px] text-muted-foreground">Used for generated tax reports</span>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid gap-1">
                     <Label htmlFor="fullName" className="text-[12px]">Full Name / Business Name</Label>
                     <Input 
                        id="fullName" 
                        value={formData.fullName} 
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                        required
                        className="h-[28px] text-[12px] rounded-[2px]"
                     />
                  </div>
                  
                  <div className="grid gap-1">
                     <Label htmlFor="email" className="text-[12px]">Email Address</Label>
                     <Input 
                        id="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required
                        className="h-[28px] text-[12px] rounded-[2px]"
                     />
                  </div>

                  <div className="grid gap-1">
                     <Label htmlFor="phone" className="text-[12px]">Phone Number</Label>
                     <Input 
                        id="phone" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        className="h-[28px] text-[12px] rounded-[2px]"
                     />
                  </div>

                  <div className="grid gap-1">
                     <div className="flex justify-between items-center">
                        <Label htmlFor="tin" className="text-[12px]">Tax Identification Number (TIN)</Label>
                        {!formData.tin && <span className="text-[9px] text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 py-0 rounded-[2px]">Required</span>}
                     </div>
                     <Input 
                        id="tin" 
                        value={formData.tin} 
                        onChange={(e) => setFormData({...formData, tin: e.target.value})} 
                        placeholder="e.g. 12345678-0001"
                        className="h-[28px] text-[12px] rounded-[2px] font-mono"
                     />
                     <p className="text-[10px] text-muted-foreground mt-0.5">Obtain a TIN from the Joint Tax Board (JTB) portal.</p>
                  </div>

                  <div className="border-t border-border pt-2">
                     <div className="flex justify-between items-center">
                        <Button type="submit" className="h-[26px] text-[11px] px-3 rounded-[2px]">
                           <Save className="w-3 h-3 mr-1" />
                           Save Changes
                        </Button>
                        {saved && <span className="text-[11px] text-green-600 flex items-center"><CheckCircle2 className="w-3 h-3 mr-0.5"/> Saved</span>}
                     </div>
                  </div>
               </form>
            </CardContent>
         </Card>

         <div className="space-y-2">
            <Card className="bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-500/20">
               <CardContent>
                  <div className="flex items-start gap-3">
                     <div className="w-8 h-8 bg-white dark:bg-blue-500/10 rounded-[2px] flex justify-center items-center shrink-0">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                     </div>
                     <div>
                        <h3 className="font-semibold text-[12px] text-blue-900 dark:text-blue-300 mb-0.5">Tax Year Setting</h3>
                        <p className="text-[11px] text-blue-800 dark:text-blue-400">Currently filing for <strong>{state.taxYear}</strong>.</p>
                        <p className="text-[10px] text-blue-700 dark:text-blue-500 mt-0.5">Year changes not supported in this version.</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
