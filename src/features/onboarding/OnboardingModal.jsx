import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Compass, Award, Stethoscope, HeartPulse, 
  Calendar, Clock, CheckCircle2, XCircle, ArrowRight, Sparkles, ChevronRight, Search 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../state/AppContext';
import { UNIVERSITIES, CAREERS, DAILY_GOALS } from '../../types/schema';
import { PrimaryButton, SecondaryButton } from '../../components/common/Buttons';
import { ProgressBar, TagBadge } from '../../components/common/UIElements';

export function OnboardingModal({ onClose }) {
  const { finishOnboarding } = useApp();

  const [step, setStep] = useState(1); // 1 to 10
  const [selectedUni, setSelectedUni] = useState('UNTRM');
  const [selectedCareer, setSelectedCareer] = useState('estomatologia');
  const [selectedGoal, setSelectedGoal] = useState('constant');
  const [examDateMode, setExamDateMode] = useState('unknown'); // 'custom' | 'unknown'
  const [examDate, setExamDate] = useState('2026-12-15');
  const [searchUniQuery, setSearchUniQuery] = useState('');
  const [searchCareerQuery, setSearchCareerQuery] = useState('');

  // Diagnostic questions state
  const [diagnosticIndex, setDiagnosticIndex] = useState(0);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState([]);
  const [diagnosticFeedback, setDiagnosticFeedback] = useState(null); // { isCorrect, selectedId, correctId, text }

  // Registration state
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    whatsapp: '',
  });

  const diagnosticQuestions = [
    {
      id: 'diag-1',
      topic: 'Citología',
      text: '¿Qué organelo celular produce la mayor cantidad neta de ATP en las células eucariotas?',
      options: [
        { id: 'A', text: 'Aparato de Golgi' },
        { id: 'B', text: 'Lisosoma primario' },
        { id: 'C', text: 'Retículo Endoplasmático' },
        { id: 'D', text: 'Mitocondria' },
      ],
      correctId: 'D',
      explanation: '¡Excelente! La mitocondria realiza la fosforilación oxidativa generando el 90% del ATP celular.'
    },
    {
      id: 'diag-2',
      topic: 'Bioelementos',
      text: '¿Cuál es el mineral esencial para la síntesis de hidroxiapatita en el esmalte de las piezas dentarias?',
      options: [
        { id: 'A', text: 'Calcio' },
        { id: 'B', text: 'Hierro' },
        { id: 'C', text: 'Potasio' },
        { id: 'D', text: 'Yodo' },
      ],
      correctId: 'A',
      explanation: '¡Correcto! El Calcio forma cristales de hidroxiapatita indispensables en Estomatología.'
    },
    {
      id: 'diag-3',
      topic: 'Genética',
      text: '¿Qué bases nitrogenadas se unen mediante 3 puentes de hidrógeno en el ADN?',
      options: [
        { id: 'A', text: 'Adenina y Timina' },
        { id: 'B', text: 'Timina y Guanina' },
        { id: 'C', text: 'Guanina y Citosina' },
        { id: 'D', text: 'Adenina y Uracilo' },
      ],
      correctId: 'C',
      explanation: '¡Exacto! G y C forman 3 puentes de hidrógeno; A y T forman solo 2.'
    }
  ];

  const handleDiagnosticSelect = (optionId) => {
    if (diagnosticFeedback) return; // Prevent double tap

    const currentQ = diagnosticQuestions[diagnosticIndex];
    const isCorrect = optionId === currentQ.correctId;

    // Normal answer feedback: only visual highlight, no confetti here
    setDiagnosticFeedback({
      isCorrect,
      selectedId: optionId,
      correctId: currentQ.correctId,
      text: isCorrect 
        ? currentQ.explanation 
        : `Casi. La respuesta correcta era ${currentQ.correctId}. ${currentQ.explanation}`
    });

    setDiagnosticAnswers(prev => [...prev, { qId: currentQ.id, isCorrect }]);
  };

  const nextDiagnosticQuestion = () => {
    setDiagnosticFeedback(null);
    if (diagnosticIndex + 1 < diagnosticQuestions.length) {
      setDiagnosticIndex(prev => prev + 1);
    } else {
      setStep(8); // Go to Diagnostic Results milestone
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleFinishRegister = (e) => {
    e?.preventDefault();
    const careerObj = CAREERS.find(c => c.id === selectedCareer);
    finishOnboarding({
      name: regData.name || 'Estudiante',
      email: regData.email,
      whatsapp: regData.whatsapp,
      university: selectedUni,
      career: careerObj?.name || 'Estomatología',
      area: careerObj?.area || 'Ciencias de la Salud',
      examDaysLeft: examDateMode === 'unknown' ? 84 : 90,
      dailyGoalMinutes: DAILY_GOALS.find(g => g.id === selectedGoal)?.minutes || 20,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[430px] mx-auto overflow-hidden animate-fadeIn">
      {/* Top Progress Bar (Steps 2 to 9) */}
      {step >= 2 && step <= 9 && (
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex items-center gap-3">
          <button 
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold"
          >
            Atrás
          </button>
          <div className="flex-1">
            <ProgressBar progress={(step / 9) * 100} height="h-2" color="bg-indigo-600" />
          </div>
          <span className="text-xs font-bold text-indigo-600 font-mono">Paso {step}/9</span>
        </div>
      )}

      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        {/* ================= STEP 1: WELCOME ================= */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-between py-6">
            <div className="text-center mt-6">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                <GraduationCap className="w-12 h-12" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-3">
                Admisión Perú · Inteligente
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                Tu ingreso empieza aquí.
              </h1>
              <p className="text-slate-500 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
                Prepárate específicamente para el examen de la universidad y carrera a la que postulas.
              </p>
            </div>

            <div className="space-y-3 mt-10">
              <PrimaryButton onClick={() => setStep(2)} variant="gradient" size="lg">
                Empezar mi preparación
              </PrimaryButton>
              <SecondaryButton onClick={() => setStep(2)}>
                Ya tengo cuenta
              </SecondaryButton>
            </div>
          </div>
        )}

        {/* ================= STEP 2: UNIVERSIDAD ================= */}
        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                ¿A qué universidad postulas?
              </h2>
              <p className="text-sm text-slate-500">
                Adaptaremos tu preparación al prospecto y temario oficial correspondiente.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchUniQuery}
                onChange={(e) => setSearchUniQuery(e.target.value)}
                placeholder="Buscar universidad..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>

            {/* Universities Grid */}
            <div className="space-y-2.5 flex-1 overflow-y-auto">
              {Object.values(UNIVERSITIES)
                .filter(u => u.name.toLowerCase().includes(searchUniQuery.toLowerCase()) || u.shortName.toLowerCase().includes(searchUniQuery.toLowerCase()))
                .map((uni) => {
                  const isSelected = selectedUni === uni.id;
                  const isAvailable = uni.status === 'ACTIVE';

                  return (
                    <button
                      key={uni.id}
                      onClick={() => isAvailable && setSelectedUni(uni.id)}
                      className={`
                        w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all
                        ${isSelected 
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                        }
                        ${!isAvailable ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          {uni.shortName.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm sm:text-base">{uni.shortName}</span>
                            {isAvailable && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                Activo MVP
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{uni.name}</p>
                        </div>
                      </div>

                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-slate-300">
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
            </div>

            <div className="pt-4 mt-auto">
              <PrimaryButton onClick={() => setStep(3)} disabled={!selectedUni}>
                Continuar
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CARRERA ================= */}
        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                ¿Qué carrera quieres estudiar?
              </h2>
              <p className="text-sm text-slate-500">
                Al elegir tu carrera, determinaremos automáticamente el área del examen y los cursos ponderados.
              </p>
            </div>

            {/* Career search */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchCareerQuery}
                onChange={(e) => setSearchCareerQuery(e.target.value)}
                placeholder="Ej. Estomatología, Medicina..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto">
              {CAREERS
                .filter(c => c.name.toLowerCase().includes(searchCareerQuery.toLowerCase()))
                .map((career) => {
                  const isSelected = selectedCareer === career.id;
                  return (
                    <button
                      key={career.id}
                      onClick={() => setSelectedCareer(career.id)}
                      className={`
                        w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all
                        ${isSelected 
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base">{career.name}</div>
                          <div className="text-xs text-indigo-600 font-semibold">
                            Área: {career.area}
                          </div>
                        </div>
                      </div>

                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-slate-300">
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
            </div>

            <div className="pt-4 mt-auto">
              <PrimaryButton onClick={() => setStep(4)} disabled={!selectedCareer}>
                Continuar
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CONFIRMACIÓN DE RUTA ================= */}
        {step === 4 && (
          <div className="flex-1 flex flex-col justify-between py-4">
            <div>
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                  Prospecto Detectado
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Confirmación de tu Ruta
                </h2>
              </div>

              <div className="bg-slate-50 border-2 border-indigo-100 rounded-3xl p-6 text-center shadow-sm space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Universidad</div>
                  <div className="text-lg font-bold text-slate-900">UNTRM · Toribio Rodríguez de Mendoza</div>
                </div>

                <div className="h-px bg-slate-200 w-3/4 mx-auto" />

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Carrera Seleccionada</div>
                  <div className="text-xl font-extrabold text-indigo-600">Estomatología (Odontología)</div>
                </div>

                <div className="h-px bg-slate-200 w-3/4 mx-auto" />

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Área de Examen</div>
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm mt-1">
                    Área A: Ciencias de la Salud
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-slate-500 mt-6 leading-relaxed">
                Prepararemos tu ruta personalizada según las ponderaciones del prospecto UNTRM, priorizando Biología y Química.
              </p>
            </div>

            <PrimaryButton onClick={() => setStep(5)} variant="gradient" size="lg">
              Continuar con esta ruta
            </PrimaryButton>
          </div>
        )}

        {/* ================= STEP 5: FECHA DEL EXAMEN ================= */}
        {step === 5 && (
          <div className="flex-1 flex flex-col justify-between py-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                ¿Cuándo es tu examen de admisión?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Calcularemos tu ritmo diario para cubrir todo el temario a tiempo.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setExamDateMode('unknown')}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition ${
                    examDateMode === 'unknown' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Todavía no lo sé</div>
                      <div className="text-xs text-slate-500">Usaremos la fecha estimada del próximo proceso UNTRM</div>
                    </div>
                  </div>
                  {examDateMode === 'unknown' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                </button>

                <button
                  onClick={() => setExamDateMode('custom')}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition ${
                    examDateMode === 'custom' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-bold text-slate-800 text-sm">Seleccionar fecha fija</div>
                      <div className="text-xs text-slate-500">Tengo una fecha de examen programada</div>
                    </div>
                  </div>
                  {examDateMode === 'custom' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                </button>

                {examDateMode === 'custom' && (
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-indigo-600"
                  />
                )}
              </div>

              {/* Dynamic countdown preview */}
              <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  84
                </div>
                <div>
                  <div className="text-sm font-bold text-amber-900">
                    Faltan aproximadamente 84 días
                  </div>
                  <div className="text-xs text-amber-700">
                    Tiempo perfecto para dominar las 8 unidades de Biología.
                  </div>
                </div>
              </div>
            </div>

            <PrimaryButton onClick={() => setStep(6)}>
              Continuar
            </PrimaryButton>
          </div>
        )}

        {/* ================= STEP 6: OBJETIVO DIARIO ================= */}
        {step === 6 && (
          <div className="flex-1 flex flex-col justify-between py-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                ¿Cuánto tiempo quieres estudiar al día?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Construye un hábito diario sostenible. Puedes cambiarlo cuando quieras.
              </p>

              <div className="space-y-3">
                {DAILY_GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`
                        w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition
                        ${isSelected 
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          {goal.minutes}'
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{goal.minutes} min — {goal.label}</span>
                            {goal.recommended && (
                              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                                Recomendado
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{goal.desc}</p>
                        </div>
                      </div>

                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-slate-300">
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <PrimaryButton onClick={() => setStep(7)}>
              Continuar
            </PrimaryButton>
          </div>
        )}

        {/* ================= STEP 7: INTRO DIAGNÓSTICO ================= */}
        {step === 7 && (
          <div className="flex-1 flex flex-col justify-between py-6 text-center">
            <div className="my-auto">
              <div className="w-20 h-20 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Veamos desde dónde empezamos.
              </h2>
              <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed mb-6">
                Responde algunas preguntas rápidas. No afecta ninguna nota ni te resta vidas. Nos ayuda a calibrar tu nivel inicial.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <span>⏱️ Toma menos de 2 minutos</span>
              </div>
            </div>

            <PrimaryButton onClick={() => { setDiagnosticIndex(0); setStep(7.5); }} variant="gradient" size="lg">
              Empezar diagnóstico
            </PrimaryButton>
          </div>
        )}

        {/* ================= STEP 7.5: DIAGNÓSTICO EN VIVO (Duolingo Style) ================= */}
        {step === 7.5 && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <TagBadge type="TIPO UNTRM" label={`Diagnóstico · Biología (${diagnosticIndex + 1}/${diagnosticQuestions.length})`} />
                <span className="text-xs text-slate-400 font-semibold">{diagnosticQuestions[diagnosticIndex].topic}</span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
                {diagnosticQuestions[diagnosticIndex].text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {diagnosticQuestions[diagnosticIndex].options.map((option) => {
                  let buttonStyle = 'border-slate-200 hover:border-indigo-200 bg-white text-slate-800';

                  if (diagnosticFeedback) {
                    if (option.id === diagnosticFeedback.correctId) {
                      buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/40';
                    } else if (option.id === diagnosticFeedback.selectedId && !diagnosticFeedback.isCorrect) {
                      buttonStyle = 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-400/40';
                    } else {
                      buttonStyle = 'border-slate-200 opacity-50 bg-slate-50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleDiagnosticSelect(option.id)}
                      disabled={diagnosticFeedback !== null}
                      className={`
                        w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between text-base transition-all
                        active:scale-[0.99] ${buttonStyle}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-700">
                          {option.id}
                        </span>
                        <span>{option.text}</span>
                      </div>

                      {diagnosticFeedback && option.id === diagnosticFeedback.correctId && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 animate-bounce" />
                      )}
                      {diagnosticFeedback && option.id === diagnosticFeedback.selectedId && !diagnosticFeedback.isCorrect && (
                        <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instant Bottom Feedback Sheet */}
            {diagnosticFeedback && (
              <div className={`p-4 rounded-3xl mt-4 border animate-slideUp ${
                diagnosticFeedback.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="flex items-center gap-2 font-bold text-base mb-1">
                  {diagnosticFeedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>¡Correcto!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Casi...</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm mb-3 leading-relaxed opacity-90">
                  {diagnosticFeedback.text}
                </p>
                <PrimaryButton 
                  onClick={nextDiagnosticQuestion}
                  variant={diagnosticFeedback.isCorrect ? 'success' : 'primary'}
                  size="md"
                >
                  Continuar
                </PrimaryButton>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 8: RESULTADO DEL DIAGNÓSTICO ================= */}
        {step === 8 && (
          <div className="flex-1 flex flex-col justify-between py-4">
            <div>
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                  Diagnóstico Completado
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-1">
                  Tu ruta está lista.
                </h2>
                <p className="text-xs text-slate-500">
                  Adaptaremos tu ruta mientras sigues aprendiendo.
                </p>
              </div>

              {/* Big Score Dial */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center mb-5">
                <div className="text-4xl font-extrabold text-indigo-600 tracking-tight">42%</div>
                <div className="text-xs font-semibold text-slate-400 uppercase mt-1">Preparación Inicial Estimada</div>
                <div className="w-48 mx-auto mt-3">
                  <ProgressBar progress={42} height="h-2.5" color="bg-indigo-600" />
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="text-xs font-bold text-emerald-800 uppercase mb-2">💪 Fortalezas</div>
                  <ul className="text-xs text-emerald-900 font-medium space-y-1">
                    <li>✓ Citología</li>
                    <li>✓ Bioelementos</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="text-xs font-bold text-amber-800 uppercase mb-2">🎯 Por Reforzar</div>
                  <ul className="text-xs text-amber-900 font-medium space-y-1">
                    <li>○ Genética</li>
                    <li>○ Metabolismo</li>
                  </ul>
                </div>
              </div>
            </div>

            <PrimaryButton onClick={() => setStep(9)} variant="gradient" size="lg">
              Crear mi cuenta y guardar progreso
            </PrimaryButton>
          </div>
        )}

        {/* ================= STEP 9: REGISTRO SIMPLE ================= */}
        {step === 9 && (
          <form onSubmit={handleFinishRegister} className="flex-1 flex flex-col justify-between py-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                Crea tu cuenta
              </h2>
              <p className="text-sm text-slate-500 mb-5">
                Guarda tu racha, XP y el temario calibrado para UNTRM.
              </p>

              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                    placeholder="Ej. Andrea Morales"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                    placeholder="andrea@gmail.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp (opcional para recordatorios de racha)</label>
                  <input
                    type="tel"
                    value={regData.whatsapp}
                    onChange={(e) => setRegData({ ...regData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                    placeholder="987654321"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <PrimaryButton type="submit" variant="gradient" size="lg">
                Guardar mi progreso y entrar
              </PrimaryButton>
              <p className="text-[11px] text-center text-slate-400">
                Al continuar aceptas los términos de estudio preuniversitario de Stude.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
