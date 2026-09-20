import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, Lightbulb, HelpCircle, BookOpen, Compass } from 'lucide-react';
import { useApp } from '../../state/AppContext';

export function AITutorFab({ contextData = null }) {
  const { openAITutorWithContext, aiTutor } = useApp();

  return (
    <button
      onClick={() => openAITutorWithContext(contextData || { course: 'Biología', topic: 'Citología UNTRM' })}
      className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/40"
      title="Preguntar al Tutor IA Preuniversitario"
    >
      <Sparkles className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: '6s' }} />
      <span className="text-xs font-bold tracking-wide">Tutor IA</span>
    </button>
  );
}

export function AITutorDrawer() {
  const { aiTutor, closeAITutor, sendAITutorMessage } = useApp();
  const [inputText, setInputText] = useState('');

  if (!aiTutor.isOpen) return null;

  const quickChips = [
    { label: 'Explícamelo fácil 💡', prompt: 'Explícamelo con analogías simples de la vida diaria.' },
    { label: '¿Por qué esta respuesta? ✅', prompt: '¿Por qué esta es la respuesta correcta y qué trampas tiene?' },
    { label: 'Ponme un ejemplo 🔬', prompt: 'Dame un ejemplo clínico aplicado a Estomatología.' },
    { label: 'Hazme otra pregunta 🎯', prompt: 'Hazme una pregunta similar tipo UNTRM para practicar.' },
    { label: 'Mnemotecnia 🧠', prompt: 'Dame una regla o mnemotecnia para memorizarlo fácilmente.' },
  ];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendAITutorMessage(inputText);
    setInputText('');
  };

  const handleChipClick = (prompt) => {
    sendAITutorMessage(prompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={closeAITutor} />

      {/* Drawer Container */}
      <div className="bg-white rounded-t-3xl max-w-[430px] mx-auto w-full max-h-[85vh] flex flex-col shadow-2xl border-t border-slate-100 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-purple-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900">Tutor IA · Stude Preu</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">UNTRM 2026</span>
              </div>
              <p className="text-xs text-slate-500">
                {aiTutor.context?.topic ? `Contexto: ${aiTutor.context.topic}` : 'Asistente académico contextual'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAITutor}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm bg-slate-50/50">
          {aiTutor.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestions Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-white">
          <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Sugerencias rápidas:</div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.prompt)}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-medium border border-slate-200/60 transition"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 safe-bottom">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregúntale a la IA sobre este tema..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-700 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
