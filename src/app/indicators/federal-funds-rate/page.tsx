'use client';

import Link from 'next/link';
import { IconWithBackground } from '../../../ui/components/IconWithBackground';
import { Button } from '../../../ui/components/Button';
import * as SubframeCore from "@subframe/core";
import { Breadcrumbs } from '../../../ui/components/Breadcrumbs';

export default function FederalFundsRate() {
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
          <div className="flex w-full items-center gap-2">
            <IconWithBackground
              icon="FeatherPercent"
              variant="brand"
              size="large"
            />
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-body-bold font-body-bold text-default-font">
                Current Target Range
              </span>
              <span className="text-body font-body text-subtext-color">
                5.25% - 5.50%
              </span>
            </div>
          </div>
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
              Recent Changes
            </span>
            <span className="w-full text-body font-body text-subtext-color">
              The Federal Open Market Committee (FOMC) meets eight times a year to determine the federal funds target rate. The current target range is 5.25% to 5.50%, which was set at the July 2023 meeting and has remained unchanged in subsequent meetings.
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
          <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-neutral-200 bg-white p-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-body-bold font-body-bold text-default-font">
                December 13, 2023
              </span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-caption font-caption text-neutral-700">
                FOMC Meeting
              </span>
            </div>
            <span className="text-body font-body text-neutral-600">
              The FOMC maintained the target range for the federal funds rate at 5.25% to 5.50%. The Committee signaled that it may be approaching the end of its tightening cycle, with projections suggesting three rate cuts in 2024.
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
          <Button variant="neutral-secondary">
            <SubframeCore.Icon name="FeatherDownload" />
            Download Data
          </Button>
          <Button>
            <SubframeCore.Icon name="FeatherExternalLink" />
            View on FRED
          </Button>
        </div>
      </div>
    </div>
  );
} 