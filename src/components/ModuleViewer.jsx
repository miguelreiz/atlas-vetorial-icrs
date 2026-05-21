// ModuleViewer.jsx — Wrapper de módulo: cabeçalho + SVG + controles + painel científico
import React from 'react';
import { Controls } from './ui/Controls.jsx';
import { ScientificPanel } from './ui/ScientificPanel.jsx';
import { VectorLegend } from './ui/VectorLegend.jsx';
import { useScenePlayer } from '../hooks/useScenePlayer.js';

export function ModuleViewer({ module, onBack, children, legendVectors = [] }) {
  const player = useScenePlayer(module.scenes.length, {
    autoAdvance: true,
    sceneDuration: 3500,
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'var(--bg-deep)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        background: 'rgba(8,14,30,0.98)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <button
          className="btn-icon"
          onClick={onBack}
          title="Voltar ao Hub"
          style={{ cursor: 'pointer' }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Badge ID */}
        <div style={{
          width: 36, height: 36,
          borderRadius: 8,
          background: `${module.color}20`,
          border: `1.5px solid ${module.color}60`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
          flexShrink: 0,
        }}>
          {module.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              color: 'var(--text-muted)',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {module.id}
            </span>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              fontWeight: 700,
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              {module.title}
            </h2>
          </div>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {module.subtitle}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {module.tags.slice(0, 2).map((tag, i) => (
            <span key={tag} className={`badge ${module.tagColors[i]}`}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Área SVG animada */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        background: 'radial-gradient(ellipse at center, #0E1A32 0%, #0A0F1E 100%)',
      }}>
        {/* Legenda flutuante */}
        {legendVectors.length > 0 && (
          <div style={{
            position: 'absolute',
            top: 10, right: 10,
            zIndex: 10,
            opacity: 0.85,
          }}>
            <VectorLegend compact visible={legendVectors} />
          </div>
        )}

        {/* Conteúdo da animação */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}>
          {typeof children === 'function' ? children(player) : children}
        </div>
      </div>

      {/* Controles */}
      <Controls
        isPlaying={player.isPlaying}
        onToggle={player.toggle}
        onPrev={player.prevScene}
        onNext={player.nextScene}
        onReset={player.reset}
        currentScene={player.currentScene}
        totalScenes={player.totalScenes}
        speed={player.speed}
        onSpeedChange={player.setSpeed}
        progress={player.progress}
        sceneTitles={module.scenes}
      />

      {/* Painel científico */}
      <ScientificPanel
        description={module.description}
        equation={module.equation}
        reference={module.reference}
        currentScene={player.currentScene}
        scenes={module.scenes}
      />
    </div>
  );
}
