'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail, UserCheck } from 'lucide-react';
import { playButtonClick, playSuccessSound } from '@/lib/audio/soundManager';

interface LoginCardProps {
  onLoginSuccess: () => void;
}

export function LoginCard({ onLoginSuccess }: LoginCardProps) {
  const [email, setEmail] = useState('siswa@earningreward.id');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    playButtonClick();

    // Smooth login transition simulating auth
    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();
      onLoginSuccess();
    }, 450);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    playButtonClick();
    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();
      onLoginSuccess();
    }, 350);
  };

  return (
    <div className="w-full max-w-[430px] mx-auto p-4 flex flex-col justify-center items-center min-h-[100dvh]">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full rounded-3xl bg-white/95 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(30,58,138,0.14),0_4px_16px_rgba(99,102,241,0.06)] border-2 border-white flex flex-col items-center"
      >
        {/* Brand Icon Header */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-3">
          <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center">
          Earning Reward
        </h1>
        <p className="text-xs font-bold text-slate-500 text-center mt-1">
          {isSignUp ? 'Daftar akun baru dan kumpulkan hadiah voucher & bot' : 'Masuk untuk mengumpulkan reward bot & voucher belajar'}
        </p>

        {/* Tab Toggle: Masuk vs Daftar */}
        <div className="grid grid-cols-2 gap-1 w-full bg-slate-100 p-1 rounded-2xl my-5">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              playButtonClick();
            }}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              !isSignUp
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk Akun
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              playButtonClick();
            }}
            className={`py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              isSignUp
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
          <div className="space-y-1">
            <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Email / Akun
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="input-auth-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 text-slate-800 text-sm font-bold border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="input-auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kata sandi..."
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 text-slate-800 text-sm font-bold border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            id="btn-auth-submit"
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97, y: 3 }}
            className="w-full mt-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-base tracking-wide shadow-[0_8px_0_#312e81,0_16px_25px_rgba(79,70,229,0.35)] active:shadow-[0_2px_0_#312e81] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>{isSignUp ? 'Daftar & Lanjut' : 'Masuk Sekarang'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="w-full mt-4 pt-4 border-t border-slate-100 text-center">
          <button
            id="btn-quick-login"
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Mulai Cepat (Demo Langsung ke Onboarding)</span>
          </button>

          <p className="text-[10px] text-slate-400 font-bold mt-2.5 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Setelah login/signup, Anda akan diarahkan ke Onboarding Interaktif Burung Biru</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
