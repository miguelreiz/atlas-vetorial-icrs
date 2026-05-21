// AVBCDashboard.jsx — Dashboard principal do AVBC-ICRS
// "O anel certo, no eixo certo, pelo mecanismo certo"
import React, { useState, useCallback, useMemo } from 'react';
import { OPTICO_OPTIONS, TOPOGRAFICO_OPTIONS, BIOMECANICO_OPTIONS, gerarConduta } from '../../data/avbc_logic.js';
import { AVBCVectorDiagram } from './AVBCVectorDiagram.jsx';
import { AVBCConductPanel } from './AVBCConductPanel.jsx';

export function AVBCDashboard({ onBack, onOpenModule }) {
  const [optico, setOptico] = useState(null);
  const [topografico, setTopografico] = useState(null);
  const [biomecanicos, setBiomecanicos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleBiomecanico = useCallback((id) => {
    setBiomecanicos(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  }, []);

  const conduta = useMemo(() => {
    return gerarConduta(optico, topografico, biomecanicos);
  }, [optico, topografico, biomecanicos]);

  const vetoresAtivos = conduta ? conduta.vetoresAtivos : [];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-deep)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── Hero Header ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0A0F1E 0%, #0B1A3A 40%, #0A1428 100%)',
        borderBottom: '1px solid rgba(0,180,220,0.12)',
        padding: '24px 32px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* BG decoration */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 50% 100% at 80% 20%, rgba(0,204,102,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button
              onClick={onBack}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '6px 14px',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,180,220,0.1)'; e.currentTarget.style.color = '#00B4DC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Atlas
            </button>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px',
              background: 'rgba(0,204,102,0.1)',
              border: '1px solid rgba(0,204,102,0.25)',
              borderRadius: 100,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00CC66' }} />
              <span style={{ color: '#00CC66', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.06em' }}>
                AVBC-ICRS
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #F0F4FF 0%, #00CC66 60%, #00B4DC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 4,
          }}>
            Análise Vetorial Biomecânica Corneana
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            margin: 0,
          }}>
            O anel escolhido corrige a córnea certa, no eixo certo, pelo mecanismo certo?
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{
        flex: 1,
        padding: '24px 32px',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        {/* ── 3 Cards AVBC ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {/* Card Óptico */}
          <AVBCCard
            icon="🔍"
            title="Módulo Óptico"
            question="Vai enxergar?"
            subtitle="O paciente tem chance de ganho visual?"
            color="#00CC66"
            options={OPTICO_OPTIONS}
            selectedId={optico}
            onSelect={setOptico}
            isExpanded={expandedCard === 'optico'}
            onToggleExpand={() => setExpandedCard(expandedCard === 'optico' ? null : 'optico')}
            isRadio={true}
          />

          {/* Card Topográfico */}
          <AVBCCard
            icon="🗺️"
            title="Módulo Topográfico"
            question="Onde deformou?"
            subtitle="Onde está o problema na córnea?"
            color="#00B4DC"
            options={TOPOGRAFICO_OPTIONS}
            selectedId={topografico}
            onSelect={setTopografico}
            isExpanded={expandedCard === 'topografico'}
            onToggleExpand={() => setExpandedCard(expandedCard === 'topografico' ? null : 'topografico')}
            isRadio={true}
          />

          {/* Card Biomecânico */}
          <AVBCCard
            icon="⚙️"
            title="Módulo Biomecânico"
            question="Que vetor aplicar?"
            subtitle="Qual mecanismo o anel deve induzir?"
            color="#FFD700"
            options={BIOMECANICO_OPTIONS}
            selectedId={biomecanicos}
            onSelect={toggleBiomecanico}
            isExpanded={expandedCard === 'biomecanico'}
            onToggleExpand={() => setExpandedCard(expandedCard === 'biomecanico' ? null : 'biomecanico')}
            isRadio={false}
          />
        </div>

        {/* ── Resultado: Diagrama + Conduta ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: conduta ? 'minmax(280px, 380px) 1fr' : '1fr',
          gap: 16,
          alignItems: 'start',
        }}>
          {/* Diagrama SVG */}
          {conduta && (
            <div style={{
              background: 'rgba(8,14,26,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 12,
              position: 'sticky',
              top: 24,
            }}>
              <AVBCVectorDiagram
                vetoresAtivos={vetoresAtivos}
                topografico={topografico}
                optico={optico}
              />
            </div>
          )}

          {/* Conduta */}
          <AVBCConductPanel
            conduta={conduta}
            onOpenModule={onOpenModule}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: '16px 32px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.68rem',
        fontFamily: 'var(--font-mono)',
      }}>
        <span>AVBC-ICRS · Análise Vetorial Biomecânica Corneana</span>
        <span>Inspirado no método Alpins · VR achata · VT regulariza · Vτ reposiciona</span>
      </div>
    </div>
  );
}

