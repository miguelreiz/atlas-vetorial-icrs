// M06_VT_AxisRotation.jsx — VT e Rotação do Eixo Astigmático
import React from 'react';
const W=760, H=400, CX=W/2, CY=H/2;

export function M06_VT_AxisRotation({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showCorset = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showAxis
  // 3 -> showRing
  // 4 -> showVT
  // 5 -> showRotation
  // 6 -> showCompare
  const showAxis=s>=2, showRing=s>=3, showVT=s>=4, showRotation=s>=5, showCompare=s>=6;
  const axisAngle = showRotation ? -15 : 25; // eixo astigmático rotaciona

  const toRad = d => d*Math.PI/180;
  const R=130, ringR=R*0.55;

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: O ESPARTILHO
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showCorset 
            ? "Ao tensionar as cordas, a força circunferencial centraliza e arredonda a forma." 
            : "Uma forma ovalada e irregular."}
        </text>

        <g transform={`translate(${CX}, ${CY + 10})`}>
          {/* Forma (Corpo) */}
          <ellipse cx={0} cy={0} rx={showCorset ? 80 : 100} ry={showCorset ? 80 : 120} 
            fill="rgba(0,180,220,0.2)" stroke="#00B4DC" strokeWidth={3} 
            style={{ transition: 'all 1s ease-in-out' }} />

          {/* Cordinhas do Espartilho */}
          {showCorset && (
            <g style={{ transition: 'opacity 1s', transitionDelay: '0.5s' }} opacity={1}>
              {/* Amarra central */}
              <path d="M-60,-40 Q0,0 60,40 M-60,40 Q0,0 60,-40" fill="none" stroke="#FFD700" strokeWidth={4} />
              <path d="M-60,-20 Q0,-40 60,-20 M-60,20 Q0,40 60,20" fill="none" stroke="#FFD700" strokeWidth={4} />
              <path d="M-60,-60 Q0,-80 60,-60 M-60,60 Q0,80 60,60" fill="none" stroke="#FFD700" strokeWidth={4} />
              
              {/* Setas de força circunferencial */}
              <path d="M -90,-20 A 90,90 0 0,1 -90,20" fill="none" stroke="#00CC66" strokeWidth={4} markerEnd="url(#vt-arr-green)" />
              <path d="M 90,-20 A 90,90 0 0,0 90,20" fill="none" stroke="#00CC66" strokeWidth={4} markerEnd="url(#vt-arr-green)" />
              
              <text x={0} y={110} textAnchor="middle" fill="#00CC66" fontSize={14} fontFamily="var(--font-mono)" fontWeight={700}>Tração Circunferencial (VT)</text>
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="vt-arr" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#00B4DC" />
        </marker>
        <marker id="vt-arr-green" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#00CC66" />
        </marker>
        <marker id="axis-arr" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="#FF66FF" />
        </marker>
      </defs>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Córnea */}
        <circle cx={CX} cy={CY} r={R} fill="rgba(7,24,40,0.9)" stroke="rgba(0,180,220,0.2)" strokeWidth={1.5} />

        {/* Mires de Plácido */}
        {[0.3,0.5,0.7,0.9].map((r,i) => (
          <ellipse key={i} cx={CX} cy={CY}
            rx={r*R} ry={r*R*(showCompare||showRotation?0.75:0.85)}
            fill="none" stroke={`rgba(80,120,180,${0.4-i*0.05})`} strokeWidth={1} style={{ transition: 'ry 1s ease-in-out' }} />
        ))}

        {/* Eixo astigmático ANTES */}
        {showAxis && (
          <g>
            <line x1={CX-R*Math.cos(toRad(25+90))} y1={CY-R*Math.sin(toRad(25+90))}
              x2={CX+R*Math.cos(toRad(25+90))} y2={CY+R*Math.sin(toRad(25+90))}
              stroke="#FF66FF" strokeWidth={1.5} strokeDasharray="7,4" opacity={showRotation ? 0.2 : 0.7} style={{ transition: 'opacity 1s ease-in-out' }} />
            <text x={CX+R*Math.cos(toRad(25+90))+8} y={CY+R*Math.sin(toRad(25+90))+4}
              fill="#FF66FF" fontSize={8} fontFamily="var(--font-mono)" opacity={showRotation ? 0.2 : 1}>K-steep 115°</text>
          </g>
        )}

        {/* Anel ICRS (arco de 160°) */}
        {showRing && (
          <path
            d={`M${CX+ringR*Math.cos(toRad(10))},${CY+ringR*Math.sin(toRad(10))} A${ringR},${ringR} 0 1,1 ${CX+ringR*Math.cos(toRad(350))},${CY+ringR*Math.sin(toRad(350))}`}
            fill="none" stroke="#00B4DC" strokeWidth={7} strokeLinecap="round" opacity={0.35} />
        )}

        {/* VT arrows ao longo do anel */}
        {showVT && (
          <g>
            {[40, 90, 140, 200, 250, 300].map((a, i) => {
              const ar = toRad(a);
              const tx = CX + ringR*Math.cos(ar);
              const ty = CY + ringR*Math.sin(ar);
              const ta = ar + Math.PI/2;
              const l=14;
              return (
                <line key={i}
                  x1={tx-Math.cos(ta)*l/2} y1={ty-Math.sin(ta)*l/2}
                  x2={tx+Math.cos(ta)*l/2} y2={ty+Math.sin(ta)*l/2}
                  stroke="#00B4DC" strokeWidth={1.5} markerEnd="url(#vt-arr)" />
              );
            })}
            <text x={CX} y={CY-ringR-14} textAnchor="middle"
              fill="#00B4DC" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>VT</text>
          </g>
        )}

        {/* Eixo APÓS rotação */}
        {showRotation && (
          <g>
            <line x1={CX-R*Math.cos(toRad(0+90))} y1={CY-R*Math.sin(toRad(0+90))}
              x2={CX+R*Math.cos(toRad(0+90))} y2={CY+R*Math.sin(toRad(0+90))}
              stroke="#00CC66" strokeWidth={2} />
            <text x={CX+R*Math.cos(toRad(90))+8} y={CY+R*Math.sin(toRad(90))+4}
              fill="#00CC66" fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>K 90° ✓</text>
            <text x={CX} y={H-30} textAnchor="middle"
              fill="rgba(0,204,102,0.8)" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>
              Eixo ortogonalizado → Astigmatismo regular
            </text>
          </g>
        )}

        {/* Comparação arcos */}
        {showCompare && (
          <g>
            {[{a:90,c:'#FFD700',l:'90°'},{a:160,c:'#00B4DC',l:'160°'},{a:210,c:'#00CC66',l:'210°'}].map((item,i) => (
              <g key={i} transform={`translate(${W-200+i*0},${50+i*30})`}>
                <line x1={0} y1={8} x2={20} y2={8} stroke={item.c} strokeWidth={3} />
                <text x={24} y={12} fill={item.c} fontSize={8} fontFamily="var(--font-mono)">{item.l} arco → ΔAxis {[12,22,35][i]}°</text>
              </g>
            ))}
          </g>
        )}

        <text x={CX} y={18} textAnchor="middle" fill="rgba(200,220,255,0.4)" fontSize={9} fontFamily="var(--font-mono)">
          Vista Superior — VT e Rotação do Eixo Astigmático
        </text>
      </g>
    </svg>
  );
}
