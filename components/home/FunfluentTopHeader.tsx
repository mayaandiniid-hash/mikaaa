'use client';

import React from 'react';
import { Volume2, VolumeX, Plus } from 'lucide-react';
import { playButtonClick } from '@/lib/audio/soundManager';

interface FunfluentTopHeaderProps {
  level?: number;
  progressPercent?: number;
  coins: number;
  language?: string;
  soundActive: boolean;
  onToggleSound: () => void;
  onAddCoins?: () => void;
  onToggleLang?: () => void;
}

export function FunfluentTopHeader({
  level = 2,
  progressPercent = 65,
  coins = 28,
  language = 'ENG',
  soundActive,
  onToggleSound,
  onAddCoins,
  onToggleLang,
}: FunfluentTopHeaderProps) {
  return (
    <header className="w-full pt-1.5 pb-2 px-1 select-none">
      {/* 1. Status Bar with iPhone Notch / Dynamic Island */}
      <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 text-slate-800 text-xs font-bold">
        <span>9:41</span>
        <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-between px-2.5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-slate-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="font-extrabold tracking-tighter">LTE</span>
          <div className="w-5 h-2.5 border border-slate-700 rounded-xs p-[1px] flex items-center">
            <div className="w-full h-full bg-slate-800 rounded-xs" />
          </div>
        </div>
      </div>

      {/* 2. Top Badges Row (Exact reproduction of Foto 2) */}
      <div className="w-full flex items-center justify-between mt-1 px-1">
        {/* Left: Level 2 Pill with Orange Level Badge & Progress Bar */}
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-100">
          {/* Level Circle */}
          <div className="w-5 h-5 rounded-full bg-[#E5832E] text-white flex items-center justify-center font-black text-[11px] shadow-sm">
            {level}
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-black text-slate-800 leading-none">
              Level {level}
            </span>
            {/* Orange progress bar underneath */}
            <div className="w-12 h-1.5 bg-orange-100 rounded-full overflow-hidden mt-0.5">
              <div
                className="h-full bg-[#E5832E] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Coin Counter Pill + Language Pill */}
        <div className="flex items-center gap-2">
          {/* Audio toggle button (subtle) */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label="Toggle Sound"
            className="w-7 h-7 rounded-full bg-white/90 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs border border-slate-100 cursor-pointer"
          >
            {soundActive ? (
              <Volume2 className="w-3.5 h-3.5 text-orange-500" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Coin Pill with + and Gold Coin Icon */}
          <button
            type="button"
            onClick={() => {
              playButtonClick();
              if (onAddCoins) onAddCoins();
            }}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-100 hover:bg-orange-50 transition-colors cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 flex items-center justify-center shadow-xs font-black text-[10px]">
              🪙
            </div>
            <div className="flex items-center text-[#E5832E] font-black text-xs gap-0.5">
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>{coins}</span>
            </div>
          </button>

          {/* Language / Curriculum Pill: 🇬🇧 ENG or 🇮🇩 IDN */}
          <button
            type="button"
            onClick={() => {
              playButtonClick();
              if (onToggleLang) onToggleLang();
            }}
            className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span className="text-xs">{language === 'ENG' ? '🇬🇧' : '🇮🇩'}</span>
            <span className="text-[11px] font-black text-slate-700 tracking-tight">
              {language}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
