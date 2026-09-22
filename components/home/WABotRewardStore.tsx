'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Clock,
  ExternalLink,
  ShieldCheck,
  Star,
  ChevronRight,
} from 'lucide-react';
import { WA_BOT_REWARDS, WABotReward } from '@/lib/curriculumData';
import { playButtonClick, playSuccessSound } from '@/lib/audio/soundManager';

interface WABotRewardStoreProps {
  userPoints: number;
  searchQuery?: string;
  onRedeem: (reward: WABotReward, voucherCode: string) => void;
}

export function WABotRewardStore({ userPoints, searchQuery = '', onRedeem }: WABotRewardStoreProps) {
  const [selectedReward, setSelectedReward] = useState<WABotReward | null>(null);
  const [redeemedCode, setRedeemedCode] = useState<{
    reward: WABotReward;
    code: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Filter rewards based on search query
  const filteredRewards = WA_BOT_REWARDS.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.duration.toLowerCase().includes(q) ||
      r.badge.toLowerCase().includes(q) ||
      r.features.some((f) => f.toLowerCase().includes(q))
    );
  });

  const handleRedeem = (reward: WABotReward) => {
    if (userPoints < reward.xpCost) {
      playButtonClick();
      return;
    }
    playSuccessSound();

    // Deterministic voucher code based on reward days and current points
    const randCode = ((reward.days * 937 + userPoints * 17) % 8999) + 1000;
    const voucher = `WAPREM-${reward.days}D-${randCode}`;

    setRedeemedCode({ reward, code: voucher });
    setCopied(false);
    onRedeem(reward, voucher);
  };

  return (
    <div className="space-y-4">
      {/* Bot WA Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 sm:p-5 text-white shadow-[0_12px_28px_rgba(5,150,105,0.25)] overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-emerald-200" />
              <span>Katalog Hadiah Eksklusif</span>
            </div>
            <h3 className="text-lg font-black tracking-tight">
              BOT WA PREMIUM 1 Hari - 1 Minggu
            </h3>
            <p className="text-xs text-emerald-100 font-medium leading-relaxed">
              Kumpulkan poin XP dari mengerjakan modul pelajaran dan kuis untuk menukarkan akses Bot WhatsApp Edukasi Premium.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 shadow-inner">
            <Bot className="w-7 h-7 text-emerald-100" />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/20 text-[11px] font-bold">
          <div className="flex items-center gap-1.5 text-emerald-50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>AI Gemini Multimodel</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-50">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>Respon Cepat VIP</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-50">
            <Clock className="w-3.5 h-3.5 text-emerald-300" />
            <span>Aktif 24 Jam Penuh</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-50">
            <Star className="w-3.5 h-3.5 text-yellow-300" />
            <span>Bisa Masuk Grup Belajar</span>
          </div>
        </div>
      </div>

      {/* List of Exclusive BOT WA Packages */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Pilihan Paket Durasi (1 Hari s/d 1 Minggu)
          </h4>
          <span className="text-xs font-bold text-blue-600">
            Saldo Kamu: <b>{userPoints} XP</b>
          </span>
        </div>

        {filteredRewards.length === 0 ? (
          <div className="p-6 rounded-3xl bg-white border border-slate-100 text-center space-y-2">
            <p className="text-xs font-black text-slate-700">
              Paket Bot WA tidak ditemukan
            </p>
            <p className="text-[11px] text-slate-400">
              Coba kata kunci lain seperti &quot;1 Hari&quot;, &quot;1 Minggu&quot;, atau &quot;VIP&quot;.
            </p>
          </div>
        ) : (
          filteredRewards.map((reward) => {
            const canAfford = userPoints >= reward.xpCost;
            const progressPercent = Math.min(
              100,
              Math.round((userPoints / reward.xpCost) * 100)
            );

            return (
              <motion.div
                key={reward.id}
                whileHover={{ y: -2 }}
                className={`rounded-3xl p-4 border-2 transition-all relative overflow-hidden ${
                  reward.isPopular
                    ? 'bg-gradient-to-b from-white to-emerald-50/40 border-emerald-300 shadow-[0_8px_20px_rgba(16,185,129,0.12)]'
                    : 'bg-white border-slate-100 shadow-[0_4px_16px_rgba(30,58,138,0.05)]'
                }`}
              >
              {/* Popular Badge */}
              {reward.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm">
                  {reward.badge}
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[10px]">
                      BOT WA
                    </span>
                    <h4 className="text-sm font-black text-slate-900">
                      BOT WA PREMIUM {reward.duration}
                    </h4>
                  </div>
                  <p className="text-xs font-black text-emerald-600">
                    Harga: {reward.xpCost.toLocaleString('id-ID')} XP
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-extrabold text-slate-400 block">
                    Durasi
                  </span>
                  <span className="text-xs font-black text-slate-800">
                    {reward.days * 24} Jam
                  </span>
                </div>
              </div>

              {/* Feature Points */}
              <ul className="mt-3 space-y-1 text-[11px] text-slate-600 font-medium">
                {reward.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Point Progress Bar */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] font-black mb-1">
                  <span className="text-slate-400">
                    Progres Poin ({progressPercent}%)
                  </span>
                  <span
                    className={
                      canAfford ? 'text-emerald-600' : 'text-slate-500'
                    }
                  >
                    {userPoints} / {reward.xpCost} XP
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      canAfford
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id={`btn-redeem-${reward.id}`}
                onClick={() => handleRedeem(reward)}
                disabled={!canAfford}
                className={`mt-3 w-full py-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  canAfford
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-[0_4px_12px_rgba(5,150,105,0.25)] active:translate-y-0.5'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                {canAfford ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tukarkan Sekarang ({reward.xpCost} XP)</span>
                  </>
                ) : (
                  <span>
                    Butuh {(reward.xpCost - userPoints).toLocaleString('id-ID')}{' '}
                    XP Lagi
                  </span>
                )}
              </button>
            </motion.div>
          );
        })
      )}
      </div>

      {/* Redemption Success Modal */}
      <AnimatePresence>
        {redeemedCode && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-[390px] rounded-3xl bg-white p-5 shadow-2xl border border-slate-100 space-y-4 text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">
                  Klaim Bot WA Premium Berhasil! 🎉
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Paket <b>BOT WA PREMIUM {redeemedCode.reward.duration}</b> siap diaktifkan di WhatsApp.
                </p>
              </div>

              {/* Voucher Code Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase text-emerald-700 block">
                    KODE VOUCHER WHATSAPP
                  </span>
                  <span className="font-mono text-sm font-black text-emerald-950 tracking-wider">
                    {redeemedCode.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(redeemedCode.code);
                    setCopied(true);
                    playButtonClick();
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-white text-emerald-700 font-extrabold text-xs shadow-sm flex items-center gap-1 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                >
                  {copied ? (
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

              {/* Activation Instructions */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-1">
                <span className="font-black text-slate-800 block">
                  Cara Aktivasi ke Bot WA:
                </span>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  1. Salin kode voucher di atas.<br />
                  2. Kirim pesan ke nomor WhatsApp bot edukasi dengan format: <b>!klaim {redeemedCode.code}</b>.<br />
                  3. Bot otomatis mengaktifkan fitur premium selama {redeemedCode.reward.duration}.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Halo Admin! Saya ingin mengaktifkan BOT WA PREMIUM ${redeemedCode.reward.duration} dengan kode voucher: ${redeemedCode.code}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka WhatsApp & Klaim Voucher</span>
                </a>

                <button
                  type="button"
                  onClick={() => setRedeemedCode(null)}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Tutup & Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
