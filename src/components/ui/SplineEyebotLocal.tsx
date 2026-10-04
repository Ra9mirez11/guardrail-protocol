'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

export const SplineEyebotLocal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const app = new Application(canvas);
    
    // Load the 100% self-hosted exact Spline file
    app.load('/eyebot.splinecode')
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load Spline scene:', err);
      });

    return () => {
      app.dispose();
    };
  }, []);

  return (
    <div className="hud-capsule select-none inline-flex items-center gap-3.5 pr-6 pl-2 py-1.5 shadow-[0_0_25px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,255,170,0.2)]">
      {/* Exact 3D Spline Eyebot Socket */}
      <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
        {/* Rotating outer HUD scanner ring */}
        <div className="eye-scanner-ring pointer-events-none" />

        {/* 3D Canvas Mount */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-[#00ffaa]/50 shadow-[0_0_15px_rgba(0,255,170,0.4)] bg-[#07090f]">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{ width: '48px', height: '48px' }}
          />
        </div>
      </div>

      {/* High-tech HUD text */}
      <span className="hud-text text-xs sm:text-sm tracking-wide">
        Next-Gen Token-2022 Honeypot & Transfer Hook Sentinel
      </span>
    </div>
  );
};
