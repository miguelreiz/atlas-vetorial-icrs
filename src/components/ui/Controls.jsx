// Controls.jsx — Barra de controle das animações (Play/Pause/Speed/Cenas)
import React from 'react';

export function Controls({
  isPlaying, onToggle, onPrev, onNext, onReset,
  currentScene, totalScenes,
  speed, onSpeedChange,
  progress,
  sceneTitles = [],
}) {
  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '14px 16px',
      background: 'rgba(8,14,30,0.95)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Barra de progresso de cenas */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {Array.from({ length: totalScenes }).map((_, i) => (
          <button
            key={i}
            onClick={() => onToggle && i === currentScene ? null : null}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              background: i <= currentScene
                ? 'var(--vt-cyan)'
                : 'rgba(255,255,255,0.12)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Linha principal de controles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Reset */}
        <button className="btn-icon" onClick={onReset} title="Reiniciar" style={{ cursor: 'pointer' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        {/* Anterior */}
        <button className="btn-icon" onClick={onPrev} title="Cena anterior" style={{ cursor: 'pointer' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={onToggle}
          style={{
            width: 40, height: 40,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #00B4DC, #0084A8)',
            boxShadow: isPlaying ? '0 0 20px rgba(0,180,220,0.5)' : '0 4px 12px rgba(0,0,0,0.4)',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
        >
          {isPlaying ? (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="white">
              <rect x={6} y={4} width={4} height={16} rx={1} />
              <rect x={14} y={4} width={4} height={16} rx={1} />
            </svg>
          ) : (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}>
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>

        {/* Próxima */}
        <button className="btn-icon" onClick={onNext} title="Próxima cena" style={{ cursor: 'pointer' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Separador */}
        <div style={{ flex: 1 }} />

        {/* Contador de cenas */}
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
          {currentScene + 1} / {totalScenes}
        </span>

        {/* Velocidade */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {speeds.map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              style={{
                padding: '3px 8px',
                borderRadius: 4,
                border: '1px solid',
                cursor: 'pointer',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                background: speed === s ? 'rgba(0,180,220,0.2)' : 'transparent',
                borderColor: speed === s ? 'var(--vt-cyan)' : 'rgba(255,255,255,0.1)',
                color: speed === s ? 'var(--vt-cyan)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Título da cena atual */}
      {sceneTitles.length > 0 && (
        <div style={{
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          padding: '6px 10px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 6,
          borderLeft: '2px solid var(--vt-cyan)',
        }}>
          {currentScene + 1}. {sceneTitles[currentScene]}
        </div>
      )}
    </div>
  );
}
