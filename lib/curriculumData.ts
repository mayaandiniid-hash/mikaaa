import { EducationLevel } from '@/types/onboarding';

export interface Subject {
  id: string;
  name: string;
  category: string;
  xpReward: number;
  quizzesAvailable: number;
  iconType: 'math' | 'book' | 'science' | 'tech' | 'social' | 'art' | 'sport' | 'religion' | 'business';
  color: string;
}

export const SD_SUBJECTS: Subject[] = [
  { id: 'sd-bind', name: 'Bahasa Indonesia', category: 'Bahasa & Literasi', xpReward: 50, quizzesAvailable: 8, iconType: 'book', color: 'from-amber-400 to-orange-500' },
  { id: 'sd-mat', name: 'Matematika', category: 'Logika & Hitungan', xpReward: 60, quizzesAvailable: 10, iconType: 'math', color: 'from-blue-500 to-indigo-600' },
  { id: 'sd-ipas', name: 'IPAS (Ilmu Pengetahuan Alam & Sosial)', category: 'Sains Tematik', xpReward: 55, quizzesAvailable: 9, iconType: 'science', color: 'from-emerald-400 to-teal-600' },
  { id: 'sd-pp', name: 'Pendidikan Pancasila', category: 'Kewarganegaraan', xpReward: 45, quizzesAvailable: 7, iconType: 'social', color: 'from-red-400 to-rose-600' },
  { id: 'sd-bing', name: 'Bahasa Inggris', category: 'Bahasa Asing', xpReward: 50, quizzesAvailable: 8, iconType: 'book', color: 'from-sky-400 to-blue-500' },
  { id: 'sd-sb', name: 'Seni Budaya', category: 'Kreativitas', xpReward: 40, quizzesAvailable: 6, iconType: 'art', color: 'from-purple-400 to-pink-500' },
  { id: 'sd-pjok', name: 'PJOK', category: 'Kesehatan & Olahraga', xpReward: 40, quizzesAvailable: 5, iconType: 'sport', color: 'from-lime-400 to-green-600' },
  { id: 'sd-pa', name: 'Pendidikan Agama', category: 'Karakter & Budi Pekerti', xpReward: 45, quizzesAvailable: 6, iconType: 'religion', color: 'from-teal-400 to-cyan-600' },
];

export const SMP_SUBJECTS: Subject[] = [
  { id: 'smp-bind', name: 'Bahasa Indonesia', category: 'Literasi & Komunikasi', xpReward: 55, quizzesAvailable: 10, iconType: 'book', color: 'from-blue-400 to-indigo-500' },
  { id: 'smp-mat', name: 'Matematika', category: 'Aljabar & Geometri', xpReward: 65, quizzesAvailable: 12, iconType: 'math', color: 'from-cyan-500 to-blue-600' },
  { id: 'smp-ipa', name: 'IPA (Fisika, Biologi, Kimia)', category: 'Sains Terpadu', xpReward: 65, quizzesAvailable: 12, iconType: 'science', color: 'from-emerald-500 to-teal-700' },
  { id: 'smp-ips', name: 'IPS (Sejarah & Geografi)', category: 'Sosial & Humaniora', xpReward: 55, quizzesAvailable: 9, iconType: 'social', color: 'from-amber-500 to-orange-600' },
  { id: 'smp-bing', name: 'Bahasa Inggris', category: 'Bahasa Global', xpReward: 55, quizzesAvailable: 10, iconType: 'book', color: 'from-sky-500 to-indigo-500' },
  { id: 'smp-pp', name: 'Pendidikan Pancasila', category: 'Kewarganegaraan', xpReward: 50, quizzesAvailable: 7, iconType: 'social', color: 'from-rose-500 to-red-600' },
  { id: 'smp-info', name: 'Informatika', category: 'Komputasi & Algoritma', xpReward: 70, quizzesAvailable: 11, iconType: 'tech', color: 'from-violet-500 to-purple-600' },
  { id: 'smp-sb', name: 'Seni Budaya', category: 'Seni Rupa & Musik', xpReward: 45, quizzesAvailable: 6, iconType: 'art', color: 'from-pink-400 to-rose-500' },
  { id: 'smp-pjok', name: 'PJOK', category: 'Kebugaran Jasmani', xpReward: 45, quizzesAvailable: 5, iconType: 'sport', color: 'from-emerald-400 to-green-600' },
  { id: 'smp-pa', name: 'Pendidikan Agama', category: 'Spiritualitas', xpReward: 50, quizzesAvailable: 7, iconType: 'religion', color: 'from-teal-500 to-cyan-700' },
];

