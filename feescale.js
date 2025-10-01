// feescale.js  (module)
import { coverageChart, awcChart } from './charts.js';

// --- Coverage helpers ---
const coverageLevels = ["0%", "25%", "50%", "75%", "100%"];

function determineCoverageLevel(householdSize, yearlyIncome) {
  const chart = coverageChart?.[householdSize];
  if (!chart || !Array.isArray(chart)) return "N/A";
  for (let i = 0; i < chart.length; i++) {
    if (yearlyIncome <= Number(chart[i])) return coverageLevels[i] ?? "100%";
  }
  return "100%";
}

function determineAWCQualification(householdSize, yearlyIncome) {
  const cap = awcChart?.[householdSize];
  if (cap == null) return "N/A";
  return yearlyIncome <= Number(cap) ? "Yes" : "No";
}

// --- Income cards ---
function calculateIncome(type) {
  let paystub1, paystub2, verbalHours, verbalRate, total = 0, average = 0, annual = 0;

  switch (type) {
    case 'biweekly':
      paystub1 = parseFloat(document.getElementById('paystub1')?.value) || 0;
      paystub2 = parseFloat(document.getElementById('paystub2')?.value) || 0;
      total = paystub1 + paystub2; average = total / 2; annual = average * 26; break;

    case 'weekly':
      paystub1 = parseFloat(document.getElementById('weeklyPaystub1')?.value) || 0;
      paystub2 = parseFloat(document.getElementById('weeklyPaystub2')?.value) || 0;
      total = paystub1 + paystub2; average = total / 2; annual = average * 52; break;

    case 'twiceMonth':
      paystub1 = parseFloat(document.getElementById('twiceMonthPaystub1')?.value) || 0;
      paystub2 = parseFloat(document.getElementById('twiceMonthPaystub2')?.value) || 0;
      total = paystub1 + paystub2; average = total / 2; annual = average * 24; break;

    case 'verbal':
      verbalHours = parseFloat(document.getElementById('verbalHours')?.value) || 0;
      verbalRate  = parseFloat(document.getElementById('verbalRate')?.value)  || 0;
      total = verbalHours * verbalRate; average = total; annual = total * 52; break;

    default: return;
  }

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val.toFixed(2); };
  set(`${type}Total`, total);
  set(`${type}Average`, average);
  set(`${type}Annual`, annual);

  calculateGrandTotal();
}

// --- Grand total & household ---
function calculateGrandTotal() {
  const n = id => parseFloat(document.getElementById(id)?.textContent) || 0;
  const v = id => parseFloat(document.getElementById(id)?.value) || 0;

  const biweeklyAnnual   = n('biweeklyAnnual');
  const weeklyAnnual     = n('weeklyAnnual');
  const twiceMonthAnnual = n('twiceMonthAnnual');
  const verbalAnnual     = n('verbalAnnual');

  const annualTips              = v('AnnualTips') * 52;
  const annualOtherMonthlyIncome= v('AnnualOtherMonthly') * 12;
  const otherAnnualIncome       = v('OtherAnnual');

  let grandTotal = biweeklyAnnual + weeklyAnnual + twiceMonthAnnual + verbalAnnual
                 + annualTips + annualOtherMonthlyIncome + otherAnnualIncome;

  // Household members
  const memberDivs = document.querySelectorAll('#householdMembersContainer > div');
  memberDivs.forEach(div => {
    const incomeInput = div.querySelector('input[name^="memberIncome"]');
    const freqSelect  = div.querySelector('select[name^="memberFrequency"]');
    if (!incomeInput || !freqSelect || !incomeInput.value) return;

    const amount = parseFloat(incomeInput.value) || 0;
    let annual = 0;
    switch (freqSelect.value) {
      case 'weekly':   annual = amount * 52; break;
      case 'biweekly': annual = amount * 26; break;
      case 'monthly':  annual = amount * 12; break;
      case 'annually': annual = amount; break;
    }
    grandTotal += annual;
  });

  const out = document.getElementById('grandTotal');
  if (out) out.textContent = grandTotal.toFixed(2);

  updateHouseholdIncome();
}

