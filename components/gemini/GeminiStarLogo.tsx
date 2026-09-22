'use client';

import React from 'react';
import { motion } from 'motion/react';

interface GeminiStarLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'banner';
  className?: string;
  showRays?: boolean;
  withParticles?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export function GeminiStarLogo({
  size = 'hero',
  className = '',
  showRays = true,
  withParticles = true,
  interactive = false,
  onClick,
}: GeminiStarLogoProps) {
  // Dimensions
  const dimension = {
    sm: { box: 'w-12 h-12', svg: 48, core: 34 },
    md: { box: 'w-20 h-20', svg: 80, core: 56 },
    lg: { box: 'w-28 h-28', svg: 112, core: 80 },
    hero: { box: 'w-44 h-44 sm:w-52 sm:h-52', svg: 180, core: 130 },
    banner: { box: 'w-32 h-32 sm:w-36 sm:h-36', svg: 140, core: 98 },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none ${dimension.box} ${
        interactive ? 'cursor-pointer active:scale-95 transition-transform' : ''
      } ${className}`}
    >
      {/* 1. Pulsing Ambient Colored Glow Aura */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.55, 0.9, 0.55],
          filter: [
            'hue-rotate(0deg) blur(24px)',
            'hue-rotate(180deg) blur(32px)',
            'hue-rotate(360deg) blur(24px)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 pointer-events-none -z-10"
      />

      {/* 2. Secondary soft radial core glow */}
      <motion.div
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-3/4 h-3/4 rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-purple-400 blur-xl pointer-events-none -z-10"
      />

      {/* 3. Rotating Star Rays & Cosmic Prismatic Sparkles */}
      {showRays && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Subtle celestial cross rays */}
          <div className="absolute w-[140%] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent blur-[0.5px]" />
          <div className="absolute h-[140%] w-[1.5px] bg-gradient-to-b from-transparent via-purple-300/60 to-transparent blur-[0.5px]" />
          <div className="absolute w-[120%] h-[1px] rotate-45 bg-gradient-to-r from-transparent via-pink-300/50 to-transparent blur-[0.5px]" />
          <div className="absolute w-[120%] h-[1px] -rotate-45 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent blur-[0.5px]" />
        </motion.div>
      )}

      {/* 4. Floating & Twinkling Sparkle Particles */}
      {withParticles && (
        <>
          <motion.div
            animate={{
              y: [-4, -14, -4],
              x: [-4, 6, -4],
              opacity: [0.2, 1, 0.2],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 right-4 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b] pointer-events-none"
          />
          <motion.div
            animate={{
              y: [6, -8, 6],
              x: [6, -4, 6],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{ duration: 3.2, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [0.5, 1.4, 0.5],
              opacity: [0.1, 0.9, 0.1],
            }}
            transition={{ duration: 2.2, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 left-3 w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_6px_#ec4899] pointer-events-none"
          />
        </>
      )}

      {/* 5. Main Gemini Star 4-Pointed Emblem with Prismatic Animated Color Shift */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0, -2, 0],
          filter: [
            'drop-shadow(0 0 16px rgba(6,182,212,0.7)) drop-shadow(0 0 32px rgba(147,51,234,0.4))',
            'drop-shadow(0 0 20px rgba(236,72,153,0.7)) drop-shadow(0 0 36px rgba(59,130,246,0.5))',
            'drop-shadow(0 0 18px rgba(245,158,11,0.7)) drop-shadow(0 0 32px rgba(6,182,212,0.4))',
            'drop-shadow(0 0 16px rgba(6,182,212,0.7)) drop-shadow(0 0 32px rgba(147,51,234,0.4))',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-w-[90%] max-h-[90%]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Prismatic Shifting Linear Gradients */}
            <linearGradient id="geminiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4">
                <animate
                  attributeName="stop-color"
                  values="#4285F4;#9333EA;#EC4899;#F59E0B;#06B6D4;#4285F4"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="35%" stopColor="#9333EA">
                <animate
                  attributeName="stop-color"
                  values="#9333EA;#EC4899;#F59E0B;#06B6D4;#4285F4;#9333EA"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="70%" stopColor="#06B6D4">
                <animate
                  attributeName="stop-color"
                  values="#06B6D4;#4285F4;#9333EA;#EC4899;#F59E0B;#06B6D4"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#F59E0B">
                <animate
                  attributeName="stop-color"
                  values="#F59E0B;#06B6D4;#4285F4;#9333EA;#EC4899;#F59E0B"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* Core Shimmer Radial Gradient */}
            <radialGradient id="geminiCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="45%" stopColor="#E0F2FE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
            </radialGradient>

            {/* Specular White Highlight Overlay */}
            <linearGradient id="geminiHighlight" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Authentic Gemini 4-Pointed Star Shape */}
          {/* Path curves inward symmetrically to form the iconic star */}
          <path
            d="M 50 2 
               C 50 28, 72 50, 98 50 
               C 72 50, 50 72, 50 98 
               C 50 72, 28 50, 2 50 
               C 28 50, 50 28, 50 2 Z"
            fill="url(#geminiGrad1)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.2"
          />

          {/* Inner Light Core Accent for Depth and Radiance */}
          <path
            d="M 50 14 
               C 50 34, 66 50, 86 50 
               C 66 50, 50 66, 50 86 
               C 50 66, 34 50, 14 50 
               C 34 50, 50 34, 50 14 Z"
            fill="url(#geminiHighlight)"
            opacity="0.65"
          />

          {/* Central Bright Star Diamond Sparkle */}
          <circle cx="50" cy="50" r="16" fill="url(#geminiCoreGrad)" />
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" />

          {/* Tiny sparkling star burst at center */}
          <path
            d="M 50 40 L 52 48 L 60 50 L 52 52 L 50 60 L 48 52 L 40 50 L 48 48 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
        </svg>
      </motion.div>
    </div>
  );
}
