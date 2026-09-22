'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BlueBirdProps {
  step: number;
  isInitialFlyIn?: boolean;
  onFlyInComplete?: () => void;
  className?: string;
  size?: number;
}

export function BlueBird({
  step,
  isInitialFlyIn = false,
  onFlyInComplete,
  className = '',
  size = 110,
}: BlueBirdProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [wingFlap, setWingFlap] = useState(false);

  // Natural blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, []);

  // Flap wings on step change
  useEffect(() => {
    const tStart = setTimeout(() => {
      setWingFlap(true);
    }, 20);
    const tEnd = setTimeout(() => {
      setWingFlap(false);
    }, 800);
    return () => {
      clearTimeout(tStart);
      clearTimeout(tEnd);
    };
  }, [step]);

  return (
    <motion.div
      id="onboarding-blue-bird-mascot"
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      initial={
        isInitialFlyIn
          ? { x: -140, y: 30, scale: 0.7, rotate: 12, opacity: 0 }
          : { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
      }
      animate={
        isInitialFlyIn
          ? {
              x: 0,
              y: 0,
              scale: 1,
              rotate: [12, -4, 2, 0],
              opacity: 1,
              transition: {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              },
            }
          : {
              x: [0, step % 2 === 0 ? 3 : -3, 0],
              y: [0, -6, 0],
              rotate: [0, step % 2 === 0 ? 1.5 : -1.5, 0],
              transition: {
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
      }
      onAnimationComplete={() => {
        if (isInitialFlyIn && onFlyInComplete) {
          onFlyInComplete();
        }
      }}
    >
      {/* 3D Blue Bird Character SVG */}
      <div style={{ width: size, height: size * 0.95 }} className="relative">
        <svg
          viewBox="0 0 160 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(37,99,235,0.28)]"
        >
          <defs>
            {/* 3D Body Gradient */}
            <radialGradient id="bird-body-3d" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="75%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>

            {/* Belly Patch Gradient */}
            <radialGradient id="bird-belly" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </radialGradient>

            {/* Wing 3D Gradient */}
            <linearGradient id="bird-wing-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            {/* Beak Gradient */}
            <linearGradient id="bird-beak" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="40%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Cheek Blush */}
            <radialGradient id="bird-blush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>

            {/* Eye Iris Gradient */}
            <radialGradient id="bird-eye-iris" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>

          {/* Crest Feather (Head Tuft) with gentle sway */}
          <g>
            <path
              d="M74 24 C72 8, 86 6, 92 12 C96 16, 90 26, 80 28 Z"
              fill="#38bdf8"
            />
            <path
              d="M66 26 C62 14, 73 12, 78 17 C81 20, 76 28, 70 28 Z"
              fill="#7dd3fc"
            />
          </g>

          {/* Tail Feathers */}
          <g>
            <path
              d="M26 82 C14 86, 8 98, 12 108 C16 114, 28 108, 38 98 Z"
              fill="#0369a1"
            />
            <path
              d="M28 76 C18 78, 14 88, 18 96 C22 100, 32 94, 40 88 Z"
              fill="#0284c7"
            />
          </g>

          {/* Main Rounded 3D Body */}
          <ellipse cx="80" cy="78" rx="46" ry="44" fill="url(#bird-body-3d)" />

          {/* Soft 3D Specular Highlight on Head */}
          <ellipse
            cx="66"
            cy="46"
            rx="18"
            ry="11"
            transform="rotate(-25 66 46)"
            fill="#ffffff"
            opacity="0.32"
          />

          {/* Soft Fluffy Belly */}
          <path
            d="M62 66 C62 52, 98 52, 102 68 C106 82, 98 106, 78 106 C60 106, 58 86, 62 66 Z"
            fill="url(#bird-belly)"
          />

          {/* Rosy Cheek Blush */}
          <circle cx="58" cy="80" r="10" fill="url(#bird-blush)" />
          <circle cx="108" cy="80" r="10" fill="url(#bird-blush)" />

          {/* Left Wing */}
          <g
            transform={
              wingFlap
                ? 'translate(28, 62) rotate(-16)'
                : 'translate(30, 68) rotate(4)'
            }
            className="transition-transform duration-300"
          >
            <path
              d="M0 0 C12 -6, 26 2, 28 14 C30 26, 18 36, 4 34 C-4 32, -8 10, 0 0 Z"
              fill="url(#bird-wing-grad)"
              stroke="#0369a1"
              strokeWidth="1.2"
            />
            {/* Wing Feather Line */}
            <path
              d="M6 10 C14 8, 20 14, 20 22"
              stroke="#7dd3fc"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Right Wing (Folded on Side) */}
          <g
            transform={
              wingFlap
                ? 'translate(100, 62) rotate(16)'
                : 'translate(98, 68) rotate(-4)'
            }
            className="transition-transform duration-300"
          >
            <path
              d="M0 4 C8 -4, 22 -4, 26 8 C28 18, 16 32, 4 32 C-2 32, -6 16, 0 4 Z"
              fill="url(#bird-wing-grad)"
              stroke="#0369a1"
              strokeWidth="1.2"
            />
          </g>

          {/* Cute Beak */}
          <g>
            <path
              d="M74 72 Q82 66 90 72 Q82 85 74 72 Z"
              fill="url(#bird-beak)"
              stroke="#c2410c"
              strokeWidth="1"
            />
            {/* Beak Highlight */}
            <path
              d="M77 71 Q82 68 87 71"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* Expressive Glossy Eyes */}
          {/* Left Eye */}
          <g>
            {isBlinking ? (
              <path
                d="M58 64 Q66 70 72 64"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <>
                <ellipse cx="64" cy="62" rx="7.5" ry="9" fill="url(#bird-eye-iris)" />
                {/* Specular Main Eye Reflection */}
                <circle cx="62" cy="59" r="3.2" fill="#ffffff" />
                {/* Secondary Cute Twinkle */}
                <circle cx="67" cy="65" r="1.5" fill="#ffffff" opacity="0.9" />
              </>
            )}
          </g>

          {/* Right Eye */}
          <g>
            {isBlinking ? (
              <path
                d="M92 64 Q100 70 106 64"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <>
                <ellipse cx="98" cy="62" rx="7.5" ry="9" fill="url(#bird-eye-iris)" />
                {/* Specular Main Eye Reflection */}
                <circle cx="96" cy="59" r="3.2" fill="#ffffff" />
                {/* Secondary Cute Twinkle */}
                <circle cx="101" cy="65" r="1.5" fill="#ffffff" opacity="0.9" />
              </>
            )}
          </g>

          {/* Cute Little Feet */}
          <g>
            <ellipse cx="70" cy="120" rx="6" ry="3.5" fill="#ea580c" />
            <ellipse cx="92" cy="120" rx="6" ry="3.5" fill="#ea580c" />
          </g>
        </svg>
      </div>

      {/* Dynamic 3D Ground Shadow that stays synchronized with float */}
      <motion.div
        className="h-2 rounded-full bg-slate-900/15 blur-[2px] mt-[-4px]"
        animate={{
          width: [size * 0.55, size * 0.45, size * 0.55],
          opacity: [0.25, 0.15, 0.25],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