function updateHouseholdIncome() {
  const householdSize = parseInt(document.getElementById('householdSize')?.value) || 0;
  const yearlyIncome  = parseFloat(document.getElementById('grandTotal')?.textContent) || 0;

  const coverageLevel  = determineCoverageLevel(householdSize, yearlyIncome);
  const awcQual        = determineAWCQualification(householdSize, yearlyIncome);

  const covEl = document.getElementById('coverageLevel');
  const awcEl = document.getElementById('awcQualification');
  if (covEl) covEl.textContent = coverageLevel;
  if (awcEl) awcEl.textContent = awcQual;
}
function updateHouseholdMemberFields() {
  const container = document.getElementById('householdMembersContainer');
  const size = parseInt(document.getElementById('householdSize')?.value || 1);
  if (!container) return;

  container.innerHTML = '';
  if (size <= 1) return;

  for (let i = 2; i <= size; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'household-member';
    
    const topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex; gap:10px; margin-bottom:10px;';

    const select = document.createElement('select');
    select.name = `relationship${i}`;
    select.innerHTML = `
      <option value="">Select Relationship</option>
      <option>Child</option><option>Grandchild</option><option>Significant Other</option>
      <option>Fiancé</option><option>Spouse</option><option>Sibling</option>
      <option>Parent</option><option>Grandparent</option><option>Friend</option>
      <option>Roommate</option><option>Other</option>
    `;
    select.style.cssText = 'flex:1; padding:8px; border-radius:10px; border:2px solid var(--pink); background:var(--pink);';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `name${i}`;
    input.placeholder = `Name of person ${i}`;
    input.style.cssText = 'flex:2; padding:8px; border-radius:10px; border:2px solid var(--pink); background:var(--pink);';

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.textContent = 'Add Income';
    plusBtn.style.cssText = 'flex:0 0 auto; padding:8px 16px; border-radius:10px; background:var(--pink); border:2px solid var(--pink); cursor:pointer;';

    topRow.append(select, input, plusBtn);

    const incomeSection = document.createElement('div');
    incomeSection.style.display = 'none';
    incomeSection.style.marginTop = '10px';
    incomeSection.innerHTML = `
      <label style="display:block; margin:10px 0;">
        Income Amount: $<input type="number" step="0.01" name="memberIncome${i}" style="margin-left:10px; padding:8px; border-radius:10px; border:2px solid var(--pink); background:var(--pink);" />
      </label>
      <label style="display:block; margin:10px 0;">
        Frequency:
        <select name="memberFrequency${i}" style="margin-left:10px; padding:8px; border-radius:10px; border:2px solid var(--pink); background:var(--pink);">
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
      </label>
    `;

    const incomeInput = incomeSection.querySelector(`input[name="memberIncome${i}"]`);
    const freqSelect = incomeSection.querySelector(`select[name="memberFrequency${i}"]`);
    incomeInput?.addEventListener('input', calculateGrandTotal);
    freqSelect?.addEventListener('change', calculateGrandTotal);

    plusBtn.addEventListener('click', () => {
      incomeSection.style.display = incomeSection.style.display === 'none' ? 'block' : 'none';
      calculateGrandTotal();
    });

    wrapper.append(topRow, incomeSection);
    container.appendChild(wrapper);
  }
}
// --- Modals (guarded) ---
const triggerModal1 = document.getElementById('triggerModal1');
const modalOverlay1 = document.getElementById('modalOverlay1');
if (triggerModal1 && modalOverlay1) {
  triggerModal1.addEventListener('click', () => { modalOverlay1.style.display = 'flex'; });
  modalOverlay1.addEventListener('click', e => { if (e.target === modalOverlay1) modalOverlay1.style.display = 'none'; });
}
const triggerModal2 = document.getElementById('triggerModal2');
const modalOverlay2 = document.getElementById('modalOverlay2');
if (triggerModal2 && modalOverlay2) {
  triggerModal2.addEventListener('click', () => { modalOverlay2.style.display = 'flex'; });
  modalOverlay2.addEventListener('click', e => { if (e.target === modalOverlay2) modalOverlay2.style.display = 'none'; });
}

