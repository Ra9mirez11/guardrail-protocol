'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const TiltCard = ({
  children,
  className = '',
  glare = true
}: {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.15
      });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {glare && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-30"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25), transparent 70%)`
          }}
        />
      )}
      {children}
    </motion.div>
  );
};
