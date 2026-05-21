// LectureDeck.jsx — Motor de Apresentação de Tela Cheia com Treinador Automático Guiado por Voz
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LECTURE_SLIDES } from '../../data/lecture_slides.js';
import { getModuleById } from '../../data/modules.js';

// Lazy-load dos módulos de animação
const modulesMap = {
  M01: lazy(() => import('../../modules/M01_NormalVsKC.jsx').then(m => ({ default: m.M01_NormalVsKC }))),
  M02: lazy(() => import('../../modules/M02_FrVsVR.jsx').then(m => ({ default: m.M02_FrVsVR }))),
  M03: lazy(() => import('../../modules/M03_ArcShortening.jsx').then(m => ({ default: m.M03_ArcShortening }))),
  M04: lazy(() => import('../../modules/M04_TentEffect.jsx').then(m => ({ default: m.M04_TentEffect }))),
  M05: lazy(() => import('../../modules/M05_PoissonCoupling.jsx').then(m => ({ default: m.M05_PoissonCoupling }))),
  M06: lazy(() => import('../../modules/M06_VT_AxisRotation.jsx').then(m => ({ default: m.M06_VT_AxisRotation }))),
  M07: lazy(() => import('../../modules/M07_Vtau_Asymmetric.jsx').then(m => ({ default: m.M07_Vtau_Asymmetric }))),
  M08: lazy(() => import('../../modules/M08_VComa_Apex.jsx').then(m => ({ default: m.M08_VComa_Apex }))),
  M09: lazy(() => import('../../modules/M09_PlacidoForce.jsx').then(m => ({ default: m.M09_PlacidoForce }))),
  M10: lazy(() => import('../../modules/M10_KsteepVsENM.jsx').then(m => ({ default: m.M10_KsteepVsENM }))),
  M11: lazy(() => import('../../modules/M11_FEM_BeforeAfter.jsx').then(m => ({ default: m.M11_FEM_BeforeAfter }))),
  M12: lazy(() => import('../../modules/M12_DepthComparison.jsx').then(m => ({ default: m.M12_DepthComparison }))),
};

function LoadingSlide() {
  return (
    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#0A0F1E' }}>
      <div style={{ color: '#00B4DC', fontFamily: 'var(--font-mono)' }}>Carregando simulação matemática...</div>
    </div>
  );
}

// Hooks para navegação local de animações
import { useScenePlayer } from '../../hooks/useScenePlayer.js';

