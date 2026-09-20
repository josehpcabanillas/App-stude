/**
 * Full Course Structure for Biología · UNTRM Estomatología
 */

export const BIOLOGY_COURSE = {
  id: 'biologia',
  name: 'Biología',
  faculty: 'Ciencias de la Salud',
  totalUnits: 8,
  estimatedHours: 48,
  progress: 62,
  description: 'Curso fundamental para Estomatología y Ciencias de la Salud en UNTRM.',
  units: [
    {
      id: 'u1',
      number: 1,
      title: 'Fundamentos y Seres Vivos',
      desc: 'Concepto, método científico y características esenciales de la vida',
      progress: 100,
      status: 'completed',
      topicsCount: 4,
    },
    {
      id: 'u2',
      number: 2,
      title: 'Citología: La Célula',
      desc: 'Célula procariota vs eucariota, organelos y transporte de membrana',
      progress: 65,
      status: 'active',
      topicsCount: 6,
      currentTopic: 'Célula Eucariota y Organelos',
    },
    {
      id: 'u3',
      number: 3,
      title: 'Bioelementos y Biomoléculas',
      desc: 'Agua, sales, glúcidos, lípidos y proteínas vitales',
      progress: 45,
      status: 'unlocked',
      topicsCount: 5,
    },
    {
      id: 'u4',
      number: 4,
      title: 'Metabolismo y Bioenergética',
      desc: 'Respiración celular aeróbica, anaeróbica y producción de ATP',
      progress: 0,
      status: 'locked',
      topicsCount: 5,
    },
    {
      id: 'u5',
      number: 5,
      title: 'Reproducción y Ciclo Celular',
      desc: 'Interfase, Mitosis, Meiosis y gametogénesis humana',
      progress: 0,
      status: 'locked',
      topicsCount: 4,
    },
    {
      id: 'u6',
      number: 6,
      title: 'Genética y Biología Molecular',
      desc: 'Leyes de Mendel, cariotipo, ADN y transcripción/traducción',
      progress: 0,
      status: 'locked',
      topicsCount: 6,
    },
    {
      id: 'u7',
      number: 7,
      title: 'Anatomía y Fisiología Estomatológica',
      desc: 'Sistemas esquelético, digestivo bucal, nervioso y dentario',
      progress: 0,
      status: 'locked',
      topicsCount: 7,
    },
    {
      id: 'u8',
      number: 8,
      title: 'Ecología y Biodiversidad Peruana',
      desc: 'Ecosistemas de ceja de selva y Andes peruanos, conservación',
      progress: 0,
      status: 'locked',
      topicsCount: 4,
    },
  ],

  // Visual Path Nodes (Duolingo Style Curve Path)
  pathNodes: [
    {
      id: 'node-1',
      unitId: 'u1',
      title: 'Concepto de Biología',
      type: 'lesson', // lesson, challenge, milestone, exam
      status: 'perfect', // completed, active, locked, review, perfect
      xp: 20,
      order: 1,
      xOffset: 0, // center
      lessonId: 'lesson-intro-bio',
    },
    {
      id: 'node-2',
      unitId: 'u1',
      title: 'Seres Vivos: Características',
      type: 'lesson',
      status: 'completed',
      xp: 20,
      order: 2,
      xOffset: -30, // left curve
      lessonId: 'lesson-caract-vivos',
    },
    {
      id: 'node-3',
      unitId: 'u1',
      title: '⭐ Reto: Método Científico',
      type: 'challenge',
      status: 'completed',
      xp: 30,
      order: 3,
      xOffset: -10,
      lessonId: 'challenge-metodo',
    },
    {
      id: 'node-4',
      unitId: 'u2',
      title: 'Célula Eucariota y Organelos',
      type: 'lesson',
      status: 'active', // Currently active node
      xp: 25,
      order: 4,
      xOffset: 25, // right curve
      lessonId: 'lesson-eucariota',
      estimatedTime: '5 min',
      completionPercent: 65,
    },
    {
      id: 'node-5',
      unitId: 'u2',
      title: 'Procariota vs Eucariota',
      type: 'lesson',
      status: 'review', // Needs review indicator
      xp: 20,
      order: 5,
      xOffset: 35,
      lessonId: 'lesson-comparacion-celular',
    },
    {
      id: 'node-6',
      unitId: 'u2',
      title: 'Membrana y Transporte',
      type: 'lesson',
      status: 'locked',
      xp: 20,
      order: 6,
      xOffset: 0,
      lessonId: 'lesson-membrana',
    },
    {
      id: 'node-7',
      unitId: 'u2',
      title: '🏆 Examen de Unidad: Citología',
      type: 'exam',
      status: 'locked',
      xp: 50,
      order: 7,
      xOffset: -20,
      lessonId: 'exam-u2',
    },
    {
      id: 'node-8',
      unitId: 'u3',
      title: 'Bioelementos en la Salud Dental',
      type: 'lesson',
      status: 'locked',
      xp: 20,
      order: 8,
      xOffset: 20,
      lessonId: 'lesson-bioelementos',
    }
  ]
};

