// App.jsx — Router principal: Hub ↔ ModuleViewer ↔ AVBC
import React, { useState, Suspense, lazy } from 'react';
import { Hub } from './components/Hub.jsx';
import { ModuleViewer } from './components/ModuleViewer.jsx';
import { LectureDeck } from './components/lecture/LectureDeck.jsx';
import { AVBCDashboard } from './components/avbc/AVBCDashboard.jsx';
import { getModuleById } from './data/modules.js';

// Lazy-load dos módulos de animação
const modules = {
  M01: lazy(() => import('./modules/M01_NormalVsKC.jsx').then(m => ({ default: m.M01_NormalVsKC }))),
  M02: lazy(() => import('./modules/M02_FrVsVR.jsx').then(m => ({ default: m.M02_FrVsVR }))),
  M03: lazy(() => import('./modules/M03_ArcShortening.jsx').then(m => ({ default: m.M03_ArcShortening }))),
  M04: lazy(() => import('./modules/M04_TentEffect.jsx').then(m => ({ default: m.M04_TentEffect }))),
  M05: lazy(() => import('./modules/M05_PoissonCoupling.jsx').then(m => ({ default: m.M05_PoissonCoupling }))),
  M06: lazy(() => import('./modules/M06_VT_AxisRotation.jsx').then(m => ({ default: m.M06_VT_AxisRotation }))),
  M07: lazy(() => import('./modules/M07_Vtau_Asymmetric.jsx').then(m => ({ default: m.M07_Vtau_Asymmetric }))),
  M08: lazy(() => import('./modules/M08_VComa_Apex.jsx').then(m => ({ default: m.M08_VComa_Apex }))),
  M09: lazy(() => import('./modules/M09_PlacidoForce.jsx').then(m => ({ default: m.M09_PlacidoForce }))),
  M10: lazy(() => import('./modules/M10_KsteepVsENM.jsx').then(m => ({ default: m.M10_KsteepVsENM }))),
  M11: lazy(() => import('./modules/M11_FEM_BeforeAfter.jsx').then(m => ({ default: m.M11_FEM_BeforeAfter }))),
  M12: lazy(() => import('./modules/M12_DepthComparison.jsx').then(m => ({ default: m.M12_DepthComparison }))),
};

const vectorsByModule = {
  M01: ['Fr'],
  M02: ['Fr','VR'],
  M03: ['VR'],
  M04: ['VR','ENM'],
  M05: ['VT'],
  M06: ['VT'],
  M07: ['Vτ','VComa'],
  M08: ['VComa','Coma'],
  M09: ['VR','VT','Vτ'],
  M10: ['ENM','Coma'],
  M11: [],
  M12: ['VR'],
};

function LoadingSpinner() {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      height:'100%', gap:12,
    }}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#00B4DC" strokeWidth={2.5}
        style={{ animation:'spin 0.8s linear infinite' }}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span style={{ color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:'0.85rem' }}>
        Carregando módulo...
      </span>
    </div>
  );
}

export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [isLectureMode, setIsLectureMode] = useState(false);
  const [isAVBCMode, setIsAVBCMode] = useState(false);
  const [returnToAVBC, setReturnToAVBC] = useState(false);

  if (isLectureMode) {
    return <LectureDeck onExit={() => setIsLectureMode(false)} />;
  }

  // AVBC Dashboard — com callback para abrir módulos individuais
  if (isAVBCMode && !activeModule) {
    return (
      <AVBCDashboard
        onBack={() => { setIsAVBCMode(false); setReturnToAVBC(false); }}
        onOpenModule={(id) => { setActiveModule(id); setReturnToAVBC(true); }}
      />
    );
  }

  const module = activeModule ? getModuleById(activeModule) : null;
  const ModuleComponent = activeModule ? modules[activeModule] : null;

  if (activeModule && module && ModuleComponent) {
    return (
      <ModuleViewer
        module={module}
        onBack={() => {
          setActiveModule(null);
          // Se veio do AVBC, volta para o AVBC
          if (!returnToAVBC) setReturnToAVBC(false);
        }}
        legendVectors={vectorsByModule[activeModule] || []}
      >
        {(player) => (
          <Suspense fallback={<LoadingSpinner />}>
            <ModuleComponent scene={player.currentScene} player={player} />
          </Suspense>
        )}
      </ModuleViewer>
    );
  }

  return (
    <Hub
      onSelectModule={setActiveModule}
      onStartLecture={() => setIsLectureMode(true)}
      onStartAVBC={() => setIsAVBCMode(true)}
    />
  );
}
