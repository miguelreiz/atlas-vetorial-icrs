// M05_PoissonCoupling.jsx — Efeito de Poisson + Acoplamento
import React from 'react';
const W=760, H=400;

export function M05_PoissonCoupling({ scene }) {
  const s = scene + 2;
  // Analogies disabled via s shift
  const showAnalogy = false;
  const showSquish = s === 1;

  // Cornea scene shifts:
  // 0, 1 -> Analogy
  // 2 -> showBlock
  // 3 -> showExpand
  // 4 -> showEqP
  // 5 -> showMap
  // 6 -> showCoupling
  // 7 -> showTable
  const showBlock=s>=2, showExpand=s>=3, showEqP=s>=4;
  const showMap=s>=5, showCoupling=s>=6, showTable=s>=7;

  const leftCX=180, rightCX=560, CY=H/2-10;
  
  // Animação de compressão e expansão ativada na cena 1
  const isAnimating = showExpand;
  
  const blockH=120, blockW=80;
  const bh = showExpand ? blockH * 0.75 : blockH;
  const bw = showExpand ? blockW * 1.25 : blockW;

  const renderAnalogy = () => {
    return (
      <g style={{ transition: 'opacity 0.5s' }} opacity={showAnalogy ? 1 : 0}>
        <text x={W/2} y={50} textAnchor="middle" fill="#00B4DC" fontSize={18} fontFamily="var(--font-mono)" fontWeight={700}>
          ANALOGIA FÍSICA: O BALÃO D'ÁGUA
        </text>
        <text x={W/2} y={75} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="var(--font-sans)">
          {showSquish 
            ? "Apertar um eixo obriga o material incompressível a inchar no eixo perpendicular." 
            : "Um balão d'água possui volume fixo."}
        </text>

        <g transform={`translate(${W/2}, ${CY + 20})`}>
          {/* Balão */}
          <ellipse cx={0} cy={0} rx={showSquish ? 100 : 70} ry={showSquish ? 40 : 70} 
            fill="rgba(0,180,220,0.5)" stroke="#00B4DC" strokeWidth={3} 
            style={{ transition: 'all 1s ease-in-out' }} />
            
          {/* Top knot */}
          <path d="M-10,-70 L10,-70 L0,-85 Z" fill="#00B4DC" style={{ transition: 'transform 1s ease-in-out', transform: `translateY(${showSquish ? 30 : 0}px)` }} />

          {/* Mão / Pressão cima */}
          {showSquish && (
             <g style={{ transition: 'opacity 1s', opacity: 1 }}>
               <line x1={0} y1={-100} x2={0} y2={-50} stroke="#FF4444" strokeWidth={4} markerEnd="url(#p5-comp)" />
               <line x1={0} y1={100} x2={0} y2={50} stroke="#FF4444" strokeWidth={4} markerEnd="url(#p5-comp)" />
               <text x={0} y={-110} textAnchor="middle" fill="#FF4444" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Esmagamento</text>
             </g>
          )}

          {/* Expansão lateral */}
          {showSquish && (
             <g style={{ transition: 'opacity 1s', transitionDelay: '0.5s' }}>
               <line x1={-80} y1={0} x2={-130} y2={0} stroke="#00CC66" strokeWidth={4} markerEnd="url(#p5-exp)" />
               <line x1={80} y1={0} x2={130} y2={0} stroke="#00CC66" strokeWidth={4} markerEnd="url(#p5-exp)" />
               <text x={-140} y={5} textAnchor="end" fill="#00CC66" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Expansão</text>
               <text x={140} y={5} textAnchor="start" fill="#00CC66" fontSize={12} fontFamily="var(--font-mono)" fontWeight={700}>Expansão</text>
             </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth:'100%', maxHeight:'100%' }}>
      <defs>
        <marker id="p5-comp" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#FF4444" />
        </marker>
        <marker id="p5-exp" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill="#00CC66" />
        </marker>
      </defs>

      

      {/* CENA DA CÓRNEA / ACOPLAMENTO */}
      <g style={{ transition: 'opacity 0.5s', opacity: !showAnalogy ? 1 : 0 }}>
        {/* Divisor */}
        <line x1={W/2} y1={20} x2={W/2} y2={H-20}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="5,5" />

        {/* ===== ESQUERDA: EFEITO DE POISSON ===== */}
        <text x={leftCX} y={30} textAnchor="middle" fill="#00B4DC" fontSize={12}
          fontWeight={700} fontFamily="var(--font-mono)">Efeito de Poisson (Balão d'Água)</text>

        {showBlock && (
          <g transform={`translate(${leftCX},${CY})`}>
            {/* Bloco de tecido */}
            <rect x={-bw/2} y={-bh/2} width={bw} height={bh} fill="rgba(7,24,40,0.9)"
              stroke="rgba(0,180,220,0.5)" strokeWidth={2} rx={12}>
              {isAnimating && (
                <animate attributeName="height" values={`${blockH};${blockH*0.75};${blockH}`} dur="2s" repeatCount="indefinite" />
              )}
              {isAnimating && (
                <animate attributeName="y" values={`${-blockH/2};${-blockH*0.75/2};${-blockH/2}`} dur="2s" repeatCount="indefinite" />
              )}
              {isAnimating && (
                <animate attributeName="width" values={`${blockW};${blockW*1.25};${blockW}`} dur="2s" repeatCount="indefinite" />
              )}
              {isAnimating && (
                <animate attributeName="x" values={`${-blockW/2};${-blockW*1.25/2};${-blockW/2}`} dur="2s" repeatCount="indefinite" />
              )}
            </rect>

            {/* Símbolo do "Módulo de Compressibilidade" */}
            <circle cx="0" cy="0" r={15} fill="rgba(0,180,220,0.1)" stroke="rgba(0,180,220,0.3)" />
            <text x="0" y="4" textAnchor="middle" fill="rgba(0,180,220,0.8)" fontSize={10} fontFamily="var(--font-mono)">ν</text>
          </g>
        )}

        {/* Setas de compressão (PIO) E Expansão */}
        {showExpand && (
          <g>
            {/* Seta PIO (Compressão) para BAIXO (com animação) */}
            <line x1={leftCX} y1={CY-blockH/2-40}
              x2={leftCX} y2={CY-blockH/2-10}
              stroke="#FF4444" markerEnd="url(#p5-comp)">
              <animate attributeName="y2" values={`${CY-blockH/2-10};${CY-blockH*0.75/2-5};${CY-blockH/2-10}`} dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1;4;1" dur="2s" repeatCount="indefinite" />
            </line>

            {/* Seta PIO (Compressão) para CIMA (com animação) */}
            <line x1={leftCX} y1={CY+blockH/2+40}
              x2={leftCX} y2={CY+blockH/2+10}
              stroke="#FF4444" markerEnd="url(#p5-comp)">
              <animate attributeName="y2" values={`${CY+blockH/2+10};${CY+blockH*0.75/2+5};${CY+blockH/2+10}`} dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1;4;1" dur="2s" repeatCount="indefinite" />
            </line>

            {/* Seta expansão lateral esquerda */}
            <line x1={leftCX-blockW/2-5} y1={CY}
              x2={leftCX-blockW/2-35} y2={CY}
              stroke="#00CC66" markerEnd="url(#p5-exp)"
              style={{ transform: 'scaleX(-1)', transformOrigin: `${leftCX}px ${CY}px` }}>
              <animate attributeName="x1" values={`${leftCX-blockW/2-5};${leftCX-blockW*1.25/2-5};${leftCX-blockW/2-5}`} dur="2s" repeatCount="indefinite" />
              <animate attributeName="x2" values={`${leftCX-blockW/2-35};${leftCX-blockW*1.25/2-35};${leftCX-blockW/2-35}`} dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1;3;1" dur="2s" repeatCount="indefinite" />
            </line>
            
            {/* Seta expansão lateral direita */}
            <line x1={leftCX+blockW/2+5} y1={CY}
              x2={leftCX+blockW/2+35} y2={CY}
              stroke="#00CC66" markerEnd="url(#p5-exp)">
              <animate attributeName="x1" values={`${leftCX+blockW/2+5};${leftCX+blockW*1.25/2+5};${leftCX+blockW/2+5}`} dur="2s" repeatCount="indefinite" />
              <animate attributeName="x2" values={`${leftCX+blockW/2+35};${leftCX+blockW*1.25/2+35};${leftCX+blockW/2+35}`} dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1;3;1" dur="2s" repeatCount="indefinite" />
            </line>

            <text x={leftCX} y={CY-blockH/2-45} textAnchor="middle"
              fill="#FF4444" fontSize={11} fontFamily="var(--font-mono)" fontWeight={700}>
               <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
               Compressão (K flat)
            </text>
            
            <text x={leftCX+blockW/2+45} y={CY+15}
              fill="#00CC66" fontSize={10} fontFamily="var(--font-mono)" fontWeight={700}>
              <animate attributeName="x" values={`${leftCX+blockW/2+45};${leftCX+blockW*1.25/2+45};${leftCX+blockW/2+45}`} dur="2s" repeatCount="indefinite" />
              Expansão (K steep)
            </text>
          </g>
        )}

        {/* Equação Poisson */}
        {showEqP && (
          <g>
            <rect x={leftCX-130} y={CY+bh/2+45} width={260} height={52} rx={7}
              fill="rgba(11,61,145,0.12)" stroke="rgba(11,61,145,0.35)" strokeWidth={1} />
            <text x={leftCX} y={CY+bh/2+64} textAnchor="middle"
              fill="#A8C4F0" fontSize={10} fontFamily="var(--font-mono)">ν = −ε_lat / ε_axial ≈ 0.49</text>
            <text x={leftCX} y={CY+bh/2+82} textAnchor="middle"
              fill="rgba(168,196,240,0.7)" fontSize={8.5} fontFamily="var(--font-mono)">Córnea incompressível: volume fixo</text>
          </g>
        )}

        {/* ===== DIREITA: EFEITO DE ACOPLAMENTO ===== */}
        <text x={rightCX} y={30} textAnchor="middle" fill="#00B4DC" fontSize={12}
          fontWeight={700} fontFamily="var(--font-mono)">Acoplamento Refrativo Topográfico</text>

        {showMap && (
          <g>
            {/* Mapa topográfico simplificado (círculos coloridos) */}
            {[0.9,0.75,0.55,0.38,0.22].map((r,i) => {
              const col = ['#FF0000','#FF8000','#FFFF00','#00BFFF','#0000FF'][i];
              return <circle key={i} cx={rightCX} cy={CY-20} r={r*90}
                fill="none" stroke={col} strokeWidth={showCoupling?2.5:1.5} opacity={0.7} />;
            })}

            {/* Anel posicionado inferior */}
            {showCoupling && (
              <path d={`M${rightCX-60},${CY+50} A70,70 0 0,0 ${rightCX+60},${CY+50}`}
                fill="none" stroke="#00B4DC" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
            )}

            {/* Meridiano K flat (inferior) — Compressão */}
            {showCoupling && (
              <g>
                <line x1={rightCX} y1={CY-20-90} x2={rightCX} y2={CY-20+90}
                  stroke="#0000FF" strokeWidth={2} strokeDasharray="6,3" opacity={0.7} />
                <text x={rightCX+5} y={CY-20-94} fill="#0000FF" fontSize={8} fontFamily="var(--font-mono)">K₁ Achatado (Squeezed)</text>
                {/* Setas indicando compressão vinda do anel */}
                <line x1={rightCX} y1={CY+65} x2={rightCX} y2={CY+30} stroke="#FF4444" strokeWidth={2} markerEnd="url(#p5-comp)">
                   <animate attributeName="stroke-width" values="1;3;1" dur="2s" repeatCount="indefinite" />
                </line>
              </g>
            )}
            {/* Meridiano K steep (horizontal) — Expansão */}
            {showCoupling && (
              <g>
                <line x1={rightCX-90} y1={CY-20} x2={rightCX+90} y2={CY-20}
                  stroke="#FF0000" strokeWidth={2} strokeDasharray="6,3" opacity={0.7} />
                <text x={rightCX+92} y={CY-16} fill="#FF0000" fontSize={8} fontFamily="var(--font-mono)">K₂ Íngreme (Bulged)</text>
                {/* Setas indicando expansão saindo */}
                <line x1={rightCX-60} y1={CY-20} x2={rightCX-90} y2={CY-20} stroke="#00CC66" strokeWidth={2} markerEnd="url(#p5-exp)">
                   <animate attributeName="stroke-width" values="1;3;1" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1={rightCX+60} y1={CY-20} x2={rightCX+90} y2={CY-20} stroke="#00CC66" strokeWidth={2} markerEnd="url(#p5-exp)">
                   <animate attributeName="stroke-width" values="1;3;1" dur="2s" repeatCount="indefinite" />
                </line>
              </g>
            )}

            {/* Seta coupling */}
            {showCoupling && (
              <text x={rightCX} y={H-80} textAnchor="middle"
                fill="rgba(0,180,220,0.8)" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>
                Aperta de um lado → Incha do outro
              </text>
            )}
          </g>
        )}

        {/* Tabela K1/K2/SE */}
        {showTable && (
          <g transform={`translate(${rightCX-120},${H-72})`}>
            <rect width={240} height={58} rx={7}
              fill="rgba(8,14,30,0.95)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            {[
              ['','Pré','Pós','Δ'],
              ['K₁ (flat)','44.0','42.5','−1.5 D'],
              ['K₂ (steep)','47.5','48.8','+1.3 D'],
              ['SE','−1.75','−0.75','+1.0 D'],
            ].map((row,ri) => (
              row.map((cell,ci) => (
                <text key={`${ri}-${ci}`}
                  x={8+ci*57} y={14+ri*14}
                  fill={ri===0?'rgba(200,220,255,0.5)':ci===3?['','#0000FF','#FF0000','#00CC66'][ri]:'var(--text-secondary)'}
                  fontSize={ri===0?7.5:8.5} fontFamily="var(--font-mono)"
                  fontWeight={ri===0||ci===0?600:400}>
                  {cell}
                </text>
              ))
            ))}
            <text x={120} y={54} textAnchor="middle" fill="rgba(0,180,220,0.6)" fontSize={7.5} fontFamily="var(--font-mono)">
              CR = ΔK_flat/ΔK_steep ≈ 1.15
            </text>
          </g>
        )}
      </g>
    </svg>
  );
}
