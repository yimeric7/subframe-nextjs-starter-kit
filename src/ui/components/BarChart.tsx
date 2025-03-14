"use client";
/*
 * Documentation:
 * Bar Chart — https://app.subframe.com/3e89f36c040a/library?component=Bar+Chart_4d4f30e7-1869-4980-8b96-617df3b37912
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { motion } from 'framer-motion';

export interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  stacked?: boolean;
  className?: string;
}

export function BarChart({
  data,
  index,
  categories,
  stacked = false,
  className = '',
}: BarChartProps) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.3,
          type: "spring", 
          stiffness: 300,
          damping: 30
        }}
        className="w-full h-full"
      >
        <SubframeCore.BarChart
          data={data}
          index={index}
          categories={categories}
          stacked={stacked}
        />
      </motion.div>
    </div>
  );
}
