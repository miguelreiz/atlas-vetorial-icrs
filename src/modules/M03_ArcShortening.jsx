// M03_ArcShortening.jsx — Arc-Shortening: mecanismo fibrilar central
import React from 'react';
const W=760, H=400, CX=W/2, CY=H/2;

export function M03_ArcShortening({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showStone = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showFiber
  // 3 -> showRing
  // 4 -> showShort
  // 5 -> showEq
  // 6 -> showResult
  const showFiber = s >= 2;
  const showRing = s >= 3;
  const showShort = s >= 4;
  const showEq = s >= 5;
  const showResult = s >= 6;

  const R=130, ringR=R*0.6;
  const fiberColor="#0B3D91";

  // Fiber path: limbo esquerdo → contorna o anel → limbo direito
  const limboL = { x: CX-R, y: CY };
  const limboR = { x: CX+R, y: CY };
  const ringTop = { x: CX, y: CY-ringR };

  // Caminho SEM anel: linha reta
  const straightPath = `M${limboL.x},${limboL.y} L${limboR.x},${limboR.y}`;

  // Caminho COM anel: curva ao redor do topo do anel
  const detourPath = `M${limboL.x},${limboL.y} Q${CX-ringR*0.7},${CY-ringR*0.5} ${ringTop.x-ringR*0.5},${ringTop.y} A${ringR},${ringR} 0 0,1 ${ringTop.x+ringR*0.5},${ringTop.y} Q${CX+ringR*0.7},${CY-ringR*0.5} ${limboR.x},${limboR.y}`;

  const straightLen = 2*R;
  const detourLen = Math.round(2*R + 2*ringR*0.9);

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: A CORDA E A PEDRA
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showStone 
            ? "Ao forçar o desvio, a corda exige mais comprimento e aumenta a tensão nos extremos." 
            : "Uma corda esticada horizontalmente."}
        </text>

        <g transform={`translate(${CX}, ${CY})`}>
          {/* Postes laterais (fixos) */}
          <rect x={-200} y={-30} width={10} height={60} fill="#555" rx={2} />
          <rect x={190} y={-30} width={10} height={60} fill="#555" rx={2} />

          {/* Pedra (Obstáculo) */}
          {showStone && (
            <g>
              <circle cx={0} cy={-20} r={50} fill="#888" stroke="#AAA" strokeWidth={3} />
              <text x={0} y={-15} textAnchor="middle" fill="#FFF" fontSize={12} fontFamily="var(--font-mono)">Pedra</text>
            </g>
          )}

          {/* Corda */}
          <path 
            d={showStone ? "M-190,0 Q-100,0 -50,-20 A50,50 0 0,1 50,-20 Q100,0 190,0" : "M-190,0 L190,0"}
            fill="none" stroke="#FFD700" strokeWidth={5} 
            style={{ transition: 'd 1s ease-in-out' }}
          />

          {/* Setas de Tensão */}
          {showStone && (
            <g opacity={1} style={{ transition: 'opacity 1s', transitionDelay: '0.5s' }}>
              <line x1={-190} y1={0} x2={-240} y2={0} stroke="#FF4444" strokeWidth={4} markerEnd="url(#res-arr)" />
              <line x1={190} y1={0} x2={240} y2={0} stroke="#FF4444" strokeWidth={4} markerEnd="url(#res-arr)" />
              <text x={-250} y={5} textAnchor="end" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Tensão ↑</text>
              <text x={250} y={5} textAnchor="start" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Tensão ↑</text>
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="arc-arr" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill={fiberColor} />
        </marker>
        <marker id="res-arr" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#FF4444" />
        </marker>
        <marker id="res-arr-green" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#00CC66" />
        </marker>
      </defs>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Córnea circular (vista top-down) */}
        <circle cx={CX} cy={CY} r={R} fill="rgba(7,24,40,0.9)" stroke="rgba(0,180,220,0.2)" strokeWidth={1.5} />

        {/* Zona óptica central */}
        <circle cx={CX} cy={CY} r={R*0.35} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} strokeDasharray="3,4" />

        {/* Fibra SEM desvio (linha reta tracejada) */}
        {showFiber && !showRing && (
          <path d={straightPath} fill="none" stroke={fiberColor} strokeWidth={2.5}
            strokeDasharray="6,4" markerEnd="url(#arc-arr)" />
        )}

        {/* Fibra SEM desvio (ghost após anel aparecer) */}
        {showRing && showFiber && (
          <path d={straightPath} fill="none" stroke={fiberColor} strokeWidth={1.5}
            strokeDasharray="4,6" opacity={0.2} />
        )}

        {/* Anel ICRS */}
        {showRing && (
          <g>
            <circle cx={CX} cy={CY} r={ringR} fill="none" stroke="#00B4DC" strokeWidth={8}
              strokeDasharray="none" opacity={0.3} />
            <circle cx={CX} cy={CY} r={ringR} fill="none" stroke="#00B4DC" strokeWidth={2} opacity={0.8} />
            <text x={CX+ringR+8} y={CY+4} fill="#00B4DC" fontSize={9} fontFamily="var(--font-mono)">ICRS (Ø5mm)</text>
          </g>
        )}

        {/* Fibra COM desvio (contorna o anel) */}
        {showShort && (
          <path d={detourPath} fill="none" stroke={fiberColor} strokeWidth={2.5}
            markerEnd="url(#arc-arr)" />
        )}

        {/* Régua de comprimento */}
        {showShort && (
          <g>
            {/* Régua ANTES */}
            <line x1={CX-R} y1={CY+50} x2={CX+R} y2={CY+50} stroke="#FF4444" strokeWidth={1.5} />
            <line x1={CX-R} y1={CY+44} x2={CX-R} y2={CY+56} stroke="#FF4444" strokeWidth={1.5} />
            <line x1={CX+R} y1={CY+44} x2={CX+R} y2={CY+56} stroke="#FF4444" strokeWidth={1.5} />
            <text x={CX} y={CY+65} textAnchor="middle" fill="#FF4444" fontSize={9} fontFamily="var(--font-mono)">L₀ = {straightLen}u (antes)</text>

            {/* Setas de tensão */}
            {showResult && (
              <g>
                <line x1={CX-R+5} y1={CY} x2={CX-R+35} y2={CY} stroke="#00CC66" strokeWidth={2} markerEnd="url(#res-arr-green)" />
                <line x1={CX+R-5} y1={CY} x2={CX+R-35} y2={CY} stroke="#00CC66" strokeWidth={2} markerEnd="url(#res-arr-green)" style={{ transform: 'scaleX(-1)', transformOrigin: `${CX}px ${CY}px` }} />
                <text x={CX} y={CY-R-18} textAnchor="middle" fill="#00CC66" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>
                  ΔT ↑ → K central ↓ (Flattening)
                </text>
              </g>
            )}
          </g>
        )}

        {/* Equação */}
        {showEq && (
          <g>
            <rect x={W-280} y={20} width={270} height={72} rx={8}
              fill="rgba(11,61,145,0.12)" stroke="rgba(11,61,145,0.4)" strokeWidth={1} />
            <text x={W-145} y={42} textAnchor="middle" fill="#A8C4F0" fontSize={9} fontFamily="var(--font-mono)">ΔL = L_ef − L₀ (L_ef &gt; L₀)</text>
            <text x={W-145} y={57} textAnchor="middle" fill="#A8C4F0" fontSize={9} fontFamily="var(--font-mono)">ΔT = k · ΔL (Lei de Hooke)</text>
            <text x={W-145} y={72} textAnchor="middle" fill="#A8C4F0" fontSize={9} fontFamily="var(--font-mono)">L_ef ≈ {detourLen}u &gt; L₀ = {straightLen}u</text>
            <text x={W-145} y={84} textAnchor="middle" fill="rgba(0,204,102,0.8)" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>→ Tensão ↑ → ΔK ↓</text>
          </g>
        )}

        {/* Limbo labels */}
        <text x={CX-R-8} y={CY+4} textAnchor="end" fill="rgba(140,170,210,0.5)" fontSize={8} fontFamily="var(--font-mono)">Limbo</text>
        <text x={CX+R+8} y={CY+4} textAnchor="start" fill="rgba(140,170,210,0.5)" fontSize={8} fontFamily="var(--font-mono)">Limbo</text>
        <text x={CX} y={20} textAnchor="middle" fill="rgba(200,220,255,0.4)" fontSize={9} fontFamily="var(--font-mono)">Vista Superior (Plano XY)</text>
      </g>
    </svg>
  );
}
