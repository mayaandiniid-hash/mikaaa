'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import {
  EducationLevel,
  EDUCATION_LEVEL_OPTIONS,
} from '@/types/onboarding';
import { Education3DIcon } from './Education3DIcons';
import { playButtonClick } from '@/lib/audio/soundManager';

interface StepEducationLevelProps {
  initialValue?: EducationLevel;
  onSubmit: (level: EducationLevel) => void;
}

export function StepEducationLevel({
  initialValue = 'SMA',
  onSubmit,
}: StepEducationLevelProps) {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>(initialValue);

  const handleSelect = (level: EducationLevel) => {
    setSelectedLevel(level);
    playButtonClick();
  };

  const handleConfirm = () => {
    playButtonClick();
    onSubmit(selectedLevel);
  };

  return (
    <div className="w-full space-y-4">
      {/* 2-Column Grid of 3D Cards */}
      <div className="grid grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1 py-1 scrollbar-thin">
        {EDUCATION_LEVEL_OPTIONS.map((opt) => {
          const isSelected = selectedLevel === opt.id;
          return (
            <motion.button
              key={opt.id}
              id={`card-edu-${opt.id.toLowerCase()}`}
              type="button"
              onClick={() => handleSelect(opt.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className={`relative text-left p-3.5 rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-between min-h-[148px] ${
                isSelected
                  ? 'bg-gradient-to-b from-blue-50/90 to-indigo-50/90 border-2 border-blue-500 shadow-[0_12px_28px_rgba(59,130,246,0.22),0_0_0_1px_rgba(59,130,246,0.4)]'
                  : 'bg-white/90 backdrop-blur-md border-2 border-slate-100 hover:border-slate-200 shadow-[0_4px_14px_rgba(30,58,138,0.06)]'
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </motion.div>
              )}

              {/* Unique 3D Icon with Scale effect on Selection */}
              <motion.div
                animate={isSelected ? { scale: 1.08 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="my-1 flex items-center justify-center"
              >
                <Education3DIcon level={opt.id} size={58} />
              </motion.div>

              {/* Text Info */}
              <div className="w-full text-center mt-1">
                <span
                  className={`block text-base font-black tracking-tight leading-tight ${
                    isSelected ? 'text-blue-700' : 'text-slate-800'
                  }`}
                >
                  {opt.title}
                </span>
                <span className="block text-[11px] font-bold text-slate-500 leading-snug line-clamp-1 mt-0.5">
                  {opt.subtitle}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Button: Lanjut */}
      <motion.button
        id="btn-submit-education"
        type="button"
        onClick={handleConfirm}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97, y: 3 }}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-lg tracking-wide shadow-[0_8px_0_#312e81,0_16px_25px_rgba(79,70,229,0.35)] active:shadow-[0_2px_0_#312e81] transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
      >
        <span>Lanjut dengan Jenjang {selectedLevel}</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
