"use client";
/*
 * Documentation:
 * Explore Card — https://app.subframe.com/3e89f36c040a/library?component=Explore+Card_bca37f79-4fe8-49fe-8b6c-8e512ba4845b
 * Icon with background — https://app.subframe.com/3e89f36c040a/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import * as SubframeCore from "@subframe/core";

export interface ExploreCardProps {
  title: string;
  desc: string;
  metadata: string;
  count: string;
  className?: string;
  children: ReactNode;
}

export function ExploreCard({
  title,
  desc,
  metadata,
  count,
  className = '',
  children,
}: ExploreCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" 
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className={`flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background p-6 shadow-sm ${className}`}
    >
      <div className="flex w-full items-start gap-4">
        <div className="relative">
          {children}
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-default-background text-caption-bold font-caption-bold text-subtext-color">
            {count}
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
          <span className="text-body-bold font-body-bold text-default-font">
            {title}
          </span>
          <span className="text-caption font-caption text-subtext-color">
            {desc}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-end">
        <span className="text-right text-caption font-caption text-subtext-color">
          {metadata}
        </span>
      </div>
    </motion.div>
  );
}
