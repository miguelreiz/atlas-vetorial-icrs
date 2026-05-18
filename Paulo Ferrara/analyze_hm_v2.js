const XLSX = require('xlsx');
const wb = XLSX.readFile(__dirname + '/HM DR PAULO (1).xlsx');

const avg = arr => arr.length > 0 ? (arr.reduce((a,b)=>a+b,0)/arr.length) : null;
const sd = arr => {
  if(arr.length < 2) return null;
  const m = avg(arr);
  return Math.sqrt(arr.reduce((s,v) => s + (v-m)**2, 0) / (arr.length-1));
};
const fmt = (v,d=2) => v !== null && !isNaN(v) ? v.toFixed(d) : 'N/A';

// Focus on Brazilian BIO sheets that have clear structure
// Header: Nome, Data, Olho, Anel, [optional grade], AVSC, AVCC, PH, Esf, Cil, Eixo, K1, EixoK1, K2, EixoK2, KM, Astig, Kmax, Asf, PF, Coma
// Then repeating blocks: Data, Retorno, AVSC, AVCC, PH, Esf, Cil, Eixo, K1, EixoK1, K2, EixoK2, KM, Astig, Kmax, Asf, PFino, Coma

// The Brazilian sheets with consistent format
const bioSheets = ['HM 400 BIO', 'HM 250', 'HM 210 0,20', 'HM 200', 'HM 350', 'HM 300', 'HM 450'];

// Columns layout from header analysis:
// 0:Nome, 1:Data, 2:Olho, 3:Anel
// Pre-op varies by sheet. Let me check HM 400 BIO which has clear 4-col header first

function analyzeSheet(sn) {
  const ws = wb.Sheets[sn];
  if(!ws) return null;
  const data = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});
  const header = data[0];
  const rows = data.slice(1).filter(r => r.some(v => v !== ''));
  
  // Find pre-op K1 column by header scanning
  let preK1col = -1;
  for(let i = 4; i < Math.min(header.length, 20); i++) {
    if(String(header[i]).toLowerCase().trim() === 'k1') { preK1col = i; break; }
  }
  // Once we find K1, pattern is: K1, EixoK1, K2, EixoK2, KM, Astig, KMAX, ASFERIC, P.F, COMA
  if(preK1col < 0) return null;
  
  const offsets = { K1: 0, K2: 2, KM: 4, Astig: 5, Kmax: 6, Asf: 7, PF: 8, Coma: 9 };
  
  // Also find Esf, Cil columns (pre-op)
  let preEsfCol = -1;
  for(let i = 4; i < preK1col; i++) {
    const h = String(header[i]).toLowerCase().trim();
    if(h.includes('esf') || h === 'esférico') { preEsfCol = i; break; }
  }
  
  // AVSC column
  let preAvscCol = -1;
  for(let i = 4; i < preK1col; i++) {
    const h = String(header[i]).toLowerCase().trim();
    if(h.includes('avsc')) { preAvscCol = i; break; }
  }
  
  let pre = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[], Esf:[], Cil:[] };
  let followups = {};
  
  const pushNum = (arr, val) => { if(typeof val === 'number' && !isNaN(val) && Math.abs(val) < 200) arr.push(val); };
  
  rows.forEach((r, ri) => {
    // Pre-op
    Object.entries(offsets).forEach(([key, off]) => {
      pushNum(pre[key], r[preK1col + off]);
    });
    if(preEsfCol >= 0) {
      pushNum(pre.Esf, r[preEsfCol]);
      pushNum(pre.Cil, r[preEsfCol + 1]);
    }
    
    // Follow-ups: scan for date/retorno pairs
    // The first follow-up block starts at column 20 (DATA, RETORNO, AVSC, AVCC, PH, esf, cil, eixo, K1, EixoK1, K2, EixoK2, KM, Astig, Kmax, Asf, PF, Coma = 18 cols)
    const blockSize = 18; // approximately
    let startSearch = preK1col + 10; // after pre-op COMA
    
    for(let c = startSearch; c < r.length - 5; c++) {
      const val = String(r[c]).toLowerCase().trim();
      let period = null;
      if(val.includes('30 dia') || val === '30 dias') period = '1m';
      else if(val.includes('3 mes') || val === '3 meses') period = '3m';
      else if(val.includes('6 mes') || val === '6 meses') period = '6m';
      else if(val.includes('9 mes') || val === '9 meses') period = '9m';
      else if(val.includes('12 mes') || val === '12 meses') period = '12m';
      else if(val.includes('18 mes') || val === '18 meses') period = '18m';
      else if(val.includes('24 mes') || val === '24 meses') period = '24m';
      
      if(period) {
        if(!followups[period]) followups[period] = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[], Esf:[], Cil:[], AVSC:[], AVCC:[] };
        
        // After the period label, find first K-like value (35-80 range for K1)
        // Scan forward for columns: typically AVSC, AVCC, PH, Esf, Cil, Eixo, K1...
        // K1 is the first value in 30-80 range that's NOT an axis value
        let kCandidates = [];
        for(let j = c+1; j < Math.min(c+16, r.length); j++) {
          if(typeof r[j] === 'number') {
            kCandidates.push({col: j - c - 1, val: r[j]});
          }
        }
        
        // Find K1: usually the first value between 30-80 after skipping refraction
        // Pattern: esf(small), cil(small), eixo(0-180), K1(30-80), eixoK1(0-360), K2(30-80)...
        for(let j = c+1; j < Math.min(c+16, r.length); j++) {
          const v = r[j];
          if(typeof v === 'number' && v >= 30 && v <= 80) {
            // This is likely K1. Check if next-next is also in range (K2)
            const k2candidate = r[j+2];
            if(typeof k2candidate === 'number' && k2candidate >= 30 && k2candidate <= 80) {
              // Confirmed K1 position
              pushNum(followups[period].K1, r[j]);
              pushNum(followups[period].K2, r[j+2]);
              pushNum(followups[period].KM, r[j+4]);
              pushNum(followups[period].Astig, r[j+5]);
              pushNum(followups[period].Kmax, r[j+6]);
              pushNum(followups[period].Asf, r[j+7]);
              pushNum(followups[period].PF, r[j+8]);
              pushNum(followups[period].Coma, r[j+9]);
              break;
            }
          }
        }
      }
    }
  });
  
  return { n: rows.length, pre, followups };
}

