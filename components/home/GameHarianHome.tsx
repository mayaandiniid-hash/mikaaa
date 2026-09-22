'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Award,
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
  Check,
  Copy,
  Zap,
} from 'lucide-react';
import { EducationLevel, EDUCATION_LEVEL_OPTIONS } from '@/types/onboarding';
import { Education3DIcon } from '@/components/onboarding/Education3DIcons';
import { BlueBird } from '@/components/onboarding/BlueBird';
import {
  getSubjectsForLevel,
  SMK_VOCATIONAL_TRACKS,
  SMKTrack,
  KULIAH_PROGRAMS,
  KuliahProgram,
  Subject,
} from '@/lib/curriculumData';
import {
  isSoundEnabled,
  toggleSound,
  playButtonClick,
  playSuccessSound,
  playCounterTick,
} from '@/lib/audio/soundManager';

function createVoucherCode(cost: number, remainingPoints: number): string {
  const codeNum = ((cost * 37 + remainingPoints * 17) % 8999) + 1000;
  return `BOT-${codeNum}-PRO`;
}

export function GameHarianHome() {
  const router = useRouter();

  // User Profile from Onboarding State
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

  // Game Economy State
  const [points, setPoints] = useState(450);
  const [tokens, setTokens] = useState(15);
  const [dailyStreak, setDailyStreak] = useState(3);
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);

  // Active Tab: 'subjects' | 'game' | 'rewards'
  const [activeTab, setActiveTab] = useState<'subjects' | 'game' | 'rewards'>(
    'subjects'
  );

  // Interactive Mini Quiz Modal
  const [activeQuizSubject, setActiveQuizSubject] = useState<Subject | null>(
    null
  );
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(
    null
  );
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Redeemed Voucher Toast State
  const [redeemedVoucher, setRedeemedVoucher] = useState<{
    title: string;
    code: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

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
    setDailyStreak((prev) => prev + 1);
    setPoints((prev) => prev + 50);
    setTokens((prev) => prev + 2);
    setHasClaimedDaily(true);
  };

  // Get subjects according to personalized level & specialization
  const subjects = getSubjectsForLevel(educationLevel, smkTrack, kuliahProgram);

  const currentOption =
    EDUCATION_LEVEL_OPTIONS.find((o) => o.id === educationLevel) ||
    EDUCATION_LEVEL_OPTIONS[2];

  // Quick Mini Quiz Questions
  const sampleQuestions = [
    {
      q: `Pertanyaan 1: Manakah konsep dasar yang paling esensial dalam ${activeQuizSubject?.name || 'materi ini'}?`,
      options: [
        'Pemahaman prinsip logika & metodologi terstruktur',
        'Menghafal rumus tanpa analisis mendalam',
        'Meniru jawaban tanpa pengujian',
        'Mengabaikan tahapan evaluasi',
      ],
      correct: 0,
    },
    {
      q: `Pertanyaan 2: Dalam studi ${educationLevel}, apa manfaat utama menyelesaikan kuis harian di Earning Reward?`,
      options: [
        'Hanya untuk mengisi waktu luang',
        'Mendapatkan poin reward yang bisa ditukar voucher bot & mengasah pemahaman materi',
        'Menghapus progres pembelajaran',
        'Menutup akses materi',
      ],
      correct: 1,
    },
    {
      q: `Pertanyaan 3: Apa sikap yang tepat dalam menghadapi tantangan studi di jenjang ${educationLevel}?`,
      options: [
        'Menyerah saat menemukan soal yang rumit',
        'Konsisten berlatih, berdiskusi, dan memanfaatkan reward untuk belajar',
        'Mengulang materi yang sama terus tanpa variasi',
        'Menghindari evaluasi harian',
      ],
      correct: 1,
    },
  ];

  const handleStartQuiz = (subject: Subject) => {
    playButtonClick();
    setActiveQuizSubject(subject);
    setQuizStep(0);
    setQuizAnswerSelected(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleSelectQuizAnswer = (idx: number) => {
    playButtonClick();
    setQuizAnswerSelected(idx);
    if (idx === sampleQuestions[quizStep].correct) {
      setQuizScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (quizStep + 1 < sampleQuestions.length) {
        setQuizStep((prev) => prev + 1);
        setQuizAnswerSelected(null);
      } else {
        setQuizFinished(true);
        playSuccessSound();
        const earned = (activeQuizSubject?.xpReward || 50) + 20;
        setPoints((prev) => prev + earned);
        setTokens((prev) => prev + 3);
      }
    }, 600);
  };

  const handleRedeemVoucher = (title: string, cost: number) => {
    if (points < cost) {
      playButtonClick();
      return;
    }
    playSuccessSound();
    const newPoints = points - cost;
    setPoints(newPoints);
    const code = createVoucherCode(cost, newPoints);
    setRedeemedVoucher({ title, code });
    setCopiedCode(false);
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-gradient-to-b from-sky-100 via-indigo-50/50 to-purple-100 text-slate-800 flex flex-col pb-20 select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
      </div>

      {/* Top Header Card */}
      <header className="w-full max-w-[440px] mx-auto px-4 pt-4 pb-2 z-20">
        <div className="rounded-3xl bg-white/90 backdrop-blur-md p-4 shadow-[0_10px_25px_rgba(30,58,138,0.08)] border-2 border-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <span className="font-black text-xl">
                  {userName.charAt(0).toUpperCase() || 'S'}
                </span>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[9px]">
                ONLINE
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black text-slate-900 leading-tight">
                  Halo, {userName}!
                </h1>
              </div>
              <p className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-0.5">
                <span>{educationLevel}</span>
                <span>•</span>
                <span>{userAge} Tahun</span>
              </p>
            </div>
          </div>

          {/* Sound & Reset Actions */}
          <div className="flex items-center gap-1.5">
            <button
              id="home-btn-toggle-sound"
              type="button"
              onClick={handleToggleSound}
              title="Toggle Suara"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-blue-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <button
              id="home-btn-reset-onboarding"
              type="button"
              onClick={handleResetOnboarding}
              title="Ulangi Onboarding"
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ulangi</span>
            </button>
          </div>
        </div>

        {/* Currency & Points Bar */}
        <div className="grid grid-cols-3 gap-2 mt-2.5">
          {/* Points */}
          <div className="rounded-2xl bg-white/90 backdrop-blur-md p-2.5 shadow-sm border border-slate-100 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase text-slate-400">
                Poin Belajar
              </span>
              <span className="block text-sm font-black text-slate-800">
                {points} XP
              </span>
            </div>
          </div>

          {/* Tokens */}
          <div className="rounded-2xl bg-white/90 backdrop-blur-md p-2.5 shadow-sm border border-slate-100 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase text-slate-400">
                Token Koin
              </span>
              <span className="block text-sm font-black text-slate-800">
                {tokens}
              </span>
            </div>
          </div>

          {/* Daily Streak */}
          <button
            type="button"
            onClick={handleClaimDailyStreak}
            className={`rounded-2xl p-2.5 shadow-sm border transition-all flex items-center gap-2 cursor-pointer ${
              hasClaimedDaily
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] animate-pulse'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-extrabold uppercase opacity-90">
                {hasClaimedDaily ? 'Klaim Siap' : 'Klaim Streak'}
              </span>
              <span className="block text-xs font-black">
                {dailyStreak} Hari
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[440px] mx-auto px-4 mt-2 flex-1 flex flex-col gap-4 z-10">
        {/* Education Level Personalized Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white shadow-[0_12px_28px_rgba(79,70,229,0.28)] overflow-hidden">
          {/* Subtle 3D Lighting Ring */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1 pr-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Jenjang Aktif</span>
              </div>
              <h2 className="text-xl font-black tracking-tight mt-1">
                {currentOption.subtitle} ({educationLevel})
              </h2>
              <p className="text-xs text-blue-100 font-medium line-clamp-2 mt-0.5">
                {currentOption.description}
              </p>
            </div>

            {/* 3D Education Level Icon Badge */}
            <div className="flex-shrink-0 p-1.5 rounded-2xl bg-white/15 backdrop-blur-md shadow-inner">
              <Education3DIcon level={educationLevel} size={56} />
            </div>
          </div>

          {/* SMK Specialization Selector */}
          {educationLevel === 'SMK' && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <label className="block text-[11px] font-black uppercase tracking-wider text-blue-200 mb-1.5">
                Pilih Jurusan Kejuruan:
              </label>
              <select
                id="select-smk-track"
                value={smkTrack}
                onChange={(e) => {
                  setSmkTrack(e.target.value as SMKTrack);
                  playButtonClick();
                }}
                className="w-full py-2 px-3 rounded-xl bg-white text-slate-800 text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md cursor-pointer"
              >
                {SMK_VOCATIONAL_TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* KULIAH Program Studi & Semester Selector */}
          {educationLevel === 'KULIAH' && (
            <div className="mt-3 pt-3 border-t border-white/20 space-y-2">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-blue-200 mb-1">
                  Program Studi:
                </label>
                <select
                  id="select-kuliah-program"
                  value={kuliahProgram}
                  onChange={(e) => {
                    setKuliahProgram(e.target.value as KuliahProgram);
                    playButtonClick();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white text-slate-800 text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md cursor-pointer"
                >
                  {KULIAH_PROGRAMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-100">
                  Semester Aktif:
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <button
                      key={sem}
                      type="button"
                      onClick={() => {
                        setSelectedSemester(sem);
                        playCounterTick();
                      }}
                      className={`w-6 h-6 rounded-lg text-[10px] font-black transition-all ${
                        selectedSemester === sem
                          ? 'bg-yellow-400 text-slate-900 shadow-sm'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm">
          <button
            id="tab-btn-subjects"
            type="button"
            onClick={() => {
              setActiveTab('subjects');
              playButtonClick();
            }}
            className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'subjects'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mata Pelajaran</span>
          </button>

          <button
            id="tab-btn-game"
            type="button"
            onClick={() => {
              setActiveTab('game');
              playButtonClick();
            }}
            className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'game'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Game Harian</span>
          </button>

          <button
            id="tab-btn-rewards"
            type="button"
            onClick={() => {
              setActiveTab('rewards');
              playButtonClick();
            }}
            className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'rewards'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Tukar Hadiah</span>
          </button>
        </div>

        {/* TAB 1: Personalized Subjects */}
        {activeTab === 'subjects' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                <span>Kurikulum {educationLevel} Terpersonalilasi</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black">
                  {subjects.length} Modul
                </span>
              </h3>
            </div>

            {/* List of Subjects */}
            <div className="grid grid-cols-1 gap-2.5">
              {subjects.map((sub) => (
                <motion.div
                  key={sub.id}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-white p-3.5 shadow-[0_4px_16px_rgba(30,58,138,0.06)] border border-slate-100 flex items-center justify-between gap-3 group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${sub.color} flex items-center justify-center text-white shadow-sm flex-shrink-0`}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block truncate">
                        {sub.category}
                      </span>
                      <h4 className="text-sm font-black text-slate-800 truncate">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                        +{sub.xpReward} XP • {sub.quizzesAvailable} Latihan
                      </p>
                    </div>
                  </div>

                  <button
                    id={`btn-quiz-${sub.id}`}
                    type="button"
                    onClick={() => handleStartQuiz(sub)}
                    className="flex-shrink-0 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-extrabold text-xs transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span>Mulai</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Game Harian */}
        {activeTab === 'game' && (
          <div className="space-y-3.5">
            {/* Daily Streak Quest Card */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-4 text-white shadow-[0_8px_20px_rgba(245,158,11,0.3)]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                    Misi Harian 1
                  </span>
                  <h3 className="text-lg font-black mt-1">Check-in Kehadiran</h3>
                  <p className="text-xs text-amber-100 font-medium">
                    Jaga streak belajar setiap hari untuk dapat +50 XP & +2 Koin.
                  </p>
                </div>
                <Flame className="w-10 h-10 text-yellow-300 animate-bounce" />
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs font-bold">
                  Streak Saat Ini: {dailyStreak} Hari
                </span>
                <button
                  type="button"
                  onClick={handleClaimDailyStreak}
                  disabled={hasClaimedDaily}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all ${
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
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
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
                  +70 XP
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                Jawab 3 pertanyaan interaktif materi {educationLevel} untuk klaim hadiah koin reward hari ini.
              </p>

              <button
                type="button"
                onClick={() => handleStartQuiz(subjects[0])}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-[0_4px_0_#312e81] active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-yellow-300" />
                <span>Mulai Kuis Kilat Sekarang</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Tukar Hadiah (Bot & Vouchers) */}
        {activeTab === 'rewards' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-3 flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-indigo-900 leading-snug">
                Sesuai pesan awal: Kakak bisa menukarkan poin reward untuk kebutuhan bot atau voucher akses yang telah tersedia di bawah ini!
              </p>
            </div>

            {/* Voucher Cards */}
            <div className="space-y-2.5">
              {[
                {
                  title: 'Voucher Akses Bot AI 24 Jam',
                  desc: 'Akses penuh bot asisten belajar tanpa batas kuota selama 24 jam.',
                  cost: 100,
                  tag: 'POPULER',
                },
                {
                  title: 'Token Kuota Bot Otomasi 500 Task',
                  desc: 'Ekstra 500 eksekusi task bot untuk otomasi belajar & tugas.',
                  cost: 250,
                  tag: 'TERLARIS',
                },
                {
                  title: 'Voucher Akses Pro Edukasi 7 Hari',
                  desc: 'Buka semua bank soal dan modul kisi-kisi ujian.',
                  cost: 400,
                  tag: 'PRO',
                },
                {
                  title: 'Voucher Akses Server Bot Prioritas',
                  desc: 'Response time super cepat dan antrean VIP bot.',
                  cost: 500,
                  tag: 'VIP',
                },
              ].map((voucher, idx) => {
                const canAfford = points >= voucher.cost;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-extrabold text-[9px]">
                          {voucher.tag}
                        </span>
                        <h4 className="text-xs font-black text-slate-800 truncate">
                          {voucher.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                        {voucher.desc}
                      </p>
                      <span className="inline-block mt-1 text-xs font-black text-blue-600">
                        Harga: {voucher.cost} XP
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRedeemVoucher(voucher.title, voucher.cost)}
                      disabled={!canAfford}
                      className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        canAfford
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_3px_0_#1d4ed8] active:shadow-none'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Tukarkan
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Floating Mascot Widget with Cheering Speech in Bottom Corner */}
      <div className="fixed bottom-4 right-4 z-30 pointer-events-none flex flex-col items-end">
        <div className="mb-1 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-1.5 shadow-lg border border-slate-100 text-[11px] font-extrabold text-slate-800 max-w-[200px] text-right pointer-events-auto">
          Semangat belajarnya hari ini, {userName}! 🌟
        </div>
        <div className="pointer-events-auto">
          <BlueBird step={1} size={70} />
        </div>
      </div>

      {/* Mini Quiz Modal */}
      <AnimatePresence>
        {activeQuizSubject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-[420px] rounded-3xl bg-white p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600">
                      Kuis {educationLevel}
                    </span>
                    <h3 className="text-sm font-black text-slate-800">
                      {activeQuizSubject.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveQuizSubject(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {!quizFinished ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-400">
                    <span>Soal {quizStep + 1} dari {sampleQuestions.length}</span>
                    <span className="text-blue-600">Skor: {quizScore}</span>
                  </div>

                  <p className="text-sm font-extrabold text-slate-800 leading-snug">
                    {sampleQuestions[quizStep].q}
                  </p>

                  <div className="space-y-2">
                    {sampleQuestions[quizStep].options.map((opt, oIdx) => {
                      const isSelected = quizAnswerSelected === oIdx;
                      const isCorrect = sampleQuestions[quizStep].correct === oIdx;

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={quizAnswerSelected !== null}
                          onClick={() => handleSelectQuizAnswer(oIdx)}
                          className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all border ${
                            quizAnswerSelected !== null
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                : isSelected
                                ? 'bg-rose-50 border-rose-500 text-rose-800'
                                : 'bg-slate-50 border-slate-200 text-slate-400'
                              : 'bg-white hover:bg-blue-50/50 border-slate-200 text-slate-700 hover:border-blue-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-800">
                    Kuis Selesai! 🎉
                  </h4>
                  <p className="text-xs font-bold text-slate-500">
                    Kamu berhasil menjawab {quizScore} dari {sampleQuestions.length} soal dengan benar!
                  </p>
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black">
                    +{(activeQuizSubject.xpReward || 50) + 20} XP Belajar & +3 Token Koin Ditambahkan!
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveQuizSubject(null)}
                    className="w-full py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-xs shadow-md"
                  >
                    Tutup & Kembali
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Redeemed Voucher Notification Modal */}
      <AnimatePresence>
        {redeemedVoucher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-[380px] rounded-3xl bg-white p-5 shadow-2xl text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Penukaran Berhasil!
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Voucher untuk <b>{redeemedVoucher.title}</b> telah berhasil diterbitkan.
              </p>

              {/* Code Box */}
              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                <span className="font-mono text-sm font-black text-blue-700 tracking-wider">
                  {redeemedVoucher.code}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(redeemedVoucher.code);
                    setCopiedCode(true);
                    playButtonClick();
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white shadow-sm text-xs font-bold text-slate-700 flex items-center gap-1"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setRedeemedVoucher(null)}
                className="w-full py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-xs shadow-md"
              >
                Selesai
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
