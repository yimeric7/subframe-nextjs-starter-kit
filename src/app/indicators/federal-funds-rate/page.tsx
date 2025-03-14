'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconWithBackground } from '../../../ui/components/IconWithBackground';
import { Button } from '../../../ui/components/Button';
import * as SubframeCore from "@subframe/core";
import { Breadcrumbs } from '../../../ui/components/Breadcrumbs';
import TimeSeriesChart from '../../../ui/components/TimeSeriesChart';
import { ToggleGroup } from '../../../ui/components/ToggleGroup';
import { Card } from '../../../ui/components/Card';
import { Table } from '../../../ui/components/Table';
import { Badge } from '../../../ui/components/Badge';
import { getSeriesObservations, getLatestValue, formatTimeSeriesData, FRED_SERIES } from '../../../lib/fredApi';
import { getStartDateFromRange, getCurrentDate, TimeRange, formatDateForDisplay } from '../../../lib/timeRangeUtils';
import { mockFedFundsData, mockTreasuryData } from '../../../lib/mockData';

export default function FederalFundsRate() {
  const [timeRange, setTimeRange] = useState<TimeRange>('5Y');
  const [fedFundsData, setFedFundsData] = useState<{date: string; value: number}[]>([]);
  const [treasuryData, setTreasuryData] = useState<{date: string; value: number}[]>([]);
  const [latestRate, setLatestRate] = useState<{date: string; value: string}>({date: '', value: ''});
  const [isLoading, setIsLoading] = useState(true);
  const [recentRates, setRecentRates] = useState<{date: string; value: string}[]>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Get federal funds effective rate data
        const fedFundsObservations = await getSeriesObservations(FRED_SERIES.DFF, {
          startDate: getStartDateFromRange(timeRange),
          endDate: getCurrentDate(),
          sortOrder: 'asc'
        });
        
        // Get 10-year Treasury yield data for comparison
        const treasuryObservations = await getSeriesObservations(FRED_SERIES.DGS10, {
          startDate: getStartDateFromRange(timeRange),
          endDate: getCurrentDate(),
          sortOrder: 'asc'
        });
        
        // Get latest value and recent history for the table
        const latestObservation = await getLatestValue(FRED_SERIES.DFF);
        const recentObservations = await getSeriesObservations(FRED_SERIES.DFF, {
          limit: 10,
          sortOrder: 'desc'
        });
        
        // Use the fetched data if available, otherwise fall back to mock data
        const formattedFedFundsData = formatTimeSeriesData(fedFundsObservations);
        const formattedTreasuryData = formatTimeSeriesData(treasuryObservations);
        
        setFedFundsData(formattedFedFundsData.length > 0 ? formattedFedFundsData : mockFedFundsData);
        setTreasuryData(formattedTreasuryData.length > 0 ? formattedTreasuryData : mockTreasuryData);
        
        // Only use mock data if we absolutely need to
        if (recentObservations.length > 0) {
          setLatestRate(latestObservation);
          setRecentRates(recentObservations.slice(0, 5));
        } else {
          console.warn('Using mock data for latest rates');
          setLatestRate({ date: mockFedFundsData[0].date, value: mockFedFundsData[0].value.toString() });
          setRecentRates(mockFedFundsData.slice(0, 5).map(item => ({ 
            date: item.date, 
            value: item.value.toString() 
          })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fall back to mock data
        console.warn('Falling back to mock data due to error');
        setFedFundsData(mockFedFundsData);
        setTreasuryData(mockTreasuryData);
        setLatestRate({ date: mockFedFundsData[0].date, value: mockFedFundsData[0].value.toString() });
        setRecentRates(mockFedFundsData.slice(0, 5).map(item => ({ 
          date: item.date, 
          value: item.value.toString() 
        })));
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [timeRange]);

  // Calculate target range (typically ±0.25% around effective rate)
  const lowerTarget = parseFloat(latestRate.value) - 0.25;
  const upperTarget = parseFloat(latestRate.value) + 0.25;
  
  // Format for display
  const targetRangeDisplay = `${Math.max(0, lowerTarget).toFixed(2)}% - ${upperTarget.toFixed(2)}%`;
  
  return (
    <div className="flex flex-col items-start gap-8 py-6">
      <div className="flex w-full items-start">
        <Breadcrumbs>
          <Link href="/monetary-policy">
            <Breadcrumbs.Item>Monetary Policy</Breadcrumbs.Item>
          </Link>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active={true}>Federal Funds Rate</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      
      <div className="flex w-full flex-col items-start gap-6 rounded-lg border border-neutral-200 bg-white p-6">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-1 font-heading-1 text-default-font">
              Federal Funds Rate
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              The interest rate at which depository institutions lend reserve balances to other depository institutions overnight
            </span>
          </div>
          
          <div className="flex w-full flex-wrap gap-4">
            <Card className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2">
                <IconWithBackground
                  icon="FeatherPercent"
                  variant="brand"
                  size="large"
                />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Current Effective Rate
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-heading-3 font-heading-3 text-brand-700">
                      {isLoading ? '...' : `${parseFloat(latestRate.value).toFixed(2)}%`}
                    </span>
                    {!isLoading && (
                      <span className="text-caption font-caption text-neutral-500">
                        as of {formatDateForDisplay(latestRate.date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2">
                <IconWithBackground
                  icon="FeatherTrendingUp"
                  variant="success"
                  size="large"
                />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Target Range
                  </span>
                  <span className="text-heading-3 font-heading-3 text-success-700">
                    {isLoading ? '...' : targetRangeDisplay}
                  </span>
                </div>
              </div>
            </Card>
            
            <Card className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2">
                <IconWithBackground
                  icon="FeatherCalendar"
                  variant="warning"
                  size="large"
                />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Next FOMC Meeting
                  </span>
                  <span className="text-heading-3 font-heading-3 text-warning-700">
                    Jun 11-12, 2024
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-heading-2 font-heading-2 text-default-font">Historical Rates</h2>
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
                data={fedFundsData}
                title="Federal Funds Effective Rate"
                subtitle="Daily rate at which banks lend to each other overnight"
                height={300}
                lineColor="var(--color-brand-600)"
                valueFormatter={(value) => `${value.toFixed(2)}%`}
                dateFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                timeRange={timeRange}
              />
              
              <TimeSeriesChart 
                data={treasuryData}
                title="10-Year Treasury Yield vs Federal Funds Rate"
                subtitle="Comparison between short-term and long-term rates"
                height={300}
                lineColor="var(--color-success-600)"
                valueFormatter={(value) => `${value.toFixed(2)}%`}
                dateFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                timeRange={timeRange}
              />
            </div>
          )}
        </div>
        
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Recent Rate History
            </span>
          </div>
          
          <Table 
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Rate</Table.HeaderCell>
                <Table.HeaderCell>Change</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            {recentRates.map((rate, index) => {
              const prevRate = index < recentRates.length - 1 ? parseFloat(recentRates[index + 1].value) : null;
              const currentRate = parseFloat(rate.value);
              const change = prevRate !== null ? currentRate - prevRate : 0;
              
              return (
                <Table.Row key={rate.date}>
                  <Table.Cell>
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                      {formatDateForDisplay(rate.date)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="whitespace-nowrap text-body font-body text-neutral-500">
                      {currentRate.toFixed(2)}%
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={`whitespace-nowrap text-body font-body ${
                      change > 0 ? 'text-success-600' : change < 0 ? 'text-error-600' : 'text-neutral-500'
                    }`}>
                      {change === 0 ? 'No Change' : change > 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge 
                      variant={change > 0 ? 'success' : change < 0 ? 'error' : 'neutral'}
                    >
                      {change > 0 ? 'Increase' : change < 0 ? 'Decrease' : 'Stable'}
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
              The federal funds rate is the interest rate at which depository institutions trade federal funds (balances held at Federal Reserve Banks) with each other overnight. When a depository institution has surplus balances in its reserve account, it lends to other banks in need of larger balances. The rate that the borrowing institution pays to the lending institution is determined between the two banks; the weighted average rate for all of these types of negotiations is called the effective federal funds rate.
            </span>
          </div>
        </div>
        
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Recent FOMC Decisions
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              The Federal Open Market Committee (FOMC) meets eight times a year to determine the federal funds target rate. The current target range is 5.25% to 5.50%, which was set at the July 2023 meeting and has remained unchanged in subsequent meetings.
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-neutral-200 bg-white p-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-body-bold font-body-bold text-default-font">
                May 1, 2024
              </span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-caption font-caption text-neutral-700">
                FOMC Meeting
              </span>
            </div>
            <span className="text-body font-body text-neutral-600">
              The FOMC maintained the target range for the federal funds rate at 5.25% to 5.50%. The Committee stated that inflation remains elevated and noted that it does not expect it will be appropriate to reduce the target range until it has gained greater confidence that inflation is moving sustainably toward 2%.
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-neutral-200 bg-white p-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-body-bold font-body-bold text-default-font">
                March 20, 2024
              </span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-caption font-caption text-neutral-700">
                FOMC Meeting
              </span>
            </div>
            <span className="text-body font-body text-neutral-600">
              The FOMC maintained the target range for the federal funds rate at 5.25% to 5.50%. The Committee noted that inflation has eased over the past year but remains elevated, and that the economic outlook is uncertain.
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-neutral-200 bg-white p-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-body-bold font-body-bold text-default-font">
                January 31, 2024
              </span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-caption font-caption text-neutral-700">
                FOMC Meeting
              </span>
            </div>
            <span className="text-body font-body text-neutral-600">
              The FOMC maintained the target range for the federal funds rate at 5.25% to 5.50%. The Committee stated that it does not expect it will be appropriate to reduce the target range until it has gained greater confidence that inflation is moving sustainably toward 2%.
            </span>
          </div>
        </div>
        
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Impact on Economy
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              Changes in the federal funds rate influence other interest rates, including those for mortgages, auto loans, and credit cards. When the federal funds rate increases, borrowing becomes more expensive, which can slow economic growth and help control inflation. Conversely, when the rate decreases, borrowing becomes cheaper, which can stimulate economic growth.
            </span>
          </div>
        </div>
        
        <div className="flex w-full items-center justify-center gap-2">
          <Button 
            variant="neutral-secondary"
            onClick={() => window.open(`https://fred.stlouisfed.org/series/${FRED_SERIES.DFF}/downloaddata`, '_blank')}
          >
            <SubframeCore.Icon name="FeatherDownload" />
            Download Data
          </Button>
          <Button
            onClick={() => window.open(`https://fred.stlouisfed.org/series/${FRED_SERIES.DFF}`, '_blank')}
          >
            <SubframeCore.Icon name="FeatherExternalLink" />
            View on FRED
          </Button>
        </div>
      </div>
    </div>
  );
} 