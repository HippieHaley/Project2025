// statement.js
// Requires mammoth.browser.min.js and papaparse.min.js loaded in your HTML!

document.addEventListener('DOMContentLoaded', function () {
  const wordInput = document.getElementById('wordInput');
  const downloadBtn = document.getElementById('downloadWordBtn');
  let cleanedTable = null;

  wordInput.addEventListener('change', function () {
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

    extractWithMammoth(file);
  });

  downloadBtn.addEventListener('click', function () {
    if (!cleanedTable) return;

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

  // Extract tables and paragraphs using Mammoth.js
  function extractWithMammoth(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      mammoth.convertToHtml({arrayBuffer: e.target.result}).then(result => {
        const div = document.createElement('div');
        div.innerHTML = result.value;

        // Extract all tables
        const tables = Array.from(div.querySelectorAll('table'));
        if (tables.length === 0) {
          alert("No tables found in the document.");
          downloadBtn.disabled = true;
          document.getElementById('output').innerHTML = result.value; // Show everything else
          return;
        }

        // Only process first table for CSV, but preview all tables
        let tableArrays = tables.map(table => {
          return Array.from(table.rows).map(row =>
            Array.from(row.cells).map(cell => cell.textContent.trim())
          );
        });

        // Clean first table for download
        let cleaned = cleanBillingTable(tableArrays[0]);
        cleanedTable = cleaned;
        downloadBtn.disabled = false;

        // Output preview: show all tables and all other content
        let html = "";
        tables.forEach((table, idx) => {
          html += `<h4>Table ${idx + 1}</h4>`;
          html += table.outerHTML;
        });
        // Show paragraphs and lists etc
        let nonTable = div.cloneNode(true);
        nonTable.querySelectorAll('table').forEach(t => t.remove());
        html += "<div>" + nonTable.innerHTML + "</div>";

        document.getElementById('output').innerHTML = html;
      });
    };
    reader.readAsArrayBuffer(file);
  }

  // Cleans and merges table data according to your rules
  function cleanBillingTable(tableRows) {
    if (!tableRows || !tableRows.length) return [];
    const targetColumns = [
      "Claim Number", "Service Date", "Procedure (and Codes)", "Units",
      "Unit Rate", "Total Charge", "Patient Charge", "Insurance Paid",
      "Patient Paid", "Total Adjustment", "Balance Owed"
    ];

    const headers = tableRows[0];
    const dataRows = tableRows.slice(1);
    return dataRows.map(cells => {
      let row = {};
      headers.forEach((header, i) => {
        row[header] = cells[i] || "";
      });

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
});