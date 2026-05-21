// M10_KsteepVsENM.jsx — K-steep vs Eixo Neutro Mecânico (ENM)
import React from 'react';
const W=760, H=400, CX=W/2, CY=H/2;
const toRad = d => d*Math.PI/180;

export function M10_KsteepVsENM({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showFault = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showKsteep
  // 3 -> showComa
  // 4 -> showENM
  // 5 -> showIncision
  // 6 -> showResult
  // 7 -> showRef
  const showKsteep=s>=2, showComa=s>=3, showENM=s>=4, showIncision=s>=5, showResult=s>=6, showRef=s>=7;
  const R=130;

  const ksteepAngle = 115; // Eixo K-steep
  const comaAngle = 95;    // Eixo Zernike coma (diverge!)
  const enmAngle = 105;    // ENM (entre os dois)

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: A FALHA GEOLÓGICA
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showFault 
            ? "O pico da montanha (K-steep) nem sempre reflete onde está a falha tectônica (ENM)." 
            : "Uma cordilheira de montanhas vistas de cima."}
        </text>

        <g transform={`translate(${CX}, ${CY + 20})`}>
          {/* Montanhas topográficas */}
          <ellipse cx={0} cy={0} rx={150} ry={80} fill="rgba(255,68,68,0.1)" stroke="#FF4444" strokeWidth={1.5} />
          <ellipse cx={20} cy={10} rx={100} ry={50} fill="rgba(255,68,68,0.2)" stroke="#FF4444" strokeWidth={1.5} />
          <ellipse cx={40} cy={20} rx={40} ry={20} fill="rgba(255,68,68,0.3)" stroke="#FF4444" strokeWidth={1.5} />
          <circle cx={40} cy={20} r={5} fill="#FF4444" />
          <text x={40} y={10} textAnchor="middle" fill="#FF4444" fontSize={10} fontFamily="var(--font-mono)">Pico Topográfico</text>

          {/* Falha Geológica (ENM) */}
          {showFault && (
            <g style={{ transition: 'opacity 1s', opacity: 1 }}>
              <path d="M-120,-60 L-50,-20 L0,30 L30,90" fill="none" stroke="#FFFFFF" strokeWidth={4} strokeDasharray="10,5" />
              <text x={-130} y={-70} fill="#FFFFFF" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Falha Estrutural Real</text>
              <line x1={40} y1={20} x2={-10} y2={10} stroke="#FFD700" strokeWidth={2} markerEnd="url(#enm-arr)" />
              <text x={-20} y={5} fill="#FFD700" fontSize={10} fontFamily="var(--font-mono)">Divergência</text>
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="enm-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="white" />
        </marker>
        <marker id="inc-ok" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#00CC66" />
        </marker>
        <marker id="inc-err" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#FF4444" />
        </marker>
      </defs>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Córnea */}
        <circle cx={CX} cy={CY} r={R} fill="rgba(5,12,28,0.95)" stroke="rgba(100,140,200,0.2)" strokeWidth={1.5} />

        {/* Mires KC */}
        {[0.35,0.55,0.75].map((r,i) => (
          <ellipse key={i} cx={CX+4} cy={CY+6} rx={r*R*1.06} ry={r*R*0.88}
            fill="none" stroke={`rgba(60,100,160,${0.3-i*0.05})`} strokeWidth={1} />
        ))}

        {/* Eixo K-steep (branco tracejado) */}
        {showKsteep && (
          <g>
            <line x1={CX-R*Math.cos(toRad(ksteepAngle))} y1={CY-R*Math.sin(toRad(ksteepAngle))}
              x2={CX+R*Math.cos(toRad(ksteepAngle))} y2={CY+R*Math.sin(toRad(ksteepAngle))}
              stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} strokeDasharray="7,4" />
            <text x={CX+R*Math.cos(toRad(ksteepAngle))+6} y={CY+R*Math.sin(toRad(ksteepAngle))+3}
              fill="rgba(255,255,255,0.7)" fontSize={8} fontFamily="var(--font-mono)">K-steep {ksteepAngle}°</text>
          </g>
        )}

        {/* Eixo Coma Zernike (magenta) */}
        {showComa && (
          <g>
            <line x1={CX-R*Math.cos(toRad(comaAngle))} y1={CY-R*Math.sin(toRad(comaAngle))}
              x2={CX+R*Math.cos(toRad(comaAngle))} y2={CY+R*Math.sin(toRad(comaAngle))}
              stroke="#FF66FF" strokeWidth={1.5} strokeDasharray="5,4" />
            <text x={CX+R*Math.cos(toRad(comaAngle))+6} y={CY+R*Math.sin(toRad(comaAngle))-5}
              fill="#FF66FF" fontSize={8} fontFamily="var(--font-mono)">Coma Z₃¹ {comaAngle}°</text>
            {/* Ângulo de divergência */}
            <text x={CX+30} y={CY-R*0.4}
              fill="rgba(255,215,0,0.8)" fontSize={9} fontFamily="var(--font-mono)">Δ={ksteepAngle-comaAngle}°</text>
          </g>
        )}

        {/* ENM (branco sólido) */}
        {showENM && (
          <g>
            <line x1={CX-R*Math.cos(toRad(enmAngle))} y1={CY-R*Math.sin(toRad(enmAngle))}
              x2={CX+R*Math.cos(toRad(enmAngle))} y2={CY+R*Math.sin(toRad(enmAngle))}
              stroke="white" strokeWidth={2.5} />
            <text x={CX-R*Math.cos(toRad(enmAngle))-8} y={CY-R*Math.sin(toRad(enmAngle))-5}
              textAnchor="end" fill="white" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>ENM {enmAngle}°</text>
            <text x={CX} y={CY+16}
              textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={8} fontFamily="var(--font-mono)">Eixo Neutro Mecânico</text>
          </g>
        )}

        {/* Incisões: CORRETA (no ENM) vs INCORRETA (no K-steep) */}
        {showIncision && (
          <g>
            {/* Incisão correta no ENM */}
            <circle cx={CX+R*Math.cos(toRad(enmAngle+90))} cy={CY+R*Math.sin(toRad(enmAngle+90))} r={8}
              fill="rgba(0,204,102,0.25)" stroke="#00CC66" strokeWidth={2} />
            <text x={CX+R*Math.cos(toRad(enmAngle+90))+12} y={CY+R*Math.sin(toRad(enmAngle+90))+4}
              fill="#00CC66" fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>✓ Incisão ENM</text>

            {/* Incisão incorreta no K-steep */}
            <circle cx={CX+R*Math.cos(toRad(ksteepAngle+90))} cy={CY+R*Math.sin(toRad(ksteepAngle+90))} r={8}
              fill="rgba(255,68,68,0.25)" stroke="#FF4444" strokeWidth={2} />
            <text x={CX+R*Math.cos(toRad(ksteepAngle+90))+12} y={CY+R*Math.sin(toRad(ksteepAngle+90))+4}
              fill="#FF4444" fontSize={8} fontFamily="var(--font-mono)">✗ Incisão K-steep</text>
          </g>
        )}

        {/* Resultado */}
        {showResult && (
          <g>
            <rect x={10} y={H-70} width={240} height={58} rx={7}
              fill="rgba(8,14,30,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            {[
              ['Incisão no ENM:','HOA ↓ 34%','#00CC66'],
              ['Incisão no K-steep:','HOA ↑ 18%','#FF4444'],
              ['Ref: Kammoun 2021','J Refract Surg','rgba(140,160,200,0.6)'],
            ].map(([l,v,c],i) => (
              <g key={i}>
                <text x={18} y={H-50+i*16} fill="rgba(160,180,210,0.6)" fontSize={8} fontFamily="var(--font-mono)">{l}</text>
                <text x={140} y={H-50+i*16} fill={c} fontSize={8} fontFamily="var(--font-mono)" fontWeight={600}>{v}</text>
              </g>
            ))}
          </g>
        )}

        {showRef && (
          <g>
            <rect x={W-280} y={H-42} width={268} height={30} rx={6}
              fill="rgba(255,215,0,0.06)" stroke="rgba(255,215,0,0.2)" strokeWidth={1} />
            <text x={W-146} y={H-22} textAnchor="middle"
              fill="rgba(255,215,0,0.7)" fontSize={8} fontFamily="var(--font-mono)">
              Kammoun 2021: ENM &gt; K-steep em fenótipos assimétricos
            </text>
          </g>
        )}

        <text x={CX} y={18} textAnchor="middle" fill="rgba(200,220,255,0.4)" fontSize={9} fontFamily="var(--font-mono)">
          K-steep (topog.) vs ENM (aberrométrico) — Divergência em P3/P4
        </text>
      </g>
    </svg>
  );
}
