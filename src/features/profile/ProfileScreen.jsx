import React, { useState } from 'react';
import { 
  Award, Flame, Sparkles, BookOpen, Clock, Trophy, ChevronRight, CheckCircle2, Shield, User, Heart 
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { TopHeader } from '../../components/layout/TopHeader';
import { AVATARS, RANKS } from '../../types/schema';
import { ProgressBar } from '../../components/common/UIElements';

export function ProfileScreen() {
  const { user, setUser, addXP } = useApp();
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'leagues' | 'achievements'
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [rankingTab, setRankingTab] = useState('estomatologia'); // 'liga' | 'untrm' | 'estomatologia'

  const currentAvatar = AVATARS.find(a => a.id === user.avatar) || AVATARS[0];
  const currentRank = RANKS.find(r => r.name === user.rank) || RANKS[2];

  const handleSelectAvatar = (avatarId) => {
    setUser(prev => ({ ...prev, avatar: avatarId }));
    setShowAvatarPicker(false);
  };

  // Mock weekly league table
  const leagueUsers = [
    { rank: 1, name: 'Rodrigo P.', xp: 620, avatar: '🦊', badge: 'Chachapoyas', status: 'ascenso' },
    { rank: 2, name: 'Andrea (Tú)', xp: user.xp, avatar: currentAvatar.emoji, badge: 'UNTRM', isUser: true, status: 'ascenso' },
    { rank: 3, name: 'Camila S.', xp: 390, avatar: '🦉', badge: 'Estomatología', status: 'ascenso' },
    { rank: 4, name: 'Mateo V.', xp: 340, avatar: '🦅', badge: 'Medicina', status: 'segura' },
    { rank: 5, name: 'Lucía M.', xp: 290, avatar: '🔬', badge: 'UNTRM', status: 'segura' },
    { rank: 6, name: 'Gabriel T.', xp: 180, avatar: '🐯', badge: 'Salud', status: 'descenso' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-28">
      <TopHeader showGreeting={false} title="Mi Perfil Académico" />

      <div className="p-4 space-y-4 max-w-[430px] mx-auto w-full">
        {/* Profile Card */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="relative group"
              title="Cambiar avatar"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${currentAvatar.bg} text-white flex items-center justify-center text-3xl shadow-sm ring-4 ring-indigo-50`}>
                {currentAvatar.emoji}
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 bg-white border border-slate-200 rounded-full text-[10px] shadow-xs">
                ✏️
              </span>
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {user.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                  Nivel {user.level} · {user.rank}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Postulante a {user.career} · {user.university}
              </p>
              <div className="text-[11px] font-semibold text-indigo-600 mt-1">
                Faltan {user.examDaysLeft} días para el examen
              </div>
            </div>
          </div>

          {/* XP & Level Progress */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-500">Progreso a Cachimbo</span>
              <span className="font-bold text-indigo-600">{user.xp} / 800 XP</span>
            </div>
            <ProgressBar progress={(user.xp / 800) * 100} height="h-2" color="bg-indigo-600" />
          </div>
        </div>

        {/* Avatar Picker Drawer */}
        {showAvatarPicker && (
          <div className="p-4 rounded-3xl bg-white border-2 border-indigo-100 shadow-md animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Elige tu Avatar Preuniversitario
              </h4>
              <button
                onClick={() => setShowAvatarPicker(false)}
                className="text-xs text-slate-400 font-bold hover:text-slate-600"
              >
                Cerrar
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => handleSelectAvatar(av.id)}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1 border-2 transition ${
                    user.avatar === av.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                    {av.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex rounded-2xl bg-slate-200/70 p-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 rounded-xl transition ${activeTab === 'stats' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Estadísticas
          </button>
          <button
            onClick={() => setActiveTab('leagues')}
            className={`flex-1 py-2 rounded-xl transition ${activeTab === 'leagues' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Liga Semanal
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 rounded-xl transition ${activeTab === 'achievements' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Logros (5)
          </button>
        </div>

        {/* Tab 1: Stats */}
        {activeTab === 'stats' && (
          <div className="space-y-3">
            {/* General Syllabus Progress */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700">Preparación General del Temario</span>
                <span className="text-sm font-black text-indigo-600">62%</span>
              </div>
              <ProgressBar progress={62} height="h-2.5" color="bg-emerald-500" />
              <p className="text-[11px] text-slate-400 mt-2">
                Basado en tu dominio acumulado de las 8 unidades de Biología para UNTRM.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 text-orange-500 font-bold mb-1">
                  <Flame className="w-4 h-4" />
                  <span>Racha Activa</span>
                </div>
                <div className="text-2xl font-black text-slate-900">{user.streak} días</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>XP Acumulado</span>
                </div>
                <div className="text-2xl font-black text-slate-900">{user.xp} XP</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Precisión Media</span>
                </div>
                <div className="text-2xl font-black text-slate-900">84%</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Horas Estudiadas</span>
                </div>
                <div className="text-2xl font-black text-slate-900">14.5 h</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Weekly Leagues */}
        {activeTab === 'leagues' && (
          <div className="space-y-3">
            {/* League Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-bold flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🥇</span>
                <div>
                  <h4 className="text-base font-black">Liga Oro Preuniversitaria</h4>
                  <span className="text-xs font-semibold opacity-90">Termina en 2 días · Top 3 asciende a Diamante</span>
                </div>
              </div>
            </div>

            {/* Ranking Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setRankingTab('estomatologia')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  rankingTab === 'estomatologia' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                Estomatología
              </button>
              <button
                onClick={() => setRankingTab('untrm')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  rankingTab === 'untrm' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                UNTRM General
              </button>
              <button
                onClick={() => setRankingTab('liga')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  rankingTab === 'liga' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                Toda la Liga
              </button>
            </div>

            {/* Leaderboard Table */}
            <div className="rounded-2xl bg-white border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
              {leagueUsers.map((item) => (
                <div
                  key={item.rank}
                  className={`p-3 flex items-center justify-between text-xs transition ${
                    item.isUser ? 'bg-indigo-50/70 font-bold text-indigo-950' : 'text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-black ${
                      item.rank === 1 ? 'text-amber-500 text-sm' : item.rank === 2 ? 'text-slate-400 font-bold' : item.rank === 3 ? 'text-amber-700' : 'text-slate-400'
                    }`}>
                      {item.rank}
                    </span>
                    <span className="text-xl">{item.avatar}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.isUser && (
                          <span className="px-1.5 py-0.2 rounded-md bg-indigo-600 text-white text-[9px]">TÚ</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">{item.badge}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{item.xp} XP</span>
                    {item.status === 'ascenso' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Zona de ascenso a Diamante" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Zona de ascenso</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300" /> Zona segura</span>
            </div>
          </div>
        )}

        {/* Tab 3: Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div className="flex-1">
                <div className="font-bold text-xs text-slate-900">7 Días de Racha Imparable</div>
                <div className="text-[11px] text-slate-500">Completado · ¡Hábito consolidado!</div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <span className="text-2xl">🧬</span>
              <div className="flex-1">
                <div className="font-bold text-xs text-slate-900">Maestro de Citología</div>
                <div className="text-[11px] text-slate-500">Completado · Domina organelos celulares</div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                <div className="font-bold text-xs text-slate-900">100 Preguntas Reales UNTRM</div>
                <div className="text-[11px] text-slate-500">Progreso: 84 / 100 respondidas</div>
              </div>
              <span className="text-xs font-bold text-indigo-600">84%</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div className="flex-1">
                <div className="font-bold text-xs text-slate-900">Primer Simulacro Oficial</div>
                <div className="text-[11px] text-slate-500">Completado · Calificación registrada</div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
