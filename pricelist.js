import procedures from './catalog.js';

/** ---- Helper Functions ---- **/
function getFullPrice(serviceName) {
  const procedure = procedures.find(p => p.name.split("\n")[0] === serviceName || p.name === serviceName);
  return procedure ? procedure.fullprice : 0;
}

function money(amount) {
  return `$${amount.toFixed(2)}`;
}

/** ---- Config ---- **/
const MULT_X_BUTTONS = {
  "Chlamydia (CHL)": [2, 3],
  "Gonorrhea (GC)": [2, 3]
};

/** ---- State ---- **/
let percent = 1.0;
let showCodes = false;
let grandTotalValue = 0;
const selected = {};

const getCodes = (service) => {
  const row = procedures.find(r => r.name.split("\n")[0] === service || r.name === service);
  if (!row) return "";
  const bits = [];
  if (row.cpt) bits.push(`CPT: ${row.cpt}`);
  if (row.hcpcs) bits.push(`HCPCS: ${row.hcpcs}`);
  if (row.icd10) bits.push(`ICD-10: ${row.icd10}`);
  return bits.join(" • ");
};

const recomputeTotal = () => {
  grandTotalValue = Object.values(selected).reduce((s, x) => s + x.total, 0);
  document.getElementById('grandTotal').textContent = money(grandTotalValue);
};

/** ---- Receipt ops ---- **/
function addLine(service, qty = 1) {
  const unit = getFullPrice(service) * percent;
  const id = service;
  
  if (selected[id]) {
    selected[id].qty += qty;
    selected[id].total = selected[id].qty * selected[id].unit;
    selected[id].span.textContent = `${service} x${selected[id].qty} — ${money(selected[id].total)}`;
    recomputeTotal();
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'receipt-item';

  const span = document.createElement('span');
  span.textContent = `${service} x${qty} — ${money(unit * qty)}`;
  
  const qtySelect = document.createElement('select');
  qtySelect.className = 'qty-select';
  for (let n = 1; n <= 10; n++) {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = n;
    if (n === qty) opt.selected = true;
    qtySelect.appendChild(opt);
  }
  qtySelect.onchange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    selected[id].qty = newQty;
    selected[id].total = newQty * selected[id].unit;
    selected[id].span.textContent = `${service} x${newQty} — ${money(selected[id].total)}`;
    recomputeTotal();
  };

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove';
  removeBtn.textContent = 'X';
  removeBtn.onclick = () => {
    wrap.remove();
    delete selected[id];
    recomputeTotal();
  };

  wrap.appendChild(span);
  wrap.appendChild(qtySelect);
  wrap.appendChild(removeBtn);

  document.getElementById('receiptItems').appendChild(wrap);
  selected[id] = { qty, unit, total: unit * qty, span, lineEl: wrap };
  recomputeTotal();
}

function quickAdd(service, times) {
  addLine(service, times);
}

/** ---- UI render ---- **/
const sectionsDef = [
  { 
    id: 'section-visits', 
    title: "Visit Codes", 
    match: (r) => /^992|^993/.test(r.cpt || "") && !/Preventive/i.test(r.name) 
  },
  { 
    id: 'section-procedures', 
    title: "Procedures", 
    match: (r) => ["Implant Insertion", "Implant Removal", "Implant Removal + Reinsertion", "IUD Insertion", "IUD Removal"].includes(r.name.split("\n")[0]) 
  },
  { 
    id: 'section-labs', 
    title: "Labs", 
    match: (r) => ["Chlamydia (CHL)", "Gonorrhea (GC)", "HPV", "Liquid Based PAP", "Conventional PAP"].includes(r.name.split("\n")[0]) 
  },
  { 
    id: 'section-meds', 
    title: "Medications & Supplies", 
    match: (r) => ["Doxycycline", "Rocephin (Ceftriaxone inj)", "Bicillin L-A", "Depo (Medroxyprogesterone)", "Nexplanon", "NuvaRing", "Xulane Patch"].includes(r.name.split("\n")[0]) 
  }
];

