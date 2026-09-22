'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Sparkles } from 'lucide-react';
import { EducationLevel, EDUCATION_LEVEL_OPTIONS } from '@/types/onboarding';
import { Education3DIcon } from './Education3DIcons';
import { playButtonClick, playSuccessSound } from '@/lib/audio/soundManager';

interface StepFinishProps {
  name: string;
  age: number;
  educationLevel: EducationLevel;
  onFinish: () => void;
}

export function StepFinish({
  name,
  age,
  educationLevel,
  onFinish,
}: StepFinishProps) {
  const selectedOption =
    EDUCATION_LEVEL_OPTIONS.find((o) => o.id === educationLevel) ||
    EDUCATION_LEVEL_OPTIONS[2];

  const handleStart = () => {
    playButtonClick();
    playSuccessSound();
    onFinish();
  };

  return (
    <div className="w-full space-y-4">
      {/* Profile Summary Card with 3D Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full rounded-3xl bg-gradient-to-br from-white/95 to-slate-50/95 p-4 border-2 border-indigo-100 shadow-[0_12px_32px_rgba(79,70,229,0.12)] flex items-center gap-4"
      >
        <div className="flex-shrink-0">
          <Education3DIcon level={educationLevel} size={64} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              Profil Pembelajar
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 truncate mt-1">
            {name}
          </h3>
          <p className="text-xs font-bold text-slate-500 mt-0.5">
            Usia {age} tahun • {selectedOption.subtitle} ({educationLevel})
          </p>
        </div>
      </motion.div>

      {/* Button: Mulai Sekarang */}
      <motion.button
        id="btn-mulai-sekarang"
        type="button"
        onClick={handleStart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97, y: 3 }}
        className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-lg tracking-wide shadow-[0_8px_0_#312e81,0_20px_35px_rgba(79,70,229,0.4)] active:shadow-[0_2px_0_#312e81] transition-all flex items-center justify-center gap-3 cursor-pointer select-none group"
      >
        <Rocket className="w-6 h-6 text-yellow-300 group-hover:-translate-y-1 transition-transform" />
        <span>Mulai Sekarang</span>
        <Sparkles className="w-5 h-5 text-cyan-200 animate-spin" />
      </motion.button>
    </div>
  );
}
