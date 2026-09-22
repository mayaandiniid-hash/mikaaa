'use client';

import React, { useEffect, useState, useRef } from 'react';
import { playCounterTick } from '@/lib/audio/soundManager';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatter?: (n: number) => string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 600,
  formatter = (n) => n.toLocaleString('id-ID'),
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startVal = prevValueRef.current;
    const endVal = value;

    if (startVal === endVal) {
      setDisplayValue(endVal);
      return;
    }

    // Trigger rapid mechanical rolling tick sound
    playCounterTick();

    const diff = endVal - startVal;
    const startTime = performance.now();
    let animFrameId: number;

    const updateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + diff * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(updateValue);
      } else {
        prevValueRef.current = endVal;
      }
    };

    animFrameId = requestAnimationFrame(updateValue);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {formatter(displayValue)}
      {suffix}
    </span>
  );
}
