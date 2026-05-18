const XLSX = require('xlsx');
const wb = XLSX.readFile(__dirname + '/HM DR PAULO (1).xlsx');

const avg = arr => arr.length > 0 ? (arr.reduce((a,b)=>a+b,0)/arr.length) : null;
const sd = arr => {
  if(arr.length < 2) return null;
  const m = avg(arr);
  return Math.sqrt(arr.reduce((s,v) => s + (v-m)**2, 0) / (arr.length-1));
};
const fmt = (v,d=2) => v !== null ? v.toFixed(d) : 'N/A';

// Analyze each sheet
const allSheets = {};
let grandPre = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
let grandPost3m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
let grandPost6m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
let grandPost9m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
let grandPost12m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };

wb.SheetNames.forEach(sn => {
  const ws = wb.Sheets[sn];
  const data = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});
  const rows = data.slice(1).filter(r => r.some(v => v !== ''));
  
  let sheetPre = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
  let sheetPost3m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
  let sheetPost6m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
  let sheetPost9m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };
  let sheetPost12m = { K1:[], K2:[], KM:[], Astig:[], Kmax:[], Asf:[], PF:[], Coma:[] };

  rows.forEach(r => {
    // Pre-op: columns 10-19 (K1, eixoK1, K2, eixoK2, KM, Astig, Kmax, Asf, PF, Coma)
    const pushNum = (arr, val) => { if(typeof val === 'number' && !isNaN(val)) arr.push(val); };
    pushNum(sheetPre.K1, r[10]);
    pushNum(sheetPre.K2, r[12]);
    pushNum(sheetPre.KM, r[14]);
    pushNum(sheetPre.Astig, r[15]);
    pushNum(sheetPre.Kmax, r[16]);
    pushNum(sheetPre.Asf, r[17]);
    pushNum(sheetPre.PF, r[18]);
    pushNum(sheetPre.Coma, r[19]);
    
    // Scan for follow-up periods
    for(let c = 20; c < r.length - 10; c++) {
      const label = String(r[c]).toLowerCase().trim();
      if(label.includes('30 dia')) continue; // skip 30-day
      
      let target = null;
      if(label.includes('3 mes') || label === '3 meses') target = sheetPost3m;
      else if(label.includes('6 mes') || label === '6 meses') target = sheetPost6m;
      else if(label.includes('9 mes') || label === '9 meses') target = sheetPost9m;
      else if(label.includes('12 mes') || label === '12 meses') target = sheetPost12m;
      
      if(target) {
        // After the label, scan for K data. Pattern: AVSC, AVCC, PH, Esf, Cil, Eixo, K1, EixoK1, K2, EixoK2, KM, Astig, Kmax, Asf, PF, Coma
        // But column structure varies. Look for numeric K-like values (30-70 range)
        let kvals = [];
        for(let j = c+1; j < Math.min(c+18, r.length); j++) {
          if(typeof r[j] === 'number') kvals.push({col: j, val: r[j]});
        }
        
        // The pattern after label is typically: AVSC(skip), AVCC(skip), PH(skip), Esf, Cil, Eixo, K1, EixoK1, K2, EixoK2, KM, Astig, Kmax, Asf, PF, Coma
        // Find K1 (first value in 30-70 range after the label)
        let kStart = -1;
        for(let j = 0; j < kvals.length; j++) {
          if(kvals[j].val >= 30 && kvals[j].val <= 75) { kStart = j; break; }
        }
        
        if(kStart >= 0 && kStart + 7 < kvals.length) {
          pushNum(target.K1, kvals[kStart].val);
          pushNum(target.K2, kvals[kStart+1].val);
          pushNum(target.KM, kvals[kStart+2].val);
          pushNum(target.Astig, kvals[kStart+3].val);
          pushNum(target.Kmax, kvals[kStart+4].val);
          pushNum(target.Asf, kvals[kStart+5].val);
          pushNum(target.PF, kvals[kStart+6].val);
          if(kStart+7 < kvals.length) pushNum(target.Coma, kvals[kStart+7].val);
        }
      }
    }
  });
  
  // Copy to grand
  Object.keys(sheetPre).forEach(k => {
    grandPre[k].push(...sheetPre[k]);
    grandPost3m[k].push(...sheetPost3m[k]);
    grandPost6m[k].push(...sheetPost6m[k]);
    grandPost9m[k].push(...sheetPost9m[k]);
    grandPost12m[k].push(...sheetPost12m[k]);
  });
  
  allSheets[sn] = {
    n: rows.length,
    pre: Object.fromEntries(Object.entries(sheetPre).map(([k,v]) => [k, {mean: fmt(avg(v)), sd: fmt(sd(v)), n: v.length}])),
    post3m: Object.fromEntries(Object.entries(sheetPost3m).map(([k,v]) => [k, {mean: fmt(avg(v)), sd: fmt(sd(v)), n: v.length}])),
  };
});

