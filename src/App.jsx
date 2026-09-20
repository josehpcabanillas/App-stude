import React from 'react';
import { useApp, AppProvider } from './state/AppContext';
import { MobileShell } from './components/layout/MobileShell';
import { BottomNav } from './components/layout/BottomNav';
import { InstallPromptBanner } from './components/common/InstallPromptBanner';
import { AITutorDrawer } from './components/ai/AITutorDrawer';

// Screens
import { HomeScreen } from './features/home/HomeScreen';
import { PathScreen } from './features/path/PathScreen';
import { TrainingHubScreen } from './features/training/TrainingHubScreen';
import { SimulationHubScreen } from './features/simulation/SimulationHubScreen';
import { ProfileScreen } from './features/profile/ProfileScreen';

// Modals
import { OnboardingModal } from './features/onboarding/OnboardingModal';
import { UnitSelectorModal } from './features/path/UnitSelectorModal';
import { LessonPlayerModal } from './features/lesson/LessonPlayerModal';
import { FlashcardsPlayerModal } from './features/training/FlashcardsPlayerModal';
import { OrganelleRushModal } from './features/training/OrganelleRushModal';
import { SimulationExamModal } from './features/simulation/SimulationExamModal';
import { SimulationResultsModal } from './features/simulation/SimulationResultsModal';
import { HeartRecoveryModal } from './features/recovery/HeartRecoveryModal';
import { AcademicSearchModal } from './features/search/AcademicSearchModal';

function AppContent() {
  const { activeTab, activeModal, modalPayload, setActiveModal } = useApp();

  return (
    <MobileShell>
      <InstallPromptBanner />

      {/* Screen Views */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'path' && <PathScreen />}
        {activeTab === 'simulations' && <SimulationHubScreen />}
        {activeTab === 'training' && <TrainingHubScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* AI Tutor Bottom Sheet */}
      <AITutorDrawer />

      {/* Modals & Full Screen Workflows */}
      {activeModal === 'onboarding' && (
        <OnboardingModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'unitSelector' && (
        <UnitSelectorModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'lessonPlayer' && (
        <LessonPlayerModal 
          lessonData={modalPayload} 
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === 'flashcards' && (
        <FlashcardsPlayerModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'minigame' && (
        <OrganelleRushModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'simulationExam' && (
        <SimulationExamModal 
          payload={modalPayload} 
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === 'simulationResults' && (
        <SimulationResultsModal 
          payload={modalPayload} 
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === 'recovery' && (
        <HeartRecoveryModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'search' && (
        <AcademicSearchModal onClose={() => setActiveModal(null)} />
      )}
    </MobileShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
