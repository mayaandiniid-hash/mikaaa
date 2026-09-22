'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
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
        className="w-full relative group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-lg tracking-wide shadow-[0_8px_0_#312e81,0_16px_25px_rgba(79,70,229,0.35)] active:shadow-[0_2px_0_#312e81,0_6px_12px_rgba(79,70,229,0.25)] transition-all flex items-center justify-center gap-3 cursor-pointer select-none"
      >
        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
        <span>Mulai Kenalan</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
}
