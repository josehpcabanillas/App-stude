import React from 'react';
import { Home, Milestone, Brain, Zap, User } from 'lucide-react';
import { useApp } from '../../state/AppContext';

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'path', label: 'Ruta', icon: Milestone },
    { id: 'simulations', label: 'Simulacros', icon: Brain },
    { id: 'training', label: 'Entrena', icon: Zap },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] safe-bottom">
      <div className="max-w-[430px] mx-auto px-2 py-1 flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-all duration-150
                ${isActive 
                  ? 'text-indigo-600 font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
                }
              `}
            >
              <div className={`relative p-1 rounded-xl transition-colors ${isActive ? 'bg-indigo-50' : 'bg-transparent'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 leading-tight tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
