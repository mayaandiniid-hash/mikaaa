'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  Trophy,
  Gift,
  Coins,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Flame,
  Zap,
  Bot,
  User,
  Shield,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { EducationLevel, EDUCATION_LEVEL_OPTIONS } from '@/types/onboarding';
import { Education3DIcon } from '@/components/onboarding/Education3DIcons';
import { DokterAurel } from '@/components/onboarding/DokterAurel';
import {
  getSubjectsForLevel,
  SMK_VOCATIONAL_TRACKS,
  SMKTrack,
  KULIAH_PROGRAMS,
  KuliahProgram,
  Subject,
  WA_BOT_REWARDS,
  WABotReward,
} from '@/lib/curriculumData';
import {
  isSoundEnabled,
  toggleSound,
  playButtonClick,
  playSuccessSound,
  playCounterTick,
} from '@/lib/audio/soundManager';
import { AdaptiveTopHeader } from '@/components/home/AdaptiveTopHeader';
import { SubjectHorizontalSlider } from '@/components/home/SubjectHorizontalSlider';
import { QuizModalWithTimer } from '@/components/home/QuizModalWithTimer';
import { WABotRewardStore } from '@/components/home/WABotRewardStore';
import { BottomNavBar, NavTab } from '@/components/home/BottomNavBar';

