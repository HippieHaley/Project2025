// pricelist.js
import catalog from "./catalog.js";

/** STATE **/
let percent = 1.0;
const selected = new Map(); // key: serviceId, value: { item, qty, base, percentPrice }
const serviceId = (row) => `${row.service}__${row.cpt || ''}__${row.hcpcs || ''}`;

/** DOM **/
const visitsEl     = document.querySelector("#section-visits .list");
const proceduresEl = document.querySelector("#section-procedures .list");
const labsEl       = document.querySelector("#section-labs .list");
const medsEl       = document.querySelector("#section-meds .list");

const ocSelect = document.getElementById("ocSelect");
const addOCBtn = document.getElementById("addOC");

const percentSelector = document.getElementById("percentSelector");
const toggleCodes = document.getElementById("toggleCodes");
const receiptItemsEl = document.getElementById("receiptItems");
const grandTotalEl = document.getElementById("grandTotal");

/** HELPERS **/
const fmt = (n) => `$${(Math.round(n * 100) / 100).toFixed(2)}`;
const priceAtPercent = (base) => base * percent;
const isOC = (row) => (row.hcpcs || "").toUpperCase() === "S4993";
const isVisit = (row) => /^(9920[234]|9921[1234]|9938[456]|9939[456])/.test(row.cpt || "");
const isLab = (row) => /(87|88|86|81)\d{3}/.test(row.cpt || "") || /(HPV|PAP|RPR|TPPA|HIV|Chlamydia|Gonorrhea|Wet Mount|Urine Dip)/i.test(row.service);
const isProcedure = (row) =>
  /(IUD|Implant|Vasectomy|Wart|Injection Fee|Venipuncture)/i.test(row.service) ||
  /(11(981|982|983)|5830[01]|55250|96372|36415)/.test(row.cpt || "");
const isMedSupply = (row) => !isVisit(row) && !isLab(row) && !isProcedure(row) && !isOC(row);

/** RENDER: left-side lists **/
function makeItemRow(row) {
  const id = serviceId(row);
  const wrap = document.createElement("div");
  wrap.className = "item";

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.addEventListener("change", () => {
    if (cb.checked) addToReceipt(row, 1);
    else removeFromReceipt(id);
  });

  const label = document.createElement("label");
  label.style.cursor = "pointer";
  label.textContent = row.service;

  const codes = document.createElement("span");
  codes.className = "codes";
  const pieces = [];
  if (row.cpt)   pieces.push(`CPT ${row.cpt}`);
  if (row.hcpcs) pieces.push(`HCPCS ${row.hcpcs}`);
  if (row.icd10) pieces.push(`ICD-10 ${row.icd10}`);
  codes.textContent = pieces.length ? ` — ${pieces.join(" • ")}` : "";
  label.appendChild(codes);

  wrap.appendChild(cb);
  wrap.appendChild(label);
  // keep a handle to the checkbox for unchecking when removed from receipt
  wrap._checkbox = cb;
  wrap._id = id;
  return wrap;
}

function renderSections() {
  const visits     = [];
  const procedures = [];
  const labs       = [];
  const meds       = [];
  const ocs        = [];

  // keep original catalog order “as the ticket” as much as possible
  for (const row of catalog) {
    if (isVisit(row))      visits.push(row);
    else if (isProcedure(row)) procedures.push(row);
    else if (isLab(row))   labs.push(row);
    else if (isOC(row))    ocs.push(row);
    else                   meds.push(row);
  }

  // render lists
  [ [visitsEl, visits], [proceduresEl, procedures], [labsEl, labs], [medsEl, meds] ]
  .forEach(([el, arr]) => {
    el.innerHTML = "";
    arr.forEach(row => el.appendChild(makeItemRow(row)));
  });

  // OCs dropdown (alphabetical by service)
  ocs.sort((a, b) => a.service.localeCompare(b.service));
  ocSelect.innerHTML = "";
  ocs.forEach(row => {
    const opt = document.createElement("option");
    opt.value = serviceId(row);
    opt.textContent = row.service;
    opt._row = row;
    ocSelect.appendChild(opt);
  });
}

/** RECEIPT **/
function addToReceipt(row, qty = 1) {
  const id = serviceId(row);
  if (selected.has(id)) {
    // bump qty
    const slot = selected.get(id);
    slot.qty = Math.min(13, slot.qty + qty);
    updateReceiptRow(id);
  } else {
    selected.set(id, {
      item: row,
      qty: Math.max(1, Math.min(13, qty)),
      base: row.fullprice || 0
    });
    insertReceiptRow(id);
  }
  updateTotal();
  // check the checkbox in the list if present
  checkLeftCheckbox(id, true);
}