function render() {
  // Render regular sections
  sectionsDef.forEach(def => {
    const section = document.getElementById(def.id);
    const listContainer = section.querySelector('.list');
    listContainer.innerHTML = '';

    const matchingProcedures = procedures.filter(def.match);
    
    matchingProcedures.forEach(procedure => {
      const shortName = procedure.name.split("\n")[0];
      
      const itemEl = document.createElement('div');
      itemEl.className = 'item';

      const addBtn = document.createElement('button');
      addBtn.className = 'btn';
      addBtn.textContent = 'Add';
      addBtn.onclick = () => addLine(shortName, 1);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = shortName;

      // Add quick buttons for CHL/GC
      if (MULT_X_BUTTONS[shortName]) {
        MULT_X_BUTTONS[shortName].forEach(multiplier => {
          const quickBtn = document.createElement('button');
          quickBtn.className = 'btn';
          quickBtn.textContent = `x${multiplier}`;
          quickBtn.onclick = () => quickAdd(shortName, multiplier);
          itemEl.appendChild(quickBtn);
        });
      }

      // Codes display
      const codesSpan = document.createElement('span');
      codesSpan.className = 'codes' + (showCodes ? ' show' : '');
      const codesText = getCodes(procedure.name);
      if (codesText) {
        codesSpan.textContent = ` (${codesText})`;
      }

      itemEl.appendChild(addBtn);
      itemEl.appendChild(nameSpan);
      itemEl.appendChild(codesSpan);
      listContainer.appendChild(itemEl);
    });
  });

  // Render OC dropdown
  const ocProcedures = procedures.filter(p => 
    ["Alese", "Apri", "Aviane", "Camila", "Cryselle", "Levora", "Lutera", "Sprintec", "Tri-Lo Marzia", "Trivora"].includes(p.name)
  );
  
  const ocSelect = document.getElementById('ocSelect');
  ocSelect.innerHTML = '<option value="">Select Oral Contraceptive...</option>';
  
  ocProcedures.forEach(oc => {
    const option = document.createElement('option');
    option.value = oc.name;
    option.textContent = oc.name;
    ocSelect.appendChild(option);
  });

  document.getElementById('addOC').onclick = () => {
    const selectedOC = ocSelect.value;
    if (selectedOC) {
      addLine(selectedOC, 1);
      ocSelect.value = "";
    }
  };
}

/** ---- Events ---- **/
document.getElementById('percentSelector').addEventListener('change', (e) => {
  percent = parseFloat(e.target.value) / 100;
  Object.keys(selected).forEach(key => {
    selected[key].unit = getFullPrice(key) * percent;
    selected[key].total = selected[key].unit * selected[key].qty;
    selected[key].span.textContent = `${key} x${selected[key].qty} — ${money(selected[key].total)}`;
  });
  recomputeTotal();
});

document.getElementById('toggleCodes').addEventListener('change', (e) => {
  showCodes = e.target.checked;
  document.querySelectorAll('.codes').forEach(el => {
    el.classList.toggle('show', showCodes);
  });
});

document.getElementById('copyReceipt').addEventListener('click', () => {
  const lines = Object.keys(selected).map(k => 
    `${k} x${selected[k].qty} — ${money(selected[k].total)}`
  );
  
  const txt = [
    "=== Receipt ===",
    `Date: ${new Date().toLocaleDateString()}`,
    `Fee Percentage: ${Math.round(percent * 100)}%`,
    "Services:",
    ...lines,
    `Total: ${money(grandTotalValue)}`
  ].join("\n");
  
  navigator.clipboard.writeText(txt)
    .then(() => alert('Receipt copied to clipboard!'))
    .catch(() => alert('Failed to copy receipt.'));
});

/** ---- Init ---- **/
render();