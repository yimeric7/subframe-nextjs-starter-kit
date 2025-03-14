'use client';

import { Table } from "../../../ui/components/Table";
import { Badge } from "../../../ui/components/Badge";
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { Breadcrumbs } from '../../../ui/components/Breadcrumbs';

export function ClientGDPGrowthRate() {
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
                Q4 2023
              </span>
              <Badge variant="success">Latest Quarter</Badge>
            </div>
            <div className="flex items-end justify-center gap-2">
              <span className="font-['Inter'] text-[24px] font-[400] leading-[24px] text-default-font">
                3.2
              </span>
              <div className="flex flex-col items-end justify-center gap-2">
                <span className="text-body-bold font-body-bold text-success-600">
                  % Growth
                </span>
              </div>
            </div>
            <span className="text-body font-body text-subtext-color">
              Quarterly percent change in real gross domestic product
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-start gap-4">
        <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
          <span className="line-clamp-1 w-full text-body font-body text-subtext-color">
            Previous Quarter
          </span>
          <span className="line-clamp-1 w-full text-heading-3 font-heading-3 text-default-font">
            2.9%
          </span>
        </div>
        <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
          <span className="line-clamp-1 w-full text-body font-body text-subtext-color">
            Year-over-Year
          </span>
          <span className="line-clamp-1 w-full text-heading-3 font-heading-3 text-default-font">
            +4.1%
          </span>
        </div>
        <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
          <span className="line-clamp-1 w-full text-body font-body text-subtext-color">
            Forecast Q1 2024
          </span>
          <span className="line-clamp-1 w-full text-heading-3 font-heading-3 text-default-font">
            2.8%
          </span>
        </div>
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
          <Table.Row>
            <Table.Cell>
              <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                Q4 2023
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="whitespace-nowrap text-body font-body text-neutral-500">
                3.2%
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="whitespace-nowrap text-body font-body text-success-600">
                +0.3%
              </span>
            </Table.Cell>
            <Table.Cell>
              <Badge variant="success">Growth</Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                Q3 2023
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="whitespace-nowrap text-body font-body text-neutral-500">
                2.9%
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="whitespace-nowrap text-body font-body text-success-600">
                +0.1%
              </span>
            </Table.Cell>
            <Table.Cell>
              <Badge variant="success">Growth</Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                Q2 2023
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="whitespace-nowrap text-body font-body text-neutral-500">
                2.8%
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className="whitespace-nowrap text-body font-body text-error-600">
                -0.4%
              </span>
            </Table.Cell>
            <Table.Cell>
              <Badge variant="warning">Slowdown</Badge>
            </Table.Cell>
          </Table.Row>
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
            In Q4 2023, the U.S. economy grew at an annual rate of 3.2%, exceeding expectations and showing resilience despite high interest rates. This growth was primarily driven by consumer spending and business investment.
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-4 p-6 rounded-lg border border-neutral-200 bg-white">
        <span className="text-heading-3 font-heading-3 text-brand-700">
          Components of GDP Growth
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-body font-body text-neutral-600">
            <strong>Consumer Spending:</strong> Increased by 3.0% in Q4 2023, contributing 2.0 percentage points to GDP growth. Spending on services and durable goods showed particular strength.
          </span>
          <span className="text-body font-body text-neutral-600">
            <strong>Business Investment:</strong> Rose by 2.1%, adding 0.3 percentage points to growth. Investment in equipment and intellectual property products increased, while structures investment declined slightly.
          </span>
          <span className="text-body font-body text-neutral-600">
            <strong>Government Spending:</strong> Increased by 3.3%, contributing 0.6 percentage points to growth, with increases at both federal and state/local levels.
          </span>
          <span className="text-body font-body text-neutral-600">
            <strong>Net Exports:</strong> Contributed 0.4 percentage points to GDP growth, as exports increased by 6.3% while imports rose by 3.0%.
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-4 p-6 rounded-lg border border-neutral-200 bg-white">
        <span className="text-heading-3 font-heading-3 text-brand-700">
          Outlook
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-body font-body text-neutral-600">
            Economists project moderate growth of approximately 2.8% for Q1 2024, with consumer spending expected to remain resilient despite persistent inflation and high interest rates. The Federal Reserve's monetary policy decisions will continue to influence economic growth throughout 2024.
          </span>
          <span className="text-body font-body text-neutral-600">
            Key risks to the outlook include geopolitical tensions, potential energy price volatility, and the lagged effects of monetary tightening on business investment and consumer spending.
          </span>
        </div>
      </div>
    </div>
  );
} 