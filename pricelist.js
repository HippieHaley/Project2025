import procedures from './catalog.js';

/** ---- Enhanced State ---- **/
let selected = {};
let showCodes = false;
let percent = 1.0;
let grandTotalValue = 0;

/** ---- Enhanced Helper Functions ---- **/
function getCodes(name) {
  const proc = procedures.find(p => p.name === name || p.name.split("\n")[0] === name);
  if (!proc) return '';
  let codes = [];
  if (proc.cpt) codes.push(`CPT: ${proc.cpt}`);
  if (proc.hcpcs) codes.push(`HCPCS: ${proc.hcpcs}`);
  if (proc.icd10) codes.push(`ICD-10: ${proc.icd10}`);
  return codes.join(' • ');
}

function money(amount) {
  return `$${amount.toFixed(2)}`;
}

function getFullPrice(serviceName) {
  const procedure = procedures.find(p => p.name === serviceName || p.name.split("\n")[0] === serviceName);
  return procedure ? procedure.fullprice : 0;
}

/** ---- Enhanced Config ---- **/
const MULT_X_BUTTONS = {
  "Chlamydia (CHL)": [2, 3],
  "Gonorrhea (GC)": [2, 3]
};

/** ---- Enhanced Receipt Management ---- **/
function recomputeTotal() {
  grandTotalValue = Object.values(selected).reduce((total, item) => total + (item.price * item.qty), 0);
  document.getElementById('receipt-total').textContent = money(grandTotalValue);
  document.getElementById('grandTotal').textContent = money(grandTotalValue);
}

function addLine(name, qty = 1) {
  const proc = procedures.find(p => p.name === name || p.name.split("\n")[0] === name);
  if (!proc) return;

  const unitPrice = proc.fullprice * percent;
  const id = name;

  if (selected[id]) {
    // Update existing line
    selected[id].qty += qty;
    selected[id].price = unitPrice;
    selected[id].total = selected[id].qty * unitPrice;
    
    // Update display
    if (selected[id].qtySelect) {
      selected[id].qtySelect.value = selected[id].qty;
    }
    selected[id].text.textContent = `${name} - ${money(unitPrice)}`;
    selected[id].span.textContent = `${name} x${selected[id].qty} — ${money(selected[id].total)}`;
  } else {
    // Create new line with enhanced features from both versions
    const lineEl = document.createElement('div');
    lineEl.className = 'receipt-line receipt-item';

    // Text display (from first version)
    const text = document.createElement('span');
    text.textContent = `${name} - ${money(unitPrice)}`;
    
    // Quantity selector (from second version)
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
      selected[id].total = newQty * unitPrice;
      selected[id].span.textContent = `${name} x${newQty} — ${money(selected[id].total)}`;
      recomputeTotal();
    };

    // Enhanced display span (from second version)
    const span = document.createElement('span');
    span.textContent = `${name} x${qty} — ${money(unitPrice * qty)}`;

    // Remove button (combined features)
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.textContent = 'X';
    removeBtn.onclick = () => {
      lineEl.remove();
      delete selected[id];
      recomputeTotal();
      // Uncheck checkboxes if they exist
      const checkboxes = document.querySelectorAll(`input[data-name="${name}"]`);
      checkboxes.forEach(cb => (cb.checked = false));
    };

    // Assemble the line
    lineEl.appendChild(text);
    lineEl.appendChild(qtySelect);
    lineEl.appendChild(span);
    lineEl.appendChild(removeBtn);

    document.getElementById('receipt-lines').appendChild(lineEl);

    selected[id] = { 
      price: unitPrice, 
      qty: qty, 
      total: unitPrice * qty,
      lineEl, 
      text, 
      span, 
      qtySelect 
    };
  }
  
  recomputeTotal();
}

function quickAdd(service, times) {
  addLine(service, times);
}