export function GameHarianHome() {
  const router = useRouter();

  // User Profile from Onboarding State (Hydration safe lazy initializers)
  const [userName, setUserName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || 'Siswa Cerdas';
    }
    return 'Siswa Cerdas';
  });

  const [userAge, setUserAge] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userAge');
      if (stored) return parseInt(stored, 10);
    }
    return 16;
  });

  const [educationLevel, setEducationLevel] = useState<EducationLevel>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('educationLevel') as EducationLevel;
      if (stored) return stored;
    }
    return 'SMA';
  });

  const [soundActive, setSoundActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('soundEnabled');
      if (stored !== null) return stored === 'true';
    }
    return true;
  });

  // Configurable tracks for SMK & Kuliah
  const [smkTrack, setSmkTrack] = useState<SMKTrack>('Rekayasa Perangkat Lunak');
  const [kuliahProgram, setKuliahProgram] = useState<KuliahProgram>(
    'Teknik Informatika / Ilmu Komputer'
  );
  const [selectedSemester, setSelectedSemester] = useState(3);

  // Search filter query controlled by Top Header Search Pill
  const [searchQuery, setSearchQuery] = useState('');

  // Game Economy State: Points & Tokens (High cost rewards economy)
  const [points, setPoints] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userPoints');
      if (stored) return parseInt(stored, 10);
    }
    return 1550; // generous starting point so user can test redeeming BOT WA 1 Hari (1.250 XP) immediately!
  });

  const [tokens, setTokens] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userTokens');
      if (stored) return parseInt(stored, 10);
    }
    return 5;
  });

  const [dailyStreak, setDailyStreak] = useState(3);
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);

  // Active Bottom Navigation Tab: 'home' | 'subjects' | 'game' | 'rewards' | 'profile'
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');

  // Interactive Quiz Modal with Timer & Hints
  const [activeQuizSubject, setActiveQuizSubject] = useState<Subject | null>(
    null
  );

  // Anti-Zoom & Stability Prevention (Ensures viewport stability on all touch devices)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preventTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('touchstart', preventTouchZoom, {
      passive: false,
    });
    document.addEventListener('touchend', preventDoubleTapZoom, {
      passive: false,
    });
    window.addEventListener('gesturestart', preventGesture);
    window.addEventListener('gesturechange', preventGesture);

    return () => {
      document.removeEventListener('touchstart', preventTouchZoom);
      document.removeEventListener('touchend', preventDoubleTapZoom);
      window.removeEventListener('gesturestart', preventGesture);
      window.removeEventListener('gesturechange', preventGesture);
    };
  }, []);

  // Save Points and Tokens to localStorage when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('userPoints', points.toString());
        localStorage.setItem('userTokens', tokens.toString());
      } catch (e) {
        console.warn('Failed to save stats to localStorage', e);
      }
    }
  }, [points, tokens]);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const handleResetOnboarding = () => {
    playButtonClick();
    try {
      localStorage.removeItem('onboardingCompleted');
    } catch (e) {
      console.warn(e);
    }
    router.push('/');
  };

  const handleClaimDailyStreak = () => {
    if (hasClaimedDaily) return;
    playSuccessSound();
    // Rapid counter sound will automatically be triggered by AnimatedCounter
    setDailyStreak((prev) => prev + 1);
    setPoints((prev) => prev + 100);
    setTokens((prev) => prev + 2);
    setHasClaimedDaily(true);
  };

  // Use 1 Token to add +15s extra time during quiz
  const handleUseTokenForTime = (): boolean => {
    if (tokens >= 1) {
      setTokens((prev) => prev - 1);
      return true;
    }
    return false;
  };

  // Quiz completed callback
  const handleQuizCompleted = (xpEarned: number, tokensEarned: number) => {
    setPoints((prev) => prev + xpEarned);
    setTokens((prev) => prev + tokensEarned);
  };

  // Bot WA redeemed callback
  const handleRedeemWABot = (reward: WABotReward) => {
    setPoints((prev) => Math.max(0, prev - reward.xpCost));
  };

  // Get subjects according to personalized level & specialization
  const subjects = getSubjectsForLevel(educationLevel, smkTrack, kuliahProgram);

  const currentOption =
    EDUCATION_LEVEL_OPTIONS.find((o) => o.id === educationLevel) ||
    EDUCATION_LEVEL_OPTIONS[2];

  return (
    <div className="relative w-full min-h-[100dvh] bg-gradient-to-b from-sky-100 via-indigo-50/40 to-purple-100 text-slate-800 flex flex-col pb-28 select-none overflow-x-hidden">
      {/* Dynamic Background Lighting Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-300/35 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl" />
      </div>

      {/* ADAPTIVE TOP HEADER (Inspired by user's reference mockup photo with iPhone Dynamic Island, Search Pill & Status Bar) */}
      <AdaptiveTopHeader
        activeTab={activeNavTab}
        userName={userName}
        educationLevel={educationLevel}
        userAge={userAge}
        points={points}
        tokens={tokens}
        dailyStreak={dailyStreak}
        hasClaimedDaily={hasClaimedDaily}
        soundActive={soundActive}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSound={handleToggleSound}
        onClaimStreak={handleClaimDailyStreak}
      />

      {/* MAIN CONTENT WITH IPHONE FLUID MOTION BLUR TRANSITIONS */}
      <main className="w-full max-w-[440px] mx-auto px-4 mt-3 flex-1 flex flex-col gap-4 z-10">
        <AnimatePresence mode="wait">
          {/* ============================== */}
          {/* TAB 1: HOME (DASHBOARD)        */}
          {/* ============================== */}
          {activeNavTab === 'home' && (
            <motion.div
              key="tab-home"
              initial={{ opacity: 0, y: 16, filter: 'blur(10px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)', scale: 0.98 }}
              transition={{
                duration: 0.32,
                ease: [0.32, 0.72, 0, 1], // iOS natural fluid curve
              }}
              className="space-y-4"
            >
              {/* Education Level Personalized Hero Card */}
              <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white shadow-[0_12px_28px_rgba(79,70,229,0.25)] overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1 pr-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      <span>Kurikulum Aktif</span>
                    </div>
                    <h2 className="text-xl font-black tracking-tight mt-1">
                      {currentOption.subtitle} ({educationLevel})
                    </h2>
                    <p className="text-xs text-blue-100 font-medium line-clamp-2 mt-0.5">
                      {currentOption.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 p-1 rounded-2xl bg-white/15 backdrop-blur-md shadow-inner">
                    <Education3DIcon level={educationLevel} size={54} />
                  </div>
                </div>

                {/* Specialization Options for SMK / Kuliah */}
                {educationLevel === 'SMK' && (
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-blue-200 mb-1">
                      Pilih Jurusan SMK:
                    </label>
                    <select
                      id="select-smk-track-home"
                      value={smkTrack}
                      onChange={(e) => {
                        setSmkTrack(e.target.value as SMKTrack);
                        playButtonClick();
                      }}
                      className="w-full py-1.5 px-3 rounded-xl bg-white text-slate-800 text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm cursor-pointer"
                    >
                      {SMK_VOCATIONAL_TRACKS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {educationLevel === 'KULIAH' && (
                  <div className="mt-3 pt-3 border-t border-white/20 space-y-2">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-blue-200 mb-1">
                        Program Studi Kuliah:
                      </label>
                      <select
                        id="select-kuliah-program-home"
                        value={kuliahProgram}
                        onChange={(e) => {
                          setKuliahProgram(e.target.value as KuliahProgram);
                          playButtonClick();
                        }}
                        className="w-full py-1.5 px-3 rounded-xl bg-white text-slate-800 text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm cursor-pointer"
                      >
                        {KULIAH_PROGRAMS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* SUBJECTS PREVIEW: Horizontal Square Slider with Search Filter */}
              <SubjectHorizontalSlider
                subjects={subjects}
                educationLevel={educationLevel}
                searchQuery={searchQuery}
                onSelectSubject={(sub) => setActiveQuizSubject(sub)}
              />

              {/* Quick Reward Banner Promotion: BOT WA PREMIUM */}
              <div className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 p-4 text-white shadow-[0_8px_20px_rgba(16,185,129,0.2)] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
                    Reward Utama
                  </span>
                  <h3 className="text-sm font-black">
                    BOT WA PREMIUM (1 Hari - 1 Minggu)
                  </h3>
                  <p className="text-[11px] text-emerald-100 font-medium">
                    Tukarkan poin XP kamu sekarang untuk akses bot AI otomatis.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playButtonClick();
                    setActiveNavTab('rewards');
                  }}
                  className="flex-shrink-0 px-3 py-2 rounded-xl bg-white text-emerald-700 font-black text-xs shadow-md hover:bg-emerald-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Daily Missions Quick Card */}
              <div className="rounded-3xl bg-white p-4 shadow-[0_4px_16px_rgba(30,58,138,0.05)] border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">
                        Misi Hari Ini
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold">
                        Selesaikan 1 kuis untuk bonus poin ekstra
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    +100 XP
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveQuizSubject(subjects[0])}
                  className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>Mulai Kuis Kilat Sekarang</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* TAB 2: PELAJARAN (HORIZONTAL CARDS FOCUS) */}
          {/* ========================================= */}
          {activeNavTab === 'subjects' && (
            <motion.div
              key="tab-subjects"
              initial={{ opacity: 0, y: 16, filter: 'blur(10px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)', scale: 0.98 }}
              transition={{
                duration: 0.32,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="space-y-4"
            >
              <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center gap-2 text-blue-900">
                <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <p className="text-xs font-bold">
                  Pilih kotak mata pelajaran di bawah ini. Tekan &quot;Mulai Belajar&quot; untuk membuka kuis interaktif dengan timer dan petunjuk!
                </p>
              </div>

              {/* Horizontal Slider component with Search Query */}
              <SubjectHorizontalSlider
                subjects={subjects}
                educationLevel={educationLevel}
                searchQuery={searchQuery}
                onSelectSubject={(sub) => setActiveQuizSubject(sub)}
              />

              {/* Subject Overview Grid Info */}
              <div className="rounded-3xl bg-white p-4 shadow-[0_4px_16px_rgba(30,58,138,0.05)] border border-slate-100 space-y-3">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Statistik Kurikulum {educationLevel}</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase">
                      Total Materi
                    </span>
                    <span className="text-base font-black text-slate-800">
                      {subjects.length} Modul
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase">
                      Estimasi Poin
                    </span>
                    <span className="text-base font-black text-emerald-600">
                      +{subjects.length * 75} XP
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================== */}
          {/* TAB 3: GAME HARIAN (QUESTS)   */}
          {/* ============================== */}
          {activeNavTab === 'game' && (
            <motion.div
              key="tab-game"
              initial={{ opacity: 0, y: 16, filter: 'blur(10px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)', scale: 0.98 }}
              transition={{
                duration: 0.32,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="space-y-3.5"
            >
              {/* Daily Streak Quest Card */}
              <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-4 text-white shadow-[0_8px_20px_rgba(245,158,11,0.25)]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      Misi Harian 1
                    </span>
                    <h3 className="text-lg font-black mt-1">Check-in Kehadiran</h3>
                    <p className="text-xs text-amber-100 font-medium">
                      Jaga streak belajar setiap hari untuk dapat +100 XP & +2 Koin Token.
                    </p>
                  </div>
                  <Flame className="w-10 h-10 text-yellow-300 animate-bounce" />
                </div>

                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="text-xs font-bold">
                    Streak Aktif: {dailyStreak} Hari Berturut-turut
                  </span>
                  <button
                    type="button"
                    onClick={handleClaimDailyStreak}
                    disabled={hasClaimedDaily}
                    className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${
                      hasClaimedDaily
                        ? 'bg-white/30 text-white cursor-not-allowed'
                        : 'bg-white text-orange-600 hover:bg-yellow-100 shadow-md cursor-pointer'
                    }`}
                  >
                    {hasClaimedDaily ? 'Sudah Diklaim' : 'Klaim Sekarang'}
                  </button>
                </div>
              </div>

              {/* Flash Quiz Card */}
              <div className="rounded-3xl bg-white p-4 shadow-[0_4px_20px_rgba(30,58,138,0.06)] border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-purple-600">
                        Misi Harian 2
                      </span>
                      <h4 className="text-sm font-black text-slate-800">
                        Kuis Kilat Edu-Game
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                    +120 XP
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  Kerjakan materi kuis {educationLevel} dengan timer dan petunjuk untuk mengumpulkan poin reward bot WA premium.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveQuizSubject(subjects[0])}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-md active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-yellow-300" />
                  <span>Mulai Kuis Kilat Sekarang</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ================================================ */}
          {/* TAB 4: HADIAH BOT WA (EXCLUSIVE BOT WA STORE)    */}
          {/* ================================================ */}
          {activeNavTab === 'rewards' && (
            <motion.div
              key="tab-rewards"
              initial={{ opacity: 0, y: 16, filter: 'blur(10px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)', scale: 0.98 }}
              transition={{
                duration: 0.32,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <WABotRewardStore
                userPoints={points}
                searchQuery={searchQuery}
                onRedeem={handleRedeemWABot}
              />
            </motion.div>
          )}

          {/* ================================================ */}
          {/* TAB 5: PROFIL / AKUN                             */}
          {/* ================================================ */}
          {activeNavTab === 'profile' && (
            <motion.div
              key="tab-profile"
              initial={{ opacity: 0, y: 16, filter: 'blur(10px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)', scale: 0.98 }}
              transition={{
                duration: 0.32,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="space-y-4"
            >
              {/* Student ID Card */}
              <div className="rounded-3xl bg-white p-5 shadow-[0_8px_25px_rgba(30,58,138,0.06)] border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-blue-500/20">
                    {userName.charAt(0).toUpperCase() || 'S'}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {userName}
                    </h3>
                    <p className="text-xs font-bold text-slate-500">
                      Pelajar Jenjang {educationLevel} • Usia {userAge} Tahun
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase">
                      Tabungan Poin XP
                    </span>
                    <span className="text-sm font-black text-blue-600">
                      {points.toLocaleString('id-ID')} XP
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase">
                      Token Koin
                    </span>
                    <span className="text-sm font-black text-amber-600">
                      {tokens} Koin
                    </span>
                  </div>
                </div>
              </div>

              {/* Settings & Reset */}
              <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100 space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-400 px-1">
                  Pengaturan Aplikasi
                </h4>

                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-blue-600" />
                    <span>Efek Suara Game & Timer</span>
                  </div>
                  <span className="text-xs font-black text-blue-600">
                    {soundActive ? 'AKTIF' : 'NONAKTIF'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleResetOnboarding}
                  className="w-full p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 flex items-center justify-between text-xs font-bold text-rose-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-rose-600" />
                    <span>Ulangi Alur Onboarding Interaktif</span>
                  </div>
                  <span className="text-xs font-black">Reset</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FLOATING DOKTER AUREL GUIDE WIDGET (Bottom Right Corner above nav) */}
      <div className="fixed bottom-20 right-3 z-30 pointer-events-none flex flex-col items-end">
        <div className="mb-1 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-1.5 shadow-lg border border-cyan-100 text-[11px] font-extrabold text-slate-800 max-w-[210px] text-right pointer-events-auto">
          {activeNavTab === 'rewards'
            ? 'Dokter Aurel: Kumpulkan poin untuk BOT WA Premium! 🤖'
            : activeNavTab === 'subjects'
            ? 'Dokter Aurel: Geser kotaknya untuk pilih pelajaran! 📚'
            : `Dokter Aurel: Semangat belajar modul ${educationLevel}, ${userName}! ✨`}
        </div>
        <div className="pointer-events-auto cursor-pointer" onClick={() => playButtonClick()}>
          <DokterAurel size="sm" showBadge={false} withGlow={true} />
        </div>
      </div>

      {/* PERSISTENT BOTTOM NAVIGATION WITH GRADIENT BLUR */}
      <BottomNavBar
        activeTab={activeNavTab}
        onChangeTab={(tab) => setActiveNavTab(tab)}
        pendingRewardsCount={points >= 1250 ? 1 : 0}
      />

      {/* INTERACTIVE QUIZ & MATERI MODAL WITH TIMER, COUNTDOWN AUDIO, WARNINGS, & HINTS */}
      <AnimatePresence>
        {activeQuizSubject && (
          <QuizModalWithTimer
            subject={activeQuizSubject}
            educationLevel={educationLevel}
            userTokens={tokens}
            onClose={() => setActiveQuizSubject(null)}
            onCompleteQuiz={handleQuizCompleted}
            onUseTokenForTime={handleUseTokenForTime}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
