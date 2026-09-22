'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Play,
  Calculator,
  Atom,
  Cpu,
  Globe2,
  Palette,
  Trophy,
  HeartHandshake,
  Briefcase,
} from 'lucide-react';
import { Subject } from '@/lib/curriculumData';
import { playButtonClick } from '@/lib/audio/soundManager';

interface SubjectHorizontalSliderProps {
  subjects: Subject[];
  educationLevel: string;
  searchQuery?: string;
  onSelectSubject: (subject: Subject) => void;
}

export function SubjectHorizontalSlider({
  subjects,
  educationLevel,
  searchQuery = '',
  onSelectSubject,
}: SubjectHorizontalSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredSubjects = subjects.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
  });

  const scrollLeft = () => {
    playButtonClick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    playButtonClick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  const renderSubjectIcon = (iconType: Subject['iconType']) => {
    switch (iconType) {
      case 'math':
        return <Calculator className="w-6 h-6 text-white" />;
      case 'science':
        return <Atom className="w-6 h-6 text-white" />;
      case 'tech':
        return <Cpu className="w-6 h-6 text-white" />;
      case 'social':
        return <Globe2 className="w-6 h-6 text-white" />;
      case 'art':
        return <Palette className="w-6 h-6 text-white" />;
      case 'sport':
        return <Trophy className="w-6 h-6 text-white" />;
      case 'religion':
        return <HeartHandshake className="w-6 h-6 text-white" />;
      case 'business':
        return <Briefcase className="w-6 h-6 text-white" />;
      default:
        return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Header with Counter and Scroll Controls */}
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Mata Pelajaran {educationLevel}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black">
              {subjects.length} Modul
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
            Geser kotak ke kiri atau kanan untuk memilih pelajaran
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            id="btn-scroll-subject-left"
            onClick={scrollLeft}
            aria-label="Geser ke kiri"
            className="w-7 h-7 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            id="btn-scroll-subject-right"
            onClick={scrollRight}
            aria-label="Geser ke kanan"
            className="w-7 h-7 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel of Square Subject Cards */}
      {filteredSubjects.length === 0 ? (
        <div className="p-6 rounded-3xl bg-white border border-slate-100 text-center space-y-1">
          <p className="text-xs font-black text-slate-700">Mata pelajaran tidak ditemukan</p>
          <p className="text-[11px] text-slate-400">Coba kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-3 pt-1 px-1 snap-x snap-mandatory no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredSubjects.map((sub, idx) => (
            <motion.div
              key={sub.id}
              whileTap={{ scale: 0.97 }}
              className="snap-start flex-shrink-0 w-44 rounded-3xl bg-white p-3.5 border-2 border-slate-100/90 shadow-[0_8px_20px_rgba(30,58,138,0.06)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.14)] hover:border-blue-300 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Ambient Background Accent */}
              <div
                className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-tr ${sub.color} opacity-15 rounded-full blur-xl pointer-events-none group-hover:opacity-30 transition-opacity`}
              />

              {/* Top Row: Square 3D Icon & Number */}
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center shadow-md shadow-blue-500/15`}
                >
                  {renderSubjectIcon(sub.iconType)}
                </div>
                <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  #{idx + 1}
                </span>
              </div>

              {/* Subject Info */}
              <div className="space-y-1 my-1">
                <span className="block text-[9px] font-extrabold uppercase tracking-wider text-blue-600 truncate">
                  {sub.category}
                </span>
                <h4 className="text-xs font-black text-slate-800 line-clamp-2 leading-snug min-h-[2.2rem]">
                  {sub.name}
                </h4>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/60">
                    <Sparkles className="w-2.5 h-2.5" />
                    +{sub.xpReward} XP
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {sub.quizzesAvailable} Soal
                  </span>
                </div>
              </div>

              {/* Square Card Bottom Action */}
              <button
                id={`btn-subject-card-${sub.id}`}
                type="button"
                onClick={() => onSelectSubject(sub)}
                className="mt-2 w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-[11px] flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5 transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Mulai Belajar</span>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Swipe Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <span>Geser horizontal</span>
          <span>•</span>
          <span>{subjects.length} Pelajaran tersedia</span>
        </span>
      </div>
    </div>
  );
}
