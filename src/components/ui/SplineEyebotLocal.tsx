'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

export const SplineEyebotLocal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize official Spline runtime
    const app = new Application(canvas);

    app.load('/eyebot.splinecode')
      .then(() => {
        setLoaded(true);

        // Global mouse movement forwarder so it tracks cursor ANYWHERE on screen
        const onGlobalMouseMove = (e: MouseEvent) => {
          if (!canvas) return;
          // Dispatch synthetic pointer/mouse event directly into canvas target
          const rect = canvas.getBoundingClientRect();
          const canvasX = e.clientX - rect.left;
          const canvasY = e.clientY - rect.top;

          const mouseEvent = new MouseEvent('mousemove', {
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
            bubbles: true,
            cancelable: true
          });
          canvas.dispatchEvent(mouseEvent);
        };

        window.addEventListener('mousemove', onGlobalMouseMove);

        return () => {
          window.removeEventListener('mousemove', onGlobalMouseMove);
        };
      })
      .catch((err) => {
        console.error('Failed to load Spline scene:', err);
      });

    return () => {
      app.dispose();
    };
  }, []);

  return (
    <div className="hud-capsule select-none inline-flex items-center gap-4 pr-6 pl-2.5 py-2 shadow-[0_0_30px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,255,170,0.25)] border border-[#00ffaa]/40 bg-[#020d09]/90 backdrop-blur-xl rounded-full">
      {/* 3D Eyebot Socket Container (Closer, prominent, high-res) */}
      <div 
        ref={containerRef}
        className="relative w-14 h-14 flex items-center justify-center flex-shrink-0"
      >
        {/* Rotating outer HUD scanner ring */}
        <div className="eye-scanner-ring pointer-events-none scale-110" />

        {/* 3D WebGL Canvas with Zoomed Close-up */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#00ffaa] shadow-[0_0_20px_rgba(0,255,170,0.6)] bg-[#05080f]">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover transform scale-[1.85] origin-center cursor-pointer"
          />
        </div>
      </div>

      {/* High-tech HUD text */}
      <span className="hud-text text-xs sm:text-sm tracking-wider font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(0,255,170,0.8)]">
        Next-Gen Token-2022 Honeypot & Transfer Hook Sentinel
      </span>
    </div>
  );
};
