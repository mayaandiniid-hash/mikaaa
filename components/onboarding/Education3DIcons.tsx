'use client';

import React from 'react';
import { EducationLevel } from '@/types/onboarding';

interface IconProps {
  className?: string;
  size?: number;
}

export function SDIcon3D({ className = '', size = 72 }: IconProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(245,158,11,0.25)]"
      >
        <defs>
          <radialGradient id="sd-bg-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sd-backpack-body" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="sd-pocket" x1="30" y1="50" x2="90" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="sd-pencil" x1="75" y1="10" x2="95" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
          <linearGradient id="sd-ruler" x1="15" y1="25" x2="35" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
        </defs>

        {/* Soft 3D Shadow */}
        <ellipse cx="60" cy="106" rx="42" ry="10" fill="rgba(15,23,42,0.18)" />

        {/* Background ambient circular glow */}
        <circle cx="60" cy="58" r="48" fill="url(#sd-bg-glow)" />

        {/* Ruler poking out */}
        <rect x="24" y="24" width="14" height="42" rx="4" transform="rotate(-25 24 24)" fill="url(#sd-ruler)" />
        <line x1="28" y1="27" x2="34" y2="24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="31" y1="33" x2="37" y2="30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="39" x2="40" y2="36" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Pencil poking out */}
        <g transform="rotate(22 86 32)">
          <rect x="78" y="16" width="12" height="34" rx="3" fill="url(#sd-pencil)" />
          {/* Pencil Tip */}
          <polygon points="78,16 84,6 90,16" fill="#fde047" />
          <polygon points="82,9 84,6 86,9" fill="#1e293b" />
          {/* Eraser */}
          <rect x="78" y="44" width="12" height="6" rx="2" fill="#fda4af" />
          <rect x="78" y="42" width="12" height="2" fill="#94a3b8" />
        </g>

        {/* Backpack Handle */}
        <path d="M46 36 C46 22, 74 22, 74 36" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M48 36 C48 24, 72 24, 72 36" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Backpack Main Body */}
        <rect x="25" y="32" width="70" height="66" rx="22" fill="url(#sd-backpack-body)" />
        {/* Specular 3D Highlight Top */}
        <path d="M35 37 Q60 33 85 37" stroke="#bae6fd" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Front 3D Pocket */}
        <rect x="33" y="56" width="54" height="38" rx="14" fill="url(#sd-pocket)" />
        {/* Pocket Highlight */}
        <path d="M38 60 Q60 57 82 60" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Pocket Zipper */}
        <line x1="42" y1="68" x2="78" y2="68" stroke="#78350f" strokeWidth="2" strokeDasharray="3 2" strokeLinecap="round" />
        <circle cx="60" cy="68" r="3.5" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />

        {/* Playful Star Pin Badge */}
        <polygon points="46,45 48,50 53,50 49,53 51,58 46,55 42,58 44,53 40,50 45,50" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function SMPIcon3D({ className = '', size = 72 }: IconProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(14,165,233,0.25)]"
      >
        <defs>
          <linearGradient id="smp-book1" x1="15" y1="65" x2="95" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="smp-book2" x1="20" y1="45" x2="90" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="smp-calc" x1="55" y1="20" x2="105" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Soft shadow */}
        <ellipse cx="60" cy="104" rx="46" ry="10" fill="rgba(15,23,42,0.2)" />

        {/* Bottom Book */}
        <g>
          <path d="M20 78 L86 78 Q96 78 96 88 L96 92 Q96 100 86 100 L20 100 Q14 100 14 89 Q14 78 20 78 Z" fill="url(#smp-book1)" />
          {/* Pages */}
          <rect x="22" y="83" width="70" height="13" rx="3" fill="#f8fafc" />
          <line x1="26" y1="87" x2="88" y2="87" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="26" y1="91" x2="84" y2="91" stroke="#cbd5e1" strokeWidth="1" />
        </g>

        {/* Middle Book */}
        <g transform="rotate(-4 55 68)">
          <path d="M18 56 L82 56 Q92 56 92 66 L92 70 Q92 78 82 78 L18 78 Q12 78 12 67 Q12 56 18 56 Z" fill="url(#smp-book2)" />
          {/* Pages */}
          <rect x="20" y="61" width="68" height="13" rx="3" fill="#ffffff" />
          <line x1="24" y1="65" x2="84" y2="65" stroke="#94a3b8" strokeWidth="1" />
        </g>

        {/* 3D Scientific Calculator leaning */}
        <g transform="rotate(8 78 45)">
          {/* Body */}
          <rect x="52" y="16" width="46" height="66" rx="9" fill="url(#smp-calc)" stroke="#475569" strokeWidth="1.5" />
          {/* LCD Screen */}
          <rect x="58" y="22" width="34" height="16" rx="4" fill="#a7f3d0" />
          <text x="62" y="34" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#065f46">842.50</text>

          {/* Keypad Grid */}
          <rect x="58" y="44" width="7" height="6" rx="2" fill="#64748b" />
          <rect x="67" y="44" width="7" height="6" rx="2" fill="#64748b" />
          <rect x="76" y="44" width="7" height="6" rx="2" fill="#64748b" />
          <rect x="85" y="44" width="7" height="6" rx="2" fill="#f97316" />

          <rect x="58" y="53" width="7" height="6" rx="2" fill="#94a3b8" />
          <rect x="67" y="53" width="7" height="6" rx="2" fill="#94a3b8" />
          <rect x="76" y="53" width="7" height="6" rx="2" fill="#94a3b8" />
          <rect x="85" y="53" width="7" height="6" rx="2" fill="#3b82f6" />

          <rect x="58" y="62" width="7" height="6" rx="2" fill="#94a3b8" />
          <rect x="67" y="62" width="7" height="6" rx="2" fill="#94a3b8" />
          <rect x="76" y="62" width="7" height="6" rx="2" fill="#94a3b8" />
          <rect x="85" y="62" width="7" height="15" rx="2" fill="#10b981" />
        </g>
      </svg>
    </div>
  );
}

