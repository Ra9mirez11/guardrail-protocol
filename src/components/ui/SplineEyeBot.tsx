'use client';
import React from 'react';

export const SplineEyeBot = () => {
  return (
    <div className="hud-capsule select-none inline-flex items-center gap-3.5 pr-6 pl-2 py-1.5">
      {/* 3D Spline Eyebot Container */}
      <div className="relative w-11 h-11 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border border-[#00ffaa]/40 shadow-[0_0_15px_rgba(0,255,170,0.3)] bg-black/60">
        <iframe
          src="https://my.spline.design/eyebot-KEAApwuAnqLb2vXiRUO5BJMj/"
          frameBorder="0"
          className="w-[160%] h-[160%] pointer-events-auto transform scale-110"
          style={{
            background: 'transparent',
            border: 'none',
          }}
          title="3D Spline Eyebot"
        />
      </div>

      {/* High-tech HUD text */}
      <span className="hud-text text-xs sm:text-sm">
        Next-Gen Token-2022 Honeypot & Transfer Hook Sentinel
      </span>
    </div>
  );
};
