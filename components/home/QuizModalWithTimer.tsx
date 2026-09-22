'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Clock,
  AlertTriangle,
  Lightbulb,
  PlusCircle,
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  X,
  Zap,
} from 'lucide-react';
import { Subject, getQuestionsForSubject } from '@/lib/curriculumData';
import {
  playButtonClick,
  playSuccessSound,
  playCountdownTick,
  playWarningSound,
  playHintSound,
} from '@/lib/audio/soundManager';

interface QuizModalWithTimerProps {
  subject: Subject;
  educationLevel: string;
  userTokens: number;
  onClose: () => void;
  onCompleteQuiz: (xpEarned: number, tokensEarned: number) => void;
  onUseTokenForTime: () => boolean;
}

const QUESTION_DURATION_SECONDS = 25;

export function QuizModalWithTimer({
  subject,
  educationLevel,
  userTokens,
  onClose,
  onCompleteQuiz,
  onUseTokenForTime,
}: QuizModalWithTimerProps) {
  const questions = getQuestionsForSubject(subject.name, educationLevel);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION_SECONDS);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [bonusTimeAdded, setBonusTimeAdded] = useState(false);

  const currentQ = questions[currentStep];

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer logic
  useEffect(() => {
    if (isFinished || selectedAnswer !== null || isTimeUp) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimeUp(true);
          playWarningSound();
          return 0;
        }

        const next = prev - 1;
        // Urgent countdown tick sound during last 5 seconds (5, 4, 3, 2, 1)
        if (next <= 5 && next > 0) {
          playCountdownTick(true);
        }

        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStep, selectedAnswer, isTimeUp, isFinished]);

  // Handle Answer Selection
  const handleSelectAnswer = (idx: number) => {
    if (selectedAnswer !== null || isTimeUp) return;
    playButtonClick();
    setSelectedAnswer(idx);

    if (idx === currentQ.correct) {
      setScore((prev) => prev + 1);
      playSuccessSound();
    } else {
      playWarningSound();
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    playButtonClick();
    if (currentStep + 1 < questions.length) {
      setCurrentStep((prev) => prev + 1);
      setTimeLeft(QUESTION_DURATION_SECONDS);
      setSelectedAnswer(null);
      setIsTimeUp(false);
      setShowHint(false);
      setBonusTimeAdded(false);
    } else {
      setIsFinished(true);
      playSuccessSound();
      const earnedXp = subject.xpReward + score * 15;
      const earnedTokens = 2 + (score > 1 ? 1 : 0);
      onCompleteQuiz(earnedXp, earnedTokens);
    }
  };

  // Add extra time (+15s) using token or booster
  const handleAddExtraTime = () => {
    if (isTimeUp && timeLeft === 0) {
      // Revive from time up
      const success = onUseTokenForTime();
      if (success) {
        setIsTimeUp(false);
        setTimeLeft(15);
        setBonusTimeAdded(true);
        playSuccessSound();
      }
    } else {
      const success = onUseTokenForTime();
      if (success) {
        setTimeLeft((prev) => prev + 15);
        setBonusTimeAdded(true);
        playSuccessSound();
      }
    }
  };

  // Toggle Hint
  const handleToggleHint = () => {
    if (!showHint) {
      playHintSound();
    } else {
      playButtonClick();
    }
    setShowHint((prev) => !prev);
  };

  // Timer color indicator
  const getTimerStyles = () => {
    if (timeLeft <= 5) {
      return 'bg-rose-50 border-rose-400 text-rose-600 animate-pulse';
    }
    if (timeLeft <= 10) {
      return 'bg-amber-50 border-amber-300 text-amber-600';
    }
    return 'bg-emerald-50 border-emerald-300 text-emerald-700';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 15 }}
        className="w-full max-w-[430px] rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-sky-50 via-indigo-50/40 to-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${subject.color} flex items-center justify-center text-white shadow-sm`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                Materi {educationLevel}
              </span>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                {subject.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playButtonClick();
              onClose();
            }}
            aria-label="Tutup Kuis"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5">
          {!isFinished ? (
            <>
              {/* Question Progress & Interactive Timer Bar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-xs font-black text-slate-500">
                  <span>Soal {currentStep + 1}</span>
                  <span>/</span>
                  <span>{questions.length}</span>
                </div>

                {/* Countdown Timer Badge */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-black transition-all ${getTimerStyles()}`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timeLeft} Detik</span>
                </div>

                {/* Booster button: Tambahkan Waktu */}
                <button
                  type="button"
                  id="btn-add-extra-time"
                  onClick={handleAddExtraTime}
                  disabled={userTokens <= 0}
                  title="Gunakan 1 Token untuk tambah 15 detik"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[11px] font-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusCircle className="w-3 h-3 text-indigo-600" />
                  <span>+15s Waktu</span>
                  <span className="text-[9px] bg-indigo-200/80 px-1 rounded-full">
                    {userTokens} Koin
                  </span>
                </button>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* WARNING ALERT WHEN TIME IS RUNNING OUT (<= 5s) */}
              {timeLeft <= 5 && !isTimeUp && selectedAnswer === null && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce flex-shrink-0" />
                  <span className="text-xs font-black">
                    ⚠️ Peringatan: Waktu tersisa tinggal {timeLeft} detik lagi! Segera pilih jawaban.
                  </span>
                </motion.div>
              )}

              {/* TIME UP ALERT NOTIFICATION */}
              {isTimeUp && selectedAnswer === null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-rose-700">
                    <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    <h4 className="text-xs font-black">
                      ⏰ Waktu Pengerjaan Habis!
                    </h4>
                  </div>
                  <p className="text-[11px] text-rose-600 font-bold">
                    Kamu kehabisan waktu untuk soal ini. Kamu bisa menambah waktu menggunakan 1 Koin Token atau lanjut ke soal berikutnya.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleAddExtraTime}
                      disabled={userTokens <= 0}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-1 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Tambah +15s (1 Token)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-700 font-extrabold text-xs hover:bg-rose-100/50 cursor-pointer"
                    >
                      Lewati Soal
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Question Text */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-extrabold text-slate-800 leading-snug">
                  {currentQ.q}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-2">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswer === oIdx;
                  const isCorrect = currentQ.correct === oIdx;
                  const showFeedback = selectedAnswer !== null || isTimeUp;

                  let btnStyle =
                    'bg-white hover:bg-blue-50/60 border-slate-200 text-slate-700 hover:border-blue-300';
                  if (showFeedback) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-50 border-emerald-500 text-emerald-900 font-black shadow-sm';
                    } else if (isSelected) {
                      btnStyle =
                        'bg-rose-50 border-rose-400 text-rose-800 font-black';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={showFeedback}
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all border flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                      {showFeedback && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* PETUNJUK (HINT) SECTION */}
              <div className="pt-1">
                <button
                  type="button"
                  id="btn-toggle-hint"
                  onClick={handleToggleHint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-black transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{showHint ? 'Tutup Petunjuk' : '💡 Buka Petunjuk Soal'}</span>
                </button>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs space-y-1"
                    >
                      <div className="flex items-center gap-1.5 font-black text-amber-800">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Petunjuk Belajar:</span>
                      </div>
                      <p className="text-[11px] font-bold text-amber-800/90 leading-relaxed">
                        {currentQ.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Explanation & Next Button after answering */}
              {(selectedAnswer !== null || isTimeUp) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 pt-2"
                >
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
                    <span className="font-black block">Penjelasan Konsep:</span>
                    <p className="text-[11px] font-medium leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>
                      {currentStep + 1 < questions.length
                        ? 'Lanjut Soal Berikutnya'
                        : 'Selesai & Lihat Skor'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* QUIZ FINISHED CELEBRATION */
            <div className="text-center py-5 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">
                  Latihan Selesai! 🎉
                </h4>
                <p className="text-xs font-bold text-slate-500">
                  Hebat! Kamu berhasil menjawab {score} dari {questions.length} soal dengan tepat.
                </p>
              </div>

              {/* Reward Earned Box */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-900 space-y-1 text-center">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                  Hadiah Poin Diperoleh
                </span>
                <p className="text-sm font-black text-slate-900">
                  +{subject.xpReward + score * 15} XP Belajar & +2 Koin Token!
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Poin bertambah ke tabungan penukaran BOT WA PREMIUM.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  playButtonClick();
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Kembali ke Menu Utama
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
