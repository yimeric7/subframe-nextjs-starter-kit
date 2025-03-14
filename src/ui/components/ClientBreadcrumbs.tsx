'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ClientBreadcrumbsProps {
  children: React.ReactNode;
  className?: string;
}

export function ClientBreadcrumbs({ children, className = '' }: ClientBreadcrumbsProps) {
  return (
    <Breadcrumbs className={className}>
      {children}
    </Breadcrumbs>
  );
}

// Create a separate component for Breadcrumbs.Item with link capability
interface ClientBreadcrumbsItemProps extends React.ComponentProps<typeof Breadcrumbs.Item> {
  href?: string;
}

export function ClientBreadcrumbsItem({ children, href, ...props }: ClientBreadcrumbsItemProps) {
  const item = <Breadcrumbs.Item {...props}>{children}</Breadcrumbs.Item>;
  
  if (href) {
    return <Link href={href}>{item}</Link>;
  }
  
  return item;
}

// Create a separate component for Breadcrumbs.Divider
export function ClientBreadcrumbsDivider(props: React.ComponentProps<typeof Breadcrumbs.Divider>) {
  return <Breadcrumbs.Divider {...props} />;
}

// Add these properties for backward compatibility
ClientBreadcrumbs.Item = ClientBreadcrumbsItem;
ClientBreadcrumbs.Divider = ClientBreadcrumbsDivider; 