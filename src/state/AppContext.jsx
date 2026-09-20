import React, { createContext, useContext, useState, useEffect } from 'react';
import { UNIVERSITIES, CAREERS, DAILY_GOALS, RANKS, AVATARS } from '../types/schema';
import { BIOLOGY_COURSE } from '../data/biologyCourse';
import { QUESTIONS_BANK } from '../data/questionsBank';
import { INITIAL_FLASHCARDS } from '../data/flashcardsData';
import { SIMULATIONS } from '../data/simulationsData';

const AppContext = createContext();

const STORAGE_KEY = 'stude_preu_v3_state';

export function AppProvider({ children }) {
  // Main User Profile
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.onboardingCompleted === 'boolean') {
          return parsed;
        }
      } catch (e) { }
    }
    return {
      name: '',
      email: '',
      whatsapp: '',
      university: 'UNTRM',
      career: 'Estomatología',
      area: 'Ciencias de la Salud',
      examDaysLeft: 84,
      dailyGoalMinutes: 20,
      avatar: 'owl',
      xp: 0,
      streak: 1,
      streakAtRisk: false,
      hearts: 5,
      maxHearts: 5,
      gems: 100,
      rank: 'Novato',
      level: 1,
      onboardingCompleted: false, // Default is false: mandatory onboarding for every new user!
    };
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'path' | 'training' | 'simulations' | 'profile'
  const [activeModal, setActiveModal] = useState(null); // null | 'unitSelector' | 'lessonPlayer' | 'minigame' | 'simulation' | 'recovery' | 'ranking' | 'search' | 'onboarding'
  const [modalPayload, setModalPayload] = useState(null);

  // Active Course
  const [activeCourse, setActiveCourse] = useState(BIOLOGY_COURSE);

  // Mistake Review Bank (Questions failed by student)
  const [mistakesBank, setMistakesBank] = useState(() => {
    return [
      QUESTIONS_BANK[0], // Mitocondria
      QUESTIONS_BANK[1], // Calcio
      QUESTIONS_BANK[2], // Lisosoma
    ];
  });

  // Spaced Repetition Flashcards
  const [flashcards, setFlashcards] = useState(INITIAL_FLASHCARDS);

  // Daily Goal Activities Tracking
  const [dailyProgress, setDailyProgress] = useState({
    lessonDone: true,
    questionsDone: 10,
    questionsTarget: 10,
    flashcardsDone: 2,
    flashcardsTarget: 5,
    completedCount: 2,
    totalCount: 3,
  });

  // AI Tutor Context
  const [aiTutor, setAiTutor] = useState({
    isOpen: false,
    context: null,
    messages: [
      {
        id: 'welcome',
        sender: 'ai',
        text: '¡Hola Andrea! Soy tu Tutor IA de Stude especializado en el prospecto de la UNTRM. ¿Qué concepto o pregunta de Biología deseas repasar hoy?'
      }
    ]
  });

  // Device Emulation Settings (For testing 390x844 mobile frame on desktop)
  const [viewportSettings, setViewportSettings] = useState({
    isEmulating: false, // Default to responsive so real mobile and desktop are clean
    width: 390, // 360, 390, 414, 430
    zoom: 100,
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_user', JSON.stringify(user));
  }, [user]);

  // Recalculate Rank when XP changes
  useEffect(() => {
    const currentRank = [...RANKS].reverse().find(r => user.xp >= r.minXp) || RANKS[0];
    if (currentRank.name !== user.rank) {
      setUser(prev => ({ ...prev, rank: currentRank.name }));
    }
  }, [user.xp]);

  // --- Actions ---

  const addXP = (amount) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const loseHeart = () => {
    setUser(prev => {
      const newHearts = Math.max(0, prev.hearts - 1);
      return { ...prev, hearts: newHearts };
    });
  };

  const gainHeart = () => {
    setUser(prev => {
      const newHearts = Math.min(prev.maxHearts, prev.hearts + 1);
      return { ...prev, hearts: newHearts };
    });
  };

  const refillHearts = () => {
    setUser(prev => ({ ...prev, hearts: prev.maxHearts }));
  };

  const recordAnswer = (isCorrect, question) => {
    if (isCorrect) {
      addXP(5);
      setDailyProgress(prev => ({
        ...prev,
        questionsDone: prev.questionsDone + 1,
        completedCount: prev.questionsDone + 1 >= prev.questionsTarget && prev.lessonDone ? 3 : prev.completedCount
      }));
      // Remove from mistakes if it was there
      setMistakesBank(prev => prev.filter(q => q.id !== question.id));
    } else {
      loseHeart();
      // Add to mistakes bank if not already present
      setMistakesBank(prev => {
        if (!prev.some(q => q.id === question.id)) {
          return [...prev, question];
        }
        return prev;
      });
    }
  };

  const rateFlashcard = (id, rating) => {
    setFlashcards(prev => prev.map(fc => {
      if (fc.id !== id) return fc;
      let newScore = fc.retentionScore;
      let newStatus = fc.status;
      if (rating === 'facil') {
        newScore = Math.min(100, newScore + 25);
        newStatus = newScore > 80 ? 'mastered' : 'review';
        addXP(5);
      } else if (rating === 'dude') {
        newScore = Math.min(80, newScore + 10);
        newStatus = 'learning';
        addXP(3);
      } else {
        newScore = Math.max(10, newScore - 20);
        newStatus = 'review';
      }
      return { ...fc, retentionScore: newScore, status: newStatus, lastReviewed: Date.now() };
    }));

    setDailyProgress(prev => ({
      ...prev,
      flashcardsDone: prev.flashcardsDone + 1,
    }));
  };

  // AI Tutor Quick Interaction
  const openAITutorWithContext = (contextData) => {
    setAiTutor(prev => ({
      isOpen: true,
      context: contextData,
      messages: [
        ...prev.messages,
        {
          id: 'ctx-' + Date.now(),
          sender: 'ai',
          text: `Estoy analizando el tema **${contextData.topic || 'Biología'}** de la **${contextData.course || 'UNTRM'}**. Pregunta: *"${contextData.question || 'Concepto actual'}"*. ¿Cómo te puedo ayudar a dominarlo?`
        }
      ]
    }));
  };

  const sendAITutorMessage = (userPrompt) => {
    const userMsg = { id: 'u-' + Date.now(), sender: 'user', text: userPrompt };
    setAiTutor(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg]
    }));

    // Simulated high-value educational responses
    setTimeout(() => {
      let aiResponse = 'Esta es una pregunta clásica en el examen de la UNTRM para Ciencias de la Salud. Para recordarlo fácilmente: asocia siempre la estructura celular con su función fisiológica principal.';
      
      const lower = userPrompt.toLowerCase();
      if (lower.includes('fácil') || lower.includes('manzanitas')) {
        aiResponse = '💡 **Explicación Fácil**: Imagina que la célula es un hospital en Chachapoyas. La mitocondria es el generador eléctrico de emergencia que da luz a todo (sintetiza ATP), y el núcleo es la dirección general con las historias clínicas de todos los pacientes (ADN). ¡Así de simple!';
      } else if (lower.includes('por qué') || lower.includes('respuesta')) {
        aiResponse = '✅ **Justificación de Examen**: En la UNTRM, los distractores suelen mezclar organelos con membrana vs organoides sin membrana (como los ribosomas 70S/80S). Ten presente que la fosforilación oxidativa solo ocurre en la membrana interna mitocondrial.';
      } else if (lower.includes('ejemplo')) {
        aiResponse = '🔬 **Ejemplo Clínico (Estomatología)**: Cuando se anestesia un nervio dental con lidocaína, bloqueamos los canales de Sodio (Na⁺) en la membrana plasmática neuronal, impidiendo la despolarización y el impulso del dolor.';
      } else if (lower.includes('pregunta')) {
        aiResponse = '🎯 **Mini-Pregunta de prueba**: ¿Qué pasaría con una célula bucal si se inhibe la síntesis de ATP en la mitocondria? A) No puede duplicar ADN. B) Falla la bomba Sodio-Potasio y se lisa la célula. ¡Exacto, la respuesta es la B!';
      } else if (lower.includes('regla') || lower.includes('mnemotecnia')) {
        aiResponse = '🧠 **Mnemotecnia UNTRM**: Para las fases de la división celular: **PRO METE ANA TEJER** (Profase, Metafase, Anafase, Telofase). ¡No falla nunca en la cartilla!';
      }

      setAiTutor(prev => ({
        ...prev,
        messages: [...prev.messages, { id: 'ai-' + Date.now(), sender: 'ai', text: aiResponse }]
      }));
    }, 600);
  };

  const closeAITutor = () => {
    setAiTutor(prev => ({ ...prev, isOpen: false }));
  };

  // Reset Onboarding (so user or reviewer can test it completely from Step 1)
  const startOnboarding = () => {
    setUser(prev => ({ ...prev, onboardingCompleted: false }));
    setActiveModal('onboarding');
    setModalPayload({ step: 1 });
  };

  const finishOnboarding = (onboardingData) => {
    setUser(prev => ({
      ...prev,
      ...onboardingData,
      onboardingCompleted: true,
      xp: 50, // Welcome reward
      hearts: 5,
      streak: 1,
      rank: 'Novato',
      level: 1,
    }));
    setActiveModal(null);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        modalPayload,
        setModalPayload,
        activeCourse,
        setActiveCourse,
        mistakesBank,
        setMistakesBank,
        flashcards,
        rateFlashcard,
        dailyProgress,
        aiTutor,
        openAITutorWithContext,
        sendAITutorMessage,
        closeAITutor,
        viewportSettings,
        setViewportSettings,
        addXP,
        loseHeart,
        gainHeart,
        refillHearts,
        recordAnswer,
        startOnboarding,
        finishOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
