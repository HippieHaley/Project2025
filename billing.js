const downloadWordBtn = document.getElementById('downloadWordBtn');
const wordInput = document.getElementById('wordInput');

let uploadedWordFile = null;

// Listen for file upload
wordInput.addEventListener('change', (event) => {
    if (event.target.files && event.target.files[0]) {
        uploadedWordFile = event.target.files[0];
        downloadWordBtn.disabled = false;
    } else {
        uploadedWordFile = null;
        downloadWordBtn.disabled = true;
    }
});

// Download the uploaded file when button is clicked
downloadWordBtn.addEventListener('click', () => {
    if (!uploadedWordFile) return;
    const url = URL.createObjectURL(uploadedWordFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = uploadedWordFile.name || 'BillingDetails.docx';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }, 100);
});