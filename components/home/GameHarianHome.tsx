'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  MoreHorizontal,
  BookOpen,
  Clock,
  Compass,
  Smile,
  Sparkles,
  Theater,
  Search,
  CheckCircle2,
  ChevronRight,
  Flame,
  Bot,
  User,
  RotateCcw,
  Zap,
  ArrowRight,
  BookCheck,
  Star,
  Award,
} from 'lucide-react';
import { EducationLevel } from '@/types/onboarding';
import { GeminiStarLogo } from '@/components/gemini/GeminiStarLogo';
import { FunfluentTopHeader } from '@/components/home/FunfluentTopHeader';
import { LandscapeGeminiBanner } from '@/components/home/LandscapeGeminiBanner';
import { BottomNavBar, NavTab } from '@/components/home/BottomNavBar';
import { QuizModalWithTimer } from '@/components/home/QuizModalWithTimer';
import { WABotRewardStore } from '@/components/home/WABotRewardStore';
import {
  getSubjectsForLevel,
  Subject,
  WA_BOT_REWARDS,
  WABotReward,
} from '@/lib/curriculumData';
import {
  isSoundEnabled,
  toggleSound,
  playButtonClick,
  playSuccessSound,
} from '@/lib/audio/soundManager';

export function GameHarianHome() {
  const router = useRouter();

  // User Profile
  const [userName, setUserName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || 'Amel';
    }
    return 'Amel';
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
    return 'SD';
  });

  const [soundActive, setSoundActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('soundEnabled');
      if (stored !== null) return stored === 'true';
    }
    return true;
  });

  // Economy & Progress
  const [level, setLevel] = useState(2);
  const [levelProgress, setLevelProgress] = useState(65);
  const [coins, setCoins] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userTokens');
      if (stored) return parseInt(stored, 10);
    }
    return 28;
  });
  const [xpPoints, setXpPoints] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userPoints');
      if (stored) return parseInt(stored, 10);
    }
    return 485;
  });
  const [dayChallengeCount, setDayChallengeCount] = useState(10);
  const [booksReadCount, setBooksReadCount] = useState(14);
  const [learningMinutes, setLearningMinutes] = useState(40);
  const [language, setLanguage] = useState<'ENG' | 'IDN'>('ENG');

  // Navigation tab matching Foto 2: 'home' | 'search' | 'mybook' | 'quiz' | 'profile'
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');

  // Search and Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Adventure');

  // Interactive Quiz Modal
  const [activeQuizSubject, setActiveQuizSubject] = useState<Subject | null>(null);

  // Curriculum subjects
  const subjects = getSubjectsForLevel(educationLevel);

  // Prevent touch zoom on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preventTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', preventTouchZoom, { passive: false });
    return () => {
      document.removeEventListener('touchstart', preventTouchZoom);
    };
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const handleToggleLang = () => {
    setLanguage((prev) => (prev === 'ENG' ? 'IDN' : 'ENG'));
  };

  const handleAddCoins = () => {
    playSuccessSound();
    setCoins((prev) => prev + 5);
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

  const handleQuizCompleted = (xpEarned: number, tokensEarned: number) => {
    setXpPoints((prev) => prev + xpEarned);
    setCoins((prev) => prev + (tokensEarned || 2));
    setBooksReadCount((prev) => prev + 1);
    setLearningMinutes((prev) => prev + 5);
    setLevelProgress((prev) => Math.min(100, prev + 15));
  };

  const handleRedeemWABot = (reward: WABotReward) => {
    setXpPoints((prev) => Math.max(0, prev - reward.xpCost));
  };

  // Categories matching Foto 2
  const categories = [
    {
      id: 'Adventure',
      name: 'Adventure',
      icon: Compass,
      bgColor: 'bg-[#FFE8D6]',
      iconColor: 'text-[#E5832E]',
      border: 'border-[#FCD5B5]',
    },
    {
      id: 'Comedy',
      name: 'Comedy',
      icon: Smile,
      bgColor: 'bg-[#FEF0C7]',
      iconColor: 'text-[#D97706]',
      border: 'border-[#FDE68A]',
    },
    {
      id: 'Fantasy',
      name: 'Fantasy',
      icon: Sparkles,
      bgColor: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0284C7]',
      border: 'border-[#BAE6FD]',
    },
    {
      id: 'Drama',
      name: 'Drama',
      icon: Theater,
      bgColor: 'bg-[#FCE7F3]',
      iconColor: 'text-[#DB2777]',
      border: 'border-[#FBCFE8]',
    },
  ];

  // Popular Books matching Foto 2
  const popularBooks = [
    {
      id: 1,
      title: "Jack's Adventure in Search of Treasure",
      author: 'Roald Dahl',
      category: 'Adventure',
      badgeColor: 'bg-[#E5832E]',
      coverBg: 'from-amber-400 via-orange-400 to-rose-400',
      avatar: '👨‍🎨',
      illustration: '⛵️',
      xp: 50,
      coins: 8,
    },
    {
      id: 2,
      title: 'Maggie The Spirited Little Witch',
      author: 'Oli Watkins',
      category: 'Adventure',
      badgeColor: 'bg-[#7C3AED]',
      coverBg: 'from-indigo-400 via-purple-400 to-pink-400',
      avatar: '🧙‍♀️',
      illustration: '🧹',
      xp: 60,
      coins: 10,
    },
    {
      id: 3,
      title: 'The Secret of Mathematical Island',
      author: 'Amel & Friends',
      category: 'Fantasy',
      badgeColor: 'bg-[#0284C7]',
      coverBg: 'from-sky-400 via-teal-400 to-emerald-400',
      avatar: '🔭',
      illustration: '🏝️',
      xp: 45,
      coins: 6,
    },
  ];

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#FCF9F2] text-slate-800 flex flex-col pb-24 select-none overflow-x-hidden font-sans">
      {/* Subtle Pastel Background Lighting matching Foto 2 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#E2F4FD] via-[#F0F8FD] to-transparent" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-16 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl" />
      </div>

      {/* TOP HEADER: Exact match of Foto 2 with Level 2 pill, + 28 coins, ENG */}
      <div className="w-full max-w-[390px] mx-auto px-3">
        <FunfluentTopHeader
          level={level}
          progressPercent={levelProgress}
          coins={coins}
          language={language}
          soundActive={soundActive}
          onToggleSound={handleToggleSound}
          onAddCoins={handleAddCoins}
          onToggleLang={handleToggleLang}
        />
      </div>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-[390px] mx-auto px-4 flex-1 flex flex-col gap-3.5 z-10">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* TAB 1: HOME SCREEN (LEFT PHONE IN FOTO 2 PERSIS!)        */}
          {/* ======================================================== */}
          {activeNavTab === 'home' && (
            <motion.div
              key="tab-funfluent-home"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-3.5"
            >
              {/* 1. Greeting: "Welcome back, [Name]" */}
              <div className="pt-0.5">
                <h1 className="text-[21px] font-black text-slate-800 tracking-tight">
                  Welcome back, {userName}
                </h1>
              </div>

              {/* 2. Hero Nature Landscape with Floating Animated Glowing Gemini Star Mascot */}
              <LandscapeGeminiBanner
                onTapStar={() => {
                  setCoins((prev) => prev + 1);
                }}
              />

              {/* 3. Challenge Card: "10 of 120 Day challenge" */}
              <div className="w-full rounded-[22px] bg-white p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Calendar / Checklist Icon in Soft Lime-Yellow Square */}
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF7D7] border border-[#D5EFA9] flex items-center justify-center text-[#65A30D] shadow-xs">
                    <BookCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 leading-tight">
                      {dayChallengeCount} of 120
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Day challenge
                    </span>
                  </div>
                </div>

                {/* More options button (...) */}
                <button
                  type="button"
                  onClick={() => {
                    playButtonClick();
                    setDayChallengeCount((prev) => Math.min(120, prev + 1));
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* 4. "So for today" Section with 2 Side-by-Side Cards */}
              <div className="space-y-2">
                <h2 className="text-sm font-black text-slate-800 tracking-tight">
                  So for today
                </h2>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Card 1: Books read (14) */}
                  <div className="rounded-[22px] bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-[#DDF4E4] flex items-center justify-center text-[#16A34A] shadow-xs flex-shrink-0">
                      <BookOpen className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-black text-slate-800 leading-tight truncate">
                        {booksReadCount}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 truncate">
                        Books read
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Learning times (40 mins) */}
                  <div className="rounded-[22px] bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-[#FFEBD8] flex items-center justify-center text-[#EA580C] shadow-xs flex-shrink-0">
                      <Clock className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-black text-slate-800 leading-tight truncate">
                        {learningMinutes} mins
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 truncate">
                        Learning times
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. "Book category" Section with Circular Category Buttons */}
              <div className="space-y-2 pb-2">
                <h2 className="text-sm font-black text-slate-800 tracking-tight">
                  Book category
                </h2>

                <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          playButtonClick();
                          setSelectedCategory(cat.id);
                          if (subjects.length > 0) {
                            setActiveQuizSubject(subjects[0]);
                          }
                        }}
                        className="flex flex-col items-center gap-1.5 flex-1 min-w-[70px] cursor-pointer group transition-transform active:scale-95"
                      >
                        <div
                          className={`w-14 h-14 rounded-full ${cat.bgColor} border ${cat.border} flex items-center justify-center shadow-xs transition-all ${
                            isSelected
                              ? 'ring-2 ring-[#E5832E] scale-105 shadow-md'
                              : 'group-hover:scale-102'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${cat.iconColor} stroke-[2.2]`} />
                        </div>
                        <span
                          className={`text-[11px] tracking-tight ${
                            isSelected
                              ? 'font-black text-[#E5832E]'
                              : 'font-bold text-slate-600'
                          }`}
                        >
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SEARCH / DISCOVER (RIGHT PHONE IN FOTO 2 PERSIS!)  */}
          {/* ======================================================== */}
          {activeNavTab === 'search' && (
            <motion.div
              key="tab-funfluent-discover"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-3.5"
            >
              {/* Header: Discover & Subtitle */}
              <div className="pt-0.5">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                  Discover
                </h1>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  Find your favorite book & quiz
                </p>
              </div>

              {/* Search Bar matching Foto 2 */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title & more..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 placeholder-slate-400 shadow-[0_2px_8px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#E5832E]"
                />
              </div>

              {/* Category Filter Chips matching Foto 2 */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        playButtonClick();
                        setSelectedCategory(cat.id);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all shadow-xs cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#E5832E] text-white'
                          : 'bg-white text-slate-700 border border-slate-200/70 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Section: Popular Books with "See all" */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black text-slate-800 tracking-tight">
                    Popular books
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      playButtonClick();
                      if (subjects.length > 0) setActiveQuizSubject(subjects[0]);
                    }}
                    className="text-xs font-black text-[#E5832E] hover:underline cursor-pointer"
                  >
                    See all
                  </button>
                </div>

                {/* Popular Books Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {popularBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => {
                        playButtonClick();
                        if (subjects.length > 0) setActiveQuizSubject(subjects[0]);
                      }}
                      className="rounded-[24px] bg-white p-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between cursor-pointer group hover:shadow-md transition-all active:scale-98"
                    >
                      {/* Book Cover Illustration */}
                      <div
                        className={`w-full h-32 rounded-2xl bg-gradient-to-br ${book.coverBg} relative flex flex-col items-center justify-center overflow-hidden p-2 text-white shadow-inner`}
                      >
                        {/* Tag Badge on Cover */}
                        <div className="absolute top-2 right-2 bg-white/90 text-[#E5832E] px-2 py-0.5 rounded-full text-[9px] font-black uppercase shadow-xs">
                          {book.category}
                        </div>

                        {/* Central Illustration Emoji/Art */}
                        <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                          {book.illustration}
                        </span>

                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/30 backdrop-blur-xs px-1.5 py-0.5 rounded-md text-[9px] font-bold">
                          <span>+{book.xp} XP</span>
                        </div>
                      </div>

                      {/* Title & Author Row */}
                      <div className="mt-2 space-y-1">
                        <h3 className="text-xs font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-[#E5832E] transition-colors">
                          {book.title}
                        </h3>

                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                          <span>{book.avatar}</span>
                          <span className="truncate">{book.author}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bot WA Store Banner Promo */}
              <div className="rounded-[24px] bg-gradient-to-r from-emerald-600 to-teal-700 p-3.5 text-white shadow-md flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
                    Reward Spesial
                  </span>
                  <h4 className="text-xs font-black">
                    Tukar Poin Jadi BOT WA Premium
                  </h4>
                  <p className="text-[10px] text-emerald-100">
                    Akses bot AI otomatis untuk belajar 24 jam!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playButtonClick();
                    setActiveNavTab('quiz');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 font-black text-xs shadow-sm hover:bg-emerald-50 cursor-pointer flex-shrink-0"
                >
                  Klaim
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: MY BOOK (MODUL KURIKULUM BELAJAR SISWA)            */}
          {/* ======================================================== */}
          {activeNavTab === 'mybook' && (
            <motion.div
              key="tab-funfluent-mybook"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-3"
            >
              <div className="pt-0.5">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                  My Book & Modul
                </h1>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  Materi kurikulum {educationLevel} milik {userName}
                </p>
              </div>

              <div className="space-y-2.5">
                {subjects.map((sub, idx) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      playButtonClick();
                      setActiveQuizSubject(sub);
                    }}
                    className="rounded-[22px] bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between cursor-pointer hover:border-[#E5832E]/40 transition-all active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FFE8D6] text-[#E5832E] flex items-center justify-center font-black text-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400">
                          {sub.category}
                        </span>
                        <h4 className="text-xs font-black text-slate-800 leading-snug">
                          {sub.name}
                        </h4>
                        <span className="text-[10px] font-bold text-emerald-600">
                          +{sub.xpReward} XP • {sub.quizzesAvailable} Soal
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1 rounded-xl bg-[#E5832E] text-white text-[11px] font-black shadow-xs hover:bg-[#d07323] cursor-pointer"
                    >
                      Buka
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: QUIZ (GAME HARIAN & TOKO BOT WA)                  */}
          {/* ======================================================== */}
          {activeNavTab === 'quiz' && (
            <motion.div
              key="tab-funfluent-quiz"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-3.5"
            >
              <div className="pt-0.5">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                  Quiz & Reward WA
                </h1>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  Selesaikan kuis untuk tukar paket BOT WA Premium
                </p>
              </div>

              {/* Bot WA Store Component */}
              <WABotRewardStore
                userPoints={xpPoints}
                onRedeem={(reward) => handleRedeemWABot(reward)}
              />
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: PROFILE                                          */}
          {/* ======================================================== */}
          {activeNavTab === 'profile' && (
            <motion.div
              key="tab-funfluent-profile"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-3.5"
            >
              <div className="rounded-[24px] bg-white p-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#E5832E] to-amber-300 flex items-center justify-center text-white text-2xl shadow-md">
                  👩‍🎓
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">
                    {userName}
                  </h3>
                  <p className="text-xs font-bold text-slate-400">
                    Jenjang {educationLevel} • Umur {userAge} Tahun
                  </p>
                  <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Siswa Aktif</span>
                  </div>
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-[20px] bg-white p-3.5 shadow-xs border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Total Poin XP
                  </span>
                  <p className="text-lg font-black text-[#E5832E] mt-0.5">
                    {xpPoints} XP
                  </p>
                </div>
                <div className="rounded-[20px] bg-white p-3.5 shadow-xs border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Token Koin
                  </span>
                  <p className="text-lg font-black text-amber-500 mt-0.5">
                    {coins} Koin
                  </p>
                </div>
              </div>

              {/* Reset Onboarding Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetOnboarding}
                  className="w-full py-3 rounded-2xl bg-white hover:bg-rose-50 text-rose-600 font-extrabold text-xs border border-rose-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Onboarding Gemini Star</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FLOATING CURVED WHITE BOTTOM DOCK (MATCHING FOTO 2 PERSIS!) */}
      <BottomNavBar
        activeTab={activeNavTab}
        onChangeTab={setActiveNavTab}
        pendingRewardsCount={xpPoints >= 1250 ? 1 : 0}
      />

      {/* QUIZ MODAL WITH TIMER */}
      {activeQuizSubject && (
        <QuizModalWithTimer
          subject={activeQuizSubject}
          educationLevel={educationLevel}
          userTokens={coins}
          onClose={() => setActiveQuizSubject(null)}
          onCompleteQuiz={handleQuizCompleted}
          onUseTokenForTime={() => {
            if (coins >= 1) {
              setCoins((prev) => prev - 1);
              return true;
            }
            return false;
          }}
        />
      )}
    </div>
  );
}
