// M01_NormalVsKC.jsx — Córnea Normal vs Ceratocone (Escala Fibrilar)
import React from 'react';

const W = 760, H = 400;
const leftCX = W * 0.27, rightCX = W * 0.73, CY = H / 2 - 20, R = 125;
// OD topographic convention: Temporal = LEFT, Nasal = RIGHT
// Infero-Temporal (IT) for OD = bottom-LEFT = SVG angle ~135°
// cos(135°) = -0.707 (left ✓), sin(135°) = +0.707 (down in SVG ✓)
const IT_ANGLE = (135 * Math.PI) / 180;

function FiberLines({ cx, cy, radius, count, colorR, colorT, colorO, opacity = 1 }) {
  const lines = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = radius * (0.3 + 0.7 * ((i * 17) % count) / count);
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    const type = i % 3;
    const fa = type === 0 ? a : type === 1 ? a + Math.PI / 2 : a * 1.3;
    const len = type === 0 ? 16 : type === 1 ? 12 : 9;
    const col = type === 0 ? colorR : type === 1 ? colorT : colorO;
    lines.push(
      <line key={i}
        x1={x - Math.cos(fa) * len / 2} y1={y - Math.sin(fa) * len / 2}
        x2={x + Math.cos(fa) * len / 2} y2={y + Math.sin(fa) * len / 2}
        stroke={col} strokeWidth={0.8} opacity={opacity}
      />
    );
  }
  return <g>{lines}</g>;
}

