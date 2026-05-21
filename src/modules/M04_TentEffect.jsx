// M04_TentEffect.jsx — Renderização Biomecânica Híbrida de Alta Precisão (Vetor Endotelial)
import React from 'react';
const W=760, H=400;

export function M04_TentEffect({ scene: s }) {
  // Novo mapeamento de cenas sem analogia:
  // 0 -> Base + Marcação
  // 1 -> Anel Inserido
  // 2 -> Tensão Fibrilar (Arc-Shortening)
  // 3 -> Seta V_End (Tensão resultante)
  // 4 -> Aplainamento Anterior
  // 5 -> Contrabalanço PIO
  
  const showBase = true;
  const showRing = s >= 1;
  const showTension = s >= 2;
  const showVEndArrow = s >= 3;
  const showVEndSurf = s >= 4;
  const showIOP = s >= 5;

  const CX = W/2;
  const cornTop = 60;
  const cornBot = H - 70;
  const cornH = cornBot - cornTop;
  const cornW = 200;
  
  // Calibração Híbrida: O anel no render 3D geralmente fica próximo ao centro inferior.
  const ringY = cornTop + cornH * 0.75; 
  const CY = H/2 + 20;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%', backgroundColor: '#050a14', borderRadius: '12px', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }}>
      <defs>
        {/* Glow Filters para alta precisão vetorial */}
        <filter id="neon-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="neon-green" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="neon-orange" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <marker id="pio-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#FFFFFF" />
        </marker>
        <marker id="vend-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#00FF88" />
        </marker>
        
        <radialGradient id="iop-wave" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,180,220,0.1)" />
          <stop offset="50%" stopColor="rgba(0,180,220,0.8)" />
          <stop offset="100%" stopColor="rgba(0,180,220,0.1)" />
        </linearGradient>
      </defs>

      {/* CENA DA CÓRNEA: BACKGROUND HISTOLÓGICO 3D (Renderização Híbrida) */}
      <g>
        <image href="/vetor_endotelial_histologico_3d.png" x="0" y="-80" width={W} height={H+160} preserveAspectRatio="xMidYMid slice" opacity={0.9} />

        {/* Overlay Escurecedor nas bordas (Vignette para focar o centro e vetores) */}
        <rect x="0" y="0" width={W} height={H} fill="url(#iop-wave)" opacity={0.1} />
        
        {/* Grids Matemáticos Suis */}
        <g opacity={0.15}>
          {Array.from({length: 10}).map((_, i) => (
             <line key={i} x1={CX - 150} y1={cornTop + i*25} x2={CX + 150} y2={cornTop + i*25} stroke="#00B4DC" strokeWidth={0.5} strokeDasharray="2,4" />
          ))}
        </g>

        {/* PAINEL PRINCIPAL — HUD VETORIAL (Z-Index 1) */}
        <g>
          {/* Base: Linha de Profundidade 72% */}
          {s === 0 && (
            <g opacity={1} style={{ transition: 'opacity 0.5s' }}>
              <line x1={CX-cornW*0.8} y1={ringY} x2={CX+cornW*0.8} y2={ringY} stroke="#00B4DC" strokeWidth={1} strokeDasharray="4,4" filter="url(#neon-cyan)" />
              <text x={CX+cornW*0.85} y={ringY+4} fill="#00B4DC" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700} filter="url(#neon-cyan)">Canal a 72%</text>
            </g>
          )}

          {/* Anel — Policarbonato / PMMA Render (Wireframe + Gradient) */}
          {showRing && (
            <g style={{ transition: 'opacity 0.5s' }}>
              <ellipse cx={CX} cy={ringY} rx={cornW*0.45} ry={14} fill="url(#ring-gradient)" stroke="#00B4DC" strokeWidth={2} filter="url(#neon-cyan)" opacity={0.9} />
              <ellipse cx={CX} cy={ringY} rx={cornW*0.45} ry={14} fill="none" stroke="#FFFFFF" strokeWidth={0.5} opacity={0.5} />
              <text x={CX+cornW*0.85} y={ringY+4} fill="#00B4DC" fontSize={11} fontFamily="var(--font-mono)" filter="url(#neon-cyan)">Corpo do ICRS</text>
            </g>
          )}

          {/* Fibras tensionadas (Arc-Shortening HUD) */}
          {showTension && (
            <g style={{ transition: 'opacity 0.5s' }}>
              {[0,1,2,3].map(i => {
                const y = ringY - 18 - i*8;
                return (
                  <path key={i}
                    d={`M${CX-cornW*0.48},${y} Q${CX},${y-25} ${CX+cornW*0.48},${y}`}
                    fill="none" stroke={`rgba(255,100,0,${1 - i*0.2})`} strokeWidth={2.5}
                    filter="url(#neon-orange)"
                  />
                );
              })}
              <text x={CX-cornW*0.95} y={ringY-40} fill="#FF6600" fontSize={11} fontFamily="var(--font-mono)" fontWeight={700} filter="url(#neon-orange)">Tração Fibrilar</text>
              <text x={CX-cornW*0.95} y={ringY-25} fill="#FF6600" fontSize={9} fontFamily="var(--font-mono)" opacity={0.8}>(Arc-Shortening)</text>
            </g>
          )}

          {/* Vetor Endotelial (V_End puxando para baixo) */}
          {showVEndArrow && (
            <g style={{ transition: 'opacity 0.5s' }}>
              {/* Seta descendente V_End */}
              <line x1={CX} y1={ringY-75} x2={CX} y2={ringY-25} stroke="#00FF88" strokeWidth={5} markerEnd="url(#vend-arr)" filter="url(#neon-green)">
                <animate attributeName="y2" values={`${ringY-35};${ringY-20};${ringY-35}`} dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="y1" values={`${ringY-85};${ringY-70};${ringY-85}`} dur="1.5s" repeatCount="indefinite" />
              </line>
              <text x={CX+25} y={ringY-45} fill="#00FF88" fontSize={14} fontFamily="var(--font-mono)" fontWeight={700} filter="url(#neon-green)">
                V_End (Vetor Endotelial)
              </text>
            </g>
          )}

          {/* Superfície Anterior Aplainada */}
          {showVEndSurf && (
            <g style={{ transition: 'opacity 0.5s' }}>
              <line x1={CX-cornW*0.7} y1={cornTop+20} x2={CX+cornW*0.7} y2={cornTop+20} stroke="#00FF88" strokeWidth={3} filter="url(#neon-green)" opacity={0.8} />
              <path d={`M${CX-cornW*0.7},${cornTop+15} Q${CX},${cornTop+25} ${CX+cornW*0.7},${cornTop+15}`} fill="none" stroke="#00FF88" strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
              <text x={CX-cornW*0.95} y={cornTop+15} fill="#00FF88" fontSize={11} fontFamily="var(--font-mono)" fontWeight={700} filter="url(#neon-green)">Aplainamento Real</text>
              <text x={CX-cornW*0.95} y={cornTop+30} fill="#00FF88" fontSize={9} fontFamily="var(--font-mono)" opacity={0.8}>Tenting = 0</text>
            </g>
          )}

          {/* PIO (Branca, combatendo o V_End) */}
          {showIOP && (
            <g style={{ transition: 'opacity 0.5s' }}>
              {/* Setas pulsantes PIO */}
              {[-1.5, -0.5, 0.5, 1.5].map(i => (
                <line key={i}
                  x1={CX+i*40} y1={cornBot+30}
                  x2={CX+i*40} y2={cornBot-10}
                  stroke="#FFFFFF" markerEnd="url(#pio-arr)" strokeWidth={2.5}>
                  <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="y2" values={`${cornBot-10};${cornBot-25};${cornBot-10}`} dur="2s" repeatCount="indefinite" />
                </line>
              ))}
              <text x={CX} y={cornBot+45} textAnchor="middle" fill="#FFFFFF" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700} style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
                Força PIO Bloqueada
              </text>
            </g>
          )}
        </g>
      </g>
    </svg>
  );
}
