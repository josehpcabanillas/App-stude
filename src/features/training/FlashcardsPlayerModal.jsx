import React, { useState } from 'react';
import { X, RotateCw, Check, Sparkles, Brain, Clock, ChevronRight } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { flashcardRepository } from '../../repositories/flashcardRepository';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { ProgressBar } from '../../components/common/UIElements';

export function FlashcardsPlayerModal({ onClose }) {
  const { flashcards, rateFlashcard, addXP } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleRate = async (rating) => {
    // rating: 'no_sabia' | 'dude' | 'facil'
    rateFlashcard(currentCard.id, rating);
    await flashcardRepository.rateFlashcard(currentCard.id, rating);

    setIsFlipped(false);
    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
      addXP(15);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between safe-top">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Flashcards · Repetición Espaciada
            </h3>
            <span className="text-xs text-slate-400">
              Biología · Citología UNTRM
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
        {!completed && currentCard ? (
          <div>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 font-semibold mb-1">
                <span>Tarjeta {currentIndex + 1} de {flashcards.length}</span>
                <span className="text-indigo-600 font-bold">Retención: {currentCard.retentionScore}%</span>
              </div>
              <ProgressBar progress={((currentIndex + 1) / flashcards.length) * 100} height="h-2" color="bg-indigo-600" />
            </div>

            {/* Flip Flashcard View */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[300px] p-6 rounded-3xl bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 border-2 border-indigo-200/80 shadow-md flex flex-col justify-between cursor-pointer hover:border-indigo-400 transition-all select-none my-auto active:scale-[0.99]"
            >
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>{currentCard.topic}</span>
                <span className="flex items-center gap-1 text-indigo-600">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Toca para voltear</span>
                </span>
              </div>

              <div className="my-auto py-4 text-center">
                {!isFlipped ? (
                  <div>
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Pregunta</span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                      {currentCard.question}
                    </h4>
                  </div>
                ) : (
                  <div className="animate-fadeIn">
                    <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-2">Respuesta Clave</span>
                    <h4 className="text-xl sm:text-2xl font-black text-indigo-700 leading-snug mb-3">
                      {currentCard.answer}
                    </h4>
                    <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-950 text-xs leading-relaxed font-medium mb-2">
                      💡 {currentCard.mnemonic}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      🎯 {currentCard.examNote}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center text-xs text-slate-400 font-semibold">
                {!isFlipped ? '¿Recuerdas este concepto?' : 'Evalúa tu nivel de recuerdo abajo 👇'}
              </div>
            </div>
          </div>
        ) : (
          <div className="my-auto text-center py-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-4xl shadow-sm">
              🧠
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              ¡Repaso de Flashcards al día!
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed mb-6">
              El algoritmo de repetición espaciada ha programado las próximas fechas de revisión para optimizar tu memoria de largo plazo.
            </p>
          </div>
        )}

        {/* Spaced Repetition Buttons */}
        <div className="pt-4">
          {!completed ? (
            isFlipped ? (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleRate('no_sabia')}
                  className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold flex flex-col items-center gap-1 transition"
                >
                  <span className="text-sm">❌</span>
                  <span>No sabía</span>
                  <span className="text-[10px] text-rose-500 font-normal">Hoy (10m)</span>
                </button>

                <button
                  onClick={() => handleRate('dude')}
                  className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold flex flex-col items-center gap-1 transition"
                >
                  <span className="text-sm">🤔</span>
                  <span>Dudé</span>
                  <span className="text-[10px] text-amber-600 font-normal">En 1 día</span>
                </button>

                <button
                  onClick={() => handleRate('facil')}
                  className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex flex-col items-center gap-1 transition"
                >
                  <span className="text-sm">⚡</span>
                  <span>Fácil</span>
                  <span className="text-[10px] text-emerald-600 font-normal">En 3 días</span>
                </button>
              </div>
            ) : (
              <PrimaryButton onClick={() => setIsFlipped(true)} size="lg">
                Mostrar respuesta
              </PrimaryButton>
            )
          ) : (
            <PrimaryButton onClick={onClose} variant="gradient" size="lg">
              Volver al inicio
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
