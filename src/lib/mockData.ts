/**
 * Mock data to use as fallbacks when FRED API calls fail
 * This ensures the UI always has something to display
 */

// Mock GDP growth rate data (quarterly)
export const mockGdpGrowthData = [
  { date: '2023-10-01', value: 3.4 },
  { date: '2023-07-01', value: 4.9 },
  { date: '2023-04-01', value: 2.1 },
  { date: '2023-01-01', value: 2.2 },
  { date: '2022-10-01', value: 3.2 },
  { date: '2022-07-01', value: -0.6 },
  { date: '2022-04-01', value: -1.6 },
  { date: '2022-01-01', value: -1.5 },
  { date: '2021-10-01', value: 7.0 },
  { date: '2021-07-01', value: 2.7 },
  { date: '2021-04-01', value: 6.7 },
  { date: '2021-01-01', value: 6.3 }
];

// Mock GDP level data (quarterly, billions of dollars)
export const mockGdpLevelData = [
  { date: '2023-10-01', value: 27620 },
  { date: '2023-07-01', value: 27350 },
  { date: '2023-04-01', value: 26990 },
  { date: '2023-01-01', value: 26630 },
  { date: '2022-10-01', value: 26140 },
  { date: '2022-07-01', value: 25730 },
  { date: '2022-04-01', value: 25250 },
  { date: '2022-01-01', value: 24740 },
  { date: '2021-10-01', value: 24350 },
  { date: '2021-07-01', value: 23810 },
  { date: '2021-04-01', value: 23450 },
  { date: '2021-01-01', value: 22740 }
];

// Mock inflation data (monthly)
export const mockCpiData = [
  { date: '2024-04-01', value: 3.4 },
  { date: '2024-03-01', value: 3.5 },
  { date: '2024-02-01', value: 3.2 },
  { date: '2024-01-01', value: 3.1 },
  { date: '2023-12-01', value: 3.4 },
  { date: '2023-11-01', value: 3.1 },
  { date: '2023-10-01', value: 3.2 },
  { date: '2023-09-01', value: 3.7 },
  { date: '2023-08-01', value: 3.6 },
  { date: '2023-07-01', value: 3.2 },
  { date: '2023-06-01', value: 3.0 },
  { date: '2023-05-01', value: 4.0 }
];

// Mock core inflation data (monthly)
export const mockCoreCpiData = [
  { date: '2024-04-01', value: 3.6 },
  { date: '2024-03-01', value: 3.8 },
  { date: '2024-02-01', value: 3.8 },
  { date: '2024-01-01', value: 3.9 },
  { date: '2023-12-01', value: 3.9 },
  { date: '2023-11-01', value: 4.0 },
  { date: '2023-10-01', value: 4.1 },
  { date: '2023-09-01', value: 4.1 },
  { date: '2023-08-01', value: 4.3 },
  { date: '2023-07-01', value: 4.7 },
  { date: '2023-06-01', value: 4.8 },
  { date: '2023-05-01', value: 5.3 }
];

// Mock PCE inflation data (monthly)
export const mockPceData = [
  { date: '2024-03-01', value: 2.7 },
  { date: '2024-02-01', value: 2.5 },
  { date: '2024-01-01', value: 2.4 },
  { date: '2023-12-01', value: 2.6 },
  { date: '2023-11-01', value: 2.6 },
  { date: '2023-10-01', value: 2.8 },
  { date: '2023-09-01', value: 3.4 },
  { date: '2023-08-01', value: 3.4 },
  { date: '2023-07-01', value: 3.3 },
  { date: '2023-06-01', value: 3.0 },
  { date: '2023-05-01', value: 3.8 },
  { date: '2023-04-01', value: 4.3 }
];

// Mock federal funds rate data (daily)
export const mockFedFundsData = [
  { date: '2024-05-10', value: 5.33 },
  { date: '2024-04-10', value: 5.33 },
  { date: '2024-03-10', value: 5.33 },
  { date: '2024-02-10', value: 5.33 },
  { date: '2024-01-10', value: 5.33 },
  { date: '2023-12-10', value: 5.33 },
  { date: '2023-11-10', value: 5.33 },
  { date: '2023-10-10', value: 5.33 },
  { date: '2023-09-10', value: 5.33 },
  { date: '2023-08-10', value: 5.33 },
  { date: '2023-07-10', value: 5.08 },
  { date: '2023-06-10', value: 5.08 },
  { date: '2023-05-10', value: 5.08 },
  { date: '2023-04-10', value: 4.83 },
  { date: '2023-03-10', value: 4.58 }
];

// Mock 10-year Treasury yield data (daily)
export const mockTreasuryData = [
  { date: '2024-05-10', value: 4.50 },
  { date: '2024-04-10', value: 4.58 },
  { date: '2024-03-10', value: 4.20 },
  { date: '2024-02-10', value: 4.18 },
  { date: '2024-01-10', value: 4.05 },
  { date: '2023-12-10', value: 4.21 },
  { date: '2023-11-10', value: 4.63 },
  { date: '2023-10-10', value: 4.80 },
  { date: '2023-09-10', value: 4.22 },
  { date: '2023-08-10', value: 4.25 },
  { date: '2023-07-10', value: 3.96 },
  { date: '2023-06-10', value: 3.74 },
  { date: '2023-05-10', value: 3.45 },
  { date: '2023-04-10', value: 3.42 },
  { date: '2023-03-10', value: 3.90 }
];

// Mock unemployment rate data (monthly)
export const mockUnemploymentData = [
  { date: '2024-04-01', value: 3.9 },
  { date: '2024-03-01', value: 3.8 },
  { date: '2024-02-01', value: 3.9 },
  { date: '2024-01-01', value: 3.7 },
  { date: '2023-12-01', value: 3.7 },
  { date: '2023-11-01', value: 3.7 },
  { date: '2023-10-01', value: 3.9 },
  { date: '2023-09-01', value: 3.8 },
  { date: '2023-08-01', value: 3.8 },
  { date: '2023-07-01', value: 3.5 },
  { date: '2023-06-01', value: 3.6 },
  { date: '2023-05-01', value: 3.7 }
];

// Mock nonfarm payroll data (monthly, change in thousands)
export const mockNonfarmPayrollData = [
  { date: '2024-04-01', value: 175 },
  { date: '2024-03-01', value: 315 },
  { date: '2024-02-01', value: 275 },
  { date: '2024-01-01', value: 353 },
  { date: '2023-12-01', value: 216 },
  { date: '2023-11-01', value: 173 },
  { date: '2023-10-01', value: 105 },
  { date: '2023-09-01', value: 336 },
  { date: '2023-08-01', value: 227 },
  { date: '2023-07-01', value: 236 },
  { date: '2023-06-01', value: 179 },
  { date: '2023-05-01', value: 281 }
]; 