import procedures from './catalog.js';

/** ========================
 *  State
 *  ======================== */
let selected = new Map(); // key -> { item, qty, unitPrice }
let showCodes = false;
let percent = 1.0;
let grandTotalValue = 0;
let query = '';

/** ========================
 *  DOM refs
 *  ======================== */
const $ = (s, r = document) => r.querySelector(s);
// const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
// Removed unused variable warning
const fmt = n => `$${(n ?? 0).toFixed(2)}`;
// Map certain keywords → subgroup key + label shown in the mini-box header
const SUBGROUP_MAP = [
  { test: /(^|\s)preventive new\b/i,      key: "prevNew", label: "Preventive New Pt" },
  { test: /(^|\s)preventive established\b/i, key: "prevEst", label: "Preventive Est Pt" },
  { test: /(^|\s)new pt\b/i,              key: "newpt",   label: "New Pt Office" },
  { test: /(^|\s)est pt\b/i,              key: "estpt",   label: "Est Pt Office" },
  { test: /(^|\s)established\b/i,         key: "estpt",   label: "Est Pt Office" }, // safety net
];

const SUBGROUP_ORDER = ["newpt","estpt","prevNew","prevEst","default"];

// Decide subgroup from keywords array
function detectVisitSubgroup(proc) {
  const blob = (proc.keywords || []).join(" ").toLowerCase();
  for (const rule of SUBGROUP_MAP) {
    if (rule.test.test(blob)) return { key: rule.key, label: rule.label };
  }
  return { key: "default", label: "" };
}

// Section containers
const sections = {
  visits: $('#section-visits .list'),
  procedures: $('#section-procedures .list'),
  labs: $('#section-labs .list'),
  meds: $('#section-meds .list'),
  contraceptives: $('#section-contraceptives .list')
};

// Controls
const searchInput = $('#searchInput');
const receiptItems = $('#receiptItems');
const grandTotalEl = $('#grandTotal');
const copyBtn = $('#copyReceipt');
const ocCheckbox = $('#addOC');
const ocSelect = $('#ocSelect');

/** ========================
 *  Helpers
 *  ======================== */
const debounce = (fn, ms = 180) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

function getCodes(obj) {
  const codes = [];
  if (obj.cpt) codes.push(`CPT: ${obj.cpt}`);
  if (obj.hcpcs) codes.push(`HCPCS: ${obj.hcpcs}`);
  if (obj.icd10) codes.push(`ICD-10: ${obj.icd10}`);
  return codes.join(' • ');
}

function createCodesContainer(proc) {
  const container = document.createElement('span');
  container.className = 'item-text-codes';

  const codesSpan = document.createElement('span');
  codesSpan.className = 'codes';

  const codesText = getCodes(proc);
  const shouldShow = Boolean(showCodes && codesText);

  if (shouldShow) {
    codesSpan.classList.add('show');
    codesSpan.textContent = `(${codesText})`;
  } else {
    container.hidden = true;
  }

  container.appendChild(codesSpan);
  return container;
}

function basePrice(item) {
  return Number(item.fullprice || 0);
}

function matchesSearch(p, q) {
  if (!q) return true;
  const hay = [
    p.name,
    p.cpt, p.hcpcs, p.icd10,
    (p.keywords || []).join(' '),
    p.category, p.visitType
  ].filter(Boolean).join(' ').toLowerCase();
  return hay.includes(q.toLowerCase());
}

/** ========================
 *  Section definitions
 *  ======================== */
const MULT_X_BUTTONS = {
  'Chlamydia (CHL)': [2, 3],
  'Gonorrhea (GC)': [2, 3]
};

const sectionDefs = [
  { id: 'section-visits', match: r => r.category === 'visits', bucket: 'visits' },
  { id: 'section-procedures', match: r => r.category === 'procedures', bucket: 'procedures' },
  { id: 'section-labs', match: r => r.category === 'labs', bucket: 'labs' },
  { id: 'section-meds', match: r => r.category === 'meds', bucket: 'meds' },
  { id: 'section-contraceptives', match: r => r.category === 'oral contraceptives', bucket: 'contraceptives' }
];

/** ========================
 *  Catalog rendering
 *  ======================== */
