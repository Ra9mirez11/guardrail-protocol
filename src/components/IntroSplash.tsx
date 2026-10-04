'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING ZERO-TRUST KERNEL...');
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Progress bar and status animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 2;
        if (next > 30 && next < 60) {
          setStatusText('SCANNING ON-CHAIN INVARIANTS...');
        } else if (next >= 60 && next < 90) {
          setStatusText('DECOMPILING TOKEN-2022 TLV BYTES...');
        } else if (next >= 90) {
          setStatusText('FIREWALL READY - ENTERING RADAR...');
        }
        return next;
      });
    }, 60);

    // Auto dismiss after 3.6s if video ends or fallback
    const timer = setTimeout(() => {
      handleDismiss();
    }, 3800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020306] overflow-hidden select-none"
        >
          {/* Ambient Cybernetic Lighting Backdrop */ }
          <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-transparent to-black pointer-events-none" />

          {/* Video Container with Holographic Border & Glow */ }
          <div className="relative w-full max-w-4xl px-4 flex flex-col items-center justify-center">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.35)] bg-black/80 max-h-[70vh] flex items-center justify-center">
              <video
                ref={videoRef}
                src="/intro.mp4"
                autoPlay
                muted
                playsInline
                onEnded={handleDismiss}
                className="w-full h-auto max-h-[65vh] object-cover rounded-2xl"
              />
              {/* Scanline Overlay Effect */ }
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            </div>

            {/* Cybernetic Progress & Scanning Bar */ }
            <div className="w-full max-w-md mt-6 space-y-2 text-center">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {statusText}
                </span>
                <span className="text-slate-400">{progress}%</span>
              </div>

              <div className="w-full bg-slate-900/90 rounded-full h-1.5 p-0.5 border border-white/[0.08] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_15px_#10B981]"
                  style={{ width: progress + '%' }}
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDismiss}
                  className="text-[11px] font-mono text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-widest cursor-pointer px-4 py-1 rounded-full bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05]"
                >
                  [ CLICK TO SKIP INTRO ]
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}