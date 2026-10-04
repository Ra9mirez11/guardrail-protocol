'use client';
import React from 'react';

export const BackgroundBeams = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030407]">
      {/* Deep Space Radial Aurora Glows */}
      <div className="absolute top-[-20%] left-[20%] w-[800px] h-[500px] rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent blur-[140px] animate-pulse" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-l from-indigo-500/10 via-purple-500/5 to-transparent blur-[160px]" />
      <div className="absolute bottom-[-10%] left-[5%] w-[700px] h-[400px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-transparent blur-[150px]" />

      {/* Cyber Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.18]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 60% at 50% 20%, #000 60%, transparent 100%)'
        }}
      />
    </div>
  );
};