/**
 * Interactive Organelle Infographic Data (Célula Eucariota)
 */
export const CELL_ORGANELLES = [
  {
    id: 'mitochondria',
    name: 'Mitocondria',
    badge: 'Central Energética',
    icon: '⚡',
    color: '#EF4444',
    position: { top: '35%', left: '22%' },
    functionDesc: 'Produce más del 90% del ATP celular mediante la respiración celular aeróbica (ciclo de Krebs y cadena respiratoria).',
    examTip: 'UNTRM fija: Posee ADN circular bicatenario propio y ribosomas 70S (Teoría Endosimbiótica de Lynn Margulis).'
  },
  {
    id: 'nucleus',
    name: 'Núcleo Celular',
    badge: 'Centro de Mando Genético',
    icon: '🧬',
    color: '#6366F1',
    position: { top: '50%', left: '50%' },
    functionDesc: 'Delimitado por una doble membrana (carioteca) con poros. Contiene la cromatina (ADN + histonas) y el nucléolo.',
    examTip: 'En el nucléolo se sintetizan las subunidades ribosómicas y el ARNr.'
  },
  {
    id: 'golgi',
    name: 'Aparato de Golgi',
    badge: 'Empaquetado y Secreción',
    icon: '📦',
    color: '#F59E0B',
    position: { top: '65%', left: '28%' },
    functionDesc: 'Dictiosomas formados por cisternas aplanadas. Modifica, glicosila, clasifica y empaqueta proteínas en vesículas.',
    examTip: 'Dato UNTRM: Origina los lisosomas primarios y la pared celular en vegetales (fragmoplasto).'
  },
  {
    id: 'ribosome',
    name: 'Ribosomas (80S)',
    badge: 'Fábrica de Proteínas',
    icon: '🧪',
    color: '#10B981',
    position: { top: '40%', left: '72%' },
    functionDesc: 'Complejos ribonucleoproteicos sin membrana formados por dos subunidades (60S y 40S).',
    examTip: 'Son los únicos organelos (organoides) presentes TANTO en procariotas como eucariotas.'
  },
  {
    id: 'lysosome',
    name: 'Lisosomas',
    badge: 'Digestión y Reciclaje',
    icon: '♻️',
    color: '#EC4899',
    position: { top: '72%', left: '68%' },
    functionDesc: 'Vesículas ácidas (pH ~5) cargadas con enzimas hidrolíticas producidas por el RER y maduradas en Golgi.',
    examTip: 'Efectúan fagocitosis, autofagia (reciclaje de organelos viejos) y autólisis programada.'
  }
];

/**
 * Interactive Comparison: Procariota vs Eucariota
 */
export const CELL_COMPARISON = [
  {
    feature: 'Núcleo y Envoltura Nuclear',
    prokaryote: 'Ausente (ADN libre en la zona llamada Nucleoide)',
    eukaryote: 'Presente (Carioteca con doble membrana y poros)',
    examImpact: 'Alto: El núcleo verdadero delimita a las eucariotas.',
  },
  {
    feature: 'Tipo y Estructura de ADN',
    prokaryote: 'Circular y desnudo (sin histonas verdaderas)',
    eukaryote: 'Lineal asociado a proteínas Histonas (Cromatina)',
    examImpact: 'Pregunta recurrente en UNTRM Ciencias de la Salud.',
  },
  {
    feature: 'Ribosomas',
    prokaryote: '70S (Subunidades 50S + 30S)',
    eukaryote: '80S en citosol (Subunidades 60S + 40S)',
    examImpact: 'Diana de antibióticos que no dañan células humanas.',
  },
  {
    feature: 'Organelos con Membrana',
    prokaryote: 'Ausentes (sin mitocondrias, Golgi, retículo)',
    eukaryote: 'Presentes (sistema de endomembranas compartimentado)',
    examImpact: 'Clave para entender la eficiencia metabólica.',
  },
  {
    feature: 'Pared Celular',
    prokaryote: 'Con Peptidoglucano (mureína)',
    eukaryote: 'Con Celulosa (plantas) o Quitina (hongos); ausente en animales',
    examImpact: 'Diferenciación crucial con bacterias bucales.',
  }
];
