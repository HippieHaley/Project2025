import procedures from './catalog.js';

/** ---- Config ---- **/
const MULT_X_BUTTONS = {                // x2/x3 quick buttons for these
  "Chlamydia (CHL)": [2,3],
  "Gonorrhea (GC)": [2,3]
};
const OC_PREFIXES = ["Alese","Apri","Aubra","Aviane","Camila","Chateal","Cryselle","Cyred","Doxycycline","Enpresse","Jolivette","Levora","Lutera","Lyza","Mononessa","Nor QD","Nordette","Norethindrone","Nortrel 777","Orsythia","Portia","Reclipsen","Sprintec","Sronyx","Tri-Lo Marzia","Tri-Lo Sprintec","TriNessa Lo","Triphasil","Trivora","Vilbra"];

/** ---- State ---- **/
let percent = 1.0;
let showCodes = false;
let grandTotal = 0;
const selected = {}; // key -> {qty, unit, total, span, lineEl}
const getCodes = (service)=>{
  const row = procedures.find(r=>r.service.split("\n")[0] === service || r.service === service);
  if(!row) return "";
  const bits = [];
  if(row.cpt) bits.push(`CPT: ${row.cpt}`);
  if(row.hcpcs) bits.push(`HCPCS: ${row.hcpcs}`);
  if(row.icd10) bits.push(`ICD-10: ${row.icd10}`);
  if(row.modifier) bits.push(`Modifier: ${row.modifier}`);
  return bits.join(" • ");
};
const recomputeTotal = ()=>{
  grandTotal = Object.values(selected).reduce((s,x)=> s + x.total, 0);
  document.getElementById('grand-total').textContent = money(grandTotal);
};

/** ---- Receipt ops ---- **/
function addLine(service, qty=1){
  const unit = getFullPrice(service) * percent;
  const id = service;
  if(selected[id]){
    selected[id].qty += qty;
    selected[id].total = selected[id].qty * selected[id].unit;
    selected[id].span.textContent = `${service} x${selected[id].qty} — ${money(selected[id].total)}`;
    recomputeTotal();
    return;
  }
  const wrap = document.createElement('div');
  wrap.className = 'receipt-row';

  const span = document.createElement('span');
  span.textContent = `${service} x${qty} — ${money(unit*qty)}`;
  wrap.appendChild(span);

  const multiBtn = document.createElement('button');
  multiBtn.className = 'multiple-btn';
  multiBtn.textContent = 'Multiple';
  multiBtn.onclick = ()=>{
    popover.style.display = (popover.style.display==='grid'?'none':'grid');
  };
  wrap.appendChild(multiBtn);

  const remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'X';
  remove.onclick = ()=>{
    wrap.remove();
    delete selected[id];
    recomputeTotal();
  };
  wrap.appendChild(remove);

  const popover = document.createElement('div');
  popover.className = 'qty-popover';
  popover.style.display = 'none';
  const qtySel = document.createElement('select');
  qtySel.className = 'qty-select';
  for(let n=2;n<=13;n++){
    const opt = document.createElement('option');
    opt.value = n; opt.textContent = `x${n}`;
    qtySel.appendChild(opt);
  }
  const apply = document.createElement('button');
  apply.className = 'btn';
  apply.textContent = 'Apply';
  apply.onclick = ()=>{
    const q = parseInt(qtySel.value,10);
    selected[id].qty = q;
    selected[id].total = q * selected[id].unit;
    selected[id].span.textContent = `${service} x${q} — ${money(selected[id].total)}`;
    popover.style.display = 'none';
    recomputeTotal();
  };
  popover.appendChild(qtySel);
  popover.appendChild(apply);
  wrap.appendChild(popover);

  document.getElementById('receipt-items').appendChild(wrap);
  selected[id] = { qty, unit, total: unit*qty, span, lineEl: wrap };
  selected[id].span = span;
  recomputeTotal();
}

function quickAdd(service, times){
  addLine(service, times);
}

/** ---- UI render ---- **/
const sectionsDef = [
  { title: "Visit Codes", match: (r)=> /^99(2|3)/.test(r.cpt||"") && !/Preventive/i.test(r.service) },
  { title: "Preventive Exam (IE/AE)", match: (r)=> /^9938|^9939/.test(r.cpt||"") },
  { title: "Procedures & Devices", match: (r)=> ["IUD Insertion","IUD Removal","Implant Insertion","Implant Removal","Implant Removal + Reinsertion"].includes(r.service) },
  { title: "Screenings & Labs", match: (r)=> ["Chlamydia (CHL)","Gonorrhea (GC)","HPV","Pregnancy Test Urine","RPR (Syphilis)","TPPA (Syphilis)","HIV Rapid","HIV Serum","Wet Mount","Venipuncture","Urine Dipstick","Urine Dipstick (non-automated)","HSV PCR","HSV Serum "].includes(r.service) },
  { title: "Meds & Treatments", match: (r)=> ["Doxycycline","Rocephin (ceftriaxone inj)","Bicillin L-A","Azithromycin","Suprax","Cefixime","Acyclovir","Metronidazole","Fluconazole","Ibuprofen","Clindamycin Cream","Clotrimazole Cream"].includes(r.service) },
  { title: "Supplies", match: (r)=> ["Basal Thermometer","VCF Foam","Gynol II","Depo","Liletta IUD","Paragard IUD","Mirena IUD","Xulane Patch","NuvaRing","Nexplanon"].includes(r.service) },
  { title: "Oral Contraceptives (dropdown)", special: "OC" }
];

