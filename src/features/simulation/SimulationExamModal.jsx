import React, { useState, useEffect } from 'react';
import { X, Clock, Bookmark, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { ProgressBar, TagBadge } from '../../components/common/UIElements';

export function SimulationExamModal({ payload, onClose }) {
  const { simulation, mode = 'exam' } = payload; // mode: 'exam' | 'practice'
  const { setActiveModal, setModalPayload, openAITutorWithContext } = useApp();

  const questions = simulation.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: optionId }
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [practiceFeedback, setPracticeFeedback] = useState(null); // only for practice mode

  // Timer: 15 mins for demo (or 180 mins)
  const initialSeconds = (simulation.demoDurationMinutes || 15) * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishSimulation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const isMarked = markedForReview.has(currentQ.id);
  const selectedAnswer = userAnswers[currentQ.id];

  const handleSelectOption = (optionId) => {
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));

    if (mode === 'practice') {
      const isCorrect = optionId === currentQ.correctId;
      setPracticeFeedback({
        isCorrect,
        correctId: currentQ.correctId,
        explanation: currentQ.explanation,
      });
    }
  };

  const toggleBookmark = () => {
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) next.delete(currentQ.id);
      else next.add(currentQ.id);
      return next;
    });
  };

  const handleNext = () => {
    setPracticeFeedback(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setPracticeFeedback(null);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinishSimulation = () => {
    // Calculate results
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach(q => {
      const ans = userAnswers[q.id];
      if (!ans) unanswered++;
      else if (ans === q.correctId) correct++;
      else wrong++;
    });

    const score = Math.round((correct / questions.length) * 100);

    onClose();
    setActiveModal('simulationResults');
    setModalPayload({
      simulation,
      score,
      correct,
      wrong,
      unanswered,
      timeSpent: initialSeconds - secondsLeft,
      totalQuestions: questions.length,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Top Header: Question count, Timer, Bookmark */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-3 safe-top">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-slate-900">
            Pregunta {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-indigo-600" />
          <span>{formatTimer(secondsLeft)}</span>
        </div>

        {/* Mark for review button */}
        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-xl transition ${isMarked ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
          title="Marcar para revisar luego"
        >
          <Bookmark className={`w-4 h-4 ${isMarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pt-2">
        <ProgressBar progress={((currentIndex + 1) / questions.length) * 100} height="h-1.5" color="bg-indigo-600" />
      </div>

      {/* Question Body */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
              {currentQ.course} · {currentQ.topic}
            </span>
            {isMarked && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Marcada para revisión
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-5 leading-snug">
            {currentQ.text}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              let style = isSelected 
                ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold ring-2 ring-indigo-300' 
                : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-800';

              if (mode === 'practice' && practiceFeedback) {
                if (opt.id === currentQ.correctId) {
                  style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected && !practiceFeedback.isCorrect) {
                  style = 'border-rose-500 bg-rose-50 text-rose-950';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition text-xs sm:text-sm min-h-[48px] ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && mode === 'exam' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  )}
                  {mode === 'practice' && practiceFeedback && opt.id === currentQ.correctId && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Practice Mode Feedback Drawer */}
          {mode === 'practice' && practiceFeedback && (
            <div className={`p-4 rounded-2xl mt-4 border text-xs leading-relaxed ${
              practiceFeedback.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="font-bold mb-1">
                {practiceFeedback.isCorrect ? '✅ ¡Correcto!' : `❌ Respuesta: ${practiceFeedback.correctId}`}
              </div>
              <p className="opacity-90">{practiceFeedback.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer Navigation: Anterior / Siguiente / Finalizar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 safe-bottom">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {currentIndex + 1 < questions.length ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishSimulation}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
            >
              Finalizar Simulacro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