console.log('=== SUMMARY PER RING TYPE ===');
Object.entries(allSheets).forEach(([k,v]) => {
  console.log(`\n--- ${k} (n=${v.n}) ---`);
  console.log('PRE:  K1=' + v.pre.K1.mean + '±' + v.pre.K1.sd + '  K2=' + v.pre.K2.mean + '±' + v.pre.K2.sd + '  KM=' + v.pre.KM.mean + '±' + v.pre.KM.sd + '  Astig=' + v.pre.Astig.mean + '±' + v.pre.Astig.sd + '  Kmax=' + v.pre.Kmax.mean + '±' + v.pre.Kmax.sd + '  Coma=' + v.pre.Coma.mean);
  console.log('3mPO: K1=' + v.post3m.K1.mean + ' (n='+v.post3m.K1.n+')  K2=' + v.post3m.K2.mean + '  KM=' + v.post3m.KM.mean + '  Astig=' + v.post3m.Astig.mean + '  Kmax=' + v.post3m.Kmax.mean);
});

console.log('\n\n=== GRAND TOTALS ===');
console.log('ALL PATIENTS PRE (n=' + grandPre.K1.length + '):');
console.log('  K1:    ' + fmt(avg(grandPre.K1)) + ' ± ' + fmt(sd(grandPre.K1)));
console.log('  K2:    ' + fmt(avg(grandPre.K2)) + ' ± ' + fmt(sd(grandPre.K2)));
console.log('  KM:    ' + fmt(avg(grandPre.KM)) + ' ± ' + fmt(sd(grandPre.KM)));
console.log('  Astig: ' + fmt(avg(grandPre.Astig)) + ' ± ' + fmt(sd(grandPre.Astig)));
console.log('  Kmax:  ' + fmt(avg(grandPre.Kmax)) + ' ± ' + fmt(sd(grandPre.Kmax)));
console.log('  PFino: ' + fmt(avg(grandPre.PF),0) + ' ± ' + fmt(sd(grandPre.PF),0));
console.log('  Coma:  ' + fmt(avg(grandPre.Coma),3) + ' ± ' + fmt(sd(grandPre.Coma),3));

console.log('\n3 MONTHS PO (n=' + grandPost3m.K1.length + '):');
console.log('  K1:    ' + fmt(avg(grandPost3m.K1)) + ' ± ' + fmt(sd(grandPost3m.K1)));
console.log('  K2:    ' + fmt(avg(grandPost3m.K2)) + ' ± ' + fmt(sd(grandPost3m.K2)));
console.log('  KM:    ' + fmt(avg(grandPost3m.KM)) + ' ± ' + fmt(sd(grandPost3m.KM)));
console.log('  Astig: ' + fmt(avg(grandPost3m.Astig)) + ' ± ' + fmt(sd(grandPost3m.Astig)));
console.log('  Kmax:  ' + fmt(avg(grandPost3m.Kmax)) + ' ± ' + fmt(sd(grandPost3m.Kmax)));

