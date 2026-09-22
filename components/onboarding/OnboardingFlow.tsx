'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { EducationLevel } from '@/types/onboarding';
import { DokterAurel } from './DokterAurel';
import { CloudSpeechBubble } from './CloudSpeechBubble';
import { StepWelcome } from './StepWelcome';
import { StepName } from './StepName';
import { StepAge } from './StepAge';
import { StepEducationLevel } from './StepEducationLevel';
import { StepFinish } from './StepFinish';
import {
  isSoundEnabled,
  toggleSound,
  playTransitionSound,
} from '@/lib/audio/soundManager';

export interface OnboardingFlowProps {
  onCompleteRedirect?: string;
  onReset?: () => void;
}

export function OnboardingFlow({
  onCompleteRedirect = '/home',
}: OnboardingFlowProps) {
  const router = useRouter();

  // Onboarding steps:
  // 0 = Welcome
  // 1 = Name
  // 2 = Age
  // 3 = Education Level
  // 4 = Finish
  const [currentStep, setCurrentStep] = useState(0);

  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState(16);
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('SMA');
  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const handleNextStep = (next: number) => {
    playTransitionSound();
    setCurrentStep(next);
  };

  const handleFinish = () => {
    const timestamp = new Date().toISOString();
    try {
      localStorage.setItem('userName', name || 'Siswa Cerdas');
      localStorage.setItem('userAge', age.toString());
      localStorage.setItem('educationLevel', educationLevel);
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.setItem('onboardingCompletedAt', timestamp);
      localStorage.setItem('soundEnabled', soundActive ? 'true' : 'false');
    } catch (e) {
      console.warn('LocalStorage error on saving onboarding profile', e);
    }

    router.push(onCompleteRedirect);
  };

  // Dialogues according to user's specification with Dokter Aurel
  const dialogues = [
    {
      step: 0,
      text: 'Hai, aku Dokter Aurel! Yuk kenalan dulu. Selamat datang di Earning Reward! Di sini kamu bisa belajar seru dan kumpulkan poin untuk ditukarkan menjadi BOT WA PREMIUM!',
    },
    {
      step: 1,
      text: 'Pertama-tama, kenalan dulu yuk! Siapa nama panggilan atau nama lengkapmu?',
    },
    {
      step: 2,
      text: name
        ? `Senang kenal denganmu, ${name}! Berapa umurmu sekarang?`
        : 'Berapa umurmu sekarang?',
    },
    {
      step: 3,
      text: 'Sekarang kamu berada di jenjang fase pendidikan mana?',
    },
    {
      step: 4,
      text: 'Profil belajarmu sudah siap! Siap mulai perjalanan edukasimu bersama Dokter Aurel?',
    },
  ];

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-x-hidden select-none bg-gradient-to-b from-sky-200 via-indigo-100/60 to-purple-200">
      {/* Background Decorative Pastel Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-cyan-300/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-[480px] mx-auto px-4 pt-4 pb-2 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-200" />
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-800 tracking-wider uppercase">
              Earning Reward
            </h1>
            <p className="text-[10px] font-bold text-cyan-700">
              Pemandu Edukasi: Dokter Aurel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress Indicator Pills */}
          <div className="flex items-center gap-1 bg-white/70 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-sm border border-white/60">
            {[0, 1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === currentStep
                    ? 'w-4 bg-cyan-600'
                    : s < currentStep
                    ? 'w-2 bg-blue-400'
                    : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Sound ON/OFF Toggle Button */}
          <button
            id="btn-toggle-sound"
            type="button"
            onClick={handleToggleSound}
            aria-label={soundActive ? 'Matikan Suara' : 'Nyalakan Suara'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200/60 font-bold text-xs transition-all cursor-pointer"
          >
            {soundActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-extrabold text-cyan-700">
                  SUARA ON
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-[11px] font-bold text-slate-400">
                  SUARA OFF
                </span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Interactive Stage: Dokter Aurel on the left side with seamless gradient body merge */}
      <main className="w-full max-w-[480px] mx-auto px-4 flex-1 flex flex-col justify-center items-center py-2 z-20">
        <div className="w-full flex flex-col items-center">
          {/* Top Section: Dokter Aurel (Samping Kiri) with Speech Bubble connecting seamlessly */}
          <div className="w-full grid grid-cols-12 items-end gap-2 mb-2">
            {/* Dokter Aurel on the Left Side (Transparent background, Lower body fades into page gradient) */}
            <div className="col-span-5 sm:col-span-4 flex justify-center items-end relative -mb-3 z-30">
              <DokterAurel
                size="hero"
                showBadge={true}
                withGlow={true}
                className="w-full"
              />
            </div>

            {/* Speech Bubble on the Right/Adjacent Side, perfectly pointing to Dokter Aurel */}
            <div className="col-span-7 sm:col-span-8 flex flex-col justify-end z-20 pb-2">
              <CloudSpeechBubble
                bubbleKey={`step-${currentStep}`}
                text={dialogues[currentStep].text}
                tailPosition="bottom-left"
              >
                {/* Step 0: Welcome Continue Button ("Yuk Kenalan Dulu") */}
                {currentStep === 0 && (
                  <StepWelcome onNext={() => handleNextStep(1)} />
                )}
              </CloudSpeechBubble>
            </div>
          </div>

          {/* Form Controls for Steps 1, 2, 3, 4 (rendered cleanly below the doctor & dialogue) */}
          {currentStep > 0 && (
            <div className="w-full mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Step 1: Question 1 - Name */}
              {currentStep === 1 && (
                <StepName
                  initialValue={name}
                  onSubmit={(val) => {
                    setName(val);
                    handleNextStep(2);
                  }}
                />
              )}

              {/* Step 2: Question 2 - Age */}
              {currentStep === 2 && (
                <StepAge
                  initialValue={age}
                  onSubmit={(val) => {
                    setAge(val);
                    handleNextStep(3);
                  }}
                />
              )}

              {/* Step 3: Question 3 - Education Level */}
              {currentStep === 3 && (
                <StepEducationLevel
                  initialValue={educationLevel}
                  onSubmit={(val) => {
                    setEducationLevel(val);
                    handleNextStep(4);
                  }}
                />
              )}

              {/* Step 4: Finish */}
              {currentStep === 4 && (
                <StepFinish
                  name={name}
                  age={age}
                  educationLevel={educationLevel}
                  onFinish={handleFinish}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Footer Note / Safe Area */}
      <footer className="w-full max-w-[480px] mx-auto px-4 py-3 flex items-center justify-between text-slate-500 text-[11px] font-semibold z-10">
        <span className="truncate flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          Pemandu Belajar: Dokter Aurel
        </span>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={() => handleNextStep(currentStep - 1)}
            className="flex items-center gap-1 text-slate-600 hover:text-cyan-700 font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Kembali</span>
          </button>
        )}
      </footer>
    </div>
  );
}