function removeFromReceipt(id) {
  // uncheck left list checkbox if present
  checkLeftCheckbox(id, false);
  // remove from state + DOM
  selected.delete(id);
  const rowEl = document.querySelector(`[data-receipt-id="${cssEscape(id)}"]`);
  if (rowEl) rowEl.remove();
  updateTotal();
}

function insertReceiptRow(id) {
  const { item, qty, base } = selected.get(id);

  const line = document.createElement("div");
  line.className = "receipt-item";
  line.dataset.receiptId = id;

  const label = document.createElement("div");
  label.textContent = item.service; // do NOT show "x1" here
  line.appendChild(label);

  const qtySel = document.createElement("select");
  qtySel.className = "qty-select";
  for (let i = 1; i <= 13; i++) {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = `Qty ${i}`;
    qtySel.appendChild(o);
  }
  qtySel.value = String(qty);
  qtySel.addEventListener("change", () => {
    const val = Math.min(13, Math.max(1, parseInt(qtySel.value, 10) || 1));
    selected.get(id).qty = val;
    updateReceiptRow(id);
    updateTotal();
  });
  line.appendChild(qtySel);

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove";
  removeBtn.textContent = "X";
  removeBtn.addEventListener("click", () => removeFromReceipt(id));
  line.appendChild(removeBtn);

  const priceEl = document.createElement("div");
  priceEl.style.gridColumn = "1 / span 3";
  priceEl.style.textAlign = "right";
  priceEl.style.fontWeight = "600";
  priceEl.dataset.role = "price";
  priceEl.textContent = fmt(priceAtPercent(base) * qty);
  line.appendChild(priceEl);

  receiptItemsEl.appendChild(line);
}

function updateReceiptRow(id) {
  const slot = selected.get(id);
  if (!slot) return;
  const rowEl = document.querySelector(`[data-receipt-id="${cssEscape(id)}"]`);
  if (!rowEl) return;
  const priceEl = rowEl.querySelector('[data-role="price"]');
  priceEl.textContent = fmt(priceAtPercent(slot.base) * slot.qty);
}

function updateTotal() {
  let total = 0;
  for (const { base, qty } of selected.values()) total += priceAtPercent(base) * qty;
  grandTotalEl.textContent = fmt(total);
}

function checkLeftCheckbox(id, checked) {
  // find left item row with stored id
  const left = document.querySelectorAll(".item");
  left.forEach(node => {
    if (node._id === id && node._checkbox) {
      node._checkbox.checked = checked;
    }
  });
}

// small util escaping for querySelector
function cssEscape(str) {
  return str.replace(/([^\w-])/g, "\\$1");
}

/** EVENTS **/
percentSelector.addEventListener("change", () => {
  percent = parseFloat(percentSelector.value) / 100;
  // update all receipt prices
  for (const id of selected.keys()) updateReceiptRow(id);
  updateTotal();
});

toggleCodes.addEventListener("change", () => {
  const show = toggleCodes.checked;
  document.querySelectorAll(".codes").forEach(el => {
    if (show) el.classList.add("show"); else el.classList.remove("show");
  });
});

addOCBtn.addEventListener("click", () => {
  const opt = ocSelect.selectedOptions[0];
  if (!opt || !opt._row) return;
  addToReceipt(opt._row, 1);
});

/** COPY RECEIPT **/
document.getElementById("copyReceipt").addEventListener("click", () => {
  const lines = [];
  lines.push("=== Family Health Education Services ===");
  const date = new Date().toLocaleDateString([], { year:"numeric", month:"2-digit", day:"2-digit" });
  lines.push(`Date: ${date}`);
  lines.push(`Fee Percentage: ${(percent * 100).toFixed(0)}%`);
  lines.push("Services:");

  for (const { item, qty } of selected.values()) {
    const unit = priceAtPercent(item.fullprice || 0);
    const total = unit * qty;
    // never show "x1" explicitly
    const qtyText = qty > 1 ? ` x${qty}` : "";
    lines.push(`- ${item.service}${qtyText}: ${fmt(total)}`);
  }
  lines.push(`Total: ${grandTotalEl.textContent}`);

  navigator.clipboard.writeText(lines.join("\n"))
    .then(() => alert("Receipt copied to clipboard!"))
    .catch(() => alert("Failed to copy receipt."));
});

/** INIT **/
function init() {
  percent = parseFloat(percentSelector.value) / 100;
  renderSections();
}
init();
