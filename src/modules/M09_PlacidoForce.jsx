// M09_PlacidoForce.jsx — Plácido como Mapa de Forças Fibrilares
import React from 'react';
const W=760, H=400, CX=W/2, CY=H/2;
const toRad = d => d*Math.PI/180;

export function M09_PlacidoForce({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showRock = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showNormal
  // 3 -> showKC
  // 4 -> showZones
  // 5 -> showVectors
  // 6 -> showReading
  const showNormal=s>=2, showKC=s>=3, showZones=s>=4, showVectors=s>=5, showReading=s>=6;
  const R=130;

  // Mires deformadas no KC (elipses deslocadas)
  const mireRadii = [0.2,0.35,0.5,0.65,0.8];

  const getMire = (r, isKC) => {
    const n=80;
    const points = [];
    for(let i=0;i<n;i++){
      const a = (i/n)*Math.PI*2;
      // Deformação: mire KC deslocada infero-temporal, alongada
      const dist = isKC
        ? r*R*(1 + 0.18*Math.sin(a+toRad(240))*r + 0.08*Math.cos(2*a))
        : r*R;
      const dx = isKC ? 5*r : 0;
      const dy = isKC ? 8*r : 0;
      points.push(`${CX+dx+dist*Math.cos(a)},${CY+dy+dist*Math.sin(a)}`);
    }
    return `M${points.join('L')}Z`;
  };

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: ONDAS NO LAGO
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showRock 
            ? "Uma rocha (deformidade) distorce os anéis concêntricos perfeitos." 
            : "Ondas perfeitas se espalhando simetricamente a partir do centro."}
        </text>

        <g transform={`translate(${CX}, ${CY + 20})`}>
          {/* Lago (fundo sutil) */}
          <ellipse cx={0} cy={0} rx={180} ry={70} fill="rgba(0,180,220,0.1)" stroke="rgba(0,180,220,0.3)" strokeWidth={2} />

          {/* Ondas base */}
          {[0.3, 0.6, 0.9].map(r => (
            <ellipse key={r} cx={0} cy={0} rx={180*r} ry={70*r} fill="none" stroke="#00B4DC" strokeWidth={2} opacity={0.6}>
               {!showRock && (
                 <animate attributeName="rx" values={`${180*r};${180*r+10};${180*r}`} dur="2s" repeatCount="indefinite" />
               )}
            </ellipse>
          ))}

          {/* Rocha / Obstáculo */}
          {showRock && (
            <g style={{ transition: 'opacity 1s', opacity: 1 }}>
              <ellipse cx={80} cy={20} rx={25} ry={15} fill="#555" />
              {/* Ondas distorcidas pela rocha */}
              <path d="M60,0 Q90,-20 120,0" fill="none" stroke="#00B4DC" strokeWidth={2} opacity={0.8} />
              <path d="M50,10 Q80,-10 130,20" fill="none" stroke="#00B4DC" strokeWidth={2} opacity={0.8} />
              <text x={80} y={45} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Distorção</text>
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="vr-p9" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#0B3D91" />
        </marker>
        <marker id="vt-p9" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#00B4DC" />
        </marker>
      </defs>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Córnea */}
        <circle cx={CX} cy={CY} r={R} fill="rgba(4,12,26,0.95)" stroke="rgba(100,140,200,0.2)" strokeWidth={1.5} />

        {/* Mires NORMAIS (fase s=0) */}
        {!showKC && showNormal && mireRadii.map((r,i) => (
          <path key={i} d={getMire(r, false)}
            fill="none" stroke={`rgba(0,180,220,${0.6-i*0.06})`} strokeWidth={1.2} />
        ))}

        {/* Mires KC (deformadas) */}
        {showKC && mireRadii.map((r,i) => (
          <path key={i} d={getMire(r, true)}
            fill="none" stroke={`rgba(0,180,220,${0.6-i*0.05})`} strokeWidth={1.2} />
        ))}

        {/* Zonas de deformação rotuladas */}
        {showZones && (
          <g>
            {/* Zona IT — VR deficiente */}
            <path d={`M${CX},${CY} L${CX+R*Math.cos(toRad(220))},${CY+R*Math.sin(toRad(220))} A${R},${R} 0 0,1 ${CX+R*Math.cos(toRad(270))},${CY+R*Math.sin(toRad(270))} Z`}
              fill="rgba(255,68,68,0.12)" />
            <text x={CX+R*0.55*Math.cos(toRad(245))} y={CY+R*0.55*Math.sin(toRad(245))+4}
              textAnchor="middle" fill="#FF4444" fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>VR ↓</text>

            {/* Zona N-T — VT tensionado */}
            <path d={`M${CX},${CY} L${CX+R*Math.cos(toRad(330))},${CY+R*Math.sin(toRad(330))} A${R},${R} 0 0,1 ${CX+R*Math.cos(toRad(30))},${CY+R*Math.sin(toRad(30))} Z`}
              fill="rgba(0,180,220,0.08)" />
            <text x={CX+R*0.55*Math.cos(toRad(0))} y={CY+R*0.55*Math.sin(toRad(0))+4}
              textAnchor="middle" fill="#00B4DC" fontSize={8} fontFamily="var(--font-mono)">VT</text>
          </g>
        )}

        {/* Vetores sobrepostos */}
        {showVectors && (
          <g>
            {/* VR (radial, centrífugo) no gap IT */}
            {[220,240,260].map(a => {
              const r1=R*0.3, r2=R*0.6;
              return (
                <line key={a}
                  x1={CX+r1*Math.cos(toRad(a))} y1={CY+r1*Math.sin(toRad(a))}
                  x2={CX+r2*Math.cos(toRad(a))} y2={CY+r2*Math.sin(toRad(a))}
                  stroke="#0B3D91" strokeWidth={1.8} markerEnd="url(#vr-p9)" />
              );
            })}
            {/* VT (tangencial) no limbo superior */}
            {[330,360,30].map(a => {
              const r=R*0.75;
              const x=CX+r*Math.cos(toRad(a)), y=CY+r*Math.sin(toRad(a));
              const ta=toRad(a)+Math.PI/2;
              const l=18;
              return (
                <line key={a}
                  x1={x-Math.cos(ta)*l/2} y1={y-Math.sin(ta)*l/2}
                  x2={x+Math.cos(ta)*l/2} y2={y+Math.sin(ta)*l/2}
                  stroke="#00B4DC" strokeWidth={1.5} markerEnd="url(#vt-p9)" />
              );
            })}
          </g>
        )}

        {/* Legenda de leitura */}
        {showReading && (
          <g>
            <rect x={W-260} y={20} width={248} height={72} rx={8}
              fill="rgba(8,14,30,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            <text x={W-136} y={38} textAnchor="middle" fill="rgba(200,220,255,0.8)"
              fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>Como ler o Plácido</text>
            {[
              ['Mires distorcidas IT →','VR ↓ (fibras frouxas)','#FF4444'],
              ['Mires comprimidas N-T →','VT tensionado','#00B4DC'],
              ['Gap entre mires →','Zona de fuga fibrilar','#FFD700'],
            ].map(([q,a,c],i)=>(
              <g key={i}>
                <text x={W-254} y={54+i*14} fill="rgba(160,180,210,0.7)" fontSize={7.5} fontFamily="var(--font-mono)">{q}</text>
                <text x={W-254} y={63+i*14} fill={c} fontSize={7.5} fontFamily="var(--font-mono)" fontWeight={600}>{a}</text>
              </g>
            ))}
          </g>
        )}

        {/* Label central */}
        <circle cx={CX} cy={CY} r={3} fill="rgba(255,255,255,0.5)" />
        <text x={CX} y={18} textAnchor="middle" fill="rgba(200,220,255,0.4)" fontSize={9} fontFamily="var(--font-mono)">
          Plácido como Mapa de Forças Fibrilares
        </text>
        <text x={CX} y={H-8} textAnchor="middle" fill="rgba(200,220,255,0.3)" fontSize={8} fontFamily="var(--font-mono)">
          Cada deformação de mire = desequilíbrio vetorial local
        </text>
      </g>
    </svg>
  );
}
