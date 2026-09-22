'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { EducationLevel } from '@/types/onboarding';
import { BlueBird } from './BlueBird';
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
  const [isInitialFlyIn, setIsInitialFlyIn] = useState(true);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const handleNextStep = (next: number) => {
    playTransitionSound();
    setCurrentStep(next);
  };

  const handleFinish = () => {
    // Save to localStorage as mandated
    const timestamp = new Date().toISOString();
    try {
      localStorage.setItem('userName', name);
      localStorage.setItem('userAge', age.toString());
      localStorage.setItem('educationLevel', educationLevel);
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.setItem('onboardingCompletedAt', timestamp);
      localStorage.setItem('soundEnabled', soundActive ? 'true' : 'false');
    } catch (e) {
      console.warn('LocalStorage error on saving onboarding profile', e);
    }

    // Redirect to personalized Home
    router.push(onCompleteRedirect);
  };

  // Dialogues according to specification
  const dialogues = [
    {
      step: 0,
      text: 'Halo kak, selamat datang di Earning Reward. Kakak bisa mendapatkan reward berupa hadiah yang bisa Anda tukarkan untuk kebutuhan bot atau voucher untuk akses sesuai dengan hadiah yang telah tersedia!',
    },
    {
      step: 1,
      text: 'Ngomong-ngomong, kenalan dulu yuk. Siapa namamu?',
    },
    {
      step: 2,
      text: 'Berapa umurmu?',
    },
    {
      step: 3,
      text: 'Sekarang kamu berada di fase mana?',
    },
    {
      step: 4,
      text: 'Siap mulai perjalanan belajarmu?',
    },
  ];

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-x-hidden select-none bg-gradient-to-b from-sky-200 via-indigo-100 to-purple-200">
      {/* Background Decorative Pastel Blobs & Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-blue-300/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-cyan-200/50 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-[440px] mx-auto px-4 pt-4 pb-2 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-800 tracking-wider uppercase">
              Earning Reward
            </h1>
            <p className="text-[10px] font-bold text-slate-500">
              Interactive Onboarding
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress Indicator Pills */}
          <div className="flex items-center gap-1 bg-white/70 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-sm">
            {[0, 1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === currentStep
                    ? 'w-4 bg-blue-600'
                    : s < currentStep
                    ? 'w-2 bg-indigo-400'
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
                <Volume2 className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-extrabold text-blue-700">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-[11px] font-bold text-slate-400">SOUND OFF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="w-full max-w-[440px] mx-auto px-4 flex-1 flex flex-col justify-center items-center py-4 z-20">
        {/* Step Cloud Speech Bubble */}
        <div className="w-full mb-6">
          <CloudSpeechBubble
            bubbleKey={`step-${currentStep}`}
            text={dialogues[currentStep].text}
          >
            {/* Step 0: Welcome Continue Button */}
            {currentStep === 0 && (
              <StepWelcome onNext={() => handleNextStep(1)} />
            )}

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
          </CloudSpeechBubble>
        </div>

        {/* 3D Blue Bird Mascot - Stays visible & animated during entire conversation */}
        <div className="w-full flex justify-center items-center mt-1">
          <BlueBird
            step={currentStep}
            isInitialFlyIn={isInitialFlyIn}
            onFlyInComplete={() => setIsInitialFlyIn(false)}
            size={112}
          />
        </div>
      </main>

      {/* Bottom Footer Note / Safe Area */}
      <footer className="w-full max-w-[440px] mx-auto px-4 py-3 flex items-center justify-between text-slate-500 text-[11px] font-semibold z-10">
        <span className="truncate">
          Earning Reward Edu-Game Onboarding
        </span>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={() => handleNextStep(currentStep - 1)}
            className="flex items-center gap-1 text-slate-500 hover:text-blue-700 font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Kembali</span>
          </button>
        )}
      </footer>
    </div>
  );
}
