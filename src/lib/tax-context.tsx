"use client";
// ============================================================================
// Taxora - Global Tax State Management (React Context)
// Single source of truth for all tax data, calculations, and user state
// ============================================================================

import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { calculatePIT, type PITResult, formatNaira } from "./tax-engine";
import { calculateComplianceScore, type ComplianceResult } from "./compliance-service";
import { getNextFilingAction, getDaysUntilDeadline, type FilingStatus } from "./filing-service";

// ---------------------------------------------------------------------------
// Data Types
// ---------------------------------------------------------------------------
export interface IncomeSource {
  id: string;
  source: string;
  description: string;
  amount: number;
  category: "Salary" | "Business" | "Investment" | "Rental" | "Other";
  date: string;
  bank: string;
  taxable: boolean;
  relief: number;
}

export interface Deduction {
  id: string;
  name: string;
  amount: number;
  category: string;
  description: string;
}

export interface TaxpayerProfile {
  fullName: string;
  email: string;
  phone: string;
  tin: string;
  taxpayerType: "individual" | "business";
  businessRevenueTier: "small" | "medium" | "large";
}

// ---------------------------------------------------------------------------
// State Shape
// ---------------------------------------------------------------------------
export interface TaxState {
  incomes: IncomeSource[];
  deductions: Deduction[];
  profile: TaxpayerProfile;
  filingStatus: FilingStatus;
  filingGenerated: boolean;
  taxYear: number;
}

// ---------------------------------------------------------------------------
// Default Data - realistic Nigerian tax scenario
// ---------------------------------------------------------------------------
const DEFAULT_INCOMES: IncomeSource[] = [
  { id: "1", source: "Salary Payment - January", description: "Monthly salary", amount: 950_000, category: "Salary", date: "2026-01-20", bank: "GTBank", taxable: true, relief: 200_000 },
  { id: "2", source: "Client Invoice #1234", description: "Consulting work", amount: 350_000, category: "Business", date: "2026-01-18", bank: "Access Bank", taxable: true, relief: 0 },
  { id: "3", source: "Dividend Payment - Q4", description: "Stock dividends", amount: 75_000, category: "Investment", date: "2026-01-15", bank: "Zenith Bank", taxable: true, relief: 0 },
  { id: "4", source: "Consulting Fee - ABC Ltd", description: "Consulting project", amount: 180_000, category: "Business", date: "2026-01-12", bank: "GTBank", taxable: true, relief: 0 },
  { id: "5", source: "Freelance Project Payment", description: "Freelance work", amount: 120_000, category: "Business", date: "2026-01-10", bank: "Access Bank", taxable: true, relief: 0 },
  { id: "6", source: "Rental Income", description: "Property rental", amount: 200_000, category: "Rental", date: "2026-01-08", bank: "First Bank", taxable: true, relief: 0 },
  { id: "7", source: "Stock Trading Profit", description: "Stock gains", amount: 85_000, category: "Investment", date: "2026-01-05", bank: "Zenith Bank", taxable: true, relief: 0 },
  { id: "8", source: "Business Service Income", description: "Service delivery", amount: 250_000, category: "Business", date: "2026-01-03", bank: "GTBank", taxable: true, relief: 0 },
];

const DEFAULT_DEDUCTIONS: Deduction[] = [
  { id: "1", name: "Rent Relief", amount: 820_000, category: "rent", description: "1% of gross income or actual rent (whichever is lower)" },
  { id: "2", name: "Pension Contribution", amount: 400_000, category: "pension", description: "8% of basic salary" },
  { id: "3", name: "Life Insurance", amount: 50_000, category: "life-insurance", description: "Annual premium payment" },
  { id: "4", name: "National Housing Fund", amount: 45_000, category: "nhf", description: "2.5% of basic salary" },
];

const DEFAULT_PROFILE: TaxpayerProfile = {
  fullName: "Adewale Johnson",
  email: "adewale.johnson@example.com",
  phone: "+234 800 123 4567",
  tin: "12345678-0001",
  taxpayerType: "individual",
  businessRevenueTier: "small",
};