function clearSections() {
  Object.values(sections).forEach(el => { if (el) el.innerHTML = ''; });
}
function renderCatalog() {
  clearSections();
  Object.values(sections).forEach(el => {
    if (!el) return;
    el.innerHTML = '';
    el.classList.remove('has-sublists');
  });

  sectionDefs.forEach(def => {
    const listContainer = sections[def.bucket];
    if (!listContainer) return;

    // Filter catalog to this section + search
    const items = procedures.filter(p => def.match(p) && matchesSearch(p, query));

    // ===== VISITS: group by keywords into sublists =====
    if (def.bucket === "visits") {
      const groups = new Map(); // key -> {label, items[]}
      for (const p of items) {
        const g = detectVisitSubgroup(p);
        if (!groups.has(g.key)) groups.set(g.key, { label: g.label, items: [] });
        groups.get(g.key).items.push(p);
      }

      // Order the groups for the visual layout you want
      const orderedGroups = Array.from(groups.entries())
        .sort((a, b) => SUBGROUP_ORDER.indexOf(a[0]) - SUBGROUP_ORDER.indexOf(b[0]));

  for (const [, group] of orderedGroups) {
    if (!group.items.length) continue;

    // Mini-box like your printed ticket
    const sub = document.createElement("div");
    sub.className = "sublist";

    if (group.label) {
      const title = document.createElement("div");
      title.className = "subgroup-title";
      title.textContent = group.label;
      sub.appendChild(title);
    }

    group.items.forEach(proc => {
      const name = (proc.name || "").split("\n")[0];

      const row = document.createElement("div");
      row.className = "item";

      // Checkbox + label
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.name = name;
      label.appendChild(checkbox);

      const textWrap = document.createElement("span");
      textWrap.className = "item-text";

      const nameSpan = document.createElement("span");
      nameSpan.className = "item-name";
      nameSpan.textContent = name;
      textWrap.appendChild(nameSpan);

      const codesContainer = createCodesContainer(proc);
      textWrap.appendChild(codesContainer);

      label.appendChild(textWrap);
      row.appendChild(label);

      // Quick-add buttons (if any)
      if (MULT_X_BUTTONS[name]) {
        MULT_X_BUTTONS[name].forEach(mult => {
          const qb = document.createElement("button");
          qb.className = "btn";
          qb.textContent = `x${mult}`;
          qb.addEventListener("click", () => addLine(name, mult));
          row.appendChild(qb);
        });
      }

      // Codes (show/hide)
      // Codes are nested inside the text wrapper so they render beneath the name
      // Sync selection
      checkbox.addEventListener("change", e => {
        if (e.target.checked) addLine(name, 1); else removeLine(name);
      });
      if (selected.has(name)) checkbox.checked = true;

      sub.appendChild(row);
    });

    listContainer.appendChild(sub);
  }
  listContainer.classList.toggle('has-sublists', groups.size > 0);
  return; // finished visits; move to next section
}

    items.forEach(proc => {
      const name = (proc.name || "").split("\n")[0];
      const row = document.createElement("div");
      row.className = "item";

      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.name = name;
      label.appendChild(checkbox);

      const textWrap = document.createElement("span");
      textWrap.className = "item-text";

      const nameSpan = document.createElement("span");
      nameSpan.className = "item-name";
      nameSpan.textContent = name;
      textWrap.appendChild(nameSpan);

      const codesContainer = createCodesContainer(proc);
      textWrap.appendChild(codesContainer);

      label.appendChild(textWrap);
      row.appendChild(label);

      if (MULT_X_BUTTONS[name]) {
        MULT_X_BUTTONS[name].forEach(mult => {
          const qb = document.createElement("button");
          qb.className = "btn";
          qb.textContent = `x${mult}`;
          qb.addEventListener("click", () => addLine(name, mult));
          row.appendChild(qb);
        });
      }

      // Codes are nested inside the text wrapper so they render beneath the name

      checkbox.addEventListener("change", e => {
        if (e.target.checked) addLine(name, 1); else removeLine(name);
      });
      if (selected.has(name)) checkbox.checked = true;

      listContainer.appendChild(row);
    });
  });

  // Oral Contraceptives dropdown (unchanged)
  if (ocSelect) {
    const ocItems = procedures.filter(p => p.category === "oral contraceptives");
    ocSelect.innerHTML = '<option value="">Select Oral Contraceptive...</option>';
    ocItems.forEach(oc => {
      const opt = document.createElement("option");
      opt.value = oc.name;
      opt.textContent = oc.name;
      ocSelect.appendChild(opt);
    });
  }
}
/** ========================
 *  Receipt logic
 *  ======================== */
function recomputeTotal() {
  grandTotalValue = 0;
  for (const [, entry] of selected) {
    grandTotalValue += entry.unitPrice * entry.qty;
  }
  if (grandTotalEl) grandTotalEl.textContent = fmt(grandTotalValue);
}

