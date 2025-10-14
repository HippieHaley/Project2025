pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const HEADERS = [
  "Claim Number",
  "Service Date",
  "Procedure (and Codes)",
  "Units",
  "Unit Rate",
  "Total Charge",
  "Patient Charge",
  "Total Paid",
  "Insurance Paid",
  "Patient Paid",
  "Total Adjustment",
  "Total Balance",
  "Insurance Balance",
  "Balance Owed"
];

let sheets = []; // Array of objects: {infoLines, tableRows}

function cleanLine(line) {
  return line
    .replace(/State\s+of\s+South\s+Dakota\s+Department\s+of\s+Health/gi, '')
    .replace(/South Dakota Department of Health/gi, '')
    .replace(/600\s+E\s+Capitol\s+Ave/gi, '')
    .replace(/Pierre,\s+SD\s+57501/gi, '')
    .replace(/Payment Type:.*$/i, '')
    .replace(/Card Type:.*$/i, '')
    .replace(/Name on Card:.*$/i, '')
    .replace(/Card Number:.*$/i, '')
    .replace(/Expiration Date:.*$/i, '')
    .replace(/Amount Enclosed:.*$/i, '')
    .replace(/Clients Name(s):.*$/i, '')
    .trim();
}

function showNotification(msg) {
  const n = document.getElementById("notification");
  n.textContent = msg;
  n.style.display = "block";
  setTimeout(() => { n.style.display = "none"; }, 3000);
}

function parseTableRow(line) {
  const tokens = line.trim().split(/\s+/);
  if (tokens.length < 5) return Array(HEADERS.length).fill('');
  let dateIdx = tokens.findIndex(tok => /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(tok));
  if (dateIdx === -1) return Array(HEADERS.length).fill('');
  const claimNumber = tokens.slice(0, dateIdx).join(' ');
  const serviceDate = tokens[dateIdx];
  let i = dateIdx + 1;
  let procedureTokens = [];
  while (i < tokens.length && !/^\d+$/.test(tokens[i])) {
    procedureTokens.push(tokens[i]);
    i++;
  }
  const procedure = procedureTokens.join(' ');
  const units = tokens[i] || '';
  i++;
  const unitRate = tokens[i] || '';
  i++;
  let rest = [];
  while (i < tokens.length) {
    rest.push(tokens[i]);
    i++;
  }
  while (rest.length < 9) rest.push('');
  return [
    claimNumber,
    serviceDate,
    procedure,
    units,
    unitRate,
    rest[0],
    rest[1],
    rest[2],
    rest[3],
    rest[4],
    rest[5],
    rest[6],
    rest[7],
    rest[8]
  ];
}

