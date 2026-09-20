import React from 'react';
import { X, CheckCircle2, Lock, Sparkles, ChevronRight, BookOpen } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { ProgressBar } from '../../components/common/UIElements';

export function UnitSelectorModal({ onClose }) {
  const { activeCourse } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="flex-1" onClick={onClose} />

      <div className="bg-white rounded-t-3xl max-w-[430px] mx-auto w-full max-h-[85vh] flex flex-col shadow-2xl border-t border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {activeCourse.name} · UNTRM Estomatología
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Temario Oficial (8 Unidades)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Units List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeCourse.units.map((unit) => {
            const isCompleted = unit.status === 'completed';
            const isActive = unit.status === 'active';
            const isLocked = unit.status === 'locked';

            return (
              <div
                key={unit.id}
                className={`
                  p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3
                  ${isActive 
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm' 
                    : isCompleted 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : 'border-slate-200 bg-white opacity-80'
                  }
                `}
              >
                <div className="flex items-center gap-3.5 flex-1">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white shadow-xs' 
                        : isActive 
                        ? 'bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-100' 
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      `U${unit.number}`
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        Unidad {unit.number} · {unit.title}
                      </h4>
                      <span className="text-xs font-bold text-slate-500 ml-2">
                        {unit.progress}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                      {unit.desc}
                    </p>
                    <ProgressBar 
                      progress={unit.progress} 
                      height="h-1.5" 
                      color={isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'} 
                    />
                  </div>
                </div>

                <div className="flex items-center text-slate-400">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-500">
          Total: 8 Unidades completas alineadas al prospecto de Estomatología UNTRM.
        </div>
      </div>
    </div>
  );
}