// ── Card AVBC individual ──
function AVBCCard({
  icon, title, question, subtitle, color,
  options, selectedId, onSelect,
  isExpanded, onToggleExpand, isRadio,
}) {
  const hasSelection = isRadio ? selectedId !== null : (Array.isArray(selectedId) && selectedId.length > 0);

  const statusColor = (() => {
    if (!hasSelection) return 'transparent';
    if (isRadio) {
      const opt = options.find(o => o.id === selectedId);
      return opt?.color || color;
    }
    return color;
  })();

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: hasSelection ? `1px solid ${statusColor}30` : '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: hasSelection ? `0 4px 24px ${statusColor}10` : 'none',
    }}>
      {/* Card Header */}
      <div style={{
        padding: '16px 18px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `${color}12`,
            border: `1.5px solid ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
          }}>
            {icon}
          </div>
          <div>
            <h3 style={{
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              fontWeight: 700,
              margin: 0,
            }}>
              {title}
            </h3>
            <p style={{
              color: color,
              fontSize: '0.72rem',
              fontWeight: 600,
              margin: 0,
              fontStyle: 'italic',
            }}>
              {question}
            </p>
          </div>
        </div>

        {/* Status dot */}
        {hasSelection && (
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: statusColor,
            boxShadow: `0 0 10px ${statusColor}60`,
            animation: 'pulse-glow 2s ease infinite',
          }} />
        )}
      </div>

      {/* Options */}
      <div style={{ padding: '10px 14px' }}>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.72rem',
          margin: '0 0 10px 0',
          lineHeight: 1.4,
        }}>
          {subtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {options.map(opt => {
            const isSelected = isRadio
              ? selectedId === opt.id
              : Array.isArray(selectedId) && selectedId.includes(opt.id);

            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px',
                  borderRadius: 10,
                  background: isSelected ? `${opt.color}15` : 'transparent',
                  border: isSelected ? `1px solid ${opt.color}40` : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {/* Radio/Check indicator */}
                <div style={{
                  width: 18, height: 18, borderRadius: isRadio ? '50%' : 4,
                  border: `2px solid ${isSelected ? opt.color : 'rgba(255,255,255,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  background: isSelected ? `${opt.color}20` : 'transparent',
                }}>
                  {isSelected && (
                    isRadio
                      ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: opt.color }} />
                      : <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={opt.color} strokeWidth={3}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                  )}
                </div>

                {/* Label + vetor info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      color: isSelected ? opt.color : 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 500,
                      transition: 'all 0.2s ease',
                    }}>
                      {opt.label}
                    </span>
                    {opt.vetor && (
                      <span style={{
                        color: opt.color,
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        opacity: 0.7,
                        padding: '1px 6px',
                        borderRadius: 4,
                        background: `${opt.color}10`,
                      }}>
                        {opt.vetor}
                      </span>
                    )}
                    {opt.fenotipoRef && (
                      <span style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {opt.fenotipoRef}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      margin: '2px 0 0',
                      lineHeight: 1.4,
                      animation: 'fadeIn 0.3s ease forwards',
                    }}>
                      {opt.descricao}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable clinical signs */}
      {hasSelection && options[0].sinais && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <button
            onClick={onToggleExpand}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '8px 18px',
              background: 'transparent', border: 'none',
              cursor: 'pointer', color: 'var(--text-muted)',
              fontSize: '0.7rem', fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>▸ Sinais Clínicos</span>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {isExpanded && (
            <div style={{ padding: '0 18px 14px', animation: 'fadeIn 0.3s ease forwards' }}>
              {(() => {
                const selectedOpt = isRadio
                  ? options.find(o => o.id === selectedId)
                  : options.find(o => Array.isArray(selectedId) && selectedId.includes(o.id));
                if (!selectedOpt?.sinais) return null;
                return (
                  <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'none' }}>
                    {selectedOpt.sinais.map((sinal, i) => (
                      <li key={i} style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.72rem',
                        lineHeight: 1.8,
                        position: 'relative',
                        paddingLeft: 12,
                      }}>
                        <span style={{
                          position: 'absolute', left: 0, top: '0.55em',
                          width: 4, height: 4, borderRadius: '50%',
                          background: selectedOpt.color || color,
                          opacity: 0.5,
                        }} />
                        {sinal}
                      </li>
                    ))}
                  </ul>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