function processExtractedSheet(flattened) {
  let infoLines = [];
  let headerIdx = flattened.findIndex(l => l.toLowerCase().startsWith("claim number"));
  if (headerIdx > 0) {
    infoLines = flattened.slice(0, headerIdx);
  }
  let tableLines = [];
  if (headerIdx !== -1) {
    for (let i = headerIdx + 1; i < flattened.length; i++) {
      let line = flattened[i];
      if (/^totals?/i.test(line) || /^balances?/i.test(line) || /^patient'?s unapplied balance/i.test(line) || /disclaimer/i.test(line)) break;
      if (line.trim()) tableLines.push(line);
    }
  }
  const tableRows = tableLines.map(parseTableRow);
  sheets.push({infoLines, tableRows});
}

// PDF Extraction
document.getElementById('pdfInput').addEventListener('change', async function(event) {
  const file = event.target.files[0];
  if (!file) return;
  sheets = [];
  document.getElementById('output').textContent = "Extracting PDF...";
  document.getElementById('exportExcelBtn').disabled = true;
  document.getElementById('exportWordBtn').disabled = true;
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfData = new Uint8Array(arrayBuffer);
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let currentSheetData = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      let line = '';
      let lastY = null;
      textContent.items.forEach(item => {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 10) {
          line = cleanLine(line);
          if (line.includes("Disclaimer: Charges/Adjustments made after statement date")) {
            if (currentSheetData.length > 0) {
              processExtractedSheet(currentSheetData.map(r => r.trim()).filter(Boolean));
              currentSheetData = [];
            }
          } else {
            currentSheetData.push(line.trim());
          }
          line = '';
        }
        line += item.str + ' ';
        lastY = item.transform[5];
      });
      if (line.trim()) {
        line = cleanLine(line);
        if (line.includes("Disclaimer: Charges/Adjustments made after statement date")) {
          if (currentSheetData.length > 0) {
            processExtractedSheet(currentSheetData.map(r => r.trim()).filter(Boolean));
            currentSheetData = [];
          }
        } else {
          currentSheetData.push(line.trim());
        }
      }
    }
    if (currentSheetData.length > 0) {
      processExtractedSheet(currentSheetData.map(r => r.trim()).filter(Boolean));
    }
    if (sheets.length === 0 || sheets.every(s => s.tableRows.length === 0)) {
      document.getElementById('output').textContent = "No valid statement data found.";
      document.getElementById('exportExcelBtn').disabled = true;
      document.getElementById('exportWordBtn').disabled = true;
    } else {
      let previewHTML = sheets.map((sheet, idx) => {
        let infoBlock = sheet.infoLines.map(l => `<div>${l}</div>`).join('');
        let tableBlock = `<table><tr>${HEADERS.map(h => `<th>${h}</th>`).join('')}</tr>` +
          sheet.tableRows.map(row =>
            '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
          ).join('') +
          `</table>`;
        return `<b>Statement ${idx + 1}</b><br>${infoBlock}<br>${tableBlock}`;
      }).join('<br>');
      document.getElementById('output').innerHTML = previewHTML;
      document.getElementById('exportExcelBtn').disabled = false;
      document.getElementById('exportWordBtn').disabled = false;
      showNotification("PDF data extracted for " + sheets.length + " statement(s)!");
    }
  } catch (e) {
    document.getElementById('output').textContent = "Error reading PDF!";
    document.getElementById('exportExcelBtn').disabled = true;
    document.getElementById('exportWordBtn').disabled = true;
    showNotification("Error: Could not extract PDF data.");
  }
});

document.getElementById('exportExcelBtn').onclick = function() {
  if (!sheets.length) return;
  const wb = XLSX.utils.book_new();
  sheets.forEach((sheet, idx) => {
    let wsData = [
      ...sheet.infoLines.map(l=>[l]),
      [],
      HEADERS,
      ...sheet.tableRows
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, `Statement ${idx + 1}`);
  });
  XLSX.writeFile(wb, "Statements.xlsx");
};

document.getElementById('exportWordBtn').onclick = async function() {
  await exportToWord(sheets, HEADERS);
};

