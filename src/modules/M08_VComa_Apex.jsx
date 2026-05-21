// M08_VComa_Apex.jsx — VComa: Centralização do Ápice (Resultante Óptica)
import React from 'react';
const W=760, H=400, CX=W/2, CY=H/2;
const toRad = d => d*Math.PI/180;

export function M08_VComa_Apex({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const moveTree = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showApex
  // 3 -> showAxes
  // 4 -> showMigration
  // 5 -> showVComa
  // 6 -> showGraph
  const showApex=s>=2, showAxes=s>=3, showMigration=s>=4, showVComa=s>=5, showGraph=s>=6;
  const R=130, IT=toRad(240);

  const apexPreX = CX+R*0.48*Math.cos(IT);
  const apexPreY = CY+R*0.48*Math.sin(IT);
  const apexPostX = CX+R*0.12*Math.cos(toRad(260));
  const apexPostY = CY+R*0.12*Math.sin(toRad(260));

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: A SOMBRA DA ÁRVORE
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {moveTree 
            ? "Mover a árvore muda a posição da sombra. VComa não é força, é a sombra óptica." 
            : "Você não empurra a sombra, você move o objeto (ápice)."}
        </text>

        <g transform={`translate(${CX}, ${CY + 50})`}>
          {/* Chão */}
          <line x1={-200} y1={20} x2={200} y2={20} stroke="#555" strokeWidth={4} />

          {/* Sol (Luz) */}
          <circle cx={-150} cy={-120} r={15} fill="#FFD700" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <line key={a} x1={-150+20*Math.cos(toRad(a))} y1={-120+20*Math.sin(toRad(a))} 
              x2={-150+28*Math.cos(toRad(a))} y2={-120+28*Math.sin(toRad(a))} stroke="#FFD700" strokeWidth={2} />
          ))}

          {/* Árvore e sombra animadas */}
          <g style={{ transition: 'transform 1.5s ease-in-out', transform: `translateX(${moveTree ? -80 : 80}px)` }}>
            {/* Tronco */}
            <rect x={-10} y={-40} width={20} height={60} fill="#8B4513" rx={3} />
            {/* Copa */}
            <circle cx={0} cy={-60} r={40} fill="#00CC66" />
            <circle cx={-20} cy={-40} r={30} fill="#00AA55" />
            <circle cx={20} cy={-40} r={30} fill="#00AA55" />
            
            {/* Sombra (projetada baseada no sol à esquerda) */}
            <path d="M-10,20 L120,20 L160,0 L120,-20 Z" fill="rgba(0,0,0,0.4)" style={{ transform: 'skewX(45deg)', transformOrigin: '0 20px' }} />
          </g>

          {/* Label Sombra */}
          {moveTree && (
            <text x={-20} y={40} fill="rgba(255,255,255,0.5)" fontSize={12} fontFamily="var(--font-mono)" style={{ transition: 'opacity 1s', opacity: 1 }}>Sombra (Coma) movida</text>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="vcoma-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#FF66FF" />
        </marker>
        <marker id="migration-arr" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#00CC66" />
        </marker>
      </defs>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Córnea */}
        <circle cx={CX} cy={CY} r={R} fill="rgba(7,24,40,0.9)" stroke="rgba(100,140,200,0.2)" strokeWidth={1.5} />

        {/* Mires Plácido */}
        {[0.3,0.5,0.7].map((r,i) => (
          <circle key={i} cx={CX} cy={CY} r={r*R}
            fill="none" stroke={`rgba(60,100,160,${0.3-i*0.05})`} strokeWidth={1} />
        ))}

        {/* Eixo óptico (vertical, branco) */}
        {showAxes && (
          <g>
            <line x1={CX} y1={CY-R-10} x2={CX} y2={CY+R+10}
              stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} strokeDasharray="5,3" />
            <text x={CX+5} y={CY-R-12} fill="rgba(255,255,255,0.6)" fontSize={8} fontFamily="var(--font-mono)">Eixo Visual</text>
          </g>
        )}

        {/* Eixo Zernike (coma axis — magenta) */}
        {showAxes && (
          <g>
            <line x1={CX+R*Math.cos(IT-Math.PI/2)} y1={CY+R*Math.sin(IT-Math.PI/2)}
              x2={CX+R*Math.cos(IT+Math.PI/2)} y2={CY+R*Math.sin(IT+Math.PI/2)}
              stroke="#FF66FF" strokeWidth={1.5} strokeDasharray="6,4" />
            <text x={CX+R*Math.cos(IT-Math.PI/2)+5} y={CY+R*Math.sin(IT-Math.PI/2)+3}
              fill="#FF66FF" fontSize={8} fontFamily="var(--font-mono)">Eixo Coma Z₃¹</text>
          </g>
        )}

        {/* Ápice PRÉ (vermelho) */}
        {showApex && (
          <g>
            <circle cx={apexPreX} cy={apexPreY} r={10}
              fill="rgba(255,68,68,0.2)" stroke="#FF4444" strokeWidth={1.5} />
            <circle cx={apexPreX} cy={apexPreY} r={4} fill="#FF4444" />
            <text x={apexPreX+14} y={apexPreY+4}
              fill="#FF4444" fontSize={8} fontFamily="var(--font-mono)">Ápice KC</text>
          </g>
        )}

        {/* Migração do ápice */}
        {showMigration && (
          <g>
            <line x1={apexPreX} y1={apexPreY}
              x2={apexPostX} y2={apexPostY}
              stroke="#00CC66" strokeWidth={2} strokeDasharray="4,3"
              markerEnd="url(#migration-arr)" />
            <circle cx={apexPostX} cy={apexPostY} r={9}
              fill="rgba(0,204,102,0.2)" stroke="#00CC66" strokeWidth={1.5} />
            <circle cx={apexPostX} cy={apexPostY} r={3} fill="#00CC66" />
            <text x={apexPostX+12} y={apexPostY+4}
              fill="#00CC66" fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>Ápice Pós-ICRS</text>
          </g>
        )}

        {/* VComa vector */}
        {showVComa && (
          <g>
            <line x1={CX} y1={CY}
              x2={apexPostX} y2={apexPostY}
              stroke="#FF66FF" strokeWidth={2.5}
              markerEnd="url(#vcoma-arr)" />
            <text x={CX-50} y={CY-20}
              fill="#FF66FF" fontSize={11} fontFamily="var(--font-mono)" fontWeight={700}>VComa</text>
            <text x={CX-50} y={CY-6}
              fill="rgba(255,102,255,0.7)" fontSize={8} fontFamily="var(--font-mono)">= Resultante óptica de Vτ</text>
            <rect x={W-240} y={20} width={225} height={44} rx={7}
              fill="rgba(255,102,255,0.08)" stroke="rgba(255,102,255,0.25)" strokeWidth={1} />
            <text x={W-130} y={40} textAnchor="middle"
              fill="rgba(255,102,255,0.9)" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>
              VComa ≠ Força Primária
            </text>
            <text x={W-130} y={56} textAnchor="middle"
              fill="rgba(255,102,255,0.6)" fontSize={8} fontFamily="var(--font-mono)">
              É resultante óptica do Vτ (Zernike Z₃¹)
            </text>
          </g>
        )}

        {/* Gráfico coma pré/pós */}
        {showGraph && (
          <g transform={`translate(10,${H-90})`}>
            <rect width={180} height={78} rx={7}
              fill="rgba(8,14,30,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            {[['Pré-ICRS','Coma','0.58 μm','#FF4444'],
              ['Pós-ICRS','Coma','0.21 μm','#00CC66'],
              ['Redução','-63%','','#FFD700']].map(([l,t,v,c],i) => (
              <g key={i}>
                <text x={8} y={20+i*20} fill="rgba(180,200,230,0.6)" fontSize={8} fontFamily="var(--font-mono)">{l}</text>
                <text x={80} y={20+i*20} fill={c} fontSize={8} fontFamily="var(--font-mono)" fontWeight={600}>{t}</text>
                <text x={130} y={20+i*20} fill={c} fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>{v}</text>
              </g>
            ))}
            {/* Barras */}
            <rect x={8} y={65} width={65} height={8} fill="#FF4444" opacity={0.7} rx={2} />
            <rect x={8} y={65} width={24} height={8} fill="#00CC66" opacity={0.9} rx={2} />
          </g>
        )}

        <text x={CX} y={18} textAnchor="middle" fill="rgba(200,220,255,0.4)" fontSize={9} fontFamily="var(--font-mono)">
          VComa — Centralização do Ápice Cônico
        </text>
      </g>
    </svg>
  );
}
