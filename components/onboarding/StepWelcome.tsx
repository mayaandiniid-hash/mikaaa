'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { playButtonClick } from '@/lib/audio/soundManager';

interface StepWelcomeProps {
  onNext: () => void;
}

export function StepWelcome({ onNext }: StepWelcomeProps) {
  const handleClick = () => {
    playButtonClick();
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Pressed Big Action Button */}
      <motion.button
        id="btn-mulai-kenalan"
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97, y: 3 }}
        className="w-full relative group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white font-black text-lg tracking-wide shadow-[0_8px_0_#1e3a8a,0_16px_25px_rgba(6,182,212,0.35)] active:shadow-[0_2px_0_#1e3a8a,0_6px_12px_rgba(6,182,212,0.25)] transition-all flex items-center justify-center gap-3 cursor-pointer select-none"
      >
        <HeartHandshake className="w-5 h-5 text-cyan-200 animate-pulse" />
        <span>Yuk Kenalan Dulu!</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
      </motion.button>
    </div>
  );
}