/** ---- Enhanced UI Rendering ---- **/
function render() {
  // Section definitions (combined logic)
  const sectionsDef = [
    { 
      id: 'section-visits', 
      match: (r) => r.visitType || (/^992|^993/.test(r.cpt || "") && !/Preventive/i.test(r.name))
    },
    { 
      id: 'section-procedures', 
      match: (r) => ["Implant Insertion", "Implant Removal", "Implant Removal + Reinsertion", "IUD Insertion", "IUD Removal"].includes(r.name) ||
                   ["Implant Insertion", "Implant Removal", "Implant Removal + Reinsertion", "IUD Insertion", "IUD Removal"].includes(r.name.split("\n")[0])
    },
    { 
      id: 'section-labs', 
      match: (r) => ["Chlamydia (CHL)", "Gonorrhea (GC)", "HPV", "Liquid Based PAP", "Conventional PAP"].includes(r.name) ||
                   ["Chlamydia (CHL)", "Gonorrhea (GC)", "HPV", "Liquid Based PAP", "Conventional PAP"].includes(r.name.split("\n")[0])
    },
    { 
      id: 'section-meds', 
      match: (r) => ["Doxycycline", "Rocephin (Ceftriaxone inj)", "Bicillin L-A", "Depo (Medroxyprogesterone)", "Nexplanon", "NuvaRing", "Xulane Patch"].includes(r.name) ||
                   ["Doxycycline", "Rocephin (Ceftriaxone inj)", "Bicillin L-A", "Depo (Medroxyprogesterone)", "Nexplanon", "NuvaRing", "Xulane Patch"].includes(r.name.split("\n")[0])
    },
    { id: 'section-contraceptives', match: () => false } // dropdown handled separately
  ];

  // Render sections with combined checkbox + button interface
  sectionsDef.forEach(def => {
    const section = document.getElementById(def.id);
    if (!section) return;
    
    const listContainer = section.querySelector('.list');
    listContainer.innerHTML = '';

    procedures.filter(def.match).forEach(procedure => {
      const shortName = procedure.name.split("\n")[0];
      
      const itemEl = document.createElement('div');
      itemEl.className = 'item';

      // Checkbox interface (from first version)
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.name = shortName;

      checkbox.onchange = (e) => {
        if (e.target.checked) {
          addLine(shortName, 1);
        } else {
          if (selected[shortName]) {
            selected[shortName].lineEl.remove();
            delete selected[shortName];
            recomputeTotal();
          }
        }
      };

      const nameSpan = document.createElement('span');
      nameSpan.textContent = shortName;

      label.appendChild(checkbox);
      label.appendChild(nameSpan);
      itemEl.appendChild(label);

      // Button interface (from second version)
      const addBtn = document.createElement('button');
      addBtn.className = 'btn';
      addBtn.textContent = 'Add';
      addBtn.onclick = () => addLine(shortName, 1);

      // Quick add buttons for multipliers
      if (MULT_X_BUTTONS[shortName]) {
        MULT_X_BUTTONS[shortName].forEach(multiplier => {
          const quickBtn = document.createElement('button');
          quickBtn.className = 'btn';
          quickBtn.textContent = `x${multiplier}`;
          quickBtn.onclick = () => quickAdd(shortName, multiplier);
          itemEl.appendChild(quickBtn);
        });
      }

      itemEl.appendChild(addBtn);

      // Codes display
      const codesSpan = document.createElement('span');
      codesSpan.className = 'codes' + (showCodes ? ' show' : '');
      const codesText = getCodes(procedure.name);
      if (codesText) codesSpan.textContent = ` (${codesText})`;
      itemEl.appendChild(codesSpan);

      listContainer.appendChild(itemEl);
    });
  });

  // Enhanced Oral Contraceptives section
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

  // Combined OC event handling
  const addOCCheckbox = document.getElementById('addOC');
  if (addOCCheckbox) {
    addOCCheckbox.onchange = (e) => {
      const selectedOC = ocSelect.value;
      if (e.target.checked) {
        if (selectedOC) addLine(selectedOC, 1);
      } else {
        if (selectedOC && selected[selectedOC]) {
          selected[selectedOC].lineEl.remove();
          delete selected[selectedOC];
          recomputeTotal();
        }
      }
    };
  }

  const addOCButton = document.getElementById('addOCButton');
  if (addOCButton) {
    addOCButton.onclick = () => {
      const selectedOC = ocSelect.value;
      if (selectedOC) {
        addLine(selectedOC, 1);
        ocSelect.value = "";
      }
    };
  }

  ocSelect.onchange = (e) => {
    const selectedOC = e.target.value;
    if (addOCCheckbox && addOCCheckbox.checked) {
      addLine(selectedOC, 1);
    }
  };
}

/** ---- Enhanced Event Handlers ---- **/
function copyReceipt() {
  const lines = Object.keys(selected).map(name => 
    `${name} x${selected[name].qty} — ${money(selected[name].price * selected[name].qty)}`
  );
  
  const text = [
    "=== Receipt ===",
    `Date: ${new Date().toLocaleDateString()}`,
    `Fee Percentage: ${Math.round(percent * 100)}%`,
    "Services:",
    ...lines,
    `Total: ${money(grandTotalValue)}`
  ].join("\n");
  
  navigator.clipboard.writeText(text)
    .then(() => alert('Receipt copied to clipboard!'))
    .catch(() => alert('Failed to copy receipt.'));
}

// Percentage selector (from second version)
document.getElementById('percentSelector')?.addEventListener('change', (e) => {
  percent = parseFloat(e.target.value) / 100;
  Object.keys(selected).forEach(key => {
    const basePrice = getFullPrice(key);
    selected[key].price = basePrice * percent;
    selected[key].total = selected[key].price * selected[key].qty;
    
    // Update all display elements
    if (selected[key].text) {
      selected[key].text.textContent = `${key} - ${money(selected[key].price)}`;
    }
    if (selected[key].span) {
      selected[key].span.textContent = `${key} x${selected[key].qty} — ${money(selected[key].total)}`;
    }
  });
  recomputeTotal();
});

// Toggle codes (combined)
document.getElementById('toggleCodes').onclick = () => {
  showCodes = !showCodes;
  document.querySelectorAll('.codes').forEach(el => {
    el.classList.toggle('show', showCodes);
  });
};

document.getElementById('copyReceipt').onclick = copyReceipt;

/** ---- Initialization ---- **/
render();