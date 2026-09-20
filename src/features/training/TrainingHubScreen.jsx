import React from 'react';
import { 
  Zap, Brain, RotateCcw, Play, Sparkles, ChevronRight, Dna, Clock, Target, Layers 
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { TopHeader } from '../../components/layout/TopHeader';
import { MINIGAMES } from '../../data/minigamesData';
import { AITutorFab } from '../../components/ai/AITutorFab';

export function TrainingHubScreen() {
  const { 
    setActiveModal, 
    setModalPayload, 
    mistakesBank, 
    flashcards 
  } = useApp();

  const handleStartFlashcards = () => {
    setActiveModal('flashcards');
  };

  const handleStartMistakes = () => {
    setActiveModal('recovery');
  };

  const handleStartQuickQuiz = () => {
    setActiveModal('lessonPlayer');
    setModalPayload({
      lessonId: 'quiz-rapido-citologia',
      title: 'Quiz Rápido · 5 Preguntas UNTRM',
      unitTitle: 'Entrenamiento Rápido',
      topic: 'Citología y Bioelementos',
    });
  };

  const handleStartMinigame = (gameId) => {
    setActiveModal('minigame');
    setModalPayload({ gameId });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-28">
      <TopHeader showGreeting={false} title="Entrenamiento Académico" />

      <div className="p-4 space-y-4 max-w-[430px] mx-auto w-full">
        {/* Hub Description */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
              Gimnasio Preuniversitario
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Práctica diaria de alta retención
            </h3>
            <p className="text-xs text-slate-500">
              Fortalece temas débiles mediante repetición espaciada y minijuegos.
            </p>
          </div>
          <span className="text-3xl">⚡</span>
        </div>

        {/* 3 Core Modes: Quiz Rápido, Flashcards, Errores */}
        <div className="grid grid-cols-2 gap-3">
          {/* Quiz Rápido */}
          <button
            onClick={handleStartQuickQuiz}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 shadow-2xs text-left transition flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Quiz Rápido</h4>
              <p className="text-[11px] text-slate-500">5 preguntas clave</p>
            </div>
          </button>

          {/* Flashcards */}
          <button
            onClick={handleStartFlashcards}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 shadow-2xs text-left transition flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Flashcards</h4>
              <p className="text-[11px] text-slate-500">Repetición espaciada</p>
            </div>
          </button>
        </div>

        {/* Banco de Errores */}
        <button
          onClick={handleStartMistakes}
          className="w-full p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 shadow-2xs text-left transition flex items-center justify-between gap-3 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">Banco de Errores</h4>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                  {mistakesBank.length} pendientes
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Responde tus fallos para recuperar vidas y fijar conceptos.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        {/* Section: Academic Minigames */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Minijuegos Académicos</h3>
            <span className="text-xs text-indigo-600 font-semibold">4 disponibles</span>
          </div>

          <div className="space-y-2.5">
            {MINIGAMES.map((game) => (
              <div
                key={game.id}
                onClick={() => handleStartMinigame(game.id)}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 shadow-2xs flex items-center justify-between gap-3 transition cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${game.gradient} text-white flex items-center justify-center text-xl shadow-xs flex-shrink-0`}>
                    {game.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{game.title}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold">⏱️ {game.durationSeconds}s</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{game.shortDesc}</p>
                    <span className="text-[10px] font-bold text-indigo-600">+{game.baseXp} XP</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-indigo-50">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AITutorFab contextData={{ course: 'Biología', topic: 'Entrenamiento Preuniversitario' }} />
    </div>
  );
}
