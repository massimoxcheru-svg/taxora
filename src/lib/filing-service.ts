// ============================================================================
// Taxora - Filing & Export Service
// Generates filing reports and handles CSV/data export
// ============================================================================

import { PITResult, CITResult, formatNairaFull } from "./tax-engine";

export type FilingStatus = "not_started" | "in_progress" | "ready" | "filed";

export interface FilingStep {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface FilingReport {
  taxpayerName: string;
  tin: string;
  taxYear: number;
  generatedAt: string;
  incomes: { source: string; category: string; amount: number }[];
  deductions: { name: string; amount: number; description: string }[];
  taxResult: PITResult | null;
  totalIncome: number;
  totalDeductions: number;
  taxPayable: number;
  filingStatus: FilingStatus;
}

/**
 * Get filing checklist steps based on current user state
 */
export function getFilingSteps(state: {
  hasIncome: boolean;
  hasDeductions: boolean;
  hasTaxCalculation: boolean;
  hasReport: boolean;
  hasFiled: boolean;
}): FilingStep[] {
  const steps: FilingStep[] = [
    {
      id: "income",
      label: "Add Income Sources",
      description: "Record all your income sources for the tax year",
      completed: state.hasIncome,
      current: !state.hasIncome,
    },
    {
      id: "deductions",
      label: "Claim Deductions",
      description: "Add eligible deductions to reduce your taxable income",
      completed: state.hasDeductions,
      current: state.hasIncome && !state.hasDeductions,
    },
    {
      id: "calculate",
      label: "Calculate Tax",
      description: "Run the tax calculation to determine your liability",
      completed: state.hasTaxCalculation,
      current: state.hasIncome && state.hasDeductions && !state.hasTaxCalculation,
    },
    {
      id: "report",
      label: "Generate Filing Report",
      description: "Create your official filing report document",
      completed: state.hasReport,
      current: state.hasTaxCalculation && !state.hasReport,
    },
    {
      id: "file",
      label: "Submit Filing",
      description: "Submit your tax filing to FIRS",
      completed: state.hasFiled,
      current: state.hasReport && !state.hasFiled,
    },
  ];

  return steps;
}

/**
 * Get the next action the user should take
 */
export function getNextFilingAction(state: {
  hasIncome: boolean;
  hasDeductions: boolean;
  hasTaxCalculation: boolean;
  hasReport: boolean;
  hasFiled: boolean;
}): { action: string; description: string; route: string } | null {
  if (!state.hasIncome) {
    return {
      action: "Add Income Sources",
      description: "Start by adding your income sources to calculate your tax obligation",
      route: "/dashboard/transactions",
    };
  }
  if (!state.hasDeductions) {
    return {
      action: "Add Deductions",
      description: "Claim eligible deductions to reduce your taxable income",
      route: "/dashboard/deductions",
    };
  }
  if (!state.hasTaxCalculation) {
    return {
      action: "Calculate Your Tax",
      description: "Run the tax calculator to see your estimated tax liability",
      route: "/dashboard/taxestimation",
    };
  }
  if (!state.hasReport) {
    return {
      action: "Generate Filing Report",
      description: "Create your tax filing report for submission",
      route: "/dashboard/reports",
    };
  }
  if (!state.hasFiled) {
    return {
      action: "Submit Your Filing",
      description: "Submit your completed tax filing to FIRS",
      route: "/dashboard/reports",
    };
  }
  return null;
}

/**
 * Export income data as CSV string
 */
export function exportIncomesCSV(
  incomes: { source: string; category: string; amount: number; date: string; bank: string }[]
): string {
  const headers = ["Date", "Description", "Category", "Bank", "Amount (₦)"];
  const rows = incomes.map(i => [
    i.date,
    `"${i.source}"`,
    i.category,
    i.bank,
    i.amount.toString(),
  ]);
  return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
}

/**
 * Export full tax report as CSV string
 */
export function exportTaxReportCSV(report: FilingReport): string {
  const lines: string[] = [];

  lines.push("TAXORA - TAX FILING REPORT");
  lines.push(`Taxpayer,${report.taxpayerName}`);
  lines.push(`TIN,${report.tin}`);
  lines.push(`Tax Year,${report.taxYear}`);
  lines.push(`Generated,${report.generatedAt}`);
  lines.push("");

  lines.push("INCOME SOURCES");
  lines.push("Source,Category,Amount (₦)");
  report.incomes.forEach(i => {
    lines.push(`"${i.source}",${i.category},${i.amount}`);
  });
  lines.push(`Total Income,,${report.totalIncome}`);
  lines.push("");

  lines.push("DEDUCTIONS & RELIEFS");
  lines.push("Deduction,Amount (₦),Description");
  report.deductions.forEach(d => {
    lines.push(`"${d.name}",${d.amount},"${d.description}"`);
  });
  lines.push(`Total Deductions,${report.totalDeductions},`);
  lines.push("");

  lines.push("TAX SUMMARY");
  lines.push(`Gross Income,${formatNairaFull(report.totalIncome)}`);
  lines.push(`Total Deductions,${formatNairaFull(report.totalDeductions)}`);
  lines.push(`Tax Payable,${formatNairaFull(report.taxPayable)}`);

  if (report.taxResult) {
    lines.push(`Effective Rate,${report.taxResult.effectiveRate}%`);
    lines.push("");
    lines.push("TAX BAND BREAKDOWN");
    lines.push("Band,Rate,Taxable Amount (₦),Tax (₦)");
    report.taxResult.bandBreakdown.forEach(b => {
      lines.push(`"${b.band}",${b.rateLabel},${b.taxableAmount},${b.taxAmount}`);
    });
  }

  return lines.join("\n");
}

/**
 * Trigger a file download in the browser
 */
export function downloadFile(content: string, filename: string, mimeType: string = "text/csv"): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Calculate days until filing deadline
 */
export function getDaysUntilDeadline(deadlineDate: Date = new Date(2026, 5, 30)): number {
  const now = new Date();
  const diff = deadlineDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getDeadlineUrgency(days: number): "safe" | "warning" | "urgent" | "overdue" {
  if (days <= 0) return "overdue";
  if (days <= 14) return "urgent";
  if (days <= 30) return "warning";
  return "safe";
}