export const SMA_SUBJECTS: Subject[] = [
  { id: 'sma-bind', name: 'Bahasa Indonesia', category: 'Analisis & Karya Tulis', xpReward: 60, quizzesAvailable: 12, iconType: 'book', color: 'from-blue-500 to-indigo-600' },
  { id: 'sma-mat', name: 'Matematika', category: 'Kalkulus & Matriks', xpReward: 80, quizzesAvailable: 15, iconType: 'math', color: 'from-cyan-500 to-blue-700' },
  { id: 'sma-bing', name: 'Bahasa Inggris', category: 'Academic English & TOEFL Prep', xpReward: 65, quizzesAvailable: 12, iconType: 'book', color: 'from-sky-500 to-blue-600' },
  { id: 'sma-fis', name: 'Fisika', category: 'Mekanika & Gelombang', xpReward: 80, quizzesAvailable: 14, iconType: 'science', color: 'from-indigo-600 to-violet-700' },
  { id: 'sma-kim', name: 'Kimia', category: 'Struktur Molekul & Reaksi', xpReward: 80, quizzesAvailable: 14, iconType: 'science', color: 'from-purple-500 to-pink-600' },
  { id: 'sma-bio', name: 'Biologi', category: 'Genetika & Ekosistem', xpReward: 75, quizzesAvailable: 13, iconType: 'science', color: 'from-emerald-500 to-green-700' },
  { id: 'sma-eko', name: 'Ekonomi', category: 'Pasar Modal & Makroekonomi', xpReward: 70, quizzesAvailable: 11, iconType: 'business', color: 'from-amber-500 to-orange-600' },
  { id: 'sma-geo', name: 'Geografi', category: 'Sistem Informasi Geografis', xpReward: 65, quizzesAvailable: 10, iconType: 'social', color: 'from-teal-500 to-emerald-600' },
  { id: 'sma-sos', name: 'Sosiologi', category: 'Interaksi & Perubahan Sosial', xpReward: 65, quizzesAvailable: 10, iconType: 'social', color: 'from-rose-500 to-pink-600' },
  { id: 'sma-sej', name: 'Sejarah', category: 'Dunia & Nasional', xpReward: 60, quizzesAvailable: 10, iconType: 'social', color: 'from-amber-600 to-yellow-700' },
  { id: 'sma-info', name: 'Informatika', category: 'Pemrograman & Jaringan', xpReward: 85, quizzesAvailable: 16, iconType: 'tech', color: 'from-blue-600 to-cyan-600' },
  { id: 'sma-pp', name: 'Pendidikan Pancasila', category: 'Konstitusi & Hukum', xpReward: 55, quizzesAvailable: 8, iconType: 'social', color: 'from-red-500 to-rose-600' },
  { id: 'sma-pa', name: 'Pendidikan Agama', category: 'Filsafat & Etika', xpReward: 55, quizzesAvailable: 8, iconType: 'religion', color: 'from-teal-500 to-cyan-700' },
];

export const SMK_VOCATIONAL_TRACKS = [
  'Rekayasa Perangkat Lunak',
  'Teknik Komputer dan Jaringan',
  'Akuntansi',
  'Manajemen Perkantoran',
  'Bisnis Daring',
  'Pemasaran',
  'Perhotelan',
  'Kuliner',
] as const;

export type SMKTrack = typeof SMK_VOCATIONAL_TRACKS[number];

