'use client';

import React from 'react';
import {
  Home,
  BookOpen,
  Zap,
  Bot,
  User,
} from 'lucide-react';
import { playButtonClick } from '@/lib/audio/soundManager';

export type NavTab = 'home' | 'subjects' | 'game' | 'rewards' | 'profile';

interface BottomNavBarProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  pendingRewardsCount?: number;
}

export function BottomNavBar({
  activeTab,
  onChangeTab,
  pendingRewardsCount = 0,
}: BottomNavBarProps) {
  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'subjects', label: 'Pelajaran', icon: BookOpen },
    { id: 'game', label: 'Game', icon: Zap },
    { id: 'rewards', label: 'Hadiah WA', icon: Bot },
    { id: 'profile', label: 'Akun', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none pb-safe">
      {/* Gradient Blur Ambient Glow behind the bar */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sky-200/60 via-indigo-100/30 to-transparent pointer-events-none -z-10" />

      {/* Floating Bottom Nav Container with frosted glass blur */}
      <nav
        aria-label="Navigasi Utama"
        className="w-full max-w-[440px] px-3 pb-2 pt-1 pointer-events-auto"
      >
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-white/70 shadow-[0_-8px_25px_rgba(30,58,138,0.12)] p-1.5 flex items-center justify-around gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`bottom-nav-${tab.id}`}
                type="button"
                onClick={() => {
                  playButtonClick();
                  onChangeTab(tab.id);
                }}
                className={`relative flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.03]'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.id === 'rewards' && pendingRewardsCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <span className="text-[10px] font-black tracking-tight whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
