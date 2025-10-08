const downloadWordBtn = document.getElementById('downloadWordBtn');

downloadWordBtn.addEventListener('click', () => {
    // Example: Download a Word file from a URL
    const wordFileUrl = '/path/to/your/file.docx';
    const link = document.createElement('a');
    link.href = wordFileUrl;
    link.download = 'BillingDetails.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});