export const SMK_GENERAL_SUBJECTS: Subject[] = [
  { id: 'smk-bind', name: 'Bahasa Indonesia', category: 'Komunikasi Bisnis', xpReward: 60, quizzesAvailable: 10, iconType: 'book', color: 'from-blue-500 to-indigo-600' },
  { id: 'smk-mat', name: 'Matematika Terapan', category: 'Hitung Industri', xpReward: 75, quizzesAvailable: 12, iconType: 'math', color: 'from-cyan-500 to-blue-700' },
  { id: 'smk-bing', name: 'Bahasa Inggris Kejuruan', category: 'Technical English', xpReward: 65, quizzesAvailable: 11, iconType: 'book', color: 'from-sky-500 to-blue-600' },
  { id: 'smk-pancasila', name: 'Pendidikan Pancasila', category: 'Etika Kerja & Hukum', xpReward: 50, quizzesAvailable: 7, iconType: 'social', color: 'from-red-500 to-rose-600' },
  { id: 'smk-kwu', name: 'Produk Kreatif & Kewirausahaan', category: 'Bisnis Praktis', xpReward: 80, quizzesAvailable: 14, iconType: 'business', color: 'from-amber-500 to-orange-600' },
];

export const SMK_TRACK_SUBJECTS: Record<SMKTrack, Subject[]> = {
  'Rekayasa Perangkat Lunak': [
    { id: 'smk-rpl-1', name: 'Pemrograman Web & Mobile', category: 'Coding Kejuruan', xpReward: 90, quizzesAvailable: 16, iconType: 'tech', color: 'from-emerald-500 to-teal-700' },
    { id: 'smk-rpl-2', name: 'Basis Data (Database MySQL/PostgreSQL)', category: 'Data Architecture', xpReward: 85, quizzesAvailable: 14, iconType: 'tech', color: 'from-cyan-500 to-blue-600' },
    { id: 'smk-rpl-3', name: 'Pemrograman Berorientasi Objek (OOP)', category: 'Software Design', xpReward: 85, quizzesAvailable: 12, iconType: 'tech', color: 'from-purple-500 to-indigo-600' },
  ],
  'Teknik Komputer dan Jaringan': [
    { id: 'smk-tkj-1', name: 'Administrasi Infrastruktur Jaringan', category: 'Networking Cisco/Mikrotik', xpReward: 90, quizzesAvailable: 15, iconType: 'tech', color: 'from-blue-600 to-cyan-600' },
    { id: 'smk-tkj-2', name: 'Administrasi Sistem Jaringan (Linux Server)', category: 'SysAdmin', xpReward: 85, quizzesAvailable: 14, iconType: 'tech', color: 'from-slate-600 to-zinc-800' },
    { id: 'smk-tkj-3', name: 'Teknologi Layanan Jaringan (VoIP & Cloud)', category: 'Cloud Infrastructure', xpReward: 80, quizzesAvailable: 12, iconType: 'tech', color: 'from-teal-500 to-emerald-600' },
  ],
  'Akuntansi': [
    { id: 'smk-akt-1', name: 'Praktikum Akuntansi Perusahaan Jasa & Dagang', category: 'Financial Accounting', xpReward: 85, quizzesAvailable: 14, iconType: 'business', color: 'from-amber-500 to-orange-600' },
    { id: 'smk-akt-2', name: 'Komputer Akuntansi (MYOB / Accurate)', category: 'FinTech Tools', xpReward: 80, quizzesAvailable: 12, iconType: 'tech', color: 'from-blue-500 to-indigo-600' },
    { id: 'smk-akt-3', name: 'Administrasi Pajak & Keuangan', category: 'Taxation', xpReward: 80, quizzesAvailable: 11, iconType: 'business', color: 'from-emerald-500 to-teal-600' },
  ],
  'Manajemen Perkantoran': [
    { id: 'smk-mp-1', name: 'Otomatisasi Tata Kelola Kepegawaian', category: 'HR Administration', xpReward: 80, quizzesAvailable: 12, iconType: 'business', color: 'from-blue-500 to-indigo-600' },
    { id: 'smk-mp-2', name: 'Korespondensi Bisnis & Kearsipan Digital', category: 'Digital Office', xpReward: 75, quizzesAvailable: 11, iconType: 'tech', color: 'from-violet-500 to-purple-600' },
    { id: 'smk-mp-3', name: 'Humas & Keprotokolan', category: 'Public Relations', xpReward: 75, quizzesAvailable: 10, iconType: 'social', color: 'from-rose-500 to-pink-600' },
  ],
  'Bisnis Daring': [
    { id: 'smk-bd-1', name: 'Digital Marketing & Social Media Strategy', category: 'Online Sales', xpReward: 85, quizzesAvailable: 14, iconType: 'business', color: 'from-orange-500 to-rose-600' },
    { id: 'smk-bd-2', name: 'Manajemen E-Commerce & Marketplace', category: 'Store Management', xpReward: 80, quizzesAvailable: 12, iconType: 'tech', color: 'from-amber-500 to-yellow-600' },
  ],
  'Pemasaran': [
    { id: 'smk-pms-1', name: 'Riset Pasar & Negosiasi Penjualan', category: 'Market Analysis', xpReward: 80, quizzesAvailable: 12, iconType: 'business', color: 'from-purple-500 to-pink-600' },
    { id: 'smk-pms-2', name: 'Penataan Produk (Visual Merchandising)', category: 'Retail Setup', xpReward: 75, quizzesAvailable: 10, iconType: 'art', color: 'from-cyan-500 to-blue-600' },
  ],
  'Perhotelan': [
    { id: 'smk-htl-1', name: 'Front Office & Reservasi Hotel', category: 'Hospitality', xpReward: 80, quizzesAvailable: 11, iconType: 'business', color: 'from-emerald-500 to-teal-600' },
    { id: 'smk-htl-2', name: 'Housekeeping & Standar Kebersihan', category: 'Operations', xpReward: 75, quizzesAvailable: 10, iconType: 'social', color: 'from-blue-500 to-indigo-600' },
  ],
  'Kuliner': [
    { id: 'smk-kln-1', name: 'Pengolahan Makanan Kontinental & Nusantara', category: 'Gastronomi', xpReward: 85, quizzesAvailable: 12, iconType: 'art', color: 'from-orange-500 to-red-600' },
    { id: 'smk-kln-2', name: 'Tata Hidang & Higiene Sanitasi Makanan', category: 'Food Safety', xpReward: 75, quizzesAvailable: 10, iconType: 'science', color: 'from-amber-500 to-orange-600' },
  ],
};

