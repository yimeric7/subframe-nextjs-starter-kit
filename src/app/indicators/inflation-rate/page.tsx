'use client';

import Link from 'next/link';
import { Breadcrumbs } from '../../../ui/components/Breadcrumbs';

export default function InflationRate() {
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
      
      {/* Add content here */}
      <div className="flex w-full flex-col items-start gap-8">
        <span className="w-full text-heading-1 font-heading-1 text-default-font">
          Inflation Rate
        </span>
        <span className="w-full text-body font-body text-subtext-color">
          This page is under construction. Check back soon for inflation rate data and analysis.
        </span>
      </div>
    </div>
  );
} 