// ============================================================================
// Taxora - Core Tax Calculation Engine
// Nigeria 2026 Personal Income Tax (PIT) & Corporate Income Tax (CIT)
// ============================================================================

// ---------------------------------------------------------------------------
// Tax Band Definitions - Nigeria 2026 PIT Progressive Rates
// ---------------------------------------------------------------------------
export interface TaxBand {
  band: string;
  rate: number;      // percentage as decimal (e.g. 0.07)
  rateLabel: string;  // display label (e.g. "7%")
  min: number;
  max: number;
  color: string;
}

export const PIT_TAX_FREE_THRESHOLD = 800_000;

export const PIT_TAX_BANDS: TaxBand[] = [
  { band: "First ₦300K",   rate: 0.07, rateLabel: "7%",  min: 0,         max: 300_000,    color: "#3b82f6" },
  { band: "Next ₦300K",    rate: 0.11, rateLabel: "11%", min: 300_000,   max: 600_000,    color: "#10b981" },
  { band: "Next ₦500K",    rate: 0.15, rateLabel: "15%", min: 600_000,   max: 1_100_000,  color: "#8b5cf6" },
  { band: "Next ₦500K",    rate: 0.19, rateLabel: "19%", min: 1_100_000, max: 1_600_000,  color: "#f59e0b" },
  { band: "Next ₦1.6M",    rate: 0.21, rateLabel: "21%", min: 1_600_000, max: 3_200_000,  color: "#ef4444" },
  { band: "Above ₦3.2M",   rate: 0.24, rateLabel: "24%", min: 3_200_000, max: Infinity,   color: "#dc2626" },
];

// ---------------------------------------------------------------------------
// CIT Tiers - Nigeria 2026 Corporate Income Tax
// ---------------------------------------------------------------------------
export interface CITTier {
  label: string;
  minRevenue: number;
  maxRevenue: number;
  rate: number;
  rateLabel: string;
}

export const CIT_TIERS: CITTier[] = [
  { label: "Small Business",  minRevenue: 0,           maxRevenue: 25_000_000,  rate: 0.00, rateLabel: "0%" },
  { label: "Medium Business",  minRevenue: 25_000_000,  maxRevenue: 100_000_000, rate: 0.20, rateLabel: "20%" },
  { label: "Large Business",   minRevenue: 100_000_000, maxRevenue: Infinity,     rate: 0.30, rateLabel: "30%" },
];

// ---------------------------------------------------------------------------
// Consolidated Relief Allowance (CRA)
// CRA = max(₦200,000, 1% of gross) + 20% of gross
// ---------------------------------------------------------------------------
export function calculateCRA(grossIncome: number): number {
  const base = Math.max(200_000, grossIncome * 0.01);
  return base + (grossIncome * 0.20);
}

// ---------------------------------------------------------------------------
// Apply Progressive PIT Rates
// Returns band-by-band breakdown + total tax
// ---------------------------------------------------------------------------
export interface TaxBandResult {
  band: string;
  rate: number;
  rateLabel: string;
  taxableAmount: number;
  taxAmount: number;
  color: string;
}

export interface PITResult {
  grossIncome: number;
  cra: number;
  otherDeductions: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  bandBreakdown: TaxBandResult[];
  isTaxFree: boolean;
}

export function applyProgressiveRates(taxableIncome: number): { bands: TaxBandResult[]; totalTax: number } {
  let remaining = taxableIncome;
  let totalTax = 0;
  const bands: TaxBandResult[] = [];

  for (const band of PIT_TAX_BANDS) {
    if (remaining <= 0) break;

    const bandRange = band.max === Infinity ? remaining : band.max - band.min;
    const taxableInBand = Math.min(remaining, bandRange);
    const taxInBand = taxableInBand * band.rate;

    if (taxableInBand > 0) {
      bands.push({
        band: band.band,
        rate: band.rate,
        rateLabel: band.rateLabel,
        taxableAmount: taxableInBand,
        taxAmount: Math.round(taxInBand),
        color: band.color,
      });
      totalTax += taxInBand;
      remaining -= taxableInBand;
    }
  }

  return { bands, totalTax: Math.round(totalTax) };
}

// ---------------------------------------------------------------------------
// Calculate Personal Income Tax (PIT)
// ---------------------------------------------------------------------------
export function calculatePIT(grossIncome: number, otherDeductions: number = 0): PITResult {
  const cra = calculateCRA(grossIncome);
  const taxableIncome = Math.max(0, grossIncome - cra - otherDeductions);

  // Tax-free threshold check
  if (taxableIncome <= PIT_TAX_FREE_THRESHOLD) {
    return {
      grossIncome,
      cra,
      otherDeductions,
      taxableIncome,
      totalTax: 0,
      effectiveRate: 0,
      bandBreakdown: [],
      isTaxFree: true,
    };
  }

  // Apply progressive rates on amount above threshold
  const taxableAboveThreshold = taxableIncome - PIT_TAX_FREE_THRESHOLD;
  const { bands, totalTax } = applyProgressiveRates(taxableAboveThreshold);

  return {
    grossIncome,
    cra,
    otherDeductions,
    taxableIncome,
    totalTax,
    effectiveRate: grossIncome > 0 ? Number(((totalTax / grossIncome) * 100).toFixed(2)) : 0,
    bandBreakdown: bands,
    isTaxFree: false,
  };
}

// ---------------------------------------------------------------------------
// Calculate Corporate Income Tax (CIT)
// ---------------------------------------------------------------------------
export interface CITResult {
  revenue: number;
  tier: CITTier;
  taxableProfit: number;
  totalTax: number;
  effectiveRate: number;
}

export function calculateCIT(revenue: number, expenses: number = 0): CITResult {
  const tier = CIT_TIERS.find(t => revenue >= t.minRevenue && revenue < t.maxRevenue) || CIT_TIERS[CIT_TIERS.length - 1];
  const taxableProfit = Math.max(0, revenue - expenses);
  const totalTax = Math.round(taxableProfit * tier.rate);

  return {
    revenue,
    tier,
    taxableProfit,
    totalTax,
    effectiveRate: revenue > 0 ? Number(((totalTax / revenue) * 100).toFixed(2)) : 0,
  };
}

// ---------------------------------------------------------------------------
// Utility: Format currency for display
// ---------------------------------------------------------------------------
export function formatNaira(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}K`;
  }
  return `₦${amount.toLocaleString()}`;
}

export function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}