export function M01_NormalVsKC({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showBridge = s <= 1;
  const breakCables = s === 1;
  
  // Cornea scene shifts: 
  // 0, 1 -> Bridge
  // 2 -> Normal Cornea
  // 3 -> Zoom fibers
  // 4 -> Top-down density
  // 5 -> KC Cornea
  // 6 -> IOP
  // 7 -> Split screen
  // 8 -> Stat box
  
  const showCorneaLeft = s >= 2;
  const showIOPNormal = s >= 3 && s <= 4;
  const showKC = s >= 5;
  const showCone = s >= 6;
  const showIOPKC = s >= 6;
  const showStat = s >= 8;

  // Render da Ponte Pênsil
  const renderBridge = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showBridge ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: A PONTE PÊNSIL
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {breakCables 
            ? "O que acontece se 44% dos cabos de um lado se romperem sob carga constante?" 
            : "A córnea suporta a PIO da mesma forma que uma ponte suporta o trânsito: tensão distribuída."}
        </text>

        {/* Estrutura da Ponte */}
        <g transform={`translate(${W/2}, ${H/2 + 50})`}>
          {/* Pilares */}
          <rect x={-150} y={-100} width={20} height={150} fill="#1A3A5C" />
          <rect x={130} y={-100} width={20} height={150} fill="#1A3A5C" />
          
          {/* Cabo principal */}
          <path d="M-250,-80 Q-140,50 -140,-100 Q0,50 140,-100 Q140,50 250,-80" fill="none" stroke="#00B4DC" strokeWidth={4} />
          
          {/* Cabos de suspensão esquerdo */}
          {[...Array(6)].map((_, i) => (
            <line key={`L${i}`} x1={-130 + i*20} y1={-80 + Math.pow(i-3, 2)*5} x2={-130 + i*20} y2={20} stroke="#00B4DC" strokeWidth={2} />
          ))}

          {/* Cabos de suspensão direito (Rompidos na cena 1) */}
          {[...Array(6)].map((_, i) => (
            <line key={`R${i}`} 
              x1={30 + i*20} 
              y1={-80 + Math.pow(i-2, 2)*5} 
              x2={30 + i*20} 
              y2={20 + (breakCables && i > 1 ? 40 : 0)} 
              stroke={breakCables && i > 1 ? "#FF4444" : "#00B4DC"} 
              strokeWidth={2} 
              strokeDasharray={breakCables && i > 1 ? "4,4" : "none"}
              opacity={breakCables && i > 1 ? 0.3 : 1}
            />
          ))}

          {/* Pista / Deck */}
          <path d={breakCables 
            ? "M-250,20 L30,20 Q100,80 250,20" 
            : "M-250,20 L250,20"} 
            fill="none" stroke="#00CC66" strokeWidth={10} 
            style={{ transition: 'd 1s ease-in-out' }} 
          />

          {/* Carros (Carga) */}
          <rect x={-80} y={10} width={20} height={10} fill="#FFD700" rx={2} />
          <rect x={0} y={10} width={20} height={10} fill="#FFD700" rx={2} />
          <g transform={`translate(100, ${breakCables ? 55 : 10}) rotate(${breakCables ? 25 : 0})`} style={{ transition: 'all 1s ease-in-out' }}>
             <rect x={0} y={0} width={20} height={10} fill="#FFD700" rx={2} />
          </g>

          {/* Carga (Seta PIO) */}
          <line x1={0} y1={-30} x2={0} y2={-5} stroke="#FF4444" strokeWidth={3} markerEnd="url(#iop1)" />
          <text x={0} y={-40} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)">CARGA (PIO)</text>
          
          {breakCables && (
            <g>
              <line x1={100} y1={-30} x2={100} y2={30} stroke="#FF4444" strokeWidth={4} markerEnd="url(#iop1)" />
              <text x={100} y={-40} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>FALHA!</text>
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: '100%', maxHeight: '100%' }}>
      <defs>
        <clipPath id="cl"><circle cx={leftCX} cy={CY} r={R} /></clipPath>
        <clipPath id="cr"><circle cx={rightCX} cy={CY} r={R} /></clipPath>
        <marker id="iop1" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#FF4444" />
        </marker>
        <radialGradient id="iop-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      {showBridge && renderBridge()}

      {/* CENA DA CÓRNEA */}
      <g style={{ transition: 'opacity 0.5s', opacity: !showBridge ? 1 : 0 }}>
        {/* Divisor */}
        <line x1={W/2} y1={10} x2={W/2} y2={H-55} stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="5,5" />

        {/* PAINEL ESQUERDO: NORMAL */}
        <g opacity={showCorneaLeft ? 1 : 0}>
          <circle cx={leftCX} cy={CY} r={R} fill="#071828" stroke="rgba(0,180,220,0.3)" strokeWidth={1.5} />
          <g clipPath="url(#cl)">
            <FiberLines cx={leftCX} cy={CY} radius={R*0.9} count={80}
              colorR="rgba(11,61,145,0.7)" colorT="rgba(0,180,220,0.6)" colorO="rgba(0,204,102,0.5)" />
          </g>
          {/* IOP Normal (equilibrada) */}
          {showIOPNormal && (
            <circle cx={leftCX} cy={CY} r={R-40} fill="none" stroke="rgba(0,180,220,0.2)" strokeWidth={2}>
               <animate attributeName="r" values={`${R-40};${R-35};${R-40}`} dur="3s" repeatCount="indefinite" />
               <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={leftCX} cy={CY} r={R} fill="none" stroke="rgba(0,180,220,0.2)" strokeWidth={2} />
          <circle cx={leftCX} cy={CY} r={3} fill="rgba(255,255,255,0.5)" />
          <text x={leftCX} y={CY-R-12} textAnchor="middle" fill="#00CC66" fontSize={13} fontWeight={700} fontFamily="var(--font-mono)">CÓRNEA NORMAL</text>
          <text x={leftCX} y={CY+R+18} textAnchor="middle" fill="rgba(0,180,220,0.7)" fontSize={9} fontFamily="var(--font-mono)">ρ uniforme · PIO contida pela malha</text>
        </g>

        {/* PAINEL DIREITO: KC */}
        <g opacity={showKC ? 1 : 0.15} style={{ transition: 'opacity 0.8s ease' }}>
          <circle cx={rightCX} cy={CY} r={R} fill="#100808" stroke="rgba(255,68,68,0.3)" strokeWidth={1.5} />
          {/* Gap IT */}
          <path d={`M${rightCX},${CY} L${rightCX+R*Math.cos(IT_ANGLE-0.55)},${CY+R*Math.sin(IT_ANGLE-0.55)} A${R},${R} 0 0,1 ${rightCX+R*Math.cos(IT_ANGLE+0.55)},${CY+R*Math.sin(IT_ANGLE+0.55)} Z`}
            fill="rgba(255,68,68,0.2)" clipPath="url(#cr)" />
          {/* Fibras (esparsas no IT) */}
          <g clipPath="url(#cr)">
            <FiberLines cx={rightCX} cy={CY-50} radius={R*0.45} count={40}
              colorR="rgba(11,61,145,0.6)" colorT="rgba(0,180,220,0.5)" colorO="rgba(0,204,102,0.4)" />
            <FiberLines cx={rightCX-60} cy={CY} radius={R*0.4} count={30}
              colorR="rgba(11,61,145,0.5)" colorT="rgba(0,180,220,0.4)" colorO="rgba(0,204,102,0.3)" />
            <FiberLines cx={rightCX+45} cy={CY+55} radius={R*0.4} count={8}
              colorR="rgba(11,61,145,0.2)" colorT="rgba(0,180,220,0.15)" colorO="rgba(0,204,102,0.1)" />
          </g>
          
          {/* Cone protruso */}
          {showCone && (
            <g>
              <ellipse cx={rightCX+40} cy={CY+55} rx={26} ry={16}
                fill="rgba(255,68,68,0.2)" stroke="#FF4444" strokeWidth={1.5}>
                <animate attributeName="rx" values="26;30;26" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="ry" values="16;20;16" dur="1.5s" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}

          {/* PIO (IOP) Dinâmica Rompendo o Gap */}
          {showIOPKC && (
            <g>
              {/* Pulsing pressure core */}
              <circle cx={rightCX} cy={CY} r={40} fill="url(#iop-pulse)">
                 <animate attributeName="r" values="40;70;40" dur="1.5s" repeatCount="indefinite" />
              </circle>
              {/* Seta principal da PIO com animação */}
              {[-0.15, 0, 0.15].map((off, i) => {
                const a = IT_ANGLE + off;
                return <line key={i}
                  x1={rightCX+(R-60)*Math.cos(a)} y1={CY+(R-60)*Math.sin(a)}
                  x2={rightCX+(R-12)*Math.cos(a)} y2={CY+(R-12)*Math.sin(a)}
                  stroke="#FF4444" markerEnd="url(#iop1)">
                  <animate attributeName="stroke-width" values="1;3.5;1" dur="1.5s" repeatCount="indefinite" />
                </line>;
              })}
              <text x={rightCX-15} y={CY+15} fill="#FF4444" fontSize={11} fontFamily="var(--font-mono)" fontWeight={700}>
                 <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                 PIO ↑
              </text>
            </g>
          )}

          {/* Label gap */}
          <text x={rightCX+R*0.55*Math.cos(IT_ANGLE)} y={CY+R*0.55*Math.sin(IT_ANGLE)+4}
            textAnchor="middle" fill="#FF4444" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>−44%</text>

          <circle cx={rightCX} cy={CY} r={R} fill="none" stroke="rgba(255,68,68,0.2)" strokeWidth={2} />
          <text x={rightCX} y={CY-R-12} textAnchor="middle" fill="#FF4444" fontSize={13} fontWeight={700} fontFamily="var(--font-mono)">CERATOCONE</text>
          <text x={rightCX} y={CY+R+18} textAnchor="middle" fill="rgba(255,68,68,0.7)" fontSize={9} fontFamily="var(--font-mono)">A PIO vence a falha estrutural</text>
        </g>

        {/* Stat box */}
        {showStat && (
          <g>
            <rect x={W/2-185} y={H-52} width={370} height={32} rx={7} fill="rgba(255,68,68,0.1)" stroke="rgba(255,68,68,0.3)" strokeWidth={1} />
            <text x={W/2} y={H-30} textAnchor="middle" fill="rgba(255,200,200,0.9)" fontSize={11} fontFamily="var(--font-mono)" fontWeight={600}>
              72% dos KC: ápice entre 210°–300° (Meek &amp; Boote 2004)
            </text>
          </g>
        )}

        {/* Legenda fibras */}
        {[['#0B3D91','Radiais'],['#00B4DC','Tangenciais'],['#00CC66','Oblíquas']].map(([c,l],i)=>(
          <g key={i} transform={`translate(${8+i*95},${H-22})`}>
            <line x1={0} y1={5} x2={16} y2={5} stroke={c} strokeWidth={2} />
            <text x={20} y={9} fill={c} fontSize={9} fontFamily="var(--font-mono)">{l}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
