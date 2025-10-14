
function processFile() {
    const file = document.getElementById('fileUpload').files[0];
    if (!file) {
        alert("Please select a file first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
async function getTableHeaders() {
  const exportContent = document.getElementById('export-content');
  if (!exportContent) return [];
  const tables = exportContent.querySelectorAll('table');
  const allHeaders = [];
  tables.forEach(table => {
    const headerRows = table.querySelectorAll('tr');
    headerRows.forEach(row => {
      const headers = [];
      row.querySelectorAll('th').forEach(th => {
        headers.push(th.textContent.trim());
      });
      if (headers.length > 0) {
        allHeaders.push(headers);
      }
    });
  });
  return allHeaders;
}
        // TODO: Implement file processing logic here.
        // Removed unused variables and functions to fix errors.
    };
    reader.readAsArrayBuffer(file);
} // <-- Added missing closing brace for processFile

function downloadWordBtn() {
    
  // Find all tables in the export-content element and extract their headers
  const exportContent = document.getElementById('export-content');
  if (exportContent) {
    const tables = exportContent.querySelectorAll('table');
    tables.forEach(table => {
      // Collect header texts into a const headers array
      const headers = [];
      const headerRow = table.querySelector('tr');
      if (headerRow) {
        headerRow.querySelectorAll('th').forEach(th => {
          headers.push(th.textContent.trim());
        });
      }
     
      // You can use the headers array as needed here
      // Example: console.log(headers);
    });
  }
  // Add click event to export content as a Word document
  const btn = document.createElement('button');
  btn.textContent = 'Export as Word';
  btn.addEventListener('click', () => {
    // Get the content you want to export
    const content = document.getElementById('export-content');
    if (!content) return;
    const html = content.innerHTML;

    // Create a Blob with the HTML content
    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

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
  document.
  body.appendChild(btn);
}

