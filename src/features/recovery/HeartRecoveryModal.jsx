import React, { useState } from 'react';
import { X, Heart, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../state/AppContext';
import { QUESTIONS_BANK } from '../../data/questionsBank';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { ProgressBar } from '../../components/common/UIElements';

export function HeartRecoveryModal({ onClose }) {
  const { user, mistakesBank, gainHeart, refillHearts } = useApp();

  // Questions from mistakes bank or fallback
  const recoveryQuestions = mistakesBank.length > 0 ? mistakesBank : [QUESTIONS_BANK[0], QUESTIONS_BANK[1]];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [recoveredCount, setRecoveredCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const activeQ = recoveryQuestions[currentIndex];

  const handleSelect = (optionId) => {
    if (feedback) return;
    const isCorrect = optionId === activeQ.correctId;

    setFeedback({
      isCorrect,
      selectedId: optionId,
      correctId: activeQ.correctId,
    });

    if (isCorrect) {
      setRecoveredCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex + 1 < recoveryQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Milestone: Heart gained!
      gainHeart();
      setCompleted(true);
      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between safe-top">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            ❤️
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {completed ? '¡Vida Recuperada!' : 'Recupera una vida'}
            </h3>
            <span className="text-xs text-slate-400">
              Vidas actuales: {user.hearts}/{user.maxHearts}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
        {!completed ? (
          <div>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 font-semibold mb-1">
                <span>Pregunta de repaso ({currentIndex + 1} de {recoveryQuestions.length})</span>
                <span className="text-rose-600 font-bold">+1 ❤️ al terminar</span>
              </div>
              <ProgressBar progress={((currentIndex + 1) / recoveryQuestions.length) * 100} height="h-2" color="bg-rose-500" />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 mb-4">
              <div className="text-xs text-amber-900 font-bold mb-0.5">💡 Repaso de Error Previo</div>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                Aprender de tus errores pasados es la forma más rápida de asegurar tu vacante en la UNTRM.
              </p>
            </div>

            <h4 className="text-base font-bold text-slate-900 mb-4 leading-snug">
              {activeQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {activeQ.options.map((opt) => {
                let style = 'border-slate-200 bg-white text-slate-800';
                if (feedback) {
                  if (opt.id === activeQ.correctId) {
                    style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (opt.id === feedback.selectedId) {
                    style = 'border-rose-500 bg-rose-50 text-rose-950';
                  } else {
                    style = 'border-slate-200 opacity-40 bg-slate-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={feedback !== null}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between text-xs sm:text-sm transition-all min-h-[48px] ${style}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                    {feedback && opt.id === activeQ.correctId && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback alert */}
            {feedback && (
              <div className={`p-3.5 rounded-2xl mt-4 border text-xs leading-relaxed ${
                feedback.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <strong>{feedback.isCorrect ? '¡Bien superado! ' : 'Ten en cuenta: '}</strong>
                {activeQ.explanation}
              </div>
            )}
          </div>
        ) : (
          <div className="my-auto text-center py-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center text-4xl animate-bounce">
              ❤️
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              +1 Vida Recuperada
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed mb-6">
              "Aprender de tus errores también cuenta." Ya tienes {user.hearts + 1} vidas para seguir practicando.
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4">
          {!completed ? (
            feedback && (
              <PrimaryButton onClick={handleNext} variant="primary" size="lg">
                {currentIndex + 1 < recoveryQuestions.length ? 'Siguiente repaso' : 'Terminar y ganar vida'}
              </PrimaryButton>
            )
          ) : (
            <PrimaryButton onClick={onClose} variant="gradient" size="lg">
              Volver a estudiar
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
