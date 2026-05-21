// M07_Vtau_Asymmetric.jsx — Vτ: Torque em Anel Assimétrico
import React from 'react';
const W=760, H=400, CX=W/2, CY=H/2;
const toRad = d => d*Math.PI/180;

export function M07_Vtau_Asymmetric({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showTurn = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showRing
  // 3 -> showGrad
  // 4 -> showTorque
  // 5 -> showApex
  // 6 -> showFibers
  // 7 -> showIndic
  const showRing=s>=2, showGrad=s>=3, showTorque=s>=4, showApex=s>=5, showFibers=s>=6, showIndic=s>=7;
  const R=130, ringR=R*0.55;
  const IT=toRad(240);
  // Anel assimétrico: 210° de 30° a 240°
  const startA=toRad(30), endA=toRad(240);

  const apexX = showApex ? CX+R*0.45*Math.cos(IT)+15 : CX+R*0.45*Math.cos(IT);
  const apexY = showApex ? CY+R*0.45*Math.sin(IT)-10 : CY+R*0.45*Math.sin(IT);

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: O VOLANTE DO CARRO
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showTurn 
            ? "Puxar um lado mais forte (gradiente de espessura) gera torque e rotaciona a estrutura." 
            : "Como mudamos a direção de algo que está fixo no centro?"}
        </text>

        <g transform={`translate(${CX}, ${CY + 20})`}>
          <g style={{ transition: 'transform 1s ease-in-out', transform: `rotate(${showTurn ? 30 : 0}deg)` }}>
            {/* Volante */}
            <circle cx={0} cy={0} r={80} fill="none" stroke="#555" strokeWidth={15} />
            <circle cx={0} cy={0} r={80} fill="none" stroke="#777" strokeWidth={5} />
            <circle cx={0} cy={0} r={15} fill="#555" />
            
            {/* Raios do volante */}
            <line x1={0} y1={-15} x2={0} y2={-80} stroke="#555" strokeWidth={10} />
            <line x1={-12} y1={10} x2={-65} y2={45} stroke="#555" strokeWidth={10} />
            <line x1={12} y1={10} x2={65} y2={45} stroke="#555" strokeWidth={10} />
          </g>

          {/* Mão / Força Assimetrica */}
          {showTurn && (
             <g style={{ transition: 'opacity 1s', opacity: 1 }}>
               <line x1={80} y1={20} x2={80} y2={80} stroke="#FFD700" strokeWidth={6} markerEnd="url(#vtau-arr)" />
               <text x={95} y={60} textAnchor="start" fill="#FFD700" fontSize={14} fontFamily="var(--font-mono)" fontWeight={700}>Torque (Vτ)</text>
             </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFD70050" />
        </linearGradient>
        <marker id="vtau-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#FFD700" />
        </marker>
        <marker id="apex-arr" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#00CC66" />
        </marker>
      </defs>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Córnea */}
        <circle cx={CX} cy={CY} r={R} fill="rgba(7,24,40,0.9)" stroke="rgba(255,68,68,0.2)" strokeWidth={1.5} />

        {/* Mires Plácido deformadas (KC) */}
        {[0.3,0.5,0.7,0.9].map((r,i) => (
          <ellipse key={i} cx={CX+5} cy={CY+8} rx={r*R*1.05} ry={r*R*0.9}
            fill="none" stroke={`rgba(80,100,160,${0.35-i*0.04})`} strokeWidth={1} />
        ))}

        {/* Anel assimétrico com gradiente de espessura */}
        {showRing && (
          <g>
            {Array.from({length:30}).map((_,i) => {
              const t = i/29;
              const a = startA + t*(endA-startA);
              const thick = 9-t*3; // 250→150µm
              const x = CX+ringR*Math.cos(a), y = CY+ringR*Math.sin(a);
              return (
                <circle key={i} cx={x} cy={y} r={thick}
                  fill={showGrad ? `rgba(255,${180+Math.floor(t*20)},0,${0.8-t*0.3})` : 'rgba(255,215,0,0.4)'}
                  stroke="none" />
              );
            })}
            {/* Labels espessura */}
            {showGrad && (
              <g>
                <text x={CX+ringR*Math.cos(startA)+14} y={CY+ringR*Math.sin(startA)}
                  fill="#FFD700" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>250μm</text>
                <text x={CX+ringR*Math.cos(endA)-60} y={CY+ringR*Math.sin(endA)+4}
                  fill="rgba(255,215,0,0.5)" fontSize={9} fontFamily="var(--font-mono)">150μm</text>
              </g>
            )}
          </g>
        )}

        {/* Vetor Vτ: torque rotacional */}
        {showTorque && (
          <g>
            {/* Arco de torque */}
            <path
              d={`M${CX+ringR*0.8*Math.cos(startA+0.3)},${CY+ringR*0.8*Math.sin(startA+0.3)} A${ringR*0.8},${ringR*0.8} 0 0,1 ${CX+ringR*0.8*Math.cos(endA-0.3)},${CY+ringR*0.8*Math.sin(endA-0.3)}`}
              fill="none" stroke="#FFD700" strokeWidth={2.5} strokeDasharray="6,4"
              markerEnd="url(#vtau-arr)" />
            <text x={CX-ringR*0.9} y={CY-14}
              fill="#FFD700" fontSize={11} fontFamily="var(--font-mono)" fontWeight={700}>Vτ</text>
            <text x={CX-ringR*0.9} y={CY+2}
              fill="rgba(255,215,0,0.6)" fontSize={7.5} fontFamily="var(--font-mono)">Torque rotacional</text>
          </g>
        )}

        {/* Ápice migrando */}
        {showApex && (
          <g>
            {/* Posição anterior (fantasma) */}
            <circle cx={CX+R*0.45*Math.cos(IT)} cy={CY+R*0.45*Math.sin(IT)} r={7}
              fill="none" stroke="rgba(255,68,68,0.3)" strokeWidth={1} strokeDasharray="3,3" />
            {/* Nova posição */}
            <circle cx={apexX} cy={apexY} r={8}
              fill="rgba(0,204,102,0.25)" stroke="#00CC66" strokeWidth={1.5} />
            <circle cx={apexX} cy={apexY} r={3} fill="#00CC66" />
            {/* Seta de migração */}
            <line x1={CX+R*0.45*Math.cos(IT)} y1={CY+R*0.45*Math.sin(IT)}
              x2={apexX-3} y2={apexY+3}
              stroke="#00CC66" strokeWidth={1.5} markerEnd="url(#apex-arr)" />
            <text x={apexX+12} y={apexY} fill="#00CC66" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>Ápice ↗</text>
          </g>
        )}

        {/* Fibras oblíquas restauradas */}
        {showFibers && (
          <g opacity={0.6}>
            {[0,1,2,3].map(i => {
              const a = IT-0.4+i*0.27;
              const x = CX+R*0.35*Math.cos(a), y = CY+R*0.35*Math.sin(a);
              return <line key={i}
                x1={x-10*Math.cos(a+Math.PI/3)} y1={y-10*Math.sin(a+Math.PI/3)}
                x2={x+10*Math.cos(a+Math.PI/3)} y2={y+10*Math.sin(a+Math.PI/3)}
                stroke="#00CC66" strokeWidth={1.5} />;
            })}
            <text x={CX+R*0.4*Math.cos(IT)-40} y={CY+R*0.4*Math.sin(IT)+20}
              fill="rgba(0,204,102,0.7)" fontSize={8} fontFamily="var(--font-mono)">Fibras oblíquas</text>
          </g>
        )}

        {/* Indicação clínica */}
        {showIndic && (
          <g>
            <rect x={10} y={H-55} width={220} height={42} rx={7}
              fill="rgba(255,215,0,0.08)" stroke="rgba(255,215,0,0.25)" strokeWidth={1} />
            <text x={18} y={H-37} fill="#FFD700" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>
              Indicação Clínica
            </text>
            <text x={18} y={H-22} fill="rgba(255,215,0,0.7)" fontSize={8} fontFamily="var(--font-mono)">
              P2 Oval — fibras oblíquas IT destruídas
            </text>
          </g>
        )}

        <text x={CX} y={18} textAnchor="middle" fill="rgba(200,220,255,0.4)" fontSize={9} fontFamily="var(--font-mono)">
          Anel Assimétrico — Gradiente 250→150μm — Vτ Rotacional
        </text>
      </g>
    </svg>
  );
}
