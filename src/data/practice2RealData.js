export const treasuryCurveJan022024 = [
  { maturityYears: 1, label: '1 год', yieldPct: 3.64 },
  { maturityYears: 2, label: '2 года', yieldPct: 3.74 },
  { maturityYears: 3, label: '3 года', yieldPct: 3.75 },
  { maturityYears: 5, label: '5 лет', yieldPct: 3.86 },
  { maturityYears: 10, label: '10 лет', yieldPct: 4.26 },
  { maturityYears: 30, label: '30 лет', yieldPct: 4.87 },
].map((row) => ({
  ...row,
  rate: row.yieldPct / 100,
  discountFactor: 1 / (1 + row.yieldPct / 100) ** row.maturityYears,
}))

export const treasuryNote2028 = {
  securityId: '91282CMF5',
  title: 'U.S. Treasury Note 4.250%, maturity 2028-01-15',
  faceValueUsd: 10_000,
  couponRate: 0.0425,
  paymentsPerYear: 2,
}

const semiannualCoupon =
  (treasuryNote2028.faceValueUsd * treasuryNote2028.couponRate) /
  treasuryNote2028.paymentsPerYear

const noteDates = [
  '2024-07-15',
  '2025-01-15',
  '2025-07-15',
  '2026-01-15',
  '2026-07-15',
  '2027-01-15',
  '2027-07-15',
  '2028-01-15',
]

export const treasuryNoteSchedule2028 = noteDates.map((date, index) => {
  const period = index + 1
  const principal =
    period === noteDates.length ? treasuryNote2028.faceValueUsd : 0

  return {
    period,
    date,
    couponUsd: semiannualCoupon,
    principalUsd: principal,
    cashFlowUsd: semiannualCoupon + principal,
  }
})

export const treasuryFiveYearProxyRateJan022024 = 0.0386
export const treasuryFiveYearSemiannualRateJan022024 =
  treasuryFiveYearProxyRateJan022024 / 2

export const treasuryNoteValuationRows2028 = treasuryNoteSchedule2028.map(
  (row, index, schedule) => {
    const periodsToMaturity = schedule.length
    const semiannualRate = treasuryFiveYearSemiannualRateJan022024
    const discountFactor = 1 / (1 + semiannualRate) ** row.period
    const presentValueUsd = row.cashFlowUsd * discountFactor
    const accumulationFactor =
      (1 + semiannualRate) ** (periodsToMaturity - row.period)
    const futureValueAtMaturityUsd = row.cashFlowUsd * accumulationFactor

    return {
      ...row,
      discountFactor,
      presentValueUsd,
      accumulationFactor,
      futureValueAtMaturityUsd,
    }
  }
)

export const treasuryNotePriceProxyUsd = treasuryNoteValuationRows2028.reduce(
  (total, row) => total + row.presentValueUsd,
  0
)

export const treasuryNoteFutureValueAtMaturityUsd =
  treasuryNoteValuationRows2028.reduce(
    (total, row) => total + row.futureValueAtMaturityUsd,
    0
  )

export const freddieMortgageRatesJan042024 = [
  { product: '30-летняя FRM', years: 30, annualRatePct: 6.11 },
  { product: '15-летняя FRM', years: 15, annualRatePct: 5.50 },
].map((row) => ({
  ...row,
  annualRate: row.annualRatePct / 100,
}))

export const mortgagePrincipalUsd = 400_000

export const mortgageBenchmarksJan042024 = freddieMortgageRatesJan042024.map(
  (row) => {
    const monthlyRate = row.annualRate / 12
    const months = row.years * 12
    const payment =
      mortgagePrincipalUsd *
      (monthlyRate / (1 - (1 + monthlyRate) ** -months))

    return {
      ...row,
      monthlyRate,
      months,
      paymentUsd: payment,
      totalPaidUsd: payment * months,
      totalInterestUsd: payment * months - mortgagePrincipalUsd,
    }
  }
)

export const interestOnlyMortgageBenchmarkJan042024 = {
  product: 'Interest-only',
  annualRatePct: 6.11,
  annualRate: 0.0611,
  months: 120,
  monthlyInterestUsd: (mortgagePrincipalUsd * 0.0611) / 12,
  balloonPaymentUsd: mortgagePrincipalUsd,
}
