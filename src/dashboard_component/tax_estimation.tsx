"use client";
import { useTax } from "@/src/lib/tax-context";
import { formatNaira } from "@/src/lib/tax-engine";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/micro-components/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calculator, BadgeCheck, Sigma } from "lucide-react";
import { Button } from "@/src/micro-components/button";
import Link from "next/link";

export default function TaxEstimationPage() {
  const { computed } = useTax();

  const chartData = computed.taxResult.bandBreakdown.map(b => ({
    name: b.band,
    tax: b.taxAmount,
    income: b.taxableAmount,
  })).filter(b => b.tax > 0 || b.income > 0);

  return (
    <div className="space-y-2 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 py-1">
        <div>
          <h1 className="text-[14px] font-semibold text-foreground flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-primary" />
            Tax Calculator & Simulator
          </h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Real-time 2026 Nigerian PIT breakdown based on logged income and deductions.
          </p>
        </div>
        <Button asChild variant="outline" className="h-[24px] text-[11px] px-2 rounded-[2px]">
          <Link href="/dashboard/deductions">Manage Deductions</Link>
        </Button>
      </div>

      {computed.taxResult.isTaxFree ? (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-1.5 w-full normal-case text-[12px]">
              <BadgeCheck className="w-3.5 h-3.5" />
              Tax Exemption Applied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px]">Your income is below the ₦800,000 threshold. Under 2026 Nigerian tax law, you are exempt from PIT.</p>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        
        {/* Breakdown Process Column */}
        <div className="lg:col-span-1 space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>The Math</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               {/* Gross */}
               <div className="flex justify-between items-center text-[12px]">
                  <span className="text-muted-foreground font-medium flex items-center gap-1"><Sigma className="w-3 h-3"/> Gross Income</span>
                  <span className="font-mono">{formatNaira(computed.totalIncome)}</span>
               </div>
               
               {/* CRA */}
               <div className="flex justify-between items-center text-[12px] text-emerald-500">
                  <span className="font-medium">- CRA (Relief)</span>
                  <span className="font-mono">({formatNaira(computed.taxResult.cra)})</span>
               </div>

               {/* Deductions */}
               <div className="flex justify-between items-center text-[12px] text-emerald-500">
                  <span className="font-medium">- Deductions</span>
                  <span className="font-mono">({formatNaira(computed.totalDeductions)})</span>
               </div>

               <div className="border-t border-border border-dashed"></div>

               {/* Chargeable */}
               <div className="flex justify-between items-center text-[12px]">
                  <span className="text-foreground font-semibold">Chargeable Income</span>
                  <span className="font-mono font-semibold">{formatNaira(computed.taxResult.taxableIncome)}</span>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle>Final Liability</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-mono font-bold tracking-tight text-foreground">
                  {formatNaira(computed.taxResult.totalTax)}
               </div>
               <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                  Effective Rate: <span className="text-primary font-bold font-mono">{((computed.taxResult.totalTax / Math.max(1, computed.totalIncome)) * 100).toFixed(1)}%</span>
               </p>
            </CardContent>
          </Card>
        </div>

        {/* Bands Visualization Column */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Progressive Tax Bands (2026)</CardTitle>
              <span className="text-[10px] text-muted-foreground">Chargeable income per tier</span>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <div className="h-[260px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(value) => `₦${value/1000}K`} />
                      <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={70} />
                      <Tooltip 
                         formatter={(value: any) => value != null ? formatNaira(value) : ""} 
                         contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderRadius: "2px",
                            border: "1px solid hsl(var(--border))",
                            color: "hsl(var(--foreground))",
                            fontSize: "11px",
                            padding: "4px 8px",
                            boxShadow: "none",
                         }}
                         cursor={{fill: "hsl(var(--muted))", opacity: 0.4}}
                      />
                      <Bar dataKey="tax" name="Tax Paid" fill="hsl(var(--destructive))" radius={[0, 2, 2, 0]} barSize={14} />
                      <Bar dataKey="income" name="Income in Band" fill="hsl(var(--primary))" radius={[0, 2, 2, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[260px] flex items-center justify-center border border-dashed border-border rounded-[2px] bg-muted/10 text-muted-foreground text-[12px]">
                  No taxable bands utilized.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
