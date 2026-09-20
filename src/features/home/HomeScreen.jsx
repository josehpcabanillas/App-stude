import React, { useState, useEffect } from 'react';
import { Play, Sparkles, CheckCircle2, Circle, ArrowRight, RotateCcw, Flame, Heart, BookOpen, Clock } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { TopHeader } from '../../components/layout/TopHeader';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { ProgressBar } from '../../components/common/UIElements';
import { AITutorFab } from '../../components/ai/AITutorFab';
import { masteryRepository } from '../../repositories/masteryRepository';

export function HomeScreen() {
  const { 
    user, 
    dailyProgress, 
    setActiveModal, 
    setModalPayload, 
    setActiveTab, 
    mistakesBank 
  } = useApp();

  const [studyRecommendation, setStudyRecommendation] = useState({
    badgeText: 'Continúa tu ruta',
    topic: {
      topicId: 'citologia',
      topicName: 'Célula eucariota',
      masteryScore: 65,
      unitNumber: 2,
    },
    estimatedMinutes: 5,
  });

  const [reviewCount, setReviewCount] = useState(3);

  useEffect(() => {
    async function loadMastery() {
      const rec = await masteryRepository.getWhatToStudyNow();
      if (rec) setStudyRecommendation(rec);

      const due = await masteryRepository.getTopicsDueForReview();
      if (due) setReviewCount(due.length);
    }
    loadMastery();
  }, [user.xp]);

  const handleContinueLesson = () => {
    setActiveModal('lessonPlayer');
    setModalPayload({
      lessonId: 'lesson-eucariota',
      title: studyRecommendation.topic.topicName,
      unitTitle: `Unidad ${studyRecommendation.topic.unitNumber || 2} · Citología`,
      topic: studyRecommendation.topic.topicName,
    });
  };

  const handleStartReview = () => {
    setActiveModal('recovery');
  };

  const handleStartChallenge = () => {
    setActiveModal('minigame');
    setModalPayload({ gameId: 'organelle-rush' });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-24">
      {/* Top Header */}
      <TopHeader showGreeting={true} />

      <div className="p-4 space-y-4 max-w-[430px] mx-auto w-full">
        {/* ================= HERO CARD: "¿QUÉ DEBERÍA ESTUDIAR AHORA?" ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 text-white p-5 shadow-lg shadow-indigo-600/15">
          {/* Subtle decorative circles */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-lg pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-indigo-100">
                {studyRecommendation.badgeText || '¿Qué estudiar ahora?'}
              </span>
              <div className="flex items-center gap-1 text-xs text-indigo-200 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{studyRecommendation.estimatedMinutes || 5} min</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-indigo-200 uppercase tracking-wide">
              {user.university} · Biología
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 mb-3 tracking-tight">
              {studyRecommendation.topic.topicName}
            </h2>

            {/* Topic Mastery Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-medium text-indigo-200 mb-1">
                <span>Dominio del tema (UserTopicMastery)</span>
                <span className="font-bold text-white">{studyRecommendation.topic.masteryScore}%</span>
              </div>
              <div className="w-full bg-indigo-950/40 rounded-full h-2 overflow-hidden border border-white/10">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${studyRecommendation.topic.masteryScore}%` }} 
                />
              </div>
            </div>

            <button
              onClick={handleContinueLesson}
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-indigo-700 font-bold text-base shadow-md active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-indigo-700" />
              <span>Continuar lección</span>
            </button>
          </div>
        </div>

        {/* ================= META DIARIA ================= */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Meta de hoy</h3>
              <p className="text-xs text-slate-500">
                {dailyProgress.completedCount} de {dailyProgress.totalCount} actividades completadas
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 rounded-full bg-indigo-50">
              {Math.round((dailyProgress.completedCount / dailyProgress.totalCount) * 100)}%
            </span>
          </div>

          <ProgressBar 
            progress={(dailyProgress.completedCount / dailyProgress.totalCount) * 100} 
            height="h-2" 
            color="bg-emerald-500" 
            className="mb-3.5"
          />

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-slate-50">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>1 microlección completada</span>
              </div>
              <span className="text-slate-400 font-bold">Hecho</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-slate-50">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>10 preguntas tipo UNTRM</span>
              </div>
              <span className="text-slate-400 font-bold">10/10</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-slate-50">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>5 flashcards de repetición</span>
              </div>
              <span className="text-indigo-600 font-bold">2/5</span>
            </div>
          </div>
        </div>

        {/* ================= REPASO INTELIGENTE (Spaced Repetition Trigger) ================= */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {reviewCount} conceptos necesitan repaso
              </h4>
              <p className="text-xs text-slate-500">
                Retención calculada por intervalo espaciado.
              </p>
            </div>
          </div>
          <button
            onClick={handleStartReview}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex-shrink-0 transition cursor-pointer"
          >
            Repasar
          </button>
        </div>

        {/* ================= DESAFÍO RÁPIDO ================= */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-purple-700 uppercase">Desafío rápido</span>
                <span className="text-[10px] text-slate-400">· 2 min</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Organelle Rush
              </h4>
              <p className="text-xs text-slate-500">
                Pon a prueba tus reflejos citológicos antes de que acabe el tiempo.
              </p>
            </div>
          </div>
          <button
            onClick={handleStartChallenge}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex-shrink-0 transition cursor-pointer"
          >
            Jugar
          </button>
        </div>
      </div>

      {/* Contextual AI Tutor Button */}
      <AITutorFab contextData={{ course: 'Biología', topic: 'Célula Eucariota UNTRM' }} />
    </div>
  );
}
