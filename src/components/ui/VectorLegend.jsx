// VectorLegend.jsx — Legenda de vetores com paleta canônica do Atlas
import React from 'react';

const LEGEND_ITEMS = [
  { color: '#FF4444', label: 'Fr', desc: 'Força patológica axial (+Z)' },
  { color: '#0B3D91', label: 'VR', desc: 'Vetor Radial fibrilar (plano XY)' },
  { color: '#00B4DC', label: 'VT', desc: 'Vetor Tangencial circunferencial' },
  { color: '#FFD700', label: 'Vτ', desc: 'Vetor Torque (anel assimétrico)' },
  { color: '#00CC66', label: 'V', desc: 'Vetor resultante / solução' },
  { color: '#FFFFFF', label: 'ENM', desc: 'Eixo Neutro Mecânico' },
  { color: '#FF66FF', label: 'Coma', desc: 'Eixo Zernike / aberração coma' },
];

export function VectorLegend({ compact = false, visible = [] }) {
  const items = visible.length > 0
    ? LEGEND_ITEMS.filter(item => visible.includes(item.label))
    : LEGEND_ITEMS;

  if (compact) {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '8px 12px',
      }}>
        {items.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: 20, height: 3,
              background: item.color,
              borderRadius: 2,
              boxShadow: `0 0 6px ${item.color}60`,
            }} />
            <span style={{
              color: item.color,
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      padding: '10px 12px',
      background: 'rgba(8,14,30,0.9)',
      borderRadius: 8,
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
        Legenda Vetorial
      </div>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: 24, height: 3,
            background: item.color,
            borderRadius: 2,
            flexShrink: 0,
            boxShadow: `0 0 8px ${item.color}50`,
          }} />
          <span style={{
            color: item.color,
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            minWidth: 32,
          }}>
            {item.label}
          </span>
          <span style={{
            color: 'rgba(140,160,200,0.7)',
            fontSize: '0.68rem',
          }}>
            {item.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
