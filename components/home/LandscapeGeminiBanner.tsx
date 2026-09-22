'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GeminiStarLogo } from '@/components/gemini/GeminiStarLogo';
import { playSuccessSound } from '@/lib/audio/soundManager';

interface LandscapeGeminiBannerProps {
  onTapStar?: () => void;
}

export function LandscapeGeminiBanner({ onTapStar }: LandscapeGeminiBannerProps) {
  const [clicked, setClicked] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);

  const handleStarClick = () => {
    playSuccessSound();
    setClicked(true);
    const messages = [
      'Semangat belajarnya hari ini! ✨',
      'Keren! Pertahankan streakmu! 🌟',
      'Gemini Star siap menemanimu! 🚀',
      'Yuk selesaikan challenge hari ini! 🏆',
    ];
    setSpeech(messages[Math.floor(Math.random() * messages.length)]);
    if (onTapStar) onTapStar();

    setTimeout(() => {
      setClicked(false);
    }, 400);

    setTimeout(() => {
      setSpeech(null);
    }, 3200);
  };

  return (
    <div className="relative w-full h-48 sm:h-52 rounded-[28px] overflow-hidden shadow-[0_8px_24px_rgba(79,70,229,0.08)] border border-sky-100/80 bg-gradient-to-b from-[#B8E6FE] via-[#D5F0FD] to-[#E9F7FE] select-none">
      {/* 1. Fluffy Floating Sky Clouds */}
      <motion.div
        animate={{ x: [-15, 20, -15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 left-4 w-16 h-7 bg-white/80 rounded-full blur-[0.5px] pointer-events-none"
      >
        <div className="absolute -top-3 left-3 w-8 h-8 bg-white/90 rounded-full" />
        <div className="absolute -top-1 left-7 w-6 h-6 bg-white/85 rounded-full" />
      </motion.div>

      <motion.div
        animate={{ x: [20, -25, 20] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 right-6 w-20 h-7 bg-white/75 rounded-full blur-[0.5px] pointer-events-none"
      >
        <div className="absolute -top-3.5 left-4 w-9 h-9 bg-white/85 rounded-full" />
        <div className="absolute -top-1.5 left-10 w-7 h-7 bg-white/80 rounded-full" />
      </motion.div>

      {/* 2. Soft Scenic Rolling Green Hills and Trees Background */}
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Distant Hills (Pastel Green-Teal) */}
        <path
          d="M -20 160 Q 90 100, 200 135 T 420 120 L 420 200 L -20 200 Z"
          fill="#86EFAC"
          opacity="0.45"
        />

        {/* Midground Hill with Trees */}
        <path
          d="M -10 170 Q 110 125, 240 150 T 420 145 L 420 200 L -10 200 Z"
          fill="#4ADE80"
          opacity="0.75"
        />

        {/* Foreground Lush Green Hill */}
        <path
          d="M -20 175 Q 120 145, 200 155 Q 310 140, 420 175 L 420 200 L -20 200 Z"
          fill="#22C55E"
          opacity="0.9"
        />

        {/* Foreground Warm Grass Mound */}
        <path
          d="M -10 190 Q 180 168, 420 188 L 420 200 L -10 200 Z"
          fill="#16A34A"
          opacity="0.95"
        />

        {/* Left Side Tree */}
        <rect x="38" y="130" width="6" height="24" rx="2" fill="#78350F" />
        <circle cx="41" cy="120" r="16" fill="#15803D" />
        <circle cx="34" cy="118" r="12" fill="#16A34A" />
        <circle cx="48" cy="116" r="13" fill="#22C55E" />

        {/* Distant Left Tree */}
        <rect x="74" y="140" width="4" height="16" rx="1.5" fill="#78350F" />
        <circle cx="76" cy="132" r="10" fill="#16A34A" />
        <circle cx="81" cy="130" r="9" fill="#4ADE80" />

        {/* Right Side Tree */}
        <rect x="352" y="126" width="7" height="26" rx="2" fill="#78350F" />
        <circle cx="355" cy="114" r="18" fill="#15803D" />
        <circle cx="347" cy="112" r="14" fill="#16A34A" />
        <circle cx="363" cy="110" r="14" fill="#22C55E" />

        {/* Distant Right Tree */}
        <rect x="320" y="136" width="5" height="18" rx="1.5" fill="#78350F" />
        <circle cx="322" cy="128" r="11" fill="#16A34A" />
      </svg>

      {/* 3. Floating Speech Bubble when Gemini Star is tapped */}
      {speech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.8 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-indigo-100 flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-black text-slate-800 tracking-tight">
            {speech}
          </span>
        </motion.div>
      )}

      {/* 4. Centerpiece: Glowing Animated Color-Shifting Gemini Star */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 z-20 pointer-events-auto">
        <motion.div
          onClick={handleStarClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          animate={{
            y: [0, -8, 0],
            rotate: clicked ? [0, 15, -15, 0] : [0, 1.5, 0, -1.5, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="cursor-pointer relative flex flex-col items-center"
        >
          <GeminiStarLogo
            size="banner"
            showRays={true}
            withParticles={true}
          />
        </motion.div>

        {/* Subtle ground shadow beneath the hovering star */}
        <div className="w-16 h-2 bg-emerald-950/20 rounded-full blur-[2px] mt-0.5" />
      </div>
    </div>
  );
}
