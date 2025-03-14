"use client";
/*
 * Documentation:
 * Tabs — https://app.subframe.com/3e89f36c040a/library?component=Tabs_e1ad5091-8ad8-4319-b1f7-3e47f0256c20
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { motion } from 'framer-motion';

interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

const TabsRoot = React.forwardRef<HTMLElement, TabsRootProps>(
  function TabsRoot({ className, children, ...otherProps }: TabsRootProps, ref) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "flex h-10 min-w-full flex-none flex-row items-center gap-4 overflow-auto whitespace-nowrap p-0",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);

const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
  { active = false, icon, disabled = false, children, className, ...otherProps }: ItemProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "group flex h-10 cursor-pointer items-center gap-2 border-b-2 border-transparent px-1 py-2 transition-all duration-200 hover:text-brand-600 relative",
        active
          ? "border-b-2 border-brand-600 text-body-semibold font-body-semibold text-brand-600"
          : "text-body font-body text-neutral-600",
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {icon && <div className="flex items-center">{icon}</div>}
      <div className="flex items-center">
        <span className="flex">{children}</span>
      </div>
      {active && (
        <div className="absolute -bottom-[2px] left-0 right-0 h-0.5 bg-brand-600" />
      )}
    </div>
  );
});

export const Tabs = Object.assign(TabsRoot, {
  Item,
});