const INITIAL_STATE: TaxState = {
  incomes: DEFAULT_INCOMES,
  deductions: DEFAULT_DEDUCTIONS,
  profile: DEFAULT_PROFILE,
  filingStatus: "not_started",
  filingGenerated: false,
  taxYear: 2026,
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
type TaxAction =
  | { type: "ADD_INCOME"; payload: Omit<IncomeSource, "id"> }
  | { type: "UPDATE_INCOME"; payload: IncomeSource }
  | { type: "DELETE_INCOME"; payload: string }
  | { type: "ADD_DEDUCTION"; payload: Omit<Deduction, "id"> }
  | { type: "UPDATE_DEDUCTION"; payload: Deduction }
  | { type: "DELETE_DEDUCTION"; payload: string }
  | { type: "UPDATE_PROFILE"; payload: Partial<TaxpayerProfile> }
  | { type: "SET_FILING_STATUS"; payload: FilingStatus }
  | { type: "SET_FILING_GENERATED"; payload: boolean }
  | { type: "RESET" };

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function taxReducer(state: TaxState, action: TaxAction): TaxState {
  switch (action.type) {
    case "ADD_INCOME":
      return {
        ...state,
        incomes: [...state.incomes, { ...action.payload, id: generateId() }],
        filingGenerated: false, // invalidate filing on change
      };
    case "UPDATE_INCOME":
      return {
        ...state,
        incomes: state.incomes.map(i => i.id === action.payload.id ? action.payload : i),
        filingGenerated: false,
      };
    case "DELETE_INCOME":
      return {
        ...state,
        incomes: state.incomes.filter(i => i.id !== action.payload),
        filingGenerated: false,
      };
    case "ADD_DEDUCTION":
      return {
        ...state,
        deductions: [...state.deductions, { ...action.payload, id: generateId() }],
        filingGenerated: false,
      };
    case "UPDATE_DEDUCTION":
      return {
        ...state,
        deductions: state.deductions.map(d => d.id === action.payload.id ? action.payload : d),
        filingGenerated: false,
      };
    case "DELETE_DEDUCTION":
      return {
        ...state,
        deductions: state.deductions.filter(d => d.id !== action.payload),
        filingGenerated: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    case "SET_FILING_STATUS":
      return { ...state, filingStatus: action.payload };
    case "SET_FILING_GENERATED":
      return { ...state, filingGenerated: action.payload };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Computed / Derived State
// ---------------------------------------------------------------------------
export interface TaxComputedState {
  totalIncome: number;
  totalDeductions: number;
  taxResult: PITResult;
  compliance: ComplianceResult;
  nextAction: ReturnType<typeof getNextFilingAction>;
  daysUntilDeadline: number;
  incomeByCategory: { name: string; value: number; color: string }[];
}

export const CATEGORY_COLORS: Record<string, string> = {
  Salary: "#3ECF8E",    // Supabase Neon Green
  Business: "#10b981",  // Emerald
  Investment: "#34d399", // Mint Green
  Rental: "#065f46",    // Deep Forest Green
  Other: "#848484",     // Minimalist Gray
};

function computeDerivedState(state: TaxState): TaxComputedState {
  const totalIncome = state.incomes.reduce((s, i) => s + i.amount, 0);
  const totalDeductions = state.deductions.reduce((s, d) => s + d.amount, 0);
  const taxResult = calculatePIT(totalIncome, totalDeductions);

  const compliance = calculateComplianceScore({
    incomeCount: state.incomes.length,
    totalIncome,
    deductionCount: state.deductions.length,
    totalDeductions,
    taxCalculated: state.incomes.length > 0,
    filingGenerated: state.filingGenerated,
    hasTIN: state.profile.tin.length > 0,
    hasCompletedProfile: state.profile.fullName.length > 0 && state.profile.email.length > 0,
  });

  const nextAction = getNextFilingAction({
    hasIncome: state.incomes.length > 0,
    hasDeductions: state.deductions.length > 0,
    hasTaxCalculation: state.incomes.length > 0,
    hasReport: state.filingGenerated,
    hasFiled: state.filingStatus === "filed",
  });

  // Group income by category
  const categoryMap: Record<string, number> = {};
  state.incomes.forEach(i => {
    categoryMap[i.category] = (categoryMap[i.category] || 0) + i.amount;
  });



  const incomeByCategory = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] || "#6b7280",
  }));

  return {
    totalIncome,
    totalDeductions,
    taxResult,
    compliance,
    nextAction,
    daysUntilDeadline: getDaysUntilDeadline(),
    incomeByCategory,
  };
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface TaxContextType {
  state: TaxState;
  computed: TaxComputedState;
  addIncome: (income: Omit<IncomeSource, "id">) => void;
  updateIncome: (income: IncomeSource) => void;
  deleteIncome: (id: string) => void;
  addDeduction: (deduction: Omit<Deduction, "id">) => void;
  updateDeduction: (deduction: Deduction) => void;
  deleteDeduction: (id: string) => void;
  updateProfile: (profile: Partial<TaxpayerProfile>) => void;
  setFilingStatus: (status: FilingStatus) => void;
  setFilingGenerated: (generated: boolean) => void;
  reset: () => void;
}

const TaxContext = createContext<TaxContextType | null>(null);

export function TaxProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taxReducer, INITIAL_STATE);

  const addIncome = useCallback((income: Omit<IncomeSource, "id">) => {
    dispatch({ type: "ADD_INCOME", payload: income });
  }, []);

  const updateIncome = useCallback((income: IncomeSource) => {
    dispatch({ type: "UPDATE_INCOME", payload: income });
  }, []);

  const deleteIncome = useCallback((id: string) => {
    dispatch({ type: "DELETE_INCOME", payload: id });
  }, []);

  const addDeduction = useCallback((deduction: Omit<Deduction, "id">) => {
    dispatch({ type: "ADD_DEDUCTION", payload: deduction });
  }, []);

  const updateDeduction = useCallback((deduction: Deduction) => {
    dispatch({ type: "UPDATE_DEDUCTION", payload: deduction });
  }, []);

  const deleteDeduction = useCallback((id: string) => {
    dispatch({ type: "DELETE_DEDUCTION", payload: id });
  }, []);

  const updateProfile = useCallback((profile: Partial<TaxpayerProfile>) => {
    dispatch({ type: "UPDATE_PROFILE", payload: profile });
  }, []);

  const setFilingStatus = useCallback((status: FilingStatus) => {
    dispatch({ type: "SET_FILING_STATUS", payload: status });
  }, []);

  const setFilingGenerated = useCallback((generated: boolean) => {
    dispatch({ type: "SET_FILING_GENERATED", payload: generated });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const computed = useMemo(() => computeDerivedState(state), [state]);

  const value = useMemo(() => ({
    state,
    computed,
    addIncome,
    updateIncome,
    deleteIncome,
    addDeduction,
    updateDeduction,
    deleteDeduction,
    updateProfile,
    setFilingStatus,
    setFilingGenerated,
    reset,
  }), [state, computed, addIncome, updateIncome, deleteIncome, addDeduction, updateDeduction, deleteDeduction, updateProfile, setFilingStatus, setFilingGenerated, reset]);

  return <TaxContext.Provider value={value}>{children}</TaxContext.Provider>;
}

export function useTax(): TaxContextType {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error("useTax must be used within a TaxProvider");
  }
  return context;
}
