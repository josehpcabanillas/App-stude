import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export function InstallPromptBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('Para instalar en iPhone: pulsa Compartir (icono cuadrado con flecha hacia arriba) y selecciona "Agregar a pantalla de inicio".');
      setIsVisible(false);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-12 left-4 right-4 z-50 max-w-[390px] mx-auto p-3.5 rounded-2xl bg-indigo-900 text-white shadow-xl border border-indigo-700/60 flex items-center justify-between gap-3 animate-slideDown">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
          <Smartphone className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold leading-tight">Instalar Stude Preu</div>
          <p className="text-[10px] text-indigo-200">Acceso rápido y estudio sin conexión</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={handleInstall}
          className="px-3 py-1.5 rounded-xl bg-white text-indigo-900 text-xs font-bold hover:bg-slate-100 transition shadow-xs"
        >
          Instalar
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-lg text-indigo-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
