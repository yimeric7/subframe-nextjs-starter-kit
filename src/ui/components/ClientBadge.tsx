'use client';

import React from 'react';
import { Badge } from './Badge';
import * as SubframeCore from "@subframe/core";

interface ClientBadgeProps {
  variant?: "brand" | "neutral" | "error" | "warning" | "success";
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  iconRight?: SubframeCore.IconName;
  className?: string;
}

export function ClientBadge({ 
  variant, 
  icon, 
  children, 
  iconRight, 
  className,
  ...otherProps
}: ClientBadgeProps) {
  return (
    <Badge
      variant={variant}
      icon={icon}
      iconRight={iconRight}
      className={className}
      {...otherProps}
    >
      {children}
    </Badge>
  );
} 