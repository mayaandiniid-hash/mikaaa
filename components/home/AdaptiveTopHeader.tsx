'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Search,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Coins,
  Flame,
  CheckCircle2,
  X,
} from 'lucide-react';
import { NavTab } from '@/components/home/BottomNavBar';
import { AnimatedCounter } from '@/components/home/AnimatedCounter';
import { playButtonClick, playSuccessSound } from '@/lib/audio/soundManager';

interface AdaptiveTopHeaderProps {
  activeTab: NavTab;
  userName: string;
  educationLevel: string;
  userAge: number;
  points: number;
  tokens: number;
  dailyStreak: number;
  hasClaimedDaily: boolean;
  soundActive: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleSound: () => void;
  onClaimStreak: () => void;
}

export function AdaptiveTopHeader({
  activeTab,
  userName,
  educationLevel,
  userAge,
  points,
  tokens,
  dailyStreak,
  hasClaimedDaily,
  soundActive,
  searchQuery,
  onSearchChange,
  onToggleSound,
  onClaimStreak,
}: AdaptiveTopHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Tab dynamic metadata adapting to active bottom navigation
  const tabConfigMap: Record<NavTab, {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    badge: string;
    badgeColor: string;
  }> = {
    home: {
      title: 'Earning Reward',
      subtitle: `Halo, ${userName} • ${educationLevel} (${userAge} Th)`,
      searchPlaceholder: 'Cari materi pelajaran, soal, atau bot...',
      badge: 'ONLINE',
      badgeColor: 'bg-emerald-500',
    },
    search: {
      title: 'Discover',
      subtitle: 'Find your favorite book',
      searchPlaceholder: 'Search by title & more...',
      badge: 'DISCOVER',
      badgeColor: 'bg-blue-500',
    },
    mybook: {
      title: 'My Book & Modul',
      subtitle: `Modul Kurikulum ${educationLevel}`,
      searchPlaceholder: 'Cari materi kurikulum...',
      badge: 'KURIKULUM',
      badgeColor: 'bg-purple-500',
    },
    quiz: {
      title: 'Kuis & Bot WA',
      subtitle: 'Tukar Poin Jadi Akses Bot WA Premium',
      searchPlaceholder: 'Cari kuis atau paket bot...',
      badge: 'VIP WA',
      badgeColor: 'bg-emerald-500',
    },
    profile: {
      title: 'Profil Siswa',
      subtitle: `${userName} • Pelajar Aktif ${educationLevel}`,
      searchPlaceholder: 'Cari data akun atau riwayat kuis...',
      badge: 'VERIFIKASI',
      badgeColor: 'bg-amber-500',
    },
  };
  const tabConfig = tabConfigMap[activeTab] || tabConfigMap.home;

  const notifications = [
    {
      id: 1,
      title: 'Streak Harian Aktif! 🔥',
      desc: 'Kamu telah mempertahankan streak belajar selama 3 hari berturut-turut.',
      time: 'Baru saja',
    },
    {
      id: 2,
      title: 'Reward Bot WA Siap Diklaim! 🤖',
      desc: 'Poin kamu cukup untuk menukarkan paket BOT WA Premium 1 Hari.',
      time: '1 jam lalu',
    },
    {
      id: 3,
      title: 'Modul Pelajaran Baru Tersedia 📚',
      desc: `Latihan baru untuk jenjang ${educationLevel} telah diperbarui.`,
      time: 'Hari ini',
    },
  ];

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-gradient-to-b from-white/95 via-white/85 to-white/75 border-b border-white/60 shadow-[0_8px_30px_rgba(30,58,138,0.06)]">
      {/* Top Dynamic Island Notch styling like iPhone */}
      <div className="w-full flex justify-center pt-1.5 pb-0.5 pointer-events-none">
        <div className="w-24 h-4 bg-slate-900/90 rounded-full flex items-center justify-between px-2.5 shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>
      </div>

      <div className="w-full max-w-[440px] mx-auto px-4 pt-1.5 pb-3 space-y-2.5">
        {/* Row 1: Brand / Title on Left, Bell & Action Buttons on Right (Inspired by Figma mockup photo) */}
        <div className="flex items-center justify-between gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              className="space-y-0.5 min-w-0"
            >
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none truncate">
                  {tabConfig.title}
                </h1>
                <span
                  className={`px-1.5 py-0.5 rounded-full ${tabConfig.badgeColor} text-white font-extrabold text-[8px] tracking-wider`}
                >
                  {tabConfig.badge}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 truncate">
                {tabConfig.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Right Action: Circular Notification Bell & Sound Toggle */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Sound Toggle */}
            <button
              type="button"
              id="top-nav-btn-sound"
              onClick={() => {
                playButtonClick();
                onToggleSound();
              }}
              title="Toggle Suara Game"
              className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all cursor-pointer active:scale-95"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-blue-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Notification Bell (Circular button matching uploaded design) */}
            <button
              type="button"
              id="top-nav-btn-notification"
              onClick={() => {
                playButtonClick();
                setShowNotifications((prev) => !prev);
                setHasUnreadNotification(false);
              }}
              aria-label="Buka Notifikasi"
              className="relative w-9 h-9 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-100/70 border border-amber-200/80 shadow-xs hover:from-amber-100 hover:to-orange-200/80 flex items-center justify-center text-amber-800 transition-all cursor-pointer active:scale-95"
            >
              <Bell className="w-4 h-4 text-amber-700" />
              {hasUnreadNotification && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-ping" />
              )}
              {hasUnreadNotification && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Search Bar Pill with Filter Icon (Matching "What service do you need?" in user's image) */}
        <div className="relative flex items-center">
          <div className="relative w-full flex items-center bg-white rounded-2xl border-2 border-slate-200/90 shadow-[0_4px_16px_rgba(30,58,138,0.04)] hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>

            <input
              id="top-header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={tabConfig.searchPlaceholder}
              className="w-full py-2.5 pr-2 text-xs font-extrabold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 mr-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Filter Slider Pill Icon on right edge (Exact matching element in reference photo) */}
            <div className="pr-2 pl-1 border-l border-slate-100 flex items-center">
              <button
                type="button"
                id="top-header-filter-btn"
                onClick={playButtonClick}
                title="Filter Materi & Hadiah"
                className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Status / Economy Stats Pill Bar with Animated Rolling Counter */}
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          {/* Points XP with Animated Mechanical Counter */}
          <div className="rounded-2xl bg-white/90 p-2 shadow-xs border border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[9px] font-extrabold uppercase text-slate-400 truncate">
                Poin XP
              </span>
              <AnimatedCounter
                value={points}
                suffix=" XP"
                className="block text-xs font-black text-slate-900 truncate"
              />
            </div>
          </div>

          {/* Tokens with Animated Counter */}
          <div className="rounded-2xl bg-white/90 p-2 shadow-xs border border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Coins className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[9px] font-extrabold uppercase text-slate-400 truncate">
                Token Koin
              </span>
              <AnimatedCounter
                value={tokens}
                suffix=" Koin"
                className="block text-xs font-black text-slate-900 truncate"
              />
            </div>
          </div>

          {/* Daily Streak Claim Button */}
          <button
            type="button"
            id="btn-claim-streak-header"
            onClick={onClaimStreak}
            disabled={hasClaimedDaily}
            className={`rounded-2xl p-2 shadow-xs border transition-all flex items-center gap-2 cursor-pointer ${
              hasClaimedDaily
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_2px_8px_rgba(249,115,22,0.25)] animate-pulse active:scale-95'
            }`}
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div className="text-left min-w-0">
              <span className="block text-[9px] font-extrabold uppercase opacity-90 truncate">
                {hasClaimedDaily ? 'Klaim Siap' : 'Streak'}
              </span>
              <span className="block text-xs font-black truncate">
                {dailyStreak} Hari
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Dropdown Notification Center */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-[440px] mx-auto px-4 pb-3"
          >
            <div className="rounded-3xl bg-white p-4 shadow-xl border-2 border-slate-100 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-black text-slate-800">
                    Pemberitahuan & Misi
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Tutup
                </button>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">
                        {n.title}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600 leading-snug">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
