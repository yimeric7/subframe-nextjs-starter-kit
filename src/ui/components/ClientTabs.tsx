'use client';

import React from 'react';
import Link from 'next/link';
import * as SubframeCore from "@subframe/core";
import { Tabs } from './Tabs';

interface ClientTabsProps {
  children: React.ReactNode;
  className?: string;
}

export function ClientTabs({ children, className = '' }: ClientTabsProps) {
  return (
    <Tabs className={className}>
      {children}
    </Tabs>
  );
}

// Create a separate component for Tabs.Item with link capability
interface ClientTabsItemProps {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  icon?: SubframeCore.IconName;
  disabled?: boolean;
  className?: string;
}

export function ClientTabsItem({ children, active = false, href, icon, disabled, className }: ClientTabsItemProps) {
  const tabItem = (
    <Tabs.Item active={active} icon={icon} disabled={disabled} className={className}>
      {children}
    </Tabs.Item>
  );

  if (href) {
    return <Link href={href}>{tabItem}</Link>;
  }

  return tabItem;
}

// Add this property attachment for backward compatibility
ClientTabs.Item = ClientTabsItem; 