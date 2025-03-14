'use client';

import React, { useMemo } from 'react';
import * as SubframeCore from '@subframe/core';
import { motion } from 'framer-motion';

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  title?: string;
  subtitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  width?: string;
  lineColor?: string;
  areaColor?: string;
  showGrid?: boolean;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string) => string;
  showTooltip?: boolean;
  timeRange?: string;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  title,
  subtitle,
  xAxisLabel,
  yAxisLabel,
  height = 300,
  width = '100%',
  lineColor = 'var(--color-brand-600)',
  areaColor = 'var(--color-brand-100)',
  showGrid = true,
  valueFormatter = (value) => value.toFixed(1),
  dateFormatter = (date) => new Date(date).toLocaleDateString(),
  showTooltip = true,
  timeRange,
}) => {
  const sortedData = useMemo(() => {
    return [...(data || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  if (!data || sortedData.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-neutral-50 rounded-md" 
        style={{ height: `${height}px`, width }}
      >
        <div className="flex flex-col items-center gap-2">
          <SubframeCore.Icon name="FeatherAlertCircle" className="text-neutral-400 mb-2" />
          <span className="text-body font-body text-neutral-500">No data available</span>
          <span className="text-caption font-caption text-neutral-400">Check back later or try a different time range</span>
        </div>
      </div>
    );
  }

  // Calculate min and max values for the y-axis
  const values = sortedData
    .map(d => d.value)
    .filter(v => !isNaN(v)); // Filter out NaN values
  
  if (values.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-neutral-50 rounded-md" 
        style={{ height: `${height}px`, width }}
      >
        <div className="flex flex-col items-center gap-2">
          <SubframeCore.Icon name="FeatherAlertCircle" className="text-neutral-400 mb-2" />
          <span className="text-body font-body text-neutral-500">Invalid data</span>
          <span className="text-caption font-caption text-neutral-400">The data contains invalid values</span>
        </div>
      </div>
    );
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;
  const yMin = minValue - valueRange * 0.1;
  const yMax = maxValue + valueRange * 0.1;

  // Normalize data points to fit in the chart
  const normalizedData = sortedData.map(point => ({
    x: new Date(point.date).getTime(),
    y: point.value,
    original: point,
  }));

  // Create the path for the line
  const createLinePath = () => {
    const xScale = (width === '100%' ? 1000 : parseInt(width)) / (normalizedData.length - 1);
    const yScale = height / (yMax - yMin);

    return normalizedData.map((point, i) => {
      const x = i * xScale;
      const y = height - (point.y - yMin) * yScale;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Create the path for the area under the line
  const createAreaPath = () => {
    const xScale = (width === '100%' ? 1000 : parseInt(width)) / (normalizedData.length - 1);
    const yScale = height / (yMax - yMin);
    const chartWidth = (width === '100%' ? 1000 : parseInt(width));

    const linePath = normalizedData.map((point, i) => {
      const x = i * xScale;
      const y = height - (point.y - yMin) * yScale;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return `${linePath} L ${chartWidth} ${height} L 0 ${height} Z`;
  };

  const linePath = createLinePath();
  const areaPath = createAreaPath();

  // Generate some axis ticks
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const value = yMin + (i * (yMax - yMin)) / 4;
    return {
      y: height - (i * height) / 4,
      value,
      label: valueFormatter(value),
    };
  });

  const xTicks = Array.from({ length: Math.min(7, sortedData.length) }, (_, i) => {
    const index = Math.floor((i * (sortedData.length - 1)) / Math.min(6, sortedData.length - 1));
    const point = sortedData[index];
    const xScale = (width === '100%' ? 1000 : parseInt(width)) / (sortedData.length - 1);
    
    return {
      x: index * xScale,
      label: dateFormatter(point.date),
      value: point.date,
    };
  });

  // Animation variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const areaVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.3,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-heading-3 font-heading-3 text-default-font">{title}</h3>}
          {subtitle && <p className="text-body font-body text-subtext-color">{subtitle}</p>}
        </div>
      )}
      
      <div className="relative" style={{ height: `${height}px`, width }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width === '100%' ? 1000 : width} ${height}`} preserveAspectRatio="none">
          {/* Grid lines */}
          {showGrid && (
            <g className="grid-lines">
              {yTicks.map((tick, i) => (
                <line
                  key={`y-grid-${i}`}
                  x1="0"
                  y1={tick.y}
                  x2="100%"
                  y2={tick.y}
                  stroke="var(--color-neutral-200)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}
            </g>
          )}

          {/* Area under the line */}
          <motion.path
            d={areaPath}
            fill={areaColor}
            opacity="0.3"
            variants={areaVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Data points */}
          {normalizedData.length <= 20 && normalizedData.map((point, i) => {
            const xScale = (width === '100%' ? 1000 : parseInt(width)) / (normalizedData.length - 1);
            const yScale = height / (yMax - yMin);
            const x = i * xScale;
            const y = height - (point.y - yMin) * yScale;

            return (
              <motion.circle
                key={`point-${i}`}
                cx={x}
                cy={y}
                r="4"
                fill={lineColor}
                stroke="white"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              />
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-neutral-500 py-2">
          {yTicks.map((tick, i) => (
            <div key={`y-label-${i}`} style={{ transform: `translateY(${tick.y - 10}px)` }}>
              {tick.label}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-neutral-500 pb-2">
          {xTicks.map((tick, i) => (
            <div key={`x-label-${i}`} style={{ transform: `translateX(${tick.x}px)` }}>
              {tick.label}
            </div>
          ))}
        </div>

        {/* Range selector if provided */}
        {timeRange && (
          <div className="absolute top-2 right-2 text-xs text-neutral-500 bg-white px-2 py-1 rounded-md border border-neutral-200">
            {timeRange}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSeriesChart; 