'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface DokterAurelProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showBadge?: boolean;
  withGlow?: boolean;
}

export function DokterAurel({
  size = 'hero',
  className = '',
  showBadge = true,
  withGlow = true,
}: DokterAurelProps) {
  // Dimension presets
  const sizeClasses = {
    sm: 'w-16 h-24',
    md: 'w-24 h-36',
    lg: 'w-36 h-52',
    hero: 'w-48 sm:w-56 h-72 sm:h-84',
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col items-center select-none pointer-events-auto ${className}`}
    >
      {/* Ambient Neon Cyan / Soft Blue Glow behind Doctor */}
      {withGlow && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-44 bg-cyan-400/25 rounded-full blur-2xl pointer-events-none -z-10 animate-pulse" />
      )}

      {/* Floating Doctor Character with smooth gentle breathing animation */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [0, 0.5, 0, -0.5, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeClasses}`}
      >
        {/* Doctor Image with Transparent Background & Bottom Gradient Fade Mask */}
        <div
          className="relative w-full h-full"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
          }}
        >
          <Image
            src="/images/dokter_aurel_transparent.png"
            alt="Dokter Aurel - Pemandu Edu-Game"
            fill
            priority
            sizes="(max-width: 640px) 240px, 320px"
            className="object-contain object-bottom drop-shadow-[0_12px_24px_rgba(6,182,212,0.22)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Floating Neon Glasses Specular Particle */}
        <motion.div
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 right-10 w-2 h-2 rounded-full bg-cyan-300 blur-[1px] shadow-[0_0_8px_#22d3ee]"
        />

        {/* Doctor Name Badge */}
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-md border border-cyan-100 flex items-center gap-1 whitespace-nowrap z-20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-black text-slate-800 tracking-tight">
              Dr. Aurel
            </span>
            <Sparkles className="w-2.5 h-2.5 text-cyan-500" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
