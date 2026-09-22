'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginCard } from '@/components/auth/LoginCard';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { initAudio } from '@/lib/audio/soundManager';

export default function RootPage() {
  const router = useRouter();
  // State: 'checking' | 'login' | 'onboarding'
  const [viewState, setViewState] = useState<'checking' | 'login' | 'onboarding'>(
    () => {
      if (typeof window !== 'undefined') {
        try {
          const isCompleted = localStorage.getItem('onboardingCompleted');
          if (isCompleted === 'true') {
            return 'checking';
          }
        } catch (e) {
          console.warn(e);
        }
      }
      return 'login';
    }
  );

  useEffect(() => {
    // Check if onboarding is already completed
    try {
      const isCompleted = localStorage.getItem('onboardingCompleted');
      if (isCompleted === 'true') {
        router.push('/home');
      }
    } catch (e) {
      console.warn('LocalStorage access error', e);
    }
  }, [router]);

  const handleLoginSuccess = () => {
    // Initialize audio context upon user login gesture
    initAudio();
    setViewState('onboarding');
  };

  if (viewState === 'checking') {
    return (
      <div className="w-full min-h-[100dvh] flex items-center justify-center bg-gradient-to-b from-sky-200 via-indigo-100 to-purple-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-black text-slate-700 tracking-wider uppercase">
            Memuat Earning Reward...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] bg-gradient-to-b from-sky-200 via-indigo-100 to-purple-200 selection:bg-blue-500 selection:text-white">
      {viewState === 'login' ? (
        <LoginCard onLoginSuccess={handleLoginSuccess} />
      ) : (
        <OnboardingFlow onCompleteRedirect="/home" />
      )}
    </div>
  );
}