export const KULIAH_PROGRAMS = [
  'Teknik Informatika / Ilmu Komputer',
  'Manajemen & Bisnis',
  'Akuntansi & Finansial',
  'Ilmu Komunikasi',
  'Desain Komunikasi Visual',
  'Teknik Elektro / Otomasi',
] as const;

export type KuliahProgram = typeof KULIAH_PROGRAMS[number];

export const KULIAH_PROGRAM_SUBJECTS: Record<KuliahProgram, Subject[]> = {
  'Teknik Informatika / Ilmu Komputer': [
    { id: 'kul-if-1', name: 'Struktur Data & Algoritma Tingkat Lanjut', category: 'Computer Science', xpReward: 100, quizzesAvailable: 18, iconType: 'tech', color: 'from-blue-600 to-indigo-700' },
    { id: 'kul-if-2', name: 'Statistika & Probabilitas Komputasi', category: 'Matematika Sains', xpReward: 90, quizzesAvailable: 14, iconType: 'math', color: 'from-cyan-600 to-blue-700' },
    { id: 'kul-if-3', name: 'Rekayasa Perangkat Lunak & DevOps', category: 'Software Engineering', xpReward: 95, quizzesAvailable: 15, iconType: 'tech', color: 'from-violet-600 to-purple-800' },
    { id: 'kul-if-4', name: 'Kecerdasan Buatan & Machine Learning', category: 'AI & Data Science', xpReward: 105, quizzesAvailable: 16, iconType: 'tech', color: 'from-emerald-500 to-teal-700' },
    { id: 'kul-if-5', name: 'Metodologi Penelitian & Penulisan Ilmiah', category: 'Riset Akademik', xpReward: 85, quizzesAvailable: 10, iconType: 'book', color: 'from-slate-600 to-zinc-800' },
  ],
  'Manajemen & Bisnis': [
    { id: 'kul-mnj-1', name: 'Pengantar Manajemen & Organisasi', category: 'Manajemen Dasar', xpReward: 85, quizzesAvailable: 12, iconType: 'business', color: 'from-amber-500 to-orange-600' },
    { id: 'kul-mnj-2', name: 'Ekonomi Manajerial & Pasar', category: 'Ekonomi Terapan', xpReward: 90, quizzesAvailable: 14, iconType: 'business', color: 'from-emerald-500 to-teal-700' },
    { id: 'kul-mnj-3', name: 'Kewirausahaan & Inkubasi Bisnis', category: 'Startup & Innovation', xpReward: 95, quizzesAvailable: 15, iconType: 'business', color: 'from-purple-500 to-indigo-600' },
    { id: 'kul-mnj-4', name: 'Statistika Bisnis & Analisis Data', category: 'Kuantitatif Bisnis', xpReward: 90, quizzesAvailable: 13, iconType: 'math', color: 'from-cyan-500 to-blue-600' },
    { id: 'kul-mnj-5', name: 'Metodologi Penelitian Manajemen', category: 'Skripsi & Riset', xpReward: 85, quizzesAvailable: 10, iconType: 'book', color: 'from-rose-500 to-pink-600' },
  ],
  'Akuntansi & Finansial': [
    { id: 'kul-akt-1', name: 'Akuntansi Keuangan Menengah', category: 'Financial Standards', xpReward: 95, quizzesAvailable: 15, iconType: 'business', color: 'from-emerald-600 to-teal-800' },
    { id: 'kul-akt-2', name: 'Akuntansi Biaya & Manajemen Biaya', category: 'Cost Management', xpReward: 90, quizzesAvailable: 13, iconType: 'business', color: 'from-blue-600 to-indigo-700' },
    { id: 'kul-akt-3', name: 'Pengauditan & Asurans (Auditing)', category: 'Audit Standards', xpReward: 95, quizzesAvailable: 14, iconType: 'business', color: 'from-violet-600 to-purple-700' },
    { id: 'kul-akt-4', name: 'Manajemen Keuangan Korporasi', category: 'Corporate Finance', xpReward: 90, quizzesAvailable: 12, iconType: 'math', color: 'from-amber-500 to-orange-600' },
    { id: 'kul-akt-5', name: 'Metodologi Penelitian Akuntansi', category: 'Riset Empiris', xpReward: 85, quizzesAvailable: 10, iconType: 'book', color: 'from-slate-600 to-zinc-700' },
  ],
  'Ilmu Komunikasi': [
    { id: 'kul-kom-1', name: 'Teori Komunikasi & Media Baru', category: 'Teori Media', xpReward: 85, quizzesAvailable: 12, iconType: 'social', color: 'from-rose-500 to-pink-600' },
    { id: 'kul-kom-2', name: 'Komunikasi Massa & Jurnalisme Digital', category: 'Digital Media', xpReward: 90, quizzesAvailable: 14, iconType: 'book', color: 'from-blue-500 to-indigo-600' },
    { id: 'kul-kom-3', name: 'Public Relations & Crisis Management', category: 'Strategi PR', xpReward: 90, quizzesAvailable: 13, iconType: 'social', color: 'from-purple-500 to-indigo-600' },
    { id: 'kul-kom-4', name: 'Metodologi Penelitian Komunikasi Kualitatif & Kuantitatif', category: 'Riset Media', xpReward: 85, quizzesAvailable: 10, iconType: 'book', color: 'from-amber-500 to-orange-600' },
  ],
  'Desain Komunikasi Visual': [
    { id: 'kul-dkv-1', name: 'Tipografi & Desain Layout Interaktif', category: 'Visual Craft', xpReward: 90, quizzesAvailable: 12, iconType: 'art', color: 'from-pink-500 to-rose-600' },
    { id: 'kul-dkv-2', name: 'UI/UX Design & Desain Interaksi', category: 'Digital Product', xpReward: 95, quizzesAvailable: 15, iconType: 'tech', color: 'from-indigo-500 to-purple-600' },
    { id: 'kul-dkv-3', name: 'Animasi & Motion Graphics', category: 'Multimedia', xpReward: 90, quizzesAvailable: 13, iconType: 'art', color: 'from-cyan-500 to-blue-600' },
    { id: 'kul-dkv-4', name: 'Branding & Identitas Visual Perusahaan', category: 'Corporate Design', xpReward: 85, quizzesAvailable: 11, iconType: 'art', color: 'from-amber-500 to-orange-600' },
  ],
  'Teknik Elektro / Otomasi': [
    { id: 'kul-el-1', name: 'Rangkaian Listrik & Elektronika Daya', category: 'Power Electronics', xpReward: 95, quizzesAvailable: 14, iconType: 'tech', color: 'from-blue-600 to-indigo-700' },
    { id: 'kul-el-2', name: 'Sistem Kendali Otomatis & Robotika', category: 'Control Systems', xpReward: 100, quizzesAvailable: 16, iconType: 'tech', color: 'from-emerald-500 to-teal-700' },
    { id: 'kul-el-3', name: 'Mikrokontroler & Internet of Things (IoT)', category: 'Embedded Systems', xpReward: 95, quizzesAvailable: 14, iconType: 'tech', color: 'from-purple-500 to-indigo-600' },
  ],
};

