import React, { useState, useEffect } from 'react';
import { X, Clock, Flame, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../state/AppContext';
import { MINIGAMES } from '../../data/minigamesData';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';

export function OrganelleRushModal({ onClose }) {
  const { addXP, modalPayload } = useApp();
  const gameConfig = MINIGAMES.find(g => g.id === modalPayload?.gameId) || MINIGAMES[0];

  const items = React.useMemo(() => {
    if (gameConfig.pairs) {
      return gameConfig.pairs.map(p => ({
        prompt: p.prompt,
        answer: p.answer,
        options: p.options,
      }));
    }
    if (gameConfig.rounds) {
      return gameConfig.rounds.map(r => ({
        prompt: `Base complementaria de: ${r.base} (${r.hint})`,
        answer: r.complement,
        options: r.options,
      }));
    }
    return [];
  }, [gameConfig]);

  const [timeLeft, setTimeLeft] = useState(gameConfig.durationSeconds || 60);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedbackEffect, setFeedbackEffect] = useState(null); // 'correct' | 'wrong'

  const currentPair = items.length > 0 ? items[currentRoundIndex % items.length] : null;

  // Randomize options order on each round so correct answer is not always in the same position
  const shuffledOptions = React.useMemo(() => {
    if (!currentPair || !currentPair.options) return [];
    return [...currentPair.options].sort(() => Math.random() - 0.5);
  }, [currentRoundIndex, currentPair]);

  // 60-second game timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPlaying(false);
          // Milestone confetti on minigame complete!
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectOption = (option) => {
    if (!isPlaying) return;

    if (option === currentPair.answer) {
      const addedPoints = 100 * combo;
      setScore(prev => prev + addedPoints);
      setCombo(prev => Math.min(4, prev + 1));
      setCorrectCount(prev => prev + 1);
      setFeedbackEffect('correct');
    } else {
      setCombo(1);
      setWrongCount(prev => prev + 1);
      setFeedbackEffect('wrong');
    }

    setTimeout(() => {
      setFeedbackEffect(null);
      setCurrentRoundIndex(prev => prev + 1);
    }, 300);
  };

  const handleRestart = () => {
    setTimeLeft(60);
    setScore(0);
    setCombo(1);
    setCorrectCount(0);
    setWrongCount(0);
    setCurrentRoundIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between safe-top">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{gameConfig.icon || '⚡'}</span>
          <div>
            <h3 className="text-sm font-bold text-white">{gameConfig.title}</h3>
            <span className="text-xs text-indigo-300">Entrenamiento UNTRM · {gameConfig.topic}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isPlaying ? (
        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          {/* Game Stats: Timer, Score, Combo */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xl font-mono">{timeLeft}s</span>
            </div>

            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Puntaje</span>
              <div className="text-xl font-black text-white font-mono">{score}</div>
            </div>

            <div className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${combo > 1 ? 'bg-indigo-600 text-white animate-bounce' : 'bg-slate-700 text-slate-400'}`}>
              x{combo} COMBO
            </div>
          </div>

          {/* Prompt Question */}
          <div className={`my-auto p-6 rounded-3xl bg-slate-800/90 border-2 transition-all duration-200 text-center shadow-lg ${
            feedbackEffect === 'correct' ? 'border-emerald-500 bg-emerald-950/40 ring-4 ring-emerald-500/40' :
            feedbackEffect === 'wrong' ? 'border-rose-500 bg-rose-950/40 ring-4 ring-rose-500/40' : 'border-slate-700'
          }`}>
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">
              {gameConfig.shortDesc || 'Selecciona la respuesta correcta'}
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentPair ? `"${currentPair.prompt}"` : 'Cargando...'}
            </h4>
          </div>

          {/* 4 Organelle Options */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {shuffledOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className="p-4 rounded-2xl bg-indigo-950/60 hover:bg-indigo-900/90 border border-indigo-700/60 text-white font-bold text-sm text-center shadow-md active:scale-95 transition-all min-h-[56px] flex items-center justify-center cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Game Over Result Screen */
        <div className="flex-1 p-6 flex flex-col justify-between text-center animate-fadeIn">
          <div className="my-auto">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-4xl ring-4 ring-amber-500/30">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-1">
              ¡Tiempo cumplido!
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Gran entrenamiento de reflejos para el examen.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
                <div className="text-xl font-black text-amber-400">{score}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Puntaje</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
                <div className="text-xl font-black text-emerald-400">{correctCount}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Aciertos</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
                <div className="text-xl font-black text-indigo-400">+35 XP</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">XP Ganado</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg transition active:scale-[0.98]"
            >
              Jugar otra vez
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition"
            >
              Volver a Entrena
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
