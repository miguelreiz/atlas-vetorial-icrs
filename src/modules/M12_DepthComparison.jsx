// M12_DepthComparison.jsx — Profundidade 60% vs 70-75% vs >80%: O Fulcro Ótimo
import React from 'react';
const W=760, H=400;

export function M12_DepthComparison({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showBreak = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showPanels
  // 3 -> showLabels
  // 4 -> showEffect
  // 5 -> showGraph
  // 6 -> showZones
  // 7 -> showRule
  const showPanels=s>=2, showLabels=s>=3, showEffect=s>=4, showGraph=s>=5, showZones=s>=6, showRule=s>=7;

  const configs = [
    { d:0.60, label:'60%', status:'Risco Extrusão', color:'#FF4444', note:'Leveragem fraca\nEstroma ant. insuficiente' },
    { d:0.72, label:'70–75%', status:'Fulcro Ótimo ✓', color:'#00CC66', note:'Tenda máxima\nÂncora segura 28%' },
    { d:0.84, label:'>80%', status:'Risco Perfuração', color:'#FF4444', note:'Âncora fina\nEfeito reduzido' },
  ];

  const cornTop=50, cornBot=H-100, cornH=cornBot-cornTop;
  const panW=140;
  const positions=[140, 380, 620];

  const CX = W/2;
  const CY = H/2 - 20;

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: A ALAVANCA E A ÂNCORA
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showBreak 
            ? "Se o fulcro for muito raso a pedra escapa, se for muito fundo a alavanca quebra." 
            : "O ponto de apoio (fulcro) define o poder da alavanca."}
        </text>

        <g transform={`translate(${CX}, ${CY + 50})`}>
          {/* Chão */}
          <line x1={-250} y1={20} x2={250} y2={20} stroke="#555" strokeWidth={4} />

          {/* Três Alavancas */}
          <g transform="translate(-180, 0)">
            {/* Raso (Falha) */}
            <polygon points="-10,20 10,20 0,0" fill="#FF4444" />
            <line x1={-30} y1={20} x2={30} y2={-10} stroke="#FFD700" strokeWidth={4} style={{ transform: showBreak ? 'rotate(15deg)' : 'none', transformOrigin: '0px 0px', transition: 'all 0.5s' }} />
            {showBreak && <text x={0} y={-30} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)">Escapa</text>}
          </g>

          <g transform="translate(0, 0)">
            {/* Perfeito */}
            <polygon points="-15,20 15,20 0,-10" fill="#00CC66" />
            <line x1={-40} y1={10} x2={40} y2={-20} stroke="#FFD700" strokeWidth={4} style={{ transform: showBreak ? 'rotate(-10deg)' : 'none', transformOrigin: '0px -10px', transition: 'all 0.5s' }} />
            {showBreak && <text x={0} y={-40} textAnchor="middle" fill="#00CC66" fontSize={12} fontFamily="var(--font-mono)">Levanta a carga</text>}
          </g>

          <g transform="translate(180, 0)">
            {/* Muito fundo (Quebra) */}
            <polygon points="-20,20 20,20 0,-30" fill="#FF4444" />
            <line x1={-50} y1={0} x2={0} y2={-30} stroke="#FFD700" strokeWidth={4} />
            <line x1={0} y1={-30} x2={50} y2={showBreak ? -10 : -40} stroke="#FFD700" strokeWidth={4} style={{ transition: 'all 0.5s' }} />
            {showBreak && <text x={0} y={-50} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)">Quebra a base</text>}
          </g>
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="d12-pio" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill="#FF4444" />
        </marker>
        <marker id="d12-vr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill="#0B3D91" />
        </marker>
      </defs>

      

      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Três painéis */}
        {showPanels && configs.map((cfg, pi) => {
          const pcx = positions[pi];
          const ringY = cornTop + cornH * cfg.d;
          const isOk = pi === 1;
          const halfW = panW/2;

          return (
            <g key={pi}>
              {/* Córnea */}
              {['#1A3A5C','#0B2040','#071828','#040E18'].map((c,li)=>{
                const ys = [cornTop, cornTop+cornH*0.1, cornTop+cornH*0.14, cornTop+cornH*0.7, cornBot];
                return (
                  <rect key={li}
                    x={pcx-halfW} y={ys[li]} width={panW} height={ys[li+1]-ys[li]}
                    fill={c} rx={li===0?4:li===3?4:0}
                  />
                );
              })}

              {/* Linha borda superior */}
              <line x1={pcx-halfW} y1={cornTop} x2={pcx+halfW} y2={cornTop}
                stroke="rgba(0,180,220,0.4)" strokeWidth={1} />

              {/* Anel na profundidade correta */}
              <ellipse cx={pcx} cy={ringY} rx={halfW*0.85} ry={7}
                fill={`${cfg.color}25`} stroke={cfg.color} strokeWidth={2} />

              {/* Linha de profundidade */}
              <line x1={pcx-halfW-15} y1={ringY} x2={pcx+halfW+15} y2={ringY}
                stroke={cfg.color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.6} />
              <text x={pcx+halfW+17} y={ringY+4}
                fill={cfg.color} fontSize={8} fontFamily="var(--font-mono)">{cfg.label}</text>

              {/* Zona anterior (leveragem) */}
              {showEffect && (
                <g>
                  <rect x={pcx-halfW} y={cornTop} width={panW} height={ringY-cornTop}
                    fill={isOk?"rgba(0,204,102,0.06)":"rgba(255,68,68,0.04)"} />
                  <text x={pcx} y={(cornTop+ringY)/2+4}
                    textAnchor="middle" fill={isOk?"rgba(0,204,102,0.5)":"rgba(140,100,100,0.5)"}
                    fontSize={7} fontFamily="var(--font-mono)">
                    {Math.round(cfg.d*100)}% ant.
                  </text>
                </g>
              )}

              {/* Zona posterior (âncora) */}
              {showEffect && (
                <g>
                  <rect x={pcx-halfW} y={ringY+8} width={panW} height={cornBot-ringY-8}
                    fill={isOk?"rgba(0,180,220,0.06)":"rgba(255,68,68,0.04)"} />
                  <text x={pcx} y={(ringY+cornBot)/2+4}
                    textAnchor="middle" fill={isOk?"rgba(0,180,220,0.5)":"rgba(140,100,100,0.5)"}
                    fontSize={7} fontFamily="var(--font-mono)">
                    {Math.round((1-cfg.d)*100)}% post.
                  </text>
                </g>
              )}

              {/* PIO arrows */}
              {showEffect && (
                <g opacity={0.6}>
                  {[-1,0,1].map(i=>(
                    <line key={i}
                      x1={pcx+i*25} y1={cornBot+22}
                      x2={pcx+i*25} y2={cornBot+7}
                      stroke="#FF4444" strokeWidth={1.2} markerEnd="url(#d12-pio)" />
                  ))}
                </g>
              )}

              {/* Labels */}
              {showLabels && (
                <g>
                  <text x={pcx} y={cornTop-16} textAnchor="middle"
                    fill={cfg.color} fontSize={11} fontWeight={700} fontFamily="var(--font-mono)">
                    {cfg.label}
                  </text>
                  <text x={pcx} y={cornTop-4} textAnchor="middle"
                    fill={cfg.color} fontSize={7.5} fontFamily="var(--font-mono)">
                    {cfg.status}
                  </text>
                </g>
              )}

              {/* Nota */}
              {showEffect && (
                <text x={pcx} y={cornBot+40} textAnchor="middle"
                  fill="rgba(160,180,210,0.6)" fontSize={7.5} fontFamily="var(--font-mono)">
                  {cfg.note.split('\n')[0]}
                </text>
              )}
            </g>
          );
        })}

        {/* Gráfico ΔK vs profundidade */}
        {showGraph && (
          <g transform={`translate(${W/2-80},${H-80})`}>
            <rect width={160} height={60} rx={6}
              fill="rgba(8,14,30,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            {/* Curva em sino */}
            <path d="M10,50 Q30,45 50,15 Q80,2 110,15 Q130,28 150,48"
              fill="none" stroke="#00CC66" strokeWidth={2} />
            <line x1={80} y1={2} x2={80} y2={55}
              stroke="#00CC66" strokeWidth={1} strokeDasharray="2,2" opacity={0.5} />
            <text x={80} y={58} textAnchor="middle"
              fill="rgba(0,204,102,0.7)" fontSize={7} fontFamily="var(--font-mono)">70–75% = ΔK máximo</text>
            <text x={10} y={58} fill="rgba(160,180,210,0.4)" fontSize={6} fontFamily="var(--font-mono)">60%</text>
            <text x={140} y={58} textAnchor="end" fill="rgba(160,180,210,0.4)" fontSize={6} fontFamily="var(--font-mono)">85%</text>
          </g>
        )}

        {/* Zonas de risco */}
        {showZones && (
          <g>
            {[
              {x:positions[0], label:'Zona Extrusão', color:'#FF4444'},
              {x:positions[1], label:'Zona Segura', color:'#00CC66'},
              {x:positions[2], label:'Zona Perfuração', color:'#FF4444'},
            ].map((z,i)=>(
              <text key={i} x={z.x} y={H-8} textAnchor="middle"
                fill={z.color} fontSize={7.5} fontFamily="var(--font-mono)" fontWeight={600}>
                {z.label}
              </text>
            ))}
          </g>
        )}

        {/* Regra final */}
        {showRule && (
          <g>
            <rect x={W/2-155} y={cornTop-2} width={310} height={20} rx={5}
              fill="rgba(0,204,102,0.08)" stroke="rgba(0,204,102,0.2)" strokeWidth={1} />
            <text x={W/2} y={cornTop+13} textAnchor="middle"
              fill="rgba(0,204,102,0.8)" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>
              Regra: 70–75% alvo · Máx admissível 80% · Mín seguro 65%
            </text>
          </g>
        )}

        <text x={W/2} y={18} textAnchor="middle" fill="rgba(200,220,255,0.4)" fontSize={9} fontFamily="var(--font-mono)">
          O Fulcro Ótimo — Profundidade de Implante e Eficácia Biomecânica
        </text>
      </g>
    </svg>
  );
}
