// M02_FrVsVR.jsx — Fr (Força Patológica) vs VR (Vetor Radial Fibrilar)
import React from 'react';

const W = 760, H = 400;

export function M02_FrVsVR({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showAnalogyFix = false;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> Fr PIO
  // 3 -> Fr Label
  // 4 -> Ring
  // 5 -> VR
  // 6 -> Oppose
  // 7 -> Warning
  const showFr = s >= 2;
  const showFrLabel = s >= 3;
  const showRing = s >= 4;
  const showVR = s >= 5;
  const showOppose = s >= 6;
  const showWarning = s >= 7;

  const CX = W / 2, cornTop = 60, cornBot = H - 80;
  const cornH = cornBot - cornTop;
  const layerY = [cornTop, cornTop+cornH*0.1, cornTop+cornH*0.14, cornTop+cornH*0.4, cornTop+cornH*0.95, cornBot];
  const layerColors = ['#1A3A5C','#0E2A45','#0B2040','#071828','#040E18'];
  const ringY = cornTop + cornH * 0.72;
  const cornW = 180;

  // Render da Analogia da Lona / Telhado
  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: A LONA CEDENDO
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showAnalogyFix 
            ? "O tratamento atua a 90°: esticando as bordas (VR) a lona aplaina."
            : "Você não conserta uma lona deformada pela pressão empurrando diretamente contra a falha (Fr)."}
        </text>

        <g transform={`translate(${W/2}, ${H/2 + 30})`}>
          {/* Postes da lona */}
          <rect x={-200} y={-50} width={10} height={100} fill="#555" />
          <rect x={190} y={-50} width={10} height={100} fill="#555" />

          {/* Lona */}
          <path 
            d={showAnalogyFix ? "M-190,-50 Q0,-50 190,-50" : "M-190,-50 Q0,80 190,-50"} 
            fill="none" stroke="#00B4DC" strokeWidth={6} 
            style={{ transition: 'd 1s ease-in-out' }} 
          />

          {/* Pressão / Peso */}
          <circle cx={0} cy={showAnalogyFix ? -50 : 35} r={30} fill="rgba(255,68,68,0.5)" style={{ transition: 'cy 1s ease-in-out' }} />
          <text x={0} y={showAnalogyFix ? -45 : 40} textAnchor="middle" fill="#FFF" fontSize={12} fontFamily="var(--font-mono)">Carga</text>

          {/* Seta Errada (Empurrar contra) */}
          {!showAnalogyFix && (
            <g>
              <line x1={0} y1={120} x2={0} y2={70} stroke="#FF4444" strokeWidth={4} markerEnd="url(#fr-arr)" />
              <text x={0} y={135} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Força Ineficiente</text>
            </g>
          )}

          {/* Setas Corretas (Esticar bordas - VR) */}
          {showAnalogyFix && (
            <g>
              <line x1={-200} y1={-50} x2={-260} y2={-50} stroke="#00CC66" strokeWidth={4} markerEnd="url(#vr-arr)" />
              <line x1={200} y1={-50} x2={260} y2={-50} stroke="#00CC66" strokeWidth={4} markerEnd="url(#vr-arr)" />
              <text x={-280} y={-45} textAnchor="end" fill="#00CC66" fontSize={14} fontFamily="var(--font-mono)" fontWeight={700}>Tração (VR)</text>
              <text x={280} y={-45} textAnchor="start" fill="#00CC66" fontSize={14} fontFamily="var(--font-mono)" fontWeight={700}>Tração (VR)</text>
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="fr-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#FF4444" />
        </marker>
        <marker id="vr-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#00CC66" />
        </marker>
        <marker id="vr-arr-blue" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#0B3D91" />
        </marker>
        <radialGradient id="iop-burst" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF4444" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      

      {/* CENA CÓRNEA */}
      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* ---- PIO BURST (Fundo de Pressão Animado) ---- */}
        {showFr && (
          <circle cx={CX} cy={cornBot + 20} r={60} fill="url(#iop-burst)">
            <animate attributeName="r" values="40;80;40" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        )}

        {/* ---- CORTE SAGITAL DA CÓRNEA (centro) ---- */}
        <g transform={`translate(${CX},0)`}>
          {layerColors.map((color, i) => (
            <rect key={i}
              x={-cornW/2} y={layerY[i]}
              width={cornW} height={layerY[i+1]-layerY[i]}
              fill={color}
              rx={i===0?cornW/2:i===layerColors.length-1?4:0}
            />
          ))}
          {/* Bordas das camadas */}
          {['Epitélio','Bowman','Estroma Ant.','Estroma Post.','Endotélio'].map((name, i) => (
            <text key={i} x={cornW/2+8} y={(layerY[i]+layerY[i+1])/2+4}
              fill="rgba(140,170,210,0.5)" fontSize={8} fontFamily="var(--font-mono)">{name}</text>
          ))}
          {/* Linha borda cornea */}
          <line x1={-cornW/2} y1={cornTop} x2={cornW/2} y2={cornTop} stroke="rgba(0,180,220,0.4)" strokeWidth={1} />
        </g>

        {/* ---- Fr: SETA AXIAL +Z (vermelho, de baixo para cima ANIMADA) ---- */}
        {showFr && (
          <g>
            {[-60, 0, 60].map((off, i) => (
              <line key={i}
                x1={CX+off} y1={cornBot+30}
                x2={CX+off} y2={cornTop+20}
                stroke="#FF4444" strokeWidth={2}
                markerEnd="url(#fr-arr)">
                <animate attributeName="stroke-width" values="1;4;1" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="y2" values={`${cornTop+30};${cornTop+10};${cornTop+30}`} dur="1.5s" repeatCount="indefinite" />
              </line>
            ))}
            {showFrLabel && (
              <g>
                <rect x={CX-100} y={H-30} width={200} height={22} rx={6}
                  fill="rgba(255,68,68,0.12)" stroke="rgba(255,68,68,0.3)" strokeWidth={1} />
                <text x={CX} y={H-14} textAnchor="middle" fill="#FF4444" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>
                  Fr = Força da Doença (+Z) ≠ Tratamento
                </text>
              </g>
            )}
          </g>
        )}

        {/* ---- PIO label ---- */}
        {showFr && (
          <text x={CX-110} y={cornBot+38} fill="#FF4444" fontSize={11} fontFamily="var(--font-mono)" fontWeight={700}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
            PIO (+Z)
          </text>
        )}

        {/* ---- ANEL ICRS ---- */}
        {showRing && (
          <g>
            <ellipse cx={CX} cy={ringY} rx={cornW*0.48} ry={9}
              fill="rgba(0,180,220,0.2)" stroke="#00B4DC" strokeWidth={2} />
            <text x={CX+cornW*0.55} y={ringY+4} fill="#00B4DC" fontSize={9} fontFamily="var(--font-mono)">ICRS</text>
            {/* Linha 70-75% */}
            <line x1={CX-cornW*0.6} y1={ringY} x2={CX+cornW*0.7} y2={ringY}
              stroke="#FFD700" strokeWidth={0.8} strokeDasharray="4,4" opacity={0.5} />
            <text x={CX+cornW*0.72} y={ringY+4} fill="#FFD700" fontSize={8} fontFamily="var(--font-mono)">72%</text>
          </g>
        )}

        {/* ---- VR: SETAS HORIZONTAIS (azul, plano XY) ---- */}
        {showVR && (
          <g>
            {/* VR para esquerda */}
            <line x1={CX-cornW*0.48} y1={ringY}
              x2={CX-cornW*0.9} y2={ringY}
              stroke="#0B3D91" strokeWidth={2.5} markerEnd="url(#vr-arr-blue)" />
            {/* VR para direita */}
            <line x1={CX+cornW*0.48} y1={ringY}
              x2={CX+cornW*0.9} y2={ringY}
              stroke="#0B3D91" strokeWidth={2.5} markerEnd="url(#vr-arr-blue)" />
            <text x={CX-cornW*0.85} y={ringY-10} fill="#0B3D91" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>VR</text>
            <text x={CX+cornW*0.7} y={ringY-10} fill="#0B3D91" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>VR</text>

            {/* Label plano XY */}
            <text x={30} y={ringY+4} fill="#0B3D91" fontSize={9} fontFamily="var(--font-mono)">← Plano XY →</text>
          </g>
        )}

        {/* ---- Oposição Fr vs VR ---- */}
        {showOppose && (
          <g>
            {/* Seta Fr pequena no cone */}
            <line x1={CX+20} y1={cornTop+cornH*0.3+20}
              x2={CX+20} y2={cornTop+cornH*0.3-30}
              stroke="#FF4444" strokeWidth={1.5} markerEnd="url(#fr-arr)" opacity={0.6} />
            {/* VR opondo */}
            <line x1={CX+cornW*0.1} y1={ringY}
              x2={CX+cornW*0.45} y2={ringY}
              stroke="#00CC66" strokeWidth={2} markerEnd="url(#vr-arr)" />
            <rect x={CX-155} y={50} width={310} height={26} rx={7}
              fill="rgba(0,204,102,0.1)" stroke="rgba(0,204,102,0.3)" strokeWidth={1} />
            <text x={CX} y={68} textAnchor="middle" fill="#00CC66" fontSize={10} fontFamily="var(--font-mono)" fontWeight={600}>
              V_anel ≈ −V_cone (conceptual, não linear)
            </text>
          </g>
        )}

        {/* ---- Aviso hiperelasticidade ---- */}
        {showWarning && (
          <g>
            <rect x={W-280} y={50} width={270} height={44} rx={8}
              fill="rgba(255,215,0,0.08)" stroke="rgba(255,215,0,0.3)" strokeWidth={1} />
            <text x={W-145} y={70} textAnchor="middle" fill="#FFD700" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>⚠ Tecido Hiperelástico</text>
            <text x={W-145} y={86} textAnchor="middle" fill="rgba(255,215,0,0.7)" fontSize={8} fontFamily="var(--font-mono)">Superposição não-linear — não soma aritmética</text>
          </g>
        )}

        {/* Coordenadas */}
        <text x={10} y={20} fill="rgba(140,170,210,0.4)" fontSize={8} fontFamily="var(--font-mono)">+Z (Anterior)</text>
        <text x={10} y={H-10} fill="rgba(140,170,210,0.4)" fontSize={8} fontFamily="var(--font-mono)">−Z (Posterior)</text>
        <text x={W/2-30} y={ringY+30} fill="rgba(140,170,210,0.4)" fontSize={8} fontFamily="var(--font-mono)">+X / +Y</text>

        {/* Títulos */}
        <text x={W/2} y={20} textAnchor="middle" fill="rgba(200,220,255,0.5)" fontSize={10} fontFamily="var(--font-mono)">
          Fr (Axial, +Z) vs VR (Fibrilar, Plano XY)
        </text>
      </g>
    </svg>
  );
}
