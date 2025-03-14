'use client';

import React from 'react';
import * as SubframeCore from '@subframe/core';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={SubframeCore.twClassNames(
          'rounded-lg border border-neutral-200 bg-white p-4 shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Card; 