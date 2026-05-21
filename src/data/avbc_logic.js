// avbc_logic.js — Lógica do AVBC-ICRS
// Mapeia classificações clínicas → conduta vetorial sugerida
// Inspirado no método Alpins: linguagem vetorial padronizada para decisão cirúrgica

// ─── Constantes ───────────────────────────────────────────────

export const OPTICO_OPTIONS = [
  {
    id: 'favoravel',
    label: 'Favorável',
    color: '#00CC66',
    icon: '✅',
    descricao: 'Coerência óptica alta — boa chance de ganho visual',
    sinais: [
      'Astigmatismo refracional acompanha o topográfico',
      'Coma aponta para o mesmo lado do cone',
      'HOA compatível com correção',
    ],
  },
  {
    id: 'intermediario',
    label: 'Intermediário',
    color: '#FFB020',
    icon: '⚠️',
    descricao: 'Coerência parcial — ganho visual possível mas incerto',
    sinais: [
      'Astigmatismo parcialmente alinhado',
      'Coma moderado ou levemente desviado',
      'HOA moderadas',
    ],
  },
  {
    id: 'desfavoravel',
    label: 'Desfavorável',
    color: '#FF4444',
    icon: '🔴',
    descricao: 'Óptica incoerente — risco de mapa melhorar sem ganho visual',
    sinais: [
      'Eixos refracional e topográfico divergentes',
      'Coma em direção oposta ao cone',
      'HOA muito altas ou caóticas',
    ],
  },
];

export const TOPOGRAFICO_OPTIONS = [
  {
    id: 'central',
    label: 'Central',
    color: '#00B4DC',
    fenotipoRef: 'P1 Nipple',
    descricao: 'Cone pequeno, centralizado, astigmatismo regular',
    sinais: [
      'Kmax focal, próximo ao eixo visual',
      'Deformação de Plácido pontual e inferior',
      'Astigmatismo predominantemente regular',
    ],
  },
  {
    id: 'inferior',
    label: 'Inferior / Oval',
    color: '#FFD700',
    fenotipoRef: 'P2 Oval',
    descricao: 'Cone oval espalhado inferior, eixo oblíquo frequente',
    sinais: [
      'Kmax inferior com extensão lateral',
      'Eixo astigmático frequentemente oblíquo',
      'Plácido com deformação oval inferior',
    ],
  },
  {
    id: 'difuso',
    label: 'Difuso / Globoso',
    color: '#FF6600',
    fenotipoRef: 'P5 Globus',
    descricao: 'Deformação difusa (Globus) — indicado para suporte estrutural e tolerância a lentes de contato (até 85 D)',
    sinais: [
      'Kmax sem foco claro',
      'Córnea globalmente deformada',
      'Foco em estabilização mecânica e evitar DALK',
    ],
  },
  {
    id: 'irregular',
    label: 'Irregular / Assimétrico',
    color: '#FF66FF',
    fenotipoRef: 'P3 Duck / P4 Snowman',
    descricao: 'Assimetria severa, ápice deslocado, possível duplo foco',
    sinais: [
      'Ápice severamente deslocado do eixo visual',
      'K-steep não coincide com eixo biomecânico (ENM)',
      'Coma alto (>1.5μm RMS)',
      'Possível duplo foco de curvatura (Snowman)',
    ],
  },
];

export const BIOMECANICO_OPTIONS = [
  {
    id: 'aplainar',
    label: 'Aplainar',
    vetor: 'VR',
    vetorNome: 'Vetor Radial',
    color: '#CC2200',
    parametro: 'Espessura do anel',
    descricao: 'Arc-shortening — encurta fibras radiais, tensiona, achata',
    mecanismo: 'O anel força as fibras radiais a contornar seu perfil, encurtando o comprimento efetivo. A tensão aumenta e o centro achata.',
  },
  {
    id: 'redistribuir',
    label: 'Redistribuir',
    vetor: 'VT',
    vetorNome: 'Vetor Tangencial',
    color: '#00B4DC',
    parametro: 'Arco do anel',
    descricao: 'Tensão tangencial ao longo do arco — regulariza astigmatismo',
    mecanismo: 'Arcos longos interceptam mais fibras tangenciais, provocando redistribuição do astigmatismo e rotação do eixo.',
  },
  {
    id: 'reposicionar',
    label: 'Reposicionar',
    vetor: 'Vτ',
    vetorNome: 'Vetor Torque',
    color: '#FFD700',
    parametro: 'Assimetria e posição',
    descricao: 'Torque rotacional por gradiente volumétrico — migra o ápice',
    mecanismo: 'O anel assimétrico (espessura variável) cria torque que arrasta o ápice de volta ao eixo visual.',
  },
];

// ─── Gerador de Conduta ──────────────────────────────────────

