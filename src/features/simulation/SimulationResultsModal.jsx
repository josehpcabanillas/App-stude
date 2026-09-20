import React, { useEffect } from 'react';
import { X, Trophy, CheckCircle2, RotateCcw, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../state/AppContext';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { ProgressBar } from '../../components/common/UIElements';
import { masteryRepository } from '../../repositories/masteryRepository';

export function SimulationResultsModal({ payload, onClose }) {
  const { score, correct, wrong, unanswered, timeSpent, totalQuestions } = payload;
  const { addXP, setActiveTab } = useApp();

  useEffect(() => {
    addXP(50);
    // Milestone Confetti on simulation finished!
    try {
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.55 }
      });
    } catch (e) {}
  }, []);

  const handleUpdatePath = async () => {
    // Dynamically adjust user topic mastery: prioritizes weak topics (Genética, Metabolismo)
    await masteryRepository.recordPracticeResult('genetica', false);
    onClose();
    setActiveTab('path');
  };

  const minutesSpent = Math.max(1, Math.round(timeSpent / 60));

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between safe-top">
        <h3 className="text-base font-bold text-slate-900">
          Resultados Oficiales del Simulacro
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Score Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white text-center shadow-lg">
          <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest block mb-1">
            Puntaje Global UNTRM
          </span>
          <div className="text-5xl font-black mb-1">{score} <span className="text-xl font-normal opacity-80">/ 100</span></div>
          <div className="text-xs text-indigo-100 font-medium">
            {correct} correctas · {wrong} erradas · {unanswered} en blanco
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/20 text-xs">
            <div>
              <span className="text-indigo-200 block text-[10px] font-bold uppercase">Tiempo invertido</span>
              <span className="font-extrabold text-sm">{minutesSpent} min</span>
            </div>
            <div>
              <span className="text-indigo-200 block text-[10px] font-bold uppercase">XP Obtenido</span>
              <span className="font-extrabold text-sm">+50 XP</span>
            </div>
          </div>
        </div>

        {/* Rendimiento por Curso */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span>Rendimiento por Materia</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Biología (Ciencias de la Salud)</span>
                <span className="font-bold text-emerald-600">82%</span>
              </div>
              <ProgressBar progress={82} height="h-2" color="bg-emerald-500" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Química</span>
                <span className="font-bold text-indigo-600">64%</span>
              </div>
              <ProgressBar progress={64} height="h-2" color="bg-indigo-600" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Lenguaje y Comunicación</span>
                <span className="font-bold text-blue-600">76%</span>
              </div>
              <ProgressBar progress={76} height="h-2" color="bg-blue-500" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Razonamiento Matemático</span>
                <span className="font-bold text-amber-600">43%</span>
              </div>
              <ProgressBar progress={43} height="h-2" color="bg-amber-500" />
            </div>
          </div>
        </div>

        {/* Desempeño por Tema */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">
            Desempeño Específico por Tema
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="font-bold text-emerald-950">Citología Celular</span>
              <span className="font-extrabold text-emerald-700">87% · Dominado</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 border border-blue-100">
              <span className="font-bold text-blue-950">Ecología y Ambiente</span>
              <span className="font-extrabold text-blue-700">70% · Aceptable</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50 border border-rose-100">
              <span className="font-bold text-rose-950">Genética y Meiosis</span>
              <span className="font-extrabold text-rose-700">42% · Prioritario</span>
            </div>
          </div>
        </div>

        {/* Adaptive CTA */}
        <div className="pt-2">
          <PrimaryButton onClick={handleUpdatePath} variant="gradient" size="lg">
            Actualizar mi ruta (Priorizar temas débiles)
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
