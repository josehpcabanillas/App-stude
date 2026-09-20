import React, { useState } from 'react';
import { X, Search, BookOpen, Brain, Zap, HelpCircle, ChevronRight } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { QUESTIONS_BANK } from '../../data/questionsBank';
import { CELL_ORGANELLES } from '../../data/biologyCourse';
import { INITIAL_FLASHCARDS } from '../../data/flashcardsData';

export function AcademicSearchModal({ onClose }) {
  const { setActiveModal, setModalPayload } = useApp();
  const [query, setQuery] = useState('');

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchedQuestions = cleanQuery
    ? QUESTIONS_BANK.filter(q => q.question.toLowerCase().includes(cleanQuery) || q.topic.toLowerCase().includes(cleanQuery))
    : [];

  const matchedOrganelles = cleanQuery
    ? CELL_ORGANELLES.filter(o => o.name.toLowerCase().includes(cleanQuery) || o.functionDesc.toLowerCase().includes(cleanQuery))
    : [];

  const matchedFlashcards = cleanQuery
    ? INITIAL_FLASHCARDS.filter(f => f.question.toLowerCase().includes(cleanQuery) || f.answer.toLowerCase().includes(cleanQuery))
    : [];

  const hasResults = matchedQuestions.length > 0 || matchedOrganelles.length > 0 || matchedFlashcards.length > 0;

  const handleOpenLesson = () => {
    onClose();
    setActiveModal('lessonPlayer');
    setModalPayload({
      lessonId: 'lesson-eucariota',
      title: 'Citología y Célula Eucariota',
      unitTitle: 'Unidad 2',
      topic: 'Citología',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 safe-top">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar concepto (ej. ATP, Mitocondria, Calcio)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
          />
        </div>
        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-500 hover:text-slate-800"
        >
          Cerrar
        </button>
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!cleanQuery ? (
          <div className="text-center py-12 text-slate-400">
            <Search className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <h4 className="text-sm font-bold text-slate-700">Buscador Académico UNTRM</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Escribe un tema de Biología para encontrar lecciones, preguntas de examen y flashcards al instante.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {['Mitocondria', 'ATP', 'Calcio', 'Lisosoma', 'Procariota'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs text-slate-600 font-medium transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : !hasResults ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">No encontramos resultados para "{query}".</p>
            <span className="text-xs mt-1 block">Prueba con términos como "célula", "Golgi" o "bioelementos".</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Infographics / Concepts */}
            {matchedOrganelles.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                  Infografías y Estructuras ({matchedOrganelles.length})
                </span>
                <div className="space-y-2">
                  {matchedOrganelles.map(org => (
                    <div
                      key={org.id}
                      onClick={handleOpenLesson}
                      className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{org.icon}</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900">{org.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{org.functionDesc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions Bank */}
            {matchedQuestions.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                  Preguntas de Examen ({matchedQuestions.length})
                </span>
                <div className="space-y-2">
                  {matchedQuestions.map(q => (
                    <div
                      key={q.id}
                      onClick={handleOpenLesson}
                      className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex-1 pr-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {q.tagType}
                        </span>
                        <div className="font-semibold text-xs text-slate-900 mt-1 line-clamp-2">
                          {q.question}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Flashcards */}
            {matchedFlashcards.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                  Flashcards ({matchedFlashcards.length})
                </span>
                <div className="space-y-2">
                  {matchedFlashcards.map(fc => (
                    <div
                      key={fc.id}
                      onClick={() => { onClose(); setActiveModal('flashcards'); }}
                      className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 flex items-center justify-between cursor-pointer transition"
                    >
                      <div>
                        <div className="font-semibold text-xs text-slate-900">{fc.question}</div>
                        <div className="text-[11px] font-bold text-indigo-600 mt-0.5">Resp: {fc.answer}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