export function gerarConduta(optico, topografico, biomecanicos) {
  if (!optico || !topografico || biomecanicos.length === 0) {
    return null;
  }

  const conduta = {
    anel: { tipo: '', arco: '', espessura: '', posicao: '' },
    fenotipoSugerido: '',
    vetoresAtivos: [],
    alertas: [],
    modulosRelacionados: [],
    fraseClinica: '',
  };

  // ── Vetores ativos ──
  if (biomecanicos.includes('aplainar')) conduta.vetoresAtivos.push('VR');
  if (biomecanicos.includes('redistribuir')) conduta.vetoresAtivos.push('VT');
  if (biomecanicos.includes('reposicionar')) conduta.vetoresAtivos.push('Vτ');

  // ── Fenótipo sugerido ──
  const fenotipos = {
    central: 'P1 Nipple',
    inferior: 'P2 Oval',
    difuso: 'P5 Globus',
    irregular: 'P3 Duck / P4 Snowman',
  };
  conduta.fenotipoSugerido = fenotipos[topografico] || '';

  // ── Tipo de anel ──
  if (biomecanicos.includes('reposicionar')) {
    conduta.anel.tipo = 'Assimétrico (ex: 250→150μm)';
  } else {
    conduta.anel.tipo = 'Simétrico';
  }

  // ── Arco ──
  if (biomecanicos.includes('redistribuir')) {
    conduta.anel.arco = 'Longo (140–210°)';
  } else {
    conduta.anel.arco = topografico === 'central' ? 'Curto (90–120°)' : 'Moderado (120–160°)';
  }

  // ── Espessura ──
  if (biomecanicos.includes('aplainar')) {
    conduta.anel.espessura = topografico === 'central' ? 'Moderada (150–200μm)' : 'Moderada/Alta (200–250μm)';
  } else {
    conduta.anel.espessura = 'Conforme planejamento individualizado';
  }

  // ── Posição ──
  if (biomecanicos.includes('reposicionar')) {
    conduta.anel.posicao = 'Alinhado ao ENM (Eixo Neutro Mecânico), não ao K-steep';
  } else if (topografico === 'central') {
    conduta.anel.posicao = 'Sobre o cone (meridiano mais íngreme)';
  } else if (topografico === 'inferior') {
    conduta.anel.posicao = 'Meridiano inferior';
  } else {
    conduta.anel.posicao = 'Conforme análise do eixo biomecânico';
  }

  // ── Alertas ──
  if (optico === 'desfavoravel') {
    conduta.alertas.push({
      tipo: 'warning',
      texto: 'Óptica desfavorável: risco de mapa topográfico melhorar sem ganho visual. HOA e eixos incoerentes.',
    });
  }
  if (optico === 'intermediario') {
    conduta.alertas.push({
      tipo: 'caution',
      texto: 'Óptica intermediária: monitorar coerência óptica no pós-operatório. Ganho visual possível mas incerto.',
    });
  }
  if (topografico === 'difuso') {
    conduta.alertas.push({
      tipo: 'info',
      texto: 'Cone difuso (P5 Globus): Indicado para suporte estrutural e restaurar tolerância a lentes (até 85 D). Nota: A não-convergência computacional é um limite do solver e não uma contraindicação clínica.',
    });
  }
  if (biomecanicos.includes('reposicionar') && !biomecanicos.includes('aplainar')) {
    conduta.alertas.push({
      tipo: 'info',
      texto: 'Reposicionar sem aplainar: o Vτ migra o ápice mas sem VR o achatamento será mínimo.',
    });
  }
  if (topografico === 'irregular' && !biomecanicos.includes('reposicionar')) {
    conduta.alertas.push({
      tipo: 'caution',
      texto: 'Cone irregular sem reposicionamento: fenótipos P3/P4 geralmente requerem Vτ (anel assimétrico) para resultado ótimo.',
    });
  }

  // ── Módulos relacionados ──
  const moduloMap = {
    aplainar: ['M02', 'M03', 'M04'],
    redistribuir: ['M06', 'M05'],
    reposicionar: ['M07', 'M08'],
  };
  const topoModulos = {
    central: ['M01', 'M09'],
    inferior: ['M01', 'M09', 'M05'],
    difuso: ['M01', 'M09'],
    irregular: ['M10', 'M09'],
  };
  const opticoModulos = {
    favoravel: ['M08'],
    intermediario: ['M08', 'M10'],
    desfavoravel: ['M08', 'M10'],
  };

  const allModulos = new Set();
  biomecanicos.forEach(b => (moduloMap[b] || []).forEach(m => allModulos.add(m)));
  (topoModulos[topografico] || []).forEach(m => allModulos.add(m));
  (opticoModulos[optico] || []).forEach(m => allModulos.add(m));
  // Sempre incluir profundidade e FEM como validação
  allModulos.add('M11');
  allModulos.add('M12');
  conduta.modulosRelacionados = [...allModulos].sort();

  // ── Frase clínica ──
  const opticoLabel = OPTICO_OPTIONS.find(o => o.id === optico)?.label || '';
  const topoLabel = TOPOGRAFICO_OPTIONS.find(t => t.id === topografico)?.label || '';
  const mecLabels = biomecanicos.map(b => BIOMECANICO_OPTIONS.find(o => o.id === b)?.label).filter(Boolean);
  const vetorLabels = biomecanicos.map(b => BIOMECANICO_OPTIONS.find(o => o.id === b)?.vetor).filter(Boolean);

  conduta.fraseClinica = `Óptica ${opticoLabel.toLowerCase()} · Cone ${topoLabel.toLowerCase()} · Mecanismo: ${mecLabels.join(' + ')} (${vetorLabels.join(' + ')})`;

  return conduta;
}

// ── Mapeamento de módulos para domínios AVBC ──
export const AVBC_MODULE_MAP = {
  M01: { domain: 'topografico', mechanism: null },
  M02: { domain: 'biomecanico', mechanism: 'aplainar' },
  M03: { domain: 'biomecanico', mechanism: 'aplainar' },
  M04: { domain: 'biomecanico', mechanism: 'aplainar' },
  M05: { domain: 'topografico', mechanism: 'redistribuir' },
  M06: { domain: 'biomecanico', mechanism: 'redistribuir' },
  M07: { domain: 'biomecanico', mechanism: 'reposicionar' },
  M08: { domain: 'optico', mechanism: 'reposicionar' },
  M09: { domain: 'topografico', mechanism: null },
  M10: { domain: 'optico', mechanism: null },
  M11: { domain: 'validacao', mechanism: null },
  M12: { domain: 'validacao', mechanism: null },
};
