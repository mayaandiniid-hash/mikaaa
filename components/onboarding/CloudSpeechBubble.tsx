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
}

export function CloudSpeechBubble({
  id = 'onboarding-speech-bubble',
  text,
  speedMs = 32,
  onTypingFinished,
  children,
  bubbleKey = 'bubble',
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

          // Wait 500-750ms before revealing interaction button/form controls
          setTimeout(() => {
            if (!isCancelled) setShowControls(true);
          }, 600);
        }
      }, speedMs);
    }, 280);

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
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: -10,
          transition: { duration: 0.25 },
        }}
        className="relative w-full max-w-[430px] mx-auto z-20 flex flex-col items-center"
      >
        {/* Cloud-like outer container with multi-layered soft shadows & 3D bevel */}
        <div className="relative w-full rounded-3xl bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(30,58,138,0.16),0_4px_12px_rgba(99,102,241,0.08)] border-2 border-white/80 transition-all">
          {/* Subtle 3D Top Specular Lighting Line */}
          <div className="absolute inset-x-6 top-1 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 rounded-full pointer-events-none" />

          {/* Cloud Bubble Tail pointing down towards the Blue Bird */}
          <div className="absolute -bottom-3 left-12 w-6 h-6 bg-white rotate-45 border-b-2 border-r-2 border-slate-100/60 shadow-[3px_4px_8px_rgba(30,58,138,0.08)] rounded-sm" />

          {/* Decorative Cloud Billow Accents */}
          <div className="absolute -top-3 left-8 w-12 h-6 bg-white/90 rounded-full blur-[1px] -z-10 pointer-events-none" />
          <div className="absolute -top-4 right-12 w-16 h-8 bg-white/90 rounded-full blur-[1px] -z-10 pointer-events-none" />

          {/* Typewriter Text Display */}
          <div className="relative z-10">
            <p className="text-slate-800 text-[19px] sm:text-[22px] md:text-[24px] font-extrabold tracking-tight leading-[1.38] antialiased">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-2.5 h-5 ml-1 bg-blue-600 rounded-sm align-middle"
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
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  exit={{ opacity: 0, y: -6 }}
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
