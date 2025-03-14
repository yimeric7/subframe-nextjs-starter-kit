'use client';

import { ExploreCard } from '../ui/components/ExploreCard';
import { IconWithBackground } from '../ui/components/IconWithBackground';
import { Button } from '../ui/components/Button';
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { Tabs } from '../ui/components/Tabs';

export default function Home() {
  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-6">
      <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
        <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6 px-6 py-6 hover:opacity-80 transition-all duration-300 ease-in-out">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <SubframeCore.Icon
              className="text-heading-1 font-heading-1 text-default-font animate-pulse"
              name="FeatherBarChart2"
            />
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span className="w-full text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-1 mobile:font-heading-1">
                Federal Reserve Economic Data
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Explore key economic indicators and data released by the Federal Reserve
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-12">
          <div className="flex w-full flex-col items-start gap-12 overflow-auto mobile:h-auto mobile:w-auto mobile:flex-none mobile:overflow-auto mobile:self-stretch">
            <Tabs>
              <Tabs.Item active={true}>Popular Indicators</Tabs.Item>
              <Link href="/monetary-policy">
                <Tabs.Item>Monetary Policy</Tabs.Item>
              </Link>
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
                  Featured Indicators
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Key economic metrics updated in real-time
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/gdp-growth-rate" className="w-full">
                    <ExploreCard
                      className="hover:scale-105 transition-all duration-300 ease-in-out"
                      count="1"
                      title="GDP Growth Rate"
                      desc="Quarterly percent change in real gross domestic product"
                      metadata="Updated: Q4 2023"
                    >
                      <IconWithBackground 
                        size="large" 
                        icon="FeatherTrendingUp" 
                        variant="success"
                      />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/inflation-rate" className="w-full">
                    <ExploreCard
                      className="hover:scale-105 transition-all duration-300 ease-in-out"
                      count="2"
                      title="Inflation Rate (CPI)"
                      desc="Consumer Price Index for All Urban Consumers: All Items"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground
                        variant="warning"
                        size="large"
                        icon="FeatherDollarSign"
                      />
                    </ExploreCard>
                  </Link>
                </div>
                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/unemployment-rate" className="w-full">
                    <ExploreCard
                      className="hover:scale-105 transition-all duration-300 ease-in-out"
                      count="3"
                      title="Unemployment Rate"
                      desc="Civilian Unemployment Rate, Seasonally Adjusted"
                      metadata="Updated: March 2024"
                    >
                      <IconWithBackground
                        variant="error"
                        size="large"
                        icon="FeatherUsers"
                      />
                    </ExploreCard>
                  </Link>
                  <Link href="/indicators/federal-funds-rate" className="w-full">
                    <ExploreCard
                      className="hover:scale-105 transition-all duration-300 ease-in-out"
                      count="4"
                      title="Federal Funds Rate"
                      desc="Effective Federal Funds Rate, Daily"
                      metadata="Updated: Today"
                    >
                      <IconWithBackground
                        variant="brand"
                        size="large"
                        icon="FeatherPercent"
                      />
                    </ExploreCard>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
