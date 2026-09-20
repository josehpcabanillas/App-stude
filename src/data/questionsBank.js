/**
 * Pre-university Admission Question Bank for UNTRM
 * Clearly distinguished by: PREGUNTA REAL vs TIPO UNTRM vs PRÁCTICA
 * Options and correct keys are naturally diversified (A, B, C, D, E) to prevent predictability.
 */

export const QUESTIONS_BANK = [
  {
    id: 'untrm-bio-2025-01',
    course: 'Biología',
    topic: 'Citología',
    tagType: 'PREGUNTA REAL',
    examLabel: 'UNTRM · Admisión 2025-II',
    question: 'Durante la respiración celular aeróbica, ¿en qué estructura u organelo citoplasmático se produce la mayor cantidad neta de ATP por fosforilación oxidativa?',
    options: [
      { id: 'A', text: 'Aparato de Golgi' },
      { id: 'B', text: 'Retículo Endoplasmático Liso' },
      { id: 'C', text: 'Lisosoma primario' },
      { id: 'D', text: 'Mitocondria' },
      { id: 'E', text: 'Ribosoma libre' },
    ],
    correctId: 'D',
    explanation: 'La mitocondria alberga en sus crestas internas la cadena transportadora de electrones y el complejo ATP sintasa, donde se sintetizan entre 30 a 32 moléculas de ATP por cada glucosa degradada.',
    distractors: [
      { id: 'A', text: 'Golgi empaqueta y secreta glucoproteínas, no sintetiza ATP.' },
      { id: 'B', text: 'El REL sintetiza lípidos (fosfolípidos, esteroides) y detoxifica fármacos.' },
      { id: 'C', text: 'Los lisosomas contienen hidrolasas ácidas para digestión celular.' },
      { id: 'E', text: 'Los ribosomas realizan la traducción para ensamblar aminoácidos en proteínas.' }
    ],
    aiPrompt: 'Explica el papel de la mitocondria en la respiración celular y por qué la fosforilación oxidativa genera tanto ATP para el examen UNTRM.',
  },
  {
    id: 'untrm-bio-2025-02',
    course: 'Biología',
    topic: 'Bioelementos',
    tagType: 'PREGUNTA REAL',
    examLabel: 'UNTRM · Admisión 2025-I',
    question: 'Bioelemento secundario indispensable para la formación de hidroxiapatita en el esmalte dental, la coagulación sanguínea y la contracción muscular:',
    options: [
      { id: 'A', text: 'Calcio (Ca)' },
      { id: 'B', text: 'Potasio (K)' },
      { id: 'C', text: 'Sodio (Na)' },
      { id: 'D', text: 'Hierro (Fe)' },
      { id: 'E', text: 'Fósforo (P)' },
    ],
    correctId: 'A',
    explanation: 'El Calcio (Ca²⁺) es el mineral más abundante del cuerpo humano; participa en la mineralización de huesos y dientes (hidroxiapatita cálcica), actúa como cofactor IV en la cascada de coagulación y se une a la troponina C en la contracción muscular.',
    distractors: [
      { id: 'B', text: 'El potasio es el principal catión intracelular y regula la repolarización cardíaca.' },
      { id: 'C', text: 'El sodio es el catión extracelular primordial que mantiene la presión osmótica.' },
      { id: 'D', text: 'El hierro forma el grupo hemo de la hemoglobina y mioglobina para transporte de O₂.' },
      { id: 'E', text: 'Aunque el fósforo integra la hidroxiapatita, no interviene directamente en la unión a troponina para la contracción muscular.' }
    ],
    aiPrompt: 'Explica por qué el Calcio es una pregunta fija en Ciencias de la Salud y Estomatología UNTRM.',
  },
  {
    id: 'untrm-bio-tipo-01',
    course: 'Biología',
    topic: 'Citología',
    tagType: 'TIPO UNTRM',
    examLabel: 'Prospecto UNTRM 2026',
    question: 'Si una célula humana pierde la capacidad de sintetizar lisosomas funcionales por un defecto enzimático en el Aparato de Golgi, la consecuencia inmediata principal será:',
    options: [
      { id: 'A', text: 'Imposibilidad de duplicar el material genético nuclear' },
      { id: 'B', text: 'Detención del transporte pasivo por osmosis' },
      { id: 'C', text: 'Incapacidad para degradar macromoléculas y organelos envejecidos (autofagia)' },
      { id: 'D', text: 'Cese total de la glucólisis citosólica' },
    ],
    correctId: 'C',
    explanation: 'Los lisosomas contienen enzimas hidrolasas ácidas encargadas de la heterofagia (digestión de partículas fagocitadas) y autofagia (reciclaje de organelos celulares). Su falla causa enfermedades de depósito lisosomal.',
    distractors: [
      { id: 'A', text: 'La duplicación del ADN ocurre en el núcleo durante la fase S de la interfase.' },
      { id: 'B', text: 'El transporte pasivo depende del gradiente electroquímico y de la bicapa fosfolipídica.' },
      { id: 'D', text: 'La glucólisis ocurre libre en el citosol mediante enzimas solubles independientes de lisosomas.' }
    ],
    aiPrompt: 'Describe con analogías simples la función del lisosoma y qué ocurre si falla en la célula humana.',
  },
  {
    id: 'untrm-bio-tipo-02',
    course: 'Biología',
    topic: 'Fundamentos',
    tagType: 'PRÁCTICA',
    examLabel: 'Repaso Rápido',
    question: '¿Cuál de las siguientes características biológicas permite a un organismo mantener constante su equilibrio interno ante variaciones del ambiente exterior?',
    options: [
      { id: 'A', text: 'Metabolismo' },
      { id: 'B', text: 'Homeostasis' },
      { id: 'C', text: 'Irritabilidad' },
      { id: 'D', text: 'Evolución' },
    ],
    correctId: 'B',
    explanation: 'La homeostasis es la capacidad fisiológica de autorregulación que mantiene las condiciones fisicoquímicas internas (temperatura, pH, glucemia) dentro de límites compatibles con la vida.',
    distractors: [
      { id: 'A', text: 'El metabolismo es el conjunto de reacciones químicas (anabolismo + catabolismo).' },
      { id: 'C', text: 'La irritabilidad es la respuesta inmediata temporal ante estímulos físicos o químicos.' },
      { id: 'D', text: 'La evolución es la transformación genética gradual de las poblaciones a lo largo de generaciones.' }
    ],
    aiPrompt: 'Diferencia entre homeostasis e irritabilidad con ejemplos sencillos de la vida cotidiana para examen de admisión.',
  },
  {
    id: 'untrm-diag-01',
    course: 'Biología',
    topic: 'Citología',
    tagType: 'TIPO UNTRM',
    examLabel: 'Diagnóstico Inicial',
    question: '¿Qué estructura está presente en células procariotas (bacterias) y ausente como orgánulo membranoso en su citoplasma?',
    options: [
      { id: 'A', text: 'Membrana nuclear (Carioteca)' },
      { id: 'B', text: 'Mitocondrias crestadas' },
      { id: 'C', text: 'Aparato de Golgi vesicular' },
      { id: 'D', text: 'Retículo endoplásmico' },
      { id: 'E', text: 'Ribosomas 70S' },
    ],
    correctId: 'E',
    explanation: 'Las bacterias poseen ribosomas 70S no membranosos para traducir sus proteínas, pero carecen de carioteca y de todo organelo membranoso.',
    distractors: [
      { id: 'A', text: 'Las bacterias NO tienen membrana nuclear.' },
      { id: 'B', text: 'Las bacterias realizan respiración en los mesosomas / membrana, sin mitocondrias.' },
      { id: 'C', text: 'Golgi sólo existe en células eucariotas.' },
      { id: 'D', text: 'El retículo endoplásmico es exclusivo de células eucariotas.' }
    ],
    aiPrompt: 'Explica las diferencias estructurales de las bacterias para el examen de admisión UNTRM.',
  }
];
