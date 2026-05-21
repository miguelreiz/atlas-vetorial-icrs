// M11_FEM_BeforeAfter.jsx — FEM: Mapa de Tensão von Mises Antes/Depois do ICRS
// REGRA: FEM = stress map (MPa), NÃO é topografia (D)
import React from 'react';
const W=760, H=400;

// Gera cor no gradiente von Mises: azul→verde→amarelo→vermelho
function vmColor(v) {
  // v: 0-1
  if (v < 0.25) {
    const t = v/0.25;
    return `rgb(${Math.round(t*0)},${Math.round(t*100+100)},${Math.round(255-t*100)})`;
  } else if (v < 0.5) {
    const t = (v-0.25)/0.25;
    return `rgb(${Math.round(t*100)},${Math.round(200+t*55)},${Math.round(150-t*150)})`;
  } else if (v < 0.75) {
    const t = (v-0.5)/0.25;
    return `rgb(${Math.round(100+t*155)},${Math.round(255-t*100)},0)`;
  } else {
    const t = (v-0.75)/0.25;
    return `rgb(255,${Math.round(155-t*155)},0)`;
  }
}

function FEMPanel({ cx, cy, R, isPost, label }) {
  // Pré: hotspot vermelho no ápice IT; Pós: redistribuído
  const cells = [];
  const n = 20;
  for(let i=0;i<n;i++){
    for(let j=0;j<n;j++){
      const px = cx-R+i*(2*R/n), py = cy-R+j*(2*R/n);
      const dist = Math.sqrt((px-cx)**2+(py-cy)**2);
      if(dist > R*0.95) continue;
      const nx = (px-cx)/R, ny = (py-cy)/R;
      let stress;
      if(!isPost) {
        // Pré-ICRS: stress concentrado no ápice IT (nx≈0.4, ny≈0.45)
        const dIT = Math.sqrt((nx-0.38)**2+(ny-0.42)**2);
        stress = Math.max(0, 1-dIT*2.2);
        stress = Math.pow(stress, 0.6);
      } else {
        // Pós-ICRS: stress redistribuído radialmente, hotspot desaparece
        const dCenter = Math.sqrt(nx**2+ny**2);
        const dRing = Math.abs(dCenter-0.6);
        stress = Math.max(0, 0.5-dRing*2) + Math.max(0, 0.2-dCenter*0.5);
        stress = Math.min(1, stress);
      }
      const cw = (2*R/n), ch = (2*R/n);
      cells.push(
        <rect key={`${i}-${j}`}
          x={px} y={py} width={cw+0.5} height={ch+0.5}
          fill={vmColor(stress)} opacity={0.85} />
      );
    }
  }

  return (
    <g>
      <clipPath id={`clip-fem-${isPost?'post':'pre'}`}>
        <circle cx={cx} cy={cy} r={R} />
      </clipPath>
      <circle cx={cx} cy={cy} r={R} fill="#040810" />
      <g clipPath={`url(#clip-fem-${isPost?'post':'pre'})`}>
        {cells}
      </g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(100,140,200,0.25)" strokeWidth={1.5} />
      {/* Anel pós-ICRS */}
      {isPost && (
        <circle cx={cx} cy={cy} r={R*0.6} fill="none" stroke="#00B4DC" strokeWidth={2} opacity={0.6} />
      )}
      {/* Label */}
      <text x={cx} y={cy-R-12} textAnchor="middle"
        fill={isPost?"#00CC66":"#FF4444"} fontSize={11} fontWeight={700} fontFamily="var(--font-mono)">
        {label}
      </text>
    </g>
  );
}

