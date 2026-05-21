// Hub.jsx — Galeria central de módulos de animação
import React, { useState } from 'react';
import { MODULES } from '../data/modules.js';

export function Hub({ onSelectModule, onStartLecture, onStartAVBC }) {
  const [filter, setFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const tagFilters = ['all', 'Vetores', 'Biomecânica', 'Patogênese', 'FEM', 'Topografia', 'Profundidade'];

  const filtered = filter === 'all'
    ? MODULES
    : MODULES.filter(m => m.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-deep)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0A0F1E 0%, #0B1A3A 60%, #071428 100%)',
        borderBottom: '1px solid rgba(0,180,220,0.15)',
        padding: '48px 40px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decoração de fundo */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,180,220,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '4px 14px',
            background: 'rgba(0,180,220,0.1)',
            border: '1px solid rgba(0,180,220,0.25)',
            borderRadius: 100,
            marginBottom: 16,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00B4DC' }} />
            <span style={{ color: '#00B4DC', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.06em' }}>
              ATLAS VETORIAL ICRS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #F0F4FF 0%, #00B4DC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 8,
          }}>
            Animações Biomecânicas Corneanas
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.6,
            maxWidth: 600,
            marginBottom: 24,
          }}>
            Biblioteca de 12 módulos científicos interativos para visualização dos vetores corneanos,
            mecanismos do ICRS e biomecânica do ceratocone.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { value: '12', label: 'Módulos' },
              { value: '70+', label: 'Cenas' },
              { value: 'SVG', label: 'Vetorial Puro' },
              { value: 'PT', label: 'Português Científico' },
            ].map(stat => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#00B4DC', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: 2 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Botões de ação */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {/* Botão de Iniciar Masterclass */}
            <button 
              onClick={onStartLecture}
              style={{
                background: 'linear-gradient(135deg, #00CC66 0%, #00B4DC 100%)',
                color: '#050A14',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 800,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 30px rgba(0, 180, 220, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 204, 102, 0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 180, 220, 0.3)'; }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              INICIAR MASTERCLASS
            </button>

            {/* Botão AVBC-ICRS */}
            <button 
              onClick={onStartAVBC}
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF6600 100%)',
                color: '#050A14',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 800,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 30px rgba(255, 215, 0, 0.25)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 215, 0, 0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 215, 0, 0.25)'; }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx={12} cy={12} r={10} />
                <path d="M12 8v8M8 12h8" />
              </svg>
              AVBC — ANÁLISE VETORIAL
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{
        padding: '16px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        background: 'rgba(8,14,30,0.95)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        {tagFilters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 14px',
              borderRadius: 100,
              border: '1px solid',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              background: filter === f ? 'rgba(0,180,220,0.15)' : 'transparent',
              borderColor: filter === f ? 'var(--vt-cyan)' : 'rgba(255,255,255,0.1)',
              color: filter === f ? 'var(--vt-cyan)' : 'var(--text-muted)',
              transition: 'all 0.15s ease',
            }}
          >
            {f === 'all' ? 'Todos os módulos' : f}
          </button>
        ))}
      </div>

      {/* Grid de módulos */}
      <div style={{
        flex: 1,
        padding: '32px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%',
      }}>
        {filtered.map(module => (
          <ModuleCard
            key={module.id}
            module={module}
            isHovered={hoveredId === module.id}
            onHover={setHoveredId}
            onClick={() => onSelectModule(module.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '20px 40px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.72rem',
        fontFamily: 'var(--font-mono)',
      }}>
        <span>Atlas Vetorial ICRS — Biblioteca Biomecânica</span>
        <span>Paleta canônica: Meek & Boote 2004 · Barraquer 1964 · Kling & Marcos 2013</span>
      </div>
    </div>
  );
}

function ModuleCard({ module, isHovered, onHover, onClick }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover(module.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        background: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: isHovered
          ? `1px solid ${module.color}40`
          : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${module.color}20` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Header do card */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Ícone */}
        <div style={{
          width: 44, height: 44,
          borderRadius: 10,
          background: `${module.color}15`,
          border: `1.5px solid ${module.color}35`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
          flexShrink: 0,
          transition: 'all 0.25s ease',
          boxShadow: isHovered ? `0 0 20px ${module.color}25` : 'none',
        }}>
          {module.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* ID badge */}
          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.62rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: 2,
          }}>
            {module.id}
          </div>

          <h3 style={{
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}>
            {module.title}
          </h3>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.72rem',
            margin: '2px 0 0',
            lineHeight: 1.4,
          }}>
            {module.subtitle}
          </p>
        </div>
      </div>

      {/* Descrição curta */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.78rem',
        lineHeight: 1.6,
        margin: 0,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {module.description}
      </p>

      {/* Equação */}
      <div style={{
        background: 'rgba(11,61,145,0.1)',
        borderLeft: `2px solid ${module.color}60`,
        borderRadius: '0 6px 6px 0',
        padding: '6px 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'rgba(168,196,240,0.8)',
        whiteSpace: 'pre-line',
      }}>
        {module.equation.split('\n')[0]}
      </div>

      {/* Footer: tags + cenas */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {module.tags.map((tag, i) => (
            <span key={tag} className={`badge ${module.tagColors[i]}`}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <circle cx={12} cy={12} r={10} />
            <path d="M12 6v6l4 2" />
          </svg>
          {module.scenes.length} cenas
        </div>
      </div>

      {/* Botão de abrir */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '9px',
        borderRadius: 8,
        background: isHovered ? `${module.color}20` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isHovered ? module.color + '40' : 'rgba(255,255,255,0.06)'}`,
        color: isHovered ? module.color : 'var(--text-muted)',
        fontSize: '0.78rem',
        fontWeight: 600,
        transition: 'all 0.2s ease',
      }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        Abrir Animação
      </div>
    </div>
  );
}
