/* ===== Imports ===== */
import 'charts.js'             // <-- adjust path if needed
const { coverageChart, awcChart } = charts; // from charts.js
const coverageLevels = ["100%", "75%", "50%", "25%", "0%"];

function determineCoverageLevel(householdSize, yearlyIncome){
  const row = coverageChart[householdSize];
  if (!row) return "N/A";
  for (let i = 0; i < row.length; i++){
    if (yearlyIncome <= row[i]) return coverageLevels[i];
  }
  return "0%";
}
function determineAWCQualification(householdSize, yearlyIncome){
  const max = awcChart[householdSize];
  if (!max) return "N/A";
  return yearlyIncome <= max ? "Yes" : "No";
}

/* ===== Income calcs (unchanged) ===== */
function calculateIncome(type) {
  let paystub1, paystub2, verbalHours, verbalRate, total, average, annual;
  switch (type) {
    case 'biweekly':
      paystub1 = parseFloat($('paystub1').value) || 0;
      paystub2 = parseFloat($('paystub2').value) || 0;
      total = paystub1 + paystub2; average = total / 2; annual = average * 26; break;
    case 'weekly':
      paystub1 = parseFloat($('weeklyPaystub1').value) || 0;
      paystub2 = parseFloat($('weeklyPaystub2').value) || 0;
      total = paystub1 + paystub2; average = total / 2; annual = average * 52; break;
    case 'twiceMonth':
      paystub1 = parseFloat($('twiceMonthPaystub1').value) || 0;
      paystub2 = parseFloat($('twiceMonthPaystub2').value) || 0;
      total = paystub1 + paystub2; average = total / 2; annual = average * 24; break;
    case 'verbal':
      verbalHours = parseFloat($('verbalHours').value) || 0;
      verbalRate  = parseFloat($('verbalRate').value)  || 0;
      total = verbalHours * verbalRate; average = total; annual = total * 52; break;
    default: return;
  }
  $(`${type}Total`).textContent   = total.toFixed(2);
  $(`${type}Average`).textContent = average.toFixed(2);
  $(`${type}Annual`).textContent  = annual.toFixed(2);
  calculateGrandTotal();
}
window.calculateIncome = calculateIncome;

/* ===== Grand total (unchanged) ===== */
function calculateGrandTotal() {
  const biweeklyAnnual   = parseFloat($('biweeklyAnnual').textContent)   || 0;
  const weeklyAnnual     = parseFloat($('weeklyAnnual').textContent)     || 0;
  const twiceMonthAnnual = parseFloat($('twiceMonthAnnual').textContent) || 0;
  const verbalAnnual     = parseFloat($('verbalAnnual').textContent)     || 0;

  const weeklyTips   = parseFloat($('AnnualTips').value)          || 0; // weekly
  const otherMonthly = parseFloat($('AnnualOtherMonthly').value)  || 0; // monthly
  const otherAnnual  = parseFloat($('OtherAnnual').value)         || 0; // annual

  let grandTotal = biweeklyAnnual + weeklyAnnual + twiceMonthAnnual + verbalAnnual
                 + (weeklyTips * 52) + (otherMonthly * 12) + otherAnnual;

  // household members
  document.querySelectorAll('#householdMembersContainer > div').forEach(div=>{
    const incomeInput = div.querySelector('input[name^="memberIncome"]');
    const freqSelect  = div.querySelector('select[name^="memberFrequency"]');
    if (incomeInput && freqSelect && incomeInput.value){
      const amt = parseFloat(incomeInput.value) || 0;
      let annual = amt;
      if (freqSelect.value === 'weekly')   annual = amt*52;
      if (freqSelect.value === 'biweekly') annual = amt*26;
      if (freqSelect.value === 'monthly')  annual = amt*12;
      grandTotal += annual;
    }
  });

  $('grandTotal').textContent = grandTotal.toFixed(2);
  updateHouseholdIncome();
}
window.calculateGrandTotal = calculateGrandTotal;

/* ===== Household summary ===== */
function updateHouseholdIncome(){
  const size   = parseInt($('householdSize').value) || 0;
  const income = parseFloat($('grandTotal').textContent) || 0;

  $('coverageLevel').textContent   = determineCoverageLevel(size, income);
  $('awcQualification').textContent = determineAWCQualification(size, income);
}
window.updateHouseholdIncome = updateHouseholdIncome;

/* ===== Render: Coverage table (5 cols) ===== */
function renderCoverageChart(selectedSize){
  const tbody = $('coverageTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  Object.keys(coverageChart).sort((a,b)=>Number(a)-Number(b)).forEach(size=>{
    const vals = coverageChart[size]; // [0,25,50,75,100]
    const tr = document.createElement('tr');
    if (Number(size) === Number(selectedSize)) tr.classList.add('coverage-row--highlight');
    tr.innerHTML = `
      <td>${size}</td>
      <td>${money(vals[0])}</td>
      <td>${money(vals[1])}</td>
      <td>${money(vals[2])}</td>
      <td>${money(vals[3])}</td>
      <td>${money(vals[4])}</td>`;
    tbody.appendChild(tr);
  });
}

/* ===== Render: AWC table (2 cols) ===== */
function renderAWCChart(selectedSize){
  const tbody = $('awcTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  Object.keys(awcChart).sort((a,b)=>Number(a)-Number(b)).forEach(size=>{
    const threshold = awcChart[size];
    const tr = document.createElement('tr');
    if (Number(size) === Number(selectedSize)) tr.classList.add('coverage-row--highlight');
    tr.innerHTML = `<td>${size}</td><td>${money(threshold)}</td>`;
    tbody.appendChild(tr);
  });
}

/* ===== Modals ===== */
const triggerModal1 = $('triggerModal1');
const modalOverlay1 = $('modalOverlay1');
const triggerModal2 = $('triggerModal2');
const modalOverlay2 = $('modalOverlay2');

const openModal  = (ov)=>{ ov.style.display='flex'; document.body.style.overflow='hidden'; };
const closeModal = (ov)=>{ ov.style.display='none'; document.body.style.overflow=''; };

triggerModal1.addEventListener('click', ()=>{
  renderCoverageChart(parseInt($('householdSize').value)||1);
  openModal(modalOverlay1);
});
modalOverlay1.addEventListener('click', (e)=>{ if (e.target===modalOverlay1) closeModal(modalOverlay1); });

triggerModal2.addEventListener('click', ()=>{
  renderAWCChart(parseInt($('householdSize').value)||1);
  openModal(modalOverlay2);
});
modalOverlay2.addEventListener('click', (e)=>{ if (e.target===modalOverlay2) closeModal(modalOverlay2); });

document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape'){ closeModal(modalOverlay1); closeModal(modalOverlay2); }
});

/* ===== Init ===== */
calculateGrandTotal(); // also calls updateHouseholdIncome
renderCoverageChart(parseInt($('householdSize').value)||1);
renderAWCChart(parseInt($('householdSize').value)||1);

$('householdSize').addEventListener('change', ()=>{
  updateHouseholdIncome();
  renderCoverageChart(parseInt($('householdSize').value)||1);
  renderAWCChart(parseInt($('householdSize').value)||1);
});

/* Notes toggle (your original) */
document.querySelectorAll('.toggleNotes').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const notes = $('notesContainer');
    notes.style.display = (notes.style.display==='none' || notes.style.display==='') ? 'block' : 'none';
  });
});
