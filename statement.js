// statement.js
// Requires docx.js and papaparse.min.js loaded in your HTML!

document.addEventListener('DOMContentLoaded', function () {
  const wordInput = document.getElementById('wordInput');
  const downloadBtn = document.getElementById('downloadWordBtn');
  let cleanedTable = null;

  wordInput.addEventListener('change', async function () {
    if (!wordInput.files.length) {
      downloadBtn.disabled = true;
      return;
    }
    const file = wordInput.files[0];
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext !== 'docx') {
      alert('Please upload a DOCX file.');
      downloadBtn.disabled = true;
      return;
    }

    const rows = await extractDocxTable(file);
    if (!rows.length) {
      alert('No tables found in the document.');
      downloadBtn.disabled = true;
      return;
    }

    cleanedTable = cleanBillingTable(rows);
    downloadBtn.disabled = false;
    showOutput(cleanedTable);
  });

  downloadBtn.addEventListener('click', function () {
    if (!cleanedTable) return;

    // Use PapaParse for CSV conversion
    if (typeof Papa === "undefined") {
      alert("PapaParse library (papaparse.min.js) is required.");
      return;
    }
    const csv = Papa.unparse(cleanedTable);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'simplified_statement.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Helper: Extracts table data from DOCX using docx.js
  async function extractDocxTable(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const doc = await window.docx.Document.load(arrayBuffer);
          const tables = doc.getTables();
          if (!tables.length) return resolve([]);
          // Use the first table, or merge all tables if needed
          const rows = [];
          tables.forEach(table => {
            const tableRows = table.getRows();
            tableRows.forEach(row => {
              const cells = row.getCells().map(cell => cell.getText().trim());
              rows.push(cells);
            });
          });
          // Convert array of arrays to array of objects using headers
          const headers = rows[0];
          const dataRows = rows.slice(1);
          const objects = dataRows.map(cells => {
            let obj = {};
            headers.forEach((header, i) => {
              obj[header] = cells[i] || "";
            });
            return obj;
          });
          resolve(objects);
        } catch (err) {
          console.error('DOCX parsing error:', err);
          resolve([]);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // Helper: Cleans and merges table data according to your rules
  function cleanBillingTable(rows) {
    const targetColumns = [
      "Claim Number", "Service Date", "Procedure (and Codes)", "Units",
      "Unit Rate", "Total Charge", "Patient Charge", "Insurance Paid",
      "Patient Paid", "Total Adjustment", "Balance Owed"
    ];

    return rows.map(row => {
      // Merge all insurance columns into one
      let insurancePaid = 0;
      Object.keys(row).forEach(key => {
        if (/insurance/i.test(key) || /ins\./i.test(key)) {
          insurancePaid += parseFloat(row[key].replace(/[^0-9.-]/g, '')) || 0;
        }
      });

      // Balance Owed fallback
      const balanceOwed = row["Balance Owed"] && row["Balance Owed"].trim()
        ? row["Balance Owed"]
        : (row["Patient Charge"] || "");

      // Build cleaned row
      return {
        "Claim Number": row["Claim Number"] || "",
        "Service Date": row["Service Date"] || "",
        "Procedure (and Codes)": row["Procedure"] || row["Procedure (and Codes)"] || "",
        "Units": row["Units"] || "",
        "Unit Rate": row["Unit Rate"] || "",
        "Total Charge": row["Total Charge"] || "",
        "Patient Charge": row["Patient Charge"] || "",
        "Insurance Paid": insurancePaid ? insurancePaid.toFixed(2) : "",
        "Patient Paid": row["Patient Paid"] || "",
        "Total Adjustment": row["Total Adjustment"] || "",
        "Balance Owed": balanceOwed
      };
    });
  }

  // Helper: Display output preview
  function showOutput(table) {
    const output = document.getElementById('output');
    if (!output) return;
    let html = "<table><thead><tr>";
    Object.keys(table[0] || {}).forEach(col => {
      html += `<th>${col}</th>`;
    });
    html += "</tr></thead><tbody>";
    table.forEach(row => {
      html += "<tr>";
      Object.values(row).forEach(val => {
        html += `<td>${val}</td>`;
      });
      html += "</tr>";
    });
    html += "</tbody></table>";
    output.innerHTML = html;
  }
});