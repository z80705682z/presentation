export interface PhaseData {
  id: number;
  name: string;
  shortName: string;
  capacity: number; // Tons/day
  area: string; // ping
  siteType: string;
  capex: number; // NT$
  staff: number;
  dailyRevenue: number; // NT$
  monthlyRevenue: number; // NT$
  opex: number; // NT$ Monthly
  ebitda: number; // NT$ Monthly
  ebitdaYear: number; // NT$ Annual
  paybackMonths: number;
  highlight: string;
}

export interface SimParameters {
  treatmentFee: number; // NT$/ton, default 3000
  proteinPrice: number; // NT$/ton, default 45000
  frassPrice: number; // NT$/ton, default 15000
  capexMultiplier: number; // 0.8 to 1.5, default 1.0
  opexMultiplier: number; // 0.8 to 1.5, default 1.0
}

export interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}
