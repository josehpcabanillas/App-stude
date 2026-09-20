import React, { useState } from 'react';
import { Brain, Clock, Award, CheckCircle2, ChevronRight, Play, BookOpen, AlertCircle } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { TopHeader } from '../../components/layout/TopHeader';
import { SIMULATIONS, SIMULATION_PERIODS } from '../../data/simulationsData';
import { AITutorFab } from '../../components/ai/AITutorFab';

export function SimulationHubScreen() {
  const { setActiveModal, setModalPayload } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('2026-I');

  const filteredSimulations = SIMULATIONS.filter(s => s.period === selectedPeriod);

  const handleStartExam = (sim, mode = 'exam') => {
    setActiveModal('simulationExam');
    setModalPayload({ simulation: sim, mode });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-28">
      <TopHeader showGreeting={false} title="Simulacros Oficiales UNTRM" />

      <div className="p-4 space-y-4 max-w-[430px] mx-auto w-full">
        {/* Banner */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-700 to-blue-700 text-white shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🏛️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              Admisión UNTRM · Prospecto
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black leading-tight mb-2">
            Área A — Ciencias de la Salud
          </h3>
          <p className="text-xs text-indigo-100 leading-relaxed mb-3">
            Simula las condiciones reales de tiempo y rigor académico del examen de ingreso a Estomatología.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-indigo-200 font-semibold">
            <span>⏱️ 180 min (15 min en demo)</span>
            <span>·</span>
            <span>📝 Calificación oficial</span>
          </div>
        </div>

        {/* Period Tabs: 2026-I, 2025-II, 2025-I, 2024-II */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SIMULATION_PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`
                px-4 py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all
                ${selectedPeriod === period 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              Proceso {period}
            </button>
          ))}
        </div>

        {/* Simulations List */}
        <div className="space-y-3">
          {filteredSimulations.length > 0 ? (
            filteredSimulations.map((sim) => (
              <div
                key={sim.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      {sim.area}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sim.status === 'COMPLETADO' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {sim.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {sim.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {sim.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between py-2.5 px-3 rounded-2xl bg-slate-50 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{sim.demoDurationMinutes} min (Demo)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>{sim.demoQuestionsCount || 10} preguntas</span>
                  </div>
                  {sim.bestScore && (
                    <div className="font-bold text-emerald-600">
                      Puntaje: {sim.bestScore}
                    </div>
                  )}
                </div>

                {/* Dual Mode Buttons: Modo Examen vs Modo Práctica */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleStartExam(sim, 'exam')}
                    className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Modo Examen</span>
                  </button>

                  <button
                    onClick={() => handleStartExam(sim, 'practice')}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <Brain className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Modo Práctica</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No hay simulacros adicionales cargados para {selectedPeriod}.
            </div>
          )}
        </div>
      </div>

      <AITutorFab contextData={{ course: 'Simulacros', topic: 'Prospecto UNTRM 2026' }} />
    </div>
  );
}