console.log('\n6 MONTHS PO (n=' + grandPost6m.K1.length + '):');
console.log('  K1:    ' + fmt(avg(grandPost6m.K1)) + ' ± ' + fmt(sd(grandPost6m.K1)));
console.log('  KM:    ' + fmt(avg(grandPost6m.KM)) + ' ± ' + fmt(sd(grandPost6m.KM)));
console.log('  Kmax:  ' + fmt(avg(grandPost6m.Kmax)) + ' ± ' + fmt(sd(grandPost6m.Kmax)));

console.log('\n9 MONTHS PO (n=' + grandPost9m.K1.length + '):');
console.log('  K1:    ' + fmt(avg(grandPost9m.K1)) + ' ± ' + fmt(sd(grandPost9m.K1)));
console.log('  KM:    ' + fmt(avg(grandPost9m.KM)) + ' ± ' + fmt(sd(grandPost9m.KM)));
console.log('  Kmax:  ' + fmt(avg(grandPost9m.Kmax)) + ' ± ' + fmt(sd(grandPost9m.Kmax)));

console.log('\n12 MONTHS PO (n=' + grandPost12m.K1.length + '):');
console.log('  K1:    ' + fmt(avg(grandPost12m.K1)) + ' ± ' + fmt(sd(grandPost12m.K1)));
console.log('  KM:    ' + fmt(avg(grandPost12m.KM)) + ' ± ' + fmt(sd(grandPost12m.KM)));
console.log('  Kmax:  ' + fmt(avg(grandPost12m.Kmax)) + ' ± ' + fmt(sd(grandPost12m.Kmax)));

// Delta analysis
console.log('\n=== DELTA ANALYSIS (Pre → Follow-up) ===');
if(grandPost3m.Kmax.length > 0) {
  console.log('ΔKmax pre→3m:  ' + fmt(avg(grandPre.Kmax) - avg(grandPost3m.Kmax)) + ' D reduction');
  console.log('ΔKM pre→3m:    ' + fmt(avg(grandPre.KM) - avg(grandPost3m.KM)) + ' D reduction');
  console.log('ΔAstig pre→3m: ' + fmt(avg(grandPre.Astig) - avg(grandPost3m.Astig)) + ' D reduction');
}
if(grandPost6m.Kmax.length > 0) {
  console.log('ΔKmax pre→6m:  ' + fmt(avg(grandPre.Kmax) - avg(grandPost6m.Kmax)) + ' D reduction');
}
if(grandPost9m.Kmax.length > 0) {
  console.log('ΔKmax pre→9m:  ' + fmt(avg(grandPre.Kmax) - avg(grandPost9m.Kmax)) + ' D reduction');
}
if(grandPost12m.Kmax.length > 0) {
  console.log('ΔKmax pre→12m: ' + fmt(avg(grandPre.Kmax) - avg(grandPost12m.Kmax)) + ' D reduction');
}

// Document summary data
console.log('\n=== FROM DOCUMENT (Freedom data) ===');
console.log('ΔK1 pré→3m: 1.47 D | ΔK1 3m→9m: 2.85 D | ΔK1 pré→9m: 4.32 D');
console.log('ΔK2 pré→3m: 2.09 D | ΔK2 3m→9m: 3.27 D | ΔK2 pré→9m: 5.36 D');
console.log('ΔKM pré→3m: 1.92 D | ΔKM 3m→9m: 3.01 D | ΔKM pré→9m: 4.94 D');
console.log('ΔKmax pré→3m: 0.35 D | ΔKmax 3m→9m: 4.70 D | ΔKmax pré→9m: 5.05 D');
console.log('ΔQ pré→3m: 0.42 | ΔQ 3m→9m: 0.37 | ΔQ pré→9m: 0.79');
console.log('ΔPaq pré→3m: 9.58 | ΔPaq 3m→9m: 33.19 | ΔPaq pré→9m: 42.77');