// ------- DOCX WORD EXPORT (with column removal and white-out logic) -------
// ------- DOCX WORD EXPORT (with centered logo and two-column layout) -------
async function exportToWord(sheets, headers) {
  const {
    Document, Packer, Paragraph, Table, TableRow, TableCell,
    WidthType, TextRun, AlignmentType, BorderStyle, PageOrientation,
    ImageRun
  } = window.docx;

  async function loadImageAsArrayBuffer(imagePath) {
    const response = await fetch(imagePath);
    return await response.arrayBuffer();
  }

  const logoBuffer = await loadImageAsArrayBuffer('./images/logo.png');
  const paymentBuffer = await loadImageAsArrayBuffer('./images/payment.png');

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  });

  const sections = sheets.map((sheet, idx) => {
    // --- Extract client info from infoLines ---
    let clientName = "[CLIENT NAME]";
    let addressLines = ["[ADDRESS LINE 1]", "[CITY, STATE ZIP]"];
    for (let line of sheet.infoLines) {
      if (/client name/i.test(line)) {
        clientName = line.replace(/.*client name[s]*\s*:/i, '').split('(')[0].trim();
        if (clientName.includes(',')) {
          const [last, first] = clientName.split(",");
          clientName = `${first.trim()} ${last.trim()}`;
        }
      } else if (/^\d{1,5} .*\d{5}$/.test(line)) {
        addressLines[0] = line.trim();
      } else if (/[,][ ]*[A-Z]{2} \d{5}/.test(line)) {
        addressLines[1] = line.trim();
      }
    }
    if (sheet.infoLines[6]) addressLines[0] = sheet.infoLines[6];
    if (sheet.infoLines[7]) addressLines[1] = sheet.infoLines[7];

    // --- Indices for relevant columns ---
    let insurancePaidColIdx = headers.findIndex(h => h.toLowerCase() === "insurance paid");
    let insuranceBalanceColIdx = headers.findIndex(h => h.toLowerCase() === "insurance balance");
    let adjustmentColIdx = headers.findIndex(h => h.toLowerCase().includes("adjustment"));
    let patientChargeColIdx = headers.findIndex(h => h.toLowerCase() === "patient charge");
    let balanceOwedColIdx = headers.findIndex(h => /balance owed|patient balance/i.test(h));
    let totalPaidColIdx = headers.findIndex(h => h.toLowerCase() === "total paid");
    let totalBalanceColIdx = headers.findIndex(h => h.toLowerCase() === "total balance");

    // --- Calculate total balance owed ---
    let balanceOwed = 0;
    sheet.tableRows.forEach(row => {
      let val = row[balanceOwedColIdx];
      if (typeof val === 'string') {
        val = parseFloat(val.replace(/[$,]/g, ''));
        if (!isNaN(val)) balanceOwed += val;
      }
    });

    // --- Filter out disclaimer rows ---
    const validRows = sheet.tableRows.filter(row =>
      !(row[0] && row[0].toString().includes("Disclaimer: Charges/Adjustments made after statement date"))
    );

    // --- Remove Patient Charge column logic ---
    let removePatientCharge = false;
    for (const row of validRows) {
      if (row[0] && row[0].includes("CL-") && row[patientChargeColIdx] === row[balanceOwedColIdx]) {
        removePatientCharge = true;
        break;
      }
    }

    // --- Total Paid column always removed
    let removeTotalBalance = false;
    for (const row of validRows) {
      if (row[0] && row[0].includes("CL-") && row[totalBalanceColIdx] === row[balanceOwedColIdx]) {
        removeTotalBalance = true;
        break;
      }
    }

    let filteredHeaders = headers.filter((h, i) =>
      i !== insurancePaidColIdx &&
      i !== insuranceBalanceColIdx &&
      i !== adjustmentColIdx &&
      i !== totalPaidColIdx &&
      (!removePatientCharge || i !== patientChargeColIdx) &&
      (!removeTotalBalance || i !== totalBalanceColIdx) &&
      i !== balanceOwedColIdx
    );
    filteredHeaders.splice(insurancePaidColIdx, 0, "Ins. Covered");
    filteredHeaders.push(headers[balanceOwedColIdx]);

    const headerRow = new TableRow({
      children: filteredHeaders.map(text =>
        new TableCell({
          children: [new Paragraph({ text, bold: true })],
          shading: { fill: "D3D3D3" }
        })
      )
    });

    const bodyRows = validRows.map((row, index) => {
      const isClaimRow = row[0]?.includes("CL-");
      const nextRow = validRows[index + 1];
      const nextIsServiceLine = nextRow && nextRow[0]?.includes("Service Line#");
      const whiteOut = isClaimRow && nextIsServiceLine;

      const blackText = (text) => new TextRun({ text: text ?? '', size: 22, color: '000000' });
      const whiteText = (text) => new TextRun({ text: text ?? '', size: 22, color: 'FFFFFF' });

      let filteredRow = row.filter((cell, i) =>
        i !== insurancePaidColIdx &&
        i !== insuranceBalanceColIdx &&
        i !== adjustmentColIdx &&
        i !== totalPaidColIdx &&
        (!removePatientCharge || i !== patientChargeColIdx) &&
        (!removeTotalBalance || i !== totalBalanceColIdx) &&
        i !== balanceOwedColIdx
      );

      let insCoveredValue = '';
      if (isClaimRow) {
        const insurancePaidVal = parseFloat(row[insurancePaidColIdx]?.replace(/[$,]/g, '')) || 0;
        const insuranceBalanceVal = parseFloat(row[insuranceBalanceColIdx]?.replace(/[$,]/g, '')) || 0;
        const adjustmentVal = parseFloat(row[adjustmentColIdx]?.replace(/[$,]/g, '')) || 0;
        insCoveredValue = `$${(insurancePaidVal + insuranceBalanceVal + adjustmentVal).toFixed(2)}`;
      }
      filteredRow.splice(insurancePaidColIdx, 0, insCoveredValue);
      filteredRow.push(row[balanceOwedColIdx]);

      return new TableRow({
        children: filteredRow.map((cell, colIdx) => {
          let originalIndices = headers
            .map((h, i) => i)
            .filter(i =>
              i !== insurancePaidColIdx &&
              i !== insuranceBalanceColIdx &&
              i !== adjustmentColIdx &&
              i !== totalPaidColIdx &&
              (!removePatientCharge || i !== patientChargeColIdx) &&
              (!removeTotalBalance || i !== totalBalanceColIdx) &&
              i !== balanceOwedColIdx
            );
          originalIndices.splice(insurancePaidColIdx, 0, insurancePaidColIdx);
          originalIndices.push(balanceOwedColIdx);
          const originalColIdx = originalIndices[colIdx];

          const isWhiteOutCol = [2, 3, 4].includes(originalColIdx);
          return new TableCell({
            children: [
              new Paragraph({
                children: [whiteOut && isWhiteOutCol ? whiteText(cell) : blackText(cell)],
              }),
            ],
          });
        }),
      });
    });

    const filteredTotalRowChildren = [
      new TableCell({
        children: [new Paragraph({ text: "Total", bold: true })],
        columnSpan: filteredHeaders.length - 1,
        shading: { fill: "D3D3D3" }
      }),
      new TableCell({
        children: [new Paragraph({ text: `$${balanceOwed.toFixed(2)}`, bold: true })],
        shading: { fill: "D3D3D3" }
      })
    ];

    const totalRow = new TableRow({
      children: filteredTotalRowChildren
    });

    // Payment info box
    const payAmountBox = new Table({
      alignment: AlignmentType.RIGHT,
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: `PAY THIS AMOUNT: $${balanceOwed.toFixed(2)}`,
                      bold: true,
                      size: 28
                    })
                  ]
                })
              ],
              borders: {
                top: { style: BorderStyle.SINGLE, size: 4 },
                bottom: { style: BorderStyle.SINGLE, size: 4 },
                left: { style: BorderStyle.SINGLE, size: 4 },
                right: { style: BorderStyle.SINGLE, size: 4 }
              }
            })
          ]
        })
      ]
    });

    // Main two-column layout using a table
    const layoutTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            // Left column: Logo centered, address block
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new ImageRun({
                      data: logoBuffer,
                      transformation: { width: 200, height: 160 }
                    })
                  ],
                  spacing: { after: 150 }
                }),
                new Paragraph({ text: "", spacing: { after: 50 } }),
                new Paragraph({
                  children: [new TextRun({ text: clientName, bold: true, size: 24 })],
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 150 }
                }),
                ...addressLines.map(line =>
                  new Paragraph({
                    children: [new TextRun({ text: line, size: 24, bold: true })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 150 }
                  })
                )
              ]
            }),
            // Right column: Statement date, pay amount box, payment info image, etc.
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [new TextRun({ text: `Statement Date: ${currentDate}`, bold: true, size: 24 })],
                  spacing: { after: 100 }
                }),
                payAmountBox,
                new Paragraph({ text: "", spacing: { after: 50 } }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new ImageRun({
                      data: paymentBuffer,
                      transformation: { width: 400, height: 200 }
                    })
                  ],
                  spacing: { after: 100 }
                }),
                // You can add more payment info paragraphs here if needed
              ]
            })
          ]
        })
      ]
    });

    return {
      properties: {
        page: {
          size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
          margin: { top: 360, bottom: 360, left: 360, right: 360 }
        }
      },
      children: [
        layoutTable,
        new Paragraph({ spacing: { after: 750 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          alignment: AlignmentType.RIGHT,
          rows: [headerRow, ...bodyRows, totalRow]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "For any questions, concerns, or to make a payment over the phone, please call Family Health Education Services at (605) 717-8920. Our billing team is available Monday - Thursday, 8:00[...]",
              bold: true
            })
          ],
          spacing: { before: 200 },
          alignment: AlignmentType.RIGHT
        }),
        ...(idx < sheets.length - 1 ? [new Paragraph({ children: [], pageBreakBefore: true })] : [])
      ]
    };
  });

  const doc = new Document({ sections });

  window.docx.Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Statements.docx";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  });
}