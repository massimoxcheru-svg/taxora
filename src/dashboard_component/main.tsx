"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/micro-components/card";

import {
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Receipt,
  PiggyBank,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useTax } from "@/src/lib/tax-context";
import { formatNaira } from "@/src/lib/tax-engine";
import { getComplianceColor } from "@/src/lib/compliance-service";
import Link from "next/link";
import { Button } from "@/src/micro-components/button";

export default function Dashboard_Page() {
  const { state, computed } = useTax();

  // Sort transactions by date descending for recent list
  const recentTransactions = [...state.incomes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Generate some fake monthly progression for chart based on actual total
  const monthlyData = [
    { month: "Jan", income: computed.totalIncome * 0.1, tax: computed.taxResult.totalTax * 0.1 },
    { month: "Feb", income: computed.totalIncome * 0.15, tax: computed.taxResult.totalTax * 0.15 },
    { month: "Mar", income: computed.totalIncome * 0.12, tax: computed.taxResult.totalTax * 0.12 },
    { month: "Apr", income: computed.totalIncome * 0.18, tax: computed.taxResult.totalTax * 0.18 },
    { month: "May", income: computed.totalIncome * 0.15, tax: computed.taxResult.totalTax * 0.15 },
    { month: "Jun", income: computed.totalIncome * 0.3, tax: computed.taxResult.totalTax * 0.3 },
  ];

  const complianceColor = getComplianceColor(computed.compliance.score);

  return (
    <div className="space-y-2 animate-in fade-in duration-300">
      
      {/* Header Area - compact VS Code style */}
      <div className="flex items-center justify-between gap-2 py-1">
        <div>
          <h1 className="text-[14px] font-semibold text-foreground">Tax Overview</h1>
          <p className="text-[11px] text-muted-foreground">
            {state.profile.fullName || "User"} · {state.taxYear}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button asChild variant="outline" size="sm" className="h-[24px] text-[11px] px-2 rounded-[2px]">
            <Link href="/dashboard/transactions">Manage Income</Link>
          </Button>
          {computed.nextAction && (
            <Button asChild size="sm" className="h-[24px] text-[11px] px-2 rounded-[2px]">
              <Link href={computed.nextAction.route}>{computed.nextAction.action}</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        {/* Compliance Score Widget */}
         <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between overflow-hidden">
            <CardHeader>
               <CardTitle className="flex items-center justify-between w-full">
                  Compliance Score
                  {computed.compliance.score === 100 ? <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> : <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />}
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-end gap-1.5">
                  <span className="text-2xl font-bold font-mono" style={{ color: complianceColor }}>
                    {computed.compliance.score}
                  </span>
                  <span className="text-[11px] text-muted-foreground mb-0.5">/ 100</span>
               </div>
               
               {/* Progress bar */}
               <div className="h-[3px] w-full bg-muted rounded-none mt-2 overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000"
                    style={{ width: `${computed.compliance.score}%`, backgroundColor: complianceColor }}
                  />
               </div>

               {computed.compliance.warnings.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border">
                     <p className="text-[10px] text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Action Required</p>
                     {computed.compliance.warnings.slice(0, 2).map((w, i) => (
                        <p key={i} className="text-[11px] text-yellow-500 dark:text-yellow-400 flex items-start gap-1 mb-0.5">
                           <span className="mt-0.5 shrink-0">•</span> <span>{w}</span>
                        </p>
                     ))}
                  </div>
               )}
            </CardContent>
         </Card>

        {/* Total Income */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between w-full">
              Gross Income
              <div className="p-1 bg-primary/10 rounded-[2px]">
                <DollarSign className="w-3 h-3 text-primary" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono tracking-tight">{formatNaira(computed.totalIncome)}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
               <ArrowUpRight className="w-3 h-3 text-primary" />
               <span className="text-primary font-medium">+10%</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Estimated Tax Liability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between w-full">
              Estimated Tax
              <div className="p-1 bg-destructive/10 rounded-[2px]">
                <Receipt className="w-3 h-3 text-destructive" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono tracking-tight">{formatNaira(computed.taxResult.totalTax)}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
               <span className="font-medium text-foreground font-mono">{((computed.taxResult.totalTax / Math.max(1, computed.totalIncome)) * 100).toFixed(1)}%</span> Effective Rate
            </p>
          </CardContent>
        </Card>

        {/* Active Deductions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between w-full">
              Active Deductions
              <div className="p-1 bg-emerald-500/10 rounded-[2px]">
                <PiggyBank className="w-3 h-3 text-emerald-500" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono tracking-tight">{formatNaira(computed.totalDeductions)}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Saving approx. <span className="font-medium text-emerald-500 font-mono">{formatNaira(computed.totalDeductions * 0.15)}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Income vs Liability</CardTitle>
            <span className="text-[10px] text-muted-foreground">YTD Projection</span>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `₦${value/1000}K`} />
                  <Tooltip
                    formatter={(value: any) => value != null ? formatNaira(value) : ""}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      borderRadius: "2px",
                      border: "1px solid hsl(var(--border))",
                      boxShadow: "none",
                      fontSize: "11px",
                      padding: "4px 8px"
                    }}
                    cursor={{fill: "hsl(var(--muted))", opacity: 0.1}}
                  />
                  <Bar dataKey="income" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} barSize={16} />
                  <Bar dataKey="tax" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Income Streams</CardTitle>
            <span className="text-[10px] text-muted-foreground">By category</span>
          </CardHeader>
          <CardContent>
            {computed.incomeByCategory.length > 0 ? (
               <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={computed.incomeByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {computed.incomeByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => value != null ? formatNaira(value) : ""} 
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        borderRadius: "2px",
                        border: "1px solid hsl(var(--border))",
                        boxShadow: "none",
                        fontSize: "11px",
                        padding: "4px 8px"
                      }}
                       itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1 w-full max-h-[100px] overflow-y-auto">
                  {computed.incomeByCategory.map((category, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[12px] h-[22px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-none" style={{ backgroundColor: category.color}}></div>
                        <span className="font-medium text-foreground">{category.name}</span>
                      </div>
                      <span className="font-mono text-muted-foreground tabular-nums text-[11px]">{formatNaira(category.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
               <div className="h-[200px] flex items-center justify-center text-muted-foreground border border-dashed border-border rounded-[2px] bg-muted/20 text-[12px]">
                  No income data
               </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
         <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" asChild className="h-[22px] text-[11px] px-2 rounded-[2px]">
               <Link href="/dashboard/transactions">View All</Link>
            </Button>
         </CardHeader>
         <CardContent className="p-0">
            {recentTransactions.length > 0 ? (
               <div className="divide-y divide-border">
                  {recentTransactions.map((tx) => (
                     <div key={tx.id} className="py-1.5 px-3 flex justify-between items-center group hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2">
                           <div className="bg-primary/10 p-1 rounded-[2px] border border-primary/20">
                              <TrendingUp className="w-3 h-3 text-primary" />
                           </div>
                           <div>
                              <p className="font-medium text-[12px] text-foreground">{tx.source}</p>
                              <p className="text-[10px] text-muted-foreground font-mono">{new Date(tx.date).toLocaleDateString()}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="font-medium font-mono text-[12px] text-foreground">{formatNaira(tx.amount)}</p>
                           <p className="text-[10px] text-primary bg-primary/10 px-1.5 py-0 rounded-[2px] inline-block">{tx.category}</p>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="py-6 text-center text-muted-foreground border border-dashed border-border rounded-[2px] bg-muted/20 text-[12px] m-3">
                  <p>No recent transactions.</p>
                  <Button variant="link" asChild className="mt-1 text-primary text-[11px] h-auto p-0">
                     <Link href="/dashboard/transactions">Add your first income</Link>
                  </Button>
               </div>
            )}
         </CardContent>
      </Card>
    </div>
  );
}
