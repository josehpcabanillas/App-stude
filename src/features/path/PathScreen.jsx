import React from 'react';
import { 
  Check, Lock, Star, Trophy, Sparkles, BookOpen, ChevronRight, Layers, Flame, RotateCcw 
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { TopHeader } from '../../components/layout/TopHeader';
import { ProgressBar } from '../../components/common/UIElements';
import { AITutorFab } from '../../components/ai/AITutorFab';

export function PathScreen() {
  const { 
    activeCourse, 
    setActiveModal, 
    setModalPayload 
  } = useApp();

  const handleNodeClick = (node) => {
    if (node.status === 'locked') return;

    if (node.type === 'challenge') {
      setActiveModal('minigame');
      setModalPayload({ gameId: 'organelle-rush' });
    } else {
      setActiveModal('lessonPlayer');
      setModalPayload({
        lessonId: node.lessonId,
        title: node.title,
        unitTitle: `Unidad ${node.unitId === 'u1' ? '1 · Fundamentos' : '2 · Citología'}`,
        topic: node.title,
      });
    }
  };

  const handleOpenUnits = () => {
    setActiveModal('unitSelector');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-28">
      {/* Top Header */}
      <TopHeader showGreeting={false} title="Ruta de Aprendizaje" />

      {/* Course & Unit Banner */}
      <div className="p-4 bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              BIO
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                {activeCourse.name} · UNTRM
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">
                Unidad 2: Citología (La Célula)
              </span>
            </div>
          </div>

          <button
            onClick={handleOpenUnits}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition border border-indigo-200/60"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>8 Unidades</span>
          </button>
        </div>

        {/* Course Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar progress={activeCourse.progress} height="h-2" color="bg-indigo-600" />
          </div>
          <span className="text-xs font-extrabold text-indigo-700">{activeCourse.progress}%</span>
        </div>
      </div>

      {/* Duolingo Winding Path Canvas */}
      <div className="flex-1 px-4 py-8 max-w-[430px] mx-auto w-full relative">
        {/* Section divider: UNIDAD 1 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-200/70 text-slate-700 text-xs font-extrabold uppercase tracking-wider">
            <span>Unidad 1: Fundamentos de la Vida</span>
            <span className="text-emerald-600 font-bold">✓ 100%</span>
          </div>
        </div>

        {/* Nodes Container */}
        <div className="space-y-12 relative flex flex-col items-center">
          {activeCourse.pathNodes.map((node, index) => {
            const isCompleted = node.status === 'completed' || node.status === 'perfect';
            const isActive = node.status === 'active';
            const isLocked = node.status === 'locked';
            const isReview = node.status === 'review';
            const isPerfect = node.status === 'perfect';
            const isChallenge = node.type === 'challenge';
            const isExam = node.type === 'exam';

            // Curve positioning (xOffset: -35px to +35px)
            const offsetX = node.xOffset || 0;

            return (
              <div 
                key={node.id} 
                className="flex flex-col items-center relative transition-transform duration-200"
                style={{ transform: `translateX(${offsetX}px)` }}
              >
                {/* Unit 2 Transition Banner */}
                {index === 3 && (
                  <div className="my-6 text-center transform -translate-x-0">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase tracking-wider border border-indigo-200">
                      <span>Unidad 2: Citología Eucariota</span>
                      <span className="text-indigo-600 font-bold">· En curso</span>
                    </div>
                  </div>
                )}

                {/* Node Button */}
                <div className="relative group">
                  {/* Active Pulse Glow Animation */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-40 animate-pulse-glow" />
                  )}

                  {/* Active Tooltip "Empieza aquí" / "Continuar" */}
                  {isActive && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-extrabold shadow-md animate-bounce">
                      ¡Continuar aquí!
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-indigo-600" />
                    </div>
                  )}

                  {/* Review needed dot */}
                  {isReview && (
                    <div className="absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold" title="Concepto pendiente de repaso">
                      !
                    </div>
                  )}

                  <button
                    onClick={() => handleNodeClick(node)}
                    disabled={isLocked}
                    className={`
                      relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 select-none
                      ${isActive 
                        ? 'bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-lg ring-4 ring-indigo-200 scale-110 active:scale-95 cursor-pointer' 
                        : isPerfect 
                        ? 'bg-amber-400 text-amber-950 shadow-md ring-4 ring-amber-100 cursor-pointer active:scale-95' 
                        : isCompleted 
                        ? 'bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-100 cursor-pointer active:scale-95' 
                        : isReview 
                        ? 'bg-amber-100 text-amber-700 border-2 border-amber-400 shadow-sm cursor-pointer active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                      }
                    `}
                  >
                    {isPerfect ? (
                      <Star className="w-8 h-8 fill-amber-950 text-amber-950" />
                    ) : isCompleted ? (
                      <Check className="w-8 h-8 stroke-[3px]" />
                    ) : isActive ? (
                      <Sparkles className="w-8 h-8 animate-pulse" />
                    ) : isChallenge ? (
                      <span className="text-xl">⭐</span>
                    ) : isExam ? (
                      <Trophy className="w-7 h-7" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 stroke-[2.5px]" />
                    ) : (
                      <RotateCcw className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Node Label Card */}
                <div className="mt-2 text-center max-w-[140px]">
                  <div className={`text-xs font-bold tracking-tight leading-tight ${isActive ? 'text-indigo-900 font-extrabold' : 'text-slate-700'}`}>
                    {node.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    +{node.xp} XP
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contextual AI Tutor Button */}
      <AITutorFab contextData={{ course: 'Biología', topic: 'Ruta de Aprendizaje UNTRM' }} />
    </div>
  );
}
