
// Add mammoth.js via CDN in your HTML:
// <script src="https://unpkg.com/mammoth/mammoth.browser.min.js"></script>

document.getElementById('uploadDocxBtn').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  mammoth.convertToHtml({ arrayBuffer })
    .then(result => {
      // result.value contains HTML representation of the docx
      // You can parse tables, paragraphs, etc. from this HTML
      document.getElementById('docxContent').innerHTML = result.value;
      // Example: extract all table rows
      const tables = document.querySelectorAll('#docxContent table');
      tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          const cells = Array.from(row.querySelectorAll('td,th')).map(cell => cell.textContent.trim());
          console.log(cells); // Do something with each row
        });
      });
    })
    .catch(err => {
      alert('Error reading docx: ' + err.message);
    });
});
