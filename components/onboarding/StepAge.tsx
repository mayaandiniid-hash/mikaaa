'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, Check } from 'lucide-react';
import { playButtonClick, playCounterTick } from '@/lib/audio/soundManager';

interface StepAgeProps {
  initialValue?: number;
  onSubmit: (age: number) => void;
}

export function StepAge({ initialValue = 16, onSubmit }: StepAgeProps) {
  const [age, setAge] = useState(initialValue);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  const minAge = 5;
  const maxAge = 100;

  const handleDecrement = () => {
    if (age > minAge) {
      setDirection('down');
      const next = age - 1;
      setAge(next);
      playCounterTick(450 + next * 8);
    }
  };

  const handleIncrement = () => {
    if (age < maxAge) {
      setDirection('up');
      const next = age + 1;
      setAge(next);
      playCounterTick(520 + next * 8);
    }
  };

  const handlePresetSelect = (presetAge: number) => {
    setDirection(presetAge > age ? 'up' : 'down');
    setAge(presetAge);
    playCounterTick(600);
  };

  const handleSubmit = () => {
    playButtonClick();
    onSubmit(age);
  };

  return (
    <div className="w-full space-y-4">
      {/* 3D Interactive Numeric Selector Card */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_10px_30px_rgba(30,58,138,0.08)] border-2 border-slate-100 flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Pilih Usia (5 - 100 Tahun)
        </span>

        {/* Counter controls */}
        <div className="flex items-center justify-center gap-6 my-2">
          {/* Minus Button */}
          <motion.button
            id="btn-age-minus"
            type="button"
            onClick={handleDecrement}
            disabled={age <= minAge}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92, y: 2 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl transition-all select-none ${
              age > minAge
                ? 'bg-blue-100 text-blue-700 shadow-[0_4px_0_#93c5fd] active:shadow-[0_1px_0_#93c5fd] hover:bg-blue-200 cursor-pointer'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            <Minus className="w-7 h-7 stroke-[3]" />
          </motion.button>

          {/* Large Animated Number Center Display */}
          <div className="relative w-28 h-24 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={age}
                custom={direction}
                initial={{
                  y: direction === 'up' ? 26 : -26,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 24,
                  },
                }}
                exit={{
                  y: direction === 'up' ? -26 : 26,
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.15 },
                }}
                className="flex items-baseline gap-1"
              >
                <span className="text-5xl font-black tracking-tight text-slate-800 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
                  {age}
                </span>
                <span className="text-sm font-bold text-slate-400">thn</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Plus Button */}
          <motion.button
            id="btn-age-plus"
            type="button"
            onClick={handleIncrement}
            disabled={age >= maxAge}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92, y: 2 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl transition-all select-none ${
              age < maxAge
                ? 'bg-blue-600 text-white shadow-[0_4px_0_#1d4ed8] active:shadow-[0_1px_0_#1d4ed8] hover:bg-blue-700 cursor-pointer'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            <Plus className="w-7 h-7 stroke-[3]" />
          </motion.button>
        </div>

        {/* Quick age preset chips */}
        <div className="flex items-center gap-1.5 mt-2">
          {[
            { label: 'SD (10)', val: 10 },
            { label: 'SMP (14)', val: 14 },
            { label: 'SMA (17)', val: 17 },
            { label: 'Kuliah (20)', val: 20 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetSelect(preset.val)}
              className={`text-xs font-bold py-1.5 px-2.5 rounded-xl transition-all ${
                age === preset.val
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Button: Selesai */}
      <motion.button
        id="btn-submit-age"
        type="button"
        onClick={handleSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97, y: 3 }}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-lg tracking-wide shadow-[0_8px_0_#312e81,0_16px_25px_rgba(79,70,229,0.35)] active:shadow-[0_2px_0_#312e81] transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
      >
        <Check className="w-5 h-5" />
        <span>Selesai</span>
      </motion.button>
    </div>
  );
}
