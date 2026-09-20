import React from 'react';
import { Search, Flame, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { StreakBadge, HeartCounter, XPBadge } from '../common/UIElements';

export function TopHeader({ showGreeting = true, title = null, showStats = true }) {
  const { user, setActiveModal, setModalPayload } = useApp();

  const handleHeartsClick = () => {
    setActiveModal('recovery');
  };

  const handleSearchClick = () => {
    setActiveModal('search');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 safe-top">
      <div className="flex items-center justify-between gap-2 max-w-[430px] mx-auto">
        {/* Left: Greeting or Screen Title */}
        <div className="flex items-center gap-2">
          {showGreeting ? (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {user.university} · {user.career}
              </div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Hola, {user.name}</span>
                <span className="text-xl">👋</span>
              </h1>
            </div>
          ) : (
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
          )}
        </div>

        {/* Right: Gamification Badges (Streak, Hearts, Search) */}
        {showStats && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Buscar lecciones o preguntas"
            >
              <Search className="w-4 h-4" />
            </button>
            <StreakBadge streak={user.streak} atRisk={user.streakAtRisk} />
            <HeartCounter hearts={user.hearts} maxHearts={user.maxHearts} onClick={handleHeartsClick} />
          </div>
        )}
      </div>
    </header>
  );
}