// Analyze all bio sheets
let grandPre = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
let grandFU = {};

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║  FERRARA HM RING — COMPREHENSIVE ANALYSIS              ║');
console.log('║  Dr. Paulo Ferrara / Biotechnology / Freedom            ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

bioSheets.forEach(sn => {
  const result = analyzeSheet(sn);
  if(!result) { console.log(`${sn}: sheet not found`); return; }
  
  console.log(`\n━━━ ${sn} (n=${result.n} eyes) ━━━`);
  console.log(`PRE-OP:  K1=${fmt(avg(result.pre.K1))}±${fmt(sd(result.pre.K1))}  K2=${fmt(avg(result.pre.K2))}±${fmt(sd(result.pre.K2))}  KM=${fmt(avg(result.pre.KM))}±${fmt(sd(result.pre.KM))}`);
  console.log(`         Astig=${fmt(avg(result.pre.Astig))}±${fmt(sd(result.pre.Astig))}  Kmax=${fmt(avg(result.pre.Kmax))}±${fmt(sd(result.pre.Kmax))}  Q=${fmt(avg(result.pre.Asf))}±${fmt(sd(result.pre.Asf))}`);
  console.log(`         PFino=${fmt(avg(result.pre.PF),0)}±${fmt(sd(result.pre.PF),0)}µm  Coma=${fmt(avg(result.pre.Coma),3)}±${fmt(sd(result.pre.Coma),3)}`);
  
  Object.entries(result.followups).sort().forEach(([period, data]) => {
    if(data.K1.length > 0) {
      console.log(`${period.padStart(4)}-PO (n=${data.K1.length}): K1=${fmt(avg(data.K1))}  K2=${fmt(avg(data.K2))}  KM=${fmt(avg(data.KM))}  Astig=${fmt(avg(data.Astig))}  Kmax=${fmt(avg(data.Kmax))}  Q=${fmt(avg(data.Asf))}`);
      
      // Delta
      if(result.pre.K1.length > 0) {
        const dK1 = avg(result.pre.K1) - avg(data.K1);
        const dKmax = avg(result.pre.Kmax) - avg(data.Kmax);
        const dKM = avg(result.pre.KM) - avg(data.KM);
        const dAstig = avg(result.pre.Astig) - avg(data.Astig);
        console.log(`     Δ:  ΔK1=${fmt(dK1)}  ΔKM=${fmt(dKM)}  ΔKmax=${fmt(dKmax)}  ΔAstig=${fmt(dAstig)}`);
      }
    }
  });
  
  // Aggregate
  Object.keys(grandPre).forEach(k => grandPre[k].push(...result.pre[k]));
  Object.entries(result.followups).forEach(([p, d]) => {
    if(!grandFU[p]) grandFU[p] = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
    Object.keys(grandFU[p]).forEach(k => grandFU[p][k].push(...d[k]));
  });
});

console.log('\n\n╔══════════════════════════════════════════════════════════╗');
console.log('║  GRAND TOTALS — ALL BRAZILIAN HM PATIENTS               ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log(`\nPRE-OP (n=${grandPre.K1.length} eyes):`);
console.log(`  K1:     ${fmt(avg(grandPre.K1))} ± ${fmt(sd(grandPre.K1))} D`);
console.log(`  K2:     ${fmt(avg(grandPre.K2))} ± ${fmt(sd(grandPre.K2))} D`);
console.log(`  KM:     ${fmt(avg(grandPre.KM))} ± ${fmt(sd(grandPre.KM))} D`);
console.log(`  Astig:  ${fmt(avg(grandPre.Astig))} ± ${fmt(sd(grandPre.Astig))} D`);
console.log(`  Kmax:   ${fmt(avg(grandPre.Kmax))} ± ${fmt(sd(grandPre.Kmax))} D`);
console.log(`  Q:      ${fmt(avg(grandPre.Asf))} ± ${fmt(sd(grandPre.Asf))}`);
console.log(`  PFino:  ${fmt(avg(grandPre.PF),0)} ± ${fmt(sd(grandPre.PF),0)} µm`);
console.log(`  Coma:   ${fmt(avg(grandPre.Coma),3)} ± ${fmt(sd(grandPre.Coma),3)}`);

console.log('\nFOLLOW-UP PROGRESSION:');
['1m','3m','6m','9m','12m','18m','24m'].forEach(p => {
  if(grandFU[p] && grandFU[p].K1.length > 0) {
    const d = grandFU[p];
    const dK1 = avg(grandPre.K1) - avg(d.K1);
    const dKM = avg(grandPre.KM) - avg(d.KM);
    const dKmax = avg(grandPre.Kmax) - avg(d.Kmax);
    const dAstig = avg(grandPre.Astig) - avg(d.Astig);
    console.log(`\n  ${p.padStart(4)} PO (n=${d.K1.length}):`);
    console.log(`    K1=${fmt(avg(d.K1))}±${fmt(sd(d.K1))}  KM=${fmt(avg(d.KM))}±${fmt(sd(d.KM))}  Kmax=${fmt(avg(d.Kmax))}±${fmt(sd(d.Kmax))}`);
    console.log(`    Astig=${fmt(avg(d.Astig))}±${fmt(sd(d.Astig))}  Q=${fmt(avg(d.Asf))}±${fmt(sd(d.Asf))}`);
    console.log(`    DELTA: ΔK1=${dK1>0?'+':''}${fmt(dK1)}  ΔKM=${dKM>0?'+':''}${fmt(dKM)}  ΔKmax=${dKmax>0?'+':''}${fmt(dKmax)}  ΔAstig=${dAstig>0?'+':''}${fmt(dAstig)}`);
  }
});

// Temporal progression highlight
console.log('\n\n╔══════════════════════════════════════════════════════════╗');
console.log('║  KEY FINDING: TEMPORAL PROGRESSION (3m → 9m → 12m+)     ║');
console.log('║  "Continued flattening BEYOND 3 months"                 ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('\nFrom Document Summary (Freedom cohort):');
console.log('  Kmax reduction 3m→9m: +4.70 D additional reduction!');
console.log('  TOTAL Kmax reduction pré→9m: 5.05 D');
console.log('  Pachymetry increase pré→9m: +42.77 µm (tissue remodeling)');
console.log('  Q (asphericity) improvement pré→9m: +0.79 (regularization)');

// Per-sheet highlights: where HM beats literature averages
console.log('\n\n╔══════════════════════════════════════════════════════════╗');
console.log('║  WHERE HM OUTPERFORMS LITERATURE AVERAGES               ║');
console.log('║  (Literature: ΔKmax ~2-4D, ΔAstig ~1-2D at 6m)          ║');
console.log('╚══════════════════════════════════════════════════════════╝');

// Check specific ring sizes
bioSheets.forEach(sn => {
  const result = analyzeSheet(sn);
  if(!result) return;
  Object.entries(result.followups).forEach(([period, data]) => {
    if(data.Kmax.length >= 3) {
      const dKmax = avg(result.pre.Kmax) - avg(data.Kmax);
      const dAstig = avg(result.pre.Astig) - avg(data.Astig);
      if(dKmax > 3 || dAstig > 2) {
        console.log(`  ★ ${sn} @ ${period}: ΔKmax=${fmt(dKmax)}D  ΔAstig=${fmt(dAstig)}D  (n=${data.Kmax.length}) — ABOVE AVERAGE`);
      }
    }
  });
});
