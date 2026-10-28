"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/micro-components/card";
import { Button } from "@/src/micro-components/button";
import { CheckCircle2, Download, AlertCircle, Play, Archive, FileText, ChevronRight } from "lucide-react";
import { useTax } from "@/src/lib/tax-context";
import { exportTaxReportCSV, downloadFile } from "@/src/lib/filing-service";
import { Progress } from "@/src/micro-components/progress";

export default function ReportPage() {
  const { state, computed, setFilingGenerated } = useTax();

  const handleExport = () => {
     const report = {
        taxpayerName: state.profile.fullName || "N/A",
        tin: state.profile.tin || "N/A",
        taxYear: state.taxYear,
        generatedAt: new Date().toISOString(),
        incomes: state.incomes.map(i => ({ source: i.source, category: i.category, amount: i.amount })),
        deductions: state.deductions.map(d => ({ name: d.name, amount: d.amount, description: d.description || "" })),
        taxResult: computed.taxResult,
        totalIncome: computed.totalIncome,
        totalDeductions: computed.totalDeductions,
        taxPayable: computed.taxResult?.totalTax || 0,
        filingStatus: "ready" as const,
     };
     const csvContent = exportTaxReportCSV(report);
     downloadFile(csvContent, `Taxora_Filing_${state.taxYear}.csv`);
     setFilingGenerated(true);
  };

  const steps = [
     {
        id: "step1",
        title: "Log All Income",
        description: "Ensure all taxable income streams for 2026 have been accurately entered.",
        status: state.incomes.length > 0 ? "complete" : "pending",
        href: "/dashboard/transactions"
     },
     {
        id: "step2",
        title: "Review Deductions",
        description: "Claim all eligible legal reliefs to lower your tax burden.",
        status: state.deductions.length > 0 ? "complete" : (state.incomes.length > 0 ? "warning" : "pending"),
        href: "/dashboard/deductions"
     },
     {
      id: "step3",
      title: "Complete Profile Data",
      description: "TIN and full contact information are required for generation.",
      status: (state.profile.tin && state.profile.fullName) ? "complete" : "pending",
      href: "/dashboard/settings"
     },
     {
        id: "step4",
        title: "Generate Official CSV",
        description: "Export the comprehensive filing data for the FIRS portal.",
        status: state.filingGenerated ? "complete" : (computed.compliance.score === 100 ? "action" : "pending"),
        href: "#"
     }
  ];

  return (
    <div className="space-y-2 animate-in fade-in duration-300">
      <div className="py-1">
        <h1 className="text-[14px] font-semibold text-foreground flex items-center gap-1.5">
           <FileText className="w-4 h-4 text-primary" />
           Filing & Reports
        </h1>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Finalize your tax profile and generate 2026 compliance documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
         <div className="md:col-span-2">
            <Card>
               <CardHeader>
                  <CardTitle>Filing Checklist</CardTitle>
                  <span className="text-[10px] text-muted-foreground">Complete steps to unlock generation</span>
               </CardHeader>
               <CardContent>
                  <div className="space-y-0">
                     {steps.map((step, idx) => (
                        <div key={step.id} className="relative flex gap-3 pb-4 last:pb-0">
                           {/* Timeline Line */}
                           {idx !== steps.length - 1 && (
                              <div className="absolute left-[11px] top-[22px] bottom-0 w-px bg-border"></div>
                           )}
                           
                           {/* Step Indicator */}
                           <div className="relative z-10 bg-background pt-0.5 shrink-0">
                              {step.status === "complete" && <CheckCircle2 className="w-6 h-6 text-primary bg-primary/10 rounded-full" />}
                              {step.status === "warning" && <AlertCircle className="w-6 h-6 text-yellow-500 bg-yellow-500/10 rounded-full" />}
                              {step.status === "action" && <Play className="w-6 h-6 text-primary fill-primary bg-primary/20 p-1 rounded-full" />}
                              {step.status === "pending" && <div className="w-6 h-6 border-2 border-muted rounded-full bg-muted/20"></div>}
                           </div>
                           
                           {/* Step Content */}
                           <div className="flex-1 pt-0.5">
                              <h4 className={`font-semibold text-[12px] ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                                 {step.title}
                              </h4>
                              <p className="text-[11px] text-muted-foreground mt-0.5 mb-1">{step.description}</p>
                              
                              {step.id === "step4" && step.status === "action" && (
                                 <Button onClick={handleExport} className="h-[24px] text-[11px] px-2 rounded-[2px] mt-1">
                                    <Download className="w-3 h-3 mr-1"/> Download Filing CSV
                                 </Button>
                              )}
                              {step.id === "step4" && step.status === "complete" && (
                                 <Button onClick={handleExport} variant="outline" className="h-[24px] text-[11px] px-2 rounded-[2px] mt-1 text-primary border-primary hover:bg-primary/10">
                                    <CheckCircle2 className="w-3 h-3 mr-1"/> Re-Download CSV
                                 </Button>
                              )}
                              {step.status !== "complete" && step.id !== "step4" && step.status !== "pending" && (
                                 <Button variant="link" className="p-0 h-auto text-primary text-[11px]" asChild>
                                    <a href={step.href}>Go to section <ChevronRight className="w-3 h-3 ml-0.5" /></a>
                                 </Button>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-2">
            <Card>
               <CardHeader>
                  <CardTitle>Readiness</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex justify-between items-end mb-1">
                     <span className="text-2xl font-bold font-mono">{computed.compliance.score}%</span>
                  </div>
                  <Progress value={computed.compliance.score} className="h-[3px]" indicatorColor={computed.compliance.score === 100 ? "#3ECF8E" : "#f59e0b"} />
                  <p className="text-[11px] text-muted-foreground mt-2">
                     {computed.compliance.score === 100 ? "Ready to file. No errors." : "Profile incomplete. Finish tasks."}
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardContent className="text-center">
                  <Archive className="w-8 h-8 text-muted-foreground/30 mx-auto mb-1" />
                  <h3 className="text-[12px] font-medium mb-0.5">Previous Filings</h3>
                  <p className="text-[11px] text-muted-foreground mb-2">No data for {state.taxYear - 1}.</p>
                  <Button variant="outline" className="w-full h-[24px] text-[11px] rounded-[2px]" disabled>View Archive</Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
