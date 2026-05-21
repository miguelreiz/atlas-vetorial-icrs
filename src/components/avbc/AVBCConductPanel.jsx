// AVBCConductPanel.jsx — Painel de conduta vetorial gerada
import React from 'react';
import { MODULES } from '../../data/modules.js';

export function AVBCConductPanel({ conduta, onOpenModule }) {
  if (!conduta) {
    return (
      <div style={{
        background: 'rgba(14,22,41,0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '40px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: 12, opacity: 0.3 }}>⚙️</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Selecione as classificações nos três módulos acima
          <br />para gerar a conduta vetorial.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(14,22,41,0.9), rgba(11,26,58,0.9))',
      border: '1px solid rgba(0,180,220,0.15)',
      borderRadius: 16,
      overflow: 'hidden',
      animation: 'fadeIn 0.5s ease forwards',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0,180,220,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: conduta.alertas.some(a => a.tipo === 'warning') ? '#FF4444' : '#00CC66',
            boxShadow: `0 0 8px ${conduta.alertas.some(a => a.tipo === 'warning') ? 'rgba(255,68,68,0.5)' : 'rgba(0,204,102,0.5)'}`,
          }} />
          <span style={{
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '0.95rem',
          }}>
            Conduta Vetorial
          </span>
        </div>
        <span style={{
          color: 'var(--text-muted)',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
        }}>
          AVBC-ICRS
        </span>
      </div>

      {/* Resumo frase clínica */}
      <div style={{
        padding: '12px 24px',
        background: 'rgba(0,180,220,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <p style={{
          color: 'var(--vt-cyan)',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          margin: 0,
        }}>
          {conduta.fraseClinica}
        </p>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Grid principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}>
          {/* Fenótipo */}
          <InfoCard label="Fenótipo Sugerido" value={conduta.fenotipoSugerido} color="#FF66FF" />
          {/* Tipo de Anel */}
          <InfoCard label="Tipo de Anel" value={conduta.anel.tipo} color="#90A4AE" />
          {/* Arco */}
          <InfoCard label="Arco" value={conduta.anel.arco} color="#00B4DC" />
          {/* Espessura */}
          <InfoCard label="Espessura" value={conduta.anel.espessura} color="#CC2200" />
          {/* Posição */}
          <InfoCard label="Posição" value={conduta.anel.posicao} color="#FFD700" />
          {/* Vetores */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10,
            padding: '12px 14px',
          }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>
              VETORES ATIVOS
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {conduta.vetoresAtivos.map(v => {
                const colors = { VR: '#CC2200', VT: '#00B4DC', 'Vτ': '#FFD700' };
                return (
                  <span key={v} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '4px 10px', borderRadius: 100,
                    background: `${colors[v]}20`,
                    border: `1px solid ${colors[v]}50`,
                    color: colors[v],
                    fontSize: '0.78rem', fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors[v] }} />
                    {v}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alertas */}
        {conduta.alertas.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {conduta.alertas.map((alerta, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: alerta.tipo === 'warning'
                  ? 'rgba(255,68,68,0.08)'
                  : alerta.tipo === 'caution'
                    ? 'rgba(255,176,32,0.08)'
                    : 'rgba(0,180,220,0.08)',
                borderLeft: `3px solid ${alerta.tipo === 'warning' ? '#FF4444' : alerta.tipo === 'caution' ? '#FFB020' : '#00B4DC'}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
              }}>
                <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: 1 }}>
                  {alerta.tipo === 'warning' ? '⚠️' : alerta.tipo === 'caution' ? '⚡' : 'ℹ️'}
                </span>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {alerta.texto}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Módulos relacionados */}
        <div>
          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            🔬 APROFUNDAR — MÓDULOS DO ATLAS
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {conduta.modulosRelacionados.map(mId => {
              const mod = MODULES.find(m => m.id === mId);
              if (!mod) return null;
              return (
                <button
                  key={mId}
                  onClick={() => onOpenModule && onOpenModule(mId)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 8,
                    background: `${mod.color}10`,
                    border: `1px solid ${mod.color}30`,
                    color: mod.color,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${mod.color}25`;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${mod.color}10`;
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <span>{mod.icon}</span>
                  <span>{mod.id}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.68rem' }}>
                    {mod.title.length > 20 ? mod.title.slice(0, 20) + '…' : mod.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      padding: '12px 14px',
      borderTop: `2px solid ${color}40`,
    }}>
      <div style={{
        color: 'var(--text-muted)',
        fontSize: '0.68rem',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        letterSpacing: '0.08em',
        marginBottom: 6,
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
      <div style={{
        color: 'var(--text-primary)',
        fontSize: '0.82rem',
        fontWeight: 600,
        lineHeight: 1.4,
      }}>
        {value}
      </div>
    </div>
  );
}
