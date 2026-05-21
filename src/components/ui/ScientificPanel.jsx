// ScientificPanel.jsx — Painel com descrição, equação e referência
import React, { useState } from 'react';

export function ScientificPanel({ description, equation, reference, currentScene, scenes }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      padding: '14px 16px',
      background: 'rgba(6,12,26,0.98)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      {/* Descrição científica */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
      }}>
        <span style={{ color: 'var(--vt-cyan)', fontSize: '0.8rem', marginTop: 1 }}>📐</span>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.78rem',
          lineHeight: 1.6,
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? undefined : 2,
          WebkitBoxOrient: 'vertical',
          overflow: expanded ? undefined : 'hidden',
        }}>
          {description}
        </p>
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.7rem',
            flexShrink: 0,
            padding: '2px 6px',
          }}
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Equação */}
      {equation && (
        <div style={{
          background: 'rgba(11,61,145,0.12)',
          borderLeft: '2px solid #0B3D91',
          borderRadius: '0 6px 6px 0',
          padding: '6px 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#A8C4F0',
          whiteSpace: 'pre-line',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ color: '#0B3D91', opacity: 0.8 }}>∑</span>
          {equation}
        </div>
      )}

      {/* Referência */}
      {reference && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
        }}>
          <span>📚</span>
          <span style={{ fontStyle: 'italic' }}>{reference}</span>
        </div>
      )}
    </div>
  );
}
