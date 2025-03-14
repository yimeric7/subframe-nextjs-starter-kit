'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '../../../ui/components/Breadcrumbs';
import { Card } from '../../../ui/components/Card';
import { IconWithBackground } from '../../../ui/components/IconWithBackground';
import { Button } from '../../../ui/components/Button';
import { Badge } from '../../../ui/components/Badge';
import { Table } from '../../../ui/components/Table';
import * as SubframeCore from "@subframe/core";
import TimeSeriesChart from '../../../ui/components/TimeSeriesChart';
import { ToggleGroup } from '../../../ui/components/ToggleGroup';
import { getSeriesObservations, getLatestValue, formatTimeSeriesData, FRED_SERIES } from '../../../lib/fredApi';
import { getStartDateFromRange, getCurrentDate, TimeRange, formatDateForDisplay } from '../../../lib/timeRangeUtils';
import { mockCpiData, mockCoreCpiData, mockPceData } from '../../../lib/mockData';

export default function InflationRate() {
  const [timeRange, setTimeRange] = useState<TimeRange>('5Y');
  const [cpiData, setCpiData] = useState<{date: string; value: number}[]>([]);
  const [coreCpiData, setCoreCpiData] = useState<{date: string; value: number}[]>([]);
  const [pceData, setPceData] = useState<{date: string; value: number}[]>([]);
  const [latestCpi, setLatestCpi] = useState<{date: string; value: string}>({date: '', value: ''});
  const [latestCoreCpi, setLatestCoreCpi] = useState<{date: string; value: string}>({date: '', value: ''});
  const [latestPce, setLatestPce] = useState<{date: string; value: string}>({date: '', value: ''});
  const [recentCpiData, setRecentCpiData] = useState<{date: string; value: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Get CPI data (year-over-year percent change)
        const cpiObservations = await getSeriesObservations(FRED_SERIES.CPIAUCSL, {
          startDate: getStartDateFromRange(timeRange),
          endDate: getCurrentDate(),
          sortOrder: 'asc',
          units: 'pc1' // Year-over-year percent change
        });
        
        // Get Core CPI data (excluding food and energy)
        const coreCpiObservations = await getSeriesObservations(FRED_SERIES.CPILFESL, {
          startDate: getStartDateFromRange(timeRange),
          endDate: getCurrentDate(),
          sortOrder: 'asc',
          units: 'pc1' // Year-over-year percent change
        });
        
        // Get PCE price index data (Fed's preferred inflation measure)
        const pceObservations = await getSeriesObservations(FRED_SERIES.PCEPI, {
          startDate: getStartDateFromRange(timeRange),
          endDate: getCurrentDate(),
          sortOrder: 'asc',
          units: 'pc1' // Year-over-year percent change
        });
        
        // Get recent CPI history for the table
        const recentCpiObs = await getSeriesObservations(FRED_SERIES.CPIAUCSL, {
          limit: 12,
          sortOrder: 'desc',
          units: 'pc1' // Year-over-year percent change
        });
        
        // Use the fetched data if available, otherwise fall back to mock data
        const formattedCpiData = formatTimeSeriesData(cpiObservations);
        const formattedCoreCpiData = formatTimeSeriesData(coreCpiObservations);
        const formattedPceData = formatTimeSeriesData(pceObservations);
        
        setCpiData(formattedCpiData.length > 0 ? formattedCpiData : mockCpiData);
        setCoreCpiData(formattedCoreCpiData.length > 0 ? formattedCoreCpiData : mockCoreCpiData);
        setPceData(formattedPceData.length > 0 ? formattedPceData : mockPceData);
        
        // Get latest values with year-over-year percent change
        try {
          const latestCpiPc1 = await getSeriesObservations(FRED_SERIES.CPIAUCSL, {
            limit: 1,
            sortOrder: 'desc',
            units: 'pc1'
          });
          
          const latestCoreCpiPc1 = await getSeriesObservations(FRED_SERIES.CPILFESL, {
            limit: 1,
            sortOrder: 'desc',
            units: 'pc1'
          });
          
          const latestPcePc1 = await getSeriesObservations(FRED_SERIES.PCEPI, {
            limit: 1,
            sortOrder: 'desc',
            units: 'pc1'
          });
          
          if (latestCpiPc1.length > 0 && latestCoreCpiPc1.length > 0 && latestPcePc1.length > 0) {
            setLatestCpi(latestCpiPc1[0]);
            setLatestCoreCpi(latestCoreCpiPc1[0]);
            setLatestPce(latestPcePc1[0]);
          } else {
            // Fall back to mock data for latest values
            setLatestCpi({ date: mockCpiData[0].date, value: mockCpiData[0].value.toString() });
            setLatestCoreCpi({ date: mockCoreCpiData[0].date, value: mockCoreCpiData[0].value.toString() });
            setLatestPce({ date: mockPceData[0].date, value: mockPceData[0].value.toString() });
          }
        } catch (error) {
          console.error('Error fetching latest values:', error);
          // Fall back to mock data for latest values
          setLatestCpi({ date: mockCpiData[0].date, value: mockCpiData[0].value.toString() });
          setLatestCoreCpi({ date: mockCoreCpiData[0].date, value: mockCoreCpiData[0].value.toString() });
          setLatestPce({ date: mockPceData[0].date, value: mockPceData[0].value.toString() });
        }
        
        // Set recent CPI data for the table
        if (recentCpiObs.length > 0) {
          setRecentCpiData(recentCpiObs.slice(0, 6));
        } else {
          setRecentCpiData(mockCpiData.slice(0, 6).map(item => ({
            date: item.date,
            value: item.value.toString()
          })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fall back to mock data
        console.warn('Falling back to mock data due to error');
        setCpiData(mockCpiData);
        setCoreCpiData(mockCoreCpiData);
        setPceData(mockPceData);
        setLatestCpi({ date: mockCpiData[0].date, value: mockCpiData[0].value.toString() });
        setLatestCoreCpi({ date: mockCoreCpiData[0].date, value: mockCoreCpiData[0].value.toString() });
        setLatestPce({ date: mockPceData[0].date, value: mockPceData[0].value.toString() });
        setRecentCpiData(mockCpiData.slice(0, 6).map(item => ({
          date: item.date,
          value: item.value.toString()
        })));
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [timeRange]);

  // Calculate monthly change
  const getMonthlyChange = (current: string, previous: string) => {
    const currentValue = parseFloat(current);
    const previousValue = parseFloat(previous);
    return (currentValue - previousValue).toFixed(1);
  };

  // Format date for display (e.g., "Jan 2023")
  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Helper to determine if inflation is above target
  const isAboveTarget = (rate: number) => rate > 2.0;

  return (
    <div className="flex flex-col items-start gap-8 py-6">
      <div className="flex w-full items-start">
        <Breadcrumbs>
          <Link href="/monetary-policy">
            <Breadcrumbs.Item>Monetary Policy</Breadcrumbs.Item>
          </Link>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active={true}>Inflation Rate</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      
      <div className="flex w-full flex-col items-start gap-6 rounded-lg border border-neutral-200 bg-white p-6">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-1 font-heading-1 text-default-font">
              Inflation Rate
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              The rate at which the general level of prices for goods and services is rising
            </span>
          </div>
        </div>
        
        <div className="flex w-full flex-wrap gap-4">
          <Card className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <IconWithBackground
                icon="FeatherTrendingUp"
                variant={parseFloat(latestCpi.value) > 3 ? "error" : parseFloat(latestCpi.value) > 2 ? "warning" : "success"}
                size="large"
              />
              <div className="flex flex-col">
                <span className="text-body-bold font-body-bold text-neutral-700">
                  CPI Inflation
                </span>
                <span className="text-caption font-caption text-neutral-500">
                  Consumer Price Index (YoY)
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                {isLoading ? '...' : `${parseFloat(latestCpi.value).toFixed(1)}%`}
              </span>
              {!isLoading && recentCpiData.length > 1 && (
                <span className={`text-body-bold font-body-bold ${
                  parseFloat(getMonthlyChange(recentCpiData[0].value, recentCpiData[1].value)) > 0 
                    ? 'text-error-600' 
                    : 'text-success-600'
                }`}>
                  {parseFloat(getMonthlyChange(recentCpiData[0].value, recentCpiData[1].value)) > 0 
                    ? `+${getMonthlyChange(recentCpiData[0].value, recentCpiData[1].value)}` 
                    : getMonthlyChange(recentCpiData[0].value, recentCpiData[1].value)
                  }
                </span>
              )}
            </div>
            {!isLoading && (
              <span className="text-caption font-caption text-neutral-500 block mt-1">
                as of {formatMonthYear(latestCpi.date)}
              </span>
            )}
          </Card>
          
          <Card className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <IconWithBackground
                icon="FeatherActivity"
                variant={parseFloat(latestCoreCpi.value) > 3 ? "error" : parseFloat(latestCoreCpi.value) > 2 ? "warning" : "success"}
                size="large"
              />
              <div className="flex flex-col">
                <span className="text-body-bold font-body-bold text-neutral-700">
                  Core CPI
                </span>
                <span className="text-caption font-caption text-neutral-500">
                  Excluding Food & Energy
                </span>
              </div>
            </div>
            <span className="text-heading-2 font-heading-2 text-default-font">
              {isLoading ? '...' : `${parseFloat(latestCoreCpi.value).toFixed(1)}%`}
            </span>
            {!isLoading && (
              <span className="text-caption font-caption text-neutral-500 block mt-1">
                as of {formatMonthYear(latestCoreCpi.date)}
              </span>
            )}
          </Card>
          
          <Card className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <IconWithBackground
                icon="FeatherDollarSign"
                variant={parseFloat(latestPce.value) > 3 ? "error" : parseFloat(latestPce.value) > 2 ? "warning" : "success"}
                size="large"
              />
              <div className="flex flex-col">
                <span className="text-body-bold font-body-bold text-neutral-700">
                  PCE Price Index
                </span>
                <span className="text-caption font-caption text-neutral-500">
                  Fed's Preferred Measure
                </span>
              </div>
            </div>
            <span className="text-heading-2 font-heading-2 text-default-font">
              {isLoading ? '...' : `${parseFloat(latestPce.value).toFixed(1)}%`}
            </span>
            {!isLoading && (
              <div className="flex items-center mt-1">
                <span className="text-caption font-caption text-neutral-500">
                  as of {formatMonthYear(latestPce.date)}
                </span>
                <Badge 
                  className="ml-2" 
                  variant={isAboveTarget(parseFloat(latestPce.value)) ? "warning" : "success"}
                >
                  {isAboveTarget(parseFloat(latestPce.value)) 
                    ? "Above Target" 
                    : "At Target"}
                </Badge>
              </div>
            )}
          </Card>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-heading-2 font-heading-2 text-default-font">Inflation Trends</h2>
            <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value as TimeRange)}>
              <ToggleGroup.Item value="1Y">1Y</ToggleGroup.Item>
              <ToggleGroup.Item value="5Y">5Y</ToggleGroup.Item>
              <ToggleGroup.Item value="10Y">10Y</ToggleGroup.Item>
              <ToggleGroup.Item value="MAX">MAX</ToggleGroup.Item>
            </ToggleGroup>
          </div>

          {isLoading ? (
            <div className="h-[300px] w-full flex items-center justify-center bg-neutral-50 rounded-md">
              <SubframeCore.Icon name="FeatherLoader" className="animate-spin text-neutral-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <TimeSeriesChart 
                data={cpiData}
                title="Consumer Price Index (CPI)"
                subtitle="Year-over-year percent change"
                height={300}
                lineColor="var(--color-brand-600)"
                valueFormatter={(value) => `${value.toFixed(1)}%`}
                dateFormatter={(date) => formatMonthYear(date)}
                timeRange={timeRange}
              />
              
              <TimeSeriesChart 
                data={[
                  ...coreCpiData.map(d => ({...d, series: 'Core CPI'})),
                  ...pceData.map(d => ({...d, series: 'PCE Price Index'}))
                ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
                title="Core CPI vs PCE Price Index"
                subtitle="Year-over-year percent change - Fed's target is 2%"
                height={300}
                lineColor="var(--color-success-600)"
                valueFormatter={(value) => `${value.toFixed(1)}%`}
                dateFormatter={(date) => formatMonthYear(date)}
                timeRange={timeRange}
              />
            </div>
          )}
        </div>
        
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Recent CPI History
            </span>
          </div>
          
          <Table 
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>Month</Table.HeaderCell>
                <Table.HeaderCell>CPI (YoY)</Table.HeaderCell>
                <Table.HeaderCell>Change</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            {recentCpiData.map((item, index) => {
              const prevValue = index < recentCpiData.length - 1 ? parseFloat(recentCpiData[index + 1].value) : null;
              const currentValue = parseFloat(item.value);
              const change = prevValue !== null ? currentValue - prevValue : 0;
              
              return (
                <Table.Row key={item.date}>
                  <Table.Cell>
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                      {formatMonthYear(item.date)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="whitespace-nowrap text-body font-body text-neutral-500">
                      {currentValue.toFixed(1)}%
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={`whitespace-nowrap text-body font-body ${
                      change > 0 ? 'text-error-600' : change < 0 ? 'text-success-600' : 'text-neutral-500'
                    }`}>
                      {change === 0 ? 'No Change' : change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge 
                      variant={
                        currentValue <= 2.0 ? 'success' : 
                        currentValue <= 3.0 ? 'warning' : 
                        'error'
                      }
                    >
                      {currentValue <= 2.0 ? 'Target' : 
                       currentValue <= 3.0 ? 'Above Target' : 
                       'High Inflation'}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table>
        </div>
        
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Overview
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              Inflation measures the rate at which the general level of prices for goods and services rises, causing purchasing power to fall. The most common measure in the U.S. is the Consumer Price Index (CPI), which tracks the price changes for a basket of goods and services commonly purchased by households.
            </span>
          </div>
        </div>
        
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Key Inflation Measures
            </span>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  Consumer Price Index (CPI)
                </span>
                <span className="text-body font-body text-subtext-color">
                  The CPI measures the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services. The CPI is the most widely cited inflation indicator and is used to adjust Social Security payments and many private contracts for inflation.
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  Core CPI
                </span>
                <span className="text-body font-body text-subtext-color">
                  Core CPI excludes food and energy prices, which tend to be more volatile. This measure provides a clearer picture of underlying inflation trends and is closely watched by policymakers.
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  Personal Consumption Expenditures (PCE) Price Index
                </span>
                <span className="text-body font-body text-subtext-color">
                  The PCE Price Index is the Federal Reserve's preferred inflation gauge when setting monetary policy. It measures price changes for all domestic personal consumption, has a broader scope than CPI, and accounts for substitution between goods when prices change.
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Fed Policy and Inflation
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              The Federal Reserve aims to achieve an average inflation rate of 2% over time. When inflation rises above this target, the Fed typically responds by raising interest rates to cool the economy. Conversely, when inflation falls below target, the Fed may lower rates to stimulate economic activity.
            </span>
            <span className="w-full text-body font-body text-subtext-color mt-2">
              Following the COVID-19 pandemic and associated economic disruptions, inflation rose significantly above the Fed's 2% target, leading to an aggressive cycle of interest rate hikes. The Federal Reserve has maintained a restrictive monetary policy stance as it works to bring inflation back to target.
            </span>
          </div>
        </div>
        
        <div className="flex w-full items-center justify-center gap-2 mt-4">
          <Button 
            variant="neutral-secondary"
            onClick={() => window.open(`https://fred.stlouisfed.org/series/${FRED_SERIES.CPIAUCSL}/downloaddata`, '_blank')}
          >
            <SubframeCore.Icon name="FeatherDownload" />
            Download Data
          </Button>
          <Button
            onClick={() => window.open(`https://fred.stlouisfed.org/series/${FRED_SERIES.CPIAUCSL}`, '_blank')}
          >
            <SubframeCore.Icon name="FeatherExternalLink" />
            View on FRED
          </Button>
        </div>
      </div>
    </div>
  );
} 