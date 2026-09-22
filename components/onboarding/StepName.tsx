'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, User } from 'lucide-react';
import { playButtonClick, playTypingSound } from '@/lib/audio/soundManager';

interface StepNameProps {
  initialValue?: string;
  onSubmit: (name: string) => void;
}

export function StepName({ initialValue = '', onSubmit }: StepNameProps) {
  const [name, setName] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input after slight delay so transition completes smoothly
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(t);
  }, []);

  const isValid = name.trim().length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValid) return;
    playButtonClick();
    onSubmit(name.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3.5">
      {/* Large Rounded Input Field */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <User className="w-6 h-6" />
        </div>
        <input
          ref={inputRef}
          id="input-user-name"
          type="text"
          value={name}
          maxLength={30}
          onChange={(e) => {
            setName(e.target.value);
            playTypingSound();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Tulis namamu..."
          className="w-full pl-13 pr-4 py-4 rounded-2xl bg-white text-slate-800 text-xl font-bold placeholder:text-slate-400 placeholder:font-semibold border-2 border-slate-200/80 shadow-[0_6px_16px_rgba(30,58,138,0.06)] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
        />
      </div>

      {/* Action Button: Selesai */}
      <motion.button
        id="btn-submit-name"
        type="submit"
        disabled={!isValid}
        whileHover={isValid ? { scale: 1.02 } : {}}
        whileTap={isValid ? { scale: 0.97, y: 3 } : {}}
        className={`w-full py-4 px-6 rounded-2xl font-black text-lg tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer select-none ${
          isValid
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_8px_0_#312e81,0_16px_25px_rgba(79,70,229,0.35)] active:shadow-[0_2px_0_#312e81]'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
        }`}
      >
        <Check className="w-5 h-5" />
        <span>Selesai</span>
      </motion.button>
    </form>
  );
}
