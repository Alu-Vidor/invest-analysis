/**
 * Real-world data for Practice 1 screens.
 * Includes data from Russia, Japan, and China.
 */

// Screen 1: Russian OFZ 26238
export const ofz26238 = {
  securityId: 'RU000A1038V6',
  title: 'ОФЗ 26238 (до 2041 г.)',
  faceValueRub: 1000,
  couponPct: 7.1,
  semiAnnualCouponRub: 35.4,
  currentPricePct: 61.1,
  currentPriceRub: 611,
  yieldToMaturityPct: 13.5,
}

export const ofz26238Schedule = [
  { period: 1, date: '2024-06-05', couponRub: 35.4, principalRub: 0, cashFlowRub: 35.4 },
  { period: 2, date: '2024-12-04', couponRub: 35.4, principalRub: 0, cashFlowRub: 35.4 },
  { period: 3, date: '2025-06-04', couponRub: 35.4, principalRub: 0, cashFlowRub: 35.4 },
  { period: 4, date: '2025-12-03', couponRub: 35.4, principalRub: 0, cashFlowRub: 35.4 },
  { period: 5, date: '2026-06-03', couponRub: 35.4, principalRub: 0, cashFlowRub: 35.4 },
  { period: 6, date: '2026-12-02', couponRub: 35.4, principalRub: 0, cashFlowRub: 35.4 },
  { period: 7, date: '2027-06-02', couponRub: 35.4, principalRub: 0, cashFlowRub: 35.4 },
  { period: 8, date: '2027-12-01', couponRub: 35.4, principalRub: 1000, cashFlowRub: 1035.4 },
]

// Screen 2: Nikkei 225 Volatility (Aug 2024)
export const nikkeiVolatilityAug2024 = [
  { date: '01 Aug', close: 38126.33, volume: 1.8e9 },
  { date: '02 Aug', close: 35909.70, volume: 2.5e9 },
  { date: '05 Aug', close: 31458.42, volume: 3.2e9, event: 'Black Monday (-12.4%)' },
  { date: '06 Aug', close: 34675.46, volume: 3.8e9, event: 'Record Rebound (+10.2%)' },
  { date: '07 Aug', close: 35089.62, volume: 2.8e9 },
  { date: '08 Aug', close: 34831.22, volume: 2.1e9 },
  { date: '09 Aug', close: 35025.00, volume: 1.9e9 },
]

// Screen 3: Tencent Revenue Segments (Q3 2024)
export const tencentSegmentsQ32024 = [
  { segment: 'Value-Added Services (VAS)', revenueBillionCny: 82.7, share: 0.49 },
  { segment: 'FinTech & Business Services', revenueBillionCny: 53.1, share: 0.32 },
  { segment: 'Marketing Services', revenueBillionCny: 30.0, share: 0.18 },
  { segment: 'Others', revenueBillionCny: 1.4, share: 0.01 },
]

// For the trend chart in screen 3 (simulated quarterly trend based on real ratios)
export const tencentTrend = [
  { quarter: 'Q4 23', total: 155.2, vas: 75.7, shares: 0.487 },
  { quarter: 'Q1 24', total: 159.5, vas: 78.6, shares: 0.493 },
  { quarter: 'Q2 24', total: 161.1, vas: 78.8, shares: 0.489 },
  { quarter: 'Q3 24', total: 167.2, vas: 82.7, shares: 0.494 },
]

// Screen 4: SSE Composite Stimulus Rally (Sep 2024)
export const sseStimulusRallySep2024 = [
  { date: '18 Sep', close: 2717.28, volume: 450e6 },
  { date: '19 Sep', close: 2736.02, volume: 480e6 },
  { date: '20 Sep', close: 2745.62, volume: 500e6 },
  { date: '23 Sep', close: 2748.92, volume: 520e6 },
  { date: '24 Sep', close: 2863.13, volume: 950e6, event: 'Stimulus Package' },
  { date: '25 Sep', close: 2896.31, volume: 1100e6 },
  { date: '26 Sep', close: 3000.95, volume: 1500e6 },
  { date: '27 Sep', close: 3087.53, volume: 1600e6, event: '+2.88% rally' },
  { date: '30 Sep', close: 3336.50, volume: 2500e6, event: 'Golden Week Eve' },
]

export const sseSeries = sseStimulusRallySep2024

// Screen 5: MOEX Russia Index (2024-2025)
export const moexIndex2024 = [
  { date: 'Jan 24', close: 3100 },
  { date: 'Mar 24', close: 3300 },
  { date: 'May 24', close: 3450 },
  { date: 'Jul 24', close: 3000 },
  { date: 'Sep 24', close: 2600 },
  { date: 'Nov 24', close: 2550 },
  { date: 'Jan 25', close: 2700 },
  { date: 'Mar 25', close: 2850 },
]

export const moexSeries = moexIndex2024
