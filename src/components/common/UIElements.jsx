import React from 'react';
import { Heart, Flame, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export function ProgressBar({ progress = 0, height = 'h-3', color = 'bg-indigo-600', className = '' }) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div className={`w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 ${className}`}>
      <div
        className={`${height} ${color} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function TagBadge({ type = 'PRÁCTICA', label, className = '' }) {
  const styles = {
    'PREGUNTA REAL': 'bg-purple-100 text-purple-800 border-purple-200',
    'TIPO UNTRM': 'bg-blue-100 text-blue-800 border-blue-200',
    'PRÁCTICA': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'RETO': 'bg-amber-100 text-amber-800 border-amber-200',
  };

  const styleClass = styles[type] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase border ${styleClass} ${className}`}>
      {type === 'PREGUNTA REAL' && <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>}
      {label || type}
    </span>
  );
}

export function HeartCounter({ hearts = 4, maxHearts = 5, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-colors"
      title="Toca para ver o recuperar vidas"
    >
      <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
      <span className="text-sm font-bold">{hearts}/{maxHearts}</span>
    </button>
  );
}

export function StreakBadge({ streak = 12, atRisk = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
        atRisk
          ? 'bg-amber-100 border-amber-300 text-amber-800 animate-bounce'
          : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-600'
      }`}
      title="Racha de estudio continuo"
    >
      <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
      <span className="text-sm font-bold">{streak}</span>
    </button>
  );
}

export function XPBadge({ xp = 420 }) {
  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs">
      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
      <span>{xp} XP</span>
    </div>
  );
}

export function EmptyState({ icon: Icon = AlertCircle, title, description, actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-200">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-base font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 max-w-xs mb-5">{description}</p>
      {actionText && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200 animate-pulse space-y-3">
      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
      <div className="h-3 bg-slate-100 rounded w-full"></div>
    </div>
  );
}
