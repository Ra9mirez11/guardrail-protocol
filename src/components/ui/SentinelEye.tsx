'use client';
import React, { useEffect, useRef } from 'react';

export const SentinelEye = () => {
  const pupilRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pupilRef.current || !socketRef.current) return;
      const rect = socketRef.current.getBoundingClientRect();

      // Center of the eye on screen
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      // Distance from mouse to eye center
      const deltaX = e.clientX - eyeX;
      const deltaY = e.clientY - eyeY;

      // Angle calculation
      const angle = Math.atan2(deltaY, deltaX);

      // Maximum pupil movement radius in px
      const maxDistance = 6;
      const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY) / 15);

      const moveX = distance * Math.cos(angle);
      const moveY = distance * Math.sin(angle);

      pupilRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + distance / 20})`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hud-capsule select-none inline-flex items-center">
      {/* Brutal mechanical eye container */}
      <div className="cyber-eye-container">
        <div className="eye-socket" ref={socketRef}>
          {/* Pupil following the cursor */}
          <div className="eye-pupil" ref={pupilRef} />
        </div>
        {/* Rotating outer HUD scanner ring */}
        <div className="eye-scanner-ring" />
      </div>

      {/* Protected text inside capsule */}
      <span className="hud-text">Next-Gen Token-2022 Honeypot & Transfer Hook Sentinel</span>
    </div>
  );
};
