/**
 * Academic Minigames Data & Configurations
 * Note: Option orders are naturally diversified across all items.
 */

export const MINIGAMES = [
  {
    id: 'organelle-rush',
    title: 'Organelle Rush',
    course: 'Biología',
    topic: 'Citología',
    icon: '⚡',
    gradient: 'from-indigo-600 to-violet-600',
    durationSeconds: 60,
    shortDesc: 'Relaciona la función biológica con el organelo antes de que expire el tiempo.',
    description: 'Entrenamiento veloz de memoria y reflejos citológicos. Ideal para asegurar las 4 preguntas de célula de la UNTRM.',
    baseXp: 35,
    pairs: [
      { prompt: 'Sintetiza la mayor cantidad de ATP mediante fosforilación oxidativa', answer: 'Mitocondria', options: ['Golgi', 'Lisosoma', 'Mitocondria', 'Ribosoma'] },
      { prompt: 'Empaqueta proteínas y sintetiza lisosomas primarios', answer: 'Aparato de Golgi', options: ['Peroxisoma', 'RER', 'Centriolo', 'Aparato de Golgi'] },
      { prompt: 'Contiene hidrolasas ácidas para digestión celular y autofagia', answer: 'Lisosoma', options: ['Mitocondria', 'Lisosoma', 'Vacuola', 'Ribosoma'] },
      { prompt: 'Degrada peróxido de hidrógeno mediante la enzima catalasa', answer: 'Peroxisoma', options: ['Peroxisoma', 'Golgi', 'Lisosoma', 'Carioteca'] },
      { prompt: 'Sintetiza lípidos y esteroides, además de detoxificar la célula', answer: 'Retículo Endoplasmático Liso', options: ['RER', 'Mitocondria', 'Retículo Endoplasmático Liso', 'Nucleolo'] },
      { prompt: 'Sintetiza subunidades ribosómicas y ARN ribosomal', answer: 'Nucléolo', options: ['Centrosoma', 'Aparato de Golgi', 'Peroxisoma', 'Nucléolo'] },
      { prompt: 'Forma el huso acromático durante la división celular animal', answer: 'Centriolo / Centrosoma', options: ['Ribosoma', 'Centriolo / Centrosoma', 'Lisosoma', 'Citosol'] },
      { prompt: 'Sintetiza proteínas de secreción y de membrana acoplado a ribosomas', answer: 'Retículo Endoplasmático Rugoso', options: ['REL', 'Retículo Endoplasmático Rugoso', 'Vacuola', 'Mesosoma'] },
    ]
  },
  {
    id: 'dna-match',
    title: 'DNA Match',
    course: 'Biología',
    topic: 'Genética Molecular',
    icon: '🧬',
    gradient: 'from-blue-600 to-cyan-600',
    durationSeconds: 45,
    shortDesc: 'Empareja las bases nitrogenadas complementarias del ADN y ARN contra reloj.',
    description: 'Domina los puentes de hidrógeno de Chargaff: A con T (2 enlaces) y C con G (3 enlaces).',
    baseXp: 30,
    rounds: [
      { base: 'Adenina (A)', complement: 'Timina (T)', hint: '2 puentes de hidrógeno', options: ['Guanina (G)', 'Timina (T)', 'Citosina (C)', 'Uracilo (U)'] },
      { base: 'Citosina (C)', complement: 'Guanina (G)', hint: '3 puentes de hidrógeno', options: ['Adenina (A)', 'Timina (T)', 'Uracilo (U)', 'Guanina (G)'] },
      { base: 'Guanina (G)', complement: 'Citosina (C)', hint: 'Base pirimidínica complementaria', options: ['Citosina (C)', 'Adenina (A)', 'Timina (T)', 'Ribosa'] },
      { base: 'Timina (T)', complement: 'Adenina (A)', hint: 'Base púrica complementaria', options: ['Guanina (G)', 'Citosina (C)', 'Adenina (A)', 'Uracilo (U)'] },
      { base: 'Adenina en ARN (A)', complement: 'Uracilo (U)', hint: 'El Uracilo reemplaza a la Timina en transcripción', options: ['Timina (T)', 'Guanina (G)', 'Uracilo (U)', 'Citosina (C)'] },
    ]
  },
  {
    id: 'mitosis-order',
    title: 'Mitosis Order',
    course: 'Biología',
    topic: 'Ciclo Celular',
    icon: '🔄',
    gradient: 'from-emerald-600 to-teal-600',
    durationSeconds: 60,
    shortDesc: 'Ordena cronológicamente las fases de la división nuclear celular.',
    description: 'Aprende la mnemotecnia fija de examen: PRO-METE-ANA-TEJER.',
    baseXp: 30,
    phases: [
      { id: 'pro', name: 'Profase', step: 1, event: 'Condensación de cromatina, desintegración de carioteca y nucleolo.' },
      { id: 'meta', name: 'Metafase', step: 2, event: 'Cromosomas alineados en el plano ecuatorial con máxima condensación.' },
      { id: 'ana', name: 'Anafase', step: 3, event: 'Disyunción y separación de cromátidas hermanas hacia polos opuestos.' },
      { id: 'telo', name: 'Telofase', step: 4, event: 'Reconstrucción de la envoltura nuclear, descondensación y citocinesis.' },
    ]
  },
  {
    id: 'element-rush',
    title: 'Element Rush',
    course: 'Biología',
    topic: 'Bioelementos',
    icon: '🧪',
    gradient: 'from-amber-500 to-rose-600',
    durationSeconds: 60,
    shortDesc: 'Asocia cada bioelemento con su rol en la salud y patología humana.',
    description: 'Especial para el área de Ciencias de la Salud (UNTRM Estomatología y Medicina).',
    baseXp: 35,
    pairs: [
      { prompt: 'Mineraliza el esmalte formando hidroxiapatita y actúa en la contracción muscular', answer: 'Calcio (Ca)', options: ['Hierro (Fe)', 'Calcio (Ca)', 'Yodo (I)', 'Magnesio (Mg)'] },
      { prompt: 'Componente central del grupo Hemo de la hemoglobina para transportar O₂', answer: 'Hierro (Fe)', options: ['Cobre (Cu)', 'Zinc (Zn)', 'Calcio (Ca)', 'Hierro (Fe)'] },
      { prompt: 'Forma parte de las hormonas tiroideas T3 y T4; su déficit produce bocio', answer: 'Yodo (I)', options: ['Flúor (F)', 'Yodo (I)', 'Sodio (Na)', 'Potasio (K)'] },
      { prompt: 'Previene la caries dental al sustituir grupos hidroxilo formando fluoroapatita', answer: 'Flúor (F)', options: ['Cloro (Cl)', 'Calcio (Ca)', 'Flúor (F)', 'Fósforo (P)'] },
      { prompt: 'Átomo central del anillo de porfirina en la molécula de clorofila', answer: 'Magnesio (Mg)', options: ['Magnesio (Mg)', 'Manganeso (Mn)', 'Hierro (Fe)', 'Potasio (K)'] },
    ]
  }
];