export function SMAIcon3D({ className = '', size = 72 }: IconProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(99,102,241,0.3)]"
      >
        <defs>
          <linearGradient id="sma-flask-glass" x1="30" y1="20" x2="90" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="sma-liquid" x1="40" y1="50" x2="80" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="60%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="sma-ribbon" x1="75" y1="60" x2="105" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* Soft ground shadow */}
        <ellipse cx="60" cy="104" rx="42" ry="9" fill="rgba(15,23,42,0.18)" />

        {/* Orbital Atom Ring behind */}
        <ellipse cx="60" cy="62" rx="46" ry="18" stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" transform="rotate(-30 60 62)" fill="none" opacity="0.6" />
        <circle cx="28" cy="42" r="4.5" fill="#c084fc" filter="drop-shadow(0 0 6px #c084fc)" />

        {/* 3D Erlenmeyer Science Flask */}
        <g>
          {/* Flask Lip */}
          <rect x="52" y="18" width="16" height="6" rx="3" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1.5" />
          {/* Flask Neck */}
          <path d="M55 24 L55 44 L30 88 Q26 95 34 98 L86 98 Q94 95 90 88 L65 44 L65 24 Z" fill="url(#sma-flask-glass)" stroke="#818cf8" strokeWidth="2.5" />

          {/* Liquid Inside */}
          <path d="M41 72 Q60 68 79 72 L86 94 Q91 97 84 97 L36 97 Q29 97 34 94 Z" fill="url(#sma-liquid)" />

          {/* Liquid Surface wave */}
          <ellipse cx="60" cy="72" rx="19" ry="4" fill="#c084fc" opacity="0.7" />

          {/* Bubbles */}
          <circle cx="54" cy="84" r="3.5" fill="#ffffff" opacity="0.8" />
          <circle cx="68" cy="79" r="2.5" fill="#ffffff" opacity="0.7" />
          <circle cx="62" cy="89" r="2" fill="#ffffff" opacity="0.6" />

          {/* Glass Specular Glare */}
          <path d="M37 86 L57 50" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
          <path d="M43 92 L47 85" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* Second Orbital Ring */}
        <ellipse cx="60" cy="62" rx="46" ry="18" stroke="#38bdf8" strokeWidth="2" transform="rotate(35 60 62)" fill="none" opacity="0.55" />
        <circle cx="94" cy="80" r="4" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />

        {/* Academic Diploma Ribbon */}
        <g transform="translate(10, 0)">
          <rect x="74" y="65" width="28" height="10" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="85" y="64" width="6" height="12" rx="2" fill="url(#sma-ribbon)" />
          <path d="M85 76 L82 88 L88 84 L94 88 L91 76 Z" fill="url(#sma-ribbon)" />
        </g>
      </svg>
    </div>
  );
}

