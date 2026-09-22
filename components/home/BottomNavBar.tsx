'use client';

import React from 'react';
import {
  Home,
  Search,
  BookOpen,
  HelpCircle,
  User,
} from 'lucide-react';
import { playButtonClick } from '@/lib/audio/soundManager';

export type NavTab = 'home' | 'search' | 'mybook' | 'quiz' | 'profile';

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
  const tabs: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'mybook', label: 'My Book', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none pb-2 sm:pb-3">
      {/* Curved White Floating Navigation Dock as seen in Foto 2 */}
      <nav
        aria-label="Funfluent Main Navigation"
        className="w-full max-w-[390px] px-4 pointer-events-auto"
      >
        <div className="rounded-[32px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/80 px-2 py-2 flex items-center justify-between">
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
                className="relative flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95 group"
              >
                {/* Active Indicator: Warm Amber/Brown circle matching Foto 2 */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#E5832E] text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                    }`}
                  />
                  {tab.id === 'search' && pendingRewardsCount > 0 && (
                    <span className="absolute top-1 right-3 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
                  )}
                </div>

                {/* Tab Label */}
                <span
                  className={`text-[10px] tracking-tight transition-colors ${
                    isActive
                      ? 'font-bold text-[#E5832E]'
                      : 'font-medium text-slate-400 group-hover:text-slate-600'
                  }`}
                >
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