// --- Copy (with fallback) ---
function copyIncomeInfo() {
  const $ = id => document.getElementById(id);
  const householdSize  = $('householdSize')?.value || "1";
  const yearlyIncome   = $('grandTotal')?.textContent || "0";
  const coverageLevel  = $('coverageLevel')?.textContent || "N/A";
  const awcQualification = $('awcQualification')?.textContent || "N/A";
  const workingAt = $('workingAt')?.value || "Unemployed";

  const incomeType = $('incomeType')?.value;
  if (!incomeType) { alert("❌ Please select an Income Type before copying."); return; }

  let infoToCopy = `Income Type: ${incomeType}\nWorking @: ${workingAt}\nPeople in Household: ${householdSize}\n\n`;

  const members = Array.from($('householdMembersContainer')?.children || []);
  infoToCopy += "Members of Household (besides client):\n";
  members.forEach(member => {
    const relationship = member.querySelector('select[name^="relationship"]')?.value || "N/A";
    const name = member.querySelector('input[name^="name"]')?.value || "N/A";
    const income = member.querySelector('input[name^="memberIncome"]')?.value || "";
    const freq = (member.querySelector('select[name^="memberFrequency"]')?.value || "").toLowerCase();
    infoToCopy += `- ${relationship}: ${name}\n`;
    if (income) {
      const val = parseFloat(income) || 0;
      const annual = freq === 'weekly' ? val*52 : freq === 'biweekly' ? val*26 : freq === 'monthly' ? val*12 : val;
      const formattedVal = `$${val.toLocaleString()}`;
      const formattedAnnual = `$${annual.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
      infoToCopy += freq === 'annually'
        ? `   • Income: ${formattedAnnual} annually\n`
        : `   • Income: ${formattedVal} ${freq} (Annual: ${formattedAnnual})\n`;
    }
  });
  infoToCopy += "\n";

  const num = id => parseFloat($(id)?.textContent) || 0;
  const val = id => $(id)?.value || "0";
  const addBlock = (label, ids) => {
    const annual = num(ids.annual);
    if (!annual) return;
    const total = $(ids.total)?.textContent || "0";
    const avg   = num(ids.avg).toFixed(2);
    const p1    = val(ids.p1); const p2 = ids.p2 ? val(ids.p2) : null;
    infoToCopy += `${label}:\n`;
    if (p1 !== null) infoToCopy += `  Paystub 1: $${p1}\n`;
    if (p2 !== null) infoToCopy += `  Paystub 2: $${p2}\n`;
    infoToCopy += `  Total:     $${total}\n  Average:   $${avg}\n  Annual:    $${annual.toFixed(2)}\n\n`;
  };

  addBlock('Biweekly Income', { p1:'paystub1', p2:'paystub2', total:'biweeklyTotal', avg:'biweeklyAverage', annual:'biweeklyAnnual' });
  addBlock('Weekly Income',   { p1:'weeklyPaystub1', p2:'weeklyPaystub2', total:'weeklyTotal', avg:'weeklyAverage', annual:'weeklyAnnual' });

  // Twice a month
  {
    const annual = num('twiceMonthAnnual');
    if (annual) {
      const total = $('twiceMonthTotal')?.textContent || "0";
      const avg   = num('twiceMonthAverage').toFixed(2);
      const p1    = val('twiceMonthPaystub1');
      const p2    = val('twiceMonthPaystub2');
      infoToCopy += `Twice a Month Income:\n  Paystub 1: $${p1}\n  Paystub 2: $${p2}\n  Total:     $${total}\n  Average:   $${avg}\n  Annual:    $${annual.toFixed(2)}\n\n`;
    }
  }

  // Verbal
  {
    const annual = num('verbalAnnual');
    if (annual) {
      const hours = val('verbalHours');
      const rate  = val('verbalRate');
      const total = $('verbalTotal')?.textContent || "0";
      const avg   = num('verbalAverage').toFixed(2);
      infoToCopy += `Weekly Verbal Income:\n  Hours Worked: ${hours}\n  Hourly Rate:  $${rate}\n  Total:        $${total}\n  Average:      $${avg}\n  Annual:       $${annual.toFixed(2)}\n\n`;
    }
  }

  // Extras
  {
    const tips = parseFloat(val('AnnualTips')) || 0;
    const otherM = parseFloat(val('AnnualOtherMonthly')) || 0;
    const otherY = parseFloat(val('OtherAnnual')) || 0;
    if (tips || otherM || otherY) {
      infoToCopy += 'Extra Income:\n';
      if (tips)   infoToCopy += `  Tips per week: $${tips} (Annualized: $${(tips*52).toFixed(2)})\n`;
      if (otherM) infoToCopy += `  Other Income per Month: $${otherM} (Annualized: $${(otherM*12).toFixed(2)})\n`;
      if (otherY) infoToCopy += `  Other Annual Income: $${otherY}\n`;
      infoToCopy += '\n';
    }
  }

  infoToCopy +=
    `Yearly Income: $${yearlyIncome}\n` +
    `Client Pay: ${coverageLevel}\n` +
    `AWC! qualification: ${awcQualification} -If Applicable\n` +
    `Insurance:\n` +
    `${new Date().toLocaleString([], { hour:'2-digit', minute:'2-digit', year:'numeric', month:'2-digit', day:'2-digit' })}\n` +
    `Staff: H\n`;

  const notes = document.getElementById('userNotes')?.value.trim();
  if (notes) infoToCopy += `\nAdditional Notes:\n${notes}\n`;

  navigator.clipboard.writeText(infoToCopy)
    .then(() => alert("Household info copied to clipboard!"))
    .catch(() => {
      // Fallback: show a prompt to copy manually
      const tmp = document.createElement('textarea');
      tmp.value = infoToCopy; document.body.appendChild(tmp);
      tmp.select(); document.execCommand('copy'); document.body.removeChild(tmp);
      alert("Clipboard permissions blocked. Text placed in a temporary field and copied via fallback.");
    });
}

// --- Bootstrap ---
function init() {
  calculateGrandTotal();
  const size = document.getElementById('householdSize');
  size?.addEventListener('change', updateHouseholdMemberFields);

  // Notes toggle
  document.querySelectorAll('.toggleNotes').forEach(btn => {
    btn.addEventListener('click', () => {
      const notes = document.getElementById('notesContainer');
      if (!notes) return;
      notes.style.display = (notes.style.display === 'none' || notes.style.display === '') ? 'block' : 'none';
    });
  });
}

// Expose for inline handlers already in HTML
window.calculateIncome = calculateIncome;
window.calculateGrandTotal = calculateGrandTotal;
window.updateHouseholdIncome = updateHouseholdIncome;
window.copyIncomeInfo = copyIncomeInfo;
window.updateHouseholdMemberFields = updateHouseholdMemberFields;
// Function to populate coverage chart table
function populateCoverageChart() {
  const tbody = document.getElementById('coverageChart');
  tbody.innerHTML = ''; // Clear existing content
  
  for (const [size, values] of Object.entries(coverageChart)) {
    const [z, a, b, c, d] = values;
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${size}</td>
      <td>≤ $${z.toLocaleString()}</td>
      <td>$${(z + 1).toLocaleString()} - $${a.toLocaleString()}</td>
      <td>$${(a + 1).toLocaleString()} - $${b.toLocaleString()}</td>
      <td>$${(b + 1).toLocaleString()} - $${c.toLocaleString()}</td>
      <td>≥ $${d.toLocaleString()}</td>
    `;
    
    tbody.appendChild(row);
  }
}

// Function to populate AWC table
function populateAWCChart() {
  const tbody = document.getElementById('awcTableBody');
  tbody.innerHTML = ''; // Clear existing content
  
  for (const [size, income] of Object.entries(awcChart)) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${size}</td>
      <td>$${income.toLocaleString()}</td>
    `;
    
    tbody.appendChild(row);
  }
}

// Add click event listeners to populate tables when modals open
document.getElementById('triggerModal1').addEventListener('click', populateCoverageChart);
document.getElementById('triggerModal2').addEventListener('click', populateAWCChart);

// Modules are deferred; DOM should exist. Defensive guard anyway:
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
