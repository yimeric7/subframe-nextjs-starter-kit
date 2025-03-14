/**
 * FRED API Client
 * Using a proxy API route to avoid CORS issues and hide API key
 */

// Using a relative URL to our own API proxy
const API_PROXY_URL = '/api/fred';

export type FredObservation = {
  date: string;
  value: string;
};

export type FredSeries = {
  id: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  units: string;
  seasonal_adjustment: string;
  notes: string;
};

/**
 * Fetch a series information from FRED API via our proxy
 * @param seriesId - The FRED series ID
 */
export async function getSeriesInfo(seriesId: string): Promise<FredSeries> {
  const params = new URLSearchParams({
    endpoint: 'series',
    series_id: seriesId
  });
  
  const url = `${API_PROXY_URL}?${params.toString()}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch series info: ${response.status}`);
  }
  
  const data = await response.json();
  return data.seriess[0];
}

/**
 * Fetch series observations (data points) from FRED API via our proxy
 * @param seriesId - The FRED series ID
 * @param options - Additional options for fetching data
 */
export async function getSeriesObservations(
  seriesId: string,
  options: {
    startDate?: string;
    endDate?: string;
    frequency?: 'd' | 'w' | 'bw' | 'm' | 'q' | 'sa' | 'a';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    units?: 'lin' | 'chg' | 'ch1' | 'pch' | 'pc1' | 'pca' | 'cch' | 'cca' | 'log';
  } = {}
): Promise<FredObservation[]> {
  const { 
    startDate,
    endDate,
    frequency,
    sortOrder = 'desc',
    limit = 100,
    units = 'lin'
  } = options;
  
  const params = new URLSearchParams({
    endpoint: 'series/observations',
    series_id: seriesId,
    sort_order: sortOrder,
    limit: limit.toString(),
    units: units
  });
  
  if (startDate) {
    params.append('observation_start', startDate);
  }
  
  if (endDate) {
    params.append('observation_end', endDate);
  }
  
  if (frequency) {
    params.append('frequency', frequency);
  }
  
  const url = `${API_PROXY_URL}?${params.toString()}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch observations: ${response.status}`);
    }
    
    const data = await response.json();
    return data.observations || [];
  } catch (error) {
    console.error('Error fetching FRED data:', error);
    // Return empty array instead of throwing to prevent UI breakage
    return [];
  }
}

/**
 * Fetch latest value for a FRED series
 * @param seriesId - The FRED series ID
 */
export async function getLatestValue(seriesId: string): Promise<FredObservation> {
  try {
    const observations = await getSeriesObservations(seriesId, {
      sortOrder: 'desc',
      limit: 1
    });
    
    if (observations.length === 0) {
      // Return a default value if no observations
      return { date: new Date().toISOString().split('T')[0], value: '0' };
    }
    
    return observations[0];
  } catch (error) {
    console.error('Error fetching latest value:', error);
    // Return a default value to prevent UI breakage
    return { date: new Date().toISOString().split('T')[0], value: '0' };
  }
}

/**
 * Converts a FRED series to time series data suitable for charts
 * @param observations - Array of FRED observations
 * @param valueFormatter - Optional function to format values
 */
export function formatTimeSeriesData(
  observations: FredObservation[],
  valueFormatter?: (value: string) => number
): {date: string; value: number}[] {
  if (!observations || observations.length === 0) {
    return [];
  }
  
  return observations
    .filter(obs => obs.value !== '.')  // Filter out missing values
    .map(obs => ({
      date: obs.date,
      value: valueFormatter ? valueFormatter(obs.value) : parseFloat(obs.value)
    }))
    .filter(item => !isNaN(item.value)) // Filter out NaN values
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Common FRED Series IDs
 */
export const FRED_SERIES = {
  // GDP and Economic Growth
  GDP: 'GDP',                           // Gross Domestic Product
  GDPC1: 'GDPC1',                       // Real Gross Domestic Product
  A191RL1Q225SBEA: 'A191RL1Q225SBEA',   // Real GDP Growth Rate
  
  // Inflation
  CPIAUCSL: 'CPIAUCSL',                 // Consumer Price Index for All Urban Consumers
  CPILFESL: 'CPILFESL',                 // CPI Less Food and Energy
  PCEPI: 'PCEPI',                       // Personal Consumption Expenditures Price Index
  PCEPILFE: 'PCEPILFE',                 // PCE Less Food and Energy
  
  // Employment
  UNRATE: 'UNRATE',                     // Unemployment Rate
  PAYEMS: 'PAYEMS',                     // Nonfarm Payroll
  ICSA: 'ICSA',                         // Initial Jobless Claims
  
  // Interest Rates
  DFF: 'DFF',                           // Federal Funds Effective Rate
  DFEDTAR: 'DFEDTAR',                   // Federal Funds Target Rate (discontinued)
  DFEDTARL: 'DFEDTARL',                 // Federal Funds Target Range - Lower Limit
  DFEDTARU: 'DFEDTARU',                 // Federal Funds Target Range - Upper Limit
  DGS10: 'DGS10',                       // 10-Year Treasury Constant Maturity Rate
  
  // Money Supply
  M1SL: 'M1SL',                         // M1 Money Stock
  M2SL: 'M2SL',                         // M2 Money Stock
  
  // Balance Sheet
  WALCL: 'WALCL',                       // Federal Reserve Total Assets
  WSHOSHO: 'WSHOSHO',                   // Federal Reserve Treasury Holdings
  WMBSECL: 'WMBSECL'                    // Federal Reserve MBS Holdings
};

/**
 * Formats a number as a percentage
 * @param value - The value to format
 * @param decimalPlaces - Number of decimal places
 */
export function formatPercent(value: number, decimalPlaces = 1): string {
  return `${value.toFixed(decimalPlaces)}%`;
}

/**
 * Formats a large number in a readable way (k, M, B, T)
 * @param value - The value to format
 */
export function formatLargeNumber(value: number): string {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(1)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}k`;
  }
  return value.toString();
} 