export function SMKIcon3D({ className = '', size = 72 }: IconProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(16,185,129,0.25)]"
      >
        <defs>
          <linearGradient id="smk-laptop-screen" x1="30" y1="20" x2="90" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="smk-laptop-base" x1="15" y1="70" x2="105" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="smk-gear" x1="15" y1="15" x2="45" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="smk-wrench" x1="75" y1="15" x2="105" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Base shadow */}
        <ellipse cx="60" cy="102" rx="44" ry="9" fill="rgba(15,23,42,0.2)" />

        {/* 3D Gear (Left) */}
        <g transform="translate(14, 18)">
          <circle cx="16" cy="16" r="13" fill="url(#smk-gear)" />
          {/* Teeth */}
          <rect x="13" y="0" width="6" height="32" rx="2" fill="#059669" />
          <rect x="0" y="13" width="32" height="6" rx="2" fill="#059669" />
          <rect x="13" y="0" width="6" height="32" rx="2" transform="rotate(45 16 16)" fill="#059669" />
          <rect x="13" y="0" width="6" height="32" rx="2" transform="rotate(-45 16 16)" fill="#059669" />
          <circle cx="16" cy="16" r="8" fill="#ffffff" />
          <circle cx="16" cy="16" r="4.5" fill="#047857" />
        </g>

        {/* 3D Precision Wrench (Right) */}
        <g transform="rotate(35 88 28)">
          <rect x="85" y="12" width="7" height="34" rx="3.5" fill="url(#smk-wrench)" />
          {/* Wrench Jaw */}
          <path d="M82 12 C82 5, 95 5, 95 12 L91 14 C91 10, 86 10, 86 14 Z" fill="#b45309" />
        </g>

        {/* 3D Laptop Screen Lid */}
        <rect x="28" y="28" width="64" height="46" rx="7" fill="#334155" stroke="#475569" strokeWidth="2" />
        {/* Inner Screen */}
        <rect x="32" y="32" width="56" height="38" rx="4" fill="url(#smk-laptop-screen)" />
        {/* Code Visualizer on Screen */}
        <text x="36" y="44" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#34d399">&lt;code/&gt;</text>
        <line x1="36" y1="50" x2="68" y2="50" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="56" x2="80" y2="56" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="62" x2="56" y2="62" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />

        {/* Laptop Keyboard Base */}
        <path d="M16 75 L104 75 L96 94 L24 94 Z" fill="url(#smk-laptop-base)" stroke="#64748b" strokeWidth="1.5" />
        {/* Trackpad */}
        <rect x="48" y="80" width="24" height="10" rx="2" fill="#e2e8f0" />
        {/* Notch */}
        <rect x="52" y="74" width="16" height="3" rx="1.5" fill="#475569" />
      </svg>
    </div>
  );
}