function render(){
  const host = document.getElementById('sections');
  host.innerHTML = "";

  sectionsDef.forEach(def=>{
    const box = document.createElement('div');
    box.className = 'section';

    const h = document.createElement('h2');
    h.textContent = def.title;
    box.appendChild(h);

    if(def.special === "OC"){
      // Alphabetical OC dropdown with checkboxes
      const ocWrap = document.createElement('div');
      ocWrap.className = 'oc-row';
      const select = document.createElement('select');
      select.id = "oc-select";
      const blank = document.createElement('option');
      blank.value = ""; blank.textContent = "Select OC…";
      select.appendChild(blank);

      // Build and sort OC list alphabetically (already alpha in OC_PREFIXES)
      OC_PREFIXES.forEach(name=>{
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
      });

      const addBtn = document.createElement('button');
      addBtn.className = 'btn';
      addBtn.textContent = 'Add';
      addBtn.onclick = ()=>{
        const name = select.value;
        if(!name) return;
        addLine(name, 1);
        select.value = "";
      };
      ocWrap.appendChild(select);
      ocWrap.appendChild(addBtn);
      box.appendChild(ocWrap);
      host.appendChild(box);
      return;
    }

    const list = procedures.filter(def.match);
    // Render checkboxes in the incoming order (your “ticket” sequence),
    // not alphabetical, per your requirement.
    list.forEach(row=>{
      const labelName = row.service.split("\n")[0];  // show short label before newline

      const rowEl = document.createElement('div');
      rowEl.className = 'item';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.onchange = ()=>{
        if(cb.checked){ addLine(labelName, 1); }
        else {
          // Remove if present (any qty); keep it simple: full remove
          const id = labelName;
          if(selected[id]){
            selected[id].lineEl.remove();
            delete selected[id];
            recomputeTotal();
          }
        }
      };
      rowEl.appendChild(cb);

      const lbl = document.createElement('label');
      lbl.textContent = labelName;
      rowEl.appendChild(lbl);

      // x2/x3 quick buttons for CHL/GC
      if(MULT_X_BUTTONS[labelName]){
        MULT_X_BUTTONS[labelName].forEach(n=>{
          const b = document.createElement('button');
          b.className = 'mini-btn';
          b.textContent = `x${n}`;
          b.onclick = ()=> quickAdd(labelName, n);
          rowEl.appendChild(b);
        });
      }

      // Codes, toggleable
      const codes = document.createElement('span');
      codes.className = 'codes' + (showCodes?' show':'');
      const codesText = getCodes(row.service);
      if(codesText){
        codes.textContent = ` — ${codesText}`;
        rowEl.appendChild(codes);
      }

      box.appendChild(rowEl);
    });

    host.appendChild(box);
  });
}

/** ---- Events ---- **/
document.getElementById('percentSelector').addEventListener('change', (e)=>{
  percent = parseFloat(e.target.value)/100;
  // Recalculate all receipt lines at new percent
  Object.keys(selected).forEach(k=>{
    selected[k].unit = getFullPrice(k) * percent;
    selected[k].total = selected[k].unit * selected[k].qty;
    selected[k].span.textContent = `${k} x${selected[k].qty} — ${money(selected[k].total)}`;
  });
  recomputeTotal();
});

document.getElementById('toggleCodes').addEventListener('change', (e)=>{
  showCodes = e.target.checked;
  document.querySelectorAll('.codes').forEach(el=>{
    if(showCodes){ el.classList.add('show'); } else { el.classList.remove('show'); }
  });
});

document.getElementById('copy-receipt').addEventListener('click', ()=>{
  const lines = Object.keys(selected).map(k=> `${k} x${selected[k].qty} — ${money(selected[k].total)}`);
  const txt = [
    "=== Family Health Education Services ===",
    `Date: ${new Date().toLocaleDateString([], { year:'numeric', month:'2-digit', day:'2-digit' })}`,
    `Fee Percentage: ${Math.round(percent*100)}%`,
    "Services:",
    ...lines,
    `Total: ${money(grandTotal)}`
  ].join("\n");
  navigator.clipboard.writeText(txt)
    .then(()=> alert('Receipt copied to clipboard!'))
    .catch(()=> alert('Failed to copy receipt.'));
});

/** ---- Init ---- **/
render();
