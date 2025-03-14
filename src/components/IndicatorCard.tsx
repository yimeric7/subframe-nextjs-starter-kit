'use client';

import Link from 'next/link';
import { IconWithBackground } from '../ui/components/IconWithBackground';
import * as SubframeCore from "@subframe/core";

interface IndicatorCardProps {
  id: number;
  title: string;
  description: string;
  icon: SubframeCore.IconName;
  iconVariant?: 'brand' | 'neutral' | 'error' | 'success' | 'warning';
  updatedDate: string;
  href: string;
}

export default function IndicatorCard({
  id,
  title,
  description,
  icon,
  iconVariant = 'neutral',
  updatedDate,
  href,
}: IndicatorCardProps) {
  return (
    <Link href={href} className="block">
      <div className="flex items-start p-4 rounded-lg border border-neutral-200 hover:border-brand-300 hover:shadow-md transition-all">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-neutral-100 text-neutral-500 mr-4">
          <div className="flex-shrink-0 mr-4">
            <IconWithBackground
              icon={icon}
              variant={iconVariant}
              size="medium"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-neutral-100 text-neutral-700 mr-2">
              <span className="text-caption-bold">{id}</span>
            </div>
            <h3 className="text-heading-3 text-brand-800">{title}</h3>
          </div>
          <p className="text-body text-neutral-600 mb-2">{description}</p>
          <p className="text-caption text-neutral-500">Updated: {updatedDate}</p>
        </div>
      </div>
    </Link>
  );
} 