export function KULIAHIcon3D({ className = '', size = 72 }: IconProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(139,92,246,0.3)]"
      >
        <defs>
          <linearGradient id="kuliah-cap-top" x1="20" y1="25" x2="100" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="50%" stopColor="#3730a3" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="kuliah-tassel" x1="25" y1="45" x2="35" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="kuliah-diploma" x1="40" y1="70" x2="90" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
        </defs>

        {/* Soft ground shadow */}
        <ellipse cx="60" cy="104" rx="42" ry="9" fill="rgba(15,23,42,0.2)" />

        {/* Golden Laurel Wreath Backing */}
        <g opacity="0.85">
          <path d="M22 68 C22 45, 34 35, 42 32" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M98 68 C98 45, 86 35, 78 32" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="23" cy="56" r="3" fill="#facc15" />
          <circle cx="28" cy="44" r="3" fill="#facc15" />
          <circle cx="97" cy="56" r="3" fill="#facc15" />
          <circle cx="92" cy="44" r="3" fill="#facc15" />
        </g>

        {/* Skull Cap Base */}
        <path d="M40 45 L80 45 L74 62 Q60 69 46 62 Z" fill="#1e1b4b" stroke="#312e81" strokeWidth="1.5" />

        {/* 3D Mortarboard Rhombus Top */}
        <polygon points="60,22 106,42 60,60 14,42" fill="url(#kuliah-cap-top)" stroke="#6366f1" strokeWidth="2" />

        {/* Specular Highlight along edge */}
        <line x1="60" y1="23" x2="104" y2="42" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />

        {/* Center Button on Cap */}
        <ellipse cx="60" cy="41" rx="4.5" ry="3" fill="#facc15" />

        {/* Dangling Golden Tassel */}
        <path d="M60 41 Q40 46 32 58 L28 78" stroke="url(#kuliah-tassel)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <rect x="25" y="74" width="7" height="10" rx="2" fill="#eab308" />

        {/* Rolled Diploma Scroll Underneath */}
        <g transform="rotate(-6 60 84)">
          <rect x="34" y="80" width="52" height="14" rx="5" fill="url(#kuliah-diploma)" stroke="#d97706" strokeWidth="1.5" />
          {/* Red Ribbon tie */}
          <rect x="56" y="79" width="8" height="16" rx="2" fill="#ef4444" />
          <circle cx="60" cy="87" r="3" fill="#dc2626" />
        </g>
      </svg>
    </div>
  );
}

export function LAINNYAIcon3D({ className = '', size = 72 }: IconProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(2,132,199,0.25)]"
      >
        <defs>
          <radialGradient id="globe-glow" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
          <linearGradient id="globe-land" x1="30" y1="20" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="book-open" x1="20" y1="65" x2="100" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="60" cy="104" rx="42" ry="9" fill="rgba(15,23,42,0.18)" />

        {/* 3D Tilted Learning Globe */}
        <g transform="translate(0, -6)">
          {/* Globe Stand Arc */}
          <path d="M38 18 C18 36, 20 66, 40 82" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="50" r="26" fill="url(#globe-glow)" />

          {/* Continents / Lands */}
          <path d="M46 38 Q52 32 58 36 Q64 42 60 48 Q52 50 48 44 Z" fill="url(#globe-land)" />
          <path d="M62 48 Q70 46 76 54 Q72 62 64 64 Q58 58 62 48 Z" fill="url(#globe-land)" />
          <path d="M44 56 Q50 62 48 70 Q42 68 40 60 Z" fill="url(#globe-land)" />

          {/* Meridian lines */}
          <ellipse cx="60" cy="50" rx="14" ry="26" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          <line x1="34" y1="50" x2="86" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Stand Base */}
          <path d="M40 82 L48 94 L72 94 L80 82" stroke="#64748b" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* Open Book Base */}
        <g transform="translate(0, 8)">
          <path d="M60 84 Q40 80 20 86 L22 96 Q40 91 60 95 Q80 91 98 96 L100 86 Q80 80 60 84 Z" fill="url(#book-open)" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="60" y1="84" x2="60" y2="95" stroke="#94a3b8" strokeWidth="2" />
        </g>

        {/* Floating Sparkle / Star of Knowledge */}
        <polygon points="86,22 89,28 95,29 90,34 92,40 86,36 80,40 82,34 77,29 83,28" fill="#fde047" stroke="#eab308" strokeWidth="1" filter="drop-shadow(0 0 6px #fde047)" />
      </svg>
    </div>
  );
}

export function Education3DIcon({
  level,
  className = '',
  size = 72,
}: {
  level: EducationLevel;
  className?: string;
  size?: number;
}) {
  switch (level) {
    case 'SD':
      return <SDIcon3D className={className} size={size} />;
    case 'SMP':
      return <SMPIcon3D className={className} size={size} />;
    case 'SMA':
      return <SMAIcon3D className={className} size={size} />;
    case 'SMK':
      return <SMKIcon3D className={className} size={size} />;
    case 'KULIAH':
      return <KULIAHIcon3D className={className} size={size} />;
    case 'LAINNYA':
      return <LAINNYAIcon3D className={className} size={size} />;
    default:
      return <LAINNYAIcon3D className={className} size={size} />;
  }
}
