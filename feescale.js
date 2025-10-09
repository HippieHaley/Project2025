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

function setupHouseholdSectionToggle() {
  const householdInput = document.getElementById('householdSize');
  const householdSection = document.getElementById('householdMembersSection');
  if (!householdInput || !householdSection) return;

  // Set initial state on page load
  const initialSize = parseInt(householdInput.value, 10) || 1;
  householdSection.style.display = initialSize > 1 ? 'block' : 'none';
  
  // Update household members immediately
  updateHouseholdMemberFields();

  // Handle input changes
  householdInput.addEventListener('input', () => {
    const size = parseInt(householdInput.value, 10) || 1;
    if (size > 1) {
      householdSection.style.display = 'block';
    } else {
      householdSection.style.display = 'none';
    }
    updateHouseholdMemberFields();
    updateHouseholdIncome();
  });
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
    topRow.style.cssText = 'display:flex; gap:10px; margin-bottom:10px; align-items: center;';

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
    plusBtn.style.cssText = 'flex:0 0 auto; padding:8px 16px; border-radius:10px; background:var(--pink); border:2px solid var(--pink); cursor:pointer; white-space: nowrap;';

    topRow.append(select, input, plusBtn);

    const incomeSection = document.createElement('div');
    incomeSection.style.display = 'none';
    incomeSection.style.marginTop = '10px';
    incomeSection.style.padding = '10px';
    incomeSection.style.border = '1px solid var(--pink)';
    incomeSection.style.borderRadius = '8px';
    incomeSection.style.backgroundColor = 'rgba(255, 182, 193, 0.1)';
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
    
    if (incomeInput) incomeInput.addEventListener('input', calculateGrandTotal);
    if (freqSelect) freqSelect.addEventListener('change', calculateGrandTotal);

    plusBtn.addEventListener('click', () => {
      incomeSection.style.display = incomeSection.style.display === 'none' ? 'block' : 'none';
      calculateGrandTotal();
    });

    wrapper.append(topRow, incomeSection);
    container.appendChild(wrapper);
  }
}

// --- Modals ---
function setupModals() {
  const triggerModal1 = document.getElementById('triggerModal1');
  const modalOverlay1 = document.getElementById('modalOverlay1');
  if (triggerModal1 && modalOverlay1) {
    triggerModal1.addEventListener('click', () => { 
      modalOverlay1.style.display = 'flex'; 
      populateCoverageChart();
    });
    modalOverlay1.addEventListener('click', e => { 
      if (e.target === modalOverlay1) modalOverlay1.style.display = 'none'; 
    });
  }

  const triggerModal2 = document.getElementById('triggerModal2');
  const modalOverlay2 = document.getElementById('modalOverlay2');
  if (triggerModal2 && modalOverlay2) {
    triggerModal2.addEventListener('click', () => { 
      modalOverlay2.style.display = 'flex'; 
      populateAWCChart();
    });
    modalOverlay2.addEventListener('click', e => { 
      if (e.target === modalOverlay2) modalOverlay2.style.display = 'none'; 
    });
  }
}

// --- Copy functionality ---
function copyIncomeInfo() {
  const $ = id => document.getElementById(id);
  const householdSize  = $('householdSize')?.value || "1";
  const yearlyIncome   = $('grandTotal')?.textContent || "0";
  const coverageLevel  = $('coverageLevel')?.textContent || "N/A";
  const awcQualification = $('awcQualification')?.textContent || "N/A";
  const workingAt = $('workingAt')?.value || "Unemployed";

  const incomeType = $('incomeType')?.value;
  if (!incomeType) { 
    alert("❌ Please select an Income Type before copying."); 
    return; 
  }

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
    `AWC! and WCN qualification: ${awcQualification} -If Applicable\n` +
    `Insurance:\n` +
    `${new Date().toLocaleString([], { hour:'2-digit', minute:'2-digit', year:'numeric', month:'2-digit', day:'2-digit' })}\n` +
    `Staff: H\n`;

  const notes = document.getElementById('userNotes')?.value.trim();
  if (notes) infoToCopy += `\nAdditional Notes:\n${notes}\n`;

  navigator.clipboard.writeText(infoToCopy)
    .then(() => alert("Household info copied to clipboard!"))
    .catch(() => {
      const tmp = document.createElement('textarea');
      tmp.value = infoToCopy; 
      document.body.appendChild(tmp);
      tmp.select();
      try {
        // Use Clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(tmp.value)
            .then(() => {
              document.body.removeChild(tmp);
              alert("Copied to clipboard!");
            })
            .catch(() => {
              document.body.removeChild(tmp);
              alert("Clipboard copy failed. Please copy manually from the console.");
              console.log("Copy this text:\n", infoToCopy);
            });
        } else {
          // Fallback for older browsers
          const successful = document.execCommand && document.execCommand('copy');
          document.body.removeChild(tmp);
          if (successful) {
            alert("Copied to clipboard!");
          } else {
            alert("Clipboard copy failed. Please copy manually from the console.");
            console.log("Copy this text:\n", infoToCopy);
          }
        }
      } catch (e) {
        document.body.removeChild(tmp);
        alert("Clipboard copy failed. Please copy manually from the console.");
        console.log("Copy this text:\n", infoToCopy);
      }
    });
}

