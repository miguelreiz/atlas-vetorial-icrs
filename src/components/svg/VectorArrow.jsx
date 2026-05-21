// VectorArrow.jsx — Seta vetorial SVG animada de Alta Precisão
// Suporta todas as cores canônicas do Atlas Vetorial ICRS
import React from 'react';

const COLORS = {
  fr: '#FF4444',
  vr: '#0B3D91',
  vt: '#00B4DC',
  vtau: '#FFD700',
  result: '#00CC66',
  enm: '#FFFFFF',
  coma: '#FF66FF',
  vend: '#00FF88', // Added for Vetor Endotelial
  white: '#FFFFFF',
  gray: '#666688',
};

export function VectorArrow({
  x1, y1, x2, y2,
  type = 'vr',
  color,
  label,
  labelOffset = { x: 0, y: -12 },
  strokeWidth = 2.5,
  opacity = 1,
  animated = false,
  dashArray,
  markerSize = 8,
  fontSize = 11,
}) {
  const resolvedColor = color || COLORS[type] || '#FFFFFF';
  const markerId = `arrow-${type}-${Math.random().toString(36).slice(2, 7)}`;
  const filterId = `glow-${type}`;

  // Calculate angle for label rotation
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Label midpoint
  const mx = (x1 + x2) / 2 + labelOffset.x;
  const my = (y1 + y2) / 2 + labelOffset.y;

  return (
    <g opacity={opacity}>
      <defs>
        <marker
          id={markerId}
          markerWidth={markerSize}
          markerHeight={markerSize}
          refX={markerSize - 1}
          refY={markerSize / 2}
          orient="auto"
        >
          <path
            d={`M0,0 L0,${markerSize} L${markerSize},${markerSize / 2} Z`}
            fill={resolvedColor}
          />
        </marker>
        {/* Premium Neon Glow for vectors */}
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <line
        x1={x1} y1={y1}
        x2={x2} y2={y2}
        stroke={resolvedColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        markerEnd={`url(#${markerId})`}
        filter={`url(#${filterId})`}
        style={animated ? { animation: 'arrow-pulse 1.5s ease-in-out infinite' } : {}}
      />

      {label && (
        <text
          x={mx}
          y={my}
          textAnchor="middle"
          fill={resolvedColor}
          fontSize={fontSize}
          fontFamily="var(--font-mono)"
          fontWeight="700"
          filter={`url(#${filterId})`}
          style={{ userSelect: 'none' }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

// Seta circular (torque / VT)
export function CircularArrow({ cx, cy, r, startAngle, endAngle, color = '#FFD700', label, clockwise = true, strokeWidth = 2.5 }) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const large = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const sweep = clockwise ? 1 : 0;
  const markerId = `circ-arrow-${Math.random().toString(36).slice(2, 7)}`;
  const filterId = `circ-glow-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <g>
      <defs>
        <marker id={markerId} markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L0,8 L8,4 Z" fill={color} />
        </marker>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d={`M${x1},${y1} A${r},${r} 0 ${large},${sweep} ${x2},${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${markerId})`}
        filter={`url(#${filterId})`}
      />
      {label && (
        <text
          x={cx}
          y={cy - r - 10}
          textAnchor="middle"
          fill={color}
          fontSize={12}
          fontFamily="var(--font-mono)"
          fontWeight="700"
          filter={`url(#${filterId})`}
        >
          {label}
        </text>
      )}
    </g>
  );
}
