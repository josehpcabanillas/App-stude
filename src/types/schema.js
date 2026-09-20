/**
 * Model definitions and type constants for Stude Preuniversitario
 */

export const UNIVERSITIES = {
  UNTRM: {
    id: 'UNTRM',
    name: 'Univ. Nac. Toribio Rodríguez de Mendoza',
    shortName: 'UNTRM',
    city: 'Chachapoyas, Amazonas',
    badge: 'Amazonas',
    logoIcon: 'GraduationCap',
    status: 'ACTIVE',
  },
  UNMSM: {
    id: 'UNMSM',
    name: 'Univ. Nac. Mayor de San Marcos',
    shortName: 'San Marcos (Decana)',
    city: 'Lima',
    badge: 'Lima',
    logoIcon: 'BookOpen',
    status: 'PRÓXIMAMENTE',
  },
  UNI: {
    id: 'UNI',
    name: 'Univ. Nacional de Ingeniería',
    shortName: 'UNI',
    city: 'Lima',
    badge: 'Lima',
    logoIcon: 'Compass',
    status: 'PRÓXIMAMENTE',
  },
  UNSAAC: {
    id: 'UNSAAC',
    name: 'Univ. Nac. San Antonio Abad del Cusco',
    shortName: 'UNSAAC',
    city: 'Cusco',
    badge: 'Cusco',
    logoIcon: 'Landmark',
    status: 'PRÓXIMAMENTE',
  },
  UNFV: {
    id: 'UNFV',
    name: 'Univ. Nac. Federico Villarreal',
    shortName: 'UNFV',
    city: 'Lima',
    badge: 'Lima',
    logoIcon: 'Award',
    status: 'PRÓXIMAMENTE',
  },
};

export const CAREERS = [
  { id: 'estomatologia', name: 'Estomatología (Odontología)', area: 'Ciencias de la Salud', areaCode: 'A', icon: 'Stethoscope', popular: true },
  { id: 'medicina', name: 'Medicina Humana', area: 'Ciencias de la Salud', areaCode: 'A', icon: 'HeartPulse', popular: true },
  { id: 'enfermeria', name: 'Enfermería', area: 'Ciencias de la Salud', areaCode: 'A', icon: 'Activity', popular: true },
  { id: 'psicologia', name: 'Psicología', area: 'Ciencias de la Salud', areaCode: 'A', icon: 'Brain', popular: false },
  { id: 'ing_civil', name: 'Ingeniería Civil', area: 'Ingenierías y Arquitectura', areaCode: 'B', icon: 'Building2', popular: true },
  { id: 'ing_sistemas', name: 'Ingeniería de Sistemas y Telemática', area: 'Ingenierías y Arquitectura', areaCode: 'B', icon: 'Cpu', popular: true },
  { id: 'derecho', name: 'Derecho y Ciencias Políticas', area: 'Humanidades y Ciencias Sociales', areaCode: 'C', icon: 'Scale', popular: false },
  { id: 'administracion', name: 'Administración de Empresas', area: 'Ciencias Económicas', areaCode: 'D', icon: 'Briefcase', popular: false },
];

export const DAILY_GOALS = [
  { id: 'light', minutes: 10, label: 'Ligero', desc: '1 lección diaria · Ideal si tienes poco tiempo', xp: 20 },
  { id: 'constant', minutes: 20, label: 'Constante', desc: '2 lecciones + 5 flashcards · Ritmo recomendado', xp: 40, recommended: true },
  { id: 'intense', minutes: 40, label: 'Intenso', desc: '3 lecciones + quiz + repaso · Alto rendimiento', xp: 75 },
  { id: 'admission', minutes: 60, label: 'Modo Ingreso', desc: 'Simulacros y dominio total · Vacante segura', xp: 120 },
];

export const RANKS = [
  { id: 'novato', name: 'Novato', minXp: 0, icon: '🌱', color: '#64748B' },
  { id: 'postulante', name: 'Postulante', minXp: 150, icon: '🎒', color: '#2563EB' },
  { id: 'aplicado', name: 'Aplicado', minXp: 400, icon: '⚡', color: '#7C3AED' },
  { id: 'competitivo', name: 'Competitivo', minXp: 800, icon: '🔥', color: '#F59E0B' },
  { id: 'cachimbo', name: 'Cachimbo', minXp: 1400, icon: '🎓', color: '#10B981' },
  { id: 'maestro', name: 'Maestro', minXp: 2200, icon: '👑', color: '#EC4899' },
];

export const AVATARS = [
  { id: 'owl', name: 'Búho Sabio', emoji: '🦉', bg: 'from-indigo-500 to-blue-600' },
  { id: 'fox', name: 'Zorro Astuto', emoji: '🦊', bg: 'from-amber-500 to-orange-600' },
  { id: 'condor', name: 'Cóndor Andino', emoji: '🦅', bg: 'from-blue-600 to-cyan-600' },
  { id: 'tiger', name: 'Tigre Veloz', emoji: '🐯', bg: 'from-yellow-500 to-amber-600' },
  { id: 'microscope', name: 'Futuro Científico', emoji: '🔬', bg: 'from-emerald-500 to-teal-600' },
  { id: 'rocket', name: 'Rumbo al Ingreso', emoji: '🚀', bg: 'from-violet-600 to-purple-700' },
  { id: 'cachimbo', name: 'Cachimbo UNTRM', emoji: '🎓', bg: 'from-rose-500 to-pink-600' },
  { id: 'robot', name: 'Tutor Cyborg', emoji: '🤖', bg: 'from-sky-500 to-indigo-600' },
];