// --- Chart population functions ---
function populateCoverageChart() {
  const tbody = document.getElementById('coverageChart');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  const currentHouseholdSize = document.getElementById('householdSize')?.value || "1";
  const yearlyIncome = parseFloat(document.getElementById('grandTotal')?.textContent) || 0;
  const currentCoverageLevel = determineCoverageLevel(currentHouseholdSize, yearlyIncome);
  
  for (const [size, values] of Object.entries(coverageChart)) {
    const [z, a, b, c, d] = values;
    const row = document.createElement('tr');
    
    const cells = [
      `≤ $${z.toLocaleString()}`,
      `$${(z + 1).toLocaleString()} - $${a.toLocaleString()}`,
      `$${(a + 1).toLocaleString()} - $${b.toLocaleString()}`,
      `$${(b + 1).toLocaleString()} - $${c.toLocaleString()}`,
      `≥ $${d.toLocaleString()}`
    ];
    
    row.innerHTML = `
      <td>${size}</td>
      <td class="${size === currentHouseholdSize && currentCoverageLevel === '0%' ? 'coverage-row--highlight' : ''}">${cells[0]}</td>
      <td class="${size === currentHouseholdSize && currentCoverageLevel === '25%' ? 'coverage-row--highlight' : ''}">${cells[1]}</td>
      <td class="${size === currentHouseholdSize && currentCoverageLevel === '50%' ? 'coverage-row--highlight' : ''}">${cells[2]}</td>
      <td class="${size === currentHouseholdSize && currentCoverageLevel === '75%' ? 'coverage-row--highlight' : ''}">${cells[3]}</td>
      <td class="${size === currentHouseholdSize && currentCoverageLevel === '100%' ? 'coverage-row--highlight' : ''}">${cells[4]}</td>
    `;
    
    tbody.appendChild(row);
  }
}

function populateAWCChart() {
  const tbody = document.getElementById('awcTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  const currentHouseholdSize = document.getElementById('householdSize')?.value || "1";
  
  for (const [size, income] of Object.entries(awcChart)) {
    const row = document.createElement('tr');
    
    if (size === currentHouseholdSize) {
      row.classList.add('coverage-row--highlight');
    }
    
    row.innerHTML = `
      <td>${size}</td>
      <td>$${income.toLocaleString()}</td>
    `;
    
    tbody.appendChild(row);
  }
}

// --- Initialization ---
function init() {
  console.log('Initializing feescale.js...');
  
  // Debug logging
  console.log('Household section:', document.getElementById('householdMembersSection'));
  console.log('Household container:', document.getElementById('householdMembersContainer'));
  console.log('Household size input:', document.getElementById('householdSize'));

  // Initialize core functionality
  calculateGrandTotal();
  setupHouseholdSectionToggle();
  setupModals();

  // Notes toggle
  document.querySelectorAll('.toggleNotes').forEach(btn => {
    btn.addEventListener('click', () => {
      const notes = document.getElementById('notesContainer');
      if (!notes) return;
      notes.style.display = (notes.style.display === 'none' || notes.style.display === '') ? 'block' : 'none';
    });
  });

  // Add modal event listeners
  const triggerModal1 = document.getElementById('triggerModal1');
  const triggerModal2 = document.getElementById('triggerModal2');
  if (triggerModal1) triggerModal1.addEventListener('click', populateCoverageChart);
  if (triggerModal2) triggerModal2.addEventListener('click', populateAWCChart);

  console.log('feescale.js initialized successfully');
}

// --- Global exposure for inline handlers ---
window.calculateIncome = calculateIncome;
window.calculateGrandTotal = calculateGrandTotal;
window.updateHouseholdIncome = updateHouseholdIncome;
window.copyIncomeInfo = copyIncomeInfo;
window.updateHouseholdMemberFields = updateHouseholdMemberFields;

// --- DOM Ready ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}