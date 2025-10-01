import procedures from './catalog.js';

  /** ========================
   *  State
   *  ======================== */
  let selected = new Map(); // key -> { item, qty, unitPrice }
  let showCodes = false;
  let percent = 1.0;
  let grandTotalValue = 0;
  let query = '';
  let activeVisitType = 'all';

  /** ========================
   *  DOM refs
   *  ======================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fmt = n => `$${(n ?? 0).toFixed(2)}`;

  const sections = {
    visits: $('#section-visits .list'),
    procedures: $('#section-procedures .list'),
    labs: $('#section-labs .list'),
    meds: $('#section-meds .list'),
    contraceptives: $('#section-contraceptives .list')
  };

  const visitTypesGrid = $('#visitTypesGrid');
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

  function visibleByVisitType(p) {
    if (p.category !== 'visits') return true;
    if (activeVisitType === 'all') return true;
    return (p.visitType || '') === activeVisitType;
  }

  /** ========================
   *  Visit-type buttons
   *  ======================== */
  function buildVisitTypes() {
    if (!visitTypesGrid) return;
    visitTypesGrid.innerHTML = '';
    const visitItems = procedures.filter(p => p.category === 'visits');
    const types = Array.from(new Set(visitItems.map(v => v.visitType).filter(Boolean)));

    function makeBtn(label, value, sub) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'visit-type-btn' + (activeVisitType === value ? ' active' : '');
      b.innerHTML = `<div>${label}</div>${sub ? `<div class="code">${sub}</div>` : ''}`;
      b.addEventListener('click', () => {
        activeVisitType = value;
        $$('.visit-type-btn', visitTypesGrid).forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        renderCatalog();
      });
      visitTypesGrid.appendChild(b);
    }

    makeBtn('All Visits', 'all', 'all visits');
    types.forEach(t => {
      const label = t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      makeBtn(label, t, t);
    });
  }

  /** ========================
   *  Section match rules (your logic, preserved)
   *  ======================== */
  const MULT_X_BUTTONS = {
    'Chlamydia (CHL)': [2, 3],
    'Gonorrhea (GC)': [2, 3]
  };

  const sectionDefs = [
    {
      id: 'section-visits',
      match: r => r.visitType || (/^992|^993/.test(r.cpt || '') && !/Preventive/i.test(r.name)),
      bucket: 'visits'
    },
    {
      id: 'section-procedures',
      match: r => ['Implant Insertion', 'Implant Removal', 'Implant Removal + Reinsertion', 'IUD Insertion', 'IUD Removal']
                 .includes((r.name || '').split('\n')[0]),
      bucket: 'procedures'
    },
    {
      id: 'section-labs',
      match: r => ['Chlamydia (CHL)', 'Gonorrhea (GC)', 'HPV', 'Liquid Based PAP', 'Conventional PAP']
                 .includes((r.name || '').split('\n')[0]),
      bucket: 'labs'
    },
    {
      id: 'section-meds',
      match: r => ['Doxycycline', 'Rocephin (Ceftriaxone inj)', 'Bicillin L-A', 'Depo (Medroxyprogesterone)', 'Nexplanon', 'NuvaRing', 'Xulane Patch']
                 .includes((r.name || '').split('\n')[0]),
      bucket: 'meds'
    },
    { id: 'section-contraceptives', match: () => false, bucket: 'contraceptives' } // handled by dropdown
  ];

  /** ========================
   *  Catalog rendering
   *  ======================== */
  function clearSections() {
    Object.values(sections).forEach(el => { if (el) el.innerHTML = ''; });
  }

  function renderCatalog() {
    clearSections();

    procedures.forEach(proc => {
      // choose section by first matching rule OR by explicit category fallback
      const def = sectionDefs.find(d => d.match(proc)) || { id: `section-${proc.category}`, bucket: proc.category };
      const listContainer = $(`#${def.id} .list`);
      if (!listContainer) return;

      if (!matchesSearch(proc, query)) return;
      if (!visibleByVisitType(proc)) return;

      const name = (proc.name || '').split('\n')[0];
      const row = document.createElement('div');
      row.className = 'item';

      // Checkbox + name
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.name = name;
      label.appendChild(checkbox);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = name;
      label.appendChild(nameSpan);
      row.appendChild(label);

      // Quick-add buttons (x2/x3) for specific labs
      if (MULT_X_BUTTONS[name]) {
        MULT_X_BUTTONS[name].forEach(mult => {
          const qb = document.createElement('button');
          qb.className = 'btn';
          qb.textContent = `x${mult}`;
          qb.addEventListener('click', () => addLine(name, mult));
          row.appendChild(qb);
        });
      }

      // Add button
      const addBtn = document.createElement('button');
      addBtn.className = 'btn';
      addBtn.textContent = 'Add';
      addBtn.addEventListener('click', () => addLine(name, 1));
      row.appendChild(addBtn);

      // Codes (toggleable)
      const codesSpan = document.createElement('span');
      codesSpan.className = 'codes' + (showCodes ? ' show' : '');
      const codes = getCodes(proc);
      if (codes) codesSpan.textContent = ` (${codes})`;
      row.appendChild(codesSpan);

      // Checkbox behavior
      checkbox.addEventListener('change', (e) => {
        const checked = e.target.checked;
        if (checked) addLine(name, 1);
        else removeLine(name);
      });

      // keep checkbox in sync with cart
      if (selected.has(name)) checkbox.checked = true;

      listContainer.appendChild(row);
    });

    // Contraceptives dropdown population (best-effort)
    if (ocSelect) {
      const ocNames = [
        'Alese','Apri','Aviane','Camila','Cryselle',
        'Levora','Lutera','Sprintec','Tri-Lo Marzia','Trivora'
      ];
      const ocItems = procedures.filter(p => ocNames.includes((p.name || '').split('\n')[0]));
      ocSelect.innerHTML = '<option value="">Select Oral Contraceptive...</option>';
      ocItems.forEach(oc => {
        const opt = document.createElement('option');
        opt.value = (oc.name || '').split('\n')[0];
        opt.textContent = (oc.name || '').split('\n')[0];
        ocSelect.appendChild(opt);
      });
    }
  }

  /** ========================
   *  Cart / Receipt
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
      removeBtn.addEventListener('click', () => {
        removeLine(key);
      });

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
    // check the source checkbox if rendered
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
   *  Search
   *  ======================== */
  if (searchInput) {
    searchInput.addEventListener('input', debounce(e => {
      query = e.target.value || '';
      renderCatalog();
    }, 150));
  }

  /** ========================
   *  Copy receipt
   *  ======================== */
  function copyReceipt() {
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
  }
  if (copyBtn) copyBtn.addEventListener('click', copyReceipt);

  /** ========================
   *  Optional controls (safe if absent)
   *  ======================== */
  const percentSel = $('#percentSelector');
  if (percentSel) {
    percentSel.addEventListener('change', e => {
      percent = parseFloat(e.target.value) / 100;
      // recompute unit prices
      for (const [k, entry] of selected) {
        entry.unitPrice = basePrice(entry.item) * percent;
      }
      renderReceipt();
    });
  }

  const toggleCodesBtn = $('#toggleCodes');
  if (toggleCodesBtn) {
    toggleCodesBtn.addEventListener('click', () => {
      showCodes = !showCodes;
      $$('.codes').forEach(el => el.classList.toggle('show', showCodes));
    });
  }

  /** ========================
   *  Oral Contraceptives wiring
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
   *  Kickoff
   *  ======================== */
  buildVisitTypes();
  renderCatalog();
  renderReceipt();