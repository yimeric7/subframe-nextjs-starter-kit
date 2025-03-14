'use client';

import { ExploreCard } from '../../ui/components/ExploreCard';
import { IconWithBackground } from '../../ui/components/IconWithBackground';
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { Tabs } from '../../ui/components/Tabs';
import { BarChart } from '../../ui/components/BarChart';
import { LineChart } from '../../ui/components/LineChart';
import { ToggleGroup } from '../../ui/components/ToggleGroup';
import { useState } from 'react';

export default function Employment() {
  const [timeRangeUnemployment, setTimeRangeUnemployment] = useState("5Y");
  const [timeRangeNFP, setTimeRangeNFP] = useState("5Y");

  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-6">
      <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
        <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6 px-6 py-6 transition-all duration-300 ease-in-out">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <SubframeCore.Icon
              className="text-heading-1 font-heading-1 text-default-font animate-pulse"
              name="FeatherUsers"
            />
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span className="w-full text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-1 mobile:font-heading-1">
                Employment Statistics
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Monitor labor market conditions with comprehensive employment
                metrics and analysis
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-12">
          <div className="flex w-full flex-col items-start gap-12 overflow-auto mobile:h-auto mobile:w-auto mobile:flex-none mobile:overflow-auto mobile:self-stretch">
            <Tabs>
              <Link href="/">
                <Tabs.Item>Popular Indicators</Tabs.Item>
              </Link>
              <Link href="/monetary-policy">
                <Tabs.Item>Monetary Policy</Tabs.Item>
              </Link>
              <Link href="/economic-growth">
                <Tabs.Item>Economic Growth</Tabs.Item>
              </Link>
              <Tabs.Item active={true}>Employment</Tabs.Item>
            </Tabs>
          </div>
          <div className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Key Employment Indicators
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Critical metrics for measuring labor market health
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/unemployment-rate" className="w-full">
                    <ExploreCard
                      count="1"
                      title="Unemployment Rate"
                      desc="Percentage of labor force unemployed"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground size="large" icon="FeatherUserMinus" />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/nonfarm-payrolls" className="w-full">
                    <ExploreCard
                      count="2"
                      title="Job Creation"
                      desc="Monthly non-farm payroll changes"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground
                        variant="success"
                        size="large"
                        icon="FeatherUserPlus"
                      />
                    </ExploreCard>
                  </Link>
                </div>
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/labor-force-participation" className="w-full">
                    <ExploreCard
                      count="3"
                      title="Labor Participation"
                      desc="Workforce participation rate"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground
                        variant="warning"
                        size="large"
                        icon="FeatherUsers"
                      />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/average-hourly-earnings" className="w-full">
                    <ExploreCard
                      count="4"
                      title="Wage Growth"
                      desc="Average hourly earnings change"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground
                        variant="neutral"
                        size="large"
                        icon="FeatherDollarSign"
                      />
                    </ExploreCard>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-8">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Employment Trends
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Historical performance of key employment indicators
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                    Employment by Sector
                  </span>
                  <ToggleGroup value={timeRangeNFP} onValueChange={(value: string) => {
                    setTimeRangeNFP(value);
                  }}>
                    <ToggleGroup.Item icon={null} value="1Y">
                      1Y
                    </ToggleGroup.Item>
                    <ToggleGroup.Item icon={null} value="5Y">
                      5Y
                    </ToggleGroup.Item>
                    <ToggleGroup.Item icon={null} value="10Y">
                      10Y
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </div>
                <BarChart
                  className="h-64 w-full flex-none"
                  stacked={true}
                  categories={["Manufacturing", "Services", "Government", "Construction"]}
                  data={[
                    {
                      Year: "2015",
                      Manufacturing: 12.0,
                      Services: 71.0,
                      Government: 15.0,
                      Construction: 4.0
                    },
                    { 
                      Year: "2016", 
                      Manufacturing: 11.8, 
                      Services: 71.5, 
                      Government: 14.8,
                      Construction: 4.2
                    },
                    {
                      Year: "2017",
                      Manufacturing: 11.6,
                      Services: 72.0,
                      Government: 14.5,
                      Construction: 4.3
                    },
                    { 
                      Year: "2018", 
                      Manufacturing: 11.5, 
                      Services: 72.3, 
                      Government: 14.3,
                      Construction: 4.5
                    },
                    { 
                      Year: "2019", 
                      Manufacturing: 11.4, 
                      Services: 72.5, 
                      Government: 14.2,
                      Construction: 4.6
                    },
                    { 
                      Year: "2020", 
                      Manufacturing: 11.0, 
                      Services: 71.8, 
                      Government: 14.5,
                      Construction: 4.2
                    },
                    {
                      Year: "2021",
                      Manufacturing: 11.2,
                      Services: 72.0,
                      Government: 14.3,
                      Construction: 4.3
                    },
                    {
                      Year: "2022",
                      Manufacturing: 11.3,
                      Services: 72.2,
                      Government: 14.1,
                      Construction: 4.5
                    },
                  ]}
                  index={"Year"}
                />
              </div>
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                    Unemployment Rate Trends
                  </span>
                  <ToggleGroup value={timeRangeUnemployment} onValueChange={(value: string) => {
                    setTimeRangeUnemployment(value);
                  }}>
                    <ToggleGroup.Item icon={null} value="1Y">
                      1Y
                    </ToggleGroup.Item>
                    <ToggleGroup.Item icon={null} value="5Y">
                      5Y
                    </ToggleGroup.Item>
                    <ToggleGroup.Item icon={null} value="10Y">
                      10Y
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </div>
                <LineChart
                  className="h-64 w-full flex-none"
                  categories={["Overall", "Youth", "Long-term"]}
                  data={[
                    {
                      Year: "2015",
                      Overall: 5.3,
                      Youth: 11.6,
                      "Long-term": 2.1
                    },
                    { 
                      Year: "2016", 
                      Overall: 4.9, 
                      Youth: 10.4, 
                      "Long-term": 1.9
                    },
                    {
                      Year: "2017",
                      Overall: 4.4,
                      Youth: 9.2,
                      "Long-term": 1.7
                    },
                    { 
                      Year: "2018", 
                      Overall: 3.9, 
                      Youth: 8.6, 
                      "Long-term": 1.4
                    },
                    { 
                      Year: "2019", 
                      Overall: 3.7, 
                      Youth: 8.4, 
                      "Long-term": 1.3
                    },
                    { 
                      Year: "2020", 
                      Overall: 8.1, 
                      Youth: 14.7, 
                      "Long-term": 2.8
                    },
                    {
                      Year: "2021",
                      Overall: 5.4,
                      Youth: 11.0,
                      "Long-term": 2.4
                    },
                    {
                      Year: "2022",
                      Overall: 3.6,
                      Youth: 8.2,
                      "Long-term": 1.2
                    },
                  ]}
                  index={"Year"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 