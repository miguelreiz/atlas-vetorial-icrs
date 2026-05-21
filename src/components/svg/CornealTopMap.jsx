// CornealTopMap.jsx — Vista superior da córnea (mapa topográfico) Alta Precisão
// Segue orientação canônica do Atlas: 0–360°, ápice infero-temporal
import React from 'react';

export function CornealTopMap({
  width = 360,
  height = 360,
  showGrid = true,
  showSectors = false,
  showApex = false,
  apexAngle = 240, // graus, padrão infero-temporal
  showRing = false,
  ringRadius = 0.35, // fração do raio total
  ringArcStart = 30,
  ringArcEnd = 270,
  ringColor = '#00B4DC',
  showHeatmap = false,
  heatmapType = 'normal', // 'normal' | 'kc'
  children,
}) {
  const cx = width / 2;
  const cy = height / 2;
  const R = Math.min(width, height) / 2 - 20;

  // Zonas de heatmap para KC (densidade fibrilar)
  const heatmapZones = heatmapType === 'kc' ? [
    { angle: 240, spread: 60, color: 'rgba(255,68,68,0.5)', label: 'Gap IT\n−44%' },
    { angle: 0, spread: 30, color: 'rgba(0,180,220,0.2)', label: 'NT' },
    { angle: 90, spread: 30, color: 'rgba(0,180,220,0.2)', label: 'SI' },
  ] : [];

  // Gerar mires de Plácido
  const mireRadii = [0.2, 0.35, 0.5, 0.65, 0.8];

  // Posição do ápice
  const apexRad = (apexAngle * Math.PI) / 180;
  const apexR = 0.5;
  const apexX = cx + apexR * R * Math.cos(apexRad);
  const apexY = cy + apexR * R * Math.sin(apexRad);

  // Ring arc path
  const getRingPath = () => {
    const r = ringRadius * R;
    const startRad = (ringArcStart * Math.PI) / 180;
    const endRad = (ringArcEnd * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const sweep = (ringArcEnd - ringArcStart) > 180 ? 1 : 0;
    return `M${x1},${y1} A${r},${r} 0 ${sweep},1 ${x2},${y2}`;
  };

  return (
    <svg width={width} height={height} style={{ display: 'block', filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}>
      <defs>
        <filter id="topmap-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="apex-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="cornea-base-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="rgba(8,18,40,0.9)" />
          <stop offset="100%" stopColor="rgba(4,9,20,1)" />
        </radialGradient>
      </defs>

      {/* Círculo externo (limbo) */}
      <circle cx={cx} cy={cy} r={R} fill="url(#cornea-base-gradient)" stroke="rgba(100,140,200,0.4)" strokeWidth={2} filter="url(#topmap-glow)" />

      {/* Heatmap de densidade fibrilar */}
      {showHeatmap && heatmapZones.map((zone, i) => {
        const rad = (zone.angle * Math.PI) / 180;
        const spreadRad = (zone.spread * Math.PI) / 180;
        const r1 = R * 0.2;
        const r2 = R * 0.85;
        const x1s = cx + r1 * Math.cos(rad - spreadRad / 2);
        const y1s = cy + r1 * Math.sin(rad - spreadRad / 2);
        const x2s = cx + r2 * Math.cos(rad - spreadRad / 2);
        const y2s = cy + r2 * Math.sin(rad - spreadRad / 2);
        const x1e = cx + r1 * Math.cos(rad + spreadRad / 2);
        const y1e = cy + r1 * Math.sin(rad + spreadRad / 2);
        const x2e = cx + r2 * Math.cos(rad + spreadRad / 2);
        const y2e = cy + r2 * Math.sin(rad + spreadRad / 2);
        return (
          <path
            key={i}
            d={`M${x1s},${y1s} L${x2s},${y2s} A${r2},${r2} 0 0,1 ${x2e},${y2e} L${x1e},${y1e} A${r1},${r1} 0 0,0 ${x1s},${y1s}`}
            fill={zone.color}
            filter="url(#topmap-glow)"
          />
        );
      })}

      {/* Grid / mires de Plácido */}
      {showGrid && mireRadii.map((r, i) => (
        <circle
          key={i}
          cx={cx} cy={cy}
          r={r * R}
          fill="none"
          stroke="rgba(100,160,240,0.3)"
          strokeWidth={1.5}
          filter="url(#topmap-glow)"
        />
      ))}

      {/* Linhas de referência (eixos) */}
      {showGrid && [0, 45, 90, 135].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={cx - R * Math.cos(rad)} y1={cy - R * Math.sin(rad)}
            x2={cx + R * Math.cos(rad)} y2={cy + R * Math.sin(rad)}
            stroke="rgba(80,120,180,0.25)"
            strokeWidth={1}
            strokeDasharray={angle % 90 === 0 ? undefined : '4,6'}
          />
        );
      })}

      {/* Rótulos de ângulos */}
      {showSectors && [0, 90, 180, 270].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const lx = cx + (R + 15) * Math.cos(rad);
        const ly = cy + (R + 15) * Math.sin(rad);
        const labels = { 0: '0°', 90: '90°', 180: '180°', 270: '270°' };
        return (
          <text key={angle} x={lx} y={ly + 4} textAnchor="middle" fill="rgba(150,170,210,0.8)" fontSize={10} fontFamily="var(--font-mono)" fontWeight="700">
            {labels[angle]}
          </text>
        );
      })}

      {/* Ápice cônico */}
      {showApex && (
        <g filter="url(#apex-glow)">
          <circle cx={apexX} cy={apexY} r={10} fill="rgba(255,68,68,0.4)" stroke="#FF4444" strokeWidth={2} />
          <circle cx={apexX} cy={apexY} r={4} fill="#FF4444" />
          <text x={apexX + 15} y={apexY + 4} fill="#FF4444" fontSize={11} fontFamily="var(--font-mono)" fontWeight="700">
            Ápice
          </text>
        </g>
      )}

      {/* Anel ICRS */}
      {showRing && (
        <path
          d={getRingPath()}
          fill="none"
          stroke={ringColor}
          strokeWidth={7}
          strokeLinecap="round"
          filter="url(#topmap-glow)"
          opacity={0.9}
        />
      )}

      {/* Ponto central (eixo visual) */}
      <circle cx={cx} cy={cy} r={4} fill="rgba(255,255,255,0.8)" filter="url(#topmap-glow)" />
      <circle cx={cx} cy={cy} r={2} fill="white" />

      {children}
    </svg>
  );
}