function InteractiveContainer({ moduleId, autoAdvance }) {
  const meta = getModuleById(moduleId);
  const AnimComponent = modulesMap[moduleId];
  
  const player = useScenePlayer(meta ? meta.scenes.length : 1, {
    autoAdvance: autoAdvance, // Integrado com o Treinador Automático
    sceneDuration: 4000,
  });

  // Tecla 'Espaço' para avançar a animação interna do slide (modo manual)
  useEffect(() => {
    if (autoAdvance) return; // Se for modo Treinador, desativa o controle manual
    
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        player.nextScene();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, autoAdvance]);

  if (!meta || !AnimComponent) return <div>Módulo não encontrado</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#040810' }}>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Suspense fallback={<LoadingSlide />}>
          <AnimComponent scene={player.currentScene} />
        </Suspense>
      </div>
      
      {/* Mini Controls para o Professor */}
      <div style={{
        padding: '12px 24px',
        background: 'rgba(8,14,30,0.9)',
        borderTop: '1px solid rgba(0,180,220,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
          {autoAdvance ? 'Modo Treinador Ativo: Animação Automática' : `Barra de Espaço para avançar simulação (${player.currentScene + 1}/${meta.scenes.length})`}
        </div>
        <div style={{ color: '#00B4DC', fontSize: '0.85rem', fontWeight: 600 }}>
          {meta.scenes[player.currentScene]}
        </div>
      </div>
    </div>
  );
}

export function LectureDeck({ onExit }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const slide = LECTURE_SLIDES[currentIdx];

  // Controle do Modo Treinador Automático (Text-to-Speech)
  useEffect(() => {
    if (!isTraining) {
      window.speechSynthesis.cancel();
      return;
    }

    window.speechSynthesis.cancel(); // Cancela o áudio anterior

    const script = slide.trainingScript;
    if (script) {
      const utterance = new SpeechSynthesisUtterance(script);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95; // Velocidade ligeiramente reduzida para clareza didática
      utterance.pitch = 1.0;
      
      // Quando o áudio termina, avança para o próximo slide
      utterance.onend = () => {
        if (currentIdx < LECTURE_SLIDES.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setIsTraining(false); // Termina o treinamento
        }
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Se não houver script, espera 5 segundos e avança
      const timer = setTimeout(() => {
        if (currentIdx < LECTURE_SLIDES.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setIsTraining(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => window.speechSynthesis.cancel();
  }, [isTraining, currentIdx, slide]);

  // Controle de teclado (Setas = troca slide)
  useEffect(() => {
    if (isTraining) return; // Bloqueia controle manual se o treinador estiver rodando
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIdx(prev => Math.min(prev + 1, LECTURE_SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIdx(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit, isTraining]);

  // Função para Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Erro ao entrar em fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const toggleTraining = () => {
    if (isTraining) {
      setIsTraining(false);
      window.speechSynthesis.cancel();
    } else {
      setIsTraining(true);
    }
  };

  // Renderizador de Layout
  const renderLayout = () => {
    if (slide.layout === 'title') {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          height: '100%', background: 'radial-gradient(ellipse at center, #0B1A3A 0%, #050A14 100%)',
          textAlign: 'center', padding: '0 10%'
        }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#00B4DC', marginBottom: 24 }} />
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, color: '#F0F4FF', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>
            {slide.title}
          </h1>
          <h2 style={{ fontSize: '2rem', color: '#00B4DC', fontWeight: 400, marginBottom: 48 }}>
            {slide.subtitle}
          </h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {slide.presenter}
          </div>
        </div>
      );
    }

    if (slide.layout === 'content') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '80px 120px' }}>
          <h2 style={{ fontSize: '3rem', color: '#F0F4FF', borderBottom: '2px solid rgba(0,180,220,0.3)', paddingBottom: '20px', marginBottom: '40px' }}>
            {slide.title}
          </h2>
          <div style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {slide.content}
          </div>
        </div>
      );
    }

    if (slide.layout === 'bullets') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '80px 120px' }}>
          <h2 style={{ fontSize: '3.5rem', color: '#F0F4FF', borderBottom: '2px solid rgba(0,180,220,0.3)', paddingBottom: '20px', marginBottom: '40px' }}>
            {slide.title}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {slide.bullets.map((bullet, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '2rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00B4DC', marginTop: '14px', marginRight: '24px', flexShrink: 0, boxShadow: '0 0 10px rgba(0,180,220,0.5)' }} />
                <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00B4DC">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (slide.layout === 'bullets_image') {
      return (
        <div style={{ display: 'flex', height: '100%' }}>
          {/* Coluna Esquerda: Bullets */}
          <div style={{ width: '50%', padding: '80px 60px 80px 100px', display: 'flex', flexDirection: 'column', background: 'rgba(10,15,30,0.95)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '3rem', color: '#F0F4FF', borderBottom: '2px solid rgba(0,180,220,0.3)', paddingBottom: '20px', marginBottom: '40px', lineHeight: 1.2 }}>
              {slide.title}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
              {slide.bullets.map((bullet, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '1.6rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00B4DC', marginTop: '10px', marginRight: '20px', flexShrink: 0, boxShadow: '0 0 10px rgba(0,180,220,0.5)' }} />
                  <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00B4DC">$1</strong>') }} />
                </li>
              ))}
            </ul>
          </div>
          
          {/* Coluna Direita: Imagem */}
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', padding: '40px' }}>
            <img src={slide.imageUrl} alt="Ilustração do Slide" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }} />
          </div>
        </div>
      );
    }

    if (slide.layout === 'interactive') {
      return (
        <div style={{ display: 'flex', height: '100%' }}>
          {/* Coluna Esquerda: Teoria */}
          <div style={{ width: '40%', padding: '60px', display: 'flex', flexDirection: 'column', background: 'rgba(10,15,30,0.95)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '2.4rem', color: '#F0F4FF', marginBottom: '40px', lineHeight: 1.2 }}>
              {slide.title}
            </h2>
            <div 
              style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}
              dangerouslySetInnerHTML={{ __html: slide.theory.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00B4DC;font-size:1.5rem;display:block;margin-top:20px;">$1</strong>') }} 
            />
          </div>
          
          {/* Coluna Direita: Motor Vetorial SVG */}
          <div style={{ width: '60%', position: 'relative' }}>
            <InteractiveContainer moduleId={slide.module} autoAdvance={isTraining} />
          </div>
        </div>
      );
    }

    if (slide.layout === 'video') {
      return (
        <div style={{ display: 'flex', height: '100%' }}>
          {/* Coluna Esquerda: Teoria */}
          <div style={{ width: '35%', padding: '60px', display: 'flex', flexDirection: 'column', background: 'rgba(10,15,30,0.95)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '2.4rem', color: '#F0F4FF', marginBottom: '40px', lineHeight: 1.2 }}>
              {slide.title}
            </h2>
            <div 
              style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}
              dangerouslySetInnerHTML={{ __html: slide.theory.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00B4DC;font-size:1.5rem;display:block;margin-top:20px;">$1</strong>') }} 
            />
          </div>
          
          {/* Coluna Direita: Player de Vídeo (MP4/WebM real) */}
          <div style={{ width: '65%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
            {slide.videoUrl ? (
              <video 
                src={slide.videoUrl} 
                controls 
                autoPlay 
                loop 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', textAlign: 'center', padding: '40px' }}>
                <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} style={{ marginBottom: 16 }}>
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                  <rect x="3" y="6" width="12" height="12" rx="2" />
                </svg>
                <br />
                Slot para Vídeo Real (MP4/WebM)<br/>
                <span style={{ fontSize: '0.8rem', color: '#00B4DC' }}>Insira o arquivo na pasta public/ e referencie em videoUrl</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return <div>Layout desconhecido</div>;
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#050A14', color: 'white',
      zIndex: 9999, overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Renderização principal do slide */}
      {renderLayout()}

      {/* Indicador de Treinamento Visível */}
      {isTraining && (
        <div style={{
          position: 'absolute', bottom: 20, right: 20,
          background: 'rgba(0, 204, 102, 0.2)', color: '#00CC66',
          border: '1px solid #00CC66', padding: '10px 20px', borderRadius: '8px',
          fontFamily: 'var(--font-mono)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <span style={{ animation: 'pulse 1.5s infinite' }}>●</span> Treinador Automático Ativo
        </div>
      )}

      {/* HUD Invisível - Controles de Apresentação no topo */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', padding: '16px 24px',
        opacity: 0, transition: 'opacity 0.3s ease',
        ':hover': { opacity: 1 } // Requer css modules ou inline-hover trick
      }}
      className="lecture-hud"
      >
        <button onClick={onExit} style={{ background: 'rgba(255,68,68,0.2)', color: '#FF4444', border: '1px solid #FF4444', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Sair da Masterclass
        </button>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={toggleTraining} 
            style={{ 
              background: isTraining ? 'rgba(255,215,0,0.2)' : 'rgba(0,204,102,0.2)', 
              color: isTraining ? '#FFD700' : '#00CC66', 
              border: `1px solid ${isTraining ? '#FFD700' : '#00CC66'}`, 
              padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            {isTraining ? 'Parar Treinador' : '▶ Ativar Treinador por Voz'}
          </button>
          
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginLeft: '10px' }}>
            Slide {currentIdx + 1} de {LECTURE_SLIDES.length}
          </span>
          <button onClick={toggleFullscreen} style={{ background: 'rgba(0,180,220,0.2)', color: '#00B4DC', border: '1px solid #00B4DC', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
            F11 (Tela Cheia)
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .lecture-hud:hover { opacity: 1 !important; }
        .lecture-hud { opacity: 0.1; }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}} />
    </div>
  );
}
