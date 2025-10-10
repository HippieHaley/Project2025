function exportWordBtn() {
  const headersMapping = {
    "Claim Number": "Claim Number",
    "Service Date": "Service Date",
    "Procedure (and Codes)": "Procedure (and Codes)",
    "Units": "Units",
    "Unit Rate": "Unit Rate",
    "Total Charge": "Total Charge",
    "Patient Charge": "Patient Charge",
    "Total Paid": "Total Paid",
    "Insurance Paid": "Insurance Paid",
    "Patient Paid": "Patient Paid",
    "Total Adjustment": "Total Adjustment",
    "Total Balance": "Total Balance",
    "Insurance Balance": "Insurance Balance",
    "Balance Owed": "Balance Owed"
    // Add more mappings as needed
  };
function extractData(rows) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';
    balanceOwed = 0;

    rows.forEach((row, index) => {
        const {
            claimOrServiceLine,
            serviceDate,
            procedure,
            units,
            unitRate,
            totalCharge,
            patientCharge,
            totalPaid,
            insurancePaid,
            patientPaid,
            adjustment,
            totalBalance,
            insuranceBalance,
            balanceOwedRow
        } = row;
    });
  // Example: Generate table rows for Word export using docx.js style objects
  // This is a placeholder for integrating with docx.js or similar libraries
  // Assuming validRows and balanceOwed are available in your scope

  // Helper functions for text styling
  const blackText = (text) => ({ text: text ?? '', size: 22, color: '000000' });
  const whiteText = (text) => ({ text: text ?? '', size: 22, color: 'FFFFFF' });

    const isClaimRow = row.claimOrServiceLine?.includes("CL-");
    const nextRow = validRows[index + 1];
    const nextIsServiceLine = nextRow && nextRow.claimOrServiceLine?.includes("Service Line#");
    const whiteOut = isClaimRow && nextIsServiceLine;

    return {
      cells: [
        { children: [blackText(row.claimOrServiceLine)] },
        { children: [blackText(row.serviceDate)] },
        { children: [whiteOut ? whiteText(row.procedure) : blackText(row.procedure)] },
        { children: [whiteOut ? whiteText(row.units) : blackText(row.units)] },
        { children: [whiteOut ? whiteText(row.unitRate) : blackText(row.unitRate)] },
        { children: [blackText(row.totalCharge)] },
        { children: [blackText(row.patientCharge)] },
        { children: [blackText(row.totalPaid)] },
        { children: [blackText(row.insurancePaid)] },
        { children: [blackText(row.patientPaid)] },
        { children: [blackText(row.adjustment)] },
        { children: [blackText(row.totalBalance)] },
        { children: [blackText(row.insuranceBalance)] },
        { children: [blackText(row.balanceOwedRow)] },
      ]
    };
  }
  // Total row
  const totalRow = {
    cells: [
      {
        children: [{ text: "Total", bold: true }],
        columnSpan: 13,
        shading: { fill: "D3D3D3" }
      },
      {
        children: [{ text: `$${balanceOwed.toFixed(2)}`, bold: true }],
        shading: { fill: "D3D3D3" }
      }
    ]
  };
  // Find all tables in the export-content element
  const exportContent = document.getElementById('export-content');
  if (exportContent) {
    const tables = exportContent.querySelectorAll('table');
    tables.forEach(table => {
      const headerRow = table.querySelector('tr');
      if (headerRow) {
        headerRow.querySelectorAll('th').forEach(th => {
          const originalHeader = th.textContent.trim();
          if (headersMapping[originalHeader]) {
            th.textContent = headersMapping[originalHeader];
          }
        });
      }
    });
  }
  // Add click event to export content as a Word document
  btn.addEventListener('click', () => {
    // Get the content you want to export
    const content = document.getElementById('export-content');
    if (!content) return;

    // Create a Blob with Word MIME type
    const blob = new Blob(
      [
        `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'></head><body>${content.innerHTML}</body></html>`
      ],
      { type: 'application/msword' }
    );

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Append the button to the DOM
  document.body.appendChild(btn);
}

export { exportWordBtn };