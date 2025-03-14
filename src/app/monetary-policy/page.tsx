'use client';

import { ExploreCard } from '../../ui/components/ExploreCard';
import { IconWithBackground } from '../../ui/components/IconWithBackground';
import { Button } from '../../ui/components/Button';
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { Tabs } from '../../ui/components/Tabs';
import { BarChart } from '../../ui/components/BarChart';
import { LineChart } from '../../ui/components/LineChart';
import { ToggleGroup } from '../../ui/components/ToggleGroup';
import { useState } from 'react';

export default function MonetaryPolicy() {
  const [timeRangeFundRate, setTimeRangeFundRate] = useState("5Y");
  const [timeRangeBalanceSheet, setTimeRangeBalanceSheet] = useState("5Y");

  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-6">
      <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
        <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6 px-6 py-6 hover:opacity-80 transition-all duration-300 ease-in-out">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <SubframeCore.Icon
              className="text-heading-1 font-heading-1 text-default-font animate-pulse"
              name="FeatherPercent"
            />
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span className="w-full text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-1 mobile:font-heading-1">
                Monetary Policy Indicators
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Track Federal Reserve policy decisions and their impact on financial markets
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
              <Tabs.Item active={true}>Monetary Policy</Tabs.Item>
              <Link href="/economic-growth">
                <Tabs.Item>Economic Growth</Tabs.Item>
              </Link>
              <Link href="/employment">
                <Tabs.Item>Employment</Tabs.Item>
              </Link>
            </Tabs>
          </div>
          <div className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Key Monetary Indicators
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Critical metrics for monitoring Federal Reserve policy
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/federal-funds-rate" className="w-full">
                    <ExploreCard
                      count="1"
                      title="Federal Funds Rate"
                      desc="The interest rate at which depository institutions lend reserve balances to other depository institutions overnight"
                      metadata="Current Target Range: 5.25% - 5.50%"
                    >
                      <IconWithBackground
                        icon="FeatherPercent"
                        variant="brand"
                        size="large"
                      />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/money-supply" className="w-full">
                    <ExploreCard
                      count="2"
                      title="Money Supply (M2)"
                      desc="A measure of the money supply that includes cash, checking deposits, and easily convertible near money"
                      metadata="Current Level: $20.8T"
                    >
                      <IconWithBackground
                        icon="FeatherDollarSign"
                        variant="brand"
                        size="large"
                      />
                    </ExploreCard>
                  </Link>
                </div>
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/treasury-yields" className="w-full">
                    <ExploreCard
                      count="3"
                      title="Treasury Yields"
                      desc="Interest rates on U.S. Treasury debt securities, which serve as benchmarks for other interest rates"
                      metadata="10-Year Yield: 4.30%, 2-Year Yield: 4.68%"
                    >
                      <IconWithBackground
                        icon="FeatherTrendingUp"
                        variant="brand"
                        size="large"
                      />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/fed-balance-sheet" className="w-full">
                    <ExploreCard
                      count="4"
                      title="Fed Balance Sheet"
                      desc="The Federal Reserve's holdings of securities, loans, and other assets it has acquired through its monetary policy operations"
                      metadata="Total Assets: $7.5T"
                    >
                      <IconWithBackground
                        icon="FeatherDatabase"
                        variant="brand"
                        size="large"
                      />
                    </ExploreCard>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-8">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Policy Trends
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Historical performance of key monetary policy indicators
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                    Federal Funds Rate History
                  </span>
                  <ToggleGroup value={timeRangeFundRate} onValueChange={setTimeRangeFundRate}>
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
                  categories={["Federal Funds Rate"]}
                  data={[
                    { Year: "2015", "Federal Funds Rate": 0.25 },
                    { Year: "2016", "Federal Funds Rate": 0.50 },
                    { Year: "2017", "Federal Funds Rate": 1.25 },
                    { Year: "2018", "Federal Funds Rate": 2.50 },
                    { Year: "2019", "Federal Funds Rate": 1.75 },
                    { Year: "2020", "Federal Funds Rate": 0.25 },
                    { Year: "2021", "Federal Funds Rate": 0.25 },
                    { Year: "2022", "Federal Funds Rate": 4.50 },
                    { Year: "2023", "Federal Funds Rate": 5.50 },
                  ]}
                  index={"Year"}
                />
              </div>
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                    Fed Balance Sheet
                  </span>
                  <ToggleGroup value={timeRangeBalanceSheet} onValueChange={setTimeRangeBalanceSheet}>
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
                  categories={["Treasury Securities", "Mortgage-Backed Securities", "Other Assets"]}
                  data={[
                    {
                      Year: "2015",
                      "Treasury Securities": 2.5,
                      "Mortgage-Backed Securities": 1.8,
                      "Other Assets": 0.2
                    },
                    { 
                      Year: "2016", 
                      "Treasury Securities": 2.5, 
                      "Mortgage-Backed Securities": 1.8, 
                      "Other Assets": 0.2
                    },
                    {
                      Year: "2017",
                      "Treasury Securities": 2.5,
                      "Mortgage-Backed Securities": 1.8,
                      "Other Assets": 0.2
                    },
                    { 
                      Year: "2018", 
                      "Treasury Securities": 2.3, 
                      "Mortgage-Backed Securities": 1.7, 
                      "Other Assets": 0.2
                    },
                    { 
                      Year: "2019", 
                      "Treasury Securities": 2.3, 
                      "Mortgage-Backed Securities": 1.5, 
                      "Other Assets": 0.2
                    },
                    { 
                      Year: "2020", 
                      "Treasury Securities": 4.7, 
                      "Mortgage-Backed Securities": 2.0, 
                      "Other Assets": 0.5
                    },
                    {
                      Year: "2021",
                      "Treasury Securities": 5.8,
                      "Mortgage-Backed Securities": 2.6,
                      "Other Assets": 0.6
                    },
                    {
                      Year: "2022",
                      "Treasury Securities": 5.7,
                      "Mortgage-Backed Securities": 2.7,
                      "Other Assets": 0.5
                    },
                    {
                      Year: "2023",
                      "Treasury Securities": 5.1,
                      "Mortgage-Backed Securities": 2.5,
                      "Other Assets": 0.4
                    },
                  ]}
                  index={"Year"}
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Recent Updates
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Latest monetary policy developments and FOMC decisions
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex w-full items-start gap-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-neutral-100">
                    <span className="text-body-bold font-body-bold text-neutral-700">1</span>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body-bold font-body-bold text-neutral-700">
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
                </div>
                <div className="flex w-full items-start gap-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-neutral-100">
                    <span className="text-body-bold font-body-bold text-neutral-700">2</span>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body-bold font-body-bold text-neutral-700">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 