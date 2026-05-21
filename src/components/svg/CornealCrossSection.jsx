// CornealCrossSection.jsx — Perfil sagital da córnea (corte transversal) de Alta Qualidade
// Orientação canônica do Atlas: Epitélio TOPO, Endotélio BASE, PIO +Z
import React from 'react';

export function CornealCrossSection({
  width = 400,
  height = 280,
  showLayers = true,
  showIOP = true,
  showDepthGuide = true,
  coneLocation = null, // { x: 0-1, magnitude: 0-1 } para deformação cônica
  ringDepth = 0.72, // 0-1, onde 0=epitélio, 1=endotélio
  showRing = false,
  ringArc = 160, // graus
  children,
}) {
  const cx = width / 2;
  const topY = 30;
  const botY = height - 30;
  const cornH = botY - topY;

  // Camadas da córnea (frações do total)
  const layers = [
    { name: 'Epitélio', frac: 0.10, color: 'url(#grad-epithelium)', border: '#4E80B0' },
    { name: "Bowman's", frac: 0.04, color: '#0E2A45', border: '#2B5A8A' },
    { name: 'Estroma Anterior (Felt)', frac: 0.26, color: 'url(#pattern-anterior-stroma)', border: '#1A3D6E' },
    { name: 'Estroma Posterior', frac: 0.55, color: 'url(#pattern-posterior-stroma)', border: '#0F2E55' },
    { name: 'Endotélio', frac: 0.05, color: 'url(#grad-endothelium)', border: '#0B2040' },
  ];

  // Gerar perfil da córnea com curvatura suave (bezier)
  const cornWidth = width * 0.7;
  const leftX = cx - cornWidth / 2;
  const rightX = cx + cornWidth / 2;
  const sagDepth = 40; // profundidade sagital da curvatura

  // Calcular desvio do cone
  const coneDeform = coneLocation
    ? coneLocation.magnitude * 35
    : 0;
  const coneCX = coneLocation
    ? leftX + coneLocation.x * cornWidth
    : cx;

  // Construir layers como paths
  let accFrac = 0;
  const layerPaths = layers.map((layer, i) => {
    const yTop = topY + accFrac * cornH;
    accFrac += layer.frac;
    const yBot = topY + accFrac * cornH;

    // Adicionar curvatura suave na superfície anterior
    const curvature = i === 0 ? sagDepth : i === 1 ? sagDepth * 0.9 : sagDepth * 0.6;
    // TENTING EXTINTO (Regra Suprema #3): A deformação do cone e do anel não levanta a superfície anterior
    const deform = coneLocation && i >= 2 ? coneDeform * (i * 0.2) : 0;

    return { ...layer, yTop, yBot, curvature, deform };
  });

  // Profundidade do anel em Y absoluto
  const ringY = topY + ringDepth * cornH;

  return (
    <svg width={width} height={height} style={{ display: 'block', filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}>
      <defs>
        {/* Filtros de Glow */}
        <filter id="premium-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="cornea-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.8"/>
        </filter>

        {/* Gradientes para camadas epiteliais e endoteliais */}
        <linearGradient id="grad-epithelium" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A5A8C" />
          <stop offset="100%" stopColor="#1A3A5C" />
        </linearGradient>
        
        <linearGradient id="grad-endothelium" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#081830" />
          <stop offset="100%" stopColor="#020810" />
        </linearGradient>

        <linearGradient id="ring-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,180,220,0.3)" />
          <stop offset="50%" stopColor="rgba(0,180,220,1)" />
          <stop offset="100%" stopColor="rgba(0,180,220,0.3)" />
        </linearGradient>

        {/* Textura Estroma Anterior (Felt-like, fibras entrelaçadas) */}
        <pattern id="pattern-anterior-stroma" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#0B2040" />
          <path d="M0,10 Q5,0 10,10 T20,10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
          <path d="M0,0 Q5,10 10,0 T20,0" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
        </pattern>

        {/* Textura Estroma Posterior (Mais organizado, lamelas paralelas) */}
        <pattern id="pattern-posterior-stroma" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#061224" />
          <line x1="0" y1="5" x2="10" y2="5" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="0" y1="10" x2="10" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
        
        <marker id="pio-arrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill="#FFFFFF" />
        </marker>
      </defs>

      {/* Fundo */}
      <rect width={width} height={height} fill="transparent" />

      {/* Corpo principal com sombra (Group) */}
      <g filter="url(#cornea-shadow)">
        {/* Layers da córnea */}
        {layerPaths.map((layer, i) => {
          const mid = (layer.yTop + layer.yBot) / 2;
          const curv = layer.curvature;

          return (
            <g key={i}>
              <path
                d={`
                  M${leftX},${layer.yTop}
                  Q${coneCX},${layer.yTop - curv + (i < 2 ? layer.deform : 0)} ${rightX},${layer.yTop}
                  L${rightX},${layer.yBot}
                  Q${cx},${layer.yBot - curv * 0.4} ${leftX},${layer.yBot}
                  Z
                `}
                fill={layer.color}
                stroke={layer.border}
                strokeWidth={0.8}
              />
              {showLayers && (
                <text
                  x={rightX + 12}
                  y={mid + 4}
                  fill="rgba(150,180,220,0.9)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                  fontWeight={500}
                >
                  {layer.name}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* Guia de profundidade do anel */}
      {showDepthGuide && (
        <g opacity={0.6}>
          <line
            x1={leftX - 20} y1={ringY}
            x2={rightX + 80} y2={ringY}
            stroke="#FFD700"
            strokeWidth={1.2}
            strokeDasharray="4,4"
            filter="url(#premium-glow)"
          />
          <text
            x={rightX + 12}
            y={ringY + 4}
            fill="#FFD700"
            fontSize={10}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            filter="url(#premium-glow)"
          >
            {Math.round(ringDepth * 100)}% Fulcro
          </text>
        </g>
      )}

      {/* Anel ICRS (Render Premium) */}
      {showRing && (
        <g style={{ transition: 'opacity 0.5s' }}>
          <ellipse
            cx={cx}
            cy={ringY}
            rx={cornWidth * 0.28}
            ry={9}
            fill="url(#ring-glow)"
            stroke="#00B4DC"
            strokeWidth={2}
            filter="url(#premium-glow)"
            opacity={0.8}
          />
          <ellipse cx={cx} cy={ringY} rx={cornWidth * 0.28} ry={9} fill="none" stroke="#FFFFFF" strokeWidth={0.5} opacity={0.5} />
          <text
            x={cx + cornWidth * 0.32}
            y={ringY + 4}
            fill="#00B4DC"
            fontSize={10}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            filter="url(#premium-glow)"
          >
            PMMA ICRS
          </text>
        </g>
      )}

      {/* PIO arrows com glow */}
      {showIOP && (
        <g opacity={0.8} filter="url(#premium-glow)">
          {[-1, 0, 1].map(offset => {
            const ax = cx + offset * 45;
            return (
              <g key={offset}>
                <line
                  x1={ax} y1={botY + 25}
                  x2={ax} y2={topY + 20}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  markerEnd="url(#pio-arrow)"
                />
              </g>
            );
          })}
          <text
            x={cx}
            y={botY + 40}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={11}
            fontFamily="var(--font-mono)"
            fontWeight={700}
          >
            PIO (+Z)
          </text>
        </g>
      )}

      {/* Labels top/bottom com design aprimorado */}
      <text x={cx} y={topY - 12} textAnchor="middle" fill="rgba(200,220,255,0.8)" fontSize={10} fontFamily="var(--font-mono)" fontWeight={600} letterSpacing="1">
        ← ANTERIOR (Epitélio) →
      </text>
      <text x={cx} y={botY + 60} textAnchor="middle" fill="rgba(200,220,255,0.5)" fontSize={10} fontFamily="var(--font-mono)" fontWeight={600} letterSpacing="1">
        ← POSTERIOR (Endotélio) →
      </text>

      {children}
    </svg>
  );
}
