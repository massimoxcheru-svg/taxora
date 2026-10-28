"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/micro-components/card";
import { Input } from "@/src/micro-components/input";
import { Button } from "@/src/micro-components/button";
import { Label } from "@/src/micro-components/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/micro-components/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/micro-components/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/micro-components/select";
import { useTax } from "@/src/lib/tax-context";
import { formatNaira, calculatePIT } from "@/src/lib/tax-engine";
import { Plus, Trash2, ArrowUpRight, Search, FileSpreadsheet } from "lucide-react";
import { CATEGORY_COLORS } from "@/src/lib/tax-context";

export default function Transactions() {
  const { state, computed, addIncome, deleteIncome } = useTax();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // New Income Form State
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    category: "Salary",
    date: new Date().toISOString().split('T')[0],
  });

  const filteredIncomes = state.incomes.filter(i =>
    i.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Simulation
  const parsedAmount = parseFloat(formData.amount) || 0;
  const simulatedGross = computed.totalIncome + parsedAmount;
  const simulatedResult = calculatePIT(simulatedGross, computed.totalDeductions);
  const taxIncrease = simulatedResult.totalTax - computed.taxResult.totalTax;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.source || parsedAmount <= 0) return;

    addIncome({
      source: formData.source,
      description: "Added manually",
      amount: parsedAmount,
      category: formData.category as any,
      date: formData.date,
      bank: "Cash/Manual",
      taxable: true,
      relief: 0
    });

    setIsAdding(false);
    setFormData({ ...formData, source: "", amount: "" });
  };

  const exportCSV = () => {
    const headers = ["Date,Source,Category,Amount"];
    const rows = state.incomes.map(i => `${i.date},"${i.source}",${i.category},${i.amount}`);
    const csvContext = headers.concat(rows).join("\n");
    const blob = new Blob([csvContext], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taxora_income_${state.taxYear}.csv`;
    a.click();
  };

  return (
    <div className="space-y-2 animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-2 py-1">
        <div>
          <h1 className="text-[14px] font-semibold text-foreground">Income Sources</h1>
          <p className="text-[11px] text-muted-foreground">
            Log all revenue streams. Tax implications are calculated automatically.
          </p>
        </div>

        <div className="flex gap-1">
          <Button variant="outline" onClick={exportCSV} className="h-[24px] text-[11px] px-2 rounded-[2px] hidden md:flex">
            <FileSpreadsheet className="w-3 h-3 mr-1" />
            Export CSV
          </Button>

          <Dialog open={isAdding} onOpenChange={setIsAdding}>
            <DialogTrigger asChild>
              <Button className="h-[24px] text-[11px] px-2 rounded-[2px]">
                <Plus className="w-3 h-3 mr-1" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] rounded-[2px]">
              <form onSubmit={handleAdd}>
                <DialogHeader>
                  <DialogTitle className="text-[14px]">Log New Income</DialogTitle>
                  <DialogDescription className="text-[11px]">
                    Add a new revenue stream and see how it affects your tax liability.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-3">
                  <div className="grid gap-1">
                    <Label htmlFor="source" className="text-[12px]">Source Name</Label>
                    <Input id="source" required value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} placeholder="e.g. Freelance Client #1" className="h-[28px] text-[12px] rounded-[2px]" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="amount" className="text-[12px]">Gross Amount (₦)</Label>
                    <Input id="amount" required type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} placeholder="150000" className="h-[28px] text-[12px] rounded-[2px] font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <Label className="text-[12px]">Category</Label>
                      <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                        <SelectTrigger className="h-[28px] text-[12px] rounded-[2px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Salary">Salary</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                          <SelectItem value="Investment">Investment</SelectItem>
                          <SelectItem value="Rental">Rental</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="date" className="text-[12px]">Date</Label>
                      <Input id="date" required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="h-[28px] text-[12px] rounded-[2px]" />
                    </div>
                  </div>

                  {/* Smart Simulation Preview */}
                  {parsedAmount > 0 && (
                    <div className="p-2 bg-muted rounded-[2px] border border-border space-y-1">
                      <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Simulation
                      </div>
                      <div className="flex justify-between items-center text-[12px]">
                        <span>New Effective Total</span>
                        <span className="font-mono">{formatNaira(simulatedGross)}</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] text-destructive">
                        <span>Tax Liability Increase</span>
                        <span className="font-mono flex items-center gap-0.5 font-bold">
                          <ArrowUpRight className="w-3 h-3" />
                          {formatNaira(taxIncrease)}
                        </span>
                      </div>
                    </div>
                  )}

                </div>
                <DialogFooter>
                  <Button type="submit" disabled={!formData.source || parsedAmount <= 0} className="h-[28px] text-[12px] rounded-[2px]">Save Income</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Ledger</CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-7 w-[180px] h-[24px] text-[11px] rounded-[2px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="h-[28px]">
                <TableHead className="w-[100px] text-[11px] font-semibold uppercase tracking-wider py-0 px-3">Date</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-0 px-3">Source</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-0 px-3">Category</TableHead>
                <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider py-0 px-3">Amount</TableHead>
                <TableHead className="w-[40px] py-0 px-3"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncomes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-16 text-muted-foreground text-[12px]">
                    No income sources found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredIncomes.map((income) => (
                  <TableRow key={income.id} className="group hover:bg-accent/50 h-[28px]">
                    <TableCell className="font-mono text-[11px] text-muted-foreground py-0 px-3">{new Date(income.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium text-[12px] py-0 px-3">{income.source}</TableCell>
                    <TableCell className="py-0 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-none" style={{ backgroundColor: CATEGORY_COLORS[income.category] || "#848484" }} />
                        <span className="text-[11px]">{income.category}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium text-[12px] py-0 px-3">{formatNaira(income.amount)}</TableCell>
                    <TableCell className="py-0 px-3">
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => deleteIncome(income.id)} className="h-6 w-6 text-muted-foreground hover:text-destructive rounded-[2px]">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
