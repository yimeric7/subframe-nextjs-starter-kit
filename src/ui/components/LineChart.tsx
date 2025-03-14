"use client";
/*
 * Documentation:
 * Line Chart — https://app.subframe.com/3e89f36c040a/library?component=Line+Chart_22944dd2-3cdd-42fd-913a-1b11a3c1d16d
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { motion } from 'framer-motion';

export interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  className?: string;
}

export function LineChart({
  data,
  index,
  categories,
  className = '',
}: LineChartProps) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7, 
          delay: 0.2,
          type: "spring", 
          stiffness: 300,
          damping: 30
        }}
        className="w-full h-full"
      >
        <SubframeCore.LineChart
          data={data}
          index={index}
          categories={categories}
        />
      </motion.div>
    </div>
  );
}
