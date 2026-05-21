// AVBCVectorDiagram.jsx — Diagrama SVG interativo da córnea com vetores
import React from 'react';

const CX = 200;
const CY = 200;
const R_LIMBO = 170;
const R_ANEL = 120;
const R_CONE_OUTER = 60;

export function AVBCVectorDiagram({ vetoresAtivos = [], topografico = 'central', optico = 'favoravel' }) {
  // Posição do cone conforme classificação topográfica
  const conePos = {
    central: { cx: CX, cy: CY + 10 },
    inferior: { cx: CX - 15, cy: CY + 55 },
    difuso: { cx: CX, cy: CY + 20 },
    irregular: { cx: CX - 30, cy: CY + 50 },
  };
  const cone = conePos[topografico] || conePos.central;
  const coneR = topografico === 'difuso' ? R_CONE_OUTER + 30 : R_CONE_OUTER;

  const showVR = vetoresAtivos.includes('VR');
  const showVT = vetoresAtivos.includes('VT');
  const showVtau = vetoresAtivos.includes('Vτ');

  // Anel position/arc conforme topografia
  const anelStartAngle = topografico === 'central' ? 200 : 180;
  const anelEndAngle = topografico === 'central' ? 340 : 360;

  const statusColor = optico === 'favoravel' ? '#00CC66' : optico === 'intermediario' ? '#FFB020' : '#FF4444';

  return (
    <svg viewBox="0 0 400 400" width="100%" style={{ maxWidth: 380 }}>
      <defs>
        {/* Glow filters */}
        <filter id="glow-vr">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-vt">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-vtau">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-cone">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Arrow markers */}
        <marker id="arrow-vr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#CC2200" />
        </marker>
        <marker id="arrow-vt" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#00B4DC" />
        </marker>
        <marker id="arrow-vtau" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#FFD700" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="400" height="400" rx="16" fill="#080E1A" />

      {/* Plácido rings (simplified) */}
      {[170, 140, 110, 80, 50].map((r, i) => (
        <circle key={i} cx={CX} cy={CY} r={r}
          stroke="rgba(0,180,220,0.08)" strokeWidth="1" fill="none"
        />
      ))}

      {/* Limbo */}
      <circle cx={CX} cy={CY} r={R_LIMBO}
        stroke="rgba(0,180,220,0.25)" strokeWidth="1.5" fill="none"
        strokeDasharray="4,6"
      />

      {/* Cone highlight */}
      <ellipse cx={cone.cx} cy={cone.cy}
        rx={coneR * (topografico === 'difuso' ? 1.4 : 1)}
        ry={coneR}
        fill="rgba(255,102,0,0.08)"
        stroke="rgba(255,102,0,0.3)"
        strokeWidth="1.5"
        strokeDasharray={topografico === 'difuso' ? '6,4' : 'none'}
        filter="url(#glow-cone)"
      >
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </ellipse>

      {/* Cone label */}
      <text x={cone.cx} y={cone.cy + 4} textAnchor="middle"
        fill="rgba(255,102,0,0.6)" fontSize="10" fontFamily="Inter, system-ui" fontWeight="600"
      >
        CONE
      </text>

      {/* ICRS Ring arc */}
      <path
        d={describeArc(CX, CY, R_ANEL, anelStartAngle, anelEndAngle)}
        stroke="rgba(144,164,174,0.5)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={describeArc(CX, CY, R_ANEL, anelStartAngle, anelEndAngle)}
        stroke="rgba(144,164,174,0.15)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── VR: Vetor Radial ── */}
      {showVR && (
        <g className="fade-in" style={{ animation: 'fadeIn 0.6s ease forwards' }}>
          {/* Radial arrows from ring outward */}
          {[220, 250, 280, 310].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = CX + (R_ANEL - 15) * Math.cos(rad);
            const y1 = CY + (R_ANEL - 15) * Math.sin(rad);
            const x2 = CX + (R_ANEL + 30) * Math.cos(rad);
            const y2 = CY + (R_ANEL + 30) * Math.sin(rad);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#CC2200" strokeWidth="2.5"
                markerEnd="url(#arrow-vr)"
                filter="url(#glow-vr)"
                opacity="0" 
              >
                <animate attributeName="opacity" from="0" to="0.9" dur="0.4s" begin={`${i * 0.1}s`} fill="freeze" />
              </line>
            );
          })}
          {/* VR label */}
          <text x={CX + R_ANEL + 40} y={CY + 80}
            fill="#CC2200" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace"
          >
            VR
          </text>
          <text x={CX + R_ANEL + 40} y={CY + 94}
            fill="rgba(204,34,0,0.6)" fontSize="9" fontFamily="Inter, system-ui"
          >
            Aplainar
          </text>
        </g>
      )}

      {/* ── VT: Vetor Tangencial ── */}
      {showVT && (
        <g className="fade-in" style={{ animation: 'fadeIn 0.6s ease 0.2s forwards', opacity: 0 }}>
          <path
            d={describeArc(CX, CY, R_ANEL + 18, anelStartAngle + 10, anelEndAngle - 10)}
            stroke="#00B4DC" strokeWidth="2.5" fill="none"
            markerEnd="url(#arrow-vt)"
            filter="url(#glow-vt)"
            strokeDasharray="300"
            strokeDashoffset="300"
          >
            <animate attributeName="stroke-dashoffset" from="300" to="0" dur="1s" begin="0.3s" fill="freeze" />
          </path>
          {/* VT label */}
          <text x={CX - R_ANEL - 52} y={CY + 20}
            fill="#00B4DC" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace"
          >
            VT
          </text>
          <text x={CX - R_ANEL - 80} y={CY + 34}
            fill="rgba(0,180,220,0.6)" fontSize="9" fontFamily="Inter, system-ui"
          >
            Redistribuir
          </text>
        </g>
      )}

      {/* ── Vτ: Vetor Torque ── */}
      {showVtau && (
        <g className="fade-in" style={{ animation: 'fadeIn 0.6s ease 0.4s forwards', opacity: 0 }}>
          {/* Curved torque arrow near cone */}
          <path
            d={`M ${cone.cx + 35} ${cone.cy - 20} Q ${cone.cx + 50} ${cone.cy - 50} ${cone.cx + 15} ${cone.cy - 55}`}
            stroke="#FFD700" strokeWidth="2.5" fill="none"
            markerEnd="url(#arrow-vtau)"
            filter="url(#glow-vtau)"
            strokeDasharray="100"
            strokeDashoffset="100"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.8s" begin="0.5s" fill="freeze" />
          </path>
          {/* Vτ label */}
          <text x={cone.cx + 50} y={cone.cy - 55}
            fill="#FFD700" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace"
          >
            Vτ
          </text>
          <text x={cone.cx + 50} y={cone.cy - 41}
            fill="rgba(255,215,0,0.6)" fontSize="9" fontFamily="Inter, system-ui"
          >
            Reposicionar
          </text>
        </g>
      )}

      {/* Axis labels */}
      <text x={CX} y={24} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="JetBrains Mono, monospace">S</text>
      <text x={CX} y={395} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="JetBrains Mono, monospace">I</text>
      <text x={8} y={CY + 4} textAnchor="start" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="JetBrains Mono, monospace">T</text>
      <text x={392} y={CY + 4} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="JetBrains Mono, monospace">N</text>

      {/* Status indicator */}
      <circle cx={370} cy={30} r="8" fill={statusColor} opacity="0.8">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* ANEL label */}
      {(() => {
        const midAngle = ((anelStartAngle + anelEndAngle) / 2) * Math.PI / 180;
        return (
          <text
            x={CX + (R_ANEL - 2) * Math.cos(midAngle)}
            y={CY + (R_ANEL - 2) * Math.sin(midAngle) + 3}
            textAnchor="middle"
            fill="rgba(144,164,174,0.7)"
            fontSize="8"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
          >
            ICRS
          </text>
        );
      })()}
    </svg>
  );
}

// ── Utility: SVG arc path ──
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}
