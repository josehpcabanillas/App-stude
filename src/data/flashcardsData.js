/**
 * Spaced Repetition Flashcards Data (Biología Preuniversitaria)
 */

export const INITIAL_FLASHCARDS = [
  {
    id: 'fc-1',
    topic: 'Citología',
    question: '¿Qué organelo modifica, clasifica y empaqueta proteínas sintetizadas en el RER?',
    answer: 'Aparato de Golgi',
    mnemonic: 'Golgi = La empresa de paquetería y envíos de la célula.',
    examNote: 'Dato UNTRM: Origina lisosomas primarios y el acrosoma del espermatozoide.',
    status: 'learning', // new, learning, review, mastered
    retentionScore: 60,
  },
  {
    id: 'fc-2',
    topic: 'Citología',
    question: '¿Qué organelo contiene enzimas catalasas y oxidasas para degradar peróxido de hidrógeno (H₂O₂)?',
    answer: 'Peroxisoma',
    mnemonic: 'Peroxi-soma degrada el Peróxido de hidrógeno (agua oxigenada tóxica).',
    examNote: 'Interviene también en la beta-oxidación de ácidos grasos de cadena muy larga.',
    status: 'review',
    retentionScore: 40,
  },
  {
    id: 'fc-3',
    topic: 'Bioelementos',
    question: '¿Cuál es el bioelemento secundario indispensable para la formación de hidroxiapatita en el esmalte dental?',
    answer: 'Calcio (Ca²⁺) y Fósforo (PO₄³⁻)',
    mnemonic: 'Fórmula mineral: Ca₁₀(PO₄)₆(OH)₂',
    examNote: 'Vital para Estomatología: el Flúor sustituye el OH formando fluoroapatita, más resistente a la caries.',
    status: 'mastered',
    retentionScore: 90,
  },
  {
    id: 'fc-4',
    topic: 'Metabolismo',
    question: '¿En qué compartimento mitocondrial exacto se realiza el Ciclo de Krebs (ácido cítrico)?',
    answer: 'Matriz mitocondrial (mitosol)',
    mnemonic: 'Krebs nada en la Matriz; la Cadena respiratoria escala las Crestas.',
    examNote: 'Produce 2 ATP (o GTP), 6 NADH y 2 FADH₂ por molécula de glucosa.',
    status: 'review',
    retentionScore: 45,
  },
  {
    id: 'fc-5',
    topic: 'Genética',
    question: '¿Cuáles son las bases nitrogenadas púricas (purinas) del ADN y ARN?',
    answer: 'Adenina (A) y Guanina (G)',
    mnemonic: 'Regla: "Agua Pura" = Adenina y Guanina son Purinas (doble anillo).',
    examNote: 'Las pirimidinas (anillo simple) son Citosina, Timina y Uracilo.',
    status: 'learning',
    retentionScore: 50,
  }
];
