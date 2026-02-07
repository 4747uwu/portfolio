// src/components/hero/MetricsDisplay.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MetricsDisplay = ({ metrics }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Parse numeric values from metric strings
  const parseMetricValue = (str) => {
    const match = str.match(/(\d+[\d,]*)/);
    if (!match) return 0;
    return parseInt(match[1].replace(/,/g, ''));
  };

  // Generate random wave data for graphs (consistent per render)
  const generateWaveData = (points = 20, seed = 0) => {
    const data = [];
    for (let i = 0; i < points; i++) {
      const t = i / points;
      const noise = Math.sin((i + seed) * 0.5) * 0.2;
      const value = 0.3 + t * 0.4 + noise;
      data.push(Math.max(0.1, Math.min(0.9, value)));
    }
    return data;
  };

  const waveData = generateWaveData(20, 42);

  return (
    <div ref={containerRef} className="mt-4 md:mt-6 lg:mt-8 space-y-3 md:space-y-4 lg:space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="space-y-3 md:space-y-4 lg:space-y-5"
      >
        {/* Title bar - responsive */}
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 lg:mb-6">
          <div className="w-8 md:w-10 lg:w-12 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
          <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wider">
            Performance Metrics
          </h4>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
        </div>

        {/* Users/Downloads Metric with animated bar */}
        {(metrics.users || metrics.engagement) && (
          <MetricCard
            label={metrics.users ? "ACTIVE USERS" : "USER ENGAGEMENT"}
            value={metrics.users || metrics.engagement}
            type="bar"
            isInView={isInView}
          />
        )}

        {/* Performance Metric with line graph */}
        {metrics.performance && (
          <MetricCard
            label="SYSTEM PERFORMANCE"
            value={metrics.performance}
            type="graph"
            graphData={waveData}
            isInView={isInView}
          />
        )}

        {/* Impact Metric with animated number */}
        {metrics.impact && (
          <MetricCard
            label="BUSINESS IMPACT"
            value={metrics.impact}
            type="number"
            isInView={isInView}
          />
        )}
      </motion.div>
    </div>
  );
};

const MetricCard = ({ label, value, type, graphData, isInView }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setProgress(1), 100);
    return () => clearTimeout(timer);
  }, [isInView]);

  // Extract percentage if present
  const percentMatch = value.match(/(\d+)%/);
  const percentage = percentMatch ? parseInt(percentMatch[1]) : 75;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 relative overflow-hidden group shadow-lg hover:shadow-xl transition-all hover:border-red-500/50"
      style={{
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-2 md:mb-3 relative z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse" />
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-200 tracking-[0.15em] md:tracking-[0.2em]">{label}</span>
        </div>
        <div className="h-px flex-1 mx-2 md:mx-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
      </div>

      {type === 'bar' && (
        <div className="mb-3 md:mb-4">
          <div className="bg-black/60 border border-white/20 h-5 md:h-6 rounded-full relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 relative rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${percentage}%` } : {}}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </motion.div>
            {/* Percentage label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] md:text-xs font-bold text-white/80">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      )}

      {type === 'graph' && graphData && (
        <div className="mb-3 md:mb-4 h-12 md:h-14 lg:h-16 relative bg-black/60 border border-white/20 rounded-lg md:rounded-xl p-1.5 md:p-2">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <defs>
              <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Grid */}
            {[...Array(5)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 10}
                x2="100"
                y2={i * 10}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Graph line */}
            <motion.polyline
              points={graphData.map((v, i) => `${(i / (graphData.length - 1)) * 100},${40 - v * 35}`).join(' ')}
              fill="none"
              stroke="url(#graphGradient)"
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
            />
            
            {/* Dots - responsive size */}
            {graphData.map((v, i) => (
              <motion.circle
                key={i}
                cx={(i / (graphData.length - 1)) * 100}
                cy={40 - v * 35}
                r="1.5"
                fill="#ef4444"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              />
            ))}
          </svg>
        </div>
      )}

      <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-tight font-normal relative z-10">{value}</p>
    </motion.div>
  );
};

export default MetricsDisplay;