export const LAINNYA_SUBJECTS: Subject[] = [
  { id: 'ln-digi', name: 'Literasi Digital & AI Modern', category: 'Kecakapan Abad 21', xpReward: 70, quizzesAvailable: 14, iconType: 'tech', color: 'from-sky-500 to-blue-600' },
  { id: 'ln-lang', name: 'Bahasa Asing Percakapan Praktis', category: 'Bahasa Komunikatif', xpReward: 65, quizzesAvailable: 12, iconType: 'book', color: 'from-indigo-500 to-purple-600' },
  { id: 'ln-soft', name: 'Soft Skills & Public Speaking', category: 'Pengembangan Diri', xpReward: 60, quizzesAvailable: 10, iconType: 'social', color: 'from-rose-500 to-pink-600' },
  { id: 'ln-fin', name: 'Dasar Finansial Pribadi & Investasi Sehat', category: 'Literasi Finansial', xpReward: 75, quizzesAvailable: 13, iconType: 'business', color: 'from-emerald-500 to-teal-600' },
  { id: 'ln-logic', name: 'Logika & Berpikir Kritis Sehari-hari', category: 'Penalaran Rasional', xpReward: 70, quizzesAvailable: 12, iconType: 'math', color: 'from-amber-500 to-orange-600' },
  { id: 'ln-crea', name: 'Kreativitas & Desain Konten Digital', category: 'Konten Kreatif', xpReward: 65, quizzesAvailable: 11, iconType: 'art', color: 'from-purple-500 to-pink-600' },
];

export function getSubjectsForLevel(
  level: EducationLevel,
  smkTrack: SMKTrack = 'Rekayasa Perangkat Lunak',
  kuliahProgram: KuliahProgram = 'Teknik Informatika / Ilmu Komputer'
): Subject[] {
  switch (level) {
    case 'SD':
      return SD_SUBJECTS;
    case 'SMP':
      return SMP_SUBJECTS;
    case 'SMA':
      return SMA_SUBJECTS;
    case 'SMK':
      return [...SMK_GENERAL_SUBJECTS, ...(SMK_TRACK_SUBJECTS[smkTrack] || SMK_TRACK_SUBJECTS['Rekayasa Perangkat Lunak'])];
    case 'KULIAH':
      return KULIAH_PROGRAM_SUBJECTS[kuliahProgram] || KULIAH_PROGRAM_SUBJECTS['Teknik Informatika / Ilmu Komputer'];
    case 'LAINNYA':
      return LAINNYA_SUBJECTS;
    default:
      return SMA_SUBJECTS;
  }
}
