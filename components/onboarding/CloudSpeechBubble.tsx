'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playTypingSound } from '@/lib/audio/soundManager';

interface CloudSpeechBubbleProps {
  id?: string;
  text: string;
  speedMs?: number;
  onTypingFinished?: () => void;
  children?: React.ReactNode;
  bubbleKey?: string | number;
  tailPosition?: 'left' | 'bottom-left' | 'bottom';
}

export function CloudSpeechBubble({
  id = 'onboarding-speech-bubble',
  text,
  speedMs = 28,
  onTypingFinished,
  children,
  bubbleKey = 'bubble',
  tailPosition = 'left',
}: CloudSpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isCancelled = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Small delay before typing starts for natural feel
    const startDelay = setTimeout(() => {
      if (isCancelled) return;
      setDisplayedText('');
      setIsTyping(true);
      setShowControls(false);
      indexRef.current = 0;

      timerRef.current = setInterval(() => {
        if (isCancelled) return;
        if (indexRef.current < text.length) {
          const nextChar = text.charAt(indexRef.current);
          setDisplayedText((prev) => prev + nextChar);
          indexRef.current += 1;

          // Play subtle typewriter sound (not on whitespace)
          if (nextChar.trim() !== '') {
            playTypingSound();
          }
        } else {
          // Finished typing
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTyping(false);

          if (onTypingFinished) {
            onTypingFinished();
          }

          // Wait 400ms before revealing interaction button/form controls
          setTimeout(() => {
            if (!isCancelled) setShowControls(true);
          }, 450);
        }
      }, speedMs);
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(startDelay);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speedMs, onTypingFinished]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={bubbleKey}
        id={id}
        initial={{ opacity: 0, scale: 0.95, y: 10, filter: 'blur(6px)' }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: -10,
          filter: 'blur(6px)',
          transition: { duration: 0.2 },
        }}
        className="relative w-full z-20 flex flex-col items-center"
      >
        {/* Cloud-like outer container with multi-layered soft shadows & seamless blend */}
        <div className="relative w-full rounded-3xl bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(30,58,138,0.12),0_4px_12px_rgba(99,102,241,0.06)] border-2 border-white/80 transition-all">
          {/* Subtle 3D Top Specular Lighting Line */}
          <div className="absolute inset-x-6 top-1 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 rounded-full pointer-events-none" />

          {/* Speech Bubble Tail pointing towards Dokter Aurel */}
          {tailPosition === 'left' && (
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-5 h-5 bg-white rotate-45 border-l-2 border-b-2 border-slate-100 shadow-[-3px_4px_8px_rgba(30,58,138,0.05)] rounded-xs hidden sm:block" />
          )}

          {tailPosition === 'bottom-left' && (
            <div className="absolute -bottom-2.5 left-10 w-5 h-5 bg-white rotate-45 border-b-2 border-r-2 border-slate-100 shadow-[3px_4px_8px_rgba(30,58,138,0.06)] rounded-xs" />
          )}

          {/* Typewriter Text Display */}
          <div className="relative z-10">
            <p className="text-slate-800 text-[18px] sm:text-[21px] md:text-[23px] font-extrabold tracking-tight leading-[1.38] antialiased">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-2.5 h-5 ml-1 bg-cyan-600 rounded-sm align-middle"
                />
              )}
            </p>
          </div>
        </div>

        {/* Interaction Controls (Revealed after typing finishes with smooth fade-up) */}
        {children && (
          <div className="w-full mt-4">
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98, filter: 'blur(4px)' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                  className="w-full"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
