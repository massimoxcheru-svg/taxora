// ============================================================================
// Taxora - Compliance Health Score Service
// Calculates a 0–100 compliance score based on user's tax readiness
// ============================================================================

export type ComplianceStatus = "Not Started" | "In Progress" | "Almost Ready" | "Ready to File";

export interface ComplianceResult {
  score: number;
  status: ComplianceStatus;
  breakdown: ComplianceBreakdownItem[];
  warnings: string[];
  suggestions: string[];
}

export interface ComplianceBreakdownItem {
  category: string;
  score: number;
  maxScore: number;
  label: string;
  complete: boolean;
}

export interface ComplianceInput {
  incomeCount: number;
  totalIncome: number;
  deductionCount: number;
  totalDeductions: number;
  taxCalculated: boolean;
  filingGenerated: boolean;
  hasTIN: boolean;
  hasCompletedProfile: boolean;
}

export function calculateComplianceScore(input: ComplianceInput): ComplianceResult {
  const breakdown: ComplianceBreakdownItem[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // 1. Income Completeness (30 pts)
  let incomeScore = 0;
  if (input.incomeCount >= 1) incomeScore += 10;
  if (input.incomeCount >= 3) incomeScore += 10;
  if (input.totalIncome > 0) incomeScore += 10;
  
  breakdown.push({
    category: "Income Data",
    score: incomeScore,
    maxScore: 30,
    label: input.incomeCount > 0 ? `${input.incomeCount} source(s) added` : "No income added",
    complete: incomeScore >= 20,
  });

  if (input.incomeCount === 0) {
    warnings.push("No income sources have been added yet");
    suggestions.push("Add your first income source to begin");
  } else if (input.incomeCount < 3) {
    suggestions.push("Consider adding all your income sources for accurate calculation");
  }

  // 2. Deductions & Reliefs (20 pts)
  let deductionScore = 0;
  if (input.deductionCount >= 1) deductionScore += 10;
  if (input.deductionCount >= 3) deductionScore += 5;
  if (input.totalDeductions > 0) deductionScore += 5;

  breakdown.push({
    category: "Deductions",
    score: deductionScore,
    maxScore: 20,
    label: input.deductionCount > 0 ? `${input.deductionCount} deduction(s) claimed` : "No deductions added",
    complete: deductionScore >= 15,
  });

  if (input.deductionCount === 0) {
    suggestions.push("Add eligible deductions to reduce your tax liability");
  }

  // 3. Tax Calculation (25 pts)
  let calcScore = 0;
  if (input.taxCalculated) calcScore = 25;

  breakdown.push({
    category: "Tax Calculation",
    score: calcScore,
    maxScore: 25,
    label: input.taxCalculated ? "Tax calculated" : "Tax not yet calculated",
    complete: input.taxCalculated,
  });

  if (!input.taxCalculated && input.incomeCount > 0) {
    suggestions.push("Run your tax calculation to see your liability");
  }

  // 4. Filing Readiness (25 pts)
  let filingScore = 0;
  if (input.hasTIN) filingScore += 10;
  if (input.hasCompletedProfile) filingScore += 5;
  if (input.filingGenerated) filingScore += 10;

  breakdown.push({
    category: "Filing Readiness",
    score: filingScore,
    maxScore: 25,
    label: input.filingGenerated ? "Filing report generated" : "Filing report not generated",
    complete: filingScore >= 20,
  });

  if (!input.hasTIN) {
    warnings.push("Tax Identification Number (TIN) is missing");
    suggestions.push("Add your TIN in Settings for filing");
  }
  if (!input.filingGenerated && input.taxCalculated) {
    suggestions.push("Generate your filing report to complete the process");
  }

  // Calculate total
  const totalScore = incomeScore + deductionScore + calcScore + filingScore;

  // Determine status
  let status: ComplianceStatus;
  if (totalScore === 0) status = "Not Started";
  else if (totalScore < 50) status = "In Progress";
  else if (totalScore < 80) status = "Almost Ready";
  else status = "Ready to File";

  // Risk detection
  if (input.totalIncome > 0 && input.incomeCount === 1 && input.totalIncome > 5_000_000) {
    warnings.push("You may have unreported income sources - only one source recorded for high income");
  }

  return {
    score: totalScore,
    status,
    breakdown,
    warnings,
    suggestions,
  };
}

export function getComplianceColor(score: number): string {
  if (score >= 80) return "#10b981"; // green
  if (score >= 50) return "#f59e0b"; // amber
  if (score >= 25) return "#f97316"; // orange
  return "#ef4444"; // red
}
