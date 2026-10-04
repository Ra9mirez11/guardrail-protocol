'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const HoloGauge = ({ score }: { score: number }) => {
  const isSafe = score <= 20;
  const isWarn = score > 20 && score < 70;
  
  const strokeColor = isSafe ? '#10B981' : isWarn ? '#F59E0B' : '#F43F5E';
  const glowShadow = isSafe 
    ? 'drop-shadow(0 0 16px rgba(16,185,129,0.7))' 
    : isWarn 
    ? 'drop-shadow(0 0 16px rgba(245,158,11,0.7))' 
    : 'drop-shadow(0 0 16px rgba(244,63,94,0.7))';

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      {/* Outer Rotating Halo */}
      <div 
        className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_30s_linear_infinite]" 
      />
      {/* Background radial glow */}
      <div 
        className="absolute w-28 h-28 rounded-full blur-2xl opacity-40 transition-colors duration-500"
        style={{ background: strokeColor }}
      />

      <svg className="w-full h-full -rotate-90 transform" style={{ filter: glowShadow }}>
        <circle
          cx="88"
          cy="88"
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
          fill="transparent"
        />
        <motion.circle
          cx="88"
          cy="88"
          r={radius}
          stroke={strokeColor}
          strokeWidth="10"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      {/* Center Volumetric Score */}
      <div className="absolute flex flex-col items-center justify-center text-center font-mono">
        <span className="text-xs text-slate-400 font-semibold tracking-widest uppercase">INDEX</span>
        <motion.span 
          key={score}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-black text-white tracking-tight"
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-slate-500 uppercase">/ 100</span>
      </div>
    </div>
  );
};
