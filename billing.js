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

document.getElementById('exportWordBtn').onclick = function() {
  exportToWord(sheets, HEADERS);
};

// ------- DOCX WORD EXPORT (with proper white out logic for selected columns) -------
function exportToWord(sheets, headers) {
  const {
    Document, Packer, Paragraph, Table, TableRow, TableCell,
    WidthType, TextRun, AlignmentType, BorderStyle, PageOrientation
  } = window.docx;

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
    if (sheet.infoLines[4]) addressLines[0] = sheet.infoLines[4];
    if (sheet.infoLines[5]) addressLines[1] = sheet.infoLines[5];

    // --- Calculate total balance owed ---
    let balanceOwed = 0;
    let balanceColIdx = headers.findIndex(h => /balance owed|patient balance/i.test(h));
    sheet.tableRows.forEach(row => {
      let val = row[balanceColIdx];
      if (typeof val === 'string') {
        val = parseFloat(val.replace(/[$,]/g, ''));
        if (!isNaN(val)) balanceOwed += val;
      }
    });

    // --- Filter out disclaimer rows ---
    const validRows = sheet.tableRows.filter(row =>
      !(row[0] && row[0].toString().includes("Disclaimer: Charges/Adjustments made after statement date"))
    );

    // --- Table rows ---
    const headerRow = new TableRow({
      children: headers.map(text =>
        new TableCell({
          children: [new Paragraph({ text, bold: true })],
          shading: { fill: "D3D3D3" }
        })
      )
    });

    // --------- WHITE OUT LOGIC FOR SELECTED COLUMNS ---------
    // Only procedure, units, and unitRate columns will be whited out if whiteOut is true
    const bodyRows = validRows.map((row, index) => {
      const isClaimRow = row[0]?.includes("CL-");
      const nextRow = validRows[index + 1];
      const nextIsServiceLine = nextRow && nextRow[0]?.includes("Service Line#");
      const whiteOut = isClaimRow && nextIsServiceLine;

      const blackText = (text) => new TextRun({ text: text ?? '', size: 22, color: '000000' });
      const whiteText = (text) => new TextRun({ text: text ?? '', size: 22, color: 'FFFFFF' });

      return new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [blackText(row[0])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[1])] })] }),
          new TableCell({ children: [new Paragraph({ children: [whiteOut ? whiteText(row[2]) : blackText(row[2])] })] }),
          new TableCell({ children: [new Paragraph({ children: [whiteOut ? whiteText(row[3]) : blackText(row[3])] })] }),
          new TableCell({ children: [new Paragraph({ children: [whiteOut ? whiteText(row[4]) : blackText(row[4])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[5])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[6])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[7])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[8])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[9])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[10])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[11])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[12])] })] }),
          new TableCell({ children: [new Paragraph({ children: [blackText(row[13])] })] }),
        ]
      });
    });
    // -------- END WHITE OUT LOGIC ---------

    const totalRow = new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: "Total", bold: true })],
          columnSpan: headers.length - 1,
          shading: { fill: "D3D3D3" }
        }),
        new TableCell({
          children: [new Paragraph({ text: `$${balanceOwed.toFixed(2)}`, bold: true })],
          shading: { fill: "D3D3D3" }
        })
      ]
    });

    const payAmountBox = new Table({
      alignment: AlignmentType.RIGHT,
      width: { size: 50, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  indent: { left: 750 },
                  children: [
                    new TextRun({
                      text: `PAY THIS AMOUNT: $${balanceOwed.toFixed(2)}`,
                      alignment: AlignmentType.CENTER,
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

    return {
      properties: {
        page: {
          size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
          margin: { top: 360, bottom: 360, left: 360, right: 360 }
        }
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: `Statement Date: ${currentDate}`, bold: true, size: 24 })],
          spacing: { after: 200 },
          indent: { left: 750 }
        }),
        payAmountBox,
        new Paragraph({ spacing: { after: 200 }, alignment: AlignmentType.CENTER, indent: { left: 750 } }),
        new Paragraph({ text: "", spacing: { after: 800 } }),
        new Paragraph({
          children: [new TextRun({ text: clientName, bold: true, size: 24 })],
          indent: { left: 1440 },
          spacing: { after: 150 }
        }),
        ...addressLines.map(line =>
          new Paragraph({
            children: [new TextRun({ text: line, size: 24, bold: true })],
            indent: { left: 1440 },
            spacing: { after: 150 }
          })
        ),
        new Paragraph({ spacing: { after: 750 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [headerRow, ...bodyRows, totalRow]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Disclaimer: The Adjustment column shows total reductions applied to your charges. These include write-offs and adjustments from your insurance provider, as well as any discounts you received through our South Dakota sliding fee scale program. These amounts are not owed and have already been deducted from your balance.",
              italics: true
            })
          ],
          spacing: { before: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "For any questions, concerns, or to make a payment over the phone, please call Family Health Education Services at (605) 717-8920. Our billing team is available Monday - Thursday, 8:00 AM to 5:00 PM. We offer payment plans in any amount and are happy to work with you on a schedule that fits your needs. Please note that accounts with no payment activity or effort to resolve the balance within 90 days of the billing date may be subject to collections.",
              bold: true
            })
          ],
          spacing: { before: 200 }
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