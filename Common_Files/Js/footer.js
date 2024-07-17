document.addEventListener('DOMContentLoaded', () => {
    fetch('/Common_Files/html/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});