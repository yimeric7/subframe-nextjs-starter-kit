'use client';

import { ExploreCard } from '../../ui/components/ExploreCard';
import { IconWithBackground } from '../../ui/components/IconWithBackground';
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { BarChart } from '../../ui/components/BarChart';
import { LineChart } from '../../ui/components/LineChart';
import { ToggleGroup } from '../../ui/components/ToggleGroup';
import { Tabs } from '../../ui/components/Tabs';
import { useState } from 'react';

export default function EconomicGrowth() {
  const [timeRangeGDP, setTimeRangeGDP] = useState("5Y");
  const [timeRangeGrowth, setTimeRangeGrowth] = useState("5Y");

  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-6">
      <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
        <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6 px-6 py-6 hover:opacity-80 transition-all duration-300 ease-in-out">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <SubframeCore.Icon
              className="text-heading-1 font-heading-1 text-default-font animate-pulse"
              name="FeatherTrendingUp"
            />
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span className="w-full text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-1 mobile:font-heading-1">
                Economic Growth Indicators
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Track key economic growth metrics and analyze trends with
                comprehensive visualization tools
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
              <Tabs.Item active={true}>Economic Growth</Tabs.Item>
              <Link href="/employment">
                <Tabs.Item>Employment</Tabs.Item>
              </Link>
            </Tabs>
          </div>
          <div className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Key Growth Indicators
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Critical metrics for measuring economic expansion
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/gdp-growth-rate" className="w-full">
                    <ExploreCard
                      count="1"
                      title="GDP Growth Rate"
                      desc="Quarter-over-quarter GDP growth"
                      metadata="Updated: Q1 2024"
                    >
                      <IconWithBackground
                        variant="success"
                        size="large"
                        icon="FeatherBarChart"
                      />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/industrial-production" className="w-full">
                    <ExploreCard
                      count="2"
                      title="Industrial Production"
                      desc="Industrial Production Index"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground
                        variant="warning"
                        size="large"
                        icon="FeatherActivity"
                      />
                    </ExploreCard>
                  </Link>
                </div>
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/retail-sales" className="w-full">
                    <ExploreCard
                      count="3"
                      title="Retail Sales"
                      desc="Monthly Retail Trade Report"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground size="large" icon="FeatherShoppingBag" />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/consumer-spending" className="w-full">
                    <ExploreCard
                      count="4"
                      title="Consumer Spending"
                      desc="Personal Consumption Expenditures"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground size="large" icon="FeatherCreditCard" />
                    </ExploreCard>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-8">
              <div className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Growth Trends
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Historical performance of key economic indicators
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                    GDP Components
                  </span>
                  <ToggleGroup value={timeRangeGDP} onValueChange={(value: string) => setTimeRangeGDP(value)}>
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
                  categories={["Consumption", "Investment", "Government", "Net Exports"]}
                  data={[
                    {
                      Year: "2015",
                      Consumption: 120,
                      Investment: 110,
                      Government: 100,
                      "Net Exports": -30
                    },
                    { 
                      Year: "2016", 
                      Consumption: 130, 
                      Investment: 95, 
                      Government: 105,
                      "Net Exports": -25
                    },
                    {
                      Year: "2017",
                      Consumption: 115,
                      Investment: 105,
                      Government: 110,
                      "Net Exports": -20
                    },
                    { 
                      Year: "2018", 
                      Consumption: 125, 
                      Investment: 120, 
                      Government: 90,
                      "Net Exports": -35
                    },
                    { 
                      Year: "2019", 
                      Consumption: 110, 
                      Investment: 130, 
                      Government: 85,
                      "Net Exports": -40
                    },
                    { 
                      Year: "2020", 
                      Consumption: 135, 
                      Investment: 100, 
                      Government: 95,
                      "Net Exports": -30
                    },
                    {
                      Year: "2021",
                      Consumption: 105,
                      Investment: 115,
                      Government: 120,
                      "Net Exports": -25
                    },
                    {
                      Year: "2022",
                      Consumption: 140,
                      Investment: 125,
                      Government: 130,
                      "Net Exports": -20
                    },
                  ]}
                  index={"Year"}
                />
              </div>
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex w-full items-center gap-2">
                  <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                    Growth Rate Trends
                  </span>
                  <ToggleGroup value={timeRangeGrowth} onValueChange={(value: string) => setTimeRangeGrowth(value)}>
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
                  categories={["GDP", "Industrial Production", "Retail Sales"]}
                  data={[
                    {
                      Year: "2015",
                      GDP: 2.5,
                      "Industrial Production": 1.8,
                      "Retail Sales": 2.2
                    },
                    { 
                      Year: "2016", 
                      GDP: 1.6, 
                      "Industrial Production": 0.5, 
                      "Retail Sales": 3.0
                    },
                    {
                      Year: "2017",
                      GDP: 2.2,
                      "Industrial Production": 2.3,
                      "Retail Sales": 4.2
                    },
                    { 
                      Year: "2018", 
                      GDP: 3.0, 
                      "Industrial Production": 3.9, 
                      "Retail Sales": 4.8
                    },
                    { 
                      Year: "2019", 
                      GDP: 2.2, 
                      "Industrial Production": -0.8, 
                      "Retail Sales": 3.6
                    },
                    { 
                      Year: "2020", 
                      GDP: -3.5, 
                      "Industrial Production": -6.8, 
                      "Retail Sales": 0.4
                    },
                    {
                      Year: "2021",
                      GDP: 5.7,
                      "Industrial Production": 4.9,
                      "Retail Sales": 19.4
                    },
                    {
                      Year: "2022",
                      GDP: 2.1,
                      "Industrial Production": 1.2,
                      "Retail Sales": 7.2
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