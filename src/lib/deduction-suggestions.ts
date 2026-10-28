// ============================================================================
// Taxora - Deduction Discovery Engine
// Suggests eligible deductions and calculates potential tax savings
// ============================================================================

import { calculatePIT } from "./tax-engine";

export interface DeductionSuggestion {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibilityCriteria: string;
  typicalAmount: number;
  maxAllowable: number | null;
  potentialSavings: number;
  isApplied: boolean;
  hint: string;
}

export interface DeductionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const DEDUCTION_CATEGORIES: DeductionCategory[] = [
  {
    id: "pension",
    name: "Pension Contribution",
    icon: "piggy-bank",
    description: "Mandatory and voluntary pension contributions",
  },
  {
    id: "nhf",
    name: "National Housing Fund",
    icon: "home",
    description: "NHF contributions (2.5% of basic salary)",
  },
  {
    id: "nhis",
    name: "Health Insurance",
    icon: "heart-pulse",
    description: "National Health Insurance Scheme contributions",
  },
  {
    id: "life-insurance",
    name: "Life Insurance",
    icon: "shield",
    description: "Life insurance policy premiums",
  },
  {
    id: "rent",
    name: "Rent Relief",
    icon: "building",
    description: "Relief on rent payments",
  },
  {
    id: "mortgage",
    name: "Mortgage Interest",
    icon: "landmark",
    description: "Interest on mortgage for owner-occupied property",
  },
  {
    id: "gratuity",
    name: "Gratuity",
    icon: "gift",
    description: "Approved gratuity schemes",
  },
  {
    id: "donation",
    name: "Donations",
    icon: "hand-heart",
    description: "Donations to approved institutions",
  },
];

/**
 * Generate deduction suggestions based on user's income profile.
 * Compares current tax vs. hypothetical tax-with-deduction to calculate savings.
 */
export function generateDeductionSuggestions(
  grossIncome: number,
  currentDeductions: { name: string; amount: number }[],
): DeductionSuggestion[] {
  const currentDeductionTotal = currentDeductions.reduce(
    (s, d) => s + d.amount,
    0,
  );
  const currentTax = calculatePIT(grossIncome, currentDeductionTotal).totalTax;

  const appliedNames = new Set(
    currentDeductions.map((d) => d.name.toLowerCase()),
  );

  const allPossible: Omit<
    DeductionSuggestion,
    "potentialSavings" | "isApplied"
  >[] = [
    {
      id: "pension",
      name: "Pension Contribution",
      category: "pension",
      description:
        "Employee pension contribution (typically 8% of basic salary)",
      eligibilityCriteria:
        "All employed individuals under the Pension Reform Act",
      typicalAmount: Math.round(grossIncome * 0.08),
      maxAllowable: null,
      hint: "Pension contributions are tax-deductible and grow your retirement fund",
    },
    {
      id: "nhf",
      name: "National Housing Fund",
      category: "nhf",
      description: "Monthly NHF contribution (2.5% of basic monthly salary)",
      eligibilityCriteria: "Employees earning ₦3,000+ per annum",
      typicalAmount: Math.round(grossIncome * 0.025),
      maxAllowable: null,
      hint: "NHF contributions qualify you for housing loans at low interest rates",
    },
    {
      id: "nhis",
      name: "Health Insurance",
      category: "nhis",
      description: "National Health Insurance Scheme premium",
      eligibilityCriteria: "All employees and self-employed individuals",
      typicalAmount: Math.min(100_000, Math.round(grossIncome * 0.05)),
      maxAllowable: null,
      hint: "NHIS provides healthcare coverage while reducing your taxable income",
    },
    {
      id: "life-insurance",
      name: "Life Insurance Premium",
      category: "life-insurance",
      description: "Annual premium on qualifying life insurance policies",
      eligibilityCriteria: "Holder of a qualifying life insurance policy",
      typicalAmount: 50_000,
      maxAllowable: null,
      hint: "Life insurance premiums are fully deductible from taxable income",
    },
    {
      id: "rent",
      name: "Rent Relief",
      category: "rent",
      description: "Relief on annual rent payment for primary residence",
      eligibilityCriteria:
        "Taxpayers who pay rent and don't own their residence",
      typicalAmount: Math.round(grossIncome * 0.1),
      maxAllowable: null,
      hint: "Claim rent relief to significantly reduce your tax burden",
    },
    {
      id: "mortgage",
      name: "Mortgage Interest Relief",
      category: "mortgage",
      description: "Interest paid on mortgage for owner-occupied property",
      eligibilityCriteria:
        "Homeowners with an active mortgage on primary residence",
      typicalAmount: 500_000,
      maxAllowable: null,
      hint: "Mortgage interest can provide substantial tax relief for homeowners",
    },
    {
      id: "donation",
      name: "Charitable Donations",
      category: "donation",
      description: "Donations to government-approved charitable institutions",
      eligibilityCriteria: "Donations must be to institutions approved by FIRS",
      typicalAmount: 100_000,
      maxAllowable: Math.round(grossIncome * 0.1),
      hint: "Charitable giving can reduce your tax while supporting your community",
    },
  ];

  return allPossible.map((suggestion) => {
    const isApplied = appliedNames.has(suggestion.name.toLowerCase());

    // Calculate potential savings if this deduction were added
    let potentialSavings = 0;
    if (!isApplied) {
      const hypotheticalDeductions =
        currentDeductionTotal + suggestion.typicalAmount;
      const hypotheticalTax = calculatePIT(
        grossIncome,
        hypotheticalDeductions,
      ).totalTax;
      potentialSavings = Math.max(0, currentTax - hypotheticalTax);
    }

    return {
      ...suggestion,
      potentialSavings,
      isApplied,
    };
  });
}
