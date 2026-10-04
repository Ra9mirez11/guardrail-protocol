'use client';
import React, { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=';

export const EncryptedText = ({
  text,
  className = '',
  encryptedClassName = 'text-neutral-500',
  revealedClassName = 'text-white',
  revealDelayMs = 50,
  sequential = true,
}: {
  text: string;
  className?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
  sequential?: boolean;
}) => {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [revealedCount, setRevealedCount] = useState<number>(0);

  useEffect(() => {
    setRevealedCount(0);
    setDisplayText(
      text.split('').map((char) =>
        char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
      )
    );

    let currentRevealed = 0;
    const interval = setInterval(() => {
      currentRevealed += 1;
      setRevealedCount(currentRevealed);

      setDisplayText((prev) =>
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < currentRevealed) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );

      if (currentRevealed >= text.length) {
        clearInterval(interval);
      }
    }, revealDelayMs);

    return () => clearInterval(interval);
  }, [text, revealDelayMs]);

  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => {
        const isRevealed = index < revealedCount;
        return (
          <span
            key={index}
            className={isRevealed ? revealedClassName : encryptedClassName}
          >
            {displayText[index] || char}
          </span>
        );
      })}
    </span>
  );
};
