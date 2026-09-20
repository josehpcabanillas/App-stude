import React from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../../state/AppContext';

export function AITutorFab({ contextData = null }) {
  const { openAITutorWithContext } = useApp();

  return (
    <button
      onClick={() => openAITutorWithContext(contextData || { course: 'Biología', topic: 'Citología UNTRM' })}
      className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/40 cursor-pointer"
      title="Preguntar al Tutor IA Preuniversitario"
    >
      <Sparkles className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: '6s' }} />
      <span className="text-xs font-bold tracking-wide">Tutor IA</span>
    </button>
  );
}
