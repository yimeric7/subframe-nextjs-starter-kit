'use client';

import { useState, useEffect } from 'react';
import { Table } from "../../../ui/components/Table";
import { Badge } from "../../../ui/components/Badge";
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { Breadcrumbs } from '../../../ui/components/Breadcrumbs';
import { Card } from '../../../ui/components/Card';
import { IconWithBackground } from '../../../ui/components/IconWithBackground';
import { Button } from '../../../ui/components/Button';
import TimeSeriesChart from '../../../ui/components/TimeSeriesChart';
import { ToggleGroup } from '../../../ui/components/ToggleGroup';
import { getSeriesObservations, getLatestValue, formatTimeSeriesData, FRED_SERIES } from '../../../lib/fredApi';
import { getStartDateFromRange, getCurrentDate, TimeRange, formatDateForDisplay } from '../../../lib/timeRangeUtils';
import { mockGdpGrowthData, mockGdpLevelData } from '../../../lib/mockData';

export function ClientGDPGrowthRate() {
  const [timeRange, setTimeRange] = useState<TimeRange>('5Y');
  const [gdpGrowthData, setGdpGrowthData] = useState<{date: string; value: number}[]>([]);
  const [gdpLevelData, setGdpLevelData] = useState<{date: string; value: number}[]>([]);
  const [latestGrowth, setLatestGrowth] = useState<{date: string; value: string}>({date: '', value: ''});
  const [previousGrowth, setPreviousGrowth] = useState<{date: string; value: string}>({date: '', value: ''});
  const [historyData, setHistoryData] = useState<{date: string; value: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Get GDP growth rate data
        const gdpGrowthObservations = await getSeriesObservations(FRED_SERIES.A191RL1Q225SBEA, {
          startDate: getStartDateFromRange(timeRange),
          endDate: getCurrentDate(),
          frequency: 'q',
          sortOrder: 'asc'
        });
        
        // Get GDP level data
        const gdpLevelObservations = await getSeriesObservations(FRED_SERIES.GDPC1, {
          startDate: getStartDateFromRange(timeRange),
          endDate: getCurrentDate(),
          frequency: 'q',
          sortOrder: 'asc'
        });
        
        // Get most recent quarterly growth data for display
        const recentGrowthObservations = await getSeriesObservations(FRED_SERIES.A191RL1Q225SBEA, {
          limit: 10,
          sortOrder: 'desc',
          frequency: 'q'
        });
        
        // Use the fetched data if available, otherwise fall back to mock data
        const formattedGdpGrowthData = formatTimeSeriesData(gdpGrowthObservations);
        const formattedGdpLevelData = formatTimeSeriesData(gdpLevelObservations);
        
        setGdpGrowthData(formattedGdpGrowthData.length > 0 ? formattedGdpGrowthData : mockGdpGrowthData);
        setGdpLevelData(formattedGdpLevelData.length > 0 ? formattedGdpLevelData : mockGdpLevelData);
        
        // Only use mock data if we absolutely need to
        if (recentGrowthObservations.length > 0) {
          setLatestGrowth(recentGrowthObservations[0]);
          if (recentGrowthObservations.length > 1) {
            setPreviousGrowth(recentGrowthObservations[1]);
          }
          setHistoryData(recentGrowthObservations.slice(0, 6));
        } else {
          console.warn('Using mock data for GDP growth history');
          setLatestGrowth({ 
            date: mockGdpGrowthData[0].date, 
            value: mockGdpGrowthData[0].value.toString() 
          });
          setPreviousGrowth({ 
            date: mockGdpGrowthData[1].date, 
            value: mockGdpGrowthData[1].value.toString() 
          });
          setHistoryData(mockGdpGrowthData.slice(0, 6).map(item => ({ 
            date: item.date, 
            value: item.value.toString() 
          })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fall back to mock data
        console.warn('Falling back to mock data due to error');
        setGdpGrowthData(mockGdpGrowthData);
        setGdpLevelData(mockGdpLevelData);
        setLatestGrowth({ 
          date: mockGdpGrowthData[0].date, 
          value: mockGdpGrowthData[0].value.toString() 
        });
        setPreviousGrowth({ 
          date: mockGdpGrowthData[1].date, 
          value: mockGdpGrowthData[1].value.toString() 
        });
        setHistoryData(mockGdpGrowthData.slice(0, 6).map(item => ({ 
          date: item.date, 
          value: item.value.toString() 
        })));
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [timeRange]);

  // Format quarter string from date (e.g., "2023-01-01" -> "Q1 2023")
  const formatQuarter = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    let quarter;
    
    if (month <= 2) quarter = 1;
    else if (month <= 5) quarter = 2;
    else if (month <= 8) quarter = 3;
    else quarter = 4;
    
    return `Q${quarter} ${year}`;
  };
  
  // Calculate year-over-year growth
  const yearOverYearGrowth = () => {
    if (historyData.length < 5) return "N/A";
    
    const currentValue = parseFloat(historyData[0].value);
    const yearAgoValue = parseFloat(historyData[4].value);
    const yoyChange = currentValue - yearAgoValue;
    
    return yoyChange >= 0 ? 
      `+${yoyChange.toFixed(1)}%` : 
      `${yoyChange.toFixed(1)}%`;
  };
  
  return (
    <div className="flex flex-col items-start gap-8 py-6">
      <div className="flex w-full items-start">
        <Breadcrumbs>
          <Link href="/economic-growth">
            <Breadcrumbs.Item>Economic Growth</Breadcrumbs.Item>
          </Link>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active={true}>GDP Growth Rate</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      
      <div className="flex w-full flex-col items-start gap-8">
        <span className="w-full text-heading-1 font-heading-1 text-default-font">
          GDP Growth Rate
        </span>
        <div className="flex w-full flex-wrap items-center gap-10">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            <div className="flex items-center gap-3">
              <span className="text-heading-2 font-heading-2 text-default-font">
                {isLoading ? 'Loading...' : formatQuarter(latestGrowth.date)}
              </span>
              <Badge variant="success">Latest Quarter</Badge>
            </div>
            <div className="flex items-end justify-center gap-2">
              <span className="font-['Inter'] text-[42px] font-[600] leading-[42px] text-brand-600">
                {isLoading ? '...' : parseFloat(latestGrowth.value).toFixed(1)}
              </span>
              <div className="flex flex-col items-end justify-center gap-2">
                <span className="text-body-bold font-body-bold text-success-600">
                  % Growth
                </span>
              </div>
            </div>
            <span className="text-body font-body text-subtext-color">
              Quarterly percent change in real gross domestic product (annualized rate)
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex w-full flex-wrap items-start gap-4">
        <Card className="flex-1 min-w-[160px]">
          <div className="flex items-center gap-2 mb-2">
            <IconWithBackground
              icon="FeatherTrendingUp"
              variant="brand"
              size="small"
            />
            <span className="text-body-bold font-body-bold text-neutral-700">
              Previous Quarter
            </span>
          </div>
          <span className="text-heading-3 font-heading-3 text-default-font">
            {isLoading ? '...' : `${parseFloat(previousGrowth.value).toFixed(1)}%`}
          </span>
          {!isLoading && (
            <span className="text-caption font-caption text-neutral-500 block mt-1">
              {formatQuarter(previousGrowth.date)}
            </span>
          )}
        </Card>
        <Card className="flex-1 min-w-[160px]">
          <div className="flex items-center gap-2 mb-2">
            <IconWithBackground
              icon="FeatherCalendar"
              variant="success"
              size="small"
            />
            <span className="text-body-bold font-body-bold text-neutral-700">
              Year-over-Year
            </span>
          </div>
          <span className="text-heading-3 font-heading-3 text-default-font">
            {isLoading ? '...' : yearOverYearGrowth()}
          </span>
          <span className="text-caption font-caption text-neutral-500 block mt-1">
            Compared to year ago
          </span>
        </Card>
        <Card className="flex-1 min-w-[160px]">
          <div className="flex items-center gap-2 mb-2">
            <IconWithBackground
              icon="FeatherActivity"
              variant="warning"
              size="small"
            />
            <span className="text-body-bold font-body-bold text-neutral-700">
              Forecast Q2 2024
            </span>
          </div>
          <span className="text-heading-3 font-heading-3 text-default-font">
            2.0-2.5%
          </span>
          <span className="text-caption font-caption text-neutral-500 block mt-1">
            Consensus forecast
          </span>
        </Card>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-heading-2 font-heading-2 text-default-font">Economic Growth Trends</h2>
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
              data={gdpGrowthData}
              title="Real GDP Growth Rate (Annualized)"
              subtitle="Percentage change from preceding quarter"
              height={300}
              lineColor="var(--color-brand-600)"
              valueFormatter={(value) => `${value.toFixed(1)}%`}
              dateFormatter={(date) => formatQuarter(date)}
              timeRange={timeRange}
            />
            
            <TimeSeriesChart 
              data={gdpLevelData}
              title="Real GDP Level"
              subtitle="Billions of chained 2017 dollars"
              height={300}
              lineColor="var(--color-success-600)"
              valueFormatter={(value) => `$${value.toFixed(0)}B`}
              dateFormatter={(date) => formatQuarter(date)}
              timeRange={timeRange}
            />
          </div>
        )}
      </div>
      
      <div className="flex w-full flex-col items-start gap-8 overflow-hidden overflow-x-auto">
        <span className="text-heading-2 font-heading-2 text-default-font">
          Historical Data
        </span>
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>Quarter</Table.HeaderCell>
              <Table.HeaderCell>Growth Rate</Table.HeaderCell>
              <Table.HeaderCell>Change</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          {historyData.map((quarter, index) => {
            const currentValue = parseFloat(quarter.value);
            const prevValue = index < historyData.length - 1 ? parseFloat(historyData[index + 1].value) : null;
            const change = prevValue !== null ? currentValue - prevValue : 0;
            
            return (
              <Table.Row key={quarter.date}>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                    {formatQuarter(quarter.date)}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {currentValue.toFixed(1)}%
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className={`whitespace-nowrap text-body font-body ${
                    change > 0 ? 'text-success-600' : change < 0 ? 'text-error-600' : 'text-neutral-500'
                  }`}>
                    {change === 0 ? '--' : change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge 
                    variant={
                      currentValue >= 2.5 ? 'success' : 
                      currentValue > 0 ? 'warning' : 
                      'error'
                    }
                  >
                    {currentValue >= 2.5 ? 'Strong Growth' : 
                     currentValue > 0 ? 'Moderate Growth' : 
                     'Contraction'}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table>
      </div>
      
      <div className="flex w-full flex-col items-start gap-4 p-6 rounded-lg border border-neutral-200 bg-white">
        <span className="text-heading-3 font-heading-3 text-brand-700">
          Overview
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-body font-body text-neutral-600">
            The GDP Growth Rate measures the percentage change in the Gross Domestic Product (GDP) from one period to another, adjusted for inflation. It is the most comprehensive measure of economic activity and a key indicator of economic health.
          </span>
          <span className="text-body font-body text-neutral-600">
            {!isLoading && `In ${formatQuarter(latestGrowth.date)}, the U.S. economy grew at an annual rate of ${parseFloat(latestGrowth.value).toFixed(1)}%, ${parseFloat(latestGrowth.value) > parseFloat(previousGrowth.value) ? 'accelerating from' : 'slowing from'} ${parseFloat(previousGrowth.value).toFixed(1)}% in ${formatQuarter(previousGrowth.date)}. This growth pattern reflects the resilience of consumer spending and business investment despite higher interest rates.`}
          </span>
        </div>
      </div>
      
      <div className="flex w-full flex-col items-start gap-4 p-6 rounded-lg border border-neutral-200 bg-white">
        <span className="text-heading-3 font-heading-3 text-brand-700">
          Components of GDP Growth
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-body font-body text-neutral-600">
            <strong>Consumer Spending:</strong> Personal consumption expenditures, which account for about 70% of GDP, continue to be the main driver of economic growth. Consumer resilience has been supported by a strong labor market and gradually moderating inflation.
          </span>
          <span className="text-body font-body text-neutral-600">
            <strong>Business Investment:</strong> Non-residential fixed investment has shown modest growth, with spending on equipment and intellectual property products outpacing structures investment, which has been more volatile.
          </span>
          <span className="text-body font-body text-neutral-600">
            <strong>Government Spending:</strong> Government consumption expenditures and gross investment have contributed positively to recent GDP growth, with increases at both federal and state/local levels.
          </span>
          <span className="text-body font-body text-neutral-600">
            <strong>Net Exports:</strong> The trade balance has been fluctuating, with recent quarters showing mixed contributions to overall GDP growth as global demand shifts and the relative strength of the dollar impacts trade flows.
          </span>
        </div>
      </div>
      
      <div className="flex w-full flex-col items-start gap-4 p-6 rounded-lg border border-neutral-200 bg-white">
        <span className="text-heading-3 font-heading-3 text-brand-700">
          Outlook
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-body font-body text-neutral-600">
            Economic forecasts suggest moderate growth in the range of 2.0-2.5% for the upcoming quarters, with consumer spending expected to remain the main driver despite the dampening effects of high interest rates. The Federal Reserve&apos;s monetary policy decisions, particularly regarding the timing and pace of interest rate adjustments, will significantly influence the growth trajectory.
          </span>
          <span className="text-body font-body text-neutral-600">
            Key risks to the outlook include geopolitical tensions, potential energy price volatility, and the lagged effects of monetary tightening on business investment and consumer spending. Additionally, labor market conditions and their effect on wage growth and consumption will be critical factors to monitor.
          </span>
        </div>
      </div>
      
      <div className="flex w-full items-center justify-center gap-2 mt-4">
        <Button 
          variant="neutral-secondary"
          onClick={() => window.open(`https://fred.stlouisfed.org/series/${FRED_SERIES.A191RL1Q225SBEA}/downloaddata`, '_blank')}
        >
          <SubframeCore.Icon name="FeatherDownload" />
          Download Data
        </Button>
        <Button
          onClick={() => window.open(`https://fred.stlouisfed.org/series/${FRED_SERIES.A191RL1Q225SBEA}`, '_blank')}
        >
          <SubframeCore.Icon name="FeatherExternalLink" />
          View on FRED
        </Button>
      </div>
    </div>
  );
} 