export function M11_FEM_BeforeAfter({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showDissipate = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showLegend, showPre
  // 3 -> showDisp
  // 4 -> showRing
  // 5 -> showPost
  // 6 -> showSplit
  // 7 -> showOverlay
  const showLegend=s>=2, showPre=s>=2, showDisp=s>=3, showRing=s>=4, showPost=s>=5, showSplit=s>=6, showOverlay=s>=7;
  const H2 = H, leftCX=200, rightCX=560, CY=H2/2-10, R=130;
  const CX = W/2;

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: O TERMOVISOR
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showDissipate 
            ? "Dissipar o calor (stress) espalhando-o pela borda esfria o centro." 
            : "Um mapa de calor não mostra altura, mostra acúmulo de energia (stress)."}
        </text>

        <g transform={`translate(${CX}, ${CY + 20})`}>
          {/* Fundo frio */}
          <rect x={-150} y={-80} width={300} height={160} fill="#0a1628" rx={10} />

          {/* Mancha de calor */}
          <ellipse cx={showDissipate ? 0 : 0} cy={0} rx={showDissipate ? 120 : 40} ry={showDissipate ? 60 : 40} 
             fill="url(#heat-grad)" opacity={0.8} style={{ transition: 'all 1s ease-in-out' }} />

          {/* Dissipação anelar */}
          {showDissipate && (
             <circle cx={0} cy={0} r={90} fill="none" stroke="#FF4444" strokeWidth={5} strokeDasharray="10,10" style={{ transition: 'opacity 1s', opacity: 0.6 }} />
          )}

          <text x={0} y={100} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)">
            {showDissipate ? "Stress Distribuído (Frio Central)" : "Hotspot Concentrado"}
          </text>
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <radialGradient id="heat-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF0000" />
          <stop offset="40%" stopColor="#FF8800" />
          <stop offset="80%" stopColor="#00AA00" />
          <stop offset="100%" stopColor="#0a1628" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* AVISO importante */}
      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        <rect x={W/2-180} y={5} width={360} height={22} rx={5}
          fill="rgba(255,215,0,0.1)" stroke="rgba(255,215,0,0.3)" strokeWidth={1} />
        <text x={W/2} y={20} textAnchor="middle" fill="#FFD700" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>
          ⚠ FEM = Tensão σ_VM [MPa] — NÃO é Topografia [D]
        </text>
      </g>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Legenda von Mises */}
        {showLegend && (
          <g transform={`translate(${W-70},${H/2-60})`}>
            {[1,0.75,0.5,0.25,0].map((v,i)=>(
              <g key={i}>
                <rect x={0} y={i*22} width={16} height={20} fill={vmColor(v)} rx={2} />
                <text x={20} y={i*22+14} fill="rgba(200,220,255,0.7)" fontSize={7.5} fontFamily="var(--font-mono)">
                  {['Alto','','Médio','','Baixo'][i]}
                </text>
              </g>
            ))}
            <text x={8} y={115} textAnchor="middle" fill="rgba(200,220,255,0.5)" fontSize={7} fontFamily="var(--font-mono)">σ_VM</text>
          </g>
        )}

        {/* Painel PRÉ-ICRS */}
        {showPre && (
          <FEMPanel cx={leftCX} cy={CY} R={R} isPost={false} label="Pré-ICRS" />
        )}

        {/* Vetores de deslocamento nodal */}
        {showDisp && showPre && (
          <g opacity={0.7}>
            {[0,1,2,3,4].map(i=>{
              const a = 195+i*15;
              const ar = a*Math.PI/180;
              const r1=R*0.35, r2=R*0.6;
              return (
                <line key={i}
                  x1={leftCX+r1*Math.cos(ar)} y1={CY+r1*Math.sin(ar)}
                  x2={leftCX+r2*Math.cos(ar)} y2={CY+r2*Math.sin(ar)}
                  stroke="rgba(255,200,100,0.8)" strokeWidth={1}
                  markerEnd="url(#disp-arr)" />
              );
            })}
            <defs>
              <marker id="disp-arr" markerWidth={5} markerHeight={5} refX={4} refY={2.5} orient="auto">
                <path d="M0,0 L0,5 L5,2.5 Z" fill="rgba(255,200,100,0.8)" />
              </marker>
            </defs>
            <text x={leftCX} y={CY+R+18} textAnchor="middle"
              fill="rgba(255,200,100,0.6)" fontSize={8} fontFamily="var(--font-mono)">Deslocamentos Nodais</text>
          </g>
        )}

        {/* Divisor */}
        {showPost && (
          <line x1={W/2} y1={30} x2={W/2} y2={H-20}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="5,5" />
        )}

        {/* Painel PÓS-ICRS */}
        {showPost && (
          <FEMPanel cx={rightCX} cy={CY} R={R} isPost={true} label="Pós-ICRS" />
        )}

        {/* Labels analíticos */}
        {showSplit && (
          <g>
            <text x={leftCX} y={CY+R+32} textAnchor="middle"
              fill="rgba(255,68,68,0.7)" fontSize={9} fontFamily="var(--font-mono)">Stress concentrado no ápice IT</text>
            <text x={rightCX} y={CY+R+32} textAnchor="middle"
              fill="rgba(0,204,102,0.7)" fontSize={9} fontFamily="var(--font-mono)">Stress redistribuído → periferia</text>
          </g>
        )}

        {/* Overlay: zona de ganho refrativo */}
        {showOverlay && (
          <g>
            <circle cx={rightCX} cy={CY} r={R*0.4}
              fill="none" stroke="#00CC66" strokeWidth={1.5} strokeDasharray="4,3" opacity={0.6} />
            <text x={rightCX} y={CY+4} textAnchor="middle"
              fill="rgba(0,204,102,0.7)" fontSize={8} fontFamily="var(--font-mono)">Zona de</text>
            <text x={rightCX} y={CY+16} textAnchor="middle"
              fill="rgba(0,204,102,0.7)" fontSize={8} fontFamily="var(--font-mono)">baixo stress</text>
          </g>
        )}
      </g>
    </svg>
  );
}
