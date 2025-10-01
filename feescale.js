// Modal and UI functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal 1 - Coverage Chart
    const trigger1 = document.getElementById('triggerModal1');
    const overlay1 = document.getElementById('modalOverlay1');
    
    if (trigger1 && overlay1) {
        trigger1.addEventListener('click', () => {
            overlay1.style.display = 'flex';
        });
        
        overlay1.addEventListener('click', (e) => {
            if (e.target === overlay1) {
                overlay1.style.display = 'none';
            }
        });
    }

    // Modal 2 - AWC Chart
    const trigger2 = document.getElementById('triggerModal2');
    const overlay2 = document.getElementById('modalOverlay2');
    
    if (trigger2 && overlay2) {
        trigger2.addEventListener('click', () => {
            overlay2.style.display = 'flex';
        });
        
        overlay2.addEventListener('click', (e) => {
            if (e.target === overlay2) {
                overlay2.style.display = 'none';
            }
        });
    }

    // Notes toggle functionality
    const notesBtn = document.querySelector('.toggleNotes');
    const notesContainer = document.getElementById('notesContainer');
    
    if (notesBtn && notesContainer) {
        notesBtn.addEventListener('click', () => {
            notesContainer.style.display = notesContainer.style.display === 'none' ? 'block' : 'none';
        });
        // Hide notes by default
        notesContainer.style.display = 'none';
    }

    // Household members functionality
    const householdSize = document.getElementById('householdSize');
    if (householdSize) {
        householdSize.addEventListener('change', updateHouseholdMembers);
        // Initialize household members on page load
        updateHouseholdMembers();
    }
});

// Household members management
function updateHouseholdMembers() {
    const container = document.getElementById('householdMembersContainer');
    const size = parseInt(document.getElementById('householdSize').value) || 1;
    
    if (!container) return;
    
    // Clear existing members
    container.innerHTML = '';
    
    // Add member inputs (starting from 2 since primary is 1)
    for (let i = 2; i <= size; i++) {
        const div = document.createElement('div');
        div.className = 'household-member';
        div.innerHTML = `
            <h3>Household Member ${i}</h3>
            <label>Income: $
                <input type="number" name="memberIncome${i}" value="0" onchange="calculateGrandTotal()">
            </label>
            <label>Frequency:
                <select name="memberFrequency${i}" onchange="calculateGrandTotal()">
                    <option value="annual">Annual</option>
                    <option value="monthly">Monthly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="weekly">Weekly</option>
                </select>
            </label>
        `;
        container.appendChild(div);
    }
}

// Copy income info function
function copyIncomeInfo() {
    const total = document.getElementById('grandTotal').textContent;
    const coverage = document.getElementById('coverageLevel').textContent;
    const awc = document.getElementById('awcQualification').textContent;
    const notes = document.getElementById('userNotes').value;
    
    const text = `HOUSEHOLD INCOME SUMMARY\n` +
                 `Total Annual Income: $${total}\n` +
                 `Coverage Level: ${coverage}\n` +
                 `AWC Qualification: ${awc}\n` +
                 `Notes: ${notes || 'None'}`;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Household info copied to clipboard!');
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Household info copied to clipboard!');
    });
}

// Make functions globally available
window.copyIncomeInfo = copyIncomeInfo;
window.updateHouseholdMembers = updateHouseholdMembers;