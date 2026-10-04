'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';

export const SplineEyebotLocal = () => {
  return (
    <div className="hud-capsule select-none inline-flex items-center gap-3 pr-6 pl-2 py-1.5 shadow-[0_0_30px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,255,170,0.25)] border border-[#00ffaa]/40 bg-[#020d09]/90 backdrop-blur-xl rounded-full">
      {/* 3D Official Spline Eyebot Container */}
      <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
        {/* Rotating outer HUD scanner ring */}
        <div className="eye-scanner-ring pointer-events-none scale-110" />

        {/* Official Spline WebGL Canvas Container */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#00ffaa] shadow-[0_0_20px_rgba(0,255,170,0.6)] bg-black">
          <div className="w-[180px] h-[180px] flex items-center justify-center pointer-events-auto flex-shrink-0">
            <Spline
              scene="https://prod.spline.design/mXqe5dtdxrvDtI9q/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* High-tech HUD text */}
      <span className="hud-text text-xs sm:text-sm tracking-wider font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(0,255,170,0.8)]">
        Next-Gen Token-2022 Honeypot & Transfer Hook Sentinel
      </span>
    </div>
  );
};
