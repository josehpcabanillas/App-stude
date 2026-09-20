import React from 'react';
import { Smartphone, Monitor, RotateCcw, Battery, Wifi, Signal } from 'lucide-react';
import { useApp } from '../../state/AppContext';

export function MobileShell({ children }) {
  const { viewportSettings, setViewportSettings, startOnboarding, user } = useApp();
  const { isEmulating, width } = viewportSettings;

  const currentHour = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start sm:p-4 font-sans">
      {/* Top Testing Toolbar (Fixed on desktop) */}
      <header className="w-full max-w-4xl py-2 px-4 mb-2 hidden md:flex items-center justify-between text-xs text-slate-400 bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wide">STUDE PREU · UNTRM</span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono text-[11px]">
            Estomatología · Biología MVP
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Viewport size buttons */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5">
            {[360, 390, 414, 430].map(w => (
              <button
                key={w}
                onClick={() => setViewportSettings(prev => ({ ...prev, width: w, isEmulating: true }))}
                className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                  isEmulating && width === w ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {w}px
              </button>
            ))}
          </div>

          {/* Toggle Phone Frame */}
          <button
            onClick={() => setViewportSettings(prev => ({ ...prev, isEmulating: !prev.isEmulating }))}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
              isEmulating ? 'bg-slate-800 border-slate-700 text-indigo-400' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Alternar entre marco de teléfono y pantalla completa responsive"
          >
            {isEmulating ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>{isEmulating ? 'Marco Móvil' : 'Responsivo'}</span>
          </button>

          {/* Re-run Onboarding Test Button */}
          <button
            onClick={startOnboarding}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition"
            title="Probar flujo completo de Onboarding y Diagnóstico"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Probar Onboarding</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main
        className={`
          relative transition-all duration-300 w-full overflow-hidden
          ${isEmulating 
            ? 'rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.65)] border-[8px] border-slate-800 ring-1 ring-slate-700 my-auto' 
            : 'max-w-md min-h-screen shadow-none border-none rounded-none'
          }
        `}
        style={{
          width: isEmulating ? `${width}px` : '100%',
          maxWidth: isEmulating ? `${width}px` : '430px',
          minHeight: isEmulating ? '844px' : '100vh',
          height: isEmulating ? '844px' : 'auto',
          backgroundColor: '#F8FAFC',
          color: '#0F172A',
        }}
      >
        {/* Smartphone Notch / Dynamic Island simulation */}
        {isEmulating && (
          <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none flex justify-between items-center px-6 pt-2 text-[11px] font-semibold text-slate-800 select-none">
            <span>{currentHour}</span>
            {/* Camera cutout */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto -mt-0.5"></div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        )}

        {/* Child Screen Content */}
        <div className={`h-full overflow-y-auto flex flex-col ${isEmulating ? 'pt-6' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
