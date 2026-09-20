import React, { useState } from 'react';
import { 
  X, CheckCircle2, XCircle, Sparkles, ChevronDown, ChevronUp, 
  HelpCircle, ArrowRight, RotateCcw, Clock, Trophy, Heart, ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../state/AppContext';
import { CELL_ORGANELLES, CELL_COMPARISON } from '../../data/biologyCourse';
import { QUESTIONS_BANK } from '../../data/questionsBank';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { ProgressBar, TagBadge, HeartCounter } from '../../components/common/UIElements';
import { masteryRepository } from '../../repositories/masteryRepository';

export function LessonPlayerModal({ lessonData, onClose }) {
  const { 
    user, 
    addXP, 
    loseHeart, 
    recordAnswer, 
    openAITutorWithContext, 
    setActiveModal, 
    setModalPayload 
  } = useApp();

  // Lesson steps:
  // Step 0: Concept Theory
  // Step 1: Interactive Organelle Infographic
  // Step 2: Interactive Prokaryote vs Eukaryote Comparison
  // Step 3: Intermediate Exercise
  // Step 4: Real UNTRM Exam Question
  // Step 5: Final Lesson Celebration Summary
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5; // steps 0 to 4 before celebration

  // Interactive Infographic state
  const [selectedOrganelle, setSelectedOrganelle] = useState(CELL_ORGANELLES[0]);

  // Interactive Comparison filter
  const [comparisonTab, setComparisonTab] = useState('all'); // 'all' | 'nucleo' | 'ribosomas' | 'membranas'

  // Exercise & UNTRM Question states
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); // { isCorrect, qObj }
  const [showDistractors, setShowDistractors] = useState(false);

  // Lesson Stats Tracking
  const [stats, setStats] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    xpGained: 20,
    startTime: Date.now(),
  });

  // Questions used in this lesson
  const intermediateQ = QUESTIONS_BANK[0]; // Mitocondria ATP (PREGUNTA REAL UNTRM 2025-II)
  const untrmQ = QUESTIONS_BANK[2]; // Lisosoma y Golgi (TIPO UNTRM 2026)

  const activeQuestion = currentStep === 3 ? intermediateQ : currentStep === 4 ? untrmQ : null;

  // Handle Answer Selection in Exercises
  const handleSelectOption = (optionId) => {
    if (feedback || !activeQuestion) return;

    const isCorrect = optionId === activeQuestion.correctId;
    setSelectedOption(optionId);

    // Update Repository and User Stats
    recordAnswer(isCorrect, activeQuestion);
    masteryRepository.recordPracticeResult('citologia', isCorrect);

    if (isCorrect) {
      setStats(prev => ({ ...prev, correctAnswers: prev.correctAnswers + 1, xpGained: prev.xpGained + 10 }));
    } else {
      setStats(prev => ({ ...prev, wrongAnswers: prev.wrongAnswers + 1 }));
    }

    setFeedback({
      isCorrect,
      question: activeQuestion,
      selectedId: optionId,
    });
  };

  // Move to next step
  const handleNextStep = () => {
    setSelectedOption(null);
    setFeedback(null);
    setShowDistractors(false);

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Reached Lesson Celebration milestone!
      setCurrentStep(5);
      addXP(stats.xpGained);

      // Milestone Confetti!
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleAskAITutor = (promptPreset) => {
    if (!activeQuestion) return;
    openAITutorWithContext({
      course: 'Biología',
      topic: activeQuestion.topic,
      question: activeQuestion.question,
      options: activeQuestion.options,
      correctAnswer: activeQuestion.correctId,
      userAnswer: selectedOption,
      presetPrompt: promptPreset,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Top Bar with Step Progress, Hearts and Exit */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-3 safe-top">
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <ProgressBar progress={(Math.min(currentStep + 1, totalSteps) / totalSteps) * 100} height="h-2.5" color="bg-indigo-600" />
        </div>

        <div className="flex items-center gap-2">
          <HeartCounter hearts={user.hearts} maxHearts={user.maxHearts} />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col">
        {/* ================= STEP 0: TEORÍA CONCISA ================= */}
        {currentStep === 0 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TagBadge type="PRÁCTICA" label="Concepto Clave" />
                <span className="text-xs text-slate-400 font-semibold">Tema: Citología Eucariota</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug">
                ¿Qué hace diferente a una célula eucariota?
              </h2>

              {/* Visual Card / Illustration */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-100 text-center mb-5 shadow-xs">
                <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-4xl shadow-md">
                  🧬
                </div>
                <h3 className="text-base font-extrabold text-indigo-950 mb-1">
                  Carioteca y Compartimentación
                </h3>
                <p className="text-sm text-indigo-900/80 leading-relaxed max-w-xs mx-auto">
                  A diferencia de las bacterias procariotas, la célula eucariota posee un <strong>núcleo delimitado por una doble membrana</strong> (carioteca) y un sistema interno de endomembranas.
                </p>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>ADN lineal protegido:</strong> Asociado a proteínas histonas formando cromatina.
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>División celular especializada:</strong> Se divide mediante Mitosis y Meiosis con huso acromático.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <PrimaryButton onClick={handleNextStep} size="lg">
                Continuar a la Infografía
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* ================= STEP 1: INFOGRAFÍA INTERACTIVA DE ORGANELOS ================= */}
        {currentStep === 1 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TagBadge type="PRÁCTICA" label="Infografía Interactiva" />
                <span className="text-xs text-indigo-600 font-bold">Toca cada organelo 👇</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                Explora los organelos celulares
              </h2>

              {/* Cell Visual Diagram with Touch Hotspots */}
              <div className="relative w-full aspect-video rounded-3xl bg-slate-900 border-2 border-indigo-500/30 overflow-hidden shadow-inner flex items-center justify-center p-4 mb-4">
                {/* Cell outline graphic representation */}
                <div className="w-56 h-36 rounded-full border-4 border-indigo-400/40 bg-indigo-950/60 relative flex items-center justify-center">
                  <span className="text-[10px] text-indigo-300/40 font-mono tracking-widest absolute top-2 uppercase">
                    Citoplasma
                  </span>

                  {/* Hotspots */}
                  {CELL_ORGANELLES.map((org) => {
                    const isSelected = selectedOrganelle?.id === org.id;
                    return (
                      <button
                        key={org.id}
                        onClick={() => setSelectedOrganelle(org)}
                        style={{ top: org.position.top, left: org.position.left }}
                        className={`
                          absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl flex items-center gap-1.5 transition-all duration-200
                          ${isSelected 
                            ? 'bg-white text-slate-950 ring-4 ring-indigo-400 scale-110 shadow-lg z-20' 
                            : 'bg-slate-800/90 text-white hover:bg-slate-700/90 scale-95 z-10 border border-slate-700'
                          }
                        `}
                      >
                        <span className="text-base">{org.icon}</span>
                        <span className="text-[10px] font-bold whitespace-nowrap">{org.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Organelle Detail Drawer / Card */}
              {selectedOrganelle && (
                <div className="p-4 rounded-2xl bg-white border-2 border-indigo-100 shadow-sm animate-fadeIn">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{selectedOrganelle.icon}</span>
                      <h4 className="text-base font-extrabold text-slate-900">
                        {selectedOrganelle.name}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      {selectedOrganelle.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {selectedOrganelle.functionDesc}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
                    <span className="font-bold">🎯 Clave UNTRM: </span>
                    {selectedOrganelle.examTip}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <PrimaryButton onClick={handleNextStep} size="lg">
                Continuar a la Comparación
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* ================= STEP 2: COMPARACIÓN INTERACTIVA ================= */}
        {currentStep === 2 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <TagBadge type="PRÁCTICA" label="Comparativa Fija" />
                <span className="text-xs text-slate-400 font-semibold">Resumen Clave</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 leading-snug">
                Procariota vs Eucariota
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Toca cada fila para revisar la diferencia exacta que preguntan en el examen.
              </p>

              {/* Comparison Interactive Cards */}
              <div className="space-y-2.5">
                {CELL_COMPARISON.map((row, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-indigo-200 transition">
                    <div className="text-xs font-bold text-indigo-700 mb-2">
                      {row.feature}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Procariota</span>
                        <span className="text-slate-700 font-medium">{row.prokaryote}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100">
                        <span className="text-[10px] font-extrabold text-indigo-500 block uppercase">Eucariota</span>
                        <span className="text-indigo-950 font-bold">{row.eukaryote}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <PrimaryButton onClick={handleNextStep} size="lg">
                ¡Poner a prueba mi aprendizaje!
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* ================= STEPS 3 & 4: EJERCICIO & PREGUNTA REAL UNTRM ================= */}
        {(currentStep === 3 || currentStep === 4) && activeQuestion && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <TagBadge type={activeQuestion.tagType} label={activeQuestion.examLabel} />
                <span className="text-xs text-slate-400 font-semibold">Curso: {activeQuestion.course}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-5 leading-snug">
                {activeQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {activeQuestion.options.map((option) => {
                  let buttonStyle = 'border-slate-200 hover:border-indigo-300 bg-white text-slate-800';

                  if (feedback) {
                    if (option.id === activeQuestion.correctId) {
                      buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                    } else if (option.id === feedback.selectedId && !feedback.isCorrect) {
                      buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-300';
                    } else {
                      buttonStyle = 'border-slate-200 opacity-40 bg-slate-50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={feedback !== null}
                      className={`
                        w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all select-none
                        active:scale-[0.99] min-h-[48px] ${buttonStyle}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                          {option.id}
                        </span>
                        <span className="text-xs sm:text-sm">{option.text}</span>
                      </div>

                      {feedback && option.id === activeQuestion.correctId && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {feedback && option.id === feedback.selectedId && !feedback.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-Level Pedagogical Feedback Sheet */}
            {feedback && (
              <div className={`p-4 rounded-3xl mt-4 border shadow-sm animate-slideUp ${
                feedback.isCorrect ? 'bg-emerald-50/90 border-emerald-200' : 'bg-rose-50/90 border-rose-200'
              }`}>
                {/* Level 1: Immediate Explanation */}
                <div className="flex items-center gap-2 font-black text-sm mb-1">
                  {feedback.isCorrect ? (
                    <span className="text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ¡Respuesta Correcta!
                    </span>
                  ) : (
                    <span className="text-rose-800 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Casi... La respuesta correcta es {feedback.question.correctId}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  <strong>¿Por qué? </strong> {feedback.question.explanation}
                </p>

                {/* Level 2: Expandable "Why not the other options?" */}
                {feedback.question.distractors && (
                  <div className="mb-3">
                    <button
                      onClick={() => setShowDistractors(!showDistractors)}
                      className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 transition"
                    >
                      <span>¿Por qué no las otras opciones?</span>
                      {showDistractors ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {showDistractors && (
                      <div className="mt-2 space-y-1.5 p-2.5 rounded-xl bg-white/80 border border-slate-200 text-[11px] text-slate-600">
                        {feedback.question.distractors.map(d => (
                          <div key={d.id} className="leading-tight">
                            <span className="font-bold text-slate-800">{d.id}: </span>
                            <span>{d.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Level 3: AI Tutor Quick Triggers */}
                <div className="pt-2 border-t border-slate-200/60 mb-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>Preguntar al Tutor IA:</span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    <button
                      onClick={() => handleAskAITutor('Explícamelo con manzanitas')}
                      className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    >
                      Explícamelo fácil 💡
                    </button>
                    <button
                      onClick={() => handleAskAITutor('Ponme otro ejemplo clínico')}
                      className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    >
                      Ponme un ejemplo 🔬
                    </button>
                    <button
                      onClick={() => handleAskAITutor('Hazme otra pregunta similar')}
                      className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    >
                      Hazme otra pregunta 🎯
                    </button>
                  </div>
                </div>

                <PrimaryButton 
                  onClick={handleNextStep}
                  variant={feedback.isCorrect ? 'success' : 'primary'}
                  size="md"
                >
                  Continuar
                </PrimaryButton>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 5: CELEBRACIÓN DE FIN DE LECCIÓN ================= */}
        {currentStep === 5 && (
          <div className="flex-1 flex flex-col justify-between py-4 text-center animate-fadeIn">
            <div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-amber-950 flex items-center justify-center text-4xl shadow-lg ring-8 ring-amber-100 animate-bounce">
                🏆
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
                ¡Lección completada!
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Has avanzado en Citología para UNTRM Estomatología.
              </p>

              {/* Performance Cards Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
                  <div className="text-2xl font-black text-indigo-700">+{stats.xpGained} XP</div>
                  <div className="text-[11px] font-bold text-indigo-500 uppercase mt-0.5">Experiencia</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                  <div className="text-2xl font-black text-emerald-700">
                    {stats.correctAnswers + stats.wrongAnswers > 0 
                      ? Math.round((stats.correctAnswers / (stats.correctAnswers + stats.wrongAnswers)) * 100) 
                      : 100}%
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 uppercase mt-0.5">Precisión</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-2xl font-black text-slate-800">5 min</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Tiempo</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-2xl font-black text-slate-800">3</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Dominados</div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <PrimaryButton onClick={onClose} variant="gradient" size="lg">
                Continuar ruta
              </PrimaryButton>
              {stats.wrongAnswers > 0 && (
                <SecondaryButton onClick={() => { onClose(); setActiveModal('recovery'); }}>
                  Repasar errores ({stats.wrongAnswers})
                </SecondaryButton>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
