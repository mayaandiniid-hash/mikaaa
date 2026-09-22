export type EducationLevel =
  | 'SD'
  | 'SMP'
  | 'SMA'
  | 'SMK'
  | 'KULIAH'
  | 'LAINNYA';

export interface OnboardingState {
  name: string;
  age: number;
  educationLevel: EducationLevel;
  onboardingCompleted: boolean;
  completedAt: string;
  soundEnabled?: boolean;
}

export interface EducationLevelOption {
  id: EducationLevel;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  accentColor: string;
}

export const EDUCATION_LEVEL_OPTIONS: EducationLevelOption[] = [
  {
    id: 'SD',
    title: 'SD',
    subtitle: 'Sekolah Dasar',
    description: 'Pondasi belajar ceria dengan materi dasar interaktif',
    color: 'from-amber-400 to-orange-500',
    accentColor: '#f59e0b',
  },
  {
    id: 'SMP',
    title: 'SMP',
    subtitle: 'Sekolah Menengah Pertama',
    description: 'Eksplorasi konsep sains, sosial, matematika, dan logika',
    color: 'from-blue-400 to-cyan-500',
    accentColor: '#0ea5e9',
  },
  {
    id: 'SMA',
    title: 'SMA',
    subtitle: 'Sekolah Menengah Atas',
    description: 'Pendalaman akademik sains, humaniora, dan persiapan masa depan',
    color: 'from-indigo-500 to-purple-600',
    accentColor: '#6366f1',
  },
  {
    id: 'SMK',
    title: 'SMK',
    subtitle: 'Sekolah Menengah Kejuruan',
    description: 'Keahlian terapan kejuruan, teknologi, bisnis, dan industri',
    color: 'from-emerald-400 to-teal-600',
    accentColor: '#10b981',
  },
  {
    id: 'KULIAH',
    title: 'KULIAH',
    subtitle: 'Perguruan Tinggi',
    description: 'Riset, profesi, mata kuliah program studi, dan kemandirian',
    color: 'from-violet-500 to-fuchsia-600',
    accentColor: '#8b5cf6',
  },
  {
    id: 'LAINNYA',
    title: 'LAINNYA',
    subtitle: 'Jenjang lainnya',
    description: 'Pembelajaran sepanjang hayat, literasi digital, dan skill umum',
    color: 'from-sky-400 to-blue-600',
    accentColor: '#0284c7',
  },
];

export interface SubjectItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  color: string;
  questionsCount: number;
  rewardPoints: number;
}
