"use client";
import React from "react";
import { useTax, Deduction } from "@/src/lib/tax-context";
import { formatNaira } from "@/src/lib/tax-engine";
import { generateDeductionSuggestions } from "@/src/lib/deduction-suggestions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/micro-components/card";
import { Button } from "@/src/micro-components/button";
import {
  Plus,
  Trash2,
  Sparkles,
  PiggyBank,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

export default function DeductionsPage() {
  const { state, computed, addDeduction, deleteDeduction } = useTax();

  // Run AI discovery generator
  const allSuggestions = generateDeductionSuggestions(
    computed.totalIncome, 
    state.deductions.map(d => ({ name: d.name, amount: d.amount }))
  );
  const suggestions = allSuggestions.filter(s => !s.isApplied);

  const handleApplySuggestion = (s: any) => {
    addDeduction({
      name: s.name,
      amount: s.typicalAmount,
      category: s.category,
      description: s.hint
    });
  };

  return (
    <div className="space-y-2 animate-in fade-in duration-300">
      <div className="py-1">
        <h1 className="text-[14px] font-semibold text-foreground flex items-center gap-1.5">
           <ShieldCheck className="w-4 h-4 text-primary" />
           Deductions & Reliefs
        </h1>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Manage active tax deductions to legally minimize your liability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left Column: Active Deductions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 w-full justify-between">
                <span>Active Deductions · {state.deductions.length}</span>
                <span className="font-mono text-primary text-[12px] normal-case">{formatNaira(computed.totalDeductions)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.deductions.length > 0 ? (
                <div className="space-y-1">
                  {state.deductions.map((d) => (
                    <div key={d.id} className="flex justify-between items-center px-2 py-1.5 border border-border rounded-[2px] bg-card hover:border-primary/50 transition-colors group">
                      <div>
                        <h4 className="font-medium text-[12px] text-foreground">{d.name}</h4>
                        <p className="text-[10px] text-muted-foreground truncate max-w-[280px]">{d.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-[12px] text-foreground">{formatNaira(d.amount)}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteDeduction(d.id)}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-[2px]"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
               ) : (
                  <div className="py-6 text-center text-muted-foreground border border-dashed border-border rounded-[2px] bg-muted/10 text-[12px]">
                    <PiggyBank className="w-6 h-6 mx-auto mb-2 text-muted-foreground/50" />
                    <p>No active deductions.</p>
                    <p className="text-[11px] mt-0.5">Review the AI suggestions to start saving.</p>
                  </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Suggestions */}
        <div className="lg:col-span-1">
          <Card className="border-primary/30 relative overflow-hidden bg-card">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-1.5 w-full">
                <Sparkles className="w-3 h-3 fill-primary/20 text-primary" />
                AI Discovery
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10">
               {suggestions.length > 0 ? (
                  <div className="space-y-2">
                     {suggestions.map((s, idx) => (
                        <div key={idx} className="p-2 rounded-[2px] border border-primary/20 bg-background/50 flex flex-col gap-1.5">
                           <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-[12px] text-foreground">{s.name}</h4>
                              <span className="bg-primary/10 text-primary text-[9px] px-1.5 py-0 rounded-[2px] border border-primary/20 font-medium shrink-0">Tip</span>
                           </div>
                           
                           <p className="text-[10px] text-muted-foreground leading-relaxed">
                              {s.hint}
                           </p>
                           
                           <div className="flex justify-between items-center pt-1.5 border-t border-border/50">
                              <div>
                                 <p className="text-[9px] text-muted-foreground uppercase font-semibold">Est. Value</p>
                                 <p className="font-mono text-[12px] font-semibold text-foreground">{formatNaira(s.typicalAmount)}</p>
                              </div>
                              <Button 
                                 size="sm"
                                 onClick={() => handleApplySuggestion(s)}
                                 className="h-[22px] text-[11px] px-2 gap-1 rounded-[2px]"
                              >
                                 <Plus className="w-3 h-3" />
                                 Claim
                              </Button>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-6 text-muted-foreground bg-background/50 rounded-[2px] border border-border border-dashed text-[12px]">
                     <CheckCircle2 className="w-6 h-6 text-primary/50 mx-auto mb-2" />
                     <p>All deductions reviewed.</p>
                  </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