function renderReceipt() {
  if (!receiptItems) return;

  if (selected.size === 0) {
    receiptItems.innerHTML = '<div class="empty-receipt">No items added yet</div>';
    recomputeTotal();
    return;
  }

  receiptItems.innerHTML = '';
  for (const [key, entry] of selected) {
    const { item, qty, unitPrice } = entry;
    const line = document.createElement('div');
    line.className = 'receipt-item';

    const info = document.createElement('div');
    info.className = 'receipt-item-info';
    const nm = document.createElement('div');
    nm.className = 'receipt-item-name';
    nm.textContent = item.name.split('\n')[0];
    const codes = document.createElement('div');
    codes.className = 'receipt-item-codes';
    codes.textContent = [item.cpt, item.hcpcs, item.icd10].filter(Boolean).join(' · ');
    info.appendChild(nm);
    info.appendChild(codes);

    const qtySel = document.createElement('select');
    qtySel.className = 'qty-select';
    for (let i = 1; i <= 15; i++) {
      const op = document.createElement('option');
      op.value = i;
      op.textContent = i;
      if (i === qty) op.selected = true;
      qtySel.appendChild(op);
    }
    qtySel.addEventListener('change', e => {
      selected.get(key).qty = parseInt(e.target.value, 10) || 1;
      renderReceipt();
    });

    const lineTotal = document.createElement('div');
    lineTotal.textContent = fmt(unitPrice * qty);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeLine(key));

    line.appendChild(info);
    line.appendChild(qtySel);
    line.appendChild(lineTotal);
    line.appendChild(removeBtn);

    receiptItems.appendChild(line);
  }
  recomputeTotal();
}

function addLine(name, qty = 1) {
  const item = procedures.find(p => (p.name || '').split('\n')[0] === name);
  if (!item) return;
  const unitPrice = basePrice(item) * percent;
  if (selected.has(name)) {
    selected.get(name).qty += qty;
    selected.get(name).unitPrice = unitPrice;
  } else {
    selected.set(name, { item, qty, unitPrice });
  }
  renderReceipt();
  const cb = document.querySelector(`.item input[type="checkbox"][data-name="${name}"]`);
  if (cb) cb.checked = true;
}

function removeLine(name) {
  selected.delete(name);
  renderReceipt();
  const cb = document.querySelector(`.item input[type="checkbox"][data-name="${name}"]`);
  if (cb) cb.checked = false;
}

/** ========================
 *  Search + Copy + Controls
 *  ======================== */
if (searchInput) {
  searchInput.addEventListener('input', debounce(e => {
    query = e.target.value || '';
    renderCatalog();
  }, 150));
}

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const lines = [];
    for (const [name, entry] of selected) {
      lines.push(`${name} x${entry.qty} — ${fmt(entry.unitPrice * entry.qty)}`);
    }
    const text = [
      '=== Receipt ===',
      `Date: ${new Date().toLocaleDateString()}`,
      `Fee Percentage: ${Math.round(percent * 100)}%`,
      'Services:',
      ...lines,
      `Total: ${fmt(grandTotalValue)}`
    ].join('\n');
    navigator.clipboard.writeText(text)
      .then(() => alert('Receipt copied to clipboard!'))
      .catch(() => alert('Failed to copy receipt.'));
  });
}

const percentSel = $('#percentSelector');
if (percentSel) {
  percentSel.addEventListener('change', e => {
    percent = parseFloat(e.target.value) / 100;
    for (const [, entry] of selected) {
      entry.unitPrice = basePrice(entry.item) * percent;
    }
    renderReceipt();
  });
}

const toggleCodesBtn = $('#toggleCodes');
if (toggleCodesBtn) {
  toggleCodesBtn.addEventListener('click', () => {
    showCodes = !showCodes;
    renderCatalog(); // Re-render so codes visibility matches state
  });
}

/** ========================
 *  Oral Contraceptives
 *  ======================== */
if (ocCheckbox && ocSelect) {
  ocCheckbox.addEventListener('change', e => {
    const selectedOC = ocSelect.value;
    if (!selectedOC) return;
    if (e.target.checked) addLine(selectedOC, 1);
    else removeLine(selectedOC);
  });
  ocSelect.addEventListener('change', e => {
    if (ocCheckbox.checked && e.target.value) addLine(e.target.value, 1);
  });
}

/** ========================
 *  Init (ensure DOM is ready)
 *  ======================== */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  renderCatalog();
  renderReceipt();
}