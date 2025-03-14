'use client';

import { ExploreCard } from '../ui/components/ExploreCard';
import { IconWithBackground } from '../ui/components/IconWithBackground';
import { Button } from '../ui/components/Button';
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { Tabs } from '../ui/components/Tabs';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  // Use a state to ensure hydration consistency
  const [isClient, setIsClient] = useState(false);
  
  // Only run after hydration to prevent server/client mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // If not client yet, render a minimal placeholder with matching structure
  if (!isClient) {
    return (
      <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-6">
        <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
          {/* Placeholder content while hydrating */}
        </div>
      </div>
    );
  }

  // Main component rendering after hydration
  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-6">
      <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6 px-6 py-6 hover:opacity-80 transition-all duration-300 ease-in-out">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <SubframeCore.Icon
                className="text-heading-1 font-heading-1 text-default-font"
                name="FeatherBarChart2"
              />
            </motion.div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-1 mobile:font-heading-1">
                Federal Reserve Economic Data
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-body font-body text-subtext-color text-center">
                Explore key economic indicators and data released by the Federal Reserve
              </motion.span>
            </div>
          </div>
        </motion.div>
        <div className="flex w-full flex-col items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex w-full flex-col items-start gap-12 overflow-auto mobile:h-auto mobile:w-auto mobile:flex-none mobile:overflow-auto mobile:self-stretch">
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
          </motion.div>
          <div className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col items-start gap-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex w-full flex-col items-start gap-1">
                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                  Featured Indicators
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  Key economic metrics updated in real-time
                </span>
              </motion.div>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex w-full flex-col items-start gap-4">
                <motion.div variants={item} className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/gdp-growth-rate" className="w-full">
                    <ExploreCard
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
                </motion.div>
                <motion.div variants={item} className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                  <Link href="/indicators/unemployment-rate" className="w-full">
                    <ExploreCard